# F&A Wedding

> A real-world full-stack project — a wedding website with a serverless email confirmation pipeline built on AWS SQS, SES, and Lambda, orchestrated with CDK as infrastructure as code.

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Hono](https://img.shields.io/badge/Hono-E36002?style=flat&logo=hono&logoColor=white)
![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-FF9900?style=flat&logo=awslambda&logoColor=white)
![AWS SQS](https://img.shields.io/badge/AWS_SQS-FF9900?style=flat&logo=amazonsqs&logoColor=white)
![AWS CDK](https://img.shields.io/badge/AWS_CDK-232F3E?style=flat&logo=amazonaws&logoColor=white)
![Deployed](https://img.shields.io/badge/deployed-live-brightgreen)

**[fawedding.com.br](https://fawedding.com.br)** — live production site

---

## What this project is

F&A Wedding is the official website for a real wedding. Guests can view event details, browse the gift registry, and submit their RSVP — which triggers an automated email confirmation delivered through a fully serverless AWS pipeline.

Beyond its purpose as a wedding site, this project was built as a **full-stack portfolio piece** exploring:

- Serverless architecture with AWS Lambda, SQS, and SES managed via CDK
- A decoupled frontend/backend deployment (GitHub Pages + serverless API)
- Production design system with custom tokens, scroll animations, and full responsiveness

---

## Architecture

The project is split into two independently deployed layers:

```
┌─────────────────────────────────────────────────────────┐
│  Frontend — GitHub Pages                                │
│  React + TypeScript + Vite + Tailwind                   │
│                                                         │
│  ConfirmationForm  ──POST /rsvps──►  Hono API           │
└─────────────────────────────────────────────────────────┘
                                           │
                                    validates + saves
                                           │
                                           ▼
┌─────────────────────────────────────────────────────────┐
│  Backend — Serverless (AWS CDK)                         │
│                                                         │
│  Hono API  ──enqueue──►  SQS Queue                      │
│                               │                         │
│                         triggers Lambda                 │
│                               │                         │
│                         Lambda  ──send──►  SES          │
│                                               │         │
│                                        Confirmation     │
│                                        email to guest   │
└─────────────────────────────────────────────────────────┘
```

### RSVP confirmation flow

1. Guest fills out and submits the confirmation form on the frontend
2. `ConfirmationForm` calls `POST /rsvps` on the Hono API via the centralized `apiClient`
3. The API validates the payload with Zod, persists the RSVP, and enqueues a message to an **SQS queue**
4. SQS triggers a **Lambda function** asynchronously
5. Lambda composes a personalized confirmation email and delivers it via **SES**
6. Guest receives the confirmation — without the API ever waiting for the email to send

### Why SQS between the API and Lambda?

Decoupling the email delivery from the HTTP response was a deliberate choice. The API returns a `201` to the guest immediately. If SES is slow, throttled, or temporarily unavailable, the message stays in the queue and Lambda retries — the guest experience is never affected. This also makes it trivial to replace or extend the email step without touching the API.

### Infrastructure as Code with CDK

The entire AWS infrastructure (SQS queue, Lambda function, SES configuration, IAM roles) is defined and deployed with **AWS CDK in TypeScript** — same language as the rest of the stack, no context switching, fully version-controlled.

---

## Tech Stack

### Frontend

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS v3 + custom CSS variables |
| Components | shadcn/ui |
| Icons | lucide-react |
| Fonts | Cormorant Garamond (display) + Jost (body) |
| Package manager | Bun |
| Deploy | GitHub Pages |

### Backend & Infrastructure

| Layer | Technology |
|-------|------------|
| API | Hono + TypeScript |
| Validation | Zod |
| Queue | AWS SQS |
| Email delivery | AWS SES |
| Compute | AWS Lambda |
| Infrastructure | AWS CDK (TypeScript) |

---

## Key Technical Decisions

### GitHub Pages for the frontend
The frontend has zero server-side requirements — it's a static React SPA. GitHub Pages provides free, reliable global CDN delivery. Vite's build output drops directly into the `gh-pages` branch.

### Hono for the API
Same reasoning as the rest of the stack: first-class TypeScript, typed context, Zod middleware integration. Hono also runs natively on Lambda and Cloudflare Workers, keeping future deployment options open.

### SQS as a buffer between API and email delivery
Email delivery is inherently unreliable at the network level. Putting SQS between the API and Lambda means:
- The guest gets an immediate response regardless of SES availability
- Failed Lambda executions retry automatically from the queue
- Email logic can evolve independently from the API

### CDK over raw CloudFormation or console setup
Manual AWS console configuration is not reproducible. CDK keeps the infrastructure in the same TypeScript codebase, enforces IaC from day one, and makes it straightforward to tear down and recreate the stack in any environment.

### Static bearer token auth (no login system)
The site is invite-only with a known, fixed guest list. A full auth system would add complexity with zero user benefit. A static bearer token injected at build time is sufficient for protecting the RSVP endpoint from anonymous submissions.

---

## Design System

The frontend uses a bespoke design system built on CSS custom properties and extended into Tailwind.

### Color palette

| Token | Usage |
|-------|-------|
| `--rosé` | Primary accent — buttons, borders, highlights |
| `--sage` | Secondary green — complementary accents |
| `--cream` | Base background |
| `--gold` | Detail color for decorative elements |
| `--charcoal` | Primary text |

### Typography

| Class | Font | Usage |
|-------|------|-------|
| `font-display` | Cormorant Garamond | Names, headings, romantic elements |
| `font-body` | Jost | Paragraphs, labels, buttons |

### Animations

**Hero entrance** — CSS keyframe animations with staggered delays (0ms → 600ms) applied via utility classes.

**Scroll reveal** — `IntersectionObserver` with `threshold: 0.15`. Elements animate from `translateY(30px) opacity(0)` to their final state when they enter the viewport. Items within sections animate with per-item delay: `transition-delay: ${i * 100}ms`.

---

## Project Structure

```
src/
├── components/
│   ├── ui/                  # shadcn/ui base components
│   ├── WeddingNav.tsx        # Fixed navigation
│   ├── HeroSection.tsx       # Hero with photo, names, and countdown
│   ├── WeddingInfo.tsx       # Event date, time, and venue
│   ├── GiftCarousel.tsx      # Gift list (links to Lejour registry)
│   ├── ConfirmationForm.tsx  # RSVP form → POST /rsvps
│   └── WeddingFooter.tsx     # Footer with photo and verse
├── lib/
│   └── api-client.ts         # Centralized HTTP client (injects Bearer token)
├── pages/
│   └── Index.tsx             # Page composition
├── index.css                 # CSS variables, fonts, animations
└── vite-env.d.ts            # VITE_* environment type declarations
```

---

## Local Setup

**Prerequisites:** Node.js 18+, Bun

```bash
# 1. Clone
git clone https://github.com/penteado40/fa-wedding.git
cd fa-wedding

# 2. Environment
cp .env.example .env
# Fill in the values below

# 3. Install dependencies
bun install

# 4. Start dev server
bun dev
```

Available at `http://localhost:5173`

### Environment variables

| Variable | Description |
|----------|-------------|
| `VITE_URL_API` | Backend API base URL (e.g. `http://localhost:3000/api`) |
| `VITE_API_TOKEN` | Static bearer token for API authentication |
| `VITE_URL_GIFTS` | External gift registry URL (Lejour) |

> To add a new `VITE_*` variable, declare it in `src/vite-env.d.ts` under `ImportMetaEnv`.

---

## Related

- **[inventory-api](https://github.com/penteado40/inventory-api)** — Multi-tenant inventory REST API (Hono · TypeScript · Prisma · PostgreSQL)

---

## Author

**Felipe Penteado** — Full Stack Engineer
[felipepenteado.com.br](https://felipepenteado.com.br) · [LinkedIn](https://linkedin.com/in/felipepenteado) · [GitHub](https://github.com/penteado40)
