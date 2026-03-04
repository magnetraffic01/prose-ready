import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Message = {
  role: "ai" | "user" | "alert";
  text: string;
  startFrame: number;
};

const messages: Message[] = [
  {
    role: "ai",
    text: "Buenos días. ¿De qué país proviene usted y cuál fue su fecha de entrada a los Estados Unidos?",
    startFrame: 20,
  },
  {
    role: "user",
    text: "Soy de Guatemala. Entré al país el 15 de marzo de 2022 por el cruce de El Paso.",
    startFrame: 90,
  },
  {
    role: "ai",
    text: "En su Formulario I-589 declaró que ingresó el 10 de marzo de 2022. ¿Puede explicar esta discrepancia?",
    startFrame: 165,
  },
  {
    role: "alert",
    text: "⚠️ Contradicción detectada: La fecha de entrada en su respuesta verbal (15 mar) difiere de su I-589 (10 mar). Esto puede afectar su credibilidad.",
    startFrame: 240,
  },
  {
    role: "user",
    text: "Perdón... creo que me confundí. Fue el 10 de marzo. El 15 fue cuando llegué a la ciudad de destino.",
    startFrame: 310,
  },
];

const ChatBubble: React.FC<{
  msg: Message;
  frame: number;
  fps: number;
}> = ({ msg, frame, fps }) => {
  const localFrame = frame - msg.startFrame;
  if (localFrame < 0) return null;

  const opacity = interpolate(localFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const translateY = interpolate(localFrame, [0, 20], [20, 0], { extrapolateRight: "clamp" });

  if (msg.role === "alert") {
    return (
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          margin: "8px 16px",
          padding: "14px 18px",
          borderRadius: 14,
          background: "rgba(239, 68, 68, 0.1)",
          border: "1px solid rgba(239, 68, 68, 0.4)",
          backdropFilter: "blur(10px)",
          color: "#fee2e2",
          fontSize: 13,
          lineHeight: 1.5,
          fontFamily: "Inter, sans-serif",
        }}
      >
        {msg.text}
      </div>
    );
  }

  const isAI = msg.role === "ai";

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        flexDirection: isAI ? "row" : "row-reverse",
        alignItems: "flex-end",
        gap: 10,
        margin: "8px 16px",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          flexShrink: 0,
          background: isAI
            ? "linear-gradient(180deg, #60a5fa, #3494f4)"
            : "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        {isAI ? "🤖" : "👤"}
      </div>

      {/* Bubble */}
      <div
        style={{
          maxWidth: "72%",
          padding: "12px 16px",
          borderRadius: isAI ? "18px 18px 18px 4px" : "18px 18px 4px 18px",
          background: isAI
            ? "rgba(52, 148, 244, 0.25)"
            : "rgba(255, 255, 255, 0.12)",
          border: isAI
            ? "1px solid rgba(52, 148, 244, 0.4)"
            : "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(12px)",
          color: "#e2e8f0",
          fontSize: 14,
          lineHeight: 1.6,
          fontFamily: "Inter, sans-serif",
        }}
      >
        {isAI && (
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#60a5fa",
              marginBottom: 4,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Oficial IA · ProSe Ready
          </div>
        )}
        {msg.text}
      </div>
    </div>
  );
};

export const ChatSimulator: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const pulseScale = interpolate(
    Math.sin((frame / fps) * Math.PI * 2),
    [-1, 1],
    [0.85, 1.15]
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0f1a 0%, #0f172a 50%, #0a1628 100%)",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 300,
          background: "radial-gradient(ellipse, rgba(52,148,244,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Chat window */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          right: 60,
          bottom: 60,
          borderRadius: 24,
          background: "rgba(15, 23, 42, 0.7)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(24px)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          opacity: headerOpacity,
        }}
      >
        {/* Top bar */}
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", gap: 6 }}>
              {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <span style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
              Sesión de Simulación · USCIS
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#22c55e",
                transform: `scale(${pulseScale})`,
              }}
            />
            <span style={{ color: "#22c55e", fontSize: 11, fontWeight: 700 }}>EN VIVO</span>
          </div>
        </div>

        {/* Messages area */}
        <div style={{ flex: 1, padding: "16px 0", overflowY: "hidden" }}>
          {messages.map((msg, i) => (
            <ChatBubble key={i} msg={msg} frame={frame} fps={fps} />
          ))}
        </div>

        {/* Input bar */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 38,
              borderRadius: 20,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              paddingLeft: 16,
            }}
          >
            <span style={{ color: "#475569", fontSize: 13 }}>Escribe tu respuesta...</span>
          </div>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "linear-gradient(180deg, #60a5fa, #3494f4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            🎤
          </div>
        </div>
      </div>

      {/* ProSe Ready watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 80,
          color: "rgba(148,163,184,0.4)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 2,
          textTransform: "uppercase",
          opacity: headerOpacity,
        }}
      >
        ProSe Ready
      </div>
    </AbsoluteFill>
  );
};
