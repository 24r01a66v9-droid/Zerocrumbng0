
import { GoogleGenAI, Type } from "@google/genai";
import { FoodListing, User } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSmartMatchingInsights = async (listings: FoodListing[], receiverReq: { people: number, type: string }) => {
  try {
    const prompt = `Given the following food listings: ${JSON.stringify(listings)} and a requirement for ${receiverReq.people} people needing ${receiverReq.type} food. Recommend the best listings to claim. Return results in JSON format with an array of recommendation objects {listingId: string, matchScore: number, reason: string}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  listingId: { type: Type.STRING },
                  matchScore: { type: Type.NUMBER },
                  reason: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini matching failed", error);
    return { recommendations: [] };
  }
};
