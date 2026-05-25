import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import { PaystackButton } from "react-paystack";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    API.get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        Loading product...
      </main>
    );
  }

  const submitReview = async () => {
    if (!comment) {
      alert("Please write a review first");
      return;
    }

    try {
      await API.post(`/api/products/${id}/reviews`, {
        rating,
        comment,
        name: userInfo?.name || "Anonymous",
      });

      alert("Review added!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to add review");
    }
  };

  const publicKey = "pk_test_c829d118f7882cf0457d8b6e92d3caae5d69d5e5";

  const paystackConfig = {
    email: userInfo?.email || "customer@email.com",
    amount: product.price * 100,
    publicKey,
    currency: "GHS",
    text: "Pay Now",

    onClick: () => {
      if (!userInfo) {
        alert("Please login before payment");
        window.location.href = "/login";
        return false;
      }
    },

    onSuccess: async (reference) => {
      try {
        const orderItems = [
          {
            name: product.name,
            qty: 1,
            image: product.image,
            price: product.price,
            product: product._id,
          },
        ];

        const orderRes = await API.post("/api/orders", {
          user: userInfo._id,
          orderItems,
          totalPrice: product.price,
        });

        await API.put(`/api/orders/${orderRes.data._id}/pay`, {
          id: reference.reference,
          status: "success",
          update_time: new Date().toISOString(),
          email_address: userInfo.email,
        });

        alert("Payment successful and order saved!");
      } catch (error) {
        console.log(error);
        alert("Payment was successful, but order saving failed.");
      }
    },

    onClose: () => {
      alert("Transaction Closed");
    },
  };

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <img
          src={product.image}
          alt={product.name}
          className="h-[600px] w-full rounded-[2rem] object-cover"
        />

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
            {product.category}
          </p>

          <h1 className="mt-4 text-5xl font-black">{product.name}</h1>

          <p className="mt-3 text-white/60">
            ⭐ {product.rating || 0} / 5 ({product.numReviews || 0} reviews)
          </p>

          <p className="mt-4 text-4xl font-black text-yellow-400">
            ₵{product.price}
          </p>

          <p className="mt-6 text-lg leading-8 text-white/70">
            {product.description}
          </p>

          <p className="mt-4 text-white/60">
            Stock: {product.countInStock}
          </p>

          <button className="mt-8 rounded-full bg-yellow-400 px-8 py-4 font-bold text-black hover:bg-yellow-300">
            Add to Cart
          </button>

          <PaystackButton
            {...paystackConfig}
            className="mt-4 block w-fit rounded-full bg-green-500 px-8 py-4 font-bold text-white hover:bg-green-400"
          />
        </div>
      </div>

      {/* REVIEWS */}
      <div className="mx-auto mt-16 max-w-6xl border-t border-white/10 pt-10">
        <h2 className="text-3xl font-black text-yellow-400">
          Customer Reviews ⭐
        </h2>

        {/* REVIEW FORM */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h3 className="text-xl font-bold">Leave a Review</h3>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-4 w-full rounded-2xl bg-black p-4 text-white"
          >
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="mt-4 h-32 w-full rounded-2xl bg-black p-4 text-white outline-none"
          />

          <button
            onClick={submitReview}
            className="mt-4 rounded-full bg-yellow-400 px-8 py-4 font-bold text-black hover:bg-yellow-300"
          >
            Submit Review
          </button>
        </div>

        {/* REVIEW LIST */}
        <div className="mt-10 space-y-6">
          {product.reviews?.length === 0 ? (
            <p className="text-white/60">No reviews yet.</p>
          ) : (
            product.reviews?.map((review, index) => (
              <div
                key={index}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-yellow-400">
                    {review.name}
                  </h3>

                  <p className="font-bold">⭐ {review.rating}/5</p>
                </div>

                <p className="mt-4 text-white/70">
                  {review.comment}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}