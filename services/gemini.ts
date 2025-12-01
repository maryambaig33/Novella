import { GoogleGenAI, Type } from "@google/genai";
import { Book } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to generate a consistent placeholder image based on title length/hash
const getMockCover = (seed: string) => {
    // Use picsum with a consistent seed based on string length to simulate a cover
    const id = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000;
    return `https://picsum.photos/seed/${id}/300/450`;
};

export const getBookRecommendations = async (userQuery: string): Promise<Book[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Recommend 5 specific real-world books based on this user request: "${userQuery}". 
      Ensure the books are diverse.
      Provide the response in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              author: { type: Type.STRING },
              description: { type: Type.STRING, description: "A short, engaging synopsis of the book." },
              genre: { type: Type.STRING },
              rating: { type: Type.NUMBER, description: "Average rating out of 5" },
              price: { type: Type.NUMBER, description: "Estimated price in USD" },
            },
            required: ["title", "author", "description", "genre", "rating", "price"],
          },
        },
      },
    });

    if (response.text) {
      const rawData = JSON.parse(response.text);
      return rawData.map((item: any, index: number) => ({
        id: `ai-${Date.now()}-${index}`,
        title: item.title,
        author: item.author,
        coverUrl: getMockCover(item.title),
        price: item.price || 14.99,
        rating: item.rating || 4.5,
        description: item.description,
        genre: item.genre,
        isBestSeller: false
      }));
    }
    return [];
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};

export const explainBookVibe = async (title: string, author: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `In one short, poetic sentence, describe the "vibe" or aesthetic of reading "${title}" by ${author}.`,
        });
        return response.text || "A mysterious and engaging read.";
    } catch (e) {
        return "A classic worth your time.";
    }
}
