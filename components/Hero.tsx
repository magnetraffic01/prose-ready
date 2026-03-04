"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import ChatSimulatorWidget from "./ChatSimulatorWidget";
import SimulationModal from "./SimulationModal";
import { fadeUp, slideInRight, staggerContainer } from "@/lib/animations";

export default function Hero() {
  const t = useTranslations("hero");
  const [modalOpen, setModalOpen] = useState(false);

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

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-5">
              {/* PRIMARY: opens the modal */}
              <motion.button
                onClick={() => setModalOpen(true)}
                className="glossy-primary text-white text-lg font-bold px-10 py-5 rounded-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {t("ctaPrimary")}
              </motion.button>

              {/* SECONDARY: scrolls to how it works */}
              <motion.a
                href="#como-funciona"
                className="flex items-center justify-center gap-2 glass-button text-slate-900 text-lg font-bold px-10 py-5 rounded-2xl hover:bg-white/60 transition-all"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {t("ctaSecondary")}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Chat Simulator preview */}
          <motion.div
            className="flex-1 w-full max-w-lg lg:max-w-none"
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <div className="relative cursor-pointer" onClick={() => setModalOpen(true)}>
              <ChatSimulatorWidget />
              {/* Click overlay hint */}
              <motion.div
                className="absolute inset-0 rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                style={{ background: "rgba(52,148,244,0.08)" }}
              >
                <span className="glossy-primary text-white font-black px-6 py-3 rounded-xl text-sm shadow-lg">
                  Iniciar simulación real →
                </span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Full-screen simulation modal */}
      <SimulationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
