function buildMessage(topic, content_type, recipient, industry) { // Builds message to be sent to GPT from the user's chosen preferences.
    let finalContent_type;

    if (content_type == "instagram") {
        finalContent_type = "bullet point list of 3 instagram caption suggestions";

    } else if (content_type == "linkedin") {
        finalContent_type = "linkedin post aimed at the customers of the company working in the specified role and industry. Please insert line breaks as <br>.";

    } else if (content_type == "email") {
        finalContent_type = "email to send to the customer's mailing list. Please insert line breaks as <br> and bold the subject line with <b> and </b>.";

    }

    return "Write a " + finalContent_type
        + ". Topic: " + topic
        + ". Recipient works in " + recipient
        + " in " + industry + " industry.";

}

module.exports = {
    buildMessage,
};