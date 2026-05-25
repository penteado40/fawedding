import { useEffect, useRef, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import logo from "@/assets/f&a_logo_semfundo.PNG";
import { apiClient } from "@/lib/api-client";

interface LoginSectionProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (token: string) => void;
}

interface LoginResponse {
  data: {
    token: string;
    user: { id: number; name: string; email: string };
  };
}

export const LoginSection = ({ open, onClose, onSuccess }: LoginSectionProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setError(null);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.post<LoginResponse>("/auth/login", { email, password });
      onSuccess(res.data.token);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("401") || msg.includes("403")) {
        setError("E-mail ou senha incorretos.");
      } else {
        setError("Não foi possível fazer login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
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
          <div className="w-14 h-14 rounded-full bg-[hsl(var(--rosé))] flex items-center justify-center overflow-hidden">
            <img src={logo} alt="F&A" className="w-10 h-10 object-contain" />
          </div>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <div className="relative">
              <input
                id="login-senha"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 font-body text-sm text-charcoal placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--rosé))] transition-shadow duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-charcoal transition-colors duration-200"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="font-body text-xs text-red-500 text-center -mt-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3.5 bg-[hsl(var(--rosé))] text-white font-body text-xs tracking-widest uppercase rounded-full hover:bg-[hsl(182,20%,58%)] active:scale-95 transition-all duration-200 shadow-soft disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};
