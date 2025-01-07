import ollama from "ollama";

async function runChat() {
  try {
    const response = await ollama.chat({
      model: "llama3.2:3b",
      messages: [{ role: 'user', content: "Create API documentation" }]
    });

    console.log("Chatbot Response:", response.message.content);
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

runChat();