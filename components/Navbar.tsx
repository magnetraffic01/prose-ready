"use client";
import { Gavel, Language, PlayArrow } from "./Icons";

export default function Navbar() {
  return (
    <header className="sticky top-4 z-50 w-[95%] mx-auto mt-4 rounded-2xl glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-primary flex items-center">
              <Gavel className="w-8 h-8" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">ProSe Ready</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#como-funciona">Cómo funciona</a>
            <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#escenarios">Escenarios</a>
            <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#planes">Planes</a>
            <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#faq">Preguntas</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-full glass-button hover:bg-white/50 transition-all">
              <Language className="w-4 h-4" />
              Español
            </button>
            <button className="glossy-primary text-white text-sm font-bold px-6 py-2.5 rounded-full hover:scale-105 transition-all">
              Simulación Gratis
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
