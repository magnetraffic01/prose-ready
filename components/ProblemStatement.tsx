export default function ProblemStatement() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-card p-12 sm:p-20 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          <h2 className="text-4xl font-black mb-8 relative z-10">Asesoría saturada y barreras de lenguaje</h2>
          <p className="text-xl text-slate-500 leading-relaxed mb-12 relative z-10">
            El sistema legal está colapsado y no saber qué esperar aumenta drásticamente el riesgo de negación.
            ProSe Ready cierra la brecha tecnológica para que puedas defender tu caso con las mismas herramientas que un experto.
          </p>
          <div className="flex justify-center relative z-10">
            <button className="glass-button text-primary px-10 py-4 rounded-2xl font-black hover:bg-white/60 transition-all">
              Saber más sobre el sistema
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
