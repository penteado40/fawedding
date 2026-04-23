import { useEffect, useRef, useState } from "react";
import { ExternalLink, Gift } from "lucide-react";

const GIFT_LIST_URL = import.meta.env.VITE_URL_GIFTS ?? "#";

export const GiftCarousel = () => {
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
      id="gifts-section"
      ref={sectionRef}
      className="py-20 md:py-28 overflow-hidden"
      style={{ background: "var(--gradient-section)" }}
    >
      <div className="container mx-auto px-4">
        <div
          className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 bg-rose-light text-[hsl(var(--rosé))] px-4 py-1.5 rounded-full text-xs font-body tracking-widest uppercase">
              <Gift size={13} />
              Lista de Presentes
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-light mb-4">
            Sugestões de{" "}
            <span className="italic text-[hsl(var(--rosé))]">Presentes</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto leading-relaxed mb-10">
            Se deseja nos presentear, acesse nossa lista e escolha um item.
            Cada gesto de carinho tornará esse dia ainda mais especial.
          </p>
          <a
            href={GIFT_LIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[hsl(var(--rosé))] text-white font-body text-sm tracking-wide px-8 py-3.5 rounded-full shadow-card hover:shadow-hover hover:brightness-105 transition-all duration-200"
          >
            <Gift size={16} />
            Ver Lista de Presentes
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};