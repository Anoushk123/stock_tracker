// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Stock Schema
const stockSchema = new mongoose.Schema({
    company: String,
    description: String,
    initial_price: Number,
    price_2002: Number,
    price_2007: Number,
    symbol: String,
});

const Stock = mongoose.model('Stock', stockSchema);

// Routes
app.get('/api/stocks', async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/watchlist', (req, res) => {
    // Add stock to watchlist (You may want to implement actual logic)
    res.json({ message: 'Stock added to watchlist' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
