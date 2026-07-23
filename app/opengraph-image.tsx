import { ImageResponse } from "next/og";

export const alt =
  "KAA – KI-Automatisierungs-Agentur für kontrollierbare Unternehmensprozesse";
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
        padding: "58px 64px",
        color: "#FFFDF9",
        backgroundColor: "#071018",
        backgroundImage:
          "linear-gradient(rgba(145,174,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(145,174,255,.07) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        fontFamily: "Arial, Helvetica, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -210,
          top: -250,
          width: 650,
          height: 650,
          borderRadius: 999,
          border: "1px solid rgba(145,174,255,.2)",
          boxShadow:
            "0 0 0 75px rgba(36,84,214,.035), 0 0 0 150px rgba(36,84,214,.02)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#2454D6",
              transform: "rotate(45deg)",
            }}
          >
            <span
              style={{
                display: "flex",
                transform: "rotate(-45deg)",
                fontSize: 15,
                fontWeight: 800,
              }}
            >
              K
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: -1,
              }}
            >
              KAA
            </span>
            <span
              style={{
                color: "#91AEFF",
                fontSize: 12,
                letterSpacing: 2,
              }}
            >
              KI-AUTOMATISIERUNGS-AGENTUR
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#A8EAD9",
            fontSize: 13,
            letterSpacing: 1,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 9,
              background: "#72D6BD",
            }}
          />
          SYSTEM BEREIT
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 50,
        }}
      >
        <div
          style={{
            width: 700,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              color: "#91AEFF",
              fontSize: 15,
              letterSpacing: 2.5,
              marginBottom: 18,
            }}
          >
            PROZESSE VERSTEHEN · SYSTEME VERBINDEN
          </span>
          <span
            style={{
              fontSize: 62,
              fontWeight: 700,
              letterSpacing: -3.5,
              lineHeight: 0.98,
            }}
          >
            KI-Automatisierung,
          </span>
          <span
            style={{
              color: "#CCFF66",
              fontFamily: "Georgia, serif",
              fontSize: 66,
              fontStyle: "italic",
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            die mitarbeitet.
          </span>
        </div>

        <div
          style={{
            width: 330,
            display: "flex",
            flexDirection: "column",
            gap: 9,
            padding: 14,
            border: "1px solid #354759",
            background: "rgba(13,24,34,.92)",
          }}
        >
          {["E-Mail verstehen", "Daten verbinden", "Freigabe einholen"].map(
            (label, index) => (
              <div
                key={label}
                style={{
                  minHeight: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 14px",
                  border: `1px solid ${index === 2 ? "#5D9D8E" : "#304355"}`,
                  background: index === 2 ? "#112522" : "#101E2A",
                  color: index === 2 ? "#C9F1E7" : "#DCE4EA",
                  fontSize: 15,
                }}
              >
                <span>{label}</span>
                <span
                  style={{
                    color: index === 2 ? "#72D6BD" : "#91AEFF",
                    fontSize: 12,
                  }}
                >
                  0{index + 1} →
                </span>
              </div>
            ),
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          paddingTop: 18,
          borderTop: "1px solid #2A3949",
          color: "#9CA8B4",
          fontSize: 14,
        }}
      >
        Individuelle Lösungen
        <span style={{ color: "#4D5E6E" }}>↗</span>
        Bestehende Systeme
        <span style={{ color: "#4D5E6E" }}>↗</span>
        Kontrollierbare Abläufe
      </div>
    </div>,
    size,
  );
}
