import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// Email Transporter Setup
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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

    // Send confirmation email asynchronously
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Admission Inquiry Received - Welcome to Schooling',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2c3e50;">Hello ${name},</h2>
          <p>Thank you for your interest in our school! We have received your admission inquiry.</p>
          <p><strong>Details submitted:</strong></p>
          <ul>
            <li><strong>Grade:</strong> ${grade}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Message:</strong> ${message || 'N/A'}</li>
          </ul>
          <p>Our admissions team will review your application and get back to you shortly.</p>
          <p>Best Regards,<br><strong>Schooling Administration Team</strong></p>
        </div>
      `,
    };

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Admission Inquiry: ${name}`,
      html: `
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Grade:</strong> ${grade}</p>
        <p><strong>Message:</strong> ${message || 'N/A'}</p>
      `,
    };

    // Attempt to send emails but don't block the response
    transporter.sendMail(mailOptions).catch(err => console.error('Error sending user email:', err));
    transporter.sendMail(adminMailOptions).catch(err => console.error('Error sending admin email:', err));

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
