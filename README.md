# F&A Wedding

Site do casamento F&A — página única com informações do evento, lista de presentes e confirmação de presença (RSVP).

## Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | React + TypeScript + Vite |
| Estilização | Tailwind CSS v3 + variáveis CSS customizadas |
| Componentes base | shadcn/ui |
| Ícones | lucide-react |
| Fontes | Google Fonts — Cormorant Garamond + Jost |
| Package manager | Bun |

---

## Instalação e setup local

### Pré-requisitos

- Node.js
- Bun

### 1. Clone o repositório

```bash
git clone https://github.com/penteado40/fa-wedding.git
cd fa-wedding
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações (veja a seção [Variáveis de ambiente](#variáveis-de-ambiente)).

### 3. Instale as dependências

```bash
bun install
```

### 4. Inicie o servidor de desenvolvimento

```bash
bun dev
```

O site estará disponível em `http://localhost:5173`.

---

## Variáveis de ambiente

Definidas em `.env` (gitignored) e documentadas em `.env.example`.

| Variável | Descrição |
|----------|-----------|
| `VITE_URL_API` | Base URL da API (ex: `http://localhost:3000/api`) |
| `VITE_API_TOKEN` | Bearer token estático para autenticação |
| `VITE_URL_GIFTS` | URL externa da lista de presentes (Lejour) |

O token é estático por ambiente — não há sistema de login ou sessão. Para trocar, atualize o `.env` localmente ou a variável no serviço de deploy.

Ao adicionar uma nova variável `VITE_*`, declare-a também em `src/vite-env.d.ts` sob `ImportMetaEnv`.

---

## Estrutura do projeto

```
src/
├── assets/                     # Imagens e logo do casal
│   ├── f&a_logo_semfundo.PNG
│   ├── foto5_f&a.jpg           # Foto do hero
│   ├── f&a_footer.jpg          # Foto do footer
│   ├── f&a_wedding_place.png   # Foto do local
│   └── gift-*.jpg              # Fotos dos presentes
├── components/
│   ├── ui/                     # Componentes base (shadcn/ui)
│   ├── WeddingNav.tsx           # Barra de navegação fixa
│   ├── HeroSection.tsx          # Hero com foto, nomes e countdown
│   ├── WeddingInfo.tsx          # Informações do evento
│   ├── GiftCarousel.tsx         # Lista de presentes
│   ├── ConfirmationForm.tsx     # Formulário de RSVP
│   └── WeddingFooter.tsx        # Footer com foto e versículo
├── lib/
│   └── api-client.ts            # Cliente HTTP centralizado
├── pages/
│   └── Index.tsx                # Página principal — composição das seções
├── index.css                    # Variáveis CSS, fontes e animações globais
└── vite-env.d.ts               # Tipagem das variáveis de ambiente
```

### Ordem das seções na página

1. `WeddingNav` — navegação fixa com links para `#info-section`, `#gifts-section`
2. `HeroSection` — foto, nomes do casal e countdown
3. `WeddingInfo` — data, horário e local (`#info-section`)
4. `GiftCarousel` — lista de presentes (`#gifts-section`)
5. `WeddingFooter` — foto e versículo

### Comunicação com a API

Toda comunicação com o backend passa pelo cliente centralizado — nunca use `fetch` diretamente em componentes.

```ts
import { apiClient } from "@/lib/api-client"

apiClient.get<T>(path)
apiClient.post<T>(path, body)
apiClient.put<T>(path, body)
apiClient.delete<T>(path)
```

O cliente injeta automaticamente `Authorization: Bearer <token>` e `Content-Type: application/json` em todas as requisições.

Uso atual: `ConfirmationForm.tsx` usa `apiClient.post('/rsvps', form)` para submeter confirmações de presença. `GiftCarousel.tsx` usa `VITE_URL_GIFTS` diretamente (link externo, sem `apiClient`).

---

## Design system

### Paleta de cores

Definida em `src/index.css` sob `:root` como variáveis CSS HSL.

