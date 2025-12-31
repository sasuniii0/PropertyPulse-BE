import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import savedListingModal from '../models/savedListingModal';
import { Listning } from '../models/listningModel';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const compareProperties = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.sub;
    const { property1Id, property2Id } = req.body;

    if (!property1Id || !property2Id) {
      return res.status(400).json({
        success: false,
        message: "Both property IDs are required",
      });
    }

    const saved1 = await savedListingModal.findOne({ user: userId, listing: property1Id });
    const saved2 = await savedListingModal.findOne({ user: userId, listing: property2Id });

    if (!saved1 || !saved2) {
      return res.status(404).json({
        success: false,
        message: "Both properties must be saved to compare",
      });
    }

    const p1 = await Listning.findById(property1Id);
    const p2 = await Listning.findById(property2Id);

    if (!p1 || !p2) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const prompt = `
You are a professional real estate advisor.

Property 1:
Title: ${p1.title}
Price: LKR ${p1.price}
Type: ${p1.propertyType}
Bedrooms: ${p1.bedrooms}
Bathrooms: ${p1.bathrooms}
Location: ${p1.location.address}

Property 2:
Title: ${p2.title}
Price: LKR ${p2.price}
Type: ${p2.propertyType}
Bedrooms: ${p2.bedrooms}
Bathrooms: ${p2.bathrooms}
Location: ${p2.location.address}

Provide comparison using EXACT labels:
KEY_DIFFERENCES:
PROPERTY1_PROS:
PROPERTY1_CONS:
PROPERTY2_PROS:
PROPERTY2_CONS:
BEST_FOR:
RECOMMENDATION:
`;

    const result = await model.generateContent(prompt);
    let aiResponse = result.response.text();

    // Remove markdown symbols (* and **)
    aiResponse = aiResponse.replace(/\*\*?/g, "").trim();

    const parse = (label: string) => {
      const regex = new RegExp(`${label}:([\\s\\S]*?)(?=\\n[A-Z_]+:|$)`, "i");
      return aiResponse.match(regex)?.[1]?.trim() || "Not available";
    };

    res.status(200).json({
      success: true,
      data: {
        keyDifferences: parse("KEY_DIFFERENCES"),
        property1Pros: parse("PROPERTY1_PROS"),
        property1Cons: parse("PROPERTY1_CONS"),
        property2Pros: parse("PROPERTY2_PROS"),
        property2Cons: parse("PROPERTY2_CONS"),
        bestFor: parse("BEST_FOR"),
        recommendation: parse("RECOMMENDATION"),
      },
    });
  } catch (error) {
    console.error("Gemini comparison error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to compare properties",
    });
  }
};
