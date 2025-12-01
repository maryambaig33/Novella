import { GoogleGenAI, Type } from "@google/genai";
import { Book } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to generate a consistent placeholder image based on title length/hash
const getMockCover = (seed: string) => {
    // Use picsum with a consistent seed based on string length to simulate a cover
    const id = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000;
    return `https://picsum.photos/seed/${id}/300/450`;
};

// Helper for random condition
const getCondition = (): 'New' | 'Like New' | 'Very Good' | 'Good' | 'Acceptable' => {
    const conditions = ['New', 'Like New', 'Very Good', 'Good', 'Acceptable'] as const;
    return conditions[Math.floor(Math.random() * conditions.length)];
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
              originalPrice: { type: Type.NUMBER, description: "Original MSRP price in USD" },
            },
            required: ["title", "author", "description", "genre", "rating", "originalPrice"],
          },
        },
      },
    });

    if (response.text) {
      const rawData = JSON.parse(response.text);
      return rawData.map((item: any, index: number) => {
        const condition = getCondition();
        // Calculate used price based on condition
        let discount = 0.3;
        if (condition === 'Acceptable') discount = 0.7;
        if (condition === 'Good') discount = 0.6;
        if (condition === 'Very Good') discount = 0.45;
        if (condition === 'Like New') discount = 0.2;
        if (condition === 'New') discount = 0;

        const price = Math.max(3.99, Number((item.originalPrice * (1 - discount)).toFixed(2)));
        const originalPrice = Number(item.originalPrice) || 19.99;

        return {
            id: `ai-${Date.now()}-${index}`,
            title: item.title,
            author: item.author,
            coverUrl: getMockCover(item.title),
            price: price,
            originalPrice: originalPrice,
            rating: item.rating || 4.5,
            description: item.description,
            genre: item.genre,
            condition: condition,
            points: Math.floor(price * 5),
            isBestSeller: false
        };
      });
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