# amset-landing

Landing pública de [amset.tech](https://amset.tech) — desarrollo de software a medida, videojuegos y automatización con IA.

Sitio estático puro (HTML/CSS/JS, sin build step ni framework) para que el despliegue sea trivial: `git pull` + servir con nginx. Bilingüe: `/` en español, `/en/` en inglés.

Identidad visual clonada 1:1 del propio Assistant de AMSET (`Series-Ordenar/tradingFront-main/pages/assistant`): mismo logo (`assets/img/logo-texto-2.png`), misma paleta (fondo `#00020a`, acento cian `#00d4ff`), mismo par tipográfico (Orbitron + Inter), mismo fondo de rejilla/partículas, y el propio dial SVG del "orb" del asistente (`components/assistant/orb/AssistantOrb.jsx`) portado a JS vanilla en `assets/js/orb.js`.

## Estructura

```
index.html          # ES (raíz)
en/index.html        # EN
assets/css/style.css # design system completo (tokens, componentes)
assets/js/orb.js     # puerto vanilla del AssistantOrb.jsx real
assets/js/main.js    # partículas, reveal-on-scroll, menú móvil
assets/img/          # logo real + favicon
```

## Desarrollo local

No hay build step. Basta con servir la carpeta con cualquier servidor estático, ej.:

```bash
npx serve .
```

## Despliegue

Servido como estático puro vía nginx en `server-manarift` (`amset.tech` + `www.amset.tech`, con certificado SSL).
