import PageShell from "../components/PageShell";

export default function About() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
          About DDS Fashion
        </p>

        <h1 className="mt-4 text-5xl font-black">
          Luxury Fashion Built For Confidence
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
          DDS Fashion was created to bring elegance, confidence,
          and premium fashion to customers in Ghana and beyond.
          We believe fashion is more than clothing — it is identity,
          confidence, and self-expression.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-black text-yellow-400">
              Our Vision
            </h2>

            <p className="mt-4 text-white/70">
              To become one of Africa’s leading luxury fashion brands.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-black text-yellow-400">
              Premium Quality
            </h2>

            <p className="mt-4 text-white/70">
              Elegant designs crafted for modern fashion lovers.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-black text-yellow-400">
              Fast Delivery
            </h2>

            <p className="mt-4 text-white/70">
              Reliable delivery across Ghana and internationally.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}