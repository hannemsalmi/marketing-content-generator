const jsforce = require("jsforce");
const conn = new jsforce.Connection();

//Dotenv configuration
require("dotenv").config();

conn.login(
  process.env.SALESFORCE_USERNAME,
  process.env.SALESFORCE_PASSWORD + process.env.SALESFORCE_SECURITY_TOKEN,
  async (error, userInfo) => {
    if (error) {
      console.log("Authentication failed: " + error);
    } else {
      console.log(
        "Authentication successful. Cached Token: " + conn.accessToken
      );

      console.log("Cached Server URL: " + conn.instanceUrl);
      console.log("Logged in as: " + userInfo.username);
    }
  }
);

module.exports = conn;
