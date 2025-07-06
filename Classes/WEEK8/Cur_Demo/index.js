const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3030;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse urlencoded form data
app.use(express.urlencoded({ extended: true }));

// Multer storage configuration to keep file extension
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Root route serves the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'forms-demo.html'));
});

// Serve the URL Encoded Form Data demo page
app.get('/url-encoded-demo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'url-encoded-demo.html'));
});

// Handle form submission from /addEntry
app.post('/addEntry', (req, res) => {
  // Convert checkbox value to boolean
  req.body.active = req.body.active ? true : false;
  res.send(`<h2>Form Data Received</h2><pre>${JSON.stringify(req.body, null, 2)}</pre><a href="/url-encoded-demo">Back to form</a>`);
});

// Serve the Multipart Form Data demo page
app.get('/multipart-demo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'multipart-demo.html'));
});

// Handle file upload from /uploadEntry
app.post('/uploadEntry', upload.single('avatar'), (req, res) => {
  res.send(
    `<h2>Multipart Form Data Received</h2>` +
    `<h3>Form Fields</h3><pre>${JSON.stringify(req.body, null, 2)}</pre>` +
    `<h3>File Info</h3><pre>${JSON.stringify(req.file, null, 2)}</pre>` +
    `<a href="/multipart-demo">Back to form</a>`
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 