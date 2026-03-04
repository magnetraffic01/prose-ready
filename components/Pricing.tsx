import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";

export default function Pricing() {
  const t = useTranslations("pricing");
  const plans = t.raw("plans") as { name: string; price: string; period: string; features: string[]; cta: string; highlight?: boolean }[];
  return (
    <section className="py-32 relative" style={{ background: "linear-gradient(135deg, #2563eb, #3494f4)" }} id="planes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-white mb-4">{t("title")}</h2>
          <p className="text-white/80">{t("subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {plans.map((plan) => (
            <div key={plan.name} className={`p-10 rounded-3xl flex flex-col text-white relative ${plan.highlight ? "scale-105 shadow-2xl" : ""}`}
              style={{ backdropFilter: "blur(40px)", background: plan.highlight ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.15)", border: plan.highlight ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.2)" }}>
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 glossy-primary text-[10px] font-black uppercase tracking-widest px-5 py-1.5 rounded-full whitespace-nowrap">
                  {t("recommended")}
                </div>
              )}
              <h3 className="font-black text-xl mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-4xl font-black">{plan.price}</span>
                {plan.period && <span className="text-sm text-white/60">{plan.period}</span>}
              </div>
              <ul className="space-y-5 mb-12 flex-1 text-sm text-white/80">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>
              {plan.highlight ? (
                <button className="w-full py-4 bg-white text-primary font-black rounded-2xl hover:scale-105 transition-all">{plan.cta}</button>
              ) : (
                <button className="w-full py-4 font-black rounded-2xl hover:bg-white/30 transition-all" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}>{plan.cta}</button>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-white/60 text-xs mt-12">{t("note")}</p>
      </div>
    </section>
  );
}
