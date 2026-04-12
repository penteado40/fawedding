import { useRef, useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Heart } from "lucide-react";
import faLogo from "@/assets/f&a_logo_semfundo.PNG";
import weddingPlace from "@/assets/f&a_wedding_place.png";

const MAPS_URL = "https://maps.app.goo.gl/FKq68fjEvyphQqEv6?g_st=ic";

const details = [
  {
    icon: Calendar,
    label: "Data",
    value: "28 de Maio de 2026",
    sub: "Quinta-feira",
    color: "var(--rosé)",
    bg: "var(--rosé-light)",
  },
  {
    icon: Clock,
    label: "Horário",
    value: "09h30",
    sub: "Início da cerimônia",
    color: "var(--sage)",
    bg: "var(--sage-light)",
  },
  {
    icon: MapPin,
    label: "Local",
    value: "Casa Vilella — Itatiba",
    sub: "Itatiba, São Paulo",
    color: "var(--peach)",
    bg: "40 60% 93%",
    href: MAPS_URL,
  },
];

export const WeddingInfo = () => {
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
      id="info-section"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background photo */}
      <img
        src={weddingPlace}
        alt="Local do casamento — Casa Vilella"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center top" }}
      />
      {/* Gradient overlay — top to bottom */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(180,210,200,0.75) 100%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 max-w-5xl">
        <div className="flex justify-end">
          <div className="w-full md:w-[44%]">

            {/* Header */}
            <div
              className={`text-center mb-5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <Heart
                size={20}
                className="mx-auto mb-4 drop-shadow-sm text-[hsl(var(--rosé-light))] fill-[hsl(var(--rosé-light))]"
              />
              <h2
                className="font-display text-4xl md:text-5xl text-charcoal font-light mb-4"
              >
                Informações do{" "}
                <span className="italic text-[hsl(var(--rosé))]">Casamento</span>
              </h2>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-14 bg-charcoal/30" />
                <img
                  src={faLogo}
                  alt=""
                  className="h-[5.5rem] md:h-24 w-auto max-w-[min(320px,80vw)] object-contain opacity-90 drop-shadow-sm"
                  aria-hidden
                />
                <div className="h-px w-14 bg-charcoal/30" />
              </div>
              <p
                className="font-body text-charcoal/80 leading-relaxed"
              >
                Sua presença é muito importante para nós. Será uma alegria
                compartilhar esse momento tão especial ao seu lado.
              </p>
            </div>

            {/* Cards stacked */}
            <div className="flex flex-col gap-4 mb-8">
              {details.map((item, i) => {
                const Icon = item.icon;
                const cardClass =
                  "bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-0.5 border border-white/60 block text-inherit no-underline";
                const cardStyle = {
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms, box-shadow 0.3s ease, translate 0.3s ease`,
                };
                const inner = (
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: `hsl(${item.bg})` }}
                    >
                      <Icon
                        size={20}
                        style={{ color: `hsl(${item.color})` }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-display text-xl text-charcoal font-medium leading-tight">
                        {item.value}
                      </p>
                      <p className="font-body text-sm text-muted-foreground mt-0.5">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                );
                if ("href" in item && item.href) {
                  return (
                    <a
                      key={i}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${cardClass} cursor-pointer`}
                      style={cardStyle}
                    >
                      {inner}
                    </a>
                  );
                }
                return (
                  <div key={i} className={cardClass} style={cardStyle}>
                    {inner}
                  </div>
                );
              })}
            </div>

            {/* Map button */}
            <div
              className={`text-center transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white font-body text-sm tracking-widest uppercase hover:bg-white hover:text-[hsl(var(--rosé))] transition-all duration-300 shadow-soft hover:shadow-card"
              >
                <MapPin size={15} />
                Ver no Mapa
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
