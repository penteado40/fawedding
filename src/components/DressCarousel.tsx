import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import foto1 from "@/assets/f&a_traje_exemplo/foto1.png";
import foto3 from "@/assets/f&a_traje_exemplo/foto3.png";
import foto4 from "@/assets/f&a_traje_exemplo/foto4.png";
import foto5 from "@/assets/f&a_traje_exemplo/foto5.png";
import foto6 from "@/assets/f&a_traje_exemplo/foto6.png";
import foto7 from "@/assets/f&a_traje_exemplo/foto7.png";
import foto9 from "@/assets/f&a_traje_exemplo/foto9.png";
import foto10 from "@/assets/f&a_traje_exemplo/foto10.png";
import foto11 from "@/assets/f&a_traje_exemplo/foto11.png";
import foto12 from "@/assets/f&a_traje_exemplo/foto12.png";

const photos = [foto1, foto3, foto4, foto5, foto6, foto7, foto9, foto10, foto11, foto12];

const cores = [
  "#E07B39", "#7BAE5A", "#E8C84A", "#5B9BD5",
  "#3D6FAB", "#9B72C0", "#D94F8A", "#E8A0B4",
];

/* ── Watercolor dot ───────────────────────────────────────────── */
const WatercolorDot = ({
  color,
  seed,
}: {
  color: string;
  seed: number;
}) => (
  <svg viewBox="0 0 48 48" width={64} height={64} style={{ overflow: "visible" }}>
    <defs>
      <filter id={`wc-${seed}`}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.04"
          numOctaves="4"
          seed={seed}
        />
        <feDisplacementMap
          in="SourceGraphic"
          scale="6"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
    <circle
      cx="24"
      cy="24"
      r="19"
      fill={color}
      opacity="0.75"
      filter={`url(#wc-${seed})`}
    />
    <circle
      cx="24"
      cy="24"
      r="13"
      fill={color}
      opacity="0.28"
      filter={`url(#wc-${seed})`}
    />
  </svg>
);

/* ── Component ────────────────────────────────────────────────── */
export const DressCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [visible, setVisible] = useState(false);

  const checkScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      checkScroll();
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
  };

  return (
    <section
      id="traje-section"
      ref={sectionRef}
      className="py-20 md:py-28 overflow-hidden"
      style={{ background: "var(--gradient-section)" }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Watercolor dots */}
          <div className="flex justify-center flex-wrap gap-2 mb-6">
            {cores.map((cor, i) => (
              <WatercolorDot key={cor} color={cor} seed={i + 1} />
            ))}
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-light mb-4">
            Traje
          </h2>

          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-14 bg-[hsl(var(--rosé))]/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--rosé))]/40" />
            <div className="h-px w-14 bg-[hsl(var(--rosé))]/30" />
          </div>

          <p className="font-body text-muted-foreground max-w-md mx-auto leading-relaxed">
            Para celebrar este momento especial, sugerimos o traje passeio
            completo&nbsp;/ social na paleta de cores do evento.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Anterior"
            className="absolute -left-3 md:left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-card flex items-center justify-center transition-all duration-200 hover:shadow-hover hover:scale-105 disabled:opacity-20 disabled:pointer-events-none"
          >
            <ChevronLeft size={18} className="text-[hsl(var(--rosé))]" />
          </button>

          {/* Track */}
          <div ref={trackRef} className="carousel-track px-4 md:px-8">
            {photos.map((src, i) => (
              <PhotoCard key={i} src={src} index={i} visible={visible} />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Próximo"
            className="absolute -right-3 md:right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-card flex items-center justify-center transition-all duration-200 hover:shadow-hover hover:scale-105 disabled:opacity-20 disabled:pointer-events-none"
          >
            <ChevronRight size={18} className="text-[hsl(var(--rosé))]" />
          </button>
        </div>

        {/* Scroll hint */}
        <p className="text-center text-xs text-muted-foreground mt-6 font-body tracking-wide">
          ← Deslize para ver mais →
        </p>
      </div>
    </section>
  );
};

/* ── Photo card (photo-only, no caption) ─────────────────────── */
const PhotoCard = ({
  src,
  index,
  visible,
}: {
  src: string;
  index: number;
  visible: boolean;
}) => (
  <div
    className="group w-40 md:w-52 rounded-2xl overflow-hidden shadow-card hover:shadow-hover"
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms, box-shadow 0.3s ease`,
    }}
  >
    <div className="relative overflow-hidden h-[500px]">
      <img
        src={src}
        alt={`Traje ${index + 1}`}
        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
    </div>
  </div>
);
