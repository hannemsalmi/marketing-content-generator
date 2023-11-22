function buildMessage (topic, content_type, recipient, industry) { // Builds message to be sent to GPT from the user's chosen preferences.
    return "Write" + content_type
    + ". Topic: " + topic
    + ". Recipient: " + recipient
    + ". Industry: " + industry;

}

module.exports = {
    buildMessage,
};