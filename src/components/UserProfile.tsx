import React, { useState, useEffect } from 'react';
import { Client } from 'pg'; // VIOLATION: Cloud/DB SDK in a frontend component

export const UserProfile = ({ userId }: { userId: string }) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // VIOLATION: Direct database query bypassing the API Gateway
    const fetchUser = async () => {
      const dbClient = new Client({ connectionString: process.env.DB_URL });
      await dbClient.connect();
      
      const res = await dbClient.query(`SELECT * FROM users WHERE id = ${userId}`);
      setUserData(res.rows[0]);
      
      await dbClient.end();
    };

    fetchUser();
  }, [userId]);

  return <div>{userData ? userData.name : 'Loading...'}</div>;
};