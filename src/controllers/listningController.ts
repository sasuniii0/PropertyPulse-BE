import { Request, Response } from "express";
import { PropertyType, ListingStatus ,Listning } from "../models/listningModel";
import { AuthRequest } from "../middlewares/authMiddleware";
import cloudinary from "../config/cloudinary";
import { Inquiry } from "../models/inquiry";

export const createListing = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, price, size, bathrooms, bedrooms ,propertyType, listingType , location} = req.body;

    if (!req.user?.sub) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    const agentId = req.user.sub;

    const uploadedImages: string[] = [];

    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files as Express.Multer.File[]) {
        const uploaded = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "listings" },
            (err, result) => {
              if (err) {
                console.error("Cloudinary error:", err);
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(file.buffer);
        });

        if (uploaded?.secure_url) {
          uploadedImages.push(uploaded.secure_url);
        }
      }
    }

    const listing = await Listning.create({
      title,
      description,
      price,
      size,
      bathrooms,
      bedrooms,
      propertyType,
      listingType,
      location, // <-- this must be an object
      images: uploadedImages,
      agent: agentId,
      status: ListingStatus.PENDING,
    });

    res.status(201).json({
      message: "Property submitted for admin approval",
      data: listing,
    });

  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};


// UPDATE LISTING
export const updateListing = async (req: AuthRequest, res: Response) => {
  try {
    const listingId = req.params.id;

    const listing = await Listning.findById(listingId);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    if (listing.agent.toString() !== req.user?.sub) {
      return res.status(403).json({ message: "Unauthorized: Not your listing" });
    }

    const { title, description, price,size, propertyType,bathrooms,bedrooms, listningType, location, images } = req.body;

    if (propertyType && !Object.values(PropertyType).includes(propertyType)) {
      return res.status(400).json({ message: "Invalid Property Type" });
    }

    let updatedData: any = { title, description, price,size ,bathrooms,bedrooms, propertyType,listningType, location, images };

    const uploadedImages: string[] = [];

    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files as Express.Multer.File[]) {
        const uploaded = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "listings" },
            (err, result) => {
              if (err) {
                console.error("Cloudinary error:", err);
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(file.buffer);
        });

        if (uploaded?.secure_url) {
          uploadedImages.push(uploaded.secure_url);
        }
      }
    }

    if (uploadedImages.length > 0) {
      updatedData.images = uploadedImages;
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

export const approvedListning = async (req: AuthRequest, res: Response) => {
  try {
    const listings = await Listning.find({ status: ListingStatus.APPROVED }).populate("agent", "name email");
    res.json({
      message: "Approved listings fetched",
      data: listings,
    });
  } catch (error) {
      console.log("Search error:", error);
  }
}

export const getLocations = async (req: Request, res: Response) => {
  try {
    const properties = await Listning.find(
      { location: { $exists: true } },
      { title: 1, location: 1, _id: 1 }
    ).lean();

    return res.status(200).json(properties);
  } catch (err: any) {
    console.error("Failed to fetch property locations:", err.message);
    return res.status(500).json({ message: err.message });
  }
};

// Get all listings by agent
export const getListingsByAgent = async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;
    const listings = await Listning.find({ agent: agentId }).lean();
    res.status(200).json({ listings });
  } catch (err: any) {
    console.error("Failed to fetch listings by agent:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyListings = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.sub;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const listings = await Listning.find({
      agent: userId,   // ✅ FIX HERE
      isActive: true,  // optional but recommended
    });

    res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });
  } catch (error) {
    console.error("Get my listings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch listings",
    });
  }
};

export const getRecentListing = async (req: AuthRequest, res: Response) => {
  try {
    const recentListings = await Listning.find({
      status: ListingStatus.APPROVED,
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title price images location propertyType createdAt");

    res.status(200).json({
      success: true,
      listings: recentListings,
    });
  } catch (err) {
    console.error("Failed to fetch recent listings:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAgentListingsAPI = async (req: AuthRequest, res: Response) => {
  try {
    const agentId = req.user.sub; // assuming you have auth middleware setting req.user

    const listings = await Listning.find({ agent: agentId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (err) {
    console.error("Error fetching agent listings:", err);
    res.status(500).json({ success: false, message: "Failed to fetch agent listings" });
  }
};

/**
 * Get all inquiries assigned to the logged-in agent
 */
export const getInquiriesByAgent = async (req: AuthRequest, res: Response) => {
  try {
    const agentId = req.user.sub; // assuming you have auth middleware setting req.user

    const inquiries = await Inquiry.find({ agent: agentId })
      .populate("client", "name email")
      .populate("listing", "title price propertyType") // populate listing info
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: inquiries,
    });
  } catch (err) {
    console.error("Error fetching agent inquiries:", err);
    res.status(500).json({ success: false, message: "Failed to fetch agent inquiries" });
  }
};