# Cursor Project Briefing — willemmartinot.nl

## Bouwstatus (laatst bijgewerkt: 30 juni)
Tot nu toe gebouwd in Cursor: **homepage NL + 1 event-pagina**.
Nog te bouwen: alle overige pagina's uit de URL-structuur hieronder.

## Situatie
Wix-contract loopt over ~3 maanden af. Doel: statische HTML-site bouwen
met Cursor, hosten op Strato (domein + email staan er al).
Wix loskoppelen als server, Strato activeren als webhost. Domein en
email blijven onaangetast.

---

## Visuele aanpak
- Screenprints maken van alle huidige Wix-pagina's als structuur-referentie
- Corporate photography websites zoeken als visuele referentie (licht,
  professioneel, niet donker)
- rawpictures.nl als technische referentie (vriend gebouwd in Cursor,
  goede code) — MAAR niet de tweetaligheid kopiëren (zie hieronder)

---

## Kritieke SEO-architectuur

### Tweetaligheid — NIET zoals rawpictures.nl
rawpictures.nl gebruikt JavaScript (i18n.js) om NL/EN te wisselen op
één URL. Google crawlt alleen de NL-versie. Dit is fout voor SEO.

**Correcte aanpak: aparte HTML-pagina's per taal:**
```
/index.html                    → NL homepage
/en/index.html                 → EN homepage
/event-fotograaf-den-haag.html → NL service
/en/event-photographer-the-hague.html → EN service
```

Elke pagina krijgt hreflang-tags in de <head>:
```html
<link rel="alternate" hreflang="nl" href="https://www.willemmartinot.nl/event-fotograaf-den-haag" />
<link rel="alternate" hreflang="en" href="https://www.willemmartinot.nl/en/event-fotograaf-den-haag" />
<link rel="alternate" hreflang="x-default" href="https://www.willemmartinot.nl/event-fotograaf-den-haag" />
```

### URL-structuur

### NL-slugs — EXACT overnemen van Wix
Rankings zijn opgebouwd op deze URLs. Niet wijzigen, anders verlies je
alles. Cursor moet exact dezelfde NL-slugs gebruiken.

### EN-slugs — VRIJ, niet meer gebonden aan Wix-spiegelstructuur
Op Wix dwong het platform een 1-op-1 spiegel af tussen NL- en EN-slugs
(/portretfotograaf-den-haag → /en/portretfotograaf-den-haag). Dat is een
Wix-beperking, geen SEO-vereiste. De EN-pagina's hebben weinig opgebouwde
ranking-equity, dus dit is het moment om ze op natuurlijke Engelse
keywords te zetten — sterker voor zoekintentie en leesbaarheid.

| Pagina | NL URL (vast) | EN URL (nieuw, vrij gekozen) |
|--------|--------|--------|
| Homepage | / | /en/ |
| Eventfotograaf DH | /event-fotograaf-den-haag | /en/event-photographer-the-hague |
| Eventfotograaf AMS | /eventfotograaf-amsterdam | /en/event-photographer-amsterdam |
| Eventfotograaf RTD | /eventfotograaf-rotterdam | /en/event-photographer-rotterdam |
| Portretfotograaf DH | /portretfotograaf-den-haag | /en/corporate-portrait-photographer-the-hague |
| Portretfotograaf AMS | /portretfotograaf-amsterdam | /en/corporate-portrait-photographer-amsterdam |
| Portretfotograaf RTD | /portretfotograaf-rotterdam | /en/corporate-portrait-photographer-rotterdam |
| Fotograaf AMS | /fotograaf-amsterdam | /en/corporate-photographer-amsterdam |
| Fotograaf RTD | /fotograaf-rotterdam | /en/corporate-photographer-rotterdam |
| LinkedIn | /linkedin-profielfoto-den-haag | /en/linkedin-portrait-the-hague |
| Bedrijfsfotograaf DH | /bedrijfsfotograaf-den-haag | /en/commercial-photographer-the-hague |
| Concerts | /concertfotograaf-den-haag | /en/concert-photographer-the-hague |
| Fashion | /mode-fotograaf-den-haag | /en/fashion-photographer-the-hague |
| About | /about-fotograaf-den-haag | /en/about |
| Contact | /contact | /en/contact |
| Tarieven | /tarieven | /en/rates |
| Blog | /blog-fotograaf-den-haag | /en/blog |
| Videoproductie | /bedrijfsfilms | /en/corporate-films |

**Migratie-actie:** bij livegang 301-redirects instellen van de oude Wix
EN-URLs (bijv. `/en/bedrijfsfotograaf-den-haag/` → `/en/commercial-photographer-the-hague/`,
`/en/portretfotograaf-den-haag/` → `/en/corporate-portrait-photographer-the-hague/`).
Kleine hoeveelheid ranking-equity, maar niet weggooien.

---

## SEO-parameters per pagina

