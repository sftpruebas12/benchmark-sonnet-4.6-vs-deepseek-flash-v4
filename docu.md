## POC comparando sonnet y deepseek-flask-v4

Se realizará una landing page con ambos modelos y se evaluará su rendimiento despues.

Prompt inicial: 

```
Actúa como un Senior Product Designer y Frontend Engineer especializado en landing pages premium de IA.

Tu objetivo es crear una POC de una landing moderna, elegante y production-ready para una startup llamada “NeuralFlow”, enfocada en:
- automatización con IA
- agentes inteligentes
- workflows empresariales
- análisis de datos

# STACK
- React
- Tailwind CSS
- Responsive mobile-first

# ESTILO
Inspirado en:
- Stripe
- Linear
- Vercel
- Framer

El diseño debe sentirse:
- premium
- minimalista
- futurista
- enterprise
- moderno

# SECCIONES
- Navbar
- Hero con CTA principal
- Features
- Workflow/Automation showcase
- Testimonials
- Pricing
- FAQ
- Footer

# REQUISITOS
- Excelente responsive en mobile/tablet/desktop
- Muy buen spacing y jerarquía visual
- Código limpio y componentizado
- Semantic HTML
- Animaciones suaves
- Dark mode elegante
- Evitar diseño genérico típico de IA

# IMPORTANTE
Prioriza:
- calidad visual
- UX/UI
- responsive real
- consistencia visual
- polish premium

# OUTPUT
Genera:
1. Código completo
2. Breve explicación UX/UI
3. Estrategia responsive
```

## Deepseek-flash-v4

Resumen deepseek-flash-v4:

Aproximadamente 25-30 minutos en total, distribuido en 5 iteraciones:

1. Setup + estructura base (~6 min) — package.json, configs, CSS, App shell, todos los componentes iniciales
2. Primer pulido (~6 min) — useReveal hook, scrollbar, noise, dashboard mockup realista, Stats, back-to-top, micro-interactions
3. Segundo pulido (~5 min) — scroll progress bar, active section tracking, animated counters, marquee logos, 3D tilt, CTA section, parallax orbs
4. Tercer pulido (~5 min) — GlowCard Stripe-style, pricing monthly/yearly toggle, email form, animated hero grid lines
5. Cuarto pulido (~5 min) — ToastSocialProof, CursorRing, animated nav underline, progress bars animadas, SectionDivider SVG

## Sonnet-4.6

Aproximadamente entre 30-35 minutos, distribuido en 5 iteraciones. 
Qué se añadió (las 4 iteraciones)

### Iteración 1 — Hooks + Micro-interactions

| Pieza | Detalle |
|---|---|
| useReveal | IntersectionObserver → clase .visible con opacity + translateY. Aplicado a Features, Workflow, Testimonials, Pricing, FAQ, CTABanner |
| useActiveSection | Resalta el link de nav del section visible en pantalla |
| useParallax | 3 orbs en Hero se mueven en Z diferente al hacer scroll |
| 3D tilt en AgentDashboard | perspective + rotateX/Y sigue el mouse, se resetea al salir |
| NoiseOverlay | SVG feTurbulence fijo, opacity: 0.028, mix-blend-mode: overlay |
| BackToTop | Aparece al scrollear >500px, smooth scroll, esquina inferior derecha |

### Iteración 2 — Scroll + Counters + Marquee + Orbs

| Pieza | Detalle |
|---|---|
| ScrollProgressBar | Barra 2px gradiente violet→cyan, z-60 (sobre navbar), actualiza en scroll |
| Stats section | 4 métricas con useAnimatedCounter — easing cúbico con requestAnimationFrame |
| Marquee logos | Doble array, translateX(-50%) loop infinito, fade masks L/R, pausa en hover |
| Parallax orbs | 3 capas con velocidades distintas (0.11, 0.07, 0.033) |

### Iteración 3 — GlowCard + Email Form + Grid animado

| Pieza | Detalle |
|---|---|
| GlowCard | radial-gradient sigue el mouse dentro de la card. Aplicado a Features, Testimonials, Pricing |
| Email form | Validación inline, estado submitted con checkmark, estado error con borde rojo |
| Grid animado | background-position se desplaza 64px en 22s (clase grid-drift) |
| Animated nav underline | scaleX(0→1) en hover, opacity 1 cuando es el section activo |

### Iteración 4 — Toast + CursorRing + Progress bars + SectionDivider

| Pieza | Detalle |
|---|---|
| ToastSocialProof | Rota 5 mensajes, ciclo de 11s, animaciones CSS toast-enter/exit |
| CursorRing | Solo en dispositivos con hover. Se agranda en a/button, mix-blend-mode: screen |
| ProgressBadge | 4 barras animadas (width 0→N% en 1s) que entran con useReveal |
| SectionDivider | SVG inline con linearGradient + dot central, colocado entre secciones |
| ProgressBadge labels | SOC 2, Uptime, ISO 27001, P99 con valores reales |

## Prompt para verificar y benchmark: 

```
Actúa como un Staff Product Designer, Senior UX Engineer y Frontend Architect neutral.

Tu tarea es evaluar DOS implementaciones de una landing page generadas por diferentes modelos de IA.

Debes actuar como un evaluador extremadamente crítico y profesional.

# OBJETIVO

Analizar ambas implementaciones y generar:
- métricas comparativas
- puntuaciones objetivas
- fortalezas
- debilidades
- conclusiones finales

# CRITERIOS DE EVALUACIÓN

Evalúa cada implementación del 1 al 10 en:

1. Visual Design Quality
- estética premium
- jerarquía visual
- spacing
- consistencia
- sensación profesional

2. Responsive Design
- mobile
- tablet
- desktop
- grids adaptativos
- tipografía responsive
- ausencia de overflow

3. UX/UI Quality
- claridad visual
- CTAs
- navegación
- legibilidad
- flow de usuario

4. Prompt Adherence
- seguimiento exacto de instrucciones
- respeto del estilo solicitado
- cumplimiento de requisitos

5. Frontend Architecture
- estructura componentes
- reutilización
- limpieza del código
- mantenibilidad
- semantic HTML

6. Tailwind Quality
- uso correcto
- consistencia
- clases limpias
- evitar redundancia

7. Creativity & Polish
- originalidad
- sensación premium
- microdetalles
- refinamiento visual

8. Production Readiness
- sensación real de producto
- calidad deployable
- robustez visual

# FORMATO DE RESPUESTA

## Tabla comparativa

| Métrica | Modelo A | Modelo B | Ganador |
|---|---|---|---|

## Análisis detallado

Para cada categoría:
- fortalezas
- debilidades
- problemas detectados

## Hallazgos críticos

Detecta:
- problemas responsive
- malas prácticas
- inconsistencias visuales
- exceso de padding
- layouts rotos
- problemas de accesibilidad
- diseño genérico IA
- sobreuso de efectos

## Conclusión final

Incluye:
- ganador global
- mejor modelo para producción
- mejor modelo para iteraciones rápidas
- mejor modelo para diseño premium
- mejor modelo para frontend limpio

# IMPORTANTE

Sé extremadamente estricto y profesional.

No favorezcas ningún modelo.

Prioriza:
- calidad real
- experiencia de usuario
- mantenibilidad
- polish visual
- responsive real
```