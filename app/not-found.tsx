import { ArrowLeft, Compass, ReceiptText } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12 sm:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,#dff3e8_0,transparent_31%),radial-gradient(circle_at_90%_12%,#f9d9c7_0,transparent_33%)]" />
      <div className="absolute left-[-8rem] top-1/2 -z-10 h-64 w-64 -translate-y-1/2 rounded-full border-[28px] border-white/60 sm:left-[8%]" />
      <div className="absolute bottom-[-9rem] right-[-6rem] -z-10 h-72 w-72 rounded-full border-[36px] border-coral/10" />

      <section className="w-full max-w-2xl rounded-[2rem] border bg-white/80 p-6 text-center shadow-card backdrop-blur sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-mint text-ink shadow-sm">
          <Compass className="h-8 w-8" strokeWidth={1.8} />
        </div>

        <p className="mt-8 font-display text-7xl font-black tracking-[-0.08em] text-ink sm:text-9xl">
          404
        </p>
        <div className="mx-auto mt-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-coral">
          <ReceiptText className="h-4 w-4" /> wrong page, right place
        </div>
        <h1 className="mt-5 font-display text-3xl font-bold tracking-[-0.04em] text-ink sm:text-4xl">
          This page didn’t make the split.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-ink/60 sm:text-base">
          The page you’re looking for may have moved, been settled, or never
          existed in the first place.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-[#25375f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <p className="mt-8 text-xs text-ink/35">
          Common Ground · shared spending, sorted.
        </p>
      </section>
    </main>
  );
}
