# bioticals.com.ar

Landing estatica de Bioticals, orientada a presentar lineas de productos biologicos, destacados comerciales e innovacion en agricultura sostenible.

## Contenido

- `index.html`: pagina principal.
- `hero.mp4`: video principal del hero.
- `biotica_n2_product.webp`, `nutraamin_product.webp`: productos destacados.
- `fauno_logo.webp`, `faunolanding.webp`: recursos de integracion comercial.
- favicons y assets visuales en la raiz.

## Secciones principales

- hero institucional
- lineas de productos
- lanzamientos y destacados
- bloque de I+D+i
- footer institucional

## Stack

- HTML estatico
- Tailwind via CDN
- Google Fonts
- assets locales

No requiere `npm install` ni build.

## Verlo localmente

```bash
cd bioticals.com.ar
python3 -m http.server 8000
```

Abrir `http://localhost:8000`.

## Deploy

Sitio apto para hosting estatico. Revisar al publicar:

- rutas de assets locales
- enlaces externos a Fauno
- video del hero y favicons

## Notas

- El sitio actual usa contenido y estructura de landing unica. Si se suman fichas por producto, conviene pasar a una arquitectura con paginas separadas o datos JSON.
