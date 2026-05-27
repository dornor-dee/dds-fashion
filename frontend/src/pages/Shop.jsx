import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";

import Navbar from "../components/Navbar";
import CartPanel from "../components/CartPanel";
import QuickViewModal from "../components/QuickViewModal";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const categories = [
  "All",
  "Women",
  "Men",
  "Sneakers",
  "Watches",
  "Streetwear",
  "Bags",
  "Perfumes",
];

export default function Shop() {
  const [searchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromUrl || "All"
  );

  const [selectedProduct, setSelectedProduct] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }

    alert(`${product.name} added to cart`);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item._id === product._id);

    const updatedWishlist = exists
      ? wishlist.filter((item) => item._id !== product._id)
      : [...wishlist, product];

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const addRecentlyViewed = (product) => {
    let updatedRecent =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    updatedRecent = updatedRecent.filter((item) => item._id !== product._id);
    updatedRecent.unshift(product);
    updatedRecent = updatedRecent.slice(0, 6);

    localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecent));
  };

  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.qty,
    0
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const publicKey = "pk_test_c829d118f7882cf0457d8b6e92d3caae5d69d5e5";

  const cartPaystackConfig = {
    email: userInfo?.email || "customer@email.com",
    amount: cartTotal * 100,
    publicKey,
    currency: "GHS",
    text: "Pay Now",

    onSuccess: async (reference) => {
      try {
        const orderItems = cart.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id,
        }));

        const orderRes = await API.post("/api/orders", {
          user: userInfo._id,
          orderItems,
          totalPrice: cartTotal,
        });

        await API.put(`/api/orders/${orderRes.data._id}/pay`, {
          id: reference.reference,
          status: "success",
          update_time: new Date().toISOString(),
          email_address: userInfo.email,
        });

        alert("Payment successful and order saved!");
        setCart([]);
        setShowCart(false);
      } catch (error) {
        console.log(error);
        alert("Payment was successful, but order saving failed.");
      }
    },

    onClose: () => {
      alert("Transaction closed");
    },
  };

 useEffect(() => {
  const loadWishlist = () => {
    API.get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((error) => console.log(error));

    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  };

  loadWishlist();
}, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {showCart && (
        <CartPanel
          cart={cart}
          userInfo={userInfo}
          cartTotal={cartTotal}
          setShowCart={setShowCart}
          removeFromCart={removeFromCart}
          decreaseQty={decreaseQty}
          increaseQty={increaseQty}
          cartPaystackConfig={cartPaystackConfig}
        />
      )}

      <QuickViewModal
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        addToCart={addToCart}
      />

      <Navbar userInfo={userInfo} cart={cart} setShowCart={setShowCart} />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
          DDS Collection
        </p>

        <h1 className="mt-3 text-5xl font-black">
          Shop All Products
        </h1>

        <div className="mt-10 mb-12 grid gap-5 md:grid-cols-2">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dresses..."
            className="w-full rounded-full border border-white/10 bg-[#111111] px-7 py-5 text-lg text-white placeholder:text-white/40 outline-none focus:border-yellow-400"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-full border border-white/10 bg-[#111111] px-7 py-5 text-lg text-white outline-none focus:border-yellow-400"
          >
            <option className="bg-black text-white" value="All">
              All Categories
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="bg-black text-white"
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
              addRecentlyViewed={addRecentlyViewed}
              setSelectedProduct={setSelectedProduct}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}