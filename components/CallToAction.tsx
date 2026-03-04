"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";

export default function CallToAction() {
  const t = useTranslations("cta");
  return (
    <section className="py-24 text-white relative overflow-hidden" style={{ backgroundColor: "#0a0f1a" }}>
      <div className="absolute inset-0" style={{ background: "rgba(52,148,244,0.2)" }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 blur-[120px] rounded-full" style={{ background: "rgba(52,148,244,0.2)" }} />
        <motion.div
          className="relative z-10"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2 variants={fadeUp} className="text-5xl sm:text-6xl font-black mb-10 leading-tight">
            {t("title")}<br />{t("titleEnd")}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-slate-400 mb-14 max-w-2xl mx-auto">
            {t("subtitle")}
          </motion.p>
          <motion.div variants={fadeUp}>
            <motion.button
              className="bg-white text-slate-950 text-xl font-black px-12 py-6 rounded-[2rem] shadow-2xl"
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              {t("button")}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
