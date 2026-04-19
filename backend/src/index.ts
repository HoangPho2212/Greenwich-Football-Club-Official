import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Player from './models/Player.js';
import Fixture from './models/Fixture.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*', // In production, update this to your frontend URL
  }
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/football_club';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- API Routes ---

// Get all players
app.get('/api/players', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a player
app.post('/api/players', async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Get all fixtures
app.get('/api/fixtures', async (req, res) => {
  try {
    const fixtures = await Fixture.find();
    res.json(fixtures);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a fixture
app.post('/api/fixtures', async (req, res) => {
  try {
    const fixture = new Fixture(req.body);
    await fixture.save();
    io.emit('new_fixture', fixture); // Real-time emit
    res.status(201).json(fixture);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
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
