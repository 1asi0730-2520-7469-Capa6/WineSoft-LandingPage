let currentLang = "en";

function toggleLanguage() {
  currentLang = currentLang === "en" ? "es" : "en";
  document.documentElement.setAttribute("lang", currentLang);
  document.body.setAttribute("data-lang", currentLang);
  document.querySelector(".lang-switcher").textContent =
    currentLang === "en" ? "ES" : "EN";
  loadLanguage(currentLang);
}

function loadLanguage(lang) {
  fetch(`locales/${lang}.json`)
    .then((res) => res.json())
    .then((translations) => {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const text = key.split(".").reduce((o, i) => o[i], translations);
        if (text) el.textContent = text;
      });
    })
    .catch((err) => console.error("Error loading translations:", err));
}

function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
}

// Smooth scroll
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Contact form
  const form = document.querySelector(".contact-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message =
      currentLang === "en"
        ? "Thank you for your message! We'll get back to you soon."
        : "¡Gracias por tu mensaje! Te responderemos pronto.";
    alert(message);
    form.reset();
  });

  // Load default language
  loadLanguage(currentLang);

  // Animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document.querySelectorAll(".feature-card").forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.style.background =
    window.scrollY > 100 ? "rgba(26, 35, 64, 0.98)" : "rgba(26, 35, 64, 0.95)";
});
