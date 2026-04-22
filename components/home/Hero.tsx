import HeroEmailForm from "./HeroEmailForm";

export default function Hero() {
  return (
    <section className="bg-[#1F2937] dark:bg-gray-950 text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-teal-400 text-xs font-semibold uppercase tracking-widest mb-4">
          Para ingenieros comerciales · estudiantes · profesionales
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] mb-5 text-white">
          Lo esencial de economía y negocios —{" "}
          <span className="text-teal-400">en 5 minutos al día.</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          Curamos las noticias que importan y explicamos por qué son relevantes
          para tus ramos, tu pega y tus decisiones como ciudadano.
        </p>
        <HeroEmailForm />
        <p className="text-xs text-gray-600 mt-4">
          Sin spam. Te das de baja cuando quieras.
        </p>
      </div>
    </section>
  );
}
