import { Routes, Route } from "react-router-dom";

import DDSFashionHomepage from "./DDSFashionHomepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";
import MyOrders from "./pages/MyOrders";
import Wishlist from "./pages/Wishlist";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import Checkout from "./pages/Checkout";

import PageTransition from "./components/PageTransition";

export default function App() {
  return (
    <Routes>
      {/* HOME PAGE */}
      <Route
        path="/"
        element={
          <PageTransition>
            <DDSFashionHomepage />
          </PageTransition>
        }
      />

      {/* OPTIONAL HOME PAGE */}
      <Route
        path="/home"
        element={
          <PageTransition>
            <Home />
          </PageTransition>
        }
      />

      {/* SHOP */}
      <Route
        path="/shop"
        element={
          <PageTransition>
            <Shop />
          </PageTransition>
        }
      />

      {/* CATEGORIES */}
      <Route
        path="/categories"
        element={
          <PageTransition>
            <Categories />
          </PageTransition>
        }
      />

      {/* ABOUT */}
      <Route
        path="/about"
        element={
          <PageTransition>
            <About />
          </PageTransition>
        }
      />

      {/* CONTACT */}
      <Route
        path="/contact"
        element={
          <PageTransition>
            <Contact />
          </PageTransition>
        }
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={
          <PageTransition>
            <Login />
          </PageTransition>
        }
      />

      {/* REGISTER */}
      <Route
        path="/register"
        element={
          <PageTransition>
            <Register />
          </PageTransition>
        }
      />

      {/* PRODUCT DETAILS */}
      <Route
        path="/product/:id"
        element={
          <PageTransition>
            <ProductDetails />
          </PageTransition>
        }
      />

      {/* MY ORDERS */}
      <Route
        path="/myorders"
        element={
          <PageTransition>
            <MyOrders />
          </PageTransition>
        }
      />

      {/* WISHLIST */}
      <Route
        path="/wishlist"
        element={
          <PageTransition>
            <Wishlist />
          </PageTransition>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <PageTransition>
            <Admin />
          </PageTransition>
        }
      />

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin-dashboard"
        element={
          <PageTransition>
            <AdminDashboard />
          </PageTransition>
        }
      />

      {/* CHECKOUT */}
      <Route
        path="/checkout"
        element={
          <PageTransition>
            <Checkout />
          </PageTransition>
        }
      />
    </Routes>
  );
}