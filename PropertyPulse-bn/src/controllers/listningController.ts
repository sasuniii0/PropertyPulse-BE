import { Request, Response } from "express";
import { PropertyType, ListingStatus, Listning } from "../models/listningModel";
import { AuthRequest } from "../middlewares/authMiddleware";
import cloudinary from "../config/cloudinary";

export const createListing = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, price, size, propertyType, location } = req.body;

    // Ensure user exists from JWT
    if (!req.user?.sub) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const agentId = req.user.sub; // <-- use JWT sub as agent

    // Validate property type
    if (!Object.values(PropertyType).includes(propertyType)) {
      return res.status(400).json({ message: "Invalid Property Type" });
    }

    let uploadedImages: string[] = [];

    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const result: any = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "listings" },
            (err, result) => (err ? reject(err) : resolve(result))
          );
          uploadStream.end(file.buffer);
        });
        uploadedImages.push(result.secure_url);
      }
    }

    console.log("Images to save:", uploadedImages); // <-- should log URLs

    // Create listing with agent assigned
    const listing = await Listning.create({
      title,
      description,
      price,
      size,
      propertyType,
      location,
      images: uploadedImages,
      agent: agentId,  // <-- fix: assign JWT sub
      status: ListingStatus.PENDING,
    });

    res.status(201).json({
      message: "Property submitted for admin approval",
      data: listing,
    });

  } catch (error: any) {
    console.error("Error creating listing:", error);
    res.status(500).json({ message: error.message || "Server error" });
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

    const { title, description, price,size, propertyType, location, images } = req.body;

    if (propertyType && !Object.values(PropertyType).includes(propertyType)) {
      return res.status(400).json({ message: "Invalid Property Type" });
    }

    let updatedData: any = { title, description, price,size , propertyType, location, images };

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

export const getAgentListings = async (req: AuthRequest, res: Response) => {
  try {
    const listings = await Listning.find({ agent: req.user?.sub });
    console.log("Listings found:", listings);

    res.json({
      message: "Agent listings fetched",
      listings, // use 'listings' so frontend matches
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



// SEARCH LISTINGS
export const searchListings = async (req: Request, res: Response) => {
  try {
    const { q, location, bedrooms, propertyType, minPrice, maxPrice } = req.query;

    let filter: any = {};

    // Keyword search
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } }
      ];
    }

    // Location search (Google Maps string)
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    // Property Type
    if (propertyType && propertyType !== "all") {
      filter.propertyType = propertyType;
    }

    // Bedrooms
    if (bedrooms && bedrooms !== "all") {
      if (bedrooms === "4+") {
        filter.bedrooms = { $gte: 4 };
      } else {
        filter.bedrooms = Number(bedrooms);
      }
    }

    // Price Range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Fetch only approved listings
    filter.status = "APPROVED";

    const results = await Listning.find(filter).populate("agent", "name email");

    res.json({
      message: "Search results",
      data: results,
    });

  } catch (error) {
    console.log("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
