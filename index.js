const express = require("express");
const app = express();
const port = process.env.PORT || 3005;

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://marketing-content-generator-02c05e08f82e.herokuapp.com"
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
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: userMessage }, // User's input
  ];

  try {
    const generatedText = await apiController.generateText(
      conversation,
      userTemperature
    );
    res.json({ text: generatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
