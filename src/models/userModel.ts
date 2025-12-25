import mongoose, { Schema, Document } from "mongoose";

export enum Role {
  CLIENT = "CLIENT",
  ADMIN = "ADMIN",
  AGENT = "AGENT",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  contactNumber?: string;
  phone?: string;
  bio?: string;
  ratings?: number;
  isActive : Boolean;
  savedListings?: mongoose.Types.ObjectId[];
  listings?: mongoose.Types.ObjectId[];
  paymentStatus?: PaymentStatus;
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

    // Normal user fields
    contactNumber: { type: String },
    savedListings: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Listing" }
    ],
    phone: { type: String },

    paymentStatus: {
    type: String,
    enum: Object.values(PaymentStatus),
    default: PaymentStatus.PENDING,
  },

    // Agent-specific fields
    bio: { type: String },
    isActive: { type: Boolean, default: true },
    ratings: { type: Number, default: 0 },
    listings: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Listing" }
    ],
  },
  { timestamps: true }
);

export const User =  mongoose.model<IUser>("User", UserSchema);
