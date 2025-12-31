import mongoose, { Schema, Document } from 'mongoose';

export enum DemandLevel {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum TrendType {
  RISING = 'RISING',
  STABLE = 'STABLE',
  FALLING = 'FALLING',
}

export interface IMarketAnalytics extends Document {
  month: string; // Format: YYYY-MM
  city: string;
  propertyType: string;
  avgPrice: number;
  totalListings: number;
  totalInquiries: number;
  demandLevel: DemandLevel;
  trend: TrendType;
  marketInsight?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MarketAnalyticsSchema: Schema = new Schema(
  {
    month: {
      type: String,
      required: true,
      index: true,
    },
    city: {
      type: String,
      required: true,
      default: 'all',
    },
    propertyType: {
      type: String,
      required: true,
      default: 'all',
    },
    avgPrice: {
      type: Number,
      required: true,
    },
    totalListings: {
      type: Number,
      required: true,
      default: 0,
    },
    totalInquiries: {
      type: Number,
      required: true,
      default: 0,
    },
    demandLevel: {
      type: String,
      enum: Object.values(DemandLevel),
      default: DemandLevel.MEDIUM,
    },
    trend: {
      type: String,
      enum: Object.values(TrendType),
      default: TrendType.STABLE,
    },
    marketInsight: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for unique monthly analytics per city and property type
MarketAnalyticsSchema.index(
  { month: 1, city: 1, propertyType: 1 },
  { unique: true }
);

// Index for faster queries by month
MarketAnalyticsSchema.index({ month: -1 });

// Index for city-based queries
MarketAnalyticsSchema.index({ city: 1, month: -1 });

export default mongoose.model<IMarketAnalytics>(
  'MarketAnalytics',
  MarketAnalyticsSchema
);