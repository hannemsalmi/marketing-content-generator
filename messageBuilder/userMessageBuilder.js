function buildMessage(topic, content_type, recipient, industry) { // Builds message to be sent to GPT from the user's chosen preferences.
    let finalContent_type;

    if (content_type == "instagram") {
        finalContent_type = "a bullet point list of 3 Instagram caption suggestions. Please separate each point in list with line breaks as <br>";

    } else if (content_type == "linkedin") {
        finalContent_type = "a LinkedIn post aimed at the customers of the company working in the specified role and industry. Please insert line breaks as <br> and insert two line breaks when the paragraph changes";

    } else if (content_type == "email") {
        finalContent_type = "an email to send to the customer's mailing list. Please insert line breaks as <br> and bold the subject line with <b> and </b>. Please also insert two line breaks after the subject and also when the paragraph changes";

    } 

    return "Write " + finalContent_type
        + ". Topic: " + topic
        + ". Recipient works in " + recipient
        + " in " + industry + " industry. Do this from the perspective of employee working for Fluido";

}

module.exports = {
    buildMessage,
};
