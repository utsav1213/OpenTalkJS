// import ollama from "ollama";

// async function runChat() {
//   try {
//     const response = await ollama.chat({
//       model: "llama3.2:3b",
//       messages: [{ role: 'user', content: "Create API documentation" }]
//     });

//     console.log("Chatbot Response:", response.message.content);
//   } catch (error) {
//     console.error("Error occurred:", error.message);
//   }
// }

// runChat();
//---------------------------------------------------------------------------------
//  Stage:2
//---------------------------------------------------------------------------------

import ollama from "ollama";
import fs from "fs";

let q= fs.readFileSync("./q.txt", "utf-8");
console.log(q)

askQuestion()
async function askQuestion() {
  try {
    const response = await ollama.chat({
      model: "llama3.2:3b",
      messages: [{ role: 'user', content: q }]
    });

    fs.writeFileSync("./a.txt", response.message.content);

  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}