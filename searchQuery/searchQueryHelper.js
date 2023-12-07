const fetch = require('node-fetch');
require('dotenv').config();
const GPT4_API_KEY = process.env.GPT4_API_KEY;


// Function to generate search query using GPT-4
async function generateAdobeStockSearchLink(userTopic, userIndustry, temperature) {
  try {
    // Construct the request payload
    const requestPayload = {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `Generate search keywords for Adobe Stock based on the user's topic (${userTopic}) and industry (${userIndustry}).` },
      ],
      temperature: temperature,
      max_tokens: 30, // You can adjust the max_tokens based on your needs
      n: 3, // Requesting 3 completions
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

    // Process the response and extract the generated keywords
    const responseData = await gpt4ApiResponse.json();
    const keywords = responseData.choices.map(choice => choice.message.content.trim());

    // Combine the keywords into a single string with the appropriate format
    const searchKeywords = keywords.join('+');

    // Construct the Adobe Stock search link
    const adobeStockSearchLink = `https://stock.adobe.com/ie/search?k=${searchKeywords}&search_type=usertyped`;

    return adobeStockSearchLink;
  } catch (error) {
    // Handle errors
    console.error('Error generating Adobe Stock search link:', error);
    throw error;
  }
}

module.exports = generateAdobeStockSearchLink;