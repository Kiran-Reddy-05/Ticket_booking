const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // replace with your MySQL user
  password: '@#$mysql432', // replace with your MySQL password
  database: 'ticket_booking_system' // replace with your MySQL database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Registration Endpoint
app.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);  // Hash password
    const user = { name, email, password: hashedPassword, phone };
    
    // Insert user into MySQL database
    db.query('INSERT INTO users SET ?', user, (error, results) => {
      if (error) {
        console.error('Registration error:', error);
        return res.json({ success: false, message: 'Registration failed' });
      }
      res.json({ success: true });
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.json({ success: false, message: 'Registration failed' });
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
        console.error('Login error:', error);
        return res.status(500).json({ success: false, message: 'Login failed' });
      }
      if (results.length === 0) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
      
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user.id, name: user.name }, 'your-secret-key');
      res.json({ success: true, token, name: user.name });
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
