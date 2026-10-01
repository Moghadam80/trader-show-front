export function LoadingRows({
  count = 3,
  className = "h-16",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className="space-y-3" aria-label="Loading">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={`${className} animate-pulse rounded-2xl bg-[#f5f2ed]`}
        />
      ))}
    </div>
  );
}
