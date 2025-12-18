import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { User } from "../models/userModel";
import { Listning } from "../models/listningModel";
import mongoose from "mongoose";


export const saveListing = async (req: AuthRequest, res: Response) => {
  try {
    const listingId = req.params.id;

    const listing = await Listning.findById(listingId);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    const user = await User.findById(req.user?.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Convert string → ObjectId
    const listingObjectId = new mongoose.Types.ObjectId(listingId);

    // Prevent duplicate saves
    if (user.savedListings?.some(id => id.equals(listingObjectId))) {
      return res.status(400).json({ message: "Listing already saved" });
    }

    user.savedListings?.push(listingObjectId);
    await user.save();

    res.json({ message: "Listing saved successfully" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeSavedListing = async (req: AuthRequest, res: Response) => {
  try {
    const listingId = req.params.id;

    const user = await User.findById(req.user?.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Normalize listingId
    const listingObjectId = new mongoose.Types.ObjectId(listingId);

    // FIX: use savedListings and fallback to empty array
    user.savedListings = (user.savedListings ?? []).filter(
      id => !id.equals(listingObjectId)
    );

    await user.save();

    res.json({ message: "Saved listing removed" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getSavedListings = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).populate(
      "savedListings"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      message: "Saved listings fetched",
      data: user.savedListings,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
