import { Request, Response } from "express";
import { ListingStatus, Listning } from "../models/listningModel";
import { User } from "../models/userModel";

export const approveListing = async (req: Request, res: Response) => {
  try {
    const listingId = req.body.id;

    const listing = await Listning.findByIdAndUpdate(
      listingId,
      { status: ListingStatus.APPROVED },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json({ message: "Listing Approved", data: listing });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const rejectListing = async (req: Request, res: Response) => {
  try {
    const listingId = req.body.id;

    const listing = await Listning.findByIdAndUpdate(
      listingId,
      { status: ListingStatus.REJECTED },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json({ message: "Listing Rejected", data: listing });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getPendingListnings = async (req: Request, res: Response) => {
  try {
    const pendingListings = await Listning.find({ status: ListingStatus.PENDING }).populate("agent", "name email");
    res.json({ message: "Pending Listings fetched", data: pendingListings });
  }catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllAgents = async (req: Request , res: Response) => {
  const agents = await User.find({ role : "AGENT"});
  res.json({ agents});
}

export const getAllUsers = async (req: Request , res: Response) => {
  const clients = await User.find({ role : "CLIENT"});
  res.json({ clients });
}

export const deactivateAgent = async (req: Request, res: Response) => {
  const agentId = req.params.id;

  const agent = await User.findById(agentId);
  if (!agent) return res.status(404).json({ message: "Agent not found" });

  agent.isActive = false;
  await agent.save();

  res.json({ message: "Agent account deactivated" });
};

export const activateAgent = async (req: Request, res: Response) => {
  const agentId = req.params.id;

  const agent = await User.findById(agentId);
  if (!agent) return res.status(404).json({ message: "Agent not found" });

  agent.isActive = true;
  await agent.save();

  res.json({ message: "Agent account activated" });
};


export const getAllListings = async (req: Request, res: Response) => {
  try {
    const listings = await Listning.find()
      .populate("agent", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All listings fetched successfully",
      data: listings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getSingleListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const listing = await Listning.findById(id).populate(
      "agent",
      "name email"
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json({
      message: "Listing fetched successfully",
      data: listing,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedListing = await Listning.findByIdAndUpdate(
      id,
      {
        $set: req.body, // allows partial updates
      },
      { new: true, runValidators: true }
    ).populate("agent", "name email");

    if (!updatedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json({
      message: "Listing updated successfully",
      data: updatedListing,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedListing = await Listning.findByIdAndDelete(id);

    if (!deletedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json({
      message: "Listing deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLocations = async (req: Request, res: Response) => {
  try {
    // Fetch properties with only required fields: _id, title, and location
    const properties = await Listning.find({}, { title: 1, location: 1, _id: 1 });

    // Return the locations
    res.status(200).json(properties);
  } catch (err) {
    console.error("Failed to fetch property locations:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};