import type { ServiceIcon as IconName } from "@/content/services";

export function ServiceIcon({ name, size = 28 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "compass") {
    return <svg {...common}><circle cx="16" cy="16" r="11" /><path d="m20.7 11.3-2.6 6.8-6.8 2.6 2.6-6.8 6.8-2.6Z" /><circle cx="16" cy="16" r="1.2" /></svg>;
  }
  if (name === "assistant") {
    return <svg {...common}><path d="M7 9.5A3.5 3.5 0 0 1 10.5 6h11A3.5 3.5 0 0 1 25 9.5v8a3.5 3.5 0 0 1-3.5 3.5H16l-5.5 4v-4A3.5 3.5 0 0 1 7 17.5v-8Z" /><path d="M11 13h10M11 17h6" /></svg>;
  }
  if (name === "workflow") {
    return <svg {...common}><rect x="4" y="5" width="8" height="7" rx="2" /><rect x="20" y="20" width="8" height="7" rx="2" /><circle cx="23.5" cy="8.5" r="3.5" /><path d="M12 8.5h8M23.5 12v4a4 4 0 0 1-4 4H12M12 20l3-3m-3 3 3 3" /></svg>;
  }
  if (name === "knowledge") {
    return <svg {...common}><path d="M5 7.5A2.5 2.5 0 0 1 7.5 5H14a2 2 0 0 1 2 2v19a3 3 0 0 0-3-3H7.5A2.5 2.5 0 0 1 5 20.5v-13Z" /><path d="M27 7.5A2.5 2.5 0 0 0 24.5 5H18a2 2 0 0 0-2 2v19a3 3 0 0 1 3-3h5.5a2.5 2.5 0 0 0 2.5-2.5v-13Z" /><path d="M9 10h3M20 10h3M9 14h3M20 14h3" /></svg>;
  }
  if (name === "sales") {
    return <svg {...common}><path d="M6 25V15M13 25V10M20 25V16M27 25V6" /><path d="m5 10 7-5 7 5 8-6" /><circle cx="5" cy="10" r="1.5" /><circle cx="12" cy="5" r="1.5" /><circle cx="19" cy="10" r="1.5" /><circle cx="27" cy="4" r="1.5" /></svg>;
  }
  return <svg {...common}><path d="m16 4 10 6v12l-10 6-10-6V10l10-6Z" /><path d="m6 10 10 6 10-6M16 16v12" /><circle cx="16" cy="16" r="3" /></svg>;
}
