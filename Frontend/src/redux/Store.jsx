import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/Slices/AuthSlice';
import userReducer from '../redux/Slices/UserSlice';
import sellerReducer from '../redux/Slices/SellerSlice';
import categoryReducer from '../redux/Slices/CategorySlice';
import productReducer from  '../redux/Slices/ProductSlice';
import bidReducer from '../redux/Slices/BidSlice';




const store = configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
      seller: sellerReducer,
      category: categoryReducer,
      product: productReducer,
      bid: bidReducer
    }
});


export default store;