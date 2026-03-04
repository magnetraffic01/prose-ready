"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { scaleIn, fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";

export default function ProblemStatement() {
  const t = useTranslations("problem");
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="glass-card p-12 sm:p-20 rounded-[3rem] text-center relative overflow-hidden"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/5 rounded-full -ml-32 -mb-32 blur-3xl" />
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="relative z-10"
          >
            <motion.h2 variants={fadeUp} className="text-4xl font-black mb-8">{t("title")}</motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-slate-500 leading-relaxed mb-12">{t("desc")}</motion.p>
            <motion.div variants={fadeUp} className="flex justify-center">
              <motion.button
                className="glass-button text-primary px-10 py-4 rounded-2xl font-black"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {t("cta")}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
