import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";

export default function Navbar({ userInfo, cart, setShowCart }) {
  const [openMenu, setOpenMenu] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Wishlist", href: "/wishlist" },
  ];

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
      {/* LOGO */}
{/* LOGO */}
<a href="/" className="flex items-center">
  <img
    src="/images/dds-fashion-logo.png"
    alt="DDS Fashion Logo"
    className="h-26 w-auto object-contain"
  />
</a>

        {/* DESKTOP LINKS */}
        <div className="hidden items-center gap-8 text-sm font-bold uppercase tracking-widest text-white/80 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative transition hover:text-yellow-400 after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </a>
          ))}

          {userInfo && (
            <a
              href="/myorders"
              className="relative transition hover:text-yellow-400 after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              My Orders
            </a>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {userInfo ? (
            <div className="hidden items-center gap-3 md:flex">
              <p className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-bold text-yellow-400">
                {userInfo.name}
              </p>

              <button
                onClick={() => {
                  localStorage.removeItem("userInfo");
                  window.location.reload();
                }}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white hover:border-yellow-400 hover:text-yellow-400"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <a
                href="/login"
                className="rounded-full border border-white/20 px-5 py-2 text-sm font-bold text-white hover:border-yellow-400 hover:text-yellow-400"
              >
                Login
              </a>

              <a
                href="/register"
                className="rounded-full bg-yellow-400 px-5 py-2 text-sm font-black text-black hover:bg-white"
              >
                Register
              </a>
            </div>
          )}

          {/* CART */}
          <button
            onClick={() => setShowCart(true)}
            className="relative rounded-full border border-white/10 bg-white/10 p-3 hover:border-yellow-400 hover:bg-yellow-400/10"
          >
            <ShoppingBag className="h-5 w-5 text-yellow-400" />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 animate-pulse items-center justify-center rounded-full bg-yellow-400 text-xs font-black text-black">
                {cartCount}
              </span>
            )}
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="rounded-full border border-white/10 bg-white/10 p-3 md:hidden"
          >
            {openMenu ? (
              <X className="h-5 w-5 text-yellow-400" />
            ) : (
              <Menu className="h-5 w-5 text-yellow-400" />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {openMenu && (
        <div className="border-t border-white/10 bg-black/95 px-6 py-6 text-white md:hidden">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block rounded-2xl bg-white/5 px-5 py-4 font-bold uppercase tracking-widest hover:bg-yellow-400 hover:text-black"
              >
                {link.name}
              </a>
            ))}

            {userInfo && (
              <a
                href="/myorders"
                className="block rounded-2xl bg-white/5 px-5 py-4 font-bold uppercase tracking-widest hover:bg-yellow-400 hover:text-black"
              >
                My Orders
              </a>
            )}

            {!userInfo ? (
              <div className="grid gap-3 pt-4">
                <a
                  href="/login"
                  className="rounded-full border border-white/20 px-5 py-3 text-center font-bold"
                >
                  Login
                </a>

                <a
                  href="/register"
                  className="rounded-full bg-yellow-400 px-5 py-3 text-center font-black text-black"
                >
                  Register
                </a>
              </div>
            ) : (
              <button
                onClick={() => {
                  localStorage.removeItem("userInfo");
                  window.location.reload();
                }}
                className="mt-4 w-full rounded-full bg-red-500 px-5 py-3 font-bold text-white"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}