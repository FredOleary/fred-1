const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Sample GET endpoint: check server health
app.get('/api/status', (req, res) => {
  console.log('/api/status');

  res.json({
    status: 'online fred',
    timestamp: new Date().toISOString()
  });
});

// Sample POST endpoint: receive and echo back JSON data
app.post('/api/echo', (req, res) => {
  console.log('/api/echo');
  res.status(201).json({
    message: 'Data received',
    data: Object.values(req.body)[0]
  });
});

// Method to validate user credentials
app.validate = (user, password) => {
  if (user === 'fred' && password === 'password') {
    return { status: 200, message: 'Login successful' };
  }
  return { status: 401, message: 'Login failed' };
};

// Sample POST endpoint: user login
app.post('/api/login', (req, res) => {
  console.log('/api/login');
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({
      message: 'Both "user" and "password" are required'
    });
  }

  const result = app.validate(user, password);
  res.status(result.status).json({ message: result.message });
});

// Start listening on all local network interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`REST API server running at http://localhost:${PORT}`);
});
