import { Request, Response } from "express";
import { PropertyType, ListingStatus, Listning } from "../models/listningModel";
import { AuthRequest } from "../middlewares/authMiddleware";
import cloudinary from "../config/cloudinary";

// CREATE LISTING
export const createListing = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, price, propertyType, location } = req.body;

    // Validate property type enum
    if (!Object.values(PropertyType).includes(propertyType)) {
      return res.status(400).json({ message: "Invalid Property Type" });
    }

    let uploadedImages: string[] = [];

    // HANDLE MULTI-IMAGE UPLOAD
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const result: any = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "listings" },
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          );
          uploadStream.end(file.buffer);
        });

        uploadedImages.push(result.secure_url);
      }
    }

    // Create listing
    const listing = await Listning.create({
      title,
      description,
      price,
      propertyType,
      location, // Google Maps Autocomplete location field
      images: uploadedImages,
      agent: req.user?.id,
      status: ListingStatus.PENDING, // goes for admin approval
    });

    res.status(201).json({
      message: "Property submitted for admin approval",
      data: listing,
    });

  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// UPDATE LISTING
export const updateListing = async (req: AuthRequest, res: Response) => {
  try {
    const listingId = req.params.id;

    const listing = await Listning.findById(listingId);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    if (listing.agent.toString() !== req.user?.id) {
      return res.status(403).json({ message: "Unauthorized: Not your listing" });
    }

    const { title, description, price, propertyType, location, images } = req.body;

    if (propertyType && !Object.values(PropertyType).includes(propertyType)) {
      return res.status(400).json({ message: "Invalid Property Type" });
    }

    let updatedData: any = { title, description, price, propertyType, location, images };

    // If a new image is uploaded
    if (req.file) {
      const uploadResult: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "listings" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(req.file?.buffer);
      });

      updatedData.images = uploadResult.secure_url;
    }

    const updatedListing = await Listning.findByIdAndUpdate(listingId, updatedData, {
      new: true,
    });

    res.json({
      message: "Listing updated successfully",
      data: updatedListing,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE LISTING
export const deleteListing = async (req: AuthRequest, res: Response) => {
  try {
    const listingId = req.params.id;

    const listing = await Listning.findById(listingId);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    if (listing.agent.toString() !== req.user?.id) {
      return res.status(403).json({ message: "Unauthorized: Not your listing" });
    }

    await listing.deleteOne();

    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL LISTINGS
export const getAllListings = async (req: Request, res: Response) => {
  try {
    const listings = await Listning.find().populate("agent", "name email");

    res.json({
      message: "All listings fetched",
      data: listings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET SINGLE LISTING
export const getListingById = async (req: Request, res: Response) => {
  try {
    const listing = await Listning.findById(req.params.id).populate(
      "agent",
      "name email"
    );

    if (!listing) return res.status(404).json({ message: "Listing not found" });

    res.json({
      message: "Listing fetched",
      data: listing,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET LISTINGS OF LOGGED-IN AGENT
export const getAgentListings = async (req: AuthRequest, res: Response) => {
  try {
    const listings = await Listning.find({ agent: req.user?.id });

    res.json({
      message: "Agent listings fetched",
      data: listings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
