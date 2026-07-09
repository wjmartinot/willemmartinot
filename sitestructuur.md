# Sitestructuur — willemmartinot.nl

*Controledocument — gegenereerd juni 2026*  
*Bron van waarheid voor URLs en SEO: `briefing.md`*

Dit document is bedoeld om alles te dubbelchecken vóór we verder bouwen.  
**Status legenda:** ✅ gebouwd · ⬜ nog te bouwen · ⚠️ aandachtspunt

---

## 1. Algemene opzet

| Onderdeel | Waarde |
|-----------|--------|
| Domein (live, nu Wix) | `https://www.willemmartinot.nl` |
| Taal NL | Root: `/` |
| Taal EN | Submap: `/en/` |
| Techniek | Statische HTML/CSS/JS — geen CMS |
| Navigatie | Gedeelde partials (`partials/hero-header-*.html`, `partials/footer-*.html`) |
| Lokale preview | `python3 -m http.server 3000` → `http://localhost:3000` |
| Beeldworkflow | Jij levert 1× high-res → `resize-images.sh` schaalt naar 800 / 1200 / 1920 px |

### Belangrijke SEO-regel
Alle URL-slugs uit de huidige Wix-site **exact overnemen**. Geen redirects nodig als de URLs gelijk blijven.

### Tweetaligheid
Aparte HTML-pagina's per taal — **geen** JavaScript-taalwissel op één URL.  
Elke pagina heeft `hreflang`-tags (nl, en, x-default).

**EN-slugs:** alle Engelse pagina's krijgen natuurlijke Engelse URL-slugs (geen Nederlandse spiegels meer). NL-slugs blijven exact gelijk aan de huidige Wix-site.

---

## 2. Volledige paginastructuur (NL ↔ EN)

| # | Pagina | NL URL | EN URL | Status NL | Status EN |
|---|--------|--------|--------|-----------|-----------|
| 1 | Homepage | `/` | `/en/` | ✅ | ✅ |
| 2 | Eventfotograaf Den Haag | `/event-fotograaf-den-haag/` | `/en/event-photographer-the-hague/` | ✅ | ✅ |
| 3 | Eventfotograaf Amsterdam | `/eventfotograaf-amsterdam/` | `/en/event-photographer-amsterdam/` | ⬜ | ⬜ |
| 4 | Eventfotograaf Rotterdam | `/eventfotograaf-rotterdam/` | `/en/event-photographer-rotterdam/` | ⬜ | ⬜ |
| 5 | Congresfotograaf Den Haag | `/congresfotograaf-den-haag/` | `/en/conference-photographer-the-hague/` | ⬜ | ⬜ |
| 6 | Portretfotograaf Den Haag | `/portretfotograaf-den-haag/` | `/en/corporate-portrait-photographer-the-hague/` | ⬜ | ⬜ |
| 7 | Portretfotograaf Amsterdam | `/portretfotograaf-amsterdam/` | `/en/corporate-portrait-photographer-amsterdam/` | ⬜ | ⬜ |
| 8 | Portretfotograaf Rotterdam | `/portretfotograaf-rotterdam/` | `/en/corporate-portrait-photographer-rotterdam/` | ⬜ | ⬜ |
| 9 | Fotograaf Amsterdam | `/fotograaf-amsterdam/` | `/en/corporate-photographer-amsterdam/` | ⬜ | ⬜ |
| 10 | Fotograaf Rotterdam | `/fotograaf-rotterdam/` | `/en/corporate-photographer-rotterdam/` | ⬜ | ⬜ |
| 11 | LinkedIn profielfoto DH | `/linkedin-profielfoto-den-haag/` | `/en/linkedin-portrait-the-hague/` | ⬜ | ⬜ |
| 12 | Bedrijfsfotograaf Den Haag | `/bedrijfsfotograaf-den-haag/` | `/en/commercial-photographer-the-hague/` | ⬜ | ⬜ |
| 13 | Concertfotograaf | `/concertfotograaf-den-haag/` | `/en/concert-photographer-the-hague/` | ⬜ | ⬜ |
| 14 | Modefotograaf | `/mode-fotograaf-den-haag/` | `/en/fashion-photographer-the-hague/` | ⬜ | ⬜ |
| 15 | About | `/about-fotograaf-den-haag/` | `/en/about/` | ⬜ | ⬜ |
| 16 | Contact | `/contact/` | `/en/contact/` | ✅ | ✅ |
| 17 | Tarieven | `/tarieven/` | `/en/rates/` | ⬜ | ⬜ |
| 18 | Blog overzicht | `/blog-fotograaf-den-haag/` | `/en/blog/` | ⬜ | ⬜ |
| 19 | Videoproductie | `/bedrijfsfilms/` | `/en/corporate-films/` | ⬜ | ⬜ |

**Totaal:** 19 paginatypes × 2 talen = 38 pagina's  
**Gebouwd:** 6 van 38 (16%)

> **Let op:** NL-slugs zijn vast (Wix SEO). EN-slugs zijn volledig Engels — bij livegang 301-redirects instellen van oude Wix EN-URLs (bijv. `/en/portretfotograaf-den-haag/`) naar de nieuwe slugs.

---

## 3. SEO per pagina — titles en meta descriptions

### ✅ Gebouwde pagina's (gecontroleerd in code)

| Pagina | Titel NL | Description NL | Titel EN | Description EN |
|--------|----------|----------------|----------|----------------|
| Homepage | Zakelijk fotograaf Den Haag \| Willem Martinot | Zakelijk fotograaf in Den Haag voor corporate events, congresfotografie en portretten. Ervaren en betrouwbaar, met stijl en oog voor detail. | Corporate Photographer The Hague \| Willem Martinot | Business photographer in The Hague for corporate events, portraits and conferences. Experienced, reliable, with an eye for detail. |
| Event DH | Zakelijk eventfotograaf Den Haag \| Willem Martinot | Zakelijk eventfotograaf in Den Haag voor congressen en corporate events. Oog voor sfeer, interactie en de cruciale momenten. Ervaren en betrouwbaar. | Corporate Event Photographer The Hague \| Willem Martinot | Corporate event photographer in The Hague for conferences and business events. An eye for atmosphere, interaction and key moments. Experienced and reliable. |
| Contact | Contact — Willem Martinot fotograaf Den Haag | Neem contact op voor een offerte of meer informatie over zakelijke fotografie in Den Haag, Amsterdam of Rotterdam. | Contact — Willem Martinot photographer The Hague | Get in touch for a quote or more information about corporate photography in The Hague, Amsterdam or Rotterdam. |

### ⬜ Nog te bouwen — volgens briefing

