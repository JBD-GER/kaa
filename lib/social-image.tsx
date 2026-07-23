import { ImageResponse } from "next/og";

export const socialImageSize = { width: 1200, height: 630 };

export function createSocialImage({
  category,
  title,
  summary,
}: {
  category: string;
  title: string;
  summary?: string;
}) {
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
          right: -190,
          bottom: -300,
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
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 17 }}>
          <div
            style={{
              width: 42,
              height: 42,
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
                fontSize: 14,
                fontWeight: 800,
              }}
            >
              K
            </span>
          </div>
          <span
            style={{
              fontSize: 27,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            KAA
          </span>
        </div>
        <span
          style={{
            color: "#91AEFF",
            fontSize: 13,
            letterSpacing: 2,
          }}
        >
          KI-AUTOMATISIERUNGS-AGENTUR
        </span>
      </div>

      <div
        style={{
          width: 980,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            color: "#CCFF66",
            fontSize: 16,
            letterSpacing: 2.5,
            marginBottom: 20,
            textTransform: "uppercase",
          }}
        >
          {category}
        </span>
        <span
          style={{
            fontSize: title.length > 62 ? 54 : 64,
            fontWeight: 700,
            letterSpacing: -3.2,
            lineHeight: 1,
          }}
        >
          {title}
        </span>
        {summary ? (
          <span
            style={{
              width: 850,
              marginTop: 22,
              color: "#B7C2CC",
              fontSize: 20,
              lineHeight: 1.4,
            }}
          >
            {summary}
          </span>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          paddingTop: 17,
          borderTop: "1px solid #2A3949",
          color: "#91A0AD",
          fontSize: 14,
        }}
      >
        PROZESS VERSTEHEN
        <span style={{ color: "#72D6BD" }}>→</span>
        SYSTEME VERBINDEN
        <span style={{ color: "#72D6BD" }}>→</span>
        KONTROLLE BEHALTEN
      </div>
    </div>,
    socialImageSize,
  );
}
