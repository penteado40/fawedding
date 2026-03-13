import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Gift } from "lucide-react";
import giftDinner from "@/assets/gift-dinner.jpg";
import giftHoneymoon from "@/assets/gift-honeymoon.jpg";
import giftBedding from "@/assets/gift-bedding.jpg";
import giftDinnerware from "@/assets/gift-dinnerware.jpg";
import giftMixer from "@/assets/gift-mixer.jpg";
import giftSpa from "@/assets/gift-spa.jpg";
import giftWine from "@/assets/gift-wine.jpg";

const gifts = [
  {
    image: giftDinner,
    name: "Jantar Romântico",
    description: "Uma noite inesquecível a dois em restaurante especial, com menu degustação completo.",
    price: "R$ 450,00",
  },
  {
    image: giftHoneymoon,
    name: "Lua de Mel",
    description: "Contribua para a viagem dos nossos sonhos e ajude a tornar essa memória ainda mais especial.",
    price: "R$ 500,00",
  },
  {
    image: giftBedding,
    name: "Jogo de Cama Premium",
    description: "Roupa de cama de linho egípcio para tornar cada manhã mais aconchegante e sofisticada.",
    price: "R$ 380,00",
  },
  {
    image: giftDinnerware,
    name: "Aparelho de Jantar",
    description: "Conjunto de porcelana fina com detalhes florais para os momentos especiais a dois.",
    price: "R$ 520,00",
  },
  {
    image: giftMixer,
    name: "Batedeira Artisan",
    description: "A famosa batedeira Rose Gold para transformar a cozinha em um ateliê de sabores.",
    price: "R$ 890,00",
  },
  {
    image: giftSpa,
    name: "Dia de Spa",
    description: "Presenteie com uma experiência de bem-estar e relaxamento total para o casal.",
    price: "R$ 320,00",
  },
  {
    image: giftWine,
    name: "Kit de Vinhos",
    description: "Seleção especial de vinhos finos e taças de cristal para os momentos de celebração.",
    price: "R$ 290,00",
  },
];

export const GiftCarousel = () => {
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
            de carinho tornará esse dia ainda mais especial. 💕
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
          <div
            ref={trackRef}
            className="carousel-track px-4 md:px-8"
          >
            {gifts.map((gift, i) => (
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

const GiftCard = ({
  gift,
  index,
  visible,
}: {
  gift: (typeof gifts)[0];
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
        <img
          src={gift.image}
          alt={gift.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-xl text-charcoal font-medium mb-1">
          {gift.name}
        </h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
          {gift.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-display text-lg font-semibold text-[hsl(var(--rosé))]">
            {gift.price}
          </span>
          <button className="px-4 py-2 bg-[hsl(var(--rosé))] text-[hsl(var(--primary-foreground))] text-xs font-body tracking-wider uppercase rounded-full hover:bg-[hsl(340,50%,58%)] transition-colors duration-200 shadow-soft">
            Presentear
          </button>
        </div>
      </div>
    </div>
  );
};
