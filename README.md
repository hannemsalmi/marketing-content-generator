# Marketing Content Generator

## Overview

AI-Driven Content Generator for Salesforce Marketing Cloud with GPT-4. The Node.js core application acts as a bridge between GPT-4 API and Salesforce, providing an interface for accepting inputs, processing data through GPT-4 API, and interacting with Salesforce CRM.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hannemsalmi/marketing-content-generator.git

3. Navigate to the project directory:

   ```bash
   cd marketing-content-generator
  
5. Install dependencies:

   ```bash
   npm install

## Configuration

Configure the application by creating a `.env` file in the root directory and specifying the necessary environment variables.

Create a file named `.env`:

```dotenv
# .env

GPT4_API_KEY=YOUR_GPT4_API_KEY
SALESFORCE_USERNAME=YOUR_SALESFORCE_USERNAME
SALESFORCE_PASSWORD=YOUR_SALESFORCE_PASSWORD
SALESFORCE_SECURITY_TOKEN=YOUR_SALESFORCE_SECURITY_TOKEN
DEFAULT_SYSTEM_MESSAGE=YOUR_DEFAULT_SYSTEM_MESSAGE
PORT=YOUR_PORT
```

Make sure not to share your .env file publicly, as it contains sensitive information. Add it to your .gitignore file to prevent accidental commits.

## Usage
Start the Node.js core application:

```bash
npm start
```

The application will be accessible at `http://localhost:3005`.

## User Message Builder
The `userMessageBuilder.js` module exports a function `buildMessage` that takes parameters for the topic, content type, recipient, and industry. The function returns a formatted user message object containing this information.

### Variables:

* **topic** = Specifies the topic of the content for AI processing.<br>
* **content_type** = Influences how the application handles and processes content based on the specified platform, whether it's an email, Instagram post, or LinkedIn message.<br>
* **recipient** = Tailors the content for a specific audience.<br>
* **industry** = Allows the application to customize responses based on the context of a particular industry.<br>

## Image Search with Adobe Stock
The program constructs Adobe Stock links based on the generated search queries from user input in the `index.js` file.
```js
 // Construct the Adobe Stock link using the generated search query
 const adobeStockLink = `https://stock.adobe.com/images/search?k=${encodeURIComponent(
   openaiSearchQueryResult
 )}`;
```
