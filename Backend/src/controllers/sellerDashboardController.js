import Product from '../models/productModel.js';



export const getSellerDashboard = async(req, res) => {
    try {
        const { sellerId } = req.params;

        if(!sellerId){
            return res.status(400).json({
                success: false,
                message: 'Seller Id is required',
            });
        }

        const dashboardData = await Product.aggregate([
            {
                $match: { seller: sellerId},
            },
            {
                $lookup: {
                    from: 'auctions',
                    localField: '_id',
                    foreignField: 'product',
                    as: 'auctions',
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    category: 1,
                    'auctions._id': 1,
                    'auctions.status': 1,
                    'auctions.bidEndDate': 1,
                    bidCount: { $size: '$bids'},
                    revenue: {
                        $sum: '$bids.amount',
                    },
                },
            },
        ]);

        const revenueData = dashboardData.reduce(
            (acc, product) => {
                acc.totalRevenue += product.revenue || 0;
                acc.totalProducts += 1;
                acc.totalBids += product.bidCount || 0;
                return acc;
            },
            { totalRevenue : 0, totalProducts: 0, totalBids: 0}
        );

        const dashboard = {
            listedProducts: dashboardData,
            totalRevenue: revenueData.totalRevenue,
            totalProducts: revenueData.totalProducts,
            totalBids: revenueData.totalBids,
        };

        return res.status(200).json({
            success: true,
            message: 'Seller dashboard fetched successfully.',
            data: dashboard,
        });
    } catch (error) {
        console.error('Error fetching seller dashboard:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching seller dashboard.'
        });
    }
};