import { Scale, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 py-20 border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Scale className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="text-lg font-bold tracking-tight">ProSe Ready</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">Simulador de entrevistas de asilo impulsado por IA para ayudar a solicitantes a prepararse para su futuro.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Enlaces</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a className="hover:text-primary transition-colors" href="#">Privacidad</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Términos</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Escenarios</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a className="hover:text-primary transition-colors" href="#">USCIS Afirmativo</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Miedo Creíble</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Corte Judicial</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Idioma</h4>
            <button className="flex items-center gap-2 text-sm text-slate-500 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-all">
              <Globe className="w-4 h-4" />
              Español (Latinoamérica)
            </button>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8">
          <p className="text-[10px] text-slate-400 leading-relaxed max-w-4xl">
            DESCARGO DE RESPONSABILIDAD: ProSe Ready es una plataforma tecnológica y no es un bufete de abogados, no brinda asesoría legal y no es un sustituto de un abogado. No estamos afiliados con USCIS, ICE, DHS ni ninguna agencia gubernamental de los Estados Unidos.
          </p>
          <p className="text-[10px] text-slate-400 mt-4">© 2024 ProSe Ready. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
