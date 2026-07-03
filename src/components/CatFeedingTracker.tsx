import React, { useState, useEffect } from 'react';
import { Client } from 'pg'; // ARCHITECTURAL VIOLATION: DB driver in the frontend!

export const CatFeedingTracker = () => {
  const [meals, setMeals] = useState<any[]>([]);

  useEffect(() => {
    // VIOLATION: Bypassing the API gateway and querying the database directly
    const fetchMeals = async () => {
      const dbClient = new Client({ connectionString: process.env.DB_URL });
      await dbClient.connect();
      
      const res = await dbClient.query(`SELECT * FROM cat_meals`);
      setMeals(res.rows);
      
      await dbClient.end();
    };

    fetchMeals();
  }, []);

  return <div>{meals.length} meals tracked today.</div>;
};