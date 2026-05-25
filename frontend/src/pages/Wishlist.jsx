import { useEffect, useState } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

 useEffect(() => {
  const loadWishlist = () => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  };

  loadWishlist();
}, []);

  const removeWishlistItem = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item._id !== id
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-black text-yellow-400">
          My Wishlist ❤️
        </h1>

        <p className="mt-4 text-white/60">
          Your saved luxury fashion items.
        </p>

        {wishlist.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
            <h2 className="text-2xl font-bold">
              No wishlist items yet
            </h2>

            <p className="mt-3 text-white/60">
              Start adding your favorite dresses.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[400px] w-full object-cover"
                />

                <div className="p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
                    {item.category}
                  </p>

                  <h2 className="mt-3 text-2xl font-black">
                    {item.name}
                  </h2>

                  <p className="mt-3 text-3xl font-black text-yellow-400">
                    ₵{item.price}
                  </p>

                  <button
                    onClick={() =>
                      removeWishlistItem(item._id)
                    }
                    className="mt-6 w-full rounded-full bg-red-500 px-6 py-4 font-bold text-white hover:bg-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}