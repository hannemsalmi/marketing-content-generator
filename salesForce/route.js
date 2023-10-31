const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const conn = require("./salesforceAPI");
router.use(bodyParser.json());

router.post("/create", (req, res) => {
  const objectName = "Marketing_Content__c";
  const data = {
    Title__c: req.body,
    Content__c: req.body,
  };

  conn.sobject(objectName).create(data, (error, ret) => {
    if (error || !ret.success) {
      console.error(error);
      res.status(500).json({ message: "Error creating new marketing content" });
    } else {
      res.json({
        message: "Marketing content created successfully with id: " + ret.id,
      });
      console.log("Marketing content created successfully with id: " + ret.id);
    }
  });
});

// Setting get router - for adding data to salesforce
router.get("/data", async (req, res) => {
  // Query for new data in the "Marketing_Content__c" object
  const objectName = "Marketing_Content__c";
  const query = "SELECT Id, Title__c, Content__c FROM " + objectName;

  conn.query(query, (err, result) => {
    if (err) {
      console.error("Error querying Salesforce: " + err);
    } else {
      console.log("New Data:");
      result.records.forEach((data) => {
        console.log("ID: " + data.Id);
        console.log("Title: " + data.Title__c);
        console.log("Content: " + data.Content__c);
      });
    }
  });
});
module.exports = router;
