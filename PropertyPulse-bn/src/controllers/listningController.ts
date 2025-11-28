import { Request, Response } from "express";
import { PropertyType, ListingStatus, Listning } from "../models/listningModel";
import { User } from "../models/userModel";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createListing = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, price, propertyType, location, images } = req.body;

    // Validate Enum
    if (!Object.values(PropertyType).includes(propertyType)) {
      return res.status(400).json({ message: "Invalid Property Type" });
    }

    const listing = await Listning.create({
      title,
      description,
      price,
      propertyType,
      location,
      images,
      agent: req.user.id, 
      status: ListingStatus.PENDING,
    });

    res.status(201).json({
      message: "Property submitted for approval",
      data: listing,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
