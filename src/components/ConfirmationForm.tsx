import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import confirmationBg from "@/assets/f&a_confirmation.jpg";

export const ConfirmationForm = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_URL_API}/rsvps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erro ao confirmar presença.");
      setSubmitted(true);
    } catch {
      setError("Não foi possível confirmar sua presença. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="rsvp-section"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: `url(${confirmationBg})`, backgroundPosition: "center 75%" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative container mx-auto px-4 max-w-lg">
        <div
          className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-body tracking-widest uppercase">
              <Heart size={13} className="fill-current" />
              Confirmação de Presença
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white font-light mb-4">
            Confirme sua{" "}
            <span className="italic text-[hsl(var(--rosé-light))]">Presença</span>
          </h2>
          <p className="font-body text-white/75 max-w-sm mx-auto leading-relaxed">
            Preencha o formulário abaixo para confirmar que estará conosco neste dia tão especial.
          </p>
        </div>

        <div
          className={`bg-card/95 backdrop-blur-md rounded-3xl shadow-hover p-8 md:p-10 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {submitted ? (
            <div className="text-center py-6">
              <Heart size={48} className="mx-auto text-[hsl(var(--rosé))] fill-current mb-4" />
              <h3 className="font-display text-2xl text-charcoal mb-2">Presença confirmada!</h3>
              <p className="font-body text-muted-foreground">
                Obrigado, <strong>{form.name}</strong>! Mal podemos esperar para celebrar com você.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="nome" className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                  Nome completo
                </label>
                <input
                  id="nome"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm text-charcoal placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--rosé))] transition-shadow duration-200"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm text-charcoal placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--rosé))] transition-shadow duration-200"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="telefone" className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                  Telefone
                </label>
                <input
                  id="telefone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm text-charcoal placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--rosé))] transition-shadow duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full py-3.5 bg-[hsl(var(--rosé))] text-white font-body text-xs tracking-widest uppercase rounded-full hover:bg-[hsl(182,20%,48%)] active:scale-95 transition-all duration-200 shadow-soft disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Confirmando..." : "Confirmar Presença"}
              </button>
              {error && (
                <p className="font-body text-xs text-red-500 text-center">{error}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
