const express = require('express');
const app = express();
const port = process.env.PORT || 3005; // Use the PORT environment variable or default to 3000

// Middleware for parsing JSON requests
app.use(express.json());

// Import your API controller
const apiController = require('./controllers/apiController');

// Define an API route to generate text
app.post('/generate-text', async (req, res) => {
    const { userMessage } = req.body; // Directly extract the user message

    // Construct or retrieve the conversation messages array
    const conversation = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userMessage }, // User's input
    ];

    try {
        const generatedText = await apiController.generateText(conversation);
        res.json({ text: generatedText });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
