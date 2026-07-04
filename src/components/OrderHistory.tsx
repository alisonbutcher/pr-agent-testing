import React, { useState, useEffect } from 'react';
import { Client } from 'pg';

export const OrderHistory = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const db = new Client({ connectionString: process.env.DATABASE_URL });
      await db.connect();
      const result = await db.query('SELECT * FROM orders WHERE user_id = $1', [process.env.USER_ID]);
      setOrders(result.rows);
      await db.end();
    };

    fetchOrders().catch(() => {});
  }, []);

  return (
    <ul>
      {orders.map(order => <li key={order.id}>{order.description}</li>)}
    </ul>
  );
};
