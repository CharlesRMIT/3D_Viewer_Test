const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// LTI POST (standard launch)
app.post('/launch', (req, res) => {
  console.log('POST /launch body:', req.body);
  res.sendFile(path.join(__dirname, 'public', 'viewer.html'));
});

// LTI GET (Deep Linking / Content Item Return launch)
app.get('/launch', (req, res) => {
  console.log('GET /launch query:', req.query);
  res.sendFile(path.join(__dirname, 'public', 'viewer.html'));
});

// Confirm server is live
app.get('/', (req, res) => {
  res.send('Canvas 3D Viewer is running ✅');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
