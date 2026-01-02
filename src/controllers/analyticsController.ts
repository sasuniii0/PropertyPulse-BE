import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { Listning } from '../models/listningModel';
import { Inquiry } from '../models/inquiry';
import savedListingModal from '../models/savedListingModal';
import MarketAnalyticsModel from '../models/marketAnalyticsModel';

// Generate AI-powered market insights
const generateMarketInsight = (data: any): string => {
  const insights = [];
  
  // Check property type dominance
  const maxType = data.propertyTypes.reduce((max: any, type: any) => 
    type.count > max.count ? type : max
  );
  
  if (maxType.percentage > 35) {
    insights.push(`${maxType.type}s dominate the market with ${maxType.percentage}% share`);
  }
  
  // Check price trend
  if (data.priceChangePercent > 10) {
    insights.push(`experiencing strong upward momentum with ${data.priceChangePercent}% price growth`);
  } else if (data.priceChangePercent > 5) {
    insights.push(`showing steady growth with ${data.priceChangePercent}% increase`);
  } else if (data.priceChangePercent < -5) {
    insights.push(`facing a price correction of ${Math.abs(data.priceChangePercent)}%`);
  }
  
  // Check demand
  if (data.inquiryGrowth > 20) {
    insights.push('with increasing buyer demand');
  } else if (data.inquiryGrowth > 10) {
    insights.push('with steady buyer interest');
  }
  
  return insights.join(', ') + '. ' + (data.additionalInsight || '');
};

/* ---------------- HELPERS ---------------- */

const calculateTrend = (current: number, previous: number) => {
  if (!previous) return "STABLE";
  const diff = ((current - previous) / previous) * 100;
  if (diff > 3) return "RISING";
  if (diff < -3) return "FALLING";
  return "STABLE";
};

const calculateDemandLevel = (inquiries: number, listings: number) => {
  if (!listings) return "LOW";
  const ratio = inquiries / listings;
  if (ratio > 4) return "HIGH";
  if (ratio > 2) return "MEDIUM";
  return "LOW";
};

/* ---------------- CONTROLLER ---------------- */

export const getMarketAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const { city = "all", propertyType = "all" } = req.query;

    /* ---------- LISTING FILTER ---------- */
    const filter: any = {
      isActive: true,
      status: "APPROVED",
    };

    if (city !== "all") {
      filter["location.address"] = { $regex: city, $options: "i" };
    }

    if (propertyType !== "all") {
      filter.propertyType = propertyType;
    }

    /* ---------- LISTINGS ---------- */
    const listings = await Listning.find(filter);
    const totalListings = listings.length;

    const avgPrice =
      totalListings > 0
        ? listings.reduce((s, l) => s + Number(l.price), 0) / totalListings
        : 0;

    /* ---------- PROPERTY TYPE DISTRIBUTION ---------- */
    const propertyTypeDistribution = await Listning.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$propertyType",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          type: "$_id",
          count: 1,
          percentage: {
            $round: [
              { $multiply: [{ $divide: ["$count", totalListings] }, 100] },
              0,
            ],
          },
        },
      },
    ]);

    /* ---------- INQUIRIES (REAL DEMAND) ---------- */
    const inquiries = await Inquiry.find({
      listing: { $in: listings.map((l) => l._id) },
    });

    const totalInquiries = inquiries.length;

    /* ---------- DEMAND HEATMAP (CITY BASED) ---------- */
    const demandHeatmap = await Inquiry.aggregate([
      {
        $lookup: {
          from: "listnings",
          localField: "listing",
          foreignField: "_id",
          as: "listing",
        },
      },
      { $unwind: "$listing" },
      { $match: filter },
      {
        $group: {
          _id: "$listing.location.address",
          totalInquiries: { $sum: 1 },
          totalListings: { $addToSet: "$listing._id" },
        },
      },
      {
        $project: {
          city: "$_id",
          totalInquiries: 1,
          totalListings: { $size: "$totalListings" },
          demandLevel: {
            $cond: [
              { $gt: [{ $divide: ["$totalInquiries", { $size: "$totalListings" }] }, 4] },
              "HIGH",
              {
                $cond: [
                  { $gt: [{ $divide: ["$totalInquiries", { $size: "$totalListings" }] }, 2] },
                  "MEDIUM",
                  "LOW",
                ],
              },
            ],
          },
        },
      },
      { $sort: { totalInquiries: -1 } },
    ]);

    const hotLocation = demandHeatmap[0]?.city || "N/A";

    /* ---------- USER INTEREST (SAVED PROPERTIES) ---------- */
    const savedStats = await savedListingModal.aggregate([
      {
        $lookup: {
          from: "listnings",
          localField: "listing",
          foreignField: "_id",
          as: "listing",
        },
      },
      { $unwind: "$listing" },
      { $match: filter },
      {
        $group: {
          _id: "$listing.propertyType",
          saves: { $sum: 1 },
        },
      },
    ]);

    /* ---------- PRICE HISTORY (LAST 6 MONTHS) ---------- */
    const priceHistory = await Listning.aggregate([
      { $match: filter },
      {
        $group: {
          _id: { $month: "$createdAt" },
          avgPrice: { $avg: "$price" },
        },
      },
      { $sort: { "_id": 1 } },
      { $limit: 6 },
    ]);

    /* ---------- AI-STYLE INSIGHT (REAL DATA) ---------- */
    const dominantType = propertyTypeDistribution.sort(
      (a: any, b: any) => b.count - a.count
    )[0];

    const marketInsight = dominantType
      ? `${dominantType.type} listings dominate the market with ${dominantType.percentage}% share. Demand is ${calculateDemandLevel(
          totalInquiries,
          totalListings
        ).toLowerCase()} across major cities.`
      : "Market data is stabilizing.";

    /* ---------- RESPONSE ---------- */
    res.status(200).json({
      success: true,
      data: {
        avgPrice: Math.round(avgPrice),
        totalListings,
        totalInquiries,
        hotLocation,
        propertyTypeDistribution,
        demandHeatmap,
        savedStats,
        priceHistory,
        marketInsight,
      },
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate analytics",
    });
  }
};

