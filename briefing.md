# Cursor Project Briefing — willemmartinot.nl
*Versie 1.0 — Juni 2026*

---

## 1. PROJECTOVERZICHT

Wix-contract loopt af. Doel: statische HTML-site bouwen met Cursor, hosten op Strato. Domein en email blijven onaangetast op Strato. Wix loskoppelen als server zodra de nieuwe site live is.

**Prioriteit:** SEO-kwaliteit eerst, esthetiek tweede.

**Samenwerking:** Cursor bouwt op basis van deze briefing. Beelden worden stap voor stap aangeleverd via placeholders. De briefing is de enige bron van waarheid — niet improviseren buiten deze specificaties.

---

## 2. TECHNISCHE BASIS

### Platform
- Statische HTML/CSS/JS — geen frameworks, geen CMS
- Hosting: Strato shared hosting
- Geen externe libraries tenzij expliciet vermeld
- Vanilla HTML, CSS Grid, vanilla JavaScript

### Taalinstellingen
- `<html lang="nl">` op alle NL-pagina's
- `<html lang="en">` op alle EN-pagina's

### Lokale ontwikkeling
- Bouwen en testen lokaal via Cursor preview (localhost)
- iPhone 15 Pro testen via lokaal IP op zelfde wifi-netwerk
- Upload naar Strato via FTP pas na volledige lokale goedkeuring

---

## 3. SEO-ARCHITECTUUR

### Kritieke regel
Alle huidige URL-slugs exact overnemen. Rankings zijn opgebouwd op deze specifieke URLs. Geen redirects nodig als URLs gelijk blijven.

### Tweetaligheid — aparte HTML-pagina's per taal
```
/index.html                           → NL homepage
/en/index.html                        → EN homepage
/event-fotograaf-den-haag.html        → NL service
/en/event-photographer-the-hague.html → EN service
```

Nooit JavaScript i18n op één URL — Google crawlt dan alleen NL.

### Hreflang-tags — verplicht op elke pagina
```html
<link rel="alternate" hreflang="nl"      href="https://www.willemmartinot.nl/[nl-url]">
<link rel="alternate" hreflang="en"      href="https://www.willemmartinot.nl/en/[en-url]">
<link rel="alternate" hreflang="x-default" href="https://www.willemmartinot.nl/[nl-url]">
```

### Verplichte head-elementen per pagina
```html
<title>[Titel max 55 karakters]</title>
<meta name="description" content="[Description max 155 karakters]">
<link rel="canonical" href="https://www.willemmartinot.nl/[url]">
<link rel="alternate" hreflang="nl" href="...">
<link rel="alternate" hreflang="en" href="...">
<link rel="alternate" hreflang="x-default" href="...">
```

### Sitemap en robots.txt
- `sitemap.xml` aanmaken met alle NL + EN URLs inclusief hreflang-annotaties
- Minimale `robots.txt` aanmaken

---

## 4. VOLLEDIGE URL-STRUCTUUR EN META-DATA

### Pagina-overzicht

| Pagina | NL URL | EN URL |
|--------|--------|--------|
| Homepage | / | /en/ |
| Eventfotograaf DH | /event-fotograaf-den-haag | /en/event-photographer-the-hague |
| Eventfotograaf AMS | /eventfotograaf-amsterdam | /en/eventfotograaf-amsterdam |
| Eventfotograaf RTD | /eventfotograaf-rotterdam | /en/eventfotograaf-rotterdam |
| Congresfotograaf DH | /congresfotograaf-den-haag | /en/conference-photographer-the-hague |
| Portretfotograaf DH | /portretfotograaf-den-haag | /en/portretfotograaf-den-haag |
| Portretfotograaf AMS | /portretfotograaf-amsterdam | /en/portretfotograaf-amsterdam |
| Portretfotograaf RTD | /portretfotograaf-rotterdam | /en/portretfotograaf-rotterdam |
| Fotograaf AMS | /fotograaf-amsterdam | /en/fotograaf-amsterdam |
| Fotograaf RTD | /fotograaf-rotterdam | /en/fotograaf-rotterdam |
| LinkedIn DH | /linkedin-profielfoto-den-haag | /en/linkedin-portrait-the-hague |
| Bedrijfsfotograaf DH | /bedrijfsfotograaf-den-haag | /en/corporate-photographer-the-hague |
| Concertfotograaf | /concertfotograaf-den-haag | /en/concert-photographer-the-hague |
| Fashion | /mode-fotograaf-den-haag | /en/fashion-photographer-the-hague |
| About | /about-fotograaf-den-haag | /en/about |
| Contact | /contact | /en/contact |
| Tarieven | /tarieven | /en/rates |
| Blog | /blog-fotograaf-den-haag | /en/blog |

### Titles en meta descriptions

| Pagina | Titel NL | Description NL |
|--------|----------|----------------|
| Homepage | Zakelijk fotograaf Den Haag \| Willem Martinot | Zakelijk fotograaf in Den Haag voor corporate events, congresfotografie en portretten. Ervaren en betrouwbaar, met stijl en oog voor detail. |
| Homepage EN | Corporate Photographer The Hague \| Willem Martinot | Business photographer in The Hague for corporate events, portraits and conferences. Experienced, reliable, with an eye for detail. |
| Events DH | Zakelijk eventfotograaf Den Haag \| Willem Martinot | Zakelijk eventfotograaf in Den Haag voor congressen en corporate events. Oog voor sfeer, interactie en de cruciale momenten. Ervaren en betrouwbaar. |
| Events DH EN | Corporate Event Photographer The Hague \| Willem Martinot | Corporate event photographer in The Hague for conferences and business events. An eye for atmosphere, interaction and key moments. Experienced and reliable. |
| Events AMS | Zakelijk eventfotograaf Amsterdam \| Willem Martinot | Zakelijk eventfotograaf in Amsterdam voor congressen en corporate events. Oog voor sfeer, interactie en de cruciale momenten. Ervaren en betrouwbaar. |
| Events AMS EN | Corporate Event Photographer Amsterdam \| Willem Martinot | Corporate event photographer in Amsterdam for conferences and business events. An eye for atmosphere, interaction and key moments. Experienced and reliable. |
| Events RTD | Zakelijk eventfotograaf Rotterdam \| Willem Martinot | Zakelijk eventfotograaf in Rotterdam voor congressen en corporate events. Oog voor sfeer, interactie en de cruciale momenten. Ervaren en betrouwbaar. |
| Events RTD EN | Corporate Event Photographer Rotterdam \| Willem Martinot | Corporate event photographer in Rotterdam for conferences and business events. An eye for atmosphere, interaction and key moments. Experienced and reliable. |
| Congres DH | Congresfotograaf Den Haag \| Willem Martinot | Congresfotograaf in Den Haag voor internationale conferenties, summits en meerdaagse congressen. Ervaren op grote locaties zoals World Forum The Hague. |
| Congres DH EN | Conference Photographer The Hague \| Willem Martinot | Conference photographer in The Hague for international summits and multi-day congresses. Experienced at major venues including World Forum The Hague. |
| Portret DH | Zakelijk portretfotograaf Den Haag \| Willem Martinot | Zakelijk portretfotograaf in Den Haag voor bedrijfsportretten en teamfoto's. Ontspannen aanpak, tijdloze beelden. Ervaren en betrouwbaar. |
| Portret DH EN | Corporate Portrait Photographer The Hague \| Willem Martinot | Business portrait photographer in The Hague for corporate portraits and team photography. A relaxed approach, timeless results. Experienced and reliable. |
| Portret AMS | Zakelijk portretfotograaf Amsterdam \| Willem Martinot | Zakelijk portretfotograaf in Amsterdam voor bedrijfsportretten en teamfoto's. Ontspannen aanpak, tijdloze beelden. Ervaren en betrouwbaar. |
| Portret AMS EN | Corporate Portrait Photographer Amsterdam \| Willem Martinot | Business portrait photographer in Amsterdam for corporate portraits and team photography. A relaxed approach, timeless results. Experienced and reliable. |
| Portret RTD | Zakelijk portretfotograaf Rotterdam \| Willem Martinot | Zakelijk portretfotograaf in Rotterdam voor bedrijfsportretten en teamfoto's. Ontspannen aanpak, tijdloze beelden. Ervaren en betrouwbaar. |
| Portret RTD EN | Corporate Portrait Photographer Rotterdam \| Willem Martinot | Business portrait photographer in Rotterdam for corporate portraits and team photography. A relaxed approach, timeless results. Experienced and reliable. |
| Fotograaf AMS | Zakelijk fotograaf Amsterdam \| Willem Martinot | Zakelijk fotograaf in Amsterdam voor corporate events, congressen en bedrijfsportretten. Ervaren en betrouwbaar, met stijl en oog voor detail. |
| Fotograaf AMS EN | Corporate Photographer Amsterdam \| Willem Martinot | Business photographer in Amsterdam for corporate events, conferences and business portraits. Experienced, reliable, with an eye for detail. |
| Fotograaf RTD | Zakelijk fotograaf Rotterdam \| Willem Martinot | Zakelijk fotograaf in Rotterdam voor corporate events, congressen en bedrijfsportretten. Ervaren en betrouwbaar, met stijl en oog voor detail. |
| Fotograaf RTD EN | Corporate Photographer Rotterdam \| Willem Martinot | Business photographer in Rotterdam for corporate events, conferences and business portraits. Experienced, reliable, with an eye for detail. |
| LinkedIn DH | LinkedIn profielfoto Den Haag \| Willem Martinot | Professionele LinkedIn profielfoto in Den Haag voor ondernemers, professionals en expats. Natuurlijke uitstraling, efficiënte sessie, snelle levering. |
| LinkedIn DH EN | LinkedIn Portrait Photographer The Hague \| Willem Martinot | Professional LinkedIn portrait photographer in The Hague for executives, professionals and expats. Natural results, efficient session, fast delivery. |
| Bedrijfsfotograaf DH | Bedrijfsfotograaf Den Haag \| Willem Martinot | Bedrijfsfotograaf in Den Haag voor reportages, werksituaties en brandingbeelden. Visuele content voor websites, jaarverslagen en campagnes. |
| Bedrijfsfotograaf DH EN | Corporate Photographer The Hague \| Willem Martinot | Corporate photographer in The Hague for business reportages, workplace photography and branding images. Visual content for websites and campaigns. |
| Concert DH | Concertfotograaf Den Haag \| Willem Martinot | Concertfotograaf in Den Haag voor festivals en livemuziek. Ervaring bij North Sea Jazz en andere grote productie. Scherp oog voor het cruciale moment. |
| Concert DH EN | Concert Photographer The Hague \| Willem Martinot | Concert photographer in The Hague for festivals and live music events. Experience at North Sea Jazz and major productions. |
| Fashion DH | Modefotograaf Den Haag \| Willem Martinot | Modefotograaf in Den Haag voor fashion editorial, lookbooks en persoonlijke stijlprojecten. Filmische aanpak, hoogwaardige beeldkwaliteit. |
| Fashion DH EN | Fashion Photographer The Hague \| Willem Martinot | Fashion photographer in The Hague for editorial, lookbooks and personal style projects. Cinematic approach, high-end image quality. |
| About | Over Willem Martinot — fotograaf Den Haag | Zakelijk fotograaf in Den Haag met jarenlange ervaring voor multinationals, ambassades en culturele organisaties in de Randstad en daarbuiten. |
| About EN | About Willem Martinot — photographer The Hague | Business photographer in The Hague with extensive experience for multinationals, embassies and cultural organisations across the Netherlands. |
| Contact | Contact — Willem Martinot fotograaf Den Haag | Neem contact op voor een offerte of meer informatie over zakelijke fotografie in Den Haag, Amsterdam of Rotterdam. |
| Contact EN | Contact — Willem Martinot photographer The Hague | Get in touch for a quote or more information about corporate photography in The Hague, Amsterdam or Rotterdam. |
| Tarieven | Tarieven zakelijke fotografie — Willem Martinot | Transparante tarieven voor eventfotografie, portretfotografie en bedrijfsfotografie in Den Haag en de Randstad. |
| Tarieven EN | Rates corporate photography — Willem Martinot | Transparent rates for event photography, portrait photography and corporate photography in The Hague and the Randstad. |
| Blog | Blog — Willem Martinot fotograaf Den Haag | Artikelen over zakelijke fotografie, tips voor opdrachtgevers en achtergronden bij shoots in Den Haag, Amsterdam en Rotterdam. |
| Blog EN | Blog — Willem Martinot photographer The Hague | Articles about corporate photography, tips for clients and backgrounds on shoots in The Hague, Amsterdam and Rotterdam. |

---

## 5. JSON-LD SCHEMAS

### Homepage NL — twee scripts in head
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Willem Martinot Fotograaf",
  "alternateName": "Willem Martinot Photographer",
  "url": "https://www.willemmartinot.nl/"
}
```
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Willem Martinot Fotograaf",
  "url": "https://www.willemmartinot.nl/",
  "logo": "https://www.willemmartinot.nl/images/logo-willem-martinot-fotograaf.jpg",
  "telephone": "+31611303070",
  "email": "me@willemmartinot.nl",
  "description": "Zakelijk fotograaf in Den Haag voor corporate events, congressen en bedrijfsportretten. Ervaren en betrouwbaar, met stijl en oog voor detail.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Gentsestraat 121B",
    "addressLocality": "Den Haag",
    "postalCode": "2587 HM",
    "addressCountry": "NL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 52.1093,
    "longitude": 4.2965
  },
  "sameAs": [
    "https://www.instagram.com/willemmartinot",
    "https://www.linkedin.com/in/willemmartinot/"
  ]
}
```

### Homepage EN — alleen LocalBusiness
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Willem Martinot Photographer",
  "url": "https://www.willemmartinot.nl/",
  "logo": "https://www.willemmartinot.nl/images/logo-willem-martinot-photographer.jpg",
  "telephone": "+31611303070",
  "email": "me@willemmartinot.nl",
  "description": "Business photographer in The Hague for corporate events, conferences and business portraits. Experienced, reliable, with an eye for detail.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Gentsestraat 121B",
    "addressLocality": "The Hague",
    "postalCode": "2587 HM",
    "addressCountry": "NL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 52.1093,
    "longitude": 4.2965
  },
  "sameAs": [
    "https://www.instagram.com/willemmartinot",
    "https://www.linkedin.com/in/willemmartinot/"
  ]
}
```

### Service pagina's — patroon
NL:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[SERVICE_NL] [STAD_NL]",
  "serviceType": "[SERVICE_NL]",
  "description": "[meta description NL]",
  "areaServed": {"@type": "City", "name": "[STAD_NL]"},
  "provider": {
    "@type": "LocalBusiness",
    "name": "Willem Martinot Fotograaf",
    "url": "https://www.willemmartinot.nl/",
    "telephone": "+31611303070",
    "email": "me@willemmartinot.nl"
  }
}
```

---

## 6. HUISSTIJL EN TYPOGRAFIE

### Logo
- Lettertype: Bozon Black — zelfgehost als woff2 op Strato
- Subtitel "PHOTOGRAPHER": Roboto — Google Fonts
- Bestand: `/fonts/bozon-black.woff2`
- Implementatie via @font-face, geen PNG

```css
@font-face {
  font-family: "Bozon";
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url("/fonts/bozon-black.woff2") format("woff2");
}
```

### Fontstack
```
Logo:       Bozon Black — zelfgehost
Subtitel:   Roboto — Google Fonts
Body:       Epilogue Light (300) — Google Fonts, 16px
Navigatie:  Epilogue Light (300), letter-spacing: 0.08em
Labels:     Epilogue Light (300), 11px uppercase, letter-spacing: 0.12em
```

Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@300;400;500&family=Roboto:wght@300;400&display=swap" rel="stylesheet">
```

### Kleurpalet
```
Achtergrond primair:    #ffffff
Achtergrond secties:    #fafaf8
Tekst primair:          #1a1a1a
Tekst secundair:        #767676
Borders/dividers:       #e8e8e5
Accentkleur:            geen — fotografie levert alle kleur
```

### Typografische schaal
```css
h1 { font-size: clamp(1.8rem, 4vw, 3.2rem); font-weight: 300; }
h2 { font-size: clamp(1.3rem, 2.5vw, 2rem); font-weight: 300; }
h3 { font-size: clamp(1rem, 1.8vw, 1.4rem); font-weight: 400; }
p  { font-size: clamp(0.9rem, 1.5vw, 1rem); font-weight: 300; line-height: 1.7; }
```

---

## 7. NAVIGATIE

### Structuur
Alle huidige navigatie-items behouden — elke item is een interne link naar een rankende landingspagina.

```
Primaire items:   Events | Portret | LinkedIn | Corporate | Congres | Video | Contact
Secundaire items: Tarieven | Blog | About
Dropdown Events:  Den Haag | Amsterdam | Rotterdam
Dropdown Portret: Den Haag | Amsterdam | Rotterdam
Dropdown Diensten: Concerts | Fashion
```

### Desktop — transparante overlay op hero
```css
.navbar {
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  position: fixed;
  width: 100%;
  z-index: 100;
  transition: background 0.3s ease;
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.98);
}

/* Tekst wit boven foto, donker na scroll */
.navbar.scrolled .nav-link { color: #1a1a1a; }
```

### Mobile — hamburger menu
- Hamburger icoon rechts
- Overlay menu fullscreen bij open
- Alle nav-items zichtbaar in overlay
- Geen dropdown op mobile — alles uitgevouwen

### Taalswitch
- NL / EN — tekstlinks, geen vlaggen
- Positie: uiterst rechts in navigatiebalk

---

## 8. HOMEPAGE STRUCTUUR

### Sectie 1 — Hero
- Eerste afbeelding: `fetchpriority="high"`, geen `loading="lazy"`
- Volledig scherm, navigatie transparant over foto
- Minimale tekstoverlay: naam + één tagline, onderin of zijkant
- Geen grote gekleurde banners of overlay-blokken

### Sectie 2 — Intro
- Witte achtergrond
- Naam, één zin diensten, klantnamen als social proof
- Klantennamen: FS-ISAC, North Sea Jazz, DP World, Yamaha, Douwe Egberts
- Geen checkmarks, geen bullets
- CTA: tekstlink "Offerte aanvragen →"

### Sectie 3 — Dienstengrid
Zes items, twee rijen van drie, rechte hoeken:

```css
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.service-item img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 0;
}

.service-item h3 {
  font-family: 'Epilogue', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  margin: 12px 0 6px;
  color: #1a1a1a;
}

.service-item p {
  font-size: 0.875rem;
  color: #767676;
  line-height: 1.5;
}

/* Tablet */
@media (max-width: 1024px) {
  .services-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Mobile */
@media (max-width: 768px) {
  .services-grid { grid-template-columns: 1fr; }
}
```

Zes diensten:
1. Eventfotografie → /event-fotograaf-den-haag
2. Congresfotografie → /congresfotograaf-den-haag
3. Portretfotografie → /portretfotograaf-den-haag
4. LinkedIn portret → /linkedin-profielfoto-den-haag
5. Bedrijfsfotografie → /bedrijfsfotograaf-den-haag
6. Videoproductie → /bedrijfsfilms

### Sectie 4 — Testimonials
Twee quotes, clean, geen kaartjes:
- Junior van der Stel, Commercial Manager — North Sea Jazz Festival Rotterdam
- Maartje Abrahams, Key Account Manager — Douwe Egberts Professional

### Sectie 5 — Elfsight Reviews
```html
<script src="https://static.elfsight.com/platform/platform.js"></script>
<div class="elfsight-app-[ID]"></div>
```

### Sectie 6 — Blog
Drie recentste posts, minimale weergave: foto, titel, datum, tekstlink.

### Sectie 7 — Footer
Zie sectie 12.

---

## 9. PORTFOLIO GRIDS

### Eventpagina en Congresfotograaf
Één hero-foto volledig breed bovenaan, daarna gestructureerd grid:

```css
.event-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: clamp(6px, 1vw, 12px);
}

.col-8 { grid-column: span 8; }
.col-4 { grid-column: span 4; }

/* Ritme: */
/* Rij A: col-8 + col-4 */
/* Rij B: col-4 + col-4 + col-4 */
/* Rij C: col-4 + col-8 */
/* Herhaal */

/* Tablet */
@media (max-width: 1024px) {
  .col-8, .col-4 { grid-column: span 6; }
}

/* Mobile */
@media (max-width: 768px) {
  .col-8, .col-4 { grid-column: span 12; }
}
```

### Portretpagina
Drie kolommen uniform, portrait ratio:

```css
.portrait-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(8px, 1.5vw, 16px);
}

.portrait-grid img {
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
}

/* Tablet */
@media (max-width: 1024px) {
  .portrait-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Mobile */
@media (max-width: 768px) {
  .portrait-grid { grid-template-columns: 1fr; }
}
```

### Hover-caption op alle grids
```css
.grid-item { position: relative; overflow: hidden; }

.grid-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 0.75rem;
  font-family: 'Epilogue', sans-serif;
  font-weight: 300;
  letter-spacing: 0.06em;
  padding: 8px 12px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.grid-item:hover .grid-caption { opacity: 1; }
```

Caption-format: `Locatie — type opdracht` (geen echte klantnamen bij individuen)

### Lightbox — alle foto's in DOM
Alle afbeeldingen in de DOM geladen bij pageload — niet via JavaScript carousel of lazy-load slideshow. Kritiek voor Google-indexering van alle afbeeldingen.

```javascript
// Vanilla lightbox — max 25 regels
const items = document.querySelectorAll('.grid-item img');
const overlay = document.getElementById('lightbox');
const lightboxImg = overlay.querySelector('img');
let current = 0;

items.forEach((img, i) => {
  img.addEventListener('click', () => {
    current = i;
    lightboxImg.src = img.src;
    overlay.classList.add('active');
  });
});

overlay.addEventListener('click', () => overlay.classList.remove('active'));

document.addEventListener('keydown', (e) => {
  if (!overlay.classList.contains('active')) return;
  if (e.key === 'Escape') overlay.classList.remove('active');
  if (e.key === 'ArrowRight') { current = (current + 1) % items.length; lightboxImg.src = items[current].src; }
  if (e.key === 'ArrowLeft')  { current = (current - 1 + items.length) % items.length; lightboxImg.src = items[current].src; }
});
```

---

## 10. AFBEELDINGEN — VOLLEDIG SYSTEEM

### Mappenstructuur op Strato
```
/images/
  /nl/
    /800/     ← mobile
    /1200/    ← tablet/desktop
    /1920/    ← groot desktop / retina
  /en/
    /800/
    /1200/
    /1920/
  /placeholder-800.jpg
  /placeholder-1200.jpg
  /placeholder-1920.jpg
```

### Bestandsnaamconventie
Format: `[cameranummer]-[seo-beschrijving].jpg`

Voorbeelden:
```
1V3A9556-congresfotograaf-den-haag-keynote-world-forum.jpg
1V3A9556-conference-photographer-the-hague-keynote-world-forum.jpg
5I2A2677-congresfotograaf-den-haag-spreker-katheder.jpg
```

Regels:
- Altijd cameranummer als prefix — houdt link naar origineel
- Koppeltekens, geen underscores, geen spaties
- Altijd lowercase
- Altijd .jpg (geen .jpeg)
- Nooit generiek ("foto1.jpg", "image.jpg")
- NL-bestandsnamen in /nl/, EN-bestandsnamen in /en/

### Lightroom exportpresets per categorie
Per categorie twee taalpresets, drie resoluties = zes exports:

```
Preset "Congres NL 800":   {Bestandsnaam}-congresfotograaf-den-haag.jpg → /images/nl/800/
Preset "Congres NL 1200":  {Bestandsnaam}-congresfotograaf-den-haag.jpg → /images/nl/1200/
Preset "Congres NL 1920":  {Bestandsnaam}-congresfotograaf-den-haag.jpg → /images/nl/1920/
Preset "Congres EN 800":   {Bestandsnaam}-conference-photographer-the-hague.jpg → /images/en/800/
Preset "Congres EN 1200":  {Bestandsnaam}-conference-photographer-the-hague.jpg → /images/en/1200/
Preset "Congres EN 1920":  {Bestandsnaam}-conference-photographer-the-hague.jpg → /images/en/1920/
```

### HTML img-element — standaard
```html
<img
  src="/images/nl/1200/[bestandsnaam-nl].jpg"
  srcset="
    /images/nl/800/[bestandsnaam-nl].jpg   800w,
    /images/nl/1200/[bestandsnaam-nl].jpg 1200w,
    /images/nl/1920/[bestandsnaam-nl].jpg 1920w"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="[alt NL]"
  width="1920" height="1280"
  loading="lazy"
  decoding="async">
```

### Hero-afbeelding — afwijkend
```html
<img
  src="/images/nl/1920/[hero-bestandsnaam].jpg"
  srcset="
    /images/nl/800/[hero-bestandsnaam].jpg   800w,
    /images/nl/1200/[hero-bestandsnaam].jpg 1200w,
    /images/nl/1920/[hero-bestandsnaam].jpg 1920w"
  sizes="100vw"
  alt="[alt NL]"
  width="1920" height="1280"
  fetchpriority="high">
```
Geen `loading="lazy"` op hero.

### Placeholders — werkwijze
Cursor bouwt HTML met definitieve bestandsnamen en definitieve alt-teksten. Tijdelijk verwijst src naar placeholder:

```html
<img
  src="/images/placeholder-1200.jpg"
  data-final-src="/images/nl/1200/[definitieve-bestandsnaam].jpg"
  alt="[definitieve alt-tekst]"
  ...>
```

Zodra het echte bestand op het definitieve pad staat, vervang `src` door de definitieve waarde. Geen andere code hoeft te wijzigen.

### Beeldtabel per pagina — format voor Cursor
Cursor krijgt per pagina een tabel:

```
BEELDTABEL — congresfotograaf-den-haag.html

bestandsnaam NL (1200)                              | bestandsnaam EN (1200)                                    | alt NL                                               | alt EN
1V3A9556-congresfotograaf-den-haag.jpg             | 1V3A9556-conference-photographer-the-hague.jpg           | Congresfotograaf Den Haag — keynote World Forum      | Conference photographer The Hague — keynote World Forum
1V3A9584-congresfotograaf-den-haag-zaal.jpg        | 1V3A9584-conference-photographer-the-hague-hall.jpg      | Congresfotografie World Forum — internationale zaal  | Conference photography World Forum — international hall
5I2A2677-congresfotograaf-den-haag-spreker.jpg     | 5I2A2677-conference-photographer-the-hague-speaker.jpg   | Congresfotograaf Den Haag — spreker achter katheder  | Conference photographer The Hague — speaker at podium
5I2A2776-congresfotograaf-den-haag-qa.jpg          | 5I2A2776-conference-photographer-the-hague-qa.jpg        | Congresfotografie — Q&A sessie internationaal congres| Conference photography — Q&A session international congress
5I2A2911-congresfotograaf-den-haag-networking.jpg  | 5I2A2911-conference-photographer-the-hague-networking.jpg| Congresfotografie networking — deelnemers Den Haag   | Conference photography networking — delegates The Hague
1V3A9625-congresfotograaf-den-haag-volle-zaal.jpg  | 1V3A9625-conference-photographer-the-hague-full-hall.jpg | Congresfotograaf Den Haag — volle zaal summit        | Conference photographer The Hague — full hall summit
5I2A2599-congresfotograaf-den-haag-podium.jpg      | 5I2A2599-conference-photographer-the-hague-stage.jpg     | Congresfotografie — keynote presentatie groot podium | Conference photography — keynote presentation main stage
5I2A2479-congresfotograaf-den-haag-spreker-podium.jpg | 5I2A2479-conference-photographer-the-hague-speaker-stage.jpg | Congresfotograaf Den Haag — spreker podium World Forum | Conference photographer The Hague — speaker World Forum
1V3A9542-congresfotograaf-den-haag-avond.jpg       | 1V3A9542-conference-photographer-the-hague-evening.jpg   | Congresfotografie avond — internationale summit      | Conference photography evening — international summit
```

---

## 11. GRID — CONGRESFOTOGRAAF PAGINA

Bewust samengesteld ritme op basis van aangeleverde FS-ISAC beelden:

```
col-8:  1V3A9556  (CEO op podium — sterkste beeld)
col-4:  5I2A2677  (portret aan katheder)
col-4:  5I2A2479  (spreker staand, portretformaat)
col-8:  1V3A9625  (volle zaal van boven)
col-4:  5I2A2776  (Q&A publiek)
col-4:  5I2A2911  (networking)
col-4:  5I2A2599  (podium met screen)
col-8:  1V3A9542  (avondshot zaal)
col-4:  1V3A9584  (zijhoek zaal)
```

---

## 12. COMPONENTEN

### Contactformulier — Strato PHP
```html
<form action="/mail.php" method="POST">
  <input type="text"  name="naam"    placeholder="Naam"          required>
  <input type="email" name="email"   placeholder="E-mailadres"   required>
  <input type="tel"   name="telefoon" placeholder="Telefoonnummer">
  <select name="dienst">
    <option>Eventfotografie</option>
    <option>Congresfotografie</option>
    <option>Portretfotografie</option>
    <option>LinkedIn portret</option>
    <option>Bedrijfsfotografie</option>
    <option>Videoproductie</option>
    <option>Anders</option>
  </select>
  <textarea name="bericht" placeholder="Toelichting" rows="5"></textarea>
  <button type="submit">Versturen</button>
</form>
```

Cursor maakt ook `mail.php` aan voor Strato PHP-verwerking met mail() naar me@willemmartinot.nl.

### Elfsight Reviews
```html
<script src="https://static.elfsight.com/platform/platform.js" async></script>
<div class="elfsight-app-[ID]"></div>
```

### Video — Vimeo embed zonder branding
```html
<div class="video-wrapper">
  <iframe
    src="https://player.vimeo.com/video/[ID]?title=0&byline=0&portrait=0&badge=0&dnt=1"
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
    loading="lazy">
  </iframe>
</div>
```

```css
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
}
.video-wrapper iframe {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
}
```

---

## 13. FOOTER

### Structuur — exact overnemen van huidige site

Linkerkolom — SEO-interne links:
```
Events:           Den Haag | Amsterdam | Rotterdam
Portret:          Den Haag | Amsterdam | Rotterdam
LinkedIn Portret: Den Haag | Amsterdam | Rotterdam
Bedrijfsfotograaf: Den Haag
Congresfotograaf: Den Haag
```

Middenkolom:
- Logo (Bozon Black, schaalbaar SVG of HTML-tekst)
- NL / EN taalswitch
- Portretfoto Willem Martinot
- Telefoonnummer: +31 06 11 30 30 70
- Email: me@willemmartinot.nl
- Social icons: Instagram, LinkedIn, Facebook, Pinterest, Yelp, Behance

Rechterkolom — informatielinks:
```
Info:       About | Contact | Tarieven | Blog
Diensten:   Fashion & Editorial | Concertfotografie | Videoproductie
```

### Stijl
- Achtergrond: #ffffff
- Categoriekoppen: #1a1a1a, Epilogue 400, geen goudkleur
- Links: #767676, Epilogue Light 300
- Geen border-radius op elementen
- Copyright: © [jaar] Willem Martinot — jaar automatisch via JavaScript

---

## 14. RESPONSIEF — BREAKPOINTS

```css
/* Container */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(24px, 4vw, 80px);
}

/* Breakpoints */
/* Desktop groot:  > 1400px — max-width container actief */
/* Desktop:        1024px–1400px — volledig grid */
/* Tablet:         768px–1024px — 2 kolommen grids */
/* Mobile:         < 768px — 1 kolom, hamburger nav */

/* iPhone 15 Pro specifiek: 393px viewport */
/* Alle grids worden single column */
/* Hero altijd full-width, geen padding */
/* Navigatie hamburger overlay */
```

---

## 15. PRIORITEITSVOLGORDE — BEELDFASES

```
Fase 1:  Homepage          — 8 à 10 hero-kwaliteitsbeelden, alle formaten, beide talen
Fase 2:  Congresfotograaf  — FS-ISAC beelden gereed, direct te bouwen
Fase 3:  Portret Den Haag  — meest bezochte servicepagina
Fase 4:  Event Den Haag    — tweede meest bezocht
Fase 5:  Overige pagina's  — placeholders tot aanlevering
```

---

## 16. OVERSTAP-PROTOCOL WIX → STRATO

```
1. Site volledig bouwen en lokaal testen
2. Testen op iPhone 15 Pro via lokaal IP
3. Upload naar Strato via FTP
4. Testen op tijdelijk Strato-URL
5. Wix loskoppelen als server
6. Domein in Strato wijzen naar nieuwe map
7. Sitemap indienen bij Google Search Console
8. Downtime: nul — DNS propagatie tijdens switch
```

Kritiek: DNS-wijziging pas nadat Strato volledig geconfigureerd en getest is.

---

## 17. INITIËLE CURSOR-PROMPT

Gebruik deze prompt om het project te starten:

```
Bouw willemmartinot.nl als statische HTML-site op basis van de 
aangeleverde briefing. 

