# Plantilla de agenda odontologica

MVP para una landing page reutilizable de odontologos. El primer caso esta configurado para Valeria Guzman.

## Que incluye

- Landing page responsive.
- Servicios configurables.
- WhatsApp con mensaje prellenado.
- Captura de leads para Google Sheets via Google Apps Script.
- Boton configurable para Google Calendar Appointment Schedule.
- Modo demo: si no hay URL de Apps Script, los leads se guardan en `localStorage`.

## Configuracion rapida

Edita `app.js`:

```js
calendarUrl: "PEGAR_AQUI_URL_DE_GOOGLE_CALENDAR_APPOINTMENT_SCHEDULE",
sheetsWebAppUrl: "PEGAR_AQUI_URL_DE_GOOGLE_APPS_SCRIPT_WEB_APP",
```

Para reutilizar la plantilla con otro odontologo, cambia:

- `name`
- `whatsapp`
- `campaign`
- `services`
- colores en `styles.css`
- imagen en `assets/valeria-reference.png`

## Conectar Google Sheets

1. Crea un Google Sheet nuevo.
2. Ve a `Extensiones > Apps Script`.
3. Pega el contenido de `google-apps-script/Code.gs`.
4. Guarda el proyecto.
5. Deploy: `Implementar > Nueva implementacion > Aplicacion web`.
6. Ejecutar como: `Yo`.
7. Quien tiene acceso: `Cualquier persona`.
8. Copia la URL de la aplicacion web.
9. Pegala en `sheetsWebAppUrl` dentro de `app.js`.

Cuando el formulario se envie, Apps Script creara una hoja llamada `Leads` y guardara cada contacto.

## Conectar Google Calendar

1. En Google Calendar, crea una agenda de citas con `Appointment Schedule`.
2. Configura disponibilidad, duracion, recordatorios y campos basicos.
3. Copia el enlace publico de reserva.
4. Pegalo en `calendarUrl` dentro de `app.js`.

Recomendacion: deja que Google Calendar maneje disponibilidad y recordatorios. Construir agenda propia en esta etapa aumentaria el costo sin aportar mucho al MVP.

## Probar localmente

Abre `index.html` en el navegador o usa un servidor local:

```powershell
python -m http.server 8080
```

Luego entra a `http://localhost:8080`.

## Nota de privacidad

El formulario no debe pedir datos clinicos sensibles. Para el MVP solo se captura contacto, servicio de interes y preferencia de horario.
