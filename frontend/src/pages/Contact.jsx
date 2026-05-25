import PageShell from "../components/PageShell";

export default function Contact() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
          Contact DDS Fashion
        </p>

        <h1 className="mt-4 text-5xl font-black">
          We’d Love To Hear From You
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
          Have questions about dresses, delivery, sizing, or orders?
          Reach out to DDS Fashion anytime.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-black text-yellow-400">
              WhatsApp
            </h2>
            <p className="mt-4 text-white/70">
              Add your business WhatsApp number here.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-black text-yellow-400">
              Email
            </h2>
            <p className="mt-4 text-white/70">
              support@ddsfashion.com
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-black text-yellow-400">
              Location
            </h2>
            <p className="mt-4 text-white/70">
              Ghana • Online Store
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}