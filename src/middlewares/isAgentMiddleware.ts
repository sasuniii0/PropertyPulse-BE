import {  Response, NextFunction } from "express";
import { Role } from "../models/userModel";

export const agentOnly = (req: any, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== Role.AGENT) {
    return res.status(403).json({ message: "Only agents can add properties" });
  }

  next();
};
