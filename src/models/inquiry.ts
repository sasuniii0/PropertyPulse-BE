import mongoose, { Schema, Document } from "mongoose";

export enum InquiryStatus {
  PENDING = "PENDING",
  RESPONDED = "RESPONDED",
  CLOSED = "CLOSED",
}

export interface IInquiry extends Document {
  client: mongoose.Types.ObjectId;
  agent: mongoose.Types.ObjectId;
  listing: mongoose.Types.ObjectId;
  message: string;
  agentResponse?: string;
  status: InquiryStatus;
}

const InquirySchema = new Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listning",
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    agentResponse: {
      type: String,
    },

    status: {
      type: String,
      enum: Object.values(InquiryStatus),
      default: InquiryStatus.PENDING,
    },
  },
  { timestamps: true }
);

export const Inquiry = mongoose.model<IInquiry>("Inquiry", InquirySchema);
