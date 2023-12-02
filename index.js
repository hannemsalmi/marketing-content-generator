const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3005;
const generateSearchQuery = require("./searchQuery/searchQueryHelper");

let systemMessage = process.env.DEFAULT_SYSTEM_MESSAGE;

// Addin this part of code for testing purpose
app.use(
  cors({
    origin: "https://aigen-dev-ed.develop.lightning.force.com",
    methods: "GET, POST, OPTIONS",
    allowedHeaders: "Content-Type, Accept, Authorization",
  })
);

/* Commenting for test
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
*/
app.use(express.json());

const apiController = require("./controllers/apiController");
const userMessageBuilder = require("./messageBuilder/userMessageBuilder");

const adminRoute = require("./salesForce/route"); // Importing the route
app.use("/admin", adminRoute); //Setting the admin routes

// API route to generate text
app.post("/generate-text", async (req, res) => {
  const {
    userTopic,
    userContentType,
    userRecipient,
    userIndustry,
    userTemperature,
  } = req.body;
  const userMessage = userMessageBuilder.buildMessage(
    userTopic,
    userContentType,
    userRecipient,
    userIndustry
  );

  // Construct or retrieve the conversation messages array
  const conversation = [
    { role: "system", content: systemMessage },
    { role: "user", content: userMessage }, // User's input
  ];

  try {
    const generatedText = await apiController.generateText(
      conversation,
      userTemperature
    );

    // Use the OpenAI-generated search query
    const openaiSearchQueryResult = await generateSearchQuery(
      userTopic,
      userIndustry,
      userTemperature
    );

    // Construct the Adobe Stock link using the generated search query
    const adobeStockLink = `https://stock.adobe.com/images/search?k=${encodeURIComponent(
      openaiSearchQueryResult
    )}`;

    res.json({ text: generatedText, adobeStockLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/check-message", async (req, res) => {
  const { userTopic, userContentType, userRecipient, userIndustry } = req.body;
  const userMessage = userMessageBuilder.buildMessage(
    userTopic,
    userContentType,
    userRecipient,
    userIndustry
  );

  try {
    res.json({ text: userMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/adminsettings', (req, res) => {
  systemMessage = req.body.systemMessage;
  res.status(200).send('System message updated');
});

app.get('/get-system-message', (req, res) => {
  res.json({ systemMessage: systemMessage });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
