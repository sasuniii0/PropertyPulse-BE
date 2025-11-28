import { Request, Response } from "express";
import { IUser, Role, User } from "../models/userModel";
import { signAccessToken, signRefreshToken } from "../utils/tokens";
import { AuthRequest } from "../middlewares/authMiddleware";
import { UserStatus } from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const userRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, password, contactNumber, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !contactNumber || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate role
    if (!Object.values(Role).includes(role)) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email Already Registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with approval system
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      contactNumber,
      role,

      // Agent registration requires admin approval
      status: role === Role.AGENT ? UserStatus.PENDING : UserStatus.ACTIVE,
    });

    await newUser.save();

    return res.status(201).json({
      message:
        role === Role.AGENT
          ? "Agent registered successfully! Your account is pending admin approval."
          : "Client registered successfully!",
      data: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
      },
    });
  } catch (err: any) {
    console.error("Register Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const valid = await bcrypt.compare(password, existingUser.password);

    if (!valid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const accessToken = signAccessToken(existingUser);
    const refrreshToken = signRefreshToken(existingUser);

    res.status(200).json({
      message: "success",
      data: {
        email: existingUser.email,
        Role: existingUser.role,
        accessToken,
        refrreshToken,
      },
    });
  } catch (err: any) {
    res.status(500).json({ message: err?.message });
  }
};

export const handleRefreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Token Required" });
    }

    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh Token" });
    }

    const accessToken = signAccessToken(user);
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const getUserDetail = async (req:AuthRequest, res:Response) =>{
  if(!req.user) {
    return res.status(401).json({message : "Unauthorized"})
  }

  const userId = req.user.sub
  const user = ((await User.findById(userId).select("-password")) as IUser) || null

  if(!user) {
    return res.status(404).json({
      message : "User not found"
    })
  }

  const {name , email , role  } = user

  res.status(200).json({
    message : "OK",
    data: {
      name , email , role
    }
  })
}