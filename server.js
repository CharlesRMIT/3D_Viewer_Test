const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allow Canvas to embed this site in an iframe using helmet
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      'frame-ancestors': ["https://canvas.instructure.com"]
    }
  }
}));

// ✅ Middleware to parse LTI launch POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ✅ Serve static files (like viewer.html)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Handle LTI launch POST request from Canvas
app.post('/launch', (req, res) => {
  const { oauth_consumer_key } = req.body;

  if (!oauth_consumer_key) {
    return res.status(400).send("Missing oauth_consumer_key. Invalid LTI launch.");
  }

  res.sendFile(path.join(__dirname, 'public', 'viewer.html'));
});

// ✅ Optional fallback GET route (for testing)
app.get('/launch', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'viewer.html'));
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
