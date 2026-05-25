import { PaystackButton } from "react-paystack";
import API from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";

export default function Checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

const totalPrice = cart.reduce(
  (total, item) => total + item.price * item.qty,
  0
);

const publicKey = "pk_test_c829d118f7882cf0457d8b6e92d3caae5d69d5e5";

const paystackConfig = {
  email: userInfo.email,
  amount: totalPrice * 100,
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

      await API.post("/api/orders", {
        user: userInfo._id,
        orderItems,
        totalPrice,

        shippingAddress: {
          fullName: shipping.fullName,
          phone: shipping.phone,
          address: shipping.address,
          city: shipping.city,
          country: shipping.country,
        },

        paymentResult: {
          id: reference.reference,
          status: "success",
          update_time: new Date().toISOString(),
          email_address: userInfo.email,
        },
      });

      localStorage.removeItem("cart");

      alert("Payment successful!");
     navigate("/my-orders");
    } catch (error) {
      console.log(error);
      alert("Order creation failed");
    }
  },

  onClose: () => {
    alert("Transaction closed");
  },
};

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    country: "Ghana",
  });

  const handleChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };

  if (!userInfo) {
    return (
      <PageShell>
        <section className="px-6 py-24 text-center">
          <h1 className="text-4xl font-black text-yellow-400">
            Please login to checkout
          </h1>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="text-5xl font-black text-yellow-400">
          Checkout
        </h1>

        <p className="mt-3 text-white/60">
          Enter your delivery information before payment.
        </p>

        <form className="mt-10 space-y-4">
          <input
            name="fullName"
            value={shipping.fullName}
            onChange={handleChange}
            placeholder="Full name"
            className="w-full rounded-xl bg-white/10 p-4 text-white outline-none"
          />

          <input
            name="phone"
            value={shipping.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="w-full rounded-xl bg-white/10 p-4 text-white outline-none"
          />

          <input
            name="address"
            value={shipping.address}
            onChange={handleChange}
            placeholder="Delivery address"
            className="w-full rounded-xl bg-white/10 p-4 text-white outline-none"
          />

          <input
            name="city"
            value={shipping.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full rounded-xl bg-white/10 p-4 text-white outline-none"
          />

          <input
            name="country"
            value={shipping.country}
            onChange={handleChange}
            placeholder="Country"
            className="w-full rounded-xl bg-white/10 p-4 text-white outline-none"
          />

          <PaystackButton
  {...paystackConfig}
  className="w-full rounded-full bg-yellow-400 px-6 py-4 font-bold text-black hover:bg-yellow-300"
/>
        </form>
      </section>
    </PageShell>
  );
}