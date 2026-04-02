# F&A Wedding — Padrões do Projeto

## Stack Técnica

- **Framework:** React + TypeScript + Vite
- **Estilização:** Tailwind CSS v3 com variáveis CSS customizadas
- **Componentes base:** shadcn/ui (`src/components/ui/`)
- **Ícones:** lucide-react
- **Fontes:** Google Fonts — `Cormorant Garamond` (display/títulos) e `Jost` (corpo)
- **Package manager:** Bun

## Paleta de Cores (CSS Variables)

Definidas em `src/index.css` sob `:root`:

| Token               | Uso                                      |
|---------------------|------------------------------------------|
| `--rosé`            | Cor principal de destaque (dusty blue/rosé) |
| `--rosé-light`      | Fundo suave de badges e ícones           |
| `--sage`            | Cor secundária verde-salvia              |
| `--sage-light`      | Fundo suave sage                         |
| `--peach`           | Cor terciária pêssego                    |
| `--lavender`        | Lilás para acentos                       |
| `--cream`           | Fundo creme claro                        |
| `--gold`            | Dourado para detalhes                    |
| `--charcoal`        | Texto principal escuro                   |
| `--background`      | Fundo geral (creme quente)               |
| `--gradient-section`| Gradiente de fundo das seções de conteúdo |
| `--gradient-hero`   | Overlay escuro para seção hero           |
| `--gradient-footer` | Overlay escuro para footer               |

## Tipografia

- **`font-display`** (`font-family: Cormorant Garamond`): Títulos (`h1`, `h2`, `h3`, `h4`), nomes do casal, elementos românticos
  - Pesos usados: light (300), regular (400), medium (500), italic
- **`font-body`** (`font-family: Jost`): Parágrafos, labels, botões, textos de apoio
  - Pesos usados: light (300), regular (400), medium (500)

## Padrões de Componentes de Seção

Cada seção segue este padrão geral:

```tsx
<section id="[nome]-section" ref={sectionRef} className="py-20 md:py-28 ...">
  <div className="container mx-auto px-4 max-w-5xl">
    {/* Header com animação de scroll */}
    <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <Heart size={20} className="mx-auto mb-4 text-[hsl(var(--rosé))] fill-[hsl(var(--rosé))]" />
      <h2 className="font-display text-4xl md:text-5xl text-charcoal font-light mb-4">
        Texto normal <span className="italic text-[hsl(var(--rosé))]">em destaque</span>
      </h2>
      {/* Divider com logo */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-px w-14 bg-border" />
        <img src={faLogo} ... />
        <div className="h-px w-14 bg-border" />
      </div>
      <p className="font-body text-muted-foreground max-w-lg mx-auto leading-relaxed">...</p>
    </div>
    {/* Conteúdo */}
  </div>
</section>
```

## Animações

### Hero (carregamento imediato)
Classes definidas em `src/index.css`:
- `.animate-fade-up` — fade + slide up, sem delay
- `.animate-fade-up-delay-1` — delay 150ms
- `.animate-fade-up-delay-2` — delay 300ms
- `.animate-fade-up-delay-3` — delay 450ms
- `.animate-fade-up-delay-4` — delay 600ms

### Scroll Reveal (IntersectionObserver)
Padrão usado em `WeddingInfo` e `GiftCarousel`:

```tsx
const [visible, setVisible] = useState(false);
useEffect(() => {
  const obs = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) setVisible(true); },
    { threshold: 0.15 }
  );
  if (sectionRef.current) obs.observe(sectionRef.current);
  return () => obs.disconnect();
}, []);
```

Aplicado inline nos elementos:
```tsx
style={{
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(30px)",
  transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms`,
}}
```

## Cards de Informação

Estilo padrão dos cards (ex: Data, Horário, Local):
- Background: `bg-card` (branco)
- Border-radius: `rounded-2xl`
- Padding: `p-6`
- Sombra: `shadow-[0_4px_14px_-4px_rgba(158,190,191,0.22),...]`
- Hover: `hover:shadow-[...] hover:-translate-y-1 transition-all duration-500`
- Border: `border border-border/50`

Layout interno do card:
- Ícone em container `w-11 h-11 rounded-xl` com background colorido
- Label em `font-body text-xs tracking-widest uppercase text-muted-foreground`
- Valor principal em `font-display text-xl text-charcoal font-medium`
- Subtítulo em `font-body text-sm text-muted-foreground`

## Botões

### Primário (outline rosé)
```tsx
className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-[hsl(var(--rosé))] text-[hsl(var(--rosé))] font-body text-sm tracking-widest uppercase hover:bg-[hsl(var(--rosé))] hover:text-white transition-all duration-300"
```

### Pequeno (filled rosé)
```tsx
className="px-4 py-2 bg-[hsl(var(--rosé))] text-[hsl(var(--primary-foreground))] text-xs font-body tracking-wider uppercase rounded-full hover:bg-[hsl(182,20%,58%)] transition-colors duration-200"
```

## Sombras (Custom Tokens)

```css
--shadow-soft:  0 4px  24px  -4px  rgba(158, 190, 191, 0.15);
--shadow-card:  0 8px  32px  -8px  rgba(158, 190, 191, 0.20);
--shadow-hover: 0 16px 48px  -12px rgba(158, 190, 191, 0.30);
```

Usadas via Tailwind: `shadow-soft`, `shadow-card`, `shadow-hover`.

## Estrutura de Seções

Ordem das seções na página (`src/pages/Index.tsx`):
1. `WeddingNav` — barra de navegação fixa
2. `HeroSection` — hero com foto, nomes e countdown (`#hero-section` implícito)
3. `WeddingInfo` — informações do casamento (`#info-section`)
4. `GiftCarousel` — lista de presentes (`#gifts-section`)
5. `WeddingFooter` — footer com foto e versículo (`#footer-section`)

## Assets

Todos os assets ficam em `src/assets/`:
- `f&a_logo_semfundo.PNG` — logo do casal (sem fundo), usada com `brightness-0 invert` no hero
- `foto5_f&a.jpg` — foto hero
- `f&a_footer.jpg` — foto do footer
- `f&a_wedding_place.png` — foto do local do casamento
- `gift-*.jpg` — fotos dos presentes

## Navbar

`WeddingNav` com links: Data, Presentes, Local.
Links usam `NavLink` customizado com smooth scroll para as seções por ID.

## Responsividade

- Mobile-first
- Breakpoint principal: `md:` (768px)
- Padrão de texto: `text-4xl md:text-5xl` nos títulos de seção
- Container: `max-w-5xl` na maioria das seções, `container mx-auto px-4`
