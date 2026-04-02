import { useRef, useEffect, useState } from "react";
import traje from "@/assets/f&a_traje_2.png";

export const WeddingDress = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="traje-section"
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* Background photo — drives section height naturally */}
      <img
        src={traje}
        alt="Traje do casamento"
        className="w-full h-auto block max-h-[90vh] object-cover object-center"
      />

      <div className="absolute inset-0 z-12 flex flex-col justify-start py-32 md:py-48">
        <div className="container mx-auto px-4 max-w-2xl">
          <div
            className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="font-display text-4xl md:text-5xl font-light text-[hsl(var(--charcoal))]">
              Traje
            </h2>
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="h-px w-14 bg-[hsl(var(--charcoal))]/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--charcoal))]/30" />
              <div className="h-px w-14 bg-[hsl(var(--charcoal))]/30" />
            </div>
            <p className="font-body text-[hsl(var(--muted-foreground))] leading-relaxed">
              Para celebrar este momento especial, sugerimos o traje passeio completo/social
              na paleta de cores do evento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
