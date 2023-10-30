
const fetch = require('node-fetch'); // Make sure you install and require node-fetch
require('dotenv').config();
const GPT4_API_KEY = process.env.GPT4_API_KEY; // Your GPT-4 API key

// Function to generate text using GPT-4
async function generateText(messages, temperature) {
  try {
    // Check if messages array is provided
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid input: messages array is required.');
    }

    // Construct the request payload
    const requestPayload = {
      model: 'gpt-4',
      messages,
      temperature: temperature, // 2 = more random and creative, 0 = less random and more deterministic
    };

    // Set up the options for the GPT-4 API request
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GPT4_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload),
    };

    // Use the Fetch API to make the GPT-4 API request
    const gpt4ApiResponse = await fetch('https://api.openai.com/v1/chat/completions', requestOptions);

    // Check if the API request was successful
    if (!gpt4ApiResponse.ok) {
      const errorData = await gpt4ApiResponse.json();
      throw new Error(JSON.stringify(errorData));
    }
    
    // Process the response and return the generated text
    const responseData = await gpt4ApiResponse.json();
    return responseData.choices[0].message.content;
  } catch (error) {
    // Handle errors
    console.error('Error generating text:', error);
    throw error;
  }
}

module.exports = {
  generateText,
};