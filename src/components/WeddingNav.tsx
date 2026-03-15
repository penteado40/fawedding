import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const links = [
  { label: "Início", href: "#" },
  { label: "Presentes", href: "#gifts-section" },
  { label: "Informações", href: "#info-section" },
  { label: "Contato", href: "#footer-section" },
];

export const WeddingNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-soft border-b border-border/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("#")}
          className={`font-display italic text-xl transition-colors duration-300 flex items-center gap-2 ${
            scrolled ? "text-charcoal" : "text-white"
          }`}
        >
          <Heart
            size={14}
            className={`fill-current transition-colors duration-300 ${
              scrolled ? "text-[hsl(var(--rosé))]" : "text-[hsl(var(--rosé-light))]"
            }`}
          />
          Felipe &amp; Amanda
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className={`font-body text-xs tracking-widest uppercase transition-colors duration-300 hover:text-[hsl(var(--rosé))] ${
                scrolled ? "text-muted-foreground" : "text-white/80"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden flex flex-col gap-1 p-2 ${
            scrolled ? "text-charcoal" : "text-white"
          }`}
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-56 opacity-100" : "max-h-0 opacity-0"
        } bg-card/98 backdrop-blur-md border-t border-border/50`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-left font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-[hsl(var(--rosé))] transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