### Elke pagina krijgt in de <head>:
```html
<title>[Titel max 55 karakters]</title>
<meta name="description" content="[Description max 155 karakters]">
<link rel="canonical" href="https://www.willemmartinot.nl/[url]">
<link rel="alternate" hreflang="nl" href="https://www.willemmartinot.nl/[nl-url]">
<link rel="alternate" hreflang="en" href="https://www.willemmartinot.nl/en/[en-url]">
<link rel="alternate" hreflang="x-default" href="https://www.willemmartinot.nl/[nl-url]">
```

### Titels en descriptions (al uitgewerkt)

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
| Bedrijfsfotograaf DH | Bedrijfsfotograaf Den Haag \| Willem Martinot | Bedrijfsfotograaf in Den Haag voor branding, jaarverslagen en interne communicatie. Ervaren en betrouwbaar, met stijl en oog voor detail. |
| Bedrijfsfotograaf DH EN | Commercial Photographer The Hague \| Willem Martinot | Commercial photographer in The Hague for branding, annual reports and corporate communication. Experienced, reliable, with an eye for detail. |

---

## JSON-LD schemas

### Homepage NL — twee scripts in <head>:
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
  "logo": "https://static.wixstatic.com/media/ca6de8_70c54129ffe74cbeb6a820e6fb15621b~mv2.jpg",
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

### Homepage EN — LocalBusiness in het Engels (geen WebSite, die staat op NL):
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Willem Martinot Photographer",
  "url": "https://www.willemmartinot.nl/",
  "logo": "https://static.wixstatic.com/media/ca6de8_e23aa6841b1645c58a70ef1781e12838~mv2.jpg",
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

### Service pagina's — patroon (vervang [SERVICE_NL], [STAD_NL] etc.):
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
    "logo": "https://static.wixstatic.com/media/ca6de8_70c54129ffe74cbeb6a820e6fb15621b~mv2.jpg",
    "telephone": "+31611303070",
    "email": "me@willemmartinot.nl"
  }
}
```
EN:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[SERVICE_EN] [STAD_EN]",
  "serviceType": "[SERVICE_EN]",
  "description": "[meta description EN]",
  "areaServed": {"@type": "City", "name": "[STAD_EN]"},
  "provider": {
    "@type": "LocalBusiness",
    "name": "Willem Martinot Photographer",
    "url": "https://www.willemmartinot.nl/",
    "logo": "https://static.wixstatic.com/media/ca6de8_e23aa6841b1645c58a70ef1781e12838~mv2.jpg",
    "telephone": "+31611303070",
    "email": "me@willemmartinot.nl"
  }
}
```

**Logo URLs:**
- NL: `https://static.wixstatic.com/media/ca6de8_70c54129ffe74cbeb6a820e6fb15621b~mv2.jpg`
- EN: `https://static.wixstatic.com/media/ca6de8_e23aa6841b1645c58a70ef1781e12838~mv2.jpg`

---

## Technische eisen voor Cursor

### Afbeeldingen — geen externe libraries:
```html
<picture>
  <source media="(orientation: landscape)"
    srcset="foto-800.jpg 800w, foto-1280.jpg 1280w, foto-1920.jpg 1920w"
    sizes="100vw">
  <img src="foto-1280.jpg" alt="[descriptieve alt tekst]"
       width="1920" height="1200"
       loading="lazy" decoding="async">
</picture>
```

- Eerste hero-afbeelding: `fetchpriority="high"`, geen `loading="lazy"`
- Alle overige afbeeldingen: `loading="lazy" decoding="async"`
- WebP met JPG-fallback
- Bestandsnamen descriptief: `eventfotograaf-den-haag-congres.jpg`

### Portfolio grid:
- CSS Grid, geen externe library
- Max 20 regels vanilla JavaScript voor lightbox
- Geen jQuery, geen plugin

### Algemeen:
- Geen externe libraries tenzij Google Fonts
- Vanilla HTML/CSS/JS
- `<html lang="nl">` op NL-pagina's, `<html lang="en">` op EN-pagina's

---

## Initiële Cursor-prompt (startpunt):

*"Bouw willemmartinot.nl als statische HTML-site. Structuur: aparte /en/
map voor alle Engelse pagina's. Elke pagina krijgt: title tag max 55
karakters keyword-first, meta description max 155 karakters, canonical
tag, hreflang-tags NL+EN+x-default, JSON-LD schema in de head.
Afbeeldingen: native loading='lazy', WebP met JPG-fallback via
picture-element, descriptieve alt-teksten, geen externe libraries.
Portfolio: CSS Grid, vanilla JavaScript lightbox. Taal: html lang=nl op
NL-pagina's, html lang=en op EN-pagina's. Hosting: Strato, domein
willemmartinot.nl. Gebruik de aangeleverde screenprints als structuur-
referentie en de aangeleverde corporate photography sites als visuele
referentie."*

---

## Overstap-protocol Wix → Strato

1. Bouw site volledig af in Cursor
2. Upload naar Strato (FTP of bestandsbeheer)
3. Test op tijdelijk Strato-URL
4. Koppel Wix los als server
5. Wijs domein in Strato naar nieuwe map
6. Downtime: nul

**Kritiek:** alle huidige URL-slugs exact overnemen. Rankings zijn
opgebouwd op die specifieke URLs. Geen redirects nodig als URLs gelijk
blijven.
