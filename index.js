const express = require('express');
const app = express();
const port = process.env.PORT || 3005;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://aigen-dev-ed.develop.lightning.force.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

app.use(express.json());

const apiController = require('./controllers/apiController');

// API route to generate text
app.post('/generate-text', async (req, res) => {
    const { userMessage, temperature } = req.body;

    // Construct or retrieve the conversation messages array
    const conversation = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userMessage }, // User's input
    ];

    try {
        const generatedText = await apiController.generateText(conversation, temperature);
        res.json({ text: generatedText });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
