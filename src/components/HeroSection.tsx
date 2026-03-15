import { useEffect, useState } from "react";
import { ChevronDown, Heart } from "lucide-react";
import heroPhoto from "@/assets/foto2_f&a.jpeg";

export const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const scrollToNext = () => {
    const next = document.getElementById("gifts-section");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background photo */}
      <img
        src={heroPhoto}
        alt="Felipe e Amanda"
        // className="absolute inset-0 w-full h-full object-cover object-center"
        className="absolute inset-0 w-full h-full object-cover object-[20%_60%]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/65" />

      {/* Petal decorations */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white opacity-60 text-2xl animate-float select-none pointer-events-none">
        ✿ ✿ ✿
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-6 max-w-3xl mx-auto transition-all duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
        {/* Heart icon */}
        <div className="animate-fade-up flex justify-center mb-6">
          <Heart className="text-white fill-white" size={28} strokeWidth={1} />
        </div>

        {/* Save the date */}
        <p className="animate-fade-up-delay-1 font-body tracking-[0.25em] uppercase text-xs text-white mb-4">
          Save the Date
        </p>

        {/* Romantic quote */}
        <blockquote className="animate-fade-up-delay-1 font-display italic font-light text-xl md:text-2xl leading-relaxed text-white mb-8 px-2">
          "Depois de tantas histórias vividas, chegou o momento de escrevermos juntos
          o nosso capítulo mais especial. Queremos você conosco nesse dia inesquecível{" "}
          <span className="text-[hsl(var(--peach))]">❤️</span>"
        </blockquote>

        {/* Names */}
        <h1 className="animate-fade-up-delay-2 font-display font-light text-5xl md:text-7xl text-white tracking-wide mb-3">
          Felipe <span className="text-white font-normal italic">&amp;</span> Amanda
        </h1>

        {/* Divider */}
        <div className="animate-fade-up-delay-3 flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-16 bg-white/60" />
          <span className="text-white text-lg">✦</span>
          <div className="h-px w-16 bg-white/60" />
        </div>

        {/* Date */}
        <p className="animate-fade-up-delay-3 font-body text-white/80 tracking-[0.3em] text-sm uppercase mb-10">
          28 de Maio de 2026 · São Paulo
        </p>

        {/* Scroll button */}
        <button
          onClick={scrollToNext}
          className="animate-fade-up-delay-4 group inline-flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors duration-300"
          aria-label="Ver mais informações"
        >
          <span className="font-body text-xs tracking-[0.2em] uppercase">Ver mais informações</span>
          <ChevronDown
            size={22}
            className="animate-bounce opacity-80 group-hover:opacity-100"
          />
        </button>
      </div>
    </section>
  );
};
