import { Routes, Route } from "react-router-dom";

import DDSFashionHomepage from "./DDSFashionHomepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";
import MyOrders from "./pages/MyOrders";
import Wishlist from "./pages/Wishlist.jsx";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DDSFashionHomepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/myorders" element={<MyOrders />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}