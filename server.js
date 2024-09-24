// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// In-memory user store
const users = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle routing for the index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve sign-up page
app.get('/kayit-ol', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Serve login page
app.get('/giris-yap', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle sign-up
app.post('/kayit-ol', (req, res) => {
  const { email, password } = req.body;
  // Simple validation
  if (users.find(user => user.email === email)) {
    return res.send('Email already exists.');
  }
  users.push({ email, password });
  res.redirect('/giris-yap');
});

// Handle login
app.post('/giris-yap', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    return res.send('Welcome back!');
  }
  res.send('Invalid email or password.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on http://192.168.1.20:${port}`);
});
