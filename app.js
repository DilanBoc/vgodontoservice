const phone = "573122409487";

const services = [
  {
    name: "Aclaramiento Dental",
    icon: "fa-wand-magic-sparkles",
    summary:
      "Devuélvele el brillo natural a tu sonrisa con un tratamiento clínico seguro, profesional y diseñado a tu medida.",
    badge: "¡Resultados visibles en pocas sesiones!",
  },
  {
    name: "Barniz de Flúor",
    icon: "fa-shield-halved",
    summary:
      "Una capa protectora que remineraliza el esmalte y previene las caries. Ideal para toda la familia, niños y adultos.",
    badge: "¡Prevención que cuida tu sonrisa!",
  },
  {
    name: "Limpieza con Ultrasonido",
    icon: "fa-wand-sparkles",
    summary:
      "Eliminamos placa y sarro acumulado de forma profunda y delicada con tecnología de última generación.",
    badge: "¡Salud que verdaderamente se siente!",
  },
];

const extraServices = ["Diagnóstico General", "Otro"];

const whatsappUrl = (message = "Hola Dra. Valeria, quiero agendar una cita odontológica.") =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const showToast = (title, message) => {
  const toast = document.querySelector("#toast");
  document.querySelector("#toastTitle").textContent = title;
  document.querySelector("#toastMessage").textContent = message;
  toast.classList.add("show");

  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 3600);
};

const renderWhatsAppLinks = () => {
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = whatsappUrl();
  });
};

const renderServices = () => {
  const servicesRoot = document.querySelector("[data-services]");
  const serviceSelect = document.querySelector("[data-service-select]");

  services.forEach((service) => {
    const card = document.createElement("article");
    card.className = "service-card";
    card.innerHTML = `
      <span class="service-icon"><i class="fa-solid ${service.icon}" aria-hidden="true"></i></span>
      <h3>${service.name}</h3>
      <p>${service.summary}</p>
      <span class="service-badge">${service.badge}</span>
      <button type="button" data-service-choice="${service.name}">
        Me interesa <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </button>
    `;
    servicesRoot.appendChild(card);

    const option = document.createElement("option");
    option.value = service.name;
    option.textContent = service.name;
    serviceSelect.appendChild(option);
  });

  extraServices.forEach((service) => {
    const option = document.createElement("option");
    option.value = service;
    option.textContent = service;
    serviceSelect.appendChild(option);
  });
};

const handleMenu = () => {
  const button = document.querySelector("#menuButton");
  const drawer = document.querySelector("#mobileDrawer");

  button.addEventListener("click", () => {
    const open = drawer.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll("[data-mobile-link]").forEach((link) => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    });
  });
};

const handleServiceChoice = () => {
  const select = document.querySelector("[data-service-select]");
  const form = document.querySelector("#bookingForm");

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-service-choice]");
    if (!button) return;

    select.value = button.dataset.serviceChoice;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("Servicio seleccionado", `${button.dataset.serviceChoice} quedó seleccionado.`);
  });
};

const formToPayload = (form) => {
  const data = new FormData(form);

  return {
    name: String(data.get("name") || "").trim(),
    phone: String(data.get("phone") || "").trim(),
    service: String(data.get("service") || "").trim(),
    city: String(data.get("city") || "").trim(),
    date: String(data.get("date") || "").trim(),
    schedule: String(data.get("schedule") || "").trim(),
    message: String(data.get("message") || "").trim(),
    website: String(data.get("website") || "").trim(),
  };
};

const buildMessage = (payload) => {
  return [
    "Hola Dra. Valeria Guzmán 🦷, me gustaría agendar una cita.",
    "",
    `👤 Nombre: ${payload.name}`,
    `📱 Teléfono: ${payload.phone}`,
    `✨ Servicio: ${payload.service}`,
    `📍 Ciudad: ${payload.city || "Por confirmar"}`,
    `📅 Fecha tentativa: ${payload.date || "Por confirmar"}`,
    `⏰ Horario preferido: ${payload.schedule || "Por confirmar"}`,
    `📝 Notas: ${payload.message || "Ninguna"}`,
  ].join("\n");
};

const handleBooking = () => {
  const form = document.querySelector("#bookingForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const payload = formToPayload(form);
    if (payload.website) return;

    showToast("Redirigiendo a WhatsApp", "Tu solicitud se abrirá en una nueva pestaña.");

    window.setTimeout(() => {
      window.open(whatsappUrl(buildMessage(payload)), "_blank", "noreferrer");
      form.reset();
    }, 650);
  });
};

renderWhatsAppLinks();
renderServices();
handleMenu();
handleServiceChoice();
handleBooking();
