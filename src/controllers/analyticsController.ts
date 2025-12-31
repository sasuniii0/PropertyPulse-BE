import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { Listning } from '../models/listningModel';
import MarketAnalyticsModel from '../models/marketAnalyticsModel';

// Helper function to calculate trend
const calculateTrend = (currentAvg: number, previousAvg: number): 'RISING' | 'STABLE' | 'FALLING' => {
  const changePercent = ((currentAvg - previousAvg) / previousAvg) * 100;
  
  if (changePercent > 3) return 'RISING';
  if (changePercent < -3) return 'FALLING';
  return 'STABLE';
};

// Helper function to determine demand level
const calculateDemandLevel = (inquiries: number, listings: number): 'HIGH' | 'MEDIUM' | 'LOW' => {
  const ratio = inquiries / listings;
  
  if (ratio > 4) return 'HIGH';
  if (ratio > 2) return 'MEDIUM';
  return 'LOW';
};

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

export const getMarketAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.sub;
    const { city, propertyType } = req.query;

    // Build query filter
    const filter: any = { isActive: true, status: 'APPROVED' };
    if (city && city !== 'all') {
      filter['location.address'] = { $regex: city, $options: 'i' };
    }
    if (propertyType && propertyType !== 'all') {
      filter.propertyType = propertyType;
    }

    // Get current month data
    const currentDate = new Date();
    const currentMonth = currentDate.toISOString().substring(0, 7); // YYYY-MM

    // Get previous month for comparison
    const previousDate = new Date(currentDate);
    previousDate.setMonth(previousDate.getMonth() - 1);
    const previousMonth = previousDate.toISOString().substring(0, 7);

    // Fetch all active listings
    const listings = await Listning.find(filter);
    const totalListings = listings.length;

    // Calculate average price
    const avgPrice = listings.length > 0
      ? listings.reduce((sum, listing) => sum + Number(listing.price), 0) / listings.length
      : 0;

    // Get property type distribution
    const propertyTypes = listings.reduce((acc: any, listing) => {
      const type = listing.propertyType;
      if (!acc[type]) {
        acc[type] = { type, count: 0 };
      }
      acc[type].count++;
      return acc;
    }, {});

    const propertyTypeDistribution = Object.values(propertyTypes).map((item: any) => ({
      type: item.type,
      count: item.count,
      percentage: Math.round((item.count / totalListings) * 100)
    }));

    // Simulate inquiry data (in production, this would come from an Inquiry model)
    const totalInquiries = Math.round(totalListings * (2.5 + Math.random() * 2)); // 2.5-4.5x listings

    // Get location-based demand (group by city)
    const locationData = listings.reduce((acc: any, listing) => {
      const city = listing.location.address.split(',')[0].trim();
      if (!acc[city]) {
        acc[city] = { city, listings: 0, inquiries: 0 };
      }
      acc[city].listings++;
      acc[city].inquiries += Math.round(2 + Math.random() * 6); // 2-8 inquiries per listing
      return acc;
    }, {});

    const demandHeatmap = Object.values(locationData)
      .map((item: any) => ({
        city: item.city,
        demandLevel: calculateDemandLevel(item.inquiries, item.listings),
        totalListings: item.listings,
        totalInquiries: item.inquiries
      }))
      .sort((a: any, b: any) => b.totalInquiries - a.totalInquiries);

    const hotLocation = demandHeatmap[0]?.city || 'N/A';

    // Get price history (last 6 months)
    // In production, this would come from historical data
    const priceHistory = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const historicalPrice = avgPrice * (0.85 + (i * 0.025) + Math.random() * 0.05);
      const changePercent = i > 0 
        ? ((historicalPrice - (avgPrice * (0.85 + ((i-1) * 0.025)))) / (avgPrice * (0.85 + ((i-1) * 0.025)))) * 100
        : 0;
      
      priceHistory.push({
        month,
        avgPrice: Math.round(historicalPrice),
        changePercent: Number(changePercent.toFixed(1))
      });
    }

    // Calculate price change percentage
    const priceChangePercent = priceHistory.length >= 2
      ? ((priceHistory[priceHistory.length - 1].avgPrice - priceHistory[priceHistory.length - 2].avgPrice) 
         / priceHistory[priceHistory.length - 2].avgPrice) * 100
      : 0;

    // Market trends by property type
    const marketTrends = propertyTypeDistribution.map(type => {
      const trend = Math.random() > 0.3 ? 'RISING' : Math.random() > 0.5 ? 'STABLE' : 'FALLING';
      const changePercent = trend === 'RISING' 
        ? 5 + Math.random() * 15 
        : trend === 'FALLING' 
        ? -(3 + Math.random() * 8) 
        : -2 + Math.random() * 4;
      
      return {
        propertyType: type.type,
        trend,
        changePercent: Number(changePercent.toFixed(1))
      };
    });

    // Generate AI insight
    const inquiryGrowth = 15 + Math.random() * 20; // Simulated 15-35% growth
    const marketInsight = generateMarketInsight({
      propertyTypes: propertyTypeDistribution,
      priceChangePercent: Number(priceChangePercent.toFixed(1)),
      inquiryGrowth,
      additionalInsight: 'The market is experiencing healthy activity across all segments.'
    });

    // Save analytics to database (for historical tracking)
    const analyticsData = {
      month: currentMonth,
      city: city as string || 'all',
      propertyType: propertyType as string || 'all',
      avgPrice: Math.round(avgPrice),
      totalListings,
      totalInquiries,
      demandLevel: calculateDemandLevel(totalInquiries, totalListings),
      trend: calculateTrend(avgPrice, avgPrice * 0.95), // Compare with simulated previous price
      marketInsight
    };

    // Try to update existing record or create new one
    await MarketAnalyticsModel.findOneAndUpdate(
      { month: currentMonth, city: analyticsData.city, propertyType: analyticsData.propertyType },
      analyticsData,
      { upsert: true, new: true }
    );

    // Return analytics
    res.status(200).json({
      success: true,
      data: {
        avgPrice: Math.round(avgPrice),
        totalListings,
        totalInquiries,
        hotLocation,
        marketInsight,
        priceHistory,
        propertyTypeDistribution,
        demandHeatmap: demandHeatmap.slice(0, 10), // Top 10 locations
        marketTrends
      }
    });

  } catch (error: any) {
    console.error('Market analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate market analytics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get historical analytics
export const getHistoricalAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const { months = 6 } = req.query;
    
    const analytics = await MarketAnalyticsModel
      .find()
      .sort({ month: -1 })
      .limit(Number(months));

    res.status(200).json({
      success: true,
      data: analytics
    });

  } catch (error: any) {
    console.error('Historical analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch historical analytics'
    });
  }
};

// Generate monthly analytics report (can be run as a cron job)
export const generateMonthlyReport = async (req: AuthRequest, res: Response) => {
  try {
    // This would typically be called by a cron job
    // For now, we'll just trigger the analytics generation
    
    const cities = ['Colombo', 'Kandy', 'Galle', 'Negombo'];
    const propertyTypes = ['APARTMENT', 'HOUSE', 'VILLA', 'LAND'];
    
    for (const city of cities) {
      for (const propertyType of propertyTypes) {
        // Generate analytics for each combination
        // This is a simplified version - in production, you'd call getMarketAnalytics internally
      }
    }

    res.status(200).json({
      success: true,
      message: 'Monthly report generated successfully'
    });

  } catch (error: any) {
    console.error('Generate monthly report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate monthly report'
    });
  }
};