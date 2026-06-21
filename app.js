const dentistConfig = {
  name: "Dra. Valeria Guzmán",
  whatsapp: "573122409487",
  whatsappMessage:
    "Hola Dra. Valeria, vi su página web y me gustaría agendar una valoración odontológica.",
  services: [
    {
      name: "Aclaramiento Dental",
      formValue: "Aclaramiento Dental",
      icon: "fa-wand-magic-sparkles",
      summary:
        "Luce una sonrisa más blanca, brillante y segura con una valoración previa y expectativas claras.",
      badge: "¡Resultados visibles en pocas sesiones!",
    },
    {
      name: "Barniz de Flúor",
      formValue: "Barniz de Flúor",
      icon: "fa-shield-halved",
      summary:
        "Apoyo preventivo contra caries. Ideal para niños y adultos según criterio profesional.",
      badge: "¡Prevención que cuida tu sonrisa!",
    },
    {
      name: "Limpieza con Ultrasonido",
      formValue: "Limpieza con Ultrasonido",
      icon: "fa-tooth",
      summary:
        "Ayuda a remover sarro y placa bacteriana para mantener dientes y encías más saludables.",
      badge: "¡Salud que verdaderamente se siente!",
    },
  ],
  extraServices: ["Valoración Inicial", "Otro tratamiento"],
};

const whatsappUrl = (message = dentistConfig.whatsappMessage) =>
  `https://wa.me/${dentistConfig.whatsapp}?text=${encodeURIComponent(message)}`;

const showToast = (title, message) => {
  const toast = document.querySelector("#toast");
  const toastTitle = document.querySelector("#toastTitle");
  const toastMessage = document.querySelector("#toastMessage");

  toastTitle.textContent = title;
  toastMessage.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 3600);
};

const renderGlobalLinks = () => {
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = whatsappUrl();
  });
};

const renderServices = () => {
  const servicesRoot = document.querySelector("[data-services]");
  const serviceSelect = document.querySelector("[data-service-select]");

  dentistConfig.services.forEach((service) => {
    const card = document.createElement("article");
    card.className = "service-card";
    card.innerHTML = `
      <span class="service-icon"><i class="fa-solid ${service.icon}" aria-hidden="true"></i></span>
      <h3>${service.name}</h3>
      <p>${service.summary}</p>
      <span class="service-badge">${service.badge}</span>
      <button type="button" data-service-choice="${service.formValue}">
        Me interesa <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </button>
    `;
    servicesRoot.appendChild(card);

    const option = document.createElement("option");
    option.value = service.formValue;
    option.textContent = service.name;
    serviceSelect.appendChild(option);
  });

  dentistConfig.extraServices.forEach((serviceName) => {
    const option = document.createElement("option");
    option.value = serviceName;
    option.textContent = serviceName;
    serviceSelect.appendChild(option);
  });
};

const handleMobileMenu = () => {
  const button = document.querySelector("#menuButton");
  const drawer = document.querySelector("#mobileDrawer");

  button.addEventListener("click", () => {
    const isOpen = drawer.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll("[data-mobile-link]").forEach((link) => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    });
  });
};

const handleServiceChoices = () => {
  const serviceSelect = document.querySelector("[data-service-select]");
  const form = document.querySelector("#bookingForm");

  document.addEventListener("click", (event) => {
    const choice = event.target.closest("[data-service-choice]");

    if (!choice) return;

    serviceSelect.value = choice.dataset.serviceChoice;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("Servicio seleccionado", `Seleccionaste ${choice.dataset.serviceChoice}. Completa tus datos.`);
  });
};

const buildWhatsAppMessage = (payload) => {
  const lines = [
    "Hola Dra. Valeria Guzmán 🦷, me gustaría agendar una cita.",
    "",
    `👤 Nombre: ${payload.name}`,
    `📱 Celular: ${payload.phone}`,
    `✨ Servicio: ${payload.service}`,
    `📅 Fecha tentativa: ${payload.date}`,
    `⏰ Horario sugerido: ${payload.schedule}`,
    `📝 Detalles: ${payload.message || "Ninguno"}`,
  ];

  return lines.join("\n");
};

const formToPayload = (form) => {
  const data = new FormData(form);
  return {
    name: String(data.get("name") || "").trim(),
    phone: String(data.get("phone") || "").trim(),
    service: String(data.get("service") || "").trim(),
    date: String(data.get("date") || "").trim(),
    schedule: String(data.get("schedule") || "").trim(),
    message: String(data.get("message") || "").trim(),
    website: String(data.get("website") || "").trim(),
  };
};

const handleBookingForm = () => {
  const form = document.querySelector("#bookingForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const payload = formToPayload(form);

    if (payload.website) return;

    const message = buildWhatsAppMessage(payload);
    showToast("Redirigiendo a WhatsApp", "Tu solicitud se abrirá en una nueva pestaña.");

    window.setTimeout(() => {
      window.open(whatsappUrl(message), "_blank", "noreferrer");
      form.reset();
    }, 700);
  });
};

renderGlobalLinks();
renderServices();
handleMobileMenu();
handleServiceChoices();
handleBookingForm();
