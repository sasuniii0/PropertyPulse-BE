// controllers/aiController.ts
import { Request, Response } from "express";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateListingAISummary = async (req: Request, res: Response) => {
  try {
    const { description, title, price, location, propertyType, bedrooms } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    const prompt = `
      Create a short, attractive real estate summary.
      Details:
      - Title: ${title}
      - Description: ${description}
      - Price: ${price}
      - Location: ${location}
      - Property Type: ${propertyType}
      - Bedrooms: ${bedrooms}

      Write a professional 2–3 sentence summary appealing to buyers.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 120,
      temperature: 0.7,
    });

    const aiSummary = completion.choices[0].message.content;

    res.json({ summary: aiSummary });

  } catch (error) {
    console.error("AI Summary Error:", error);
    res.status(500).json({ message: "Failed to generate AI summary" });
  }
};
