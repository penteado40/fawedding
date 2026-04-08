import { useEffect, useRef } from "react";
import { Heart, X } from "lucide-react";

interface LoginSectionProps {
  open: boolean;
  onClose: () => void;
}

export const LoginSection = ({ open, onClose }: LoginSectionProps) => {
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleKey);
      setTimeout(() => emailRef.current?.focus(), 300);
    }
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-opacity duration-500 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div
        className={`relative bg-card rounded-3xl shadow-hover p-10 w-full max-w-[480px] transition-all duration-500 ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-charcoal hover:bg-muted transition-colors duration-200"
          aria-label="Fechar"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 gap-3">
          <Heart
            size={28}
            className="text-[hsl(var(--rosé))] fill-current"
          />
          <h2 className="font-display text-4xl text-charcoal font-light leading-tight">
            Área dos Noivos
          </h2>
          <p className="font-display italic text-xl text-[hsl(var(--rosé))]">
            Felipe &amp; Amanda
          </p>
          <p className="font-body text-xs tracking-widest uppercase text-muted-foreground">
            Acesso restrito
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-email"
              className="font-body text-xs tracking-widest uppercase text-muted-foreground"
            >
              E-mail
            </label>
            <input
              id="login-email"
              ref={emailRef}
              type="email"
              required
              placeholder="seu@email.com"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm text-charcoal placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--rosé))] transition-shadow duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-senha"
              className="font-body text-xs tracking-widest uppercase text-muted-foreground"
            >
              Senha
            </label>
            <input
              id="login-senha"
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm text-charcoal placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--rosé))] transition-shadow duration-200"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-3.5 bg-[hsl(var(--rosé))] text-white font-body text-xs tracking-widest uppercase rounded-full hover:bg-[hsl(182,20%,58%)] active:scale-95 transition-all duration-200 shadow-soft"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};
