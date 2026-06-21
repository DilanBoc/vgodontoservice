const dentistConfig = {
  name: "Valeria Guzman",
  whatsapp: "573122409487",
  campaign: "Agenda disponible del 24 de junio al 10 de julio",
  calendarUrl: "PEGAR_AQUI_URL_DE_GOOGLE_CALENDAR_APPOINTMENT_SCHEDULE",
  sheetsWebAppUrl: "PEGAR_AQUI_URL_DE_GOOGLE_APPS_SCRIPT_WEB_APP",
  whatsappMessage:
    "Hola Valeria, quiero agendar una cita odontologica. Me interesa recibir informacion.",
  services: [
    {
      name: "Aclaramiento dental",
      summary:
        "Mejora estetica de la sonrisa con valoracion previa, expectativas claras y cuidado profesional.",
    },
    {
      name: "Aplicacion de barniz de fluor",
      summary:
        "Apoyo preventivo contra caries. Recomendado para ninos y adultos segun criterio profesional.",
    },
    {
      name: "Limpieza profunda con ultrasonido",
      summary: "Remueve sarro y placa bacteriana para mantener dientes y encias mas saludables.",
    },
    {
      name: "Atencion odontologica familiar",
      summary: "Orientacion y cuidado para diferentes edades, con trato cercano y profesional.",
    },
  ],
};

const placeholderValues = new Set([
  "",
  "PEGAR_AQUI_URL_DE_GOOGLE_CALENDAR_APPOINTMENT_SCHEDULE",
  "PEGAR_AQUI_URL_DE_GOOGLE_APPS_SCRIPT_WEB_APP",
]);

const isConfigured = (value) => !placeholderValues.has(String(value || "").trim());

const whatsappUrl = (message = dentistConfig.whatsappMessage) => {
  return `https://wa.me/${dentistConfig.whatsapp}?text=${encodeURIComponent(message)}`;
};

const setText = (selector, text) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = text;
  });
};

const renderConfig = () => {
  setText('[data-config="name"]', dentistConfig.name);
  setText('[data-config="campaign"]', dentistConfig.campaign);

  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = whatsappUrl();
  });

  const servicesRoot = document.querySelector("[data-services]");
  const serviceSelect = document.querySelector("[data-service-select]");

  dentistConfig.services.forEach((service, index) => {
    const card = document.createElement("article");
    card.className = "service-card";
    card.innerHTML = `
      <span class="service-icon">${index + 1}</span>
      <h3>${service.name}</h3>
      <p>${service.summary}</p>
      <a class="service-link" href="#agenda" aria-label="Agendar ${service.name}">Agendar este servicio</a>
    `;
    servicesRoot.appendChild(card);

    const option = document.createElement("option");
    option.value = service.name;
    option.textContent = service.name;
    serviceSelect.appendChild(option);
  });

  const calendarLink = document.querySelector("[data-calendar-link]");
  const calendarStatus = document.querySelector("[data-calendar-status]");

  if (isConfigured(dentistConfig.calendarUrl)) {
    calendarLink.href = dentistConfig.calendarUrl;
    calendarStatus.textContent = "Agenda activa. Al abrirla podras escoger el horario disponible.";
  } else {
    calendarLink.addEventListener("click", (event) => {
      event.preventDefault();
      calendarStatus.textContent = "Falta pegar el enlace real de Google Calendar en app.js.";
    });
  }
};

const formToPayload = (form) => {
  const data = new FormData(form);
  return {
    submittedAt: new Date().toISOString(),
    source: window.location.href,
    dentistName: dentistConfig.name,
    name: String(data.get("name") || "").trim(),
    phone: String(data.get("phone") || "").trim(),
    service: String(data.get("service") || "").trim(),
    city: String(data.get("city") || "").trim(),
    preferredTime: String(data.get("preferredTime") || "").trim(),
    message: String(data.get("message") || "").trim(),
    consent: data.get("consent") ? "yes" : "no",
    website: String(data.get("website") || "").trim(),
  };
};

const submitLead = async (payload) => {
  if (!isConfigured(dentistConfig.sheetsWebAppUrl)) {
    const savedLeads = JSON.parse(localStorage.getItem("demoLeads") || "[]");
    savedLeads.push(payload);
    localStorage.setItem("demoLeads", JSON.stringify(savedLeads));
    return { demo: true };
  }

  await fetch(dentistConfig.sheetsWebAppUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  return { demo: false };
};

const handleForm = () => {
  const form = document.querySelector("#leadForm");
  const status = document.querySelector("[data-form-status]");
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = formToPayload(form);

    if (payload.website) {
      return;
    }

    submitButton.disabled = true;
    status.textContent = "Enviando tus datos...";

    try {
      const result = await submitLead(payload);
      const message = `Hola Valeria, soy ${payload.name}. Quiero agendar una cita para ${payload.service}. Mi telefono es ${payload.phone}.`;
      document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
        link.href = whatsappUrl(message);
      });

      status.textContent = result.demo
        ? "Datos guardados en modo demo. Falta conectar Google Sheets en app.js."
        : "Datos enviados. Ahora puedes abrir la agenda o escribir por WhatsApp.";
      form.reset();
    } catch (error) {
      status.textContent = "No se pudo enviar. Intenta por WhatsApp o revisa la URL de Apps Script.";
    } finally {
      submitButton.disabled = false;
    }
  });
};

renderConfig();
handleForm();
