import { useTranslations } from "next-intl";

const emojis = ["🏛️", "⚖️", "👨‍⚖️"];

export default function Scenarios() {
  const t = useTranslations("scenarios");
  const items = t.raw("items") as { tag: string; title: string; desc: string }[];
  return (
    <section className="py-24" id="escenarios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black mb-4">{t("title")}</h2>
          <p className="text-slate-600">{t("subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map(({ tag, title, desc }, i) => (
            <div key={title} className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col group h-full transition-all hover:shadow-2xl hover:shadow-primary/10">
              <div className="h-56 overflow-hidden relative bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                <span className="text-7xl group-hover:scale-110 transition-transform duration-700">{emojis[i]}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-10 flex flex-col flex-1">
                <div className="text-primary font-bold text-xs uppercase mb-3 tracking-widest">{tag}</div>
                <h3 className="text-2xl font-black mb-4">{title}</h3>
                <p className="text-slate-500 mb-8 flex-1 leading-relaxed text-sm">{desc}</p>
                <button className="w-full py-4 glass-button text-slate-900 font-black rounded-2xl hover:bg-primary hover:text-white transition-all">
                  {t("select")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
