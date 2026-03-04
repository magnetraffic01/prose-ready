import { useTranslations } from "next-intl";
import { Scale, Globe } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="bg-slate-50 py-20 border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Scale className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="text-lg font-bold tracking-tight">ProSe Ready</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">{t("desc")}</p>
          </div>
          <div>
            <h4 className="font-bold mb-6">{t("links")}</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a className="hover:text-primary transition-colors" href="#">{t("privacy")}</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">{t("terms")}</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">{t("contact")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">{t("scenariosTitle")}</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a className="hover:text-primary transition-colors" href="#">USCIS</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Credible Fear</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Immigration Court</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">{t("languageTitle")}</h4>
            <div className="flex flex-col gap-2">
              {[{code:"es",flag:"🇪🇸",label:"Español"},{code:"en",flag:"🇺🇸",label:"English"},{code:"pt",flag:"🇧🇷",label:"Português"}].map(l => (
                <a key={l.code} href={`/${l.code}`} className="flex items-center gap-2 text-sm text-slate-500 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 hover:text-primary transition-all">
                  <Globe className="w-4 h-4" />{l.flag} {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8">
          <p className="text-[10px] text-slate-400 leading-relaxed max-w-4xl">{t("disclaimer")}</p>
          <p className="text-[10px] text-slate-400 mt-4">{t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
