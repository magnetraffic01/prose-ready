export default function CallToAction() {
  return (
    <section className="py-24 bg-background-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[120px] rounded-full"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-5xl sm:text-6xl font-black mb-10 leading-tight">
            No dejes tu futuro<br /> al azar.
          </h2>
          <p className="text-xl text-slate-400 mb-14 max-w-2xl mx-auto">
            Miles de solicitantes han mejorado su confianza y claridad con nuestras simulaciones interactivas.
          </p>
          <button className="bg-white text-slate-950 text-xl font-black px-12 py-6 rounded-[2rem] hover:scale-110 transition-all shadow-2xl">
            Empezar mi preparación hoy
          </button>
        </div>
      </div>
    </section>
  );
}
