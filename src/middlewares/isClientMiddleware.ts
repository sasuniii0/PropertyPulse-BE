import { Request, Response, NextFunction } from "express";
import { Role } from "../models/userModel";

const clientOnly = (req: any, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== Role.CLIENT) {
    return res.status(403).json({ message: "Only clients can view " });
  }

  next();
};

export default clientOnly