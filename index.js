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

import fs from "fs"
import ollama from "ollama"

async function Chat() {
  try {
    const inputFilePath = "q.txt"
    const inputContent = fs.readFileSync(inputFilePath, "utf-8")

    const response = await ollama.chat({
      model: "llama3.2:3b",
      messages: [{ role: "user", content: inputContent }]
    })

    const chatbotResponse = response.message.content

    const outputFilePath = "a.txt"
    fs.writeFileSync(outputFilePath, chatbotResponse, "utf-8")

    console.log("Chatbot response has been saved to output.txt.")
  } catch (error) {
    console.error("Error occurred:", error.message)
  }
}

Chat()
//-------------------------------------------------------------------------
//                          Stage-C
//-------------------------------------------------------------------------
import fs from 'fs';
import ollama from 'ollama';

let folder = 'Questions';

async function processQuestion(question) {
  try {
    const response = await ollama.chat({
      model: "llama3.2:3b",
      messages: [{ role: 'user', content: question }]
    });

    return response.message.content;
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

fs.readdir(folder, (err, files) => {
  if (err) {
    return console.error('Error reading directory:', err.message);
  }

  files.forEach((file) => {
    const filepath = `${folder}/${file}`;
    fs.readFile(filepath, 'utf8', async (err, question) => {
      if (err) {
        return console.error(`Error reading file ${file}:`, err.message);
      }
      
      let ans_file = file;
      const response = await processQuestion(question);
      
      fs.mkdirSync('Answers', { recursive: true });
      let answer_path = `Answers/${ans_file.replace('Q', 'A')}`;
      fs.appendFileSync(answer_path, response);
    });
  });
});
