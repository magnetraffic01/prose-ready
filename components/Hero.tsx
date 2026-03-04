"use client";
import { useTranslations } from "next-intl";
import { ShieldCheck, PlayCircle } from "lucide-react";
import ChatSimulatorWidget from "./ChatSimulatorWidget";

export default function Hero() {
  const t = useTranslations("hero");
  return (
    <section
      className="relative overflow-hidden pt-20 pb-24 lg:pt-40 lg:pb-52"
      style={{ background: "linear-gradient(to bottom, rgba(239,246,255,0.5), transparent)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">

        {/* Left: Copy */}
        <div className="flex-1 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-button text-primary text-[10px] font-bold uppercase tracking-widest mb-8">
            <ShieldCheck className="w-4 h-4" />
            {t("badge")}
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-none mb-8">
            {t("title")} <span className="text-primary">{t("titleHighlight")}</span> {t("titleEnd")}
          </h1>
          <p className="text-xl font-medium text-slate-500 mb-10 max-w-2xl leading-relaxed">
            {t("subtitle")}{" "}
            <span className="text-primary font-bold italic">{t("subtitleHighlight")}</span>{" "}
            {t("subtitleEnd")}
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button className="glossy-primary text-white text-lg font-bold px-10 py-5 rounded-2xl hover:scale-105 transition-all">
              {t("ctaPrimary")}
            </button>
            <button className="flex items-center justify-center gap-2 glass-button text-slate-900 text-lg font-bold px-10 py-5 rounded-2xl hover:bg-white/60 transition-all">
              <PlayCircle className="w-6 h-6" />
              {t("ctaSecondary")}
            </button>
          </div>
        </div>

        {/* Right: Animated Chat Simulator */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none">
          <ChatSimulatorWidget />
        </div>

      </div>
    </section>
  );
}
