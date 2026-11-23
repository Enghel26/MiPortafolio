# Design System Master — Enghel Mejía Severino Portfolio

> Generated & curated with **UI/UX Pro Max (`ui-ux-pro-max-skill`)**
> Product Type: `Portfolio/Personal` + `Developer Tool / IDE`
> Primary Style: `Glassmorphism` + `Bento Box Grid` + `Aurora UI` (Dark/Light Adaptive)

## 1. Typography System (`typography.csv` — Tech Startup + Developer Mono)
- **Heading Font**: `Space Grotesk` (600, 700) — Geometric, modern tech authority (`text-wrap: balance`).
- **Body Font**: `Plus Jakarta Sans` / `Inter` (400, 500, 600) — High legibility (`16px` base, `1.65` line-height, `65ch` max measure).
- **Monospace Font**: `JetBrains Mono` (400, 500, 700) — Used for the C# hero code block (`string nombre = "...";`), section eyebrows, and tech stack tags.

## 2. Color Tokens (`colors.csv` — Developer Tool / IDE + Portfolio)
| Semantic Token | Dark Mode (Default) | Light Mode | Contrast / Role |
|----------------|---------------------|------------|-----------------|
| `--bg-dark` | `#060B19` | `#F8FAFC` | Primary canvas background |
| `--bg-surface` | `#0F172A` | `#FFFFFF` | Elevated section surface |
| `--card-bg` | `rgba(15, 23, 42, 0.72)` | `rgba(255, 255, 255, 0.88)` | Glassmorphism card fill |
| `--primary` | `#6366F1` (Indigo 500) | `#4F46E5` (Indigo 600) | Primary brand accent |
| `--accent-cyan` | `#06B6D4` | `#0891B2` | Secondary Aurora gradient accent |
| `--accent-emerald` | `#22C55E` | `#16A34A` | Availability status & QA indicators |
| `--text-main` | `#F8FAFC` | `#0F172A` | >= 15:1 contrast ratio |
| `--text-muted` | `#CBD5E1` | `#475569` | >= 7:1 contrast ratio (WCAG AAA) |

## 3. UI/UX Pro Max Rules Applied
1. **Accessibility (Priority 1)**: 4.5:1+ contrast on all text, `:focus-visible` outline rings, `aria-hidden="true"` on decorative rain and icons, `@media (prefers-reduced-motion: reduce)` support.
2. **Touch & Interaction (Priority 2)**: Minimum `44x44px` hit targets on all navbar buttons, carousel arrows, and CTAs; `8px+` gap between interactive targets.
3. **Layout & Responsive (Priority 5)**: Horizontal snap carousel for Featured Projects with keyboard & button navigation; Bento Grid for About stats; responsive breakpoints (`1024px`, `768px`, `480px`).
