"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer, viewportConfig } from "@/lib/animations";

const emojis = ["🏛️", "⚖️", "👨‍⚖️"];

export default function Scenarios() {
  const t = useTranslations("scenarios");
  const items = t.raw("items") as { tag: string; title: string; desc: string }[];

  return (
    <section className="py-24" id="escenarios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2 variants={fadeUp} className="text-3xl font-black mb-4">{t("title")}</motion.h2>
          <motion.p variants={fadeUp} className="text-slate-600">{t("subtitle")}</motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {items.map(({ tag, title, desc }, i) => (
            <motion.div
              key={title}
              variants={scaleIn}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col group h-full"
            >
              <div className="h-56 overflow-hidden relative bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                <motion.span
                  className="text-7xl"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {emojis[i]}
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-10 flex flex-col flex-1">
                <div className="text-primary font-bold text-xs uppercase mb-3 tracking-widest">{tag}</div>
                <h3 className="text-2xl font-black mb-4">{title}</h3>
                <p className="text-slate-500 mb-8 flex-1 leading-relaxed text-sm">{desc}</p>
                <motion.button
                  className="w-full py-4 glass-button text-slate-900 font-black rounded-2xl"
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(52,148,244,1)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {t("select")}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
