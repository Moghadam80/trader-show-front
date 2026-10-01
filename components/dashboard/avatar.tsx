import type { User } from "@/types";
import { initials } from "@/lib/format";

export function Avatar({
  user,
  muted = false,
}: {
  user: User;
  muted?: boolean;
}) {
  return (
    <span
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${muted ? "bg-[#f1ede6] text-ink/55" : "bg-mint text-ink"}`}
    >
      {initials(user.name)}
    </span>
  );
}
