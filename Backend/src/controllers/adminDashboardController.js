import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Auction from '../models/auctionModel.js';
import Bid from '../models/bidModel.js';


export const getAdminDashboardData = async(req, res) => {
    try {
        const dashboardStats = await Promise.all([

            User.aggregate([
                {
                    $group: {
                        _id: "$role",
                        count: { $sum: 1},
                    },
                },
            ]),

            Product.aggregate([
                { $match: { status: 'active'}},
                {
                    $group: {
                        _id: null,
                        totalProducts: { $sum : 1},
                    },
                },
            ]),

            Auction.aggregate([
                {$match: {status: 'active'}},
                {
                    $group: {
                        _id: null,
                        totalActiveAuctions: { $sum: 1},
                    },
                },
            ]),

            Bid.aggregate([
                {
                    $group: {
                        _id: null,
                        totalBids: { $sum: 1},
                    },
                },
            ]),

            Auction.aggregate([
                { $match: { status: 'completed'}},
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: '$winningBidAmount'},
                    },
                },
            ]),

            Product.aggregate([
                {
                    $group: {
                        _id: "$seller",
                        totalProducts: { $sum: 1},
                    },
                },
            ]),

            Bid.aggregate([
                {
                    $group: {
                        _id: "$product",
                        totalBids: { $sum: 1},
                    },
                },
            ]),
        ]);

        const userStats = dashboardStats[0];
        const totalProducts = dashboardStats[1][0]?.totalProducts || 0;
        const activeAuctions = dashboardStats[2][0]?.totalActiveAuctions || 0;
        const totalBids = dashboardStats[3][0]?.totalBids || 0;
        const totalRevenue = dashboardStats[4][0]?.totalRevenue || 0;
        const sellerPerformance = dashboardStats[5];
        const bidPerformance = dashboardStats[6];

        return res.status(200).json({
            success: true,
            data: {
                userStats,
                totalProducts,
                totalProducts,
                activeAuctions,
                totalBids,
                totalRevenue,
                sellerPerformance,
                bidPerformance
            },
        });
    } catch (error) {
        console.error('Error fetching Admin Dashboard data:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Unable to fetch dashboard data.'
        });
    }
};