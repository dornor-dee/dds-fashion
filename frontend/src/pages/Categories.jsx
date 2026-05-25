import PageShell from "../components/PageShell";

const categories = [
  "Casual Dresses",
  "Party Dresses",
  "African Prints",
  "Wedding Guest",
  "Two-Piece Sets",
  "Accessories",
];

export default function Categories() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
          Shop By Style
        </p>

        <h1 className="mt-4 text-5xl font-black">
          Explore Categories
        </h1>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <a
              key={category}
              href={`/shop?category=${encodeURIComponent(category)}`}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-left text-2xl font-bold transition hover:-translate-y-1 hover:border-yellow-400 hover:bg-yellow-400/10"
            >
              {category}
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}