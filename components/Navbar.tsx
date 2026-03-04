"use client";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Scale, Globe, ChevronDown } from "lucide-react";
import { useState } from "react";

const languages = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const switchLocale = (code: string) => {
    const segments = pathname.split("/");
    segments[1] = code;
    router.push(segments.join("/") || "/");
    setLangOpen(false);
  };

  return (
    <header className="sticky top-4 z-50 w-[95%] mx-auto mt-4 rounded-2xl glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-7 h-7 text-primary" strokeWidth={1.5} />
            <span className="text-xl font-extrabold tracking-tight text-slate-900">ProSe Ready</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#como-funciona">{t("howItWorks")}</a>
            <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#escenarios">{t("scenarios")}</a>
            <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#planes">{t("plans")}</a>
            <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#faq">{t("faq")}</a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full glass-button hover:bg-white/50 transition-all"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLang.flag} {currentLang.label}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-44 glass-card rounded-xl overflow-hidden shadow-xl">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLocale(lang.code)}
                      className={`w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold hover:bg-white/60 transition-colors text-left ${locale === lang.code ? "text-primary" : "text-slate-700"}`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                      {locale === lang.code && <span className="ml-auto text-primary">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="glossy-primary text-white text-sm font-bold px-6 py-2.5 rounded-full hover:scale-105 transition-all">
              {t("cta")}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
