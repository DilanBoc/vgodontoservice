# Backlog — Dra. Valeria Guzmán Landing Page

Ideas y mejoras pendientes para fases posteriores.

---

## Fase 2 — Contenido real

- [ ] Reemplazar testimonios placeholder por reseñas reales de pacientes
- [ ] Agregar foto profesional de la Dra. Valeria (archivo ya disponible en `assets/valeria-reference.png`)
- [ ] Conectar perfiles reales de Instagram y Facebook en el footer

## Fase 2 — Integración Google Sheets

Cuando el formulario se envíe, además de abrir WhatsApp, registrar el lead automáticamente en Google Sheets.

**Pasos para activarlo:**
1. Crear un Google Sheet nuevo (ej. "Leads Dra. Valeria")
2. Ir a `Extensiones > Apps Script`
3. Pegar el contenido de `google-apps-script/Code.gs`
4. Guardar el proyecto
5. `Implementar > Nueva implementación > Aplicación web`
6. Ejecutar como: `Yo` — Quién tiene acceso: `Cualquier persona`
7. Copiar la URL del Web App generada
8. Compartir la URL para conectarla al formulario en `app.js`

**Costo:** Gratuito. Límite de 20,000 ejecuciones/día (más que suficiente).

## Fase 3 — SEO avanzado

- [ ] Agregar structured data JSON-LD (`MedicalBusiness`) para ambas ciudades (Chía y Melgar)
- [ ] Crear `robots.txt` y `sitemap.xml`
- [ ] Agregar favicon

## Fase 3 — Funcionalidades adicionales

- [ ] Integrar Google Calendar Appointment Schedule para agenda en línea
- [ ] Ampliar servicios si la Dra. Valeria expande su oferta
