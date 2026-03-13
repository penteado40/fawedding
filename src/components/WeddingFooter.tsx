import footerCoupleImg from "@/assets/footer-couple.jpg";
import { Heart, Phone, Instagram, MessageCircle } from "lucide-react";

export const WeddingFooter = () => {
  return (
    <footer id="footer-section" className="relative overflow-hidden">
      {/* Photo with gradient overlay */}
      <div className="relative h-[520px] md:h-[600px]">
        <img
          src={footerCoupleImg}
          alt="Isabella & Rafael"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        {/* Content over photo */}
        <div className="relative z-10 h-full flex flex-col items-center justify-end pb-14 px-6 text-center">
          {/* Divider with hearts */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[hsl(var(--rosé-light))]/60" />
            <Heart
              size={16}
              className="text-[hsl(var(--rosé-light))] fill-[hsl(var(--rosé-light))]"
            />
            <div className="h-px w-12 bg-[hsl(var(--rosé-light))]/60" />
          </div>

          {/* Names */}
          <h2 className="font-display font-light text-4xl md:text-6xl text-white mb-2">
            Isabella{" "}
            <span className="italic text-[hsl(var(--rosé-light))]">&amp;</span>{" "}
            Rafael
          </h2>

          {/* Date */}
          <p className="font-body text-white/70 tracking-[0.3em] text-xs uppercase mb-8">
            14 · 02 · 2026
          </p>

          {/* Final message */}
          <p className="font-display italic text-white/85 text-xl md:text-2xl max-w-xl mb-10 leading-relaxed">
            "Com amor, esperamos você nesse grande dia."
          </p>

          {/* Contact & socials */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-body hover:bg-white/20 transition-all duration-200"
            >
              <MessageCircle size={15} />
              (11) 99999-9999
            </a>
            <a
              href="tel:+5511999999999"
              aria-label="Telefone"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-body hover:bg-white/20 transition-all duration-200"
            >
              <Phone size={15} />
              Ligar
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-body hover:bg-white/20 transition-all duration-200"
            >
              <Instagram size={15} />
              @isabellaerafael
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[hsl(20,15%,12%)] text-[hsl(0,0%,55%)] py-5 px-6 text-center">
        <p className="font-body text-xs tracking-widest">
          Feito com{" "}
          <Heart size={10} className="inline text-[hsl(var(--rosé))] fill-[hsl(var(--rosé))]" />{" "}
          para o dia mais especial das nossas vidas
        </p>
      </div>
    </footer>
  );
};
