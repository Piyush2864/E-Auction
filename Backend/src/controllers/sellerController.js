import Product from '../models/productModel.js';
import Seller from '../models/sellerModel.js';


export const createSeller = async (req, res) => {
    const { name, email, phone, address } = req.body;
    try {
        const existingSeller = await Seller.findOne({ email });

        if (existingSeller) {
            return res.status(400).json({
                success: false,
                message: 'Seller with this email already exixts.'
            });
        }

        const newSeller = new Seller({
            name,
            email,
            phone,
            address,
        });

        const savedSeller = await newSeller.save();

        return res.status(201).json({
            success: true,
            message: 'Seller created successfully.',
            data: savedSeller
        });
    } catch (error) {
        console.error('Error creating seller.', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};

export const getAllSeller = async (req, res) => {
    try {
        const seller = await Seller.find().populate('listedProducts', 'name description status');
        return res.status(200).json({
            success: true,
            data: seller
        });
    } catch (error) {
        console.error('Error in fetching all sellers.', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const getSellerById = async (req, res) => {
    const { sellerId } = req.params;
    console.log("seller", sellerId)
    try {
        const seller = await Seller.findById(sellerId).populate('listedProducts');
        console.log("seller", sellerId)
        if (!seller) {
            return res.status(404).json({
                success: false,
                message: 'Seller not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: "Seller found",
            data: seller
        });
    } catch (error) {
        console.error("Error in fetching seller by id");
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const updateSeller = async (req, res) => {
    const { sellerId } = req.params;
    const { name, phone, address } = req.body;

    try {
        const updatedSeller = await Seller.findByIdAndUpdate(sellerId, { name, phone, address }, { new: true });

        if (!updatedSeller) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Updated successfully.',
            data: updatedSeller
        })
    } catch (error) {
        console.error("Error in updating.", error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const deleteSeller = async (req, res) => {
    const { sellerId } = req.params;

    try {
        const deleteSeller = await Seller.findByIdAndDelete(sellerId);

        if (!deleteSeller) {
            return res.status(404).json({
                success: false,
                message: 'Seller not found.'
            });
        }

        await Product.deleteMany({ seller: sellerId });
        return res.status(200).json({
            success: true,
            message: 'Seller and their product delete successfully.'
        });
    } catch (error) {
        console.error('Error in deleting seller.', error);
        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};


export const getSellerProducts = async (req, res) => {
    const { sellerId } = req.params;

    try {
        const seller = await Seller.findById(sellerId).populate('listedProducts');
        if (!seller) {
            return res.status(404).json({
                success: false,
                message: 'Seller not found.'
            });
        }

        return res.status(200).json({
            success: true,
            data: seller.listedProducts
        });
    } catch (error) {
        console.error('Error in fetching sellers products.', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


// export const verifySeller = async (req, res) => {
//     const { sellerId } = req.params;
//     console.log("seller", sellerId)
//     try {
//         const seller = await Seller.findByIdAndUpdate(sellerId, { verified: true }, { new: true });

//         if (!seller) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Seller not found.'
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: 'Seller verified successfully.',
//             data: seller
//         });
//     } catch (error) {
//         console.error("Error in verifing seller.");
//         return res.status(500).json({
//             success: false,
//             message: 'Server error.'
//         });
//     }
// };