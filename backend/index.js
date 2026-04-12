const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Cloud ✨'))
    .catch(err => console.error('MongoDB connection error:', err));

// Reflection Schema
const reflectionSchema = new mongoose.Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Reflection = mongoose.model('Reflection', reflectionSchema);

// Reaction Schema
const reactionSchema = new mongoose.Schema({
    cardIndex: { type: Number, required: true },
    emoji: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Reaction = mongoose.model('Reaction', reactionSchema);

// Memory Schema
const memorySchema = new mongoose.Schema({
    type: { type: String, enum: ['kabir', 'akriti'], required: true },
    content: { type: String, required: true },
    reaction: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Memory = mongoose.model('Memory', memorySchema);

// GET all memories (for Admin)
app.get('/api/memories', async (req, res) => {
    try {
        const memories = await Memory.find().sort({ createdAt: -1 });
        res.json(memories);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch memories' });
    }
});

// POST new memory
app.post('/api/memories', async (req, res) => {
    try {
        const { type, content, reaction } = req.body;
        if (!type || !content) return res.status(400).json({ error: 'Type and content are required' });
        
        const newMemory = new Memory({ type, content, reaction });
        await newMemory.save();
        res.json(newMemory);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save memory' });
    }
});

// GET latest reflection
app.get('/api/reflections/latest', async (req, res) => {
    try {
        const latest = await Reflection.findOne().sort({ createdAt: -1 });
        res.json(latest || {});
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch latest reflection' });
    }
});

// GET all reflections (for Admin)
app.get('/api/reflections', async (req, res) => {
    try {
        const reflections = await Reflection.find().sort({ createdAt: -1 });
        res.json(reflections);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch all reflections' });
    }
});

// POST new reflection
app.post('/api/reflections', async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) return res.status(400).json({ error: 'Content is required' });
        
        const newReflection = new Reflection({ content });
        await newReflection.save();
        res.json(newReflection);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save reflection' });
    }
});

// GET all reactions (for Admin)
app.get('/api/reactions', async (req, res) => {
    try {
        const reactions = await Reaction.find().sort({ createdAt: -1 });
        res.json(reactions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reactions' });
    }
});

// POST new reaction
app.post('/api/reactions', async (req, res) => {
    try {
        const { cardIndex, emoji } = req.body;
        const newReaction = new Reaction({ cardIndex, emoji });
        await newReaction.save();
        res.json(newReaction);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save reaction' });
    }
});

app.listen(PORT, () => {
    console.log(`Node.js MongoDB Backend running at http://localhost:${PORT}`);
    
    // Self-ping to keep Render awake (every 2 minutes)
    const APP_URL = process.env.APP_URL;
    if (APP_URL) {
        setInterval(() => {
            const https = require('https');
            https.get(`${APP_URL}/api/reflections/latest`, (res) => {
                console.log('Self-ping success ✨');
            }).on('error', (err) => {
                console.error('Self-ping failed:', err.message);
            });
        }, 120000); // 2 minutes
    }
});
