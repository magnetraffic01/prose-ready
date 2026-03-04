import { useTranslations } from "next-intl";
import { BarChart3, Brain, AlertCircle } from "lucide-react";

const icons = [BarChart3, Brain, AlertCircle];

export default function HowItWorks() {
  const t = useTranslations("how");
  const steps = t.raw("steps") as { title: string; desc: string }[];
  return (
    <section className="py-24 bg-slate-50" id="como-funciona">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black">{t("title")}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map(({ title, desc }, i) => {
            const Icon = icons[i];
            return (
              <div key={title} className="p-10 rounded-3xl glass-card hover:-translate-y-2 transition-all cursor-default" style={{ backdropFilter: "blur(40px)", background: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.4)" }}>
                <div className="w-14 h-14 glossy-primary rounded-2xl flex items-center justify-center text-white mb-8">
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <div className="text-primary text-xs font-black uppercase tracking-widest mb-2">0{i + 1}</div>
                <h3 className="font-black text-xl mb-3">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
