const express = require("express");
const cors = require("cors");
const app = express();
const fetch = require('node-fetch');
const port = process.env.PORT || 3005;


let systemMessage = process.env.DEFAULT_SYSTEM_MESSAGE;

// Addin this part of code for testing purpose
/*app.use(
  cors({
    origin: "https://aigen-dev-ed.develop.lightning.force.com",
    methods: "GET, POST, OPTIONS",
    allowedHeaders: "Content-Type, Accept, Authorization",
  })
);*/


/*app.use((req, res, next) => {
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
}); */

const corsOptions = {
  origin: "https://aigen-dev-ed.develop.lightning.force.com",
  methods: "GET, POST, OPTIONS",
  allowedHeaders: "Content-Type, Accept, Authorization"
};

app.use(cors(corsOptions));

app.use(express.json());

const apiController = require("./controllers/apiController");
const userMessageBuilder = require("./messageBuilder/userMessageBuilder");
const generateSearchQuery = require("./searchQuery/searchQueryHelper");


const adminRoute = require("./salesForce/route"); // Importing the route
app.use("/admin", adminRoute); //Setting the admin routes

// API route to generate text
app.post("/generate-text", cors(), async (req, res) => {
  const {
    userMessage,
    userTemperature,
  } = req.body;

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

    res.json({ text: generatedText});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/generate-query-link', async (req, res) => {
  const { userTopic, userIndustry, userTemperature } = req.body;

  try {
    const generatedSearchQuery = await generateSearchQuery(userTopic, userIndustry, userTemperature);
    res.json({ searchQuery: generatedSearchQuery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/check-message", async (req, res) => {
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

//Route to set system message
app.post("/set-system-message", (req, res) => {
  systemMessage = req.body.systemMessage;
  res.status(200).send("System message updated");
});

//Get current system message
app.get("/get-system-message", (req, res) => {
  res.json({ systemMessage: systemMessage });
});

//Reset to default system message from env variable
app.post("/reset-system-message", (req, res) => {
  systemMessage = process.env.DEFAULT_SYSTEM_MESSAGE;
  res.status(200).send("System message reset to default");
});

// Endpoint to get default instruction for a given content type
app.get("/get-default-instruction/:contentType", (req, res) => {
  const contentType = req.params.contentType.toUpperCase();
  const defaultInstruction = process.env[`${contentType}_INSTRUCTION`];

  if (defaultInstruction) {
      res.json({ defaultInstruction: defaultInstruction });
  } else {
      res.status(404).json({ error: 'Default instruction not found' });
  }
});



app.post("/update-instructions", (req, res) => {
  const newInstructions = req.body;
  userMessageBuilder.updateInstructions(newInstructions);
  res.status(200).send("Instructions updated");
});

app.get("/get-instructions", (req, res) => {
  res.json(userMessageBuilder.getInstructions());
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
