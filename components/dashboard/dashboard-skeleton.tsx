export function DashboardSkeleton() {
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="h-4 w-40 animate-pulse rounded bg-[#e9e5dd]" />
        <div className="mt-6 h-28 w-full max-w-xl animate-pulse rounded-2xl bg-[#e9e5dd]" />
        <div className="mt-14 grid gap-5 md:grid-cols-[1.35fr_1fr]">
          <div className="h-[430px] animate-pulse rounded-3xl bg-white shadow-card" />
          <div className="h-[430px] animate-pulse rounded-3xl bg-ink/90 shadow-card" />
        </div>
      </div>
    </main>
  );
}
