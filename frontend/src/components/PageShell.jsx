import { useState } from "react";
import Navbar from "./Navbar";
import CartPanel from "./CartPanel";
import Footer from "./Footer";

export default function PageShell({ children }) {
  const [cart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.qty,
    0
  );
   
  return (
    <main className="min-h-screen bg-black text-white">
      {showCart && (
        <CartPanel
          cart={cart}
          userInfo={userInfo}
          cartTotal={cartTotal}
          setShowCart={setShowCart}
          removeFromCart={() => {}}
          decreaseQty={() => {}}
          increaseQty={() => {}}
          cartPaystackConfig={{}}
        />
      )}

      <Navbar
        userInfo={userInfo}
        cart={cart}
        setShowCart={setShowCart}
      />

      {children}

      <Footer />
    </main>
  );
}