Structuur: aparte /en/ map voor alle Engelse pagina's. 

Elke pagina krijgt: title tag max 55 karakters keyword-first, 
meta description max 155 karakters, canonical tag, hreflang-tags 
NL+EN+x-default, JSON-LD schema in de head.

Fonts: Bozon Black via @font-face als logo-font uit /fonts/bozon-black.woff2, 
Roboto en Epilogue via Google Fonts.

Navigatie: transparant over hero-afbeelding met rgba(0,0,0,0.25) en 
backdrop-filter blur, wordt wit na scroll. Hamburger op mobile.

Afbeeldingen: srcset met drie resoluties (800w, 1200w, 1920w) uit 
aparte /images/nl/ en /images/en/ mappen. Hero zonder loading=lazy 
en met fetchpriority=high. Alle overige afbeeldingen loading=lazy 
decoding=async. Geen externe image libraries. Alt-teksten exact zoals 
aangeleverd in de beeldtabel per pagina.

Placeholders: tijdelijk src naar /images/placeholder-1200.jpg, 
definitieve bestandsnaam in data-final-src attribuut.

Portfolio grids: CSS Grid, geen externe library. Event-grid op 
12-kolommen basis met col-8 en col-4 items. Portrait-grid 3 kolommen 
uniform. Hover-caption met locatie en type opdracht. Lightbox in 
vanilla JavaScript max 25 regels, pijltoetsnavigatie, ESC sluiten.

Contactformulier: HTML form met action naar mail.php, inclusief 
mail.php voor Strato PHP-verwerking.

Alle afbeeldingen in DOM geladen bij pageload — geen carousel, 
geen slideshow als primaire weergave.

html lang=nl op NL-pagina's, html lang=en op EN-pagina's.
Max-width container: 1400px. Hosting: Strato.

Begin met index.html en /en/index.html. 
Gebruik de volledige briefing als enige bron van waarheid.
```

---

*Briefing samengesteld in samenwerking met Claude — Juni 2026*
*Volgende stap: Cursor opstarten, projectmap aanmaken, bozon-black.woff2 aanleveren*
