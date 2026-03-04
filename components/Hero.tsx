"use client";
import { ShieldCheck, PlayCircle, AlertTriangle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 lg:pt-40 lg:pb-52" style={{ background: "linear-gradient(to bottom, rgba(239,246,255,0.5), transparent)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-button text-primary text-[10px] font-bold uppercase tracking-widest mb-8">
            <ShieldCheck className="w-4 h-4" />
            IA Entrenada en Procesos de EE.UU.
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-none mb-8">
            Simulador de <span className="text-primary">entrevistas</span> de asilo con IA
          </h1>
          <p className="text-xl font-medium text-slate-500 mb-10 max-w-2xl leading-relaxed">
            El oficial no te va a dar una segunda oportunidad.{" "}
            <span className="text-primary font-bold italic">Nosotros sí.</span> Practica tu entrevista como si fuera el día real con nuestra tecnología de detección de riesgos.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button className="glossy-primary text-white text-lg font-bold px-10 py-5 rounded-2xl hover:scale-105 transition-all">
              Comenzar simulación gratuita
            </button>
            <button className="flex items-center justify-center gap-2 glass-button text-slate-900 text-lg font-bold px-10 py-5 rounded-2xl hover:bg-white/60 transition-all">
              <PlayCircle className="w-6 h-6" />
              Ver cómo funciona
            </button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-xl lg:max-w-none">
          <div className="relative rounded-2xl overflow-hidden glass-card">
            <div className="bg-white p-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Sesión de Simulación</span>
              <div className="w-10"></div>
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-blue-50 h-64 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <div className="w-20 h-20 rounded-full bg-slate-200 mx-auto mb-4 flex items-center justify-center text-4xl">👩‍💼</div>
                <p className="text-sm font-medium">Simulación en progreso...</p>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-bold text-sm text-slate-900">Alerta de Contradicción</span>
              </div>
              <p className="text-xs text-slate-600">Su respuesta sobre la fecha de entrada difiere de su declaración inicial en el Formulario I-589.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
