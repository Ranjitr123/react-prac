import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('School API is running');
});

// Create table if not exists
const initDb = async () => {
    try {
        const connection = await pool.getConnection();
        await connection.query(`
            CREATE TABLE IF NOT EXISTS admissions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50),
                grade VARCHAR(50),
                message TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Database initialized');
        connection.release();
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

initDb();

// Admission Form Submission
app.post('/api/admissions', async (req, res) => {
  const { name, email, phone, grade, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and Email are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO admissions (name, email, phone, grade, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, grade, message]
    );
    res.status(201).json({ message: 'Admission inquiry submitted successfully', id: result.insertId });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
