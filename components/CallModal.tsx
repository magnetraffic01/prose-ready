"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, PhoneCall, Loader2, CheckCircle2, Scale } from "lucide-react";

type Props = { isOpen: boolean; onClose: () => void };

type Step = "form" | "calling" | "success" | "error";

export default function CallModal({ isOpen, onClose }: Props) {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [errorMsg, setErrorMsg] = useState("");

  const handleCall = async () => {
    if (!phone.trim()) return;
    setStep("calling");
    try {
      const res = await fetch("/api/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: phone,
          locale: typeof navigator !== "undefined"
            ? navigator.language.split("-")[0]
            : "es",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("success");
      } else {
        setErrorMsg(data.error || "No se pudo iniciar la llamada.");
        setStep("error");
      }
    } catch {
      setErrorMsg("Error de conexión. Intenta de nuevo.");
      setStep("error");
    }
  };

  const handleClose = () => {
    setStep("form");
    setPhone("");
    setErrorMsg("");
    onClose();
  };

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="call-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backdropFilter: "blur(12px)", background: "rgba(0,0,0,0.45)" }}
            onClick={handleClose}
          />

          <motion.div
            key="call-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(40px)",
                border: "1px solid rgba(255,255,255,0.5)",
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#34d399,#059669)" }}>
                    <PhoneCall className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-sm">Simulación por Llamada</div>
                    <div className="text-xs text-slate-400">El agente de IA te llamará en segundos</div>
                  </div>
                </div>
                <motion.button onClick={handleClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}>
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Body */}
              <div className="px-6 py-8">
                {step === "form" && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 rounded-3xl mx-auto mb-4 flex items-center justify-center text-4xl"
                        style={{ background: "linear-gradient(135deg,rgba(52,148,244,0.1),rgba(52,148,244,0.05))", border: "2px solid rgba(52,148,244,0.15)" }}>
                        📞
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-2">
                        ¿A qué número te llamamos?
                      </h3>
                      <p className="text-sm text-slate-500">
                        El Oficial Martínez (IA) te llamará en menos de 30 segundos para tu entrevista de simulación.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                          Número de teléfono (EE.UU.)
                        </label>
                        <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 focus-within:border-primary/40 focus-within:bg-white transition-all">
                          <span className="text-slate-400 font-bold text-sm">+1</span>
                          <input
                            type="tel"
                            value={phone}
                            onChange={e => setPhone(formatPhone(e.target.value))}
                            placeholder="(555) 000-0000"
                            className="flex-1 bg-transparent text-slate-800 font-semibold text-lg outline-none placeholder-slate-300"
                            onKeyDown={e => e.key === "Enter" && handleCall()}
                            autoFocus
                          />
                          <Phone className="w-5 h-5 text-slate-300" />
                        </div>
                      </div>

                      <motion.button
                        onClick={handleCall}
                        disabled={phone.replace(/\D/g, "").length < 10}
                        className="w-full py-4 rounded-2xl text-white font-black text-lg disabled:opacity-40 flex items-center justify-center gap-2"
                        style={{ background: "linear-gradient(135deg,#34d399,#059669)" }}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <PhoneCall className="w-5 h-5" />
                        Iniciar llamada de simulación
                      </motion.button>
                    </div>

                    <div className="flex items-center gap-2 mt-5 p-3 bg-blue-50 rounded-xl">
                      <Scale className="w-4 h-4 text-primary flex-shrink-0" />
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Simulación educativa. El agente conduce una entrevista real de asilo USCIS en tu idioma.
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === "calling" && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-center py-4"
                  >
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <div className="w-24 h-24 rounded-full flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg,#34d399,#059669)" }}>
                        <PhoneCall className="w-10 h-10 text-white" />
                      </div>
                      {[0,1,2].map(i => (
                        <div key={i} className="absolute inset-0 rounded-full border-2 border-green-400"
                          style={{ animation: `ping 1.5s ease-out infinite ${i * 0.5}s`, opacity: 0 }} />
                      ))}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">Iniciando llamada...</h3>
                    <p className="text-slate-500 text-sm">El Oficial Martínez te llamará en segundos</p>
                    <div className="flex justify-center mt-4">
                      <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    </div>
                    <style>{`@keyframes ping { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.8); opacity: 0; } }`}</style>
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-24 h-24 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">¡Llamada en camino!</h3>
                    <p className="text-slate-500 text-sm mb-6">
                      El Oficial Martínez te está llamando a <strong className="text-slate-800">{phone}</strong>. Recibirás la llamada en segundos.
                    </p>
                    <motion.button onClick={handleClose}
                      className="px-8 py-3 rounded-2xl text-white font-black"
                      style={{ background: "linear-gradient(135deg,#60a5fa,#3494f4)" }}
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      Cerrar
                    </motion.button>
                  </motion.div>
                )}

                {step === "error" && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center mx-auto mb-4 text-3xl">❌</div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">Error al iniciar la llamada</h3>
                    <p className="text-slate-500 text-sm mb-6">{errorMsg}</p>
                    <div className="flex gap-3 justify-center">
                      <motion.button onClick={() => setStep("form")}
                        className="px-6 py-3 rounded-2xl font-black glass-button text-slate-800"
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                        Intentar de nuevo
                      </motion.button>
                      <motion.button onClick={handleClose}
                        className="px-6 py-3 rounded-2xl font-black text-slate-500 hover:text-slate-800"
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                        Cerrar
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