export const getHistoricalAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const months = Number(req.query.months) || 6;

    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - months);

    /* ---------- LISTINGS PER MONTH ---------- */
    const listingStats = await Listning.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          status: "APPROVED",
          isActive: true,
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          avgPrice: { $avg: "$price" },
          totalListings: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    /* ---------- INQUIRIES PER MONTH ---------- */
    const inquiryStats = await Inquiry.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalInquiries: { $sum: 1 },
        },
      },
    ]);

    /* ---------- MERGE DATA ---------- */
    const history = listingStats.map((l, index) => {
      const inquiry = inquiryStats.find(
        (i) =>
          i._id.year === l._id.year && i._id.month === l._id.month
      );

      const previous = index > 0 ? listingStats[index - 1] : null;

      return {
        month: `${l._id.year}-${String(l._id.month).padStart(2, "0")}`,
        avgPrice: Math.round(l.avgPrice),
        totalListings: l.totalListings,
        totalInquiries: inquiry?.totalInquiries || 0,
        demandLevel: calculateDemandLevel(
          inquiry?.totalInquiries || 0,
          l.totalListings
        ),
        trend: calculateTrend(
          l.avgPrice,
          previous?.avgPrice || l.avgPrice
        ),
      };
    });

    res.status(200).json({
      success: true,
      data: history.reverse(), // oldest → newest
    });
  } catch (error) {
    console.error("Historical analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch historical analytics",
    });
  }
};

export const generateMonthlyReport = async (req: AuthRequest, res: Response) => {
  try {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const end = new Date();

    const report = await Listning.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          status: "APPROVED",
          isActive: true,
        },
      },
      {
        $lookup: {
          from: "inquiries",
          localField: "_id",
          foreignField: "listing",
          as: "inquiries",
        },
      },
      {
        $group: {
          _id: {
            city: "$location.address",
            propertyType: "$propertyType",
          },
          avgPrice: { $avg: "$price" },
          totalListings: { $sum: 1 },
          totalInquiries: { $sum: { $size: "$inquiries" } },
        },
      },
      {
        $project: {
          city: "$_id.city",
          propertyType: "$_id.propertyType",
          avgPrice: { $round: ["$avgPrice", 0] },
          totalListings: 1,
          totalInquiries: 1,
          demandLevel: {
            $cond: [
              { $gt: [{ $divide: ["$totalInquiries", "$totalListings"] }, 4] },
              "HIGH",
              {
                $cond: [
                  { $gt: [{ $divide: ["$totalInquiries", "$totalListings"] }, 2] },
                  "MEDIUM",
                  "LOW",
                ],
              },
            ],
          },
        },
      },
      { $sort: { totalInquiries: -1 } },
    ]);

    res.status(200).json({
      success: true,
      month: start.toISOString().substring(0, 7),
      report,
    });
  } catch (error) {
    console.error("Generate monthly report error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate monthly report",
    });
  }
};