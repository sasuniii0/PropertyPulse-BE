import { Request, Response } from "express";
import { User, Role, UserStatus } from "../models/userModel"

// Get all pending agents
export const getPendingAgents = async (req: Request, res: Response) => {
  try {
    const agents = await User.find({ role: Role.AGENT, status: UserStatus.PENDING });
    res.json({ count: agents.length, agents });
  } catch (err: any) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Approve an agent
export const approveAgent = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "Agent not found" });
    if (user.role !== Role.AGENT) return res.status(400).json({ message: "User is not an agent" });

    user.status = UserStatus.ACTIVE;
    await user.save();

    res.json({ message: "Agent approved successfully", agent: user });
  } catch (err: any) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Reject an agent
export const rejectAgent = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "Agent not found" });
    if (user.role !== Role.AGENT) return res.status(400).json({ message: "User is not an agent" });

    user.status = UserStatus.REJECTED;
    await user.save();

    res.json({ message: "Agent rejected successfully", agent: user });
  } catch (err: any) {
    res.status(500).json({ message: "Server Error" });
  }
};