| Pagina | Titel NL | Titel EN |
|--------|----------|----------|
| Event AMS | Zakelijk eventfotograaf Amsterdam \| Willem Martinot | Corporate Event Photographer Amsterdam \| Willem Martinot |
| Event RTD | Zakelijk eventfotograaf Rotterdam \| Willem Martinot | Corporate Event Photographer Rotterdam \| Willem Martinot |
| Congres DH | Congresfotograaf Den Haag \| Willem Martinot | Conference Photographer The Hague \| Willem Martinot |
| Portret DH | Zakelijk portretfotograaf Den Haag \| Willem Martinot | Corporate Portrait Photographer The Hague \| Willem Martinot |
| Portret AMS | Zakelijk portretfotograaf Amsterdam \| Willem Martinot | Corporate Portrait Photographer Amsterdam \| Willem Martinot |
| Portret RTD | Zakelijk portretfotograaf Rotterdam \| Willem Martinot | Corporate Portrait Photographer Rotterdam \| Willem Martinot |
| Fotograaf AMS | Zakelijk fotograaf Amsterdam \| Willem Martinot | Corporate Photographer Amsterdam \| Willem Martinot |
| Fotograaf RTD | Zakelijk fotograaf Rotterdam \| Willem Martinot | Corporate Photographer Rotterdam \| Willem Martinot |
| LinkedIn DH | LinkedIn profielfoto Den Haag \| Willem Martinot | LinkedIn Portrait Photographer The Hague \| Willem Martinot |
| Bedrijfsfotograaf DH | Bedrijfsfotograaf Den Haag \| Willem Martinot | Bedrijfsfotograaf in Den Haag voor reportages, werksituaties en brandingbeelden. | Commercial Photographer The Hague \| Willem Martinot | Commercial photographer in The Hague for branding, annual reports and corporate communication. Experienced, reliable, with an eye for detail. |
| Concert DH | Concertfotograaf Den Haag \| Willem Martinot | Concert Photographer The Hague \| Willem Martinot |
| Fashion DH | Modefotograaf Den Haag \| Willem Martinot | Fashion Photographer The Hague \| Willem Martinot |
| About | Over Willem Martinot — fotograaf Den Haag | About Willem Martinot — photographer The Hague |
| Tarieven | Tarieven zakelijke fotografie — Willem Martinot | Rates corporate photography — Willem Martinot |
| Blog | Blog — Willem Martinot fotograaf Den Haag | Blog — Willem Martinot photographer The Hague |

Volledige descriptions staan in `briefing.md` sectie 4.

---

## 4. Navigatie (header)

### NL — `partials/hero-header-nl.html`

| Label | URL | Status pagina |
|-------|-----|---------------|
| Events | `/event-fotograaf-den-haag/` | ✅ |
| Portret | `/portretfotograaf-den-haag/` | ⬜ |
| Congres | `/congresfotograaf-den-haag/` | ⬜ |
| Corporate | `/bedrijfsfotograaf-den-haag/` | ⬜ |
| LinkedIn | `/linkedin-profielfoto-den-haag/` | ⬜ |
| Tarieven | `/tarieven/` | ⬜ |
| Blog | `/blog-fotograaf-den-haag/` | ⬜ |
| About | `/about-fotograaf-den-haag/` | ⬜ |
| Contact | `/contact/` | ✅ |
| EN | `/en/` | ✅ |

### EN — `partials/hero-header-en.html`

| Label | URL | Status pagina |
|-------|-----|---------------|
| Events | `/en/event-photographer-the-hague/` | ✅ |
| Portrait | `/en/corporate-portrait-photographer-the-hague/` | ⬜ |
| Conference | `/en/conference-photographer-the-hague/` | ⬜ |
| Commercial | `/en/commercial-photographer-the-hague/` | ⬜ |
| LinkedIn | `/en/linkedin-portrait-the-hague/` | ⬜ |
| Rates | `/en/rates/` | ⬜ |
| Blog | `/en/blog/` | ⬜ |
| About | `/en/about/` | ⬜ |
| Contact | `/en/contact/` | ✅ |
| NL | `/` | ✅ |

---

## 5. Footer-structuur

### NL — `partials/footer-nl.html`

| Sectie | Links |
|--------|-------|
| Events | Den Haag · Amsterdam · Rotterdam |
| Portret | Den Haag · Amsterdam · Rotterdam |
| LinkedIn Portret | Den Haag · Amsterdam · Rotterdam |
| Bedrijfsfotograaf | Den Haag |
| Congresfotograaf | Den Haag |
| Info | About · Contact · Tarieven · Blog |
| Diensten | Fashion & Editorial · Concertfotografie · Videoproductie |

### EN — `partials/footer-en.html`

| Sectie | Links |
|--------|-------|
| Events | The Hague · Amsterdam · Rotterdam |
| Portrait | The Hague · Amsterdam · Rotterdam |
| LinkedIn Portrait | The Hague · Amsterdam · Rotterdam |
| Commercial photographer | The Hague |
| Conference photographer | The Hague |
| Info | About · Contact · Rates · Blog |
| Services | Fashion & Editorial · Concert photography · Video production |

