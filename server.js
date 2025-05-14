const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allow Canvas to embed this app in an iframe
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "frame-ancestors https://canvas.instructure.com");
  next();
});

// ✅ Middleware to parse incoming LTI POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ✅ Serve static assets (like viewer.html)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ LTI Launch endpoint - POST (used by Canvas on editor_button click)
app.post('/launch', (req, res) => {
  const { oauth_consumer_key } = req.body;

  // Basic LTI presence check
  if (!oauth_consumer_key) {
    return res.status(400).send("Invalid LTI launch: missing oauth_consumer_key.");
  }

  res.sendFile(path.join(__dirname, 'public', 'viewer.html'));
});

// ✅ Optional GET /launch route (fallback for manual tests)
app.get('/launch', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'viewer.html'));
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
