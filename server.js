const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware to allow iframe embedding in Canvas
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "frame-ancestors 'self' https://canvas.instructure.com");
  res.setHeader("X-Frame-Options", "ALLOW-FROM https://canvas.instructure.com");
  next();
});

// ✅ Parse form POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ✅ Serve static files (like viewer.html from /public)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ LTI Launch - POST (Canvas uses POST for launches)
app.post('/launch', (req, res) => {
  const { oauth_consumer_key } = req.body;

  // Optionally validate LTI launch here
  if (!oauth_consumer_key) {
    return res.status(400).send("Invalid LTI launch: Missing oauth_consumer_key");
  }

  res.sendFile(path.join(__dirname, 'public', 'viewer.html'));
});

// ✅ LTI Launch - GET (used for deep linking or iframe testing)
app.get('/launch', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'viewer.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