### Footer URL-mapping NL → EN

| NL | EN |
|----|-----|
| `/event-fotograaf-den-haag/` | `/en/event-photographer-the-hague/` |
| `/eventfotograaf-amsterdam/` | `/en/event-photographer-amsterdam/` |
| `/eventfotograaf-rotterdam/` | `/en/event-photographer-rotterdam/` |
| `/portretfotograaf-den-haag/` | `/en/corporate-portrait-photographer-the-hague/` |
| `/portretfotograaf-amsterdam/` | `/en/corporate-portrait-photographer-amsterdam/` |
| `/portretfotograaf-rotterdam/` | `/en/corporate-portrait-photographer-rotterdam/` |
| `/fotograaf-amsterdam/` | `/en/corporate-photographer-amsterdam/` |
| `/fotograaf-rotterdam/` | `/en/corporate-photographer-rotterdam/` |
| `/linkedin-profielfoto-den-haag/` | `/en/linkedin-portrait-the-hague/` |
| `/bedrijfsfotograaf-den-haag/` | `/en/commercial-photographer-the-hague/` |
| `/congresfotograaf-den-haag/` | `/en/conference-photographer-the-hague/` |
| `/about-fotograaf-den-haag/` | `/en/about/` |
| `/contact/` | `/en/contact/` |
| `/tarieven/` | `/en/rates/` |
| `/blog-fotograaf-den-haag/` | `/en/blog/` |
| `/mode-fotograaf-den-haag/` | `/en/fashion-photographer-the-hague/` |
| `/concertfotograaf-den-haag/` | `/en/concert-photographer-the-hague/` |
| `/bedrijfsfilms/` | `/en/corporate-films/` |

---

## 6. Bestandsstructuur project

```
willemmartinot/
├── index.html                          ✅ NL homepage
├── contact/index.html                  ✅ NL contact
├── event-fotograaf-den-haag/index.html ✅ NL event DH
├── en/
│   ├── index.html                      ✅ EN homepage
│   ├── contact/index.html              ✅ EN contact
│   └── event-photographer-the-hague/
│       └── index.html                  ✅ EN event DH
├── partials/
│   ├── hero-header-nl.html
│   ├── hero-header-en.html
│   ├── footer-nl.html
│   ├── footer-en.html
│   └── logo.html
├── css/main.css
├── js/main.js
├── images/
│   ├── site/                           ✅ footer, og-image, klantenstrip
│   ├── homepage/
│   │   ├── hero/                       ✅ slideshow (7× 800/1200/1920)
│   │   └── services/                   ✅ 6 dienst-thumbnails
│   ├── source/                         📥 JIJ levert hier high-res bronnen aan
│   ├── nl/800|1200|1920/              ⬜ SEO-beelden NL (event, congres, …)
│   └── en/800|1200|1920/              ⬜ SEO-beelden EN
├── fonts/
├── resize-images.sh                    schaal-script (sips)
├── robots.txt                          ✅ (verwijst naar sitemap — die ontbreekt nog)
├── llms.txt
├── briefing.md                         bron van waarheid
└── sitestructuur.md                    dit document
```

---

## 7. Beeldstructuur en workflow

### Waarom géén `images/hero/events/`?