| Token | Uso |
|-------|-----|
| `--rosé` | Cor principal de destaque |
| `--rosé-light` | Fundo suave de badges e ícones |
| `--sage` | Cor secundária verde-sálvia |
| `--sage-light` | Fundo suave sage |
| `--peach` | Cor terciária pêssego |
| `--lavender` | Lilás para acentos |
| `--cream` | Fundo creme claro |
| `--gold` | Dourado para detalhes |
| `--charcoal` | Texto principal escuro |
| `--background` | Fundo geral (creme quente) |
| `--gradient-section` | Gradiente de fundo das seções |
| `--gradient-hero` | Overlay escuro do hero |
| `--gradient-footer` | Overlay escuro do footer |

Uso no Tailwind: `text-[hsl(var(--rosé))]`, `bg-[hsl(var(--cream))]`, etc.

### Tipografia

| Classe | Fonte | Uso |
|--------|-------|-----|
| `font-display` | Cormorant Garamond | Títulos, nomes do casal, elementos românticos |
| `font-body` | Jost | Parágrafos, labels, botões, textos de apoio |

Pesos disponíveis: 300 (light), 400 (regular), 500 (medium) + italic para `font-display`.

### Sombras customizadas

```css
--shadow-soft:  0 4px  24px  -4px  rgba(158, 190, 191, 0.15);
--shadow-card:  0 8px  32px  -8px  rgba(158, 190, 191, 0.20);
--shadow-hover: 0 16px 48px  -12px rgba(158, 190, 191, 0.30);
```

Usadas via Tailwind: `shadow-soft`, `shadow-card`, `shadow-hover`.

### Animações

**Hero (carregamento imediato)** — classes definidas em `index.css`:

| Classe | Delay |
|--------|-------|
| `.animate-fade-up` | sem delay |
| `.animate-fade-up-delay-1` | 150ms |
| `.animate-fade-up-delay-2` | 300ms |
| `.animate-fade-up-delay-3` | 450ms |
| `.animate-fade-up-delay-4` | 600ms |

**Scroll reveal** — padrão com `IntersectionObserver` usado nas seções:

```tsx
const [visible, setVisible] = useState(false);
const sectionRef = useRef(null);

useEffect(() => {
  const obs = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) setVisible(true); },
    { threshold: 0.15 }
  );
  if (sectionRef.current) obs.observe(sectionRef.current);
  return () => obs.disconnect();
}, []);
```

Aplicado inline com delay escalonado por item:
```tsx
style={{
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(30px)",
  transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms`,
}}
```

### Cards de informação

Estilo padrão aplicado nos cards de Data, Horário e Local:

- Background `bg-card`, border-radius `rounded-2xl`, padding `p-6`
- Sombra `shadow-card`, hover `hover:shadow-hover hover:-translate-y-1 transition-all duration-500`
- Border `border border-border/50`
- Ícone em container `w-11 h-11 rounded-xl` com background colorido
- Label em `font-body text-xs tracking-widest uppercase text-muted-foreground`
- Valor principal em `font-display text-xl text-charcoal font-medium`

### Botões

**Primário (outline rosé):**
```tsx
className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-[hsl(var(--rosé))] text-[hsl(var(--rosé))] font-body text-sm tracking-widest uppercase hover:bg-[hsl(var(--rosé))] hover:text-white transition-all duration-300"
```

**Pequeno (filled rosé):**
```tsx
className="px-4 py-2 bg-[hsl(var(--rosé))] text-[hsl(var(--primary-foreground))] text-xs font-body tracking-wider uppercase rounded-full hover:bg-[hsl(182,20%,58%)] transition-colors duration-200"
```

### Responsividade

- Mobile-first
- Breakpoint principal: `md:` (768px)
- Títulos de seção: `text-4xl md:text-5xl`
- Container: `max-w-5xl mx-auto px-4` na maioria das seções

---

## Licença

Projeto pessoal. Todos os direitos reservados.