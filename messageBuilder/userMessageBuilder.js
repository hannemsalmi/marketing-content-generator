function buildMessage (topic, content_type, recipient, industry) { // Builds message to be sent to GPT from the user's chosen preferences.
    let finalContent_type;

    if (content_type == "instagram") {
        finalContent_type = "instagram caption";

    } else {
        finalContent_type = content_type;

    }
    return "Write a " + finalContent_type
    + ". Topic: " + topic
    + ". Recipient works in " + recipient
    + " in " + industry + " industry.";

}

module.exports = {
    buildMessage,
};