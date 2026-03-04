import { useTranslations } from "next-intl";
import { BarChart3, Brain, AlertCircle, ClipboardCheck, Leaf } from "lucide-react";

const icons = [BarChart3, Brain, AlertCircle, ClipboardCheck, Leaf];

export default function WhyProSeReady() {
  const t = useTranslations("why");
  const features = t.raw("features") as { title: string; desc: string }[];
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">{t("title")}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map(({ title, desc }, i) => {
            const Icon = icons[i];
            return (
              <div key={title} className="bg-white p-10 rounded-3xl glass-card hover:-translate-y-2 transition-all cursor-default">
                <div className="w-14 h-14 glossy-primary rounded-2xl flex items-center justify-center text-white mb-8">
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
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
