import { ImageResponse } from "next/og";

export const alt = "KAA – KI-Automatisierungs-Agentur: KI, die wirklich arbeitet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        color: "white",
        background: "#0B0F17",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", right: -170, top: -180, width: 560, height: 560, borderRadius: 999, border: "2px solid #273142", boxShadow: "0 0 0 70px rgba(36,84,214,.06), 0 0 0 140px rgba(36,84,214,.035)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
        <div style={{ width: 72, height: 72, borderRadius: 16, background: "#2454D6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 800 }}>K</div>
        <div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>KAA</span><span style={{ color: "#AAB6C6", fontSize: 17, letterSpacing: 2 }}>KI-AUTOMATISIERUNGS-AGENTUR</span></div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
        <div style={{ color: "#7EA2FF", fontSize: 20, letterSpacing: 3, marginBottom: 22 }}>KONTROLLIERTE KI-LÖSUNGEN</div>
        <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -3.5, lineHeight: 1.04 }}>KI, die in Ihrem Unternehmen wirklich arbeitet.</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#B6C1D1", fontSize: 18 }}><span style={{ width: 10, height: 10, borderRadius: 10, background: "#58C8C0" }} /> Prozess verstehen <span style={{ color: "#536075" }}>→</span> Systeme verbinden <span style={{ color: "#536075" }}>→</span> Ergebnis kontrollieren</div>
    </div>,
    size,
  );
}
