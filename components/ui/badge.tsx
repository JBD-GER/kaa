import type { ReactNode } from "react";

export function Badge({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}
