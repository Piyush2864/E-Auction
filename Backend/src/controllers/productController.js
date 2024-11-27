import Product from '../models/productModel.js';
import Seller from '../models/sellerModel.js';



// In your controllers/productController.js
export const createProduct = async (req, res) => {
    try {
        const { name, description, seller, category, startingDate, currentBid, bidEndDate, status } = req.body;

        // Validate required fields
        if (!name || !description || !seller || !category || !startingDate || !bidEndDate) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided.'
            });
        }

        const newProduct = new Product({
            name,
            description,
            seller,
            category,
            startingDate,
            currentBid,
            bidEndDate,
            status
        });

        const product = await newProduct.save();

        return res.status(201).json({
            success: true,
            message: 'Product created successfully.',
            data: product
        });
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};


export const getProductById = async(req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId).populate('seller category');
        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error("Error in fetching product.", error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};