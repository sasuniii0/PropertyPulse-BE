import { Schema, model, Document } from "mongoose";

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
}

export interface PaymentDocument extends Document {
  userId: string;
  amount: number;
  paymentStatus: PaymentStatus;
  createdAt: Date;
}

const PaymentSchema = new Schema<PaymentDocument>({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.PENDING },
  createdAt: { type: Date, default: Date.now },
});

export default model<PaymentDocument>("Payment", PaymentSchema);
