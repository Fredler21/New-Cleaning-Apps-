import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background: "#060f1e",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Deep background glow — left teal */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(13,148,136,0.18) 0%, transparent 65%)",
            display: "flex",
          }}
        />
        {/* Deep background glow — bottom gold */}
        <div
          style={{
            position: "absolute",
            bottom: "-180px",
            left: "300px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,165,106,0.12) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* ── LEFT PANEL (content) ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
            width: "660px",
            flexShrink: 0,
          }}
        >
          {/* Top: eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "32px",
                height: "2px",
                background: "#0d9488",
                display: "flex",
              }}
            />
            <span
              style={{
                color: "#0d9488",
                fontSize: "13px",
                fontFamily: "sans-serif",
                letterSpacing: "0.2em",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Tested &amp; Proven
            </span>
          </div>

          {/* Middle: headline + tagline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
              <span
                style={{
                  fontSize: "82px",
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: 1.0,
                  letterSpacing: "-0.03em",
                  fontFamily: "sans-serif",
                }}
              >
                Try
              </span>
              <span
                style={{
                  fontSize: "82px",
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: 1.0,
                  letterSpacing: "-0.03em",
                  fontFamily: "sans-serif",
                }}
              >
                Cleaning
                <span style={{ color: "#0d9488" }}>Hacks</span>
              </span>
            </div>

            {/* Gold divider */}
            <div
              style={{
                width: "60px",
                height: "3px",
                background: "linear-gradient(90deg, #c9a56a, transparent)",
                display: "flex",
              }}
            />

            <span
              style={{
                fontSize: "20px",
                color: "#94a3b8",
                fontFamily: "sans-serif",
                lineHeight: 1.6,
                maxWidth: "500px",
              }}
            >
              40+ tested cleaning hacks with everyday ingredients — professional results for every room.
            </span>
          </div>

          {/* Bottom: category pills */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {["Kitchen", "Bathroom", "Laundry", "Deep Clean"].map((tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "8px 18px",
                  display: "flex",
                  alignItems: "center",
                  color: "#c9a56a",
                  fontSize: "14px",
                  fontFamily: "sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL (visual) ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Vertical separator */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "60px",
              bottom: "60px",
              width: "1px",
              background: "linear-gradient(180deg, transparent, rgba(13,148,136,0.4) 40%, rgba(201,165,106,0.3) 70%, transparent)",
              display: "flex",
            }}
          />

          {/* Concentric ring cluster */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Outermost ring */}
            <div
              style={{
                position: "absolute",
                width: "380px",
                height: "380px",
                borderRadius: "50%",
                border: "1px solid rgba(13,148,136,0.12)",
                display: "flex",
              }}
            />
            {/* Middle ring */}
            <div
              style={{
                position: "absolute",
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                border: "1px solid rgba(13,148,136,0.2)",
                display: "flex",
              }}
            />
            {/* Inner ring */}
            <div
              style={{
                position: "absolute",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                border: "1.5px solid rgba(13,148,136,0.35)",
                display: "flex",
              }}
            />
            {/* Core circle */}
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(13,148,136,0.45) 0%, rgba(13,148,136,0.1) 70%)",
                border: "1.5px solid rgba(13,148,136,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Sparkle icon built from divs */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "3px", height: "24px", background: "#5eead4", borderRadius: "2px", display: "flex" }} />
                <div style={{ display: "flex", gap: "4px" }}>
                  <div style={{ width: "24px", height: "3px", background: "#5eead4", borderRadius: "2px", display: "flex" }} />
                </div>
                <div style={{ width: "3px", height: "24px", background: "#5eead4", borderRadius: "2px", display: "flex" }} />
              </div>
            </div>

            {/* Orbital dots */}
            <div
              style={{
                position: "absolute",
                top: "14px",
                left: "50%",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#0d9488",
                display: "flex",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "14px",
                right: "80px",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#c9a56a",
                display: "flex",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "80px",
                right: "10px",
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "rgba(201,165,106,0.7)",
                display: "flex",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "60px",
                left: "10px",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "rgba(13,148,136,0.8)",
                display: "flex",
              }}
            />
          </div>

          {/* URL label bottom-right */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              right: "40px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#0d9488",
                display: "flex",
              }}
            />
            <span
              style={{
                color: "rgba(148,163,184,0.6)",
                fontSize: "14px",
                fontFamily: "sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              trycleaninghacks.com
            </span>
          </div>
        </div>

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #0d9488, #5eead4 30%, #c9a56a 70%, transparent)",
            display: "flex",
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
