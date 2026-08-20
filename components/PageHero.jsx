import TerraceDivider from "./TerraceDivider";

export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-forest to-forest-light">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-14 text-center sm:pb-20 sm:pt-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-gold">
          {eyebrow}
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-paper sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-paper/75">{subtitle}</p>}
      </div>
      <TerraceDivider bgClass="text-paper" />
    </section>
  );
}
