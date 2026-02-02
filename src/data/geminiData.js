import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';


const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY, 
});

export async function questaoGemini(text) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: text,
  });

  console.log(response.text); 
  return response.text;
}
