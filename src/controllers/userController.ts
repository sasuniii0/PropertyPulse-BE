import { Request, Response } from "express";
import { User } from "../models/userModel";
import { AuthRequest } from "../middlewares/authMiddleware";

//   UPDATE / EDIT USER PROFILE
export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const allowedFields = [
      "name",
      "contactNumber",
      "phone",
      "bio",
      "ratings",
    ];

    const dataToUpdate: any = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        dataToUpdate[key] = req.body[key];
      }
    });

    // Optional: Allow email update only if you want
    if (req.body.email) {
      dataToUpdate.email = req.body.email.toLowerCase();
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      dataToUpdate,
      { new: true }
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//       DELETE USER ACCOUNT
export const deleteAccount = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    await user.deleteOne();

    res.json({
      message: "Account deleted successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyDetails = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.sub) {
      return res.status(401).json({ message: "Unauthorized, user not found in request" });
    }

    const user = await User.findById(req.user.sub).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User details fetched", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


