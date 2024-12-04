import Product from '../models/productModel.js';
import Category from '../models/category.js';
import User from '../models/userModel.js';

export const createProduct = async (req, res) => {
  const { name, description, category, startingDate, currentBid, bidEndDate } = req.body;

  try {
    
    if (!name || !description || !category || !startingDate || !bidEndDate) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    if (!user.isSeller) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You must be approved as a seller to add products.',
      });
    }

    
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: 'Category not found. Please provide a valid category Id.',
      });
    }

    
    const newProduct = new Product({
      name,
      description,
      seller: userId, // Link to the buyer who became a seller
      category,
      startingDate,
      currentBid: typeof currentBid === 'number' ? currentBid : 0,
      bidEndDate,
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      success: true,
      message: 'Product created successfully.',
      data: savedProduct,
    });
  } catch (error) {
    console.error('Error creating product.', error);
    return res.status(500).json({
      success: false,
      message: 'Server error.',
    });
  }
};



export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().lean();

        return res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error.',
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


export const getApprovedProduct = async(req, res) => {
  try {
    const products = await Product.find({ status: 'approved' });

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching approved products', error: error.message });
  }
};


export const getUpcominProducts = async(req, res) => {
  try {
    const currentDate = new Date();

    const products = await Product.find({ auctionStartDate: { $gt: currentDate }, status: 'approved' });

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching upcoming products', error: error.message });
  }
};
