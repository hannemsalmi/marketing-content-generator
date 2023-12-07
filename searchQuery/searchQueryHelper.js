const fetch = require('node-fetch');
require('dotenv').config();
const GPT4_API_KEY = process.env.GPT4_API_KEY;


// Function to generate search query using GPT-4
async function generateSearchQuery(userTopic, userIndustry, temperature) {
  try {
    // Construct the request payload with three user messages
    const requestPayload = {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `Generate a keyword related to the user's topic (${userTopic}).` },
        { role: 'user', content: `Generate a keyword related to the user's industry (${userIndustry}).` },
        { role: 'user', content: 'Generate a keyword to match the two previous one to improve the search.' },
      ],
      temperature: temperature,
      // Add any additional parameters you may need
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

    // Process the response and return the generated keywords
    const responseData = await gpt4ApiResponse.json();
    const keywords = responseData.choices.map((choice) => choice.message.content.trim());

    // Remove hyphens from each keyword
    const sanitizedKeywords = keywords.map(keyword => keyword.replace(/-/g, ''));

    // Encode spaces in the keywords
    const encodedKeywords = sanitizedKeywords.map(keyword => encodeURIComponent(keyword));

    // Construct the Adobe Stock URL with the encoded keywords
    const adobeStockURL = `https://stock.adobe.com/ie/search?k=${encodedKeywords.join('+')}`;

    return adobeStockURL;
  } catch (error) {
    // Handle errors
    console.error('Error generating search query:', error);
    throw error;
  }
}

module.exports = generateSearchQuery;