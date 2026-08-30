# Cetinet SAS — Sitio web

Sitio institucional de **Cetinet SAS**, proveedor de internet por fibra óptica en el corregimiento Pinguro, sector Peñitas, Giraldo (Antioquia, Colombia).

🔗 **Demo en vivo:** https://d-code-mz.github.io/cetinet-web/

## Contenido

- Información institucional (quiénes somos, cobertura, contacto)
- Atención al usuario: pagos, formulario PQRS y test de velocidad
- Normatividad del sector TIC en Colombia (régimen de protección al usuario, protección de datos, seguridad en la red, internet sano, contrato de servicios)
- Preguntas frecuentes
- Canales de denuncia ante autoridades (MinTIC, Fiscalía, Policía, ICBF, Te Protejo)

## Funcionalidad

- **Formularios de contacto y PQRS** que arman el mensaje y lo envían por WhatsApp
- **Mapa de cobertura real** embebido (Google Maps)
- **Modo claro/oscuro** con preferencia guardada en `localStorage`
- Diseño responsive, sin frameworks ni build step

## Stack

HTML, CSS y JavaScript sin frameworks ni dependencias de build. Fuentes vía Google Fonts (Inter, IBM Plex Mono).

## Estructura

```
├── index.html
├── quienes-somos.html
├── contacto.html
├── preguntas-frecuentes.html
├── 404.html
├── atencion/            → pagos, PQRS, test de velocidad
├── cobertura/           → mapa de cobertura
├── normatividad/        → régimen de protección, datos, seguridad, contrato
└── assets/
    ├── css/style.css
    ├── js/site.js
    └── img/             → logo, favicons, og-image, logos oficiales
```

## Correr en local

No requiere build. Basta con un servidor estático desde la raíz del proyecto, por ejemplo:

```bash
python -m http.server 8000
```

y abrir `http://localhost:8000/`.

## Despliegue

Publicado con **GitHub Pages** desde la rama `main`. Como el sitio se sirve bajo `/cetinet-web/` (no en la raíz del dominio), todos los enlaces y referencias a `assets/` usan **rutas relativas** en vez de absolutas — tenelo en cuenta si movés archivos de carpeta.

Las etiquetas `canonical`, Open Graph y los datos estructurados (JSON-LD) apuntan al dominio de producción `https://cetinetsas.com/`.
