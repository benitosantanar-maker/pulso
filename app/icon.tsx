import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "linear-gradient(135deg, #0F766E 0%, #134E4A 100%)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        {/* Taza minimalista */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          {/* Vapor */}
          <div style={{ display: "flex", gap: 2, marginBottom: 1 }}>
            <div style={{ width: 2, height: 3, background: "rgba(255,255,255,0.35)", borderRadius: 2 }} />
            <div style={{ width: 2, height: 4, background: "rgba(255,255,255,0.25)", borderRadius: 2, marginTop: 1 }} />
          </div>
          {/* Cuerpo taza */}
          <div
            style={{
              width: 14,
              height: 10,
              background: "white",
              borderRadius: "2px 2px 4px 4px",
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
                right: -4,
                top: 2,
                width: 4,
                height: 6,
                border: "1.5px solid white",
                borderLeft: "none",
                borderRadius: "0 3px 3px 0",
              }}
            />
          </div>
          {/* Platillo */}
          <div style={{ width: 18, height: 2, background: "rgba(255,255,255,0.7)", borderRadius: 2 }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
