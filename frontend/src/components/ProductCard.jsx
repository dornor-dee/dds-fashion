import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function ProductCard({
  product,
  wishlist,
  toggleWishlist,
  addToCart,
  addRecentlyViewed,
  setSelectedProduct,
}) {
  return (
    <Link
      to={`/product/${product._id}`}
      onClick={() => addRecentlyViewed(product)}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-black transition hover:-translate-y-2 hover:border-yellow-400/60"
    >
      <div className="relative h-[260px] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <span className="absolute left-4 top-4 rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-black">
          {product.tag || product.category || "New"}
        </span>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute right-4 top-4 rounded-full bg-black/70 p-3 backdrop-blur-xl"
        >
          <Heart
            className={`h-5 w-5 ${
              wishlist.find((item) => item._id === product._id)
                ? "fill-yellow-400 text-yellow-400"
                : "text-yellow-400"
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-base font-black">{product.name}</h3>

        <p className="mt-2 text-lg font-black text-yellow-400">
          ₵{product.price}
        </p>

        <p className="mt-2 text-sm text-white/60">
          {product.description}
        </p>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
          }}
          className="mt-5 w-full rounded-full bg-yellow-400 px-6 py-3 font-bold text-black hover:bg-yellow-300"
        >
          Add to Cart
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addRecentlyViewed(product);
            setSelectedProduct(product);
          }}
          className="mt-3 w-full rounded-full border border-yellow-400 bg-transparent px-6 py-3 font-bold text-yellow-400 hover:bg-yellow-400 hover:text-black"
        >
          Quick View
        </button>
      </div>
    </Link>
  );
}