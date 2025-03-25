// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/formData'; // Local MongoDB URI

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Enable CORS for all routes
app.use(cors());

// Serve static files (HTML, CSS, JS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// JSON body parsing middleware
app.use(express.json());

// Define a Mongoose schema and model for form data
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const FormData = mongoose.model('FormData', formSchema);

// API route to handle form submission
app.post('/submit', async (req, res) => {
    const { name, email, age } = req.body;

    // Create a new document and save to MongoDB
    const newFormData = new FormData({
        name,
        email,
        age,
    });

    try {
        // Save form data to the database
        await newFormData.save();
        res.json({ message: 'Data received and saved to MongoDB!' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Error saving data to MongoDB' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
