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
    const headerPlaceholder = document.getElementById("hero-header-placeholder");
    const footer = document.getElementById("footer-placeholder");
    const existingHeader = document.querySelector(".hero-header");

    const lang = document.documentElement.lang;
    const headerFile = lang === "en"
      ? "/partials/hero-header-en.html"
      : "/partials/hero-header-nl.html";
    const footerFile = lang === "en"
      ? "/partials/footer-en.html"
      : "/partials/footer-nl.html";

    initCopyright();

    function initHeaderUi() {
      initNavActive();
      initLangSwitch();
      initHeroNav();
    }

    // Prefer inlined header (no fetch on critical path). Fallback keeps partials working.
    if (existingHeader && !headerPlaceholder) {
      initHeaderUi();
    } else if (headerPlaceholder) {
      fetch(headerFile)
        .then((r) => {
          if (!r.ok) throw new Error("Header fetch failed");
          return r.text();
        })
        .then((html) => {
          headerPlaceholder.innerHTML = html;
          initHeaderUi();
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

  function hydrateHeroImage(slide) {
    const img = slide?.querySelector("img");
    if (!img || img.dataset.hydrated === "true") return;

    const dataSrc = img.getAttribute("data-src");
    const dataSrcset = img.getAttribute("data-srcset");
    const dataSizes = img.getAttribute("data-sizes");

    if (dataSrc) {
      img.setAttribute("src", dataSrc);
      img.removeAttribute("data-src");
    }
    if (dataSrcset) {
      img.setAttribute("srcset", dataSrcset);
      img.removeAttribute("data-srcset");
    }
    if (dataSizes) {
      img.setAttribute("sizes", dataSizes);
      img.removeAttribute("data-sizes");
    }

    img.dataset.hydrated = "true";
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
      hydrateHeroImage(slides[current]);
      hydrateHeroImage(slides[(current + 1) % slides.length]);
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

    hydrateHeroImage(slides[0]);
    hydrateHeroImage(slides[1] || slides[0]);

    prevBtn?.addEventListener("click", () => {
      prev();
      startTimer();
    });

    nextBtn?.addEventListener("click", () => {
      next();
      startTimer();
    });

    startTimer();

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

  // Keep the first (LCP) slide fixed; only shuffle the rest so preload stays valid.
  function shuffleHeroSlides(track, slideElements) {
    const slides = Array.from(slideElements);
    const first = slides[0];
    const rest = slides.slice(1);

    for (let i = rest.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rest[i], rest[j]] = [rest[j], rest[i]];
    }

    const ordered = first ? [first, ...rest] : rest;
    ordered.forEach((slide) => {
      slide.classList.remove("is-active");
      track.appendChild(slide);
    });

    if (ordered[0]) ordered[0].classList.add("is-active");
    return ordered;
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
    const section = document.querySelector(".section.reviews");
    const carousel = section?.querySelector(".reviews-carousel");
    if (!section || !carousel || carousel.dataset.bound) return;

    const track = carousel.querySelector(".reviews-carousel__track");
    if (!track) return;

    carousel.dataset.bound = "true";

    const lang = document.documentElement.lang === "en" ? "en" : "nl";
    const copy = lang === "en"
      ? {
          fromGoogle: "Review from Google",
          ratingLabel: "Google rating",
        }
      : {
          fromGoogle: "Review van Google",
          ratingLabel: "Google-beoordeling",
        };

    const googleIcon = `
      <svg class="reviews-carousel__google-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>`;

    function stars(count) {
      return "★".repeat(Math.max(0, Math.min(5, Number(count) || 0)));
    }

    function formatDate(iso) {
      const date = new Date(`${iso}T12:00:00`);
      if (Number.isNaN(date.getTime())) return "";
      return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "nl-NL", {
        month: "long",
        year: "numeric",
      }).format(date);
    }

    function escapeHtml(value) {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function renderHeader(data) {
      if (section.querySelector(".reviews-header")) return;

      const label = section.querySelector(".label");
      const header = document.createElement("div");
      header.className = "reviews-header";
      header.innerHTML = `
        <div class="reviews-header__rating" aria-label="${copy.ratingLabel} ${data.rating} ${lang === "en" ? "out of" : "van"} 5">
          <span class="reviews-header__score">${escapeHtml(String(data.rating))}</span>
          <span class="reviews-header__stars" aria-hidden="true">${stars(data.rating)}</span>
          <span class="reviews-header__source">Google</span>
        </div>
      `;

      if (label?.nextSibling) {
        label.parentNode.insertBefore(header, label.nextSibling);
      } else {
        label?.after(header);
      }
    }

    function reviewText(review) {
      const text = review?.text;
      if (text && typeof text === "object") {
        return text[lang] || text.nl || text.en || "";
      }
      return text || "";
    }

    function renderCards(reviews) {
      track.innerHTML = reviews.map((review) => {
        const initial = (review.author || "?").trim().charAt(0) || "?";
        return `
          <article class="reviews-carousel__card">
            <div class="reviews-carousel__author">
              <span class="reviews-carousel__avatar" style="background:${escapeHtml(review.avatarColor || "#314f77")}" aria-hidden="true">${escapeHtml(initial)}</span>
              <div class="reviews-carousel__meta">
                <span class="reviews-carousel__name">${escapeHtml(review.author)}</span>
                <span class="reviews-carousel__from">${googleIcon}<span>${copy.fromGoogle}</span></span>
              </div>
            </div>
            <div class="reviews-carousel__rating-row">
              <span class="reviews-carousel__stars" aria-label="${review.rating} / 5">${stars(review.rating)}</span>
              <time class="reviews-carousel__date" datetime="${escapeHtml(review.date)}">${escapeHtml(formatDate(review.date))}</time>
            </div>
            <p class="reviews-carousel__text">${escapeHtml(reviewText(review))}</p>
          </article>
        `;
      }).join("");
    }

    fetch("/data/google-reviews.json")
      .then((response) => {
        if (!response.ok) throw new Error("Reviews fetch failed");
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data.reviews) || !data.reviews.length) return;
        const reviews = [...data.reviews]
          .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")))
          .slice(0, 8);
        renderHeader(data);
        renderCards(reviews);
      })
      .catch(() => {});
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
