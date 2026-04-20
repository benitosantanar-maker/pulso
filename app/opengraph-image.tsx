import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#1F2937",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              background: "#0F766E",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            C
          </div>
          <div style={{ color: "white", fontSize: 28, fontWeight: 700, display: "flex" }}>
            Café Comercial
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              color: "#2DD4BF",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Plataforma editorial · Ingeniería Comercial
          </div>
          <div
            style={{
              color: "white",
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-2px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex" }}>Lo esencial para</div>
            <div style={{ display: "flex", color: "#2DD4BF" }}>ingenieros comerciales</div>
          </div>
          <div
            style={{
              color: "#9CA3AF",
              fontSize: 24,
              display: "flex",
            }}
          >
            Economía · Finanzas · Marketing · Innovación · Estrategia
          </div>
        </div>

        <div
          style={{
            color: "#6B7280",
            fontSize: 18,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 24,
            display: "flex",
          }}
        >
          cafecomercial.vercel.app — PUC · FEN UCHILE · UAI · UDD · UANDES
        </div>
      </div>
    ),
    { ...size }
  );
}
