import { Heart } from "lucide-react";
import footerPhoto from "@/assets/f&a_footer.jpg";

export const WeddingFooter = () => {
  return (
    <footer id="footer-section" className="relative overflow-hidden">
      {/* Background photo */}
      <div className="relative h-[520px] md:h-[600px]">
        <img
          src={footerPhoto}
          alt="Felipe e Amanda"
          // className="absolute inset-0 w-full h-full object-cover object-center"
          className="absolute inset-0 w-full h-full object-cover object-[20%_45%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        {/* Content over photo */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center py-14 px-6 text-center">
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
            Felipe{" "}
            <span className="italic text-[hsl(var(--rosé-light))]">&amp;</span>{" "}
            Amanda
          </h2>

          {/* Date */}
          <p className="font-body text-white/70 tracking-[0.3em] text-xs uppercase mb-8">
            28 · 05 · 2026
          </p>

          {/* Final message */}
          <p className="font-display italic text-white/85 text-xl md:text-2xl max-w-xl mb-0 leading-relaxed">
            “Nem olhos viram, nem ouvidos ouviram o que Deus
            preparou para nós. Um futuro certo cheio de esperança e
            paz.” – Coríntios 2:9
          </p>
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
