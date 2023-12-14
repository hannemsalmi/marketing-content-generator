let instructions = {
  instagram: process.env.INSTAGRAM_INSTRUCTION,
  linkedin: process.env.LINKEDIN_INSTRUCTION,
  email: process.env.EMAIL_INSTRUCTION,
  whitepaper: process.env.WHITEPAPER_INSTRUCTION,
  blog: process.env.BLOG_INSTRUCTION,
  eBook: process.env.EBOOK_INSTRUCTION,
};

function buildMessage(topic, content_type, recipient, industry) {
  // Builds message to be sent to GPT from the user's chosen preferences.
  let finalContent_type = instructions[content_type] || "default instructions";

  if (content_type == "instagram") {
    finalContent_type = instructions["instagram"];
  } else if (content_type == "linkedin") {
    finalContent_type = instructions["linkedin"];
  } else if (content_type == "email") {
    finalContent_type = instructions["email"];
  } else if (content_type == "whitepaper") {
    finalContent_type = instructions["whitepaper"];
  } else if (content_type == "blog") {
    finalContent_type = instructions["blog"];
  } else if (content_type == "eBook") {
    finalContent_type = instructions["eBook"];
  }

  return (
    "Write " +
    finalContent_type +
    ". Topic: " +
    topic +
    ". Recipient works in " +
    recipient +
    " in " +
    industry +
    " industry."
  );
}

function updateInstructions(newInstructions) {
  instructions = { ...instructions, ...newInstructions };
}

module.exports = {
  buildMessage,
  updateInstructions,
  getInstructions: () => instructions,
};
