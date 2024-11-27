import Product from '../models/productModel.js';
import Seller from '../models/sellerModel.js'



// In your controllers/productController.js
export const createProduct = async (req, res) => {
    const { name, description, seller, category, startingDate, currentBid, bidEndDate } = req.body;
    try {
        if (!name || !description || !seller || !category || !startingDate || !bidEndDate) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        const sellerExists = await Seller.findById(seller);
        if (!sellerExists) {
            return res.status(404).json({
                success: false,
                message: 'Seller not found. Please provide a valid seller Id.'
            });
        }

        const newProduct = new Product({
            name,
            description,
            seller,
            category,
            startingDate,
            currentBid: currentBid || 0,
            bidEndDate,
        });

        const savedProduct = await newProduct.save();

        sellerExists.listedProducts.push(savedProduct._id);
        await sellerExists.save();

        return res.ststus(201).json({
            success: true,
            message: 'Product created successfully.',
            data: savedProduct
        });
    } catch (error) {
        console.error('Error creating product.', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const getProductById = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId).populate('seller category');
        if (!product) {
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