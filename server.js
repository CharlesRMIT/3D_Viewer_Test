const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// LTI Launch Endpoint
app.post('/launch', (req, res) => {
  console.log('Received LTI Launch:', req.body);

  // In production, you’d validate OAuth here.

  // Render a simple 3D viewer page
  res.sendFile(path.join(__dirname, 'public', 'viewer.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Triggering redeploy