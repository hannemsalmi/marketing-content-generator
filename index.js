const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3005;

app.options('/generate-text', cors({
  origin: 'https://aigen-dev-ed.develop.lightning.force.com',
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cors({
  origin: 'https://aigen-dev-ed.develop.lightning.force.com/',
  methods: 'POST',
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const apiController = require('./controllers/apiController');

// API route to generate text
app.post('/generate-text', async (req, res) => {
    const { userMessage } = req.body;

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
