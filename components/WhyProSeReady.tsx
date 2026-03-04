import { BarChart3, Brain, AlertCircle, ClipboardCheck, Leaf } from "lucide-react";

const features = [
  { icon: BarChart3, title: "Entiende tu caso", desc: "Analiza los puntos clave de tu narrativa de asilo y fortalece tu historia." },
  { icon: Brain, title: "Un paso adelante", desc: "Anticipa las preguntas difíciles que el oficial podría realizarte." },
  { icon: AlertCircle, title: "Conoce los riesgos", desc: "Identifica posibles contradicciones antes de tu cita oficial." },
  { icon: ClipboardCheck, title: "Sin improvisación", desc: "Llega preparado con respuestas claras y estructuradas legalmente." },
  { icon: Leaf, title: "Calma total", desc: "Reduce la ansiedad practicando en un entorno seguro y privado." },
];

export default function WhyProSeReady() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">¿Por qué ProSe Ready?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Porque te damos preparación real para que enfrentes tu proceso con seguridad.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white p-10 rounded-3xl glass-card hover:-translate-y-2 transition-all cursor-default">
              <div className="w-14 h-14 glossy-primary rounded-2xl flex items-center justify-center text-white mb-8">
                <Icon className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h3 className="font-black text-xl mb-3">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
