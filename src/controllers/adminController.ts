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
