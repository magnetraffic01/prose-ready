"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-center mb-12">{t("title")}</h2>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-8 text-left hover:bg-white/40 transition-colors">
                <span className="font-black text-lg">{item.q}</span>
                <PlusCircle className={`w-6 h-6 text-primary flex-shrink-0 transition-transform ${open === i ? "rotate-45" : ""}`} />
              </button>
              {open === i && <div className="px-8 pb-8 text-slate-500 leading-relaxed">{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
