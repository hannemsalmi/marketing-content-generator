const express = require("express");
const app = express();
const port = process.env.PORT || 3005;
const generateSearchQuery = require('./searchQuery/searchQueryHelper');

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://aigen-dev-ed.develop.lightning.force.com"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

app.use(express.json());

const apiController = require("./controllers/apiController");
const userMessageBuilder = require("./messageBuilder/userMessageBuilder")

const adminRoute = require("./salesForce/route"); // Importing the route
app.use("/admin", adminRoute); //Setting the admin routes

// API route to generate text
app.post("/generate-text", async (req, res) => {
  const { userTopic, userContentType, userRecipient, userIndustry, userTemperature } = req.body;
  const userMessage = userMessageBuilder.buildMessage(userTopic, userContentType, userRecipient, userIndustry);

  // Construct or retrieve the conversation messages array
  const conversation = [
    { role: "system", content: "You are a helpful assistant that helps to write advertisements to customers of a salesforce consulting company." },
    { role: "user", content: userMessage }, // User's input
  ];

  try {
    const generatedText = await apiController.generateText(
      conversation,
      userTemperature
    );

    // Use the OpenAI-generated search query
    const openaiSearchQueryResult = await generateSearchQuery(userTopic, userIndustry, userTemperature);

    // Construct the Adobe Stock link using the generated search query
    const adobeStockLink = `https://stock.adobe.com/images/search?k=${encodeURIComponent(openaiSearchQueryResult)}`;

    res.json({ text: generatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/check-message", async (req, res) => {
  const { userTopic, userContentType, userRecipient, userIndustry} = req.body;
  const userMessage = userMessageBuilder.buildMessage(userTopic, userContentType, userRecipient, userIndustry);

  try {
    res.json({text: userMessage});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });

  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
