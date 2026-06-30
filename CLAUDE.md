# CLAUDE.md — Contexto del proyecto para agentes de IA

Este archivo describe el estado actual del proyecto, las decisiones técnicas tomadas y el contexto de negocio. Léelo antes de modificar cualquier archivo.

## ¿Qué es este proyecto?

Landing page para la **Dra. Valeria Guzmán**, odontóloga colombiana. El objetivo es convertir visitantes en citas agendadas vía WhatsApp. Es una plantilla reutilizable para otros odontólogos.

**URL en producción:** https://dravaleriaguzman.vercel.app

## Contexto de negocio

- **Profesional:** Dra. Valeria Guzmán, odontóloga general
- **Ciudades de atención:** Chía, Cundinamarca (zona metropolitana de Bogotá) y Melgar, Tolima (destino vacacional). La agenda es **flexible** entre ambas ciudades — no hay días fijos por ciudad.
- **Canal principal:** WhatsApp (+57 312 240 9487). El formulario genera un mensaje prellenado y abre WhatsApp directamente.
- **Mercado:** Colombia. WhatsApp es el canal dominante; el sitio está diseñado para eso.
- **Servicios actuales:** Aclaramiento Dental, Barniz de Flúor, Limpieza con Ultrasonido.

## Stack técnico

- **HTML/CSS/JS vanilla** — sin frameworks, sin bundler. Decisión intencional para máxima velocidad de carga.
- **Font Awesome 6.5.2** (CDN) para íconos.
- **Google Fonts** — Plus Jakarta Sans (cuerpo) y Caveat (acento script).
- **Vercel** — deploy estático. Configurado en `vercel.json` con `cleanUrls: true`.
- **Google Apps Script** — backend para captura de leads en Google Sheets (ver sección pendientes).

## Archivos clave

| Archivo | Propósito |
|---|---|
| `index.html` | Toda la estructura HTML del sitio |
| `styles.css` | Todos los estilos. Variables CSS en `:root`. Breakpoints en 1020px y 680px |
| `app.js` | Lógica JS: render de servicios, WhatsApp links, formulario, menú móvil |
| `google-apps-script/Code.gs` | Script para capturar leads en Google Sheets (pendiente de conectar) |
| `BACKLOG.md` | Pendientes organizados por fase |
| `vercel.json` | Configuración de deploy |
| `.vercel/project.json` | IDs del proyecto Vercel (`projectId`, `orgId`) |
| `assets/valeria-reference.png` | Foto de referencia de la Dra. Valeria (no usada aún en el sitio) |

## Estructura del sitio (secciones en orden)

1. **Hero** (`#inicio`) — headline, features, CTAs, visual card animada
2. **Promo panel** — banner de precios accesibles
3. **Servicios** (`#servicios`) — 3 cards renderizadas desde `services` en `app.js`
4. **Ubicaciones** (`#ubicaciones`) — tarjetas de Chía y Melgar
5. **Agendamiento** (`#agendar`) — formulario que abre WhatsApp con mensaje prellenado
6. **Testimonios** (`#testimonios`) — 3 cards placeholder (pendiente reemplazar con reales)
7. **FAQ** (`#faq`) — 12 preguntas orientadas a SEO y búsquedas por IA
8. **Footer** (`#contacto`) — nav, contacto, redes sociales

## Decisiones de diseño tomadas

- **Paleta:** morado (`#6a1b9a`) + rosa (`#d81b60`, `#ff4081`) + dorado (`#ffd700`). No cambiar sin instrucción explícita.
- **Iconos de WhatsApp:** usar siempre `fa-brands fa-whatsapp` (no `fa-regular fa-message`).
- **Redes sociales:** Instagram y Facebook están visibles en el footer pero sin `href` activo. WhatsApp sí tiene link. No agregar links de redes hasta tener las URLs reales.
- **Horario:** se eliminó intencionalmente del footer porque la agenda es flexible.
- **Fechas en hero:** eliminadas. El banner dice "Agenda Disponible / Atención personalizada / Chía y Melgar ✨".
- **Foto de la Dra.:** existe en `assets/valeria-reference.png` pero no se usa aún. Pendiente para fase 2.
- **Testimonios:** son placeholder. Pendiente reemplazar con reales.
- **FAQ:** implementado con tabs por categoría (no lista vertical). Las 12 preguntas están agrupadas en 3 tabs: "Citas & Ubicación" (4), "Tratamientos" (5), "Familia & Prevención" (3). El JS maneja el cambio de tab via `handleFaqTabs()` en `app.js`. No volver a lista vertical.

## Comportamiento del formulario

El formulario (`#bookingForm`) captura: nombre, teléfono, servicio, ciudad, fecha tentativa, horario y notas. Al enviarse:
1. Valida el honeypot (`name="website"`) — si tiene valor, ignora el envío (antispam).
2. Construye un mensaje formateado con todos los campos, incluyendo la ciudad elegida.
3. Abre `https://wa.me/573122409487?text=...` en nueva pestaña.
4. Resetea el formulario.

**El campo Ciudad es requerido.** Las opciones son: "Chía, Cundinamarca" y "Melgar, Tolima".

## Cómo correr localmente

```powershell
cd "C:\Users\Marlontato\Documents\Web Page creator"
python -m http.server 8080
```

Luego abre `http://localhost:8080`. El archivo `.claude/launch.json` ya está configurado para el preview tool de Claude Code.

## Cómo hacer deploy

```powershell
vercel deploy --prod
```

O hacer `git push origin main` — Vercel tiene la integración con GitHub configurada y despliega automáticamente.

## Pendientes importantes

Ver `BACKLOG.md` para el detalle completo. Los más relevantes:

- **Google Sheets:** el `Code.gs` está listo pero el formulario no hace `fetch()` a ninguna URL. Cuando el cliente proporcione la URL del Web App, agregar la llamada en `app.js` dentro de `handleBooking()`.
- **Foto de la Dra.:** agregar en hero o sección de agendamiento cuando haya foto profesional disponible.
- **Testimonios reales:** reemplazar los 3 placeholder en `index.html` (#testimonios).
- **Redes sociales:** agregar los `href` reales de Instagram y Facebook cuando estén disponibles.
- **Favicon:** agregar `<link rel="icon">` en el `<head>`.
- **JSON-LD:** agregar structured data `MedicalBusiness` para ambas ciudades para SEO local avanzado.

## Para reutilizar como plantilla para otro odontólogo

Cambiar en `app.js`:
- `const phone` — número de WhatsApp
- Array `services` — los servicios del nuevo profesional

Cambiar en `index.html`:
- Nombre de la doctora (buscar "Valeria Guzmán")
- Ciudades de atención (buscar "Chía" y "Melgar")
- Testimonios y preguntas del FAQ

Cambiar en `styles.css`:
- Variables de color en `:root`
