import { useRef, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Gift } from "lucide-react";

interface GiftItem {
  id: string;
  name: string;
  image: string | null;
  amazonLink: string | null;
  price: number;
}

const fetchGifts = async (): Promise<GiftItem[]> => {
  const res = await fetch(`${import.meta.env.VITE_URL_API}/gifts`);
  if (!res.ok) throw new Error("Erro ao buscar presentes");
  const json = await res.json();
  return json.data;
};
export const GiftCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [visible, setVisible] = useState(false);

  const { data: gifts = [], isLoading, isError } = useQuery({
    queryKey: ["gifts"],
    queryFn: fetchGifts,
  });

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
  }, [gifts]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <section
      id="gifts-section"
      ref={sectionRef}
      className="py-20 md:py-28 overflow-hidden"
      style={{ background: "var(--gradient-section)" }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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
          <p className="font-body text-muted-foreground max-w-md mx-auto leading-relaxed">
            Se deseja nos presentear, escolha um dos itens abaixo. Cada gesto
            de carinho tornará esse dia ainda mais especial.
          </p>
        </div>

        {/* Carousel container */}
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
            {isError && (
              <p className="font-body text-sm text-muted-foreground px-2">
                Não foi possível carregar a lista de presentes.
              </p>
            )}
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : gifts.map((gift, i) => (
                  <GiftCard key={i} gift={gift} index={i} visible={visible} />
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

const SkeletonCard = () => (
  <div className="w-64 md:w-72 bg-card rounded-2xl overflow-hidden shadow-card flex flex-col animate-pulse">
    <div className="h-48 bg-muted" />
    <div className="p-5 flex flex-col gap-3">
      <div className="h-5 bg-muted rounded w-3/4" />
      <div className="h-8 bg-muted rounded w-full" />
      <div className="flex items-center justify-between mt-2">
        <div className="h-5 bg-muted rounded w-1/3" />
        <div className="h-8 bg-muted rounded-full w-24" />
      </div>
    </div>
  </div>
);

const GiftCard = ({
  gift,
  index,
  visible,
}: {
  gift: GiftItem;
  index: number;
  visible: boolean;
}) => {
  return (
    <div
      className="group w-64 md:w-72 bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-500 hover:-translate-y-1 flex flex-col"
      style={{
        transitionDelay: `${index * 60}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 70}ms, transform 0.6s ease ${index * 70}ms, box-shadow 0.3s ease, translate 0.3s ease`,
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        {gift.image && (
          <img
            src={gift.image}
            alt={gift.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-xl text-charcoal font-medium mb-4">
          {gift.name}
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-display text-lg font-semibold text-[hsl(var(--rosé))]">
            {gift.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </span>
          {gift.amazonLink && (
            <a
              href={gift.amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[hsl(var(--rosé))] text-[hsl(var(--primary-foreground))] text-xs font-body tracking-wider uppercase rounded-full hover:bg-[hsl(182,20%,58%)] transition-colors duration-200 shadow-soft"
            >
              Presentear
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
