const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Test root route
app.get('/', (req, res) => {
  res.send('✅ Server is running and responding to GET requests');
});

// ✅ Handle POST /launch for regular LTI launches
app.post('/launch', (req, res) => {
  console.log('Received LTI Launch (POST):', req.body);
  res.sendFile(path.join(__dirname, 'public', 'viewer.html'));
});

// ✅ Handle GET /launch for content item return launches (embedding)
app.get('/launch', (req, res) => {
  console.log('Received LTI Launch (GET):', req.query);
  res.sendFile(path.join(__dirname, 'public', 'viewer.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
