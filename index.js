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

// import ollama from "ollama";
// import fs from "fs/promises";

// async function askQuestion() {
//   try {
//     // Read the question from the file
//     let q = await fs.readFile("q.txt", "utf-8");
//     console.log(q);

//     const response = await ollama.chat({
//       model: "llama3.2:3b",
//       messages: [{ role: "user", content: q }]
//     });
//     const a=response.message.content;

//     await fs.writeFile("a.txt", a);
//     console.log("Response written to a.txt");
//   } catch (error) {
//     console.error("Error occurred:", error.message);
//   }
// }
// askQuestion();
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