Hero (volle breedte bovenaan) en portfolio-grid (meerdere foto's) zijn **verschillende gebruikstypen**. Pagina-identiteit (event, congres, portret) hoort in de **bestandsnaam**, niet in extra submappen. Dat houdt het schaalbaar voor 19 pagina's × 2 talen.

### Mappenstructuur (actueel)

```
/images/
  site/              ← sitewide: footer-portret, og-image, klantenstrip
  homepage/
    hero/            ← alleen homepage-slideshow
    services/        ← alleen diensten-grid thumbnails
  source/            ← JIJ: high-res bronbestanden hier neerzetten
  nl/
    800/  1200/  1920/   ← SEO-beelden voor NL-pagina's
  en/
    800/  1200/  1920/   ← SEO-beelden voor EN-pagina's
```

### Twee naamgevingspatronen

| Gebruik | Pad | Bestandsnaam |
|---------|-----|--------------|
| Homepage hero | `/images/homepage/hero/` | `zakelijk-fotograaf-den-haag-1200.jpg` (formaat in naam) |
| Pagina-beelden | `/images/nl/1200/` | `1V3A9556-eventfotograaf-den-haag-keynote.jpg` (formaat in map) |
| Pagina-beelden EN | `/images/en/1200/` | `1V3A9556-event-photographer-the-hague-keynote.jpg` |

### Bestandsnaamconventie (SEO-pagina's)
```
[cameranummer]-[seo-beschrijving].jpg
```

### Workflow
1. Jij zet bronbestanden in **`source/`** (repo-root, niet in git)
2. Cursor hernoemt + schaalt via `resize-images.sh`
3. NL → `images/nl/{800,1200,1920}/`, EN → `images/en/{800,1200,1920}/`
4. **Alt-teksten:** eerst Wix live-site checken → bestaande alt overnemen (eventueel licht opschonen). Alleen zelf schrijven als de foto **niet op Wix staat** (nieuwe projecten: FS-ISAC, AeroDelft, enz.)
5. HTML wordt bijgewerkt; lightbox laadt altijd 1920px-versie

> De nieuwe site krijgt uiteindelijk **meer foto's** dan Wix. Wix-alt-teksten zijn leidend voor bestaande beelden; nieuwe beelden krijgen nieuwe alt-teksten in dezelfde stijl.

### Huidige beelden

| Map | Inhoud | Status |
|-----|--------|--------|
| `/images/site/` | footer-portret, og-image, klantenstrip | ✅ |
| `/images/homepage/hero/` | 7 slideshow-beelden × 3 formaten | ✅ |
| `/images/homepage/services/` | 6 dienst-thumbnails | ✅ |
| `source/` | Aanlevermap high-res (lokaal, niet in git) | 📥 klaar voor jou |
| `/images/nl/` en `/images/en/` | Event/congres/portret SEO-beelden | ⬜ wacht op foto's |

---

## 8. Eventpagina Den Haag — detailstatus

### Pagina-opbouw (NL + EN)
1. Hero (volle breedte, 1 foto)
2. Intro (H1 + lead)
3. Portfolio grid (9 foto's)
4. Content (H2-secties + werkwijze)
5. FAQ
6. Footer

### Portfolio grid — 9 foto's (HTML staat klaar, bestanden ontbreken)

| # | Cameranummer | Bestandsnaam (NL) | Alt NL (in HTML) |
|---|--------------|-------------------|------------------|
| 1 | IZ7A6304 | `IZ7A6304-eventfotograaf-den-haag-ambassade.jpg` | Eventfotograaf Den Haag — conferentie Duitse Ambassade |
| 2 | 5I2A2677 | `5I2A2677-eventfotograaf-den-haag-spreker-katheder.jpg` | Eventfotograaf Den Haag — spreker achter katheder |
| 3 | 5I2A2479 | `5I2A2479-eventfotograaf-den-haag-spreker-podium.jpg` | Eventfotograaf Den Haag — spreker op podium |
| 4 | 1V3A9625 | `1V3A9625-eventfotograaf-den-haag-volle-zaal.jpg` | Eventfotograaf Den Haag — volle zaal van boven |
| 5 | 5I2A2776 | `5I2A2776-eventfotograaf-den-haag-qa.jpg` | Eventfotograaf Den Haag — Q&A sessie |
| 6 | 5I2A2911 | `5I2A2911-eventfotograaf-den-haag-networking.jpg` | Eventfotograaf Den Haag — networking moment |
| 7 | 5I2A2599 | `5I2A2599-eventfotograaf-den-haag-podium.jpg` | Eventfotograaf Den Haag — podium met presentatie |
| 8 | 1V3A9542 | `1V3A9542-eventfotograaf-den-haag-avond.jpg` | Eventfotograaf Den Haag — avondshot zaal |
| 9 | 1V3A9584 | `1V3A9584-eventfotograaf-den-haag-zaal.jpg` | Eventfotograaf Den Haag — zijhoek congreszaal |

### FAQ — vergelijking Wix vs lokaal

| Vraag op Wix (live) | Lokaal aanwezig? |
|---------------------|------------------|
| Wat kost een event fotograaf in Den Haag? | ✅ |
| Hoe kies je de juiste eventfotograaf voor een zakelijk event? | ⚠️ korter geformuleerd |
| Hoe regel ik een event fotograaf voor mijn bedrijf in Den Haag? | ❌ ontbreekt |
| Waar moet je op letten bij een event fotograaf in Den Haag? | ❌ ontbreekt |
| Hoeveel fotografen heb je nodig voor een congres? | ✅ |
| Hoe snel worden event foto's geleverd? | ✅ |
| Fotografeer je ook events in World Forum of Fokker Terminal? | ✅ |
| Wie is een goede event fotograaf in Den Haag? | ❌ ontbreekt |
| Werk je ook buiten Den Haag? | ✅ (extra, niet op Wix) |

> Wix toont ~30 portfoliofoto's; lokaal staan er 9 in de HTML. Uitbreiding is mogelijk na jouw foto-aanlevering.

---

## 9. Homepage — secties

| # | Sectie | Status |
|---|--------|--------|
| 1 | Hero slideshow (7 beelden) | ✅ |
| 2 | Intro + tekst | ✅ |
| 3 | Diensten-grid (6 diensten) | ✅ |
| 4 | Testimonials | ✅ |
| 5 | Elfsight reviews | ⚠️ placeholder (ID nog invullen) |
| 6 | Blog preview | ⚠️ verborgen (`display: none`) — geen blogpagina's |
| 7 | FAQ | ✅ |
| 8 | Footer | ✅ |

### Homepage diensten-grid

| # | Dienst | NL link | EN link (op EN homepage) |
|---|--------|---------|--------------------------|
| 1 | Eventfotografie | `/event-fotograaf-den-haag/` | `/en/event-photographer-the-hague/` |
| 2 | Congresfotografie | `/congresfotograaf-den-haag/` | `/en/conference-photographer-the-hague/` |
| 3 | Portretfotografie | `/portretfotograaf-den-haag/` | `/en/corporate-portrait-photographer-the-hague/` |
| 4 | LinkedIn portret | `/linkedin-profielfoto-den-haag/` | `/en/linkedin-portrait-the-hague/` |
| 5 | Bedrijfsfotografie | `/bedrijfsfotograaf-den-haag/` | `/en/commercial-photographer-the-hague/` |
| 6 | Videoproductie | `/bedrijfsfilms/` | `/en/corporate-films/` |

---

## 10. Gedeelde assets

| Bestand | Functie |
|---------|---------|
| `css/main.css` | Alle styling |
| `js/main.js` | Header/footer laden, hero slideshow, FAQ, lightbox, copyright-jaar |
| `partials/hero-header-nl.html` | Navigatie NL (via fetch) |
| `partials/hero-header-en.html` | Navigatie EN (via fetch) |
| `partials/footer-nl.html` | Footer NL |
| `partials/footer-en.html` | Footer EN |

Contactformulier: Formspree (`xykqqpgj`) op `/contact/`, `/en/contact/`, `/tarieven/` en `/en/rates/`.

---

## 11. Technische bestanden

| Bestand | Status | Opmerking |
|---------|--------|-----------|
| `robots.txt` | ✅ | `Disallow: /partials/` |
| `sitemap.xml` | ❌ | Verwijst in robots.txt maar bestand ontbreekt nog |
| `llms.txt` | ✅ | Aanwezig |
| `.gitignore` | ✅ | `.DS_Store` uitgesloten |

---

## 12. Openstaande aandachtspunten (ter review)

| # | Onderwerp | Actie |
|---|-----------|-------|
| 1 | Eventpagina foto's | 9 high-res bronbestanden in `source/` |
| 2 | Event FAQ | 3 Wix-vragen terugzetten vóór livegang |
| 3 | `sitemap.xml` | Aanmaken vóór livegang |
| 4 | Blog | Sectie verborgen tot blogpagina's bestaan |
| 5 | Elfsight reviews | App-ID invullen op homepage |
| 6 | EN-slugs migratie | Bij livegang: 301-redirects van oude Wix EN-URLs naar nieuwe Engelse slugs |
| 7 | 32 pagina's | Nog te bouwen na eventpagina DH af |

---

## 13. Bouwvolgorde (voorstel)

1. **Eventpagina DH afmaken** — foto's + FAQ + EN-pagina sync  
2. **Congresfotograaf DH** — vergelijkbare structuur, deelt beelden  
3. **Portret + LinkedIn DH**  
4. **Bedrijfsfotograaf DH**  
5. **Stadspagina's** AMS + RTD (event, portret, fotograaf)  
6. **About, Tarieven, Blog**  
7. **Concert, Fashion, Videoproductie**  
8. **Sitemap + finale SEO-check tegen Wix**

---

## 14. EN-slugs — volledige lijst (juni 2026)

Alle EN-pagina's gebruiken Engelse URL-slugs. NL-slugs blijven ongewijzigd.

| Pagina | EN URL |
|--------|--------|
| Homepage | `/en/` |
| Event photographer The Hague | `/en/event-photographer-the-hague/` |
| Event photographer Amsterdam | `/en/event-photographer-amsterdam/` |
| Event photographer Rotterdam | `/en/event-photographer-rotterdam/` |
| Conference photographer The Hague | `/en/conference-photographer-the-hague/` |
| Corporate portrait photographer The Hague | `/en/corporate-portrait-photographer-the-hague/` |
| Corporate portrait photographer Amsterdam | `/en/corporate-portrait-photographer-amsterdam/` |
| Corporate portrait photographer Rotterdam | `/en/corporate-portrait-photographer-rotterdam/` |
| Corporate photographer Amsterdam | `/en/corporate-photographer-amsterdam/` |
| Corporate photographer Rotterdam | `/en/corporate-photographer-rotterdam/` |
| LinkedIn portrait The Hague | `/en/linkedin-portrait-the-hague/` |
| Commercial photographer The Hague | `/en/commercial-photographer-the-hague/` |
| Concert photographer The Hague | `/en/concert-photographer-the-hague/` |
| Fashion photographer The Hague | `/en/fashion-photographer-the-hague/` |
| About | `/en/about/` |
| Contact | `/en/contact/` |
| Rates | `/en/rates/` |
| Blog | `/en/blog/` |
| Video production | `/en/corporate-films/` |

### Redirects bij livegang (oude Wix EN-URLs → nieuw)

| Oud (Wix) | Nieuw |
|-----------|-------|
| `/en/bedrijfsfotograaf-den-haag/` | `/en/commercial-photographer-the-hague/` |
| `/en/portretfotograaf-den-haag/` | `/en/corporate-portrait-photographer-the-hague/` |
| `/en/portretfotograaf-amsterdam/` | `/en/corporate-portrait-photographer-amsterdam/` |
| `/en/portretfotograaf-rotterdam/` | `/en/corporate-portrait-photographer-rotterdam/` |
| `/en/eventfotograaf-amsterdam/` | `/en/event-photographer-amsterdam/` |
| `/en/eventfotograaf-rotterdam/` | `/en/event-photographer-rotterdam/` |
| `/en/fotograaf-amsterdam/` | `/en/corporate-photographer-amsterdam/` |
| `/en/fotograaf-rotterdam/` | `/en/corporate-photographer-rotterdam/` |

---