import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Player from './models/Player.js';
import Fixture from './models/Fixture.js';
import Achievement from './models/Achievement.js';
import ClubImage from './models/ClubImage.js';
import HomeContent from './models/HomeContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});

app.use(cors());
app.use(express.json());
// Serve static files from the public/uploads directory (if we want to serve from backend)
app.use('/uploads', express.static(path.join(__dirname, '../../frontend/public/uploads')));

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../frontend/public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/football_club';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- API Routes ---

// Get all players
app.get('/api/players', async (req, res) => {
  try {
    const players = await Player.find().sort({ createdAt: 1 });
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a player (with image)
app.post('/api/players', upload.single('image'), async (req, res) => {
  console.log('--- ADD PLAYER REQUEST ---');
  console.log('Body:', req.body);
  console.log('File:', req.file);
  try {
    const playerData = {
      ...req.body,
      profile_photo: req.file ? `/uploads/${req.file.filename}` : undefined
    };
    const player = new Player(playerData);
    await player.save();
    console.log('✅ Player saved successfully!');
    res.status(201).json(player);
  } catch (error: any) {
    console.error('❌ Add Player Error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get all fixtures
app.get('/api/fixtures', async (req, res) => {
  try {
    const fixtures = await Fixture.find().sort({ date: 1 });
    res.json(fixtures);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a fixture (with logo)
app.post('/api/fixtures', upload.single('image'), async (req, res) => {
  console.log('--- ADD FIXTURE REQUEST ---');
  try {
    const fixtureData = {
      ...req.body,
      competitor_logo: req.file ? `/uploads/${req.file.filename}` : undefined
    };
    const fixture = new Fixture(fixtureData);
    await fixture.save();
    console.log('✅ Fixture saved successfully!');
    io.emit('new_fixture', fixture);
    res.status(201).json(fixture);
  } catch (error: any) {
    console.error('❌ Add Fixture Error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Delete a player
app.delete('/api/players/:id', async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a player/member
app.put('/api/players/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.profile_photo = `/uploads/${req.file.filename}`;
    }
    const player = await Player.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(player);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a fixture
app.delete('/api/fixtures/:id', async (req, res) => {
  try {
    await Fixture.findByIdAndDelete(req.params.id);
    res.json({ message: 'Fixture deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Achievement Routes ---
app.get('/api/achievements', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ year: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/achievements', async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();
    res.status(201).json(achievement);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

app.delete('/api/achievements/:id', async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Club Image Routes ---
app.get('/api/club-images', async (req, res) => {
  try {
    const images = await ClubImage.find({ category: 'slider' });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/club-images', upload.single('image'), async (req, res) => {
  try {
    const imgData = {
      url: req.file ? `/uploads/${req.file.filename}` : '',
      category: 'slider'
    };
    const img = new ClubImage(imgData);
    await img.save();
    res.status(201).json(img);
  } catch (error) {
    res.status(400).json({ error: 'Upload failed' });
  }
});

app.delete('/api/club-images/:id', async (req, res) => {
  try {
    await ClubImage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Home Content Routes ---
app.get('/api/home-content', async (req, res) => {
  try {
    let content = await HomeContent.findOne();
    if (!content) {
      content = new HomeContent();
      await content.save();
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/home-content', upload.single('heroImage'), async (req, res) => {
  try {
    let content = await HomeContent.findOne();
    if (!content) content = new HomeContent();

    const updateData = { ...req.body };
    if (req.file) {
      updateData.heroImage = `/uploads/${req.file.filename}`;
    }

    Object.assign(content, updateData);
    await content.save();
    res.json(content);
  } catch (error) {
    console.error('Home Content Update Error:', error);
    res.status(500).json({ error: 'Update failed' });
  }
});

// --- Admin Login ---
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'grefc2026';
  
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: 'authenticated_grefc_admin' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

// Real-time connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
