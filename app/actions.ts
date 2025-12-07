"use server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_API_KEY});


type TranslateAction = {
  text: string;
  source: string;
  target: string;
};

export async function translateAction({
  text,
  source,
  target,
}: TranslateAction) {
  const prompt = `
        You are a helpful assistant that translates languages.
        Translate this from ${source} to ${target}. Keep medical terminology precise.
        Text: ${text}
    `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}
