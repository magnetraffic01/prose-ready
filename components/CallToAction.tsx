import { useTranslations } from "next-intl";

export default function CallToAction() {
  const t = useTranslations("cta");
  return (
    <section className="py-24 text-white relative overflow-hidden" style={{ backgroundColor: "#0a0f1a" }}>
      <div className="absolute inset-0" style={{ background: "rgba(52,148,244,0.2)" }}></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 blur-[120px] rounded-full" style={{ background: "rgba(52,148,244,0.2)" }}></div>
        <div className="relative z-10">
          <h2 className="text-5xl sm:text-6xl font-black mb-10 leading-tight">
            {t("title")}<br />{t("titleEnd")}
          </h2>
          <p className="text-xl text-slate-400 mb-14 max-w-2xl mx-auto">{t("subtitle")}</p>
          <button className="bg-white text-slate-950 text-xl font-black px-12 py-6 rounded-[2rem] hover:scale-110 transition-all shadow-2xl">
            {t("button")}
          </button>
        </div>
      </div>
    </section>
  );
}
