(function () {
  "use strict";

  const navbar = document.querySelector(".navbar");
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const hamburger = document.querySelector(".hamburger");
  const overlay = document.querySelector(".nav-overlay");
  if (hamburger && overlay) {
    const toggleMenu = () => {
      const open = hamburger.classList.toggle("is-open");
      overlay.classList.toggle("is-open", open);
      hamburger.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    };
    hamburger.addEventListener("click", toggleMenu);
    overlay.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (hamburger.classList.contains("is-open")) toggleMenu();
      });
    });
  }

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lightboxImg = lightbox.querySelector("img");
    const items = document.querySelectorAll(".grid-item img");
    let current = 0;

    items.forEach((img, i) => {
      img.addEventListener("click", () => {
        current = i;
        lightboxImg.src = img.src;
        lightbox.classList.add("active");
      });
    });

    lightbox.addEventListener("click", () => lightbox.classList.remove("active"));

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") lightbox.classList.remove("active");
      if (e.key === "ArrowRight") {
        current = (current + 1) % items.length;
        lightboxImg.src = items[current].src;
      }
      if (e.key === "ArrowLeft") {
        current = (current - 1 + items.length) % items.length;
        lightboxImg.src = items[current].src;
      }
    });
  }

  const yearEl = document.getElementById("copyright-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
