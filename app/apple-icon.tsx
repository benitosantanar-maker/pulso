import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "linear-gradient(135deg, #0F766E 0%, #134E4A 100%)",
          borderRadius: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {/* Taza grande */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          {/* Vapor */}
          <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 6, height: 16, background: "rgba(255,255,255,0.3)", borderRadius: 4 }} />
            <div style={{ width: 6, height: 22, background: "rgba(255,255,255,0.2)", borderRadius: 4, marginTop: 4 }} />
            <div style={{ width: 6, height: 16, background: "rgba(255,255,255,0.3)", borderRadius: 4 }} />
          </div>
          {/* Cuerpo taza */}
          <div
            style={{
              width: 78,
              height: 58,
              background: "white",
              borderRadius: "8px 8px 20px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Asa */}
            <div
              style={{
                position: "absolute",
                right: -16,
                top: 10,
                width: 18,
                height: 30,
                border: "7px solid white",
                borderLeft: "none",
                borderRadius: "0 14px 14px 0",
              }}
            />
            {/* Café dentro */}
            <div style={{ width: 50, height: 16, background: "#5C3317", borderRadius: 8, opacity: 0.25 }} />
          </div>
          {/* Platillo */}
          <div style={{ width: 100, height: 10, background: "rgba(255,255,255,0.75)", borderRadius: 6 }} />
        </div>
        {/* Wordmark */}
        <div
          style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: 22,
            fontWeight: 700,
            fontFamily: "sans-serif",
            letterSpacing: "1px",
            display: "flex",
          }}
        >
          CAFÉ COMERCIAL
        </div>
      </div>
    ),
    { ...size }
  );
}
