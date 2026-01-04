import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

let db;
let lastDbError = null;

async function initializeDatabase() {
  try {
    console.log('Connecting to database...');
    // initial connection without database selected
    const connection = await mysql.createConnection(dbConfig);
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`Database ${process.env.DB_NAME} checked/created.`);
    
    await connection.end();

    // Now connect with database
    db = await mysql.createPool({
      ...dbConfig,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Create table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS admissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        grade VARCHAR(50),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await db.query(createTableQuery);
    console.log('Admissions table checked/created.');
    lastDbError = null;

  } catch (error) {
    lastDbError = error.message;
    console.error('Database connection failed. Server will run but DB features will be unavailable.');
    console.error('Error details:', error.message);
  }
}

initializeDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/api/debug-db', (req, res) => {
    res.json({
        dbConnected: !!db,
        lastError: lastDbError,
        config: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            hasPassword: !!process.env.DB_PASSWORD
        }
    });
});

app.post('/api/admissions', async (req, res) => {
  if (!db) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    const { name, email, phone, grade, message } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const query = 'INSERT INTO admissions (name, email, phone, grade, message) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.execute(query, [name, email, phone, grade, message]);

    res.status(201).json({ message: 'Admission inquiry submitted successfully', id: result.insertId });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/admissions', async (req, res) => {
    if (!db) {
        return res.status(503).json({ error: 'Database not available' });
    }

    try {
        const [rows] = await db.query('SELECT * FROM admissions ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', dbConnected: !!db });
});
