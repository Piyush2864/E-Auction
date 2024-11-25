import Product from '../models/productModel.js';
import Seller from '../models/sellerModel.js';



export const createProduct = async(req, res) => {
    const { sellerId, ...productData } = req.body;

    try {
        const seller = await Seller.findById(sellerId);

        if(!seller) {
            return res.status(404).json({
                success: false,
                message: 'Seller not found.'
            });
        }

        const product = new Product({...productData, seller: sellerId});
        await product.save();

        seller.listedProducts.push(product._id);
        const listed = await seller.save();

        return res.status(201).json({
            success: true,
            message: "Product created successfully.",
            product,
            listed
        });
    } catch (error) {
        console.error("Error in adding product.", error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
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

        return res.status(200).jsoN({
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