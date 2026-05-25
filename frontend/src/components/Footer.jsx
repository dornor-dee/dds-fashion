import { Star, Truck, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <>
      {/* TRUST BAR */}
      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-3">
          <div className="flex items-center gap-4">
            <Truck className="h-8 w-8 text-yellow-400" />

            <div>
              <h3 className="font-bold">Fast Ghana Delivery</h3>

              <p className="text-sm text-white/60">
                Accra, Kumasi, Tema & more
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheck className="h-8 w-8 text-yellow-400" />

            <div>
              <h3 className="font-bold">Secure Payments</h3>

              <p className="text-sm text-white/60">
                MoMo, Visa & Mastercard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Star className="h-8 w-8 text-yellow-400" />

            <div>
              <h3 className="font-bold">Premium Quality</h3>

              <p className="text-sm text-white/60">
                Elegant dresses for every moment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-10 text-center text-white/60">
        <p className="text-lg font-black text-yellow-400">
          DDS Fashion
        </p>

        <p className="mt-2">
          Wear Confidence • Ghana • Luxury Fashion
        </p>
      </footer>
    </>
  );
}