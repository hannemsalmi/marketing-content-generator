function buildMessage (topic, content_type, recipient) { // Builds message to be sent to GPT from the user's chosen preferences.
    return "Kirjoita " + content_type
    + ". Aihe: " + topic
    + ". Vastaanottaja: " + recipient;

}

module.exports = {
    buildMessage,
};