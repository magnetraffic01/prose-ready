"use client";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Scale, Globe, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const switchLocale = (code: string) => {
    const segments = pathname.split("/");
    segments[1] = code;
    router.push(segments.join("/") || "/");
    setLangOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
      className="sticky top-4 z-50 w-[95%] mx-auto mt-4 rounded-2xl"
      style={{
        background: scrolled ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.4)",
        backdropFilter: scrolled ? "blur(32px)" : "blur(20px)",
        WebkitBackdropFilter: scrolled ? "blur(32px)" : "blur(20px)",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow: scrolled
          ? "0 8px 40px rgba(31,38,135,0.12)"
          : "0 8px 32px rgba(31,38,135,0.07)",
        transition: "all 0.4s cubic-bezier(0.25,0.1,0.25,1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Scale className="w-7 h-7 text-primary" strokeWidth={1.5} />
            <span className="text-xl font-extrabold tracking-tight text-slate-900">ProSe Ready</span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "#como-funciona", label: t("howItWorks") },
              { href: "#escenarios", label: t("scenarios") },
              { href: "#planes", label: t("plans") },
              { href: "#faq", label: t("faq") },
            ].map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative">
              <motion.button
                onClick={() => setLangOpen(!langOpen)}
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full glass-button hover:bg-white/50 transition-all"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Globe className="w-4 h-4" />
                <span>{currentLang.flag} {currentLang.label}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`} />
              </motion.button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute right-0 mt-2 w-44 glass-card rounded-xl overflow-hidden shadow-xl"
                  >
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => switchLocale(lang.code)}
                        className={`w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold hover:bg-white/60 transition-colors text-left ${locale === lang.code ? "text-primary" : "text-slate-700"}`}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                        {locale === lang.code && <span className="ml-auto text-primary">✓</span>}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              className="glossy-primary text-white text-sm font-bold px-6 py-2.5 rounded-full"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {t("cta")}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
