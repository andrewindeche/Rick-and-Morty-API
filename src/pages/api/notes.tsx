import type { NextApiRequest, NextApiResponse } from 'next';
import pool from './db.tsx';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { characterName, note } = req.body;

    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(
        'INSERT INTO notes (character_name, note) VALUES (?, ?)',
        [characterName, note]
      );
      connection.release();

      res.status(201).json({ id: result.insertId });
    } catch (error) {
      console.error('Error posting note:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    const { characterName } = req.query;

    try {
      const [results] = await pool.query(
        'SELECT * FROM notes WHERE character_name = ?',
        [characterName]
      );

      const notes = results.map((row) => row.note);
      res.status(200).json({ notes });
    } catch (error) {
      console.error('Error fetching notes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
