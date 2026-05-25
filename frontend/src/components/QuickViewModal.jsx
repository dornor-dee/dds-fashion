export default function QuickViewModal({
  selectedProduct,
  setSelectedProduct,
  addToCart,
}) {
  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-6">
      <div className="relative grid max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-[#111111] md:grid-cols-2">
        
        {/* CLOSE */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute right-5 top-5 z-10 text-3xl text-white hover:text-yellow-400"
        >
          ×
        </button>

        {/* IMAGE */}
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="h-full w-full object-cover"
        />

        {/* DETAILS */}
        <div className="p-10 text-white">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
            {selectedProduct.category}
          </p>

          <h2 className="mt-4 text-5xl font-black">
            {selectedProduct.name}
          </h2>

          <p className="mt-4 text-4xl font-black text-yellow-400">
            ₵{selectedProduct.price}
          </p>

          <p className="mt-6 text-lg leading-8 text-white/70">
            {selectedProduct.description}
          </p>

          <p className="mt-4 text-white/60">
            Stock: {selectedProduct.countInStock}
          </p>

          <button
            onClick={() => addToCart(selectedProduct)}
            className="mt-8 w-full rounded-full bg-yellow-400 px-6 py-4 font-bold text-black hover:bg-yellow-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}