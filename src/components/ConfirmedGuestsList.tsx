import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, Heart } from "lucide-react";
import { makeAuthClient } from "@/lib/api-client";

interface Rsvp {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface ConfirmedGuestsListProps {
  token: string;
}

export const ConfirmedGuestsList = ({ token }: ConfirmedGuestsListProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const { data: rsvps = [], isLoading, isError } = useQuery({
    queryKey: ["rsvps"],
    queryFn: () =>
      makeAuthClient(token)
        .get<{ data: Rsvp[] }>("/rsvps")
        .then((res) => res.data),
  });

  return (
    <section
      className="py-16 md:py-20 overflow-hidden"
      style={{ background: "var(--gradient-section)" }}
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center gap-2 bg-[hsl(var(--rosé-light))] text-[hsl(var(--rosé))] px-4 py-1.5 rounded-full text-xs font-body tracking-widest uppercase">
                <Users size={13} />
                Área dos Noivos
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal font-light mb-2">
              Confirmações{" "}
              <span className="italic text-[hsl(var(--rosé))]">de Presença</span>
            </h2>
            {!isLoading && !isError && (
              <p className="font-body text-sm text-muted-foreground">
                {rsvps.length}{" "}
                {rsvps.length === 1 ? "convidado confirmado" : "convidados confirmados"}
              </p>
            )}
          </div>

          <div className="bg-card rounded-3xl shadow-card overflow-hidden">
            {isLoading ? (
              <div className="p-8 flex flex-col gap-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-muted rounded-xl animate-pulse" />
                ))}
              </div>
            ) : isError ? (
              <div className="p-8 text-center">
                <p className="font-body text-sm text-muted-foreground">
                  Não foi possível carregar a lista.
                </p>
              </div>
            ) : rsvps.length === 0 ? (
              <div className="p-10 text-center">
                <Heart
                  size={32}
                  className="mx-auto text-[hsl(var(--rosé))] fill-current mb-3 opacity-40"
                />
                <p className="font-body text-sm text-muted-foreground">
                  Nenhuma confirmação ainda.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {rsvps.map((rsvp, i) => (
                  <div
                    key={rsvp.id}
                    className="flex items-center gap-4 px-6 py-4"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(12px)",
                      transition: `opacity 0.4s ease ${i * 40 + 200}ms, transform 0.4s ease ${i * 40 + 200}ms`,
                    }}
                  >
                    <div className="w-9 h-9 rounded-full bg-[hsl(var(--rosé-light))] flex items-center justify-center flex-shrink-0">
                      <span className="font-body text-sm text-[hsl(var(--rosé))] font-medium">
                        {rsvp.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-body text-sm text-charcoal font-medium truncate">
                        {rsvp.name}
                      </p>
                      <p className="font-body text-xs text-muted-foreground truncate">
                        {rsvp.email}
                      </p>
                    </div>
                    <p className="font-body text-xs text-muted-foreground flex-shrink-0 hidden sm:block">
                      {rsvp.phone}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
