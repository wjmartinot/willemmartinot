(function () {
  "use strict";

  function initCopyright() {
    const yearEl = document.getElementById("copyright-year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  function loadPartials() {
    const header = document.getElementById("hero-header-placeholder");
    const footer = document.getElementById("footer-placeholder");

    const lang = document.documentElement.lang;
    const headerFile = lang === "en"
      ? "/partials/hero-header-en.html"
      : "/partials/hero-header-nl.html";
    const footerFile = lang === "en"
      ? "/partials/footer-en.html"
      : "/partials/footer-nl.html";

    initCopyright();

    if (header) {
      fetch(headerFile)
        .then((r) => {
          if (!r.ok) throw new Error("Header fetch failed");
          return r.text();
        })
        .then((html) => {
          header.innerHTML = html;
        })
        .catch(() => {});
    }

    if (footer) {
      fetch(footerFile)
        .then((r) => {
          if (!r.ok) throw new Error("Footer fetch failed");
          return r.text();
        })
        .then((html) => {
          footer.outerHTML = html;
          initCopyright();
        })
        .catch(() => {
          initCopyright();
        });
    }
  }

  function initHeroSlider() {
    const hero = document.querySelector(".hero-slider");
    if (!hero || hero.dataset.bound) return;

    hero.dataset.bound = "true";
    const slides = hero.querySelectorAll(".hero-slide");
    const prevBtn = hero.querySelector(".hero-slider__btn--prev");
    const nextBtn = hero.querySelector(".hero-slider__btn--next");
    if (!slides.length) return;

    let current = 0;
    let timer;
    const INTERVAL = 4000;

    function goTo(index) {
      slides[current].classList.remove("is-active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("is-active");
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function startTimer() {
      clearInterval(timer);
      timer = setInterval(next, INTERVAL);
    }

    prevBtn?.addEventListener("click", () => {
      prev();
      startTimer();
    });

    nextBtn?.addEventListener("click", () => {
      next();
      startTimer();
    });

    startTimer();

    hero.addEventListener("mouseenter", () =>
      clearInterval(timer));
    hero.addEventListener("mouseleave", () =>
      startTimer());

    let touchStartX = 0;
    hero.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    hero.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) {
        dx < 0 ? next() : prev();
        startTimer();
      }
    }, { passive: true });
  }

  loadPartials();
  initHeroSlider();

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lightboxImg = lightbox.querySelector("img");
    const items = document.querySelectorAll(".event-grid__item img");
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
})();
