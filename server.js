
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./data/connection');
const dotenv = require('dotenv');
dotenv.config();
const app = express();


const port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Connect to MongoDB
connectDB();

// Routes
app.use('/', require('./routes'));

// Start the Server After Successful Connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});

// Handle Connection Errors
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
