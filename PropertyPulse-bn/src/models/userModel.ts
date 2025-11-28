import mongoose, { Schema, Document } from "mongoose";

export enum UserStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export enum Role {
  CLIENT = "CLIENT",
  ADMIN = "ADMIN",
  AGENT = "AGENT",
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  status: UserStatus;
  contactNumber?: string;
  phone?: string;
  bio?: string;
  ratings?: number;
  savedListings?: mongoose.Types.ObjectId[];
  listings?: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, lowercase: true },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.CLIENT,
    },

    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,  // For normal users
    },

    // Normal user fields
    contactNumber: { type: String },
    savedListings: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Listing" }
    ],
    phone: { type: String },

    // Agent-specific fields
    bio: { type: String },
    ratings: { type: Number, default: 0 },
    listings: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Listing" }
    ],
  },
  { timestamps: true }
);

export const User =  mongoose.model<IUser>("User", UserSchema);
