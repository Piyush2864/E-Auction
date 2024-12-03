import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import AdminDashboard from "./component/Admin/AdminDashboard";
import SellerDashboard from "./component/Seller/SellerDashboard";
import BuyerDashboard from "./component/Buyer/BuyerDashboard";
import Home from './component/Home'
import ProductDetails from "./component/Buyer/ProductDetails";
import AddProduct from "./component/Seller/AddProduct";
import ProductsPage from "./component/Buyer/Product";
import AddCategory from "./component/Seller/AddCategory";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/add-product" element={<AddProduct/>}/>
          <Route path="/product-details/:productId" element={<ProductDetails/>}/>
          <Route path="/products" element={<ProductsPage/>}/>
          <Route path="/add-category" element={<AddCategory/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
