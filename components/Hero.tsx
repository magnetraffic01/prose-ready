"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ShieldCheck, MessageSquare, Phone } from "lucide-react";
import { motion } from "framer-motion";
import ChatSimulatorWidget from "./ChatSimulatorWidget";
import SimulationModal from "./SimulationModal";
import CallModal from "./CallModal";
import { fadeUp, slideInRight, staggerContainer } from "@/lib/animations";

export default function Hero() {
  const t = useTranslations("hero");
  const [chatOpen, setChatOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);

  // Listen for navbar CTA event
  useEffect(() => {
    const handler = () => setChatOpen(true);
    window.addEventListener("open-chat-simulator", handler);
    return () => window.removeEventListener("open-chat-simulator", handler);
  }, []);

  return (
    <>
      <section
        className="relative overflow-hidden pt-20 pb-24 lg:pt-40 lg:pb-52"
        style={{ background: "linear-gradient(to bottom, rgba(239,246,255,0.5), transparent)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">

          {/* Left */}
          <motion.div
            className="flex-1 text-left"
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-button text-primary text-[10px] font-bold uppercase tracking-widest mb-8"
            >
              <ShieldCheck className="w-4 h-4" />
              {t("badge")}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-none mb-8"
            >
              {t("title")} <span className="text-primary">{t("titleHighlight")}</span> {t("titleEnd")}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl font-medium text-slate-500 mb-10 max-w-2xl leading-relaxed"
            >
              {t("subtitle")}{" "}
              <span className="text-primary font-bold italic">{t("subtitleHighlight")}</span>{" "}
              {t("subtitleEnd")}
            </motion.p>

            {/* Two simulator buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              {/* Chat simulator */}
              <motion.button
                onClick={() => setChatOpen(true)}
                className="flex items-center justify-center gap-2.5 glossy-primary text-white text-base font-bold px-8 py-4 rounded-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <MessageSquare className="w-5 h-5" />
                Simular por Chat
              </motion.button>

              {/* Voice call simulator */}
              <motion.button
                onClick={() => setCallOpen(true)}
                className="flex items-center justify-center gap-2.5 text-base font-bold px-8 py-4 rounded-2xl text-white"
                style={{ background: "linear-gradient(135deg,#34d399,#059669)" }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Phone className="w-5 h-5" />
                Simular por Llamada
              </motion.button>

              {/* How it works */}
              <motion.a
                href="#como-funciona"
                className="flex items-center justify-center glass-button text-slate-700 text-base font-bold px-8 py-4 rounded-2xl hover:bg-white/60 transition-all"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {t("ctaSecondary")}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Chat Preview */}
          <motion.div
            className="flex-1 w-full max-w-lg lg:max-w-none"
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <div className="relative cursor-pointer" onClick={() => setChatOpen(true)}>
              <ChatSimulatorWidget />
              <motion.div
                className="absolute inset-0 rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                style={{ background: "rgba(52,148,244,0.08)" }}
              >
                <span className="glossy-primary text-white font-black px-6 py-3 rounded-xl text-sm shadow-lg">
                  Iniciar simulación por chat →
                </span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      <SimulationModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <CallModal isOpen={callOpen} onClose={() => setCallOpen(false)} />
    </>
  );
}
