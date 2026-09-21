# Oscar Blxck — Portafolio

Sitio de portafolio para Oscar Blxck, tatuador en Bogotá.
Blackwork ilustrativo · Neotradicional · Minimalista · Sombras

## Correr en local

```bash
node server.mjs     # http://localhost:5173
```

Es un sitio estático: no necesita build ni dependencias para funcionar.

## Estructura

```
index.html              una sola página
assets/css/style.css    estilos — paleta negro / #F8B708 / blanco
assets/js/i18n.js       textos ES/EN (añadir idioma = copiar un bloque)
assets/js/data.js       portafolio, diseños y merch — se edita aquí
assets/js/app.js        interacciones
assets/img/             imágenes
```

## Pendientes

- [ ] Reemplazar las fotos de `assets/img/` — hoy son de Unsplash, **no son piezas de Oscar**
- [ ] Llenar `[VALOR]`, `[PRECIO]`, `[MES / MES]`, `[X] días`
- [ ] Testimonios reales
- [ ] Quitar el `Disallow: /` de `robots.txt` cuando entren las fotos reales
