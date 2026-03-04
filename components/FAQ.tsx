"use client";
import { useState } from "react";
import { AddCircle } from "./Icons";

const faqs = [
  {
    q: "¿La IA reemplaza a un abogado?",
    a: "No. ProSe Ready es una herramienta de preparación complementaria. Siempre recomendamos contar con asesoría legal profesional para tu caso.",
  },
  {
    q: "¿Es mi información privada?",
    a: "Sí. Usamos encriptación de grado bancario y no compartimos tus datos ni narrativas con terceros. Tu privacidad es nuestra prioridad absoluta.",
  },
  {
    q: "¿En qué idiomas puedo practicar?",
    a: "Nuestra IA soporta Español, Inglés, Francés y otros 20 idiomas más, permitiéndote practicar en tu lengua materna o en el idioma de la entrevista.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-center mb-12">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-8 text-left hover:bg-white/40 transition-colors"
              >
                <span className="font-black text-lg">{faq.q}</span>
                <AddCircle className="w-6 h-6 text-primary flex-shrink-0" />
              </button>
              {open === i && (
                <div className="px-8 pb-8 text-slate-500 leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
