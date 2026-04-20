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
          background: "#0F766E",
          borderRadius: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 80,
            fontWeight: 800,
            fontFamily: "sans-serif",
            letterSpacing: "-4px",
            lineHeight: 1,
          }}
        >
          CC
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 16,
            fontFamily: "sans-serif",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Café
        </div>
      </div>
    ),
    { ...size }
  );
}
