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
import CreateAuction from "./component/CreateAuction";
import Navbar from './component/Navbar';
import Footer from './component/Footer';
 
function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/" element={<Home/>}/>
          <Route path="/add-product" element={<AddProduct/>}/>
          <Route path="/product-details/:productId" element={<ProductDetails/>}/>
          <Route path="/products" element={<ProductsPage/>}/>
          <Route path="/add-category" element={<AddCategory/>} />
          <Route path="/create-auction" element={<CreateAuction/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
