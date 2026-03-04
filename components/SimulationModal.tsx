"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mic,
  MicOff,
  Send,
  RotateCcw,
  Scale,
  Loader2,
} from "lucide-react";
import { useSimulation } from "@/hooks/useSimulation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function TypingDots() {
  return (
    <div className="flex gap-1 items-center h-5 px-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-slate-400 block"
          style={{ animation: `bounce-dot 1s infinite ${i * 0.18}s` }}
        />
      ))}
    </div>
  );
}

function MessageBubble({
  role,
  content,
  isLoading,
}: {
  role: string;
  content: string;
  isLoading?: boolean;
}) {
  const isAI = role === "assistant";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className={`flex items-end gap-2.5 ${isAI ? "" : "flex-row-reverse"}`}
    >
      {/* Avatar */}
      <div
        className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold shadow-sm ${
          isAI
            ? "text-white"
            : "bg-slate-100 border border-slate-200 text-slate-600"
        }`}
        style={isAI ? { background: "linear-gradient(135deg,#60a5fa,#3494f4)" } : {}}
      >
        {isAI ? "🤖" : "👤"}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[72%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isAI
            ? "bg-white border border-slate-100 text-slate-800 rounded-bl-sm"
            : "text-white rounded-br-sm"
        }`}
        style={
          !isAI
            ? { background: "linear-gradient(135deg,#60a5fa,#3494f4)" }
            : {}
        }
      >
        {isAI && (
          <span className="block text-[10px] font-black text-primary uppercase tracking-wider mb-1.5">
            Oficial IA · USCIS
          </span>
        )}
        {isLoading ? <TypingDots /> : content}
      </div>
    </motion.div>
  );
}

export default function SimulationModal({ isOpen, onClose }: Props) {
  const {
    messages,
    isRecording,
    isLoading,
    isStarted,
    startSession,
    sendText,
    startRecording,
    stopRecording,
    reset,
  } = useSimulation();

  const [inputText, setInputText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Start session when modal opens
  useEffect(() => {
    if (isOpen && !isStarted) {
      startSession();
    }
  }, [isOpen, isStarted, startSession]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendText(inputText);
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    reset();
    startSession();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            style={{ backdropFilter: "blur(12px)", background: "rgba(0,0,0,0.45)" }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.93, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full flex flex-col rounded-3xl overflow-hidden shadow-2xl"
              style={{
                maxWidth: "900px",
                height: "90vh",
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                border: "1px solid rgba(255,255,255,0.5)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-4 border-b border-slate-200/60"
                style={{ background: "rgba(255,255,255,0.6)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#60a5fa,#3494f4)" }}
                  >
                    <Scale className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-sm">
                      Simulador de Entrevista de Asilo
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className="w-2 h-2 rounded-full bg-green-500 block"
                        style={{ animation: "pulse-dot 2s infinite" }}
                      />
                      <span className="text-xs text-green-600 font-semibold">
                        Sesión activa · GPT-4.5
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={handleReset}
                    className="p-2.5 rounded-xl text-slate-400 hover:text-primary hover:bg-blue-50 transition-colors"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.93 }}
                    title="Nueva sesión"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={handleClose}
                    className="p-2.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.93 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">
                {messages.length === 0 && (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
                      <p className="text-slate-400 text-sm">
                        Iniciando sesión...
                      </p>
                    </div>
                  </div>
                )}

                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    role={msg.role}
                    content={msg.content}
                    isLoading={msg.isLoading}
                  />
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input Bar */}
              <div
                className="px-5 py-4 border-t border-slate-200/60"
                style={{ background: "rgba(255,255,255,0.6)" }}
              >
                <div className="flex items-end gap-3">
                  {/* Textarea */}
                  <div className="flex-1 relative">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Escribe tu respuesta... (Enter para enviar)"
                      disabled={isLoading || isRecording}
                      rows={1}
                      className="w-full resize-none rounded-2xl bg-slate-50 border border-slate-200 px-5 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 disabled:opacity-50 transition-all"
                      style={{ minHeight: 52, maxHeight: 120 }}
                      onInput={(e) => {
                        const t = e.currentTarget;
                        t.style.height = "auto";
                        t.style.height = Math.min(t.scrollHeight, 120) + "px";
                      }}
                    />
                  </div>

                  {/* Mic button */}
                  <motion.button
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                    disabled={isLoading}
                    className={`flex-shrink-0 w-13 h-13 rounded-2xl flex items-center justify-center text-white transition-all disabled:opacity-40 ${
                      isRecording ? "bg-red-500 shadow-lg shadow-red-200" : ""
                    }`}
                    style={
                      !isRecording
                        ? {
                            background:
                              "linear-gradient(135deg,#60a5fa,#3494f4)",
                          }
                        : {}
                    }
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.93 }}
                    title={isRecording ? "Suelta para enviar" : "Mantén para hablar"}
                  >
                    {isRecording ? (
                      <MicOff className="w-5 h-5" />
                    ) : (
                      <Mic className="w-5 h-5" />
                    )}
                  </motion.button>

                  {/* Send button */}
                  <motion.button
                    onClick={handleSend}
                    disabled={!inputText.trim() || isLoading}
                    className="flex-shrink-0 w-13 h-13 rounded-2xl flex items-center justify-center text-white disabled:opacity-40"
                    style={{
                      width: 52,
                      height: 52,
                      background:
                        "linear-gradient(135deg,#60a5fa,#3494f4)",
                    }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.93 }}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>

                {isRecording && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-3 text-xs text-red-500 font-semibold"
                  >
                    <span
                      className="w-2 h-2 rounded-full bg-red-500"
                      style={{ animation: "pulse-dot 1s infinite" }}
                    />
                    Grabando... suelta el botón para enviar
                  </motion.div>
                )}

                <p className="text-center text-[10px] text-slate-400 mt-3">
                  Esta es una simulación educativa. No constituye asesoramiento legal.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Keyframes */}
          <style>{`
            @keyframes bounce-dot {
              0%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-6px); }
            }
            @keyframes pulse-dot {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.3; }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
