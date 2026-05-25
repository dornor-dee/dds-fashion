
export default function CartPanel({
  cart,
  userInfo,
  cartTotal,
  setShowCart,
  removeFromCart,
  decreaseQty,
  increaseQty,

}) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/70">
      <div className="ml-auto h-full w-full max-w-md overflow-y-auto border-l border-yellow-400/30 bg-black p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-yellow-400">Your Cart</h2>

          <button
            onClick={() => setShowCart(false)}
            className="text-3xl hover:text-yellow-400"
          >
            ×
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {cart.length === 0 ? (
            <p className="text-white/60">Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-yellow-400">₵{item.price}</p>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="rounded-full bg-white/10 px-3 py-1 font-bold"
                    >
                      -
                    </button>

                    <span className="font-bold">{item.qty}</span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      className="rounded-full bg-yellow-400 px-3 py-1 font-bold text-black"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="mt-3 text-sm text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 border-t border-white/10 pt-5">
          <div className="flex justify-between text-xl font-black">
            <span>Total</span>
            <span className="text-yellow-400">₵{cartTotal}</span>
          </div>

          {!userInfo ? (
            <button
              onClick={() => {
                alert("Please login to continue");
                window.location.href = "/login";
              }}
              className="mt-6 w-full rounded-full bg-yellow-400 px-6 py-4 font-bold text-black hover:bg-yellow-300"
            >
              Login to Checkout
            </button>
          ) : cart.length === 0 ? (
            <button className="mt-6 w-full rounded-full bg-gray-600 px-6 py-4 font-bold text-white">
              Cart is Empty
            </button>
          ) : (
            <button
  onClick={() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "/checkout";
  }}
  className="mt-6 w-full rounded-full bg-green-500 px-6 py-4 font-bold text-white hover:bg-green-400"
>
  Proceed to Checkout
</button>
          )}
        </div>
      </div>
    </div>
  );
}