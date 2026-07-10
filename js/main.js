(function () {
  "use strict";

  function initFormNotice() {
    const params = new URLSearchParams(window.location.search);
    const notice = document.getElementById("form-notice");
    if (!notice || params.get("sent") !== "1") return;

    notice.hidden = false;
    notice.closest("form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", window.location.pathname);
  }

  function initHeroNav() {
    const header = document.querySelector(".hero-header");
    const toggle = header?.querySelector(".hero-header__toggle");
    const nav = header?.querySelector(".hero-header__nav");
    if (!header || !toggle || !nav) return;

    function closeNav() {
      header.classList.remove("is-nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("is-nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }

  function initCopyright() {
    const yearEl = document.getElementById("copyright-year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  function initNavActive() {
    const nav = document.querySelector(".hero-header__nav");
    if (!nav) return;

    const path = window.location.pathname.replace(/\/$/, "") || "/";

    nav.querySelectorAll("a[href]").forEach((link) => {
      const href = (link.getAttribute("href") || "").replace(/\/$/, "") || "/";
      const isActive = path === href || (href !== "/" && path.startsWith(href + "/"));

      if (isActive) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function initLangSwitch() {
    function getAlternatePath(lang) {
      const link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
      if (!link) return null;
      try {
        return new URL(link.href).pathname;
      } catch {
        return null;
      }
    }

    const nlPath = getAlternatePath("nl");
    const enPath = getAlternatePath("en");
    if (!nlPath || !enPath) return;

    document.querySelectorAll('.lang-link[hreflang="nl"]').forEach((a) => {
      a.href = nlPath;
    });
    document.querySelectorAll('.lang-link[hreflang="en"]').forEach((a) => {
      a.href = enPath;
    });
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
          initNavActive();
          initLangSwitch();
          initHeroNav();
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
          initLangSwitch();
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
    const track = hero.querySelector(".hero-slider__track");
    const slideElements = hero.querySelectorAll(".hero-slide");
    const prevBtn = hero.querySelector(".hero-slider__btn--prev");
    const nextBtn = hero.querySelector(".hero-slider__btn--next");
    if (!track || !slideElements.length) return;

    const slides = shuffleHeroSlides(track, slideElements);

    let current = 0;
    let timer;
    const INTERVAL = 3000;

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

  function shuffleHeroSlides(track, slideElements) {
    const slides = Array.from(slideElements);

    for (let i = slides.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [slides[i], slides[j]] = [slides[j], slides[i]];
    }

    slides.forEach((slide) => {
      slide.classList.remove("is-active");
      track.appendChild(slide);
    });

    slides[0].classList.add("is-active");
    return slides;
  }

  function initImageProtection() {
    const isEn = document.documentElement.lang === "en";
    const message = isEn
      ? "© Willem Martinot — this image is protected by copyright."
      : "© Willem Martinot — deze afbeelding is auteursrechtelijk beschermd.";

    let tooltip = document.getElementById("image-copyright-tooltip");
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.id = "image-copyright-tooltip";
      tooltip.setAttribute("role", "status");
      tooltip.setAttribute("aria-live", "polite");
      tooltip.hidden = true;
      document.body.appendChild(tooltip);
    }

    let hideTimer;

    function isProtectedImage(img) {
      const src = img.currentSrc || img.src || "";
      if (src.includes("/images/nl/") || src.includes("/images/en/") || src.includes("/images/homepage/")) {
        return true;
      }
      if (src.includes("/images/site/")) {
        return !src.includes("clients-strip") && !src.includes("/og/");
      }
      return false;
    }

    function showTooltip(x, y) {
      tooltip.textContent = message;
      tooltip.hidden = false;
      const maxLeft = Math.max(12, window.innerWidth - tooltip.offsetWidth - 12);
      const maxTop = Math.max(12, window.innerHeight - tooltip.offsetHeight - 12);
      tooltip.style.left = `${Math.min(x + 12, maxLeft)}px`;
      tooltip.style.top = `${Math.min(y + 12, maxTop)}px`;
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        tooltip.hidden = true;
      }, 2500);
    }

    document.addEventListener("contextmenu", (e) => {
      const img = e.target.closest("img");
      if (!img || !isProtectedImage(img)) return;
      e.preventDefault();
      showTooltip(e.clientX, e.clientY);
    });

    document.addEventListener("dragstart", (e) => {
      const img = e.target.closest("img");
      if (!img || !isProtectedImage(img)) return;
      e.preventDefault();
    });
  }

  loadPartials();
  initFormNotice();
  initImageProtection();
  initHeroSlider();
  initReviewsCarousel();

  function initReviewsCarousel() {
    const carousel = document.querySelector(".reviews-carousel");
    if (!carousel || carousel.dataset.bound) return;

    const viewport = carousel.querySelector(".reviews-carousel__viewport");
    const prevBtn = carousel.querySelector(".reviews-carousel__btn--prev");
    const nextBtn = carousel.querySelector(".reviews-carousel__btn--next");
    if (!viewport) return;

    function getTrack() {
      return viewport.querySelector(".es-list-layout");
    }

    function scrollByCards(direction) {
      const track = getTrack();
      if (!track) return;
      const card = track.querySelector(".es-review-container");
      const gap = parseFloat(getComputedStyle(track).gap) || 16;
      const amount = (card?.offsetWidth || track.clientWidth / 4) + gap;
      track.scrollBy({ left: direction * amount, behavior: "smooth" });
    }

    function bind() {
      const track = getTrack();
      if (!track || track.dataset.bound) return Boolean(track);

      track.dataset.bound = "true";
      carousel.dataset.bound = "true";

      prevBtn?.addEventListener("click", () => scrollByCards(-1));
      nextBtn?.addEventListener("click", () => scrollByCards(1));
      return true;
    }

    if (bind()) return;

    const observer = new MutationObserver(() => {
      if (bind()) observer.disconnect();
    });
    observer.observe(viewport, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 15000);
  }

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lightboxImg = lightbox.querySelector("img");
    const items = document.querySelectorAll(".event-grid__item img, .portrait-grid__item img, .corporate-grid__item img, .fashion-masonry__item img");
    let current = 0;

    function getLightboxSrc(img) {
      const srcset = img.getAttribute("srcset");
      if (srcset) {
        const largest = srcset
          .split(",")
          .map((part) => {
            const [url, descriptor] = part.trim().split(/\s+/);
            const width = descriptor?.endsWith("w") ? parseInt(descriptor, 10) : 0;
            return { url, width };
          })
          .sort((a, b) => b.width - a.width)[0];
        if (largest?.url) return largest.url;
      }

      return (img.currentSrc || img.src).replace(/\/(800|1200)\//, "/1920/");
    }

    function showLightboxImage(img) {
      lightboxImg.src = getLightboxSrc(img);
      lightboxImg.alt = img.alt;
    }

    items.forEach((img, i) => {
      img.addEventListener("click", () => {
        current = i;
        showLightboxImage(img);
        lightbox.classList.add("active");
      });
    });

    lightbox.addEventListener("click", () => lightbox.classList.remove("active"));

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") lightbox.classList.remove("active");
      if (e.key === "ArrowRight") {
        current = (current + 1) % items.length;
        showLightboxImage(items[current]);
      }
      if (e.key === "ArrowLeft") {
        current = (current - 1 + items.length) % items.length;
        showLightboxImage(items[current]);
      }
    });
  }
})();
