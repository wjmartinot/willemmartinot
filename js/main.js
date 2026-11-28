(function () {
  "use strict";

  function trackEvent(name, params) {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, params);
  }

  function trackAdsConversion(sendTo, extra) {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "conversion", Object.assign({ send_to: sendTo }, extra || {}));
  }

  function fireLeadConversion(location) {
    const conversionKey = `ads_info_request:${window.location.pathname}`;
    try {
      if (sessionStorage.getItem(conversionKey) === "1") return;
    } catch {
      /* ignore */
    }

    trackEvent("generate_lead", {
      method: "contact_form",
      location: location || "contact_form",
    });
    // Google Ads: Informatieaanvraag
    trackAdsConversion("AW-1064034871/onpuCImJogEQt8Sv-wM", {
      value: 1.0,
      currency: "EUR",
    });
    try {
      sessionStorage.setItem(conversionKey, "1");
    } catch {
      /* ignore quota / private mode */
    }
  }

  function initFormNotice() {
    const params = new URLSearchParams(window.location.search);
    const notice = document.getElementById("form-notice");
    if (!notice || params.get("sent") !== "1") return;

    notice.hidden = false;
    notice.closest("form")?.scrollIntoView({ behavior: "smooth", block: "start" });

    const form = notice.closest("form.contact-form");
    fireLeadConversion(form?.dataset.contactLocation || "contact_form");

    // Strip ?sent=1 so refresh / back-forward / shared URLs don't re-fire.
    history.replaceState(null, "", window.location.pathname);
  }

  function initThankYouPage() {
    const path = window.location.pathname.replace(/\/$/, "") || "/";
    if (path !== "/bedankt" && path !== "/en/thank-you") return;
    fireLeadConversion("thank_you_page");
  }

  // Formspree no longer reliably honors HTML _next; submit via JSON and redirect ourselves.
  function initContactForms() {
    document.querySelectorAll("form.contact-form").forEach((form) => {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitBtn = form.querySelector('[type="submit"]');
        const nextInput = form.querySelector('input[name="_next"]');
        const isEn = document.documentElement.lang === "en";
        const fallbackNext = isEn
          ? "https://www.willemmartinot.nl/en/thank-you/"
          : "https://www.willemmartinot.nl/bedankt/";
        const nextUrl = (nextInput && nextInput.value) || fallbackNext;

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.setAttribute("aria-busy", "true");
        }

        try {
          const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { Accept: "application/json" },
          });

          if (!response.ok) {
            throw new Error("Formspree error");
          }

          // Prefer same-origin thank-you path when testing locally.
          try {
            const target = new URL(nextUrl, window.location.origin);
            if (
              target.hostname === "www.willemmartinot.nl" &&
              window.location.hostname !== "www.willemmartinot.nl"
            ) {
              window.location.href = target.pathname + (target.pathname.endsWith("/") ? "" : "/");
              return;
            }
          } catch {
            /* use absolute nextUrl */
          }

          window.location.href = nextUrl;
        } catch {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.removeAttribute("aria-busy");
          }
          window.alert(
            isEn
              ? "Sorry, something went wrong sending the form. Please try again or email me@willemmartinot.nl."
              : "Sorry, er ging iets mis bij het versturen. Probeer het opnieuw of mail naar me@willemmartinot.nl."
          );
        }
      });
    });
  }

  function initContactTracking() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;

      const contactAction = link.closest(".contact-action");
      if (contactAction) {
        trackEvent("contact_click", {
          method: contactAction.dataset.contactMethod || "unknown",
          location: contactAction.dataset.contactLocation || "unknown",
        });
      }

      const href = link.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        // Google Ads: Call Clicks from Website
        trackAdsConversion("AW-1064034871/IdqNCMKws3oQt8Sv-wM");
      }
    });
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

  function hydrateHeroImage(slide, eager = false) {
    const img = slide?.querySelector("img");
    if (!img || img.dataset.hydrated === "true") return;

    const dataSrc = img.getAttribute("data-src");
    const dataSrcset = img.getAttribute("data-srcset");
    const dataSizes = img.getAttribute("data-sizes");

    if (!dataSrc && img.getAttribute("src")) {
      img.dataset.hydrated = "true";
      return;
    }

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

    img.loading = eager ? "eager" : "lazy";
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
    const pauseBtn = hero.querySelector(".hero-slider__btn--pause");
    if (!track || !slideElements.length) return;

    const slides = shuffleHeroSlides(
      track,
      slideElements,
      hero.hasAttribute("data-shuffle-all")
    );

    const isEn = document.documentElement.lang === "en";
    const labelPause = isEn ? "Pause slideshow" : "Pauzeer slideshow";
    const labelPlay = isEn ? "Play slideshow" : "Hervat slideshow";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let current = 0;
    let timer;
    let playing = !reduceMotion;
    const INTERVAL = 3000;

    function slideDuration(slide) {
      const raw = slide?.dataset?.duration;
      const n = raw ? Number.parseInt(raw, 10) : NaN;
      return Number.isFinite(n) && n > 0 ? n : INTERVAL;
    }

    function goTo(index) {
      slides[current].classList.remove("is-active");
      current = (index + slides.length) % slides.length;
      hydrateHeroImage(slides[current], true);
      slides[current].classList.add("is-active");
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function stopTimer() {
      clearTimeout(timer);
      timer = null;
    }

    function startTimer() {
      stopTimer();
      if (!playing) return;
      timer = setTimeout(() => {
        next();
        startTimer();
      }, slideDuration(slides[current]));
    }

    function syncPauseButton() {
      if (!pauseBtn) return;
      pauseBtn.setAttribute("aria-pressed", playing ? "false" : "true");
      pauseBtn.setAttribute("aria-label", playing ? labelPause : labelPlay);
      // SVG icons are toggled via CSS [aria-pressed]; plain-text buttons stay as fallback
      if (!pauseBtn.querySelector(".hero-slider__icon")) {
        pauseBtn.textContent = playing ? "❚❚" : "▶";
      }
    }

    function setPlaying(nextPlaying) {
      playing = nextPlaying;
      syncPauseButton();
      if (playing) startTimer();
      else stopTimer();
    }

    hydrateHeroImage(slides[0]);
    syncPauseButton();

    prevBtn?.addEventListener("click", () => {
      prev();
      if (playing) startTimer();
    });

    nextBtn?.addEventListener("click", () => {
      next();
      if (playing) startTimer();
    });

    pauseBtn?.addEventListener("click", () => {
      setPlaying(!playing);
    });

    if (playing) startTimer();

    let touchStartX = 0;
    hero.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    hero.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) {
        dx < 0 ? next() : prev();
        if (playing) startTimer();
      }
    }, { passive: true });
  }

  // By default keep the first (LCP) slide fixed; only shuffle the rest.
  // Homepage can opt into full random order with data-shuffle-all.
  function shuffleHeroSlides(track, slideElements, shuffleAll = false) {
    const slides = Array.from(slideElements);
    let ordered;

    if (shuffleAll) {
      ordered = slides.slice();
      for (let i = ordered.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ordered[i], ordered[j]] = [ordered[j], ordered[i]];
      }
    } else {
      const first = slides[0];
      const rest = slides.slice(1);

      for (let i = rest.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rest[i], rest[j]] = [rest[j], rest[i]];
      }

      ordered = first ? [first, ...rest] : rest;
    }

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

  function initCloudflareAnalytics() {
    if (document.querySelector("script[data-cf-beacon]")) return;
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.setAttribute(
      "data-cf-beacon",
      '{"token":"9255340006774309b3c7927cb3822b89"}'
    );
    document.body.appendChild(script);
  }

  loadPartials();
  initFormNotice();
  initThankYouPage();
  initContactForms();
  initContactTracking();
  initImageProtection();
  initHeroSlider();
  initReviewsCarousel();
  initStaticReviewCollapse();
  initStaticReviewTextToggles();
  initScrollReveal();
  initCloudflareAnalytics();

  function initScrollReveal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const selectors = [
      ".section.intro .container",
      ".clients .container",
      ".content-section .container",
      ".section > .container > .label",
      ".section.section--alt > .container > :not(.label):not(.services-grid)",
      // Do not reveal the whole reviews container: after cards load it is taller than
      // the viewport, so IntersectionObserver thresholds never fire on mobile.
      ".section.faq .container",
      ".blog-section .container",
      ".about-services .container",
    ];

    const elements = new Set();

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add("reveal");
        elements.add(el);
      });
    });

    document.querySelectorAll(".services-grid, .portrait-grid, .testimonials").forEach((grid) => {
      const itemSelector = grid.classList.contains("testimonials")
        ? ".testimonial"
        : grid.classList.contains("portrait-grid")
          ? ".portrait-grid__item"
          : ".service-item";

      grid.querySelectorAll(itemSelector).forEach((item, index) => {
        item.classList.add("reveal");
        const delay = Math.min(index, 5) + 1;
        if (delay > 1) item.classList.add(`reveal--delay-${delay}`);
        elements.add(item);
      });
    });

    if (!elements.size) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      // Use a low threshold so tall sections (e.g. reviews on mobile) can still reveal.
      { threshold: 0.01, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
  }

  function initReviewsCarousel() {
    const section = document.querySelector(".section.reviews");
    const carousel = section?.querySelector(".reviews-carousel");
    if (!section || !carousel || carousel.dataset.bound) return;
    if (carousel.dataset.static === "true") return;

    const track = carousel.querySelector(".reviews-carousel__track");
    if (!track) return;

    carousel.dataset.bound = "true";

    const lang = document.documentElement.lang === "en" ? "en" : "nl";
    const MOBILE_REVIEW_LIMIT = 8;
    const collapseAfter = Number(carousel.dataset.collapseAfter || 0);
    const mobileMq = window.matchMedia("(max-width: 640px)");
    let mobileExpanded = false;
    let desktopExpanded = false;
    const copy = lang === "en"
      ? {
          fromGoogle: "Review from Google",
          ratingLabel: "Google rating",
          moreLabel: "More reviews",
          lessLabel: "Fewer reviews",
          readMore: "Read more…",
          readLess: "Read less",
          showAll: "Show all 12 Google reviews",
          showLess: "Show fewer reviews",
        }
      : {
          fromGoogle: "Review van Google",
          ratingLabel: "Google-beoordeling",
          moreLabel: "Meer reviews",
          lessLabel: "Minder reviews",
          readMore: "Lees meer…",
          readLess: "Lees minder",
          showAll: "Bekijk alle 12 Google reviews",
          showLess: "Toon minder reviews",
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
          ${googleIcon.replace('reviews-carousel__google-icon', 'reviews-header__google-icon')}
          <span class="reviews-header__score">${escapeHtml(String(data.rating))}</span>
          <span class="reviews-header__stars" aria-hidden="true">${stars(data.rating)}</span>
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

    function localizedField(value, fallback = "") {
      if (value && typeof value === "object") {
        return value[lang] || value.nl || value.en || fallback;
      }
      return value || fallback;
    }

    function renderMoreToggle(total) {
      let toggle = carousel.querySelector(".reviews-carousel__more");
      if (total <= MOBILE_REVIEW_LIMIT) {
        toggle?.remove();
        return;
      }
      if (!toggle) {
        toggle = document.createElement("p");
        toggle.className = "reviews-carousel__more";
        toggle.innerHTML = `<button type="button" class="btn-outline reviews-carousel__more-btn" aria-expanded="false">${escapeHtml(copy.moreLabel)}</button>`;
        carousel.appendChild(toggle);
        toggle.querySelector("button").addEventListener("click", () => {
          mobileExpanded = !mobileExpanded;
          applyMobileReviewLimit();
          syncCardHeights();
        });
      }
    }

    function applyMobileReviewLimit() {
      const cards = [...track.querySelectorAll(".reviews-carousel__card")];
      const isMobile = mobileMq.matches;
      const hideOverflow = isMobile && !mobileExpanded;
      cards.forEach((card, index) => {
        card.hidden = hideOverflow && index >= MOBILE_REVIEW_LIMIT;
      });
      requestAnimationFrame(setupTextToggles);

      const toggle = carousel.querySelector(".reviews-carousel__more");
      const btn = toggle?.querySelector("button");
      if (!toggle || !btn) return;

      const needsToggle = isMobile && cards.length > MOBILE_REVIEW_LIMIT;
      toggle.hidden = !needsToggle;
      if (!needsToggle) {
        mobileExpanded = false;
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = copy.moreLabel;
        return;
      }

      btn.setAttribute("aria-expanded", mobileExpanded ? "true" : "false");
      btn.textContent = mobileExpanded ? copy.lessLabel : copy.moreLabel;
    }

    function cardHtml(review, { lazy = false } = {}) {
      const image = localizedField(review.image);
      const alt = escapeHtml(
        localizedField(
          review.imageAlt,
          lang === "en"
            ? `Photo related to review by ${review.author || "client"}`
            : `Foto bij review van ${review.author || "klant"}`
        )
      );
      const position = review.imagePosition
        ? ` style="object-position:${escapeHtml(review.imagePosition)}"`
        : "";
      const loading = lazy ? "lazy" : "eager";
      const img = image
        ? `<img src="${escapeHtml(image)}" alt="${alt}" width="640" height="360" loading="${loading}" decoding="async"${position}>`
        : "";
      const href = localizedField(review.imageHref);
      const mediaInner = href && img
        ? `<a href="${escapeHtml(href)}" class="reviews-carousel__media-link">${img}</a>`
        : img;
      const media = image
        ? `<div class="reviews-carousel__media">${mediaInner}</div>`
        : `<div class="reviews-carousel__media reviews-carousel__media--placeholder" aria-hidden="true"></div>`;
      return `
          <article class="reviews-carousel__card">
            <div class="reviews-carousel__author">
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
            <button type="button" class="reviews-carousel__more-text" hidden aria-expanded="false">${escapeHtml(copy.readMore)}</button>
            ${media}
          </article>
        `;
    }

    function ensureCollapseToggle() {
      let wrap = carousel.querySelector(".reviews-carousel__collapse");
      if (wrap) return wrap;
      wrap = document.createElement("div");
      wrap.className = "reviews-carousel__collapse";
      wrap.innerHTML = `
        <div class="reviews-carousel__extra" hidden>
          <div class="reviews-carousel__track reviews-carousel__track--extra" aria-live="polite"></div>
        </div>
        <p class="reviews-carousel__more reviews-carousel__more--collapse">
          <button type="button" class="btn-outline reviews-carousel__more-btn" aria-expanded="false">${escapeHtml(copy.showAll)}</button>
        </p>`;
      carousel.appendChild(wrap);
      const btn = wrap.querySelector("button");
      btn.addEventListener("click", () => {
        desktopExpanded = !desktopExpanded;
        const extra = wrap.querySelector(".reviews-carousel__extra");
        extra.hidden = !desktopExpanded;
        btn.setAttribute("aria-expanded", desktopExpanded ? "true" : "false");
        btn.textContent = desktopExpanded ? copy.showLess : copy.showAll;
        syncCardHeights();
      });
      return wrap;
    }

    function renderCards(reviews) {
      if (collapseAfter > 0 && reviews.length > collapseAfter) {
        const primary = reviews.slice(0, collapseAfter);
        const extra = reviews.slice(collapseAfter);
        track.innerHTML = primary.map((review) => cardHtml(review, { lazy: false })).join("");
        const wrap = ensureCollapseToggle();
        const extraTrack = wrap.querySelector(".reviews-carousel__track--extra");
        extraTrack.innerHTML = extra.map((review) => cardHtml(review, { lazy: true })).join("");
        wrap.querySelector(".reviews-carousel__extra").hidden = !desktopExpanded;
        const btn = wrap.querySelector("button");
        btn.setAttribute("aria-expanded", desktopExpanded ? "true" : "false");
        btn.textContent = desktopExpanded ? copy.showLess : copy.showAll;
        wrap.querySelector(".reviews-carousel__more--collapse").hidden = false;
      } else {
        track.innerHTML = reviews.map((review) => cardHtml(review, { lazy: false })).join("");
        carousel.querySelector(".reviews-carousel__collapse")?.remove();
      }
      applyMobileReviewLimit();
      requestAnimationFrame(() => {
        setupTextToggles();
        syncCardHeights();
      });
    }

    function allReviewCards() {
      return [...carousel.querySelectorAll(".reviews-carousel__card")];
    }

    function setupTextToggles() {
      allReviewCards().forEach((card) => {
        const text = card.querySelector(".reviews-carousel__text");
        const btn = card.querySelector(".reviews-carousel__more-text");
        if (!text || !btn) return;

        if (!btn.dataset.bound) {
          btn.dataset.bound = "true";
          btn.addEventListener("click", () => {
            const expanded = card.classList.toggle("is-expanded");
            btn.setAttribute("aria-expanded", expanded ? "true" : "false");
            btn.textContent = expanded ? copy.readLess : copy.readMore;
            syncCardHeights();
          });
        }

        if (card.hidden || card.classList.contains("is-expanded")) return;

        btn.setAttribute("aria-expanded", "false");
        btn.textContent = copy.readMore;
        btn.hidden = !(text.scrollHeight > text.clientHeight + 1);
      });
    }

    function equalizeCardHeights() {
      const cards = allReviewCards().filter((card) => !card.hidden && card.offsetParent !== null);
      if (!cards.length) return;
      cards.forEach((card) => {
        card.style.height = "";
      });
      // Single-column layouts don't need equal heights; forcing them makes the
      // section so tall that scroll-reveal never fires on mobile.
      if (mobileMq.matches) return;
      if (track.querySelector(".reviews-carousel__card.is-expanded")) return;
      const columns = getComputedStyle(track).gridTemplateColumns.split(" ").filter(Boolean).length;
      if (columns <= 1) return;
      const maxHeight = Math.max(...cards.map((card) => card.getBoundingClientRect().height));
      if (!maxHeight) return;
      cards.forEach((card) => {
        card.style.height = `${Math.ceil(maxHeight)}px`;
      });
    }

    function whenImagesReady() {
      const images = [...track.querySelectorAll("img")];
      if (!images.length) return Promise.resolve();
      return Promise.all(images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      }));
    }

    function syncCardHeights() {
      whenImagesReady().then(() => {
        requestAnimationFrame(equalizeCardHeights);
      });
    }

    let resizeTimer = 0;
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        applyMobileReviewLimit();
        syncCardHeights();
      }, 150);
    });
    if (typeof mobileMq.addEventListener === "function") {
      mobileMq.addEventListener("change", () => {
        applyMobileReviewLimit();
        syncCardHeights();
      });
    }

    fetch("/data/google-reviews.json")
      .then((response) => {
        if (!response.ok) throw new Error("Reviews fetch failed");
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data.reviews) || !data.reviews.length) return;
        const sorted = [...data.reviews]
          .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
        const isMarcel = (review) => /marcel\s+vermeulen/i.test(review.author || "");
        const marcel = sorted.find(isMarcel);
        // Always keep Marcel Vermeulen as the last card (review 12).
        let reviews = marcel
          ? [...sorted.filter((review) => !isMarcel(review)).slice(0, 11), marcel]
          : sorted.slice(0, 12);

        // Homepage: pin the first visible row order.
        if (collapseAfter > 0) {
          const preferredTop = [
            "Fortus",
            "Marit Buddenbaum",
            "Travel Associates AU",
            "Jerril Strijdhaftig",
          ];
          const byAuthor = new Map(reviews.map((review) => [review.author, review]));
          const top = preferredTop.map((name) => byAuthor.get(name)).filter(Boolean);
          const used = new Set(top.map((review) => review.author));
          const rest = reviews.filter((review) => !used.has(review.author));
          reviews = [...top, ...rest].slice(0, 12);
        }

        renderHeader(data);
        renderCards(reviews);
        if (!(collapseAfter > 0 && reviews.length > collapseAfter)) {
          renderMoreToggle(reviews.length);
        }
        applyMobileReviewLimit();
        syncCardHeights();
      })
      .catch(() => {});
  }

  function initStaticReviewCollapse() {
    document.querySelectorAll(".reviews-carousel[data-static='true'][data-collapse-after]").forEach((carousel) => {
      const extra = carousel.querySelector(".reviews-carousel__extra");
      const btn = carousel.querySelector(".reviews-carousel__more--collapse .reviews-carousel__more-btn");
      if (!extra || !btn || btn.dataset.bound) return;
      btn.dataset.bound = "true";
      const isEn = document.documentElement.lang === "en";
      const showMore = isEn ? "Show more reviews" : "Zie meer reviews";
      const showLess = isEn ? "Show fewer reviews" : "Toon minder reviews";
      btn.addEventListener("click", () => {
        const expanded = extra.hasAttribute("hidden");
        extra.hidden = !expanded;
        btn.setAttribute("aria-expanded", expanded ? "true" : "false");
        btn.textContent = expanded ? showLess : showMore;
        if (expanded) initStaticReviewTextToggles();
      });
    });
  }

  function initStaticReviewTextToggles() {
    document.querySelectorAll(".reviews-carousel[data-static='true'] .reviews-carousel__card").forEach((card) => {
      if (card.hidden || card.closest(".reviews-carousel__extra[hidden]")) return;
      const text = card.querySelector(".reviews-carousel__text");
      const btn = card.querySelector(".reviews-carousel__more-text");
      if (!text || !btn) return;
      if (!btn.dataset.bound) {
        btn.dataset.bound = "true";
        btn.addEventListener("click", () => {
          const expanded = card.classList.toggle("is-expanded");
          btn.setAttribute("aria-expanded", expanded ? "true" : "false");
          const isEn = document.documentElement.lang === "en";
          btn.textContent = expanded
            ? (isEn ? "Read less" : "Lees minder")
            : (isEn ? "Read more…" : "Lees meer…");
        });
      }
      if (card.classList.contains("is-expanded")) return;
      requestAnimationFrame(() => {
        btn.hidden = !(text.scrollHeight > text.clientHeight + 1);
      });
    });
  }

  // Sticky CTA: show on scroll, hide when page CTA is visible
  const stickyCta = document.getElementById("sticky-cta");
  if (stickyCta) {
    const pageCtas = document.querySelectorAll(".btn-outline:not(.event-grid__toggle):not(.reviews-carousel__more-btn):not(.sticky-cta__btn):not(.btn-outline--hero)");
    const lastPageCta = pageCtas.length ? pageCtas[pageCtas.length - 1] : null;
    let stickyVisible = false;

    function updateStickyCta() {
      const scrolled = window.scrollY > 300;
      let ctaInView = false;
      if (lastPageCta) {
        const rect = lastPageCta.getBoundingClientRect();
        ctaInView = rect.top < window.innerHeight && rect.bottom > 0;
      }
      const shouldShow = scrolled && !ctaInView;
      if (shouldShow !== stickyVisible) {
        stickyVisible = shouldShow;
        stickyCta.classList.toggle("is-visible", shouldShow);
        stickyCta.setAttribute("aria-hidden", shouldShow ? "false" : "true");
      }
    }

    window.addEventListener("scroll", updateStickyCta, { passive: true });
    updateStickyCta();
  }

  // Event grid: show/hide extra photos (desktop + mobile)
  document.querySelectorAll(".event-grid__toggle").forEach((btn) => {
    const isEn = document.documentElement.lang === "en";
    const labelMore = btn.textContent.trim();
    const labelLess = isEn ? "Show less" : "Minder foto's";
    const more =
      (btn.getAttribute("aria-controls") && document.getElementById(btn.getAttribute("aria-controls"))) ||
      btn.closest("section, .section--alt")?.querySelector(".event-grid--more");
    if (!more) return;

    function setExpanded(next) {
      more.hidden = !next;
      btn.setAttribute("aria-expanded", next ? "true" : "false");
      btn.textContent = next ? labelLess : labelMore;
    }

    // Keep initial DOM state authoritative (hidden ↔ aria-expanded)
    setExpanded(!more.hidden);

    btn.addEventListener("click", () => {
      setExpanded(btn.getAttribute("aria-expanded") !== "true");
    });

    btn.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (btn.getAttribute("aria-expanded") !== "true") return;
      setExpanded(false);
      btn.focus();
    });
  });

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

    function closeLightbox() {
      lightbox.classList.remove("active");
      lightboxImg.removeAttribute("src");
      lightboxImg.alt = "";
    }

    items.forEach((img, i) => {
      img.addEventListener("click", () => {
        current = i;
        showLightboxImage(img);
        lightbox.classList.add("active");
      });
    });

    lightbox.addEventListener("click", () => closeLightbox());

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
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
