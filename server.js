const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Sample GET endpoint: check server health
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online fred',
    timestamp: new Date().toISOString()
  });
});

// Sample POST endpoint: receive and echo back JSON data
app.post('/api/echo', (req, res) => {
  console.log(Object.values(req.body))
  res.status(201).json({
    message: 'Data received',
    data: Object.values(req.body)[0]
  });
});

// Start listening on all local network interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`REST API server running at http://localhost:${PORT}`);
});
