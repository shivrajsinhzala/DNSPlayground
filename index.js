import { createResponse, createTxtAnswer, startUdpServer } from "denamed";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyDbpZyXOuORdbzP5-n4D7hDkuPiJ-cPAt0";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b",
});

startUdpServer(
  async (query) => {
    let ques = query.questions[0].name;
    let q = query.questions[0];

    const question = ques.split(".").join(" ");

    const prompt = `
      answer this question in one word or one sentence if possible
      only give the answer to the question
      Q: ${question}\n`;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());

    return createResponse(query, [
      createTxtAnswer(q, result.response.text().trim()),
    ]);
  },
  {
    port: 3001,
  }
);
