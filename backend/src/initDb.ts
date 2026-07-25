import fs from 'fs';
import path from 'path';
import pool from './config/db';

const initDb = async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, '../init.sql'), 'utf-8');
    await pool.query(sql);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  } finally {
    process.exit(0);
  }
};

initDb();
