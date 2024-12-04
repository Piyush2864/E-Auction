import Cart from '../models/cartModel .js';
import Product from '../models/productModel.js';



export const addToCart = async (req, res) => {
    try {
      const { productId } = req.body;
      const userId = req.user._id; 
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      if (product.auctionStartDate <= new Date()) {
        return res
          .status(400)
          .json({ success: false, message: 'Cannot add active or past auctions to the cart' });
      }
  
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        cart = new Cart({ user: userId, products: [productId] });
      } else if (!cart.products.includes(productId)) {
        cart.products.push(productId);
      }
  
      await cart.save();
  
      res.status(200).json({ success: true, message: 'Product added to cart', data: cart });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error adding to cart', error: error.message });
    }
  };
  
 
  export const viewCartItems = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const cart = await Cart.findOne({ user: userId }).populate('products');
  
      if (!cart || cart.products.length === 0) {
        return res.status(404).json({ success: false, message: 'No items in the cart' });
      }
  
      res.status(200).json({ success: true, data: cart.products });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching cart items', error: error.message });
    }
  };