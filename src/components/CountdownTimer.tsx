import { useEffect, useState } from "react";

type CountdownTimerProps = {
  targetDate: string;
  /** `hero`: texto claro e caixas em vidro para fundo escuro */
  variant?: "default" | "hero";
};

export const CountdownTimer = ({ targetDate, variant = "default" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const target = new Date(targetDate);
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  const units = [
    { label: "Dias", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  const isHero = variant === "hero";

  return (
    <div className={isHero ? "mb-3" : "mt-4"}>
      <p
        className={
          isHero
            ? "font-body text-xs text-white/65 tracking-widest uppercase mb-4"
            : "font-body text-xs text-muted-foreground tracking-widest uppercase mb-5"
        }
      >
        Contagem regressiva
      </p>
      <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap">
        {units.map((u, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className={
                isHero
                  ? "w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border border-white/25 bg-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.35)] backdrop-blur-sm"
                  : "w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-card flex items-center justify-center shadow-soft border border-[hsl(var(--rosé-light))]"
              }
            >
              <span
                className={
                  isHero
                    ? "font-display text-2xl md:text-3xl font-light text-white"
                    : "font-display text-3xl md:text-4xl font-light text-[hsl(var(--rosé))]"
                }
              >
                {String(u.value).padStart(2, "0")}
              </span>
            </div>
            <span
              className={
                isHero
                  ? "font-body text-[10px] md:text-xs text-white/70 mt-2 tracking-widest uppercase"
                  : "font-body text-xs text-muted-foreground mt-2 tracking-widest uppercase"
              }
            >
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
