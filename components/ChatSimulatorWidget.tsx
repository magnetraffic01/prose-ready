"use client";
import { useEffect, useState } from "react";
import { AlertTriangle, Mic } from "lucide-react";

type Message = {
  role: "ai" | "user" | "alert";
  text: string;
  delay: number;
};

const MESSAGES: Message[] = [
  {
    role: "ai",
    text: "Buenos días. ¿De qué país proviene y cuál fue su fecha de entrada a los Estados Unidos?",
    delay: 800,
  },
  {
    role: "user",
    text: "Soy de Guatemala. Entré al país el 15 de marzo de 2022 por El Paso.",
    delay: 2800,
  },
  {
    role: "ai",
    text: "En su Formulario I-589 declaró que ingresó el 10 de marzo. ¿Puede explicar esta discrepancia?",
    delay: 5000,
  },
  {
    role: "alert",
    text: "Contradicción detectada: Fecha verbal (15 mar) ≠ I-589 (10 mar). Esto puede afectar su credibilidad.",
    delay: 7200,
  },
  {
    role: "user",
    text: "Perdón, me confundí. Fue el 10 de marzo cuando crucé. El 15 llegué a mi destino final.",
    delay: 9000,
  },
];

const RESTART_DELAY = 13000;

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 px-2">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
        style={{ background: "linear-gradient(180deg,#60a5fa,#3494f4)" }}
      >
        🤖
      </div>
      <div className="glass-card px-4 py-3 rounded-2xl rounded-bl-sm">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-slate-400 block"
              style={{
                animation: `bounce 1s infinite ${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChatSimulatorWidget() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      setVisibleCount(0);
      setShowTyping(false);

      MESSAGES.forEach((msg, i) => {
        // Show typing indicator for AI messages just before they appear
        if (msg.role === "ai") {
          const t1 = setTimeout(() => setShowTyping(true), msg.delay - 700);
          const t2 = setTimeout(() => {
            setShowTyping(false);
            setVisibleCount(i + 1);
          }, msg.delay);
          timeouts.push(t1, t2);
        } else {
          const t = setTimeout(() => setVisibleCount(i + 1), msg.delay);
          timeouts.push(t);
        }
      });

      // Restart loop
      const restart = setTimeout(() => run(), RESTART_DELAY);
      timeouts.push(restart);
    };

    run();
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full rounded-2xl overflow-hidden glass-card shadow-2xl shadow-primary/10">
      {/* Top bar */}
      <div className="px-5 py-3 border-b border-slate-200/60 bg-white/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Sesión de Simulación · USCIS
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full bg-green-500 block"
            style={{ animation: "pulse 2s infinite" }}
          />
          <span className="text-xs font-bold text-green-600">EN VIVO</span>
        </div>
      </div>

      {/* Messages */}
      <div
        className="bg-gradient-to-b from-white/80 to-blue-50/40 px-4 py-4 flex flex-col gap-3"
        style={{ minHeight: 320 }}
      >
        {MESSAGES.slice(0, visibleCount).map((msg, i) => {
          if (msg.role === "alert") {
            return (
              <div
                key={i}
                className="mx-1 px-4 py-3 rounded-xl border border-red-200 bg-red-50/80 backdrop-blur"
                style={{ animation: "fadeSlideUp 0.4s ease" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="text-xs font-black text-red-600 uppercase tracking-wide">
                    Alerta de Contradicción
                  </span>
                </div>
                <p className="text-xs text-red-700 leading-relaxed">{msg.text}</p>
              </div>
            );
          }

          const isAI = msg.role === "ai";
          return (
            <div
              key={i}
              className={`flex items-end gap-2 ${isAI ? "" : "flex-row-reverse"}`}
              style={{ animation: "fadeSlideUp 0.4s ease" }}
            >
              {/* Avatar */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                style={
                  isAI
                    ? { background: "linear-gradient(180deg,#60a5fa,#3494f4)" }
                    : { background: "rgba(148,163,184,0.2)", border: "1px solid rgba(148,163,184,0.3)" }
                }
              >
                {isAI ? "🤖" : "👤"}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  isAI
                    ? "rounded-bl-sm bg-white/90 text-slate-800 border border-primary/20 shadow-sm"
                    : "rounded-br-sm text-white"
                }`}
                style={
                  !isAI
                    ? { background: "linear-gradient(135deg,#60a5fa,#3494f4)" }
                    : {}
                }
              >
                {isAI && (
                  <span className="block text-[10px] font-black text-primary uppercase tracking-wider mb-1">
                    Oficial IA
                  </span>
                )}
                {msg.text}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {showTyping && <TypingIndicator />}
      </div>

      {/* Input bar */}
      <div className="px-4 py-3 border-t border-slate-200/60 bg-white/60 flex items-center gap-3">
        <div className="flex-1 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center px-4">
          <span className="text-xs text-slate-400">Escribe tu respuesta...</span>
        </div>
        <div className="glossy-primary w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
          <Mic className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
