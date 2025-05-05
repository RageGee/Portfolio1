const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Models
const Contact = require('./models/Contact');
const Project = require('./models/Project');

// Simple admin credentials (for demo, use env vars in production)
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'password';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// JWT middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Admin login
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Contact endpoint
app.post('/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Contact saved' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Projects endpoints (protected)
app.get('/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.post('/projects', authenticateToken, async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json(project);
});

app.put('/projects/:id', authenticateToken, async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
});

app.delete('/projects/:id', authenticateToken, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
});

// QR code endpoint for Instagram
app.get('/qr/instagram', (req, res) => {
  const instaUrl = 'https://www.instagram.com/ishan_478584/';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(instaUrl)}`;
  res.json({ qr: qrUrl, url: instaUrl });
});

// Contact info and QR endpoint
app.get('/contact-info', (req, res) => {
  const email = 'ishanbhujel528';
  const instagram = 'Ishan_478584';
  const instaUrl = 'https://www.instagram.com/ishan_478584/';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(instaUrl)}`;
  const phone = '9749351910';
  res.json({
    email,
    instagram,
    instaUrl,
    qrUrl,
    phone
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 