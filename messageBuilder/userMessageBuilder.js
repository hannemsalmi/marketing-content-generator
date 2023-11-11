function buildMessage (topic, content_type, recipient) { // Builds message to be sent to GPT from the user's chosen preferences.
    return "Write" + content_type
    + ". Topic: " + topic
    + ". Recipient: " + recipient;

}

module.exports = {
    buildMessage,
};