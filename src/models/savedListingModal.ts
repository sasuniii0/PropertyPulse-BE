import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../models/userModel";  // import IUser if you want type reference
import { IListning } from "../models/listningModel"; // import IListing if defined

export interface ISavedProperty extends Document {
  user: mongoose.Types.ObjectId | IUser;
  listing: mongoose.Types.ObjectId | IListning;
  createdAt: Date;
  updatedAt: Date;
}

const SavedPropertySchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listning",
      required: [true, "Listing is required"],
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

// Ensure a user can't save the same property twice
SavedPropertySchema.index({ user: 1, listing: 1 }, { unique: true });

// Index for faster queries by user & createdAt
SavedPropertySchema.index({ user: 1, createdAt: -1 });

export default mongoose.model<ISavedProperty>("SavedProperty", SavedPropertySchema);
