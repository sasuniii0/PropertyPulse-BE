import { NextFunction, Response } from "express";
import { Role } from "../models/userModel";
import { AuthRequest } from "./authMiddleware";

export const requireRole = (roles: Role[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const userRole = req.user.role as Role;

        // Check if the user's role is in the allowed roles
        const hasRole = roles.includes(userRole);

        if (!hasRole) {
            return res.status(403).json({
                message: `Require ${roles.join(", ")} role`,
            });
        }

        next();
    };
};
