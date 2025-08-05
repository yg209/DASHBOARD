import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function App() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "trades"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTrades(items);
    });
    return () => unsub();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Arbitrage Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trades.map((trade) => (
          <Card key={trade.id}>
            <CardContent>
              <h2 className="text-xl font-semibold">{trade.tokenA} → {trade.tokenB}</h2>
              <p>Buy on: {trade.dexBuy}</p>
              <p>Sell on: {trade.dexSell}</p>
              <p>Profit: ${trade.usdProfit}</p>
              <p>Timestamp: {new Date(trade.timestamp).toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 h-64">
        <h2 className="text-xl font-semibold mb-2">Profit Over Time</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trades}>
            <XAxis dataKey="timestamp" tickFormatter={(ts) => new Date(ts).toLocaleTimeString()} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="usdProfit" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}