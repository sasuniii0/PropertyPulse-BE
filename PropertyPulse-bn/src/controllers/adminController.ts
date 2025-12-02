import { Request, Response } from "express";
import { ListingStatus, Listning } from "../models/listningModel";
import { User } from "../models/userModel";

export const approveListing = async (req: Request, res: Response) => {
  try {
    const listing = await Listning.findByIdAndUpdate(
      req.params.id,
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
    const listing = await Listning.findByIdAndUpdate(
      req.params.id,
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
