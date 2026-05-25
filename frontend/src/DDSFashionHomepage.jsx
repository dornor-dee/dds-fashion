import { useEffect, useState } from "react";
import API from "./services/api";
import { motion } from "framer-motion";
import { Star, Truck, ShieldCheck } from "lucide-react";
import TrendingSlider from "./components/TrendingSlider";
import Navbar from "./components/Navbar";
import CartPanel from "./components/CartPanel";
import QuickViewModal from "./components/QuickViewModal";
import ProductCard from "./components/ProductCard";

const categories = [
  "Women",
  "Men",
  "Sneakers",
  "Watches",
  "Luxury Accessories",
  "Streetwear",
  "Bags",
  "Glasses",
  "Chains",
  "Luxury Accessories",
  "Hoodies",
];

export default function DDSFashionHomepage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

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

  const addRecentlyViewed = (product) => {
    let updatedRecent =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    updatedRecent = updatedRecent.filter((item) => item._id !== product._id);
    updatedRecent.unshift(product);
    updatedRecent = updatedRecent.slice(0, 6);

    localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecent));
    setRecentlyViewed(updatedRecent);
  };

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
    API.get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((error) => console.log("Product fetch error:", error));
  }, []);

  useEffect(() => {
  const loadSavedData = () => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);

    const savedRecent =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    setRecentlyViewed(savedRecent);
  };

  loadSavedData();
}, []);

  return (
    <main className="min-h-screen bg-white text-black">
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

      {/* PROMO BAR */}
      <div className="bg-yellow-400 py-3 text-center text-sm font-black uppercase tracking-widest text-black">
        Free shipping on orders over ₵500 • New styles added weekly
      </div>

      <Navbar userInfo={userInfo} cart={cart} setShowCart={setShowCart} />

      {/* HERO VIDEO */}
<section className="relative h-[780px] overflow-hidden">
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 h-full w-full object-cover"
  >
    <source src="/videos/fashion-hero.mp4" type="video/mp4" />
  </video>

  <div className="absolute inset-0 bg-black/55" />

  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9 }}
    className="relative z-10 flex h-full items-center justify-center px-6 text-center text-white"
  >
    <div>
      <p className="text-sm font-black uppercase tracking-[0.5em] text-yellow-300">
        DDS Fashion
      </p>

      <h1 className="mt-6 text-6xl font-black uppercase leading-none md:text-8xl">
        Own The Moment
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-xl font-medium text-white/85">
        Bold styles. Luxury looks. Fashion made to turn every entrance into a
        statement.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a
          href="/shop"
          className="rounded-full bg-yellow-400 px-10 py-4 font-black text-black transition hover:scale-105 hover:bg-white"
        >
          Shop The Drop
        </a>

        <a
          href="/categories"
          className="rounded-full border-2 border-white px-10 py-4 font-black text-white transition hover:bg-white hover:text-black"
        >
          Explore Styles
        </a>
      </div>
    </div>
  </motion.div>
</section>

      {/* CATEGORY TILES */}
      <section className="bg-white px-6 py-20 text-black">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-black uppercase tracking-[0.4em] text-yellow-600">
              Shop The Look
            </p>

            <h2 className="mt-3 text-5xl font-black uppercase">
              Categories
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {categories.slice(0, 6).map((category) => (
              <a
                key={category}
                href="/shop"
                onClick={() => setSelectedCategory(category)}
                className="group relative h-[420px] overflow-hidden rounded-3xl"
              >
                <img
                  src={
  {
    Women:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
    Men:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=80",
    Sneakers:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
    Watches:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
    Chains:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
    Streetwear:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80",
    Bags:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80",
    Glasses:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=900&q=80",
    "Luxury Accessories":
      "https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?auto=format&fit=crop&w=900&q=80",
    Hoodies:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
  }[category]
}
                  alt={category}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/35" />

                <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-black uppercase text-white">
                    {category}
                  </h3>

                  <p className="mt-2 font-bold text-yellow-300">
                    Shop Now →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <TrendingSlider
  products={products}
  wishlist={wishlist}
  toggleWishlist={toggleWishlist}
  addToCart={addToCart}
  addRecentlyViewed={addRecentlyViewed}
  setSelectedProduct={setSelectedProduct}
/>

      {/* BANNER */}
      <section className="relative h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=80"
          alt="Fashion banner"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 flex items-center px-6">
          <div className="mx-auto w-full max-w-7xl text-white">
            <p className="text-sm font-black uppercase tracking-[0.4em] text-yellow-300">
              Limited Drop
            </p>

            <h2 className="mt-4 max-w-3xl text-6xl font-black uppercase leading-none">
              Dresses Made For The Spotlight
            </h2>

            <a
              href="/shop"
              className="mt-8 inline-block rounded-full bg-yellow-400 px-10 py-4 font-black text-black hover:bg-white"
            >
              Shop The Drop
            </a>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="shop" className="bg-[#0a0a0a] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-black uppercase tracking-[0.4em] text-yellow-400">
              DDS Collection
            </p>

            <h2 className="mt-3 text-5xl font-black uppercase">
              New Arrivals
            </h2>
          </div>

          {/* SEARCH + FILTER */}
          <div className="mb-12 grid gap-5 md:grid-cols-2">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search dresses..."
              className="w-full rounded-full border border-white/10 bg-white/10 px-7 py-5 text-lg text-white placeholder:text-white/40 outline-none focus:border-yellow-400"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/10 px-7 py-5 text-lg text-white outline-none focus:border-yellow-400"
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

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
        </div>
      </section>

      {/* RECENTLY VIEWED */}
      {recentlyViewed.length > 0 && (
        <section className="bg-black px-6 py-20 text-white">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-black uppercase tracking-[0.4em] text-yellow-400">
              Your History
            </p>

            <h2 className="mt-3 text-5xl font-black uppercase">
              Recently Viewed
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {recentlyViewed.map((product) => (
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
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <section className="bg-white px-6 py-20 text-center text-black">
        <h2 className="text-5xl font-black uppercase">
          Join The DDS List
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70">
          Get exclusive drops, discounts, and early access to new fashion
          collections.
        </p>

        <div className="mx-auto mt-8 flex max-w-xl overflow-hidden rounded-full border border-black/20">
          <input
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 outline-none"
          />

          <button className="bg-black px-8 font-black text-white hover:bg-yellow-400 hover:text-black">
            Subscribe
          </button>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-white/10 bg-black px-6 py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div className="flex items-center gap-4">
            <Truck className="h-8 w-8 text-yellow-400" />
            <div>
              <h3 className="font-black">Fast Ghana Delivery</h3>
              <p className="text-sm text-white/60">
                Accra, Kumasi, Tema & more
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheck className="h-8 w-8 text-yellow-400" />
            <div>
              <h3 className="font-black">Secure Payments</h3>
              <p className="text-sm text-white/60">
                MoMo, Visa & Mastercard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Star className="h-8 w-8 text-yellow-400" />
            <div>
              <h3 className="font-black">Premium Quality</h3>
              <p className="text-sm text-white/60">
                Elegant dresses for every moment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black px-6 py-12 text-center text-white/60">
        <p className="text-xl font-black uppercase tracking-[0.3em] text-yellow-400">
          DDS Fashion
        </p>

        <p className="mt-3">
          Wear Confidence • Ghana • Luxury Fashion
        </p>
      </footer>
    </main>
  );
}