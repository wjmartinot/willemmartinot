# Deploy-checklist — Cloudflare Pages

Korte handleiding om `willemmartinot.nl` van Wix/Strato naar Cloudflare Pages te zetten.  
Repo: https://github.com/wjmartinot/willemmartinot

## Vóór de eerste deploy

- [x] Alle lokale wijzigingen committen en pushen naar `main`
- [x] Contactformulier — Formspree (`xykqqpgj`) op `/contact/`, `/en/contact/`, `/tarieven/`, `/en/rates/`
- [x] `sitemap.xml` toegevoegd (40 pagina's)
- [x] Redirects in `_redirects` (Wix EN-slugs, apex→www, bedrijfsfilms→Limestone)

## Eenmalige Cloudflare-setup (~30 min)

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Repo `wjmartinot/willemmartinot` koppelen, branch `main`
3. Build-instellingen:
   - **Framework preset:** None
   - **Build command:** *(leeg)*
   - **Build output directory:** `/`
4. Deploy starten → noteer de `*.pages.dev` preview-URL
5. **Custom domains** → `www.willemmartinot.nl` én `willemmartinot.nl` toevoegen

## DNS bij Strato (domein + e-mail blijven hier)

- [ ] `www` → CNAME naar `<project>.pages.dev` (waarde uit Cloudflare Pages)
- [ ] Apex `willemmartinot.nl` → doorsturen naar `https://www.willemmartinot.nl` (Strato URL-forwarding) **of** A/CNAME zoals Cloudflare aangeeft bij custom domain
- [ ] MX-records en overige e-mail-DNS **niet** wijzigen
- [ ] `_redirects` vangt apex→www ook af zodra verkeer via Cloudflare loopt

## Na de deploy — rooktest

- [ ] Homepage NL + EN laden
- [ ] Steekproef: event-, portret- en blogpagina's
- [ ] `_redirects` testen:
  - `/en/portretfotograaf-den-haag/` → `/en/corporate-portrait-photographer-the-hague/`
  - `/bedrijfsfilms/` → `https://www.limestonepictures.nl`
  - `http://willemmartinot.nl/` → `https://www.willemmartinot.nl/`
- [ ] `/partials/` geeft 404
- [ ] OG-images laden (`/images/site/og/`)
- [ ] Contactformulier testen (Formspree → bevestigingsmail + groene melding)
- [ ] Google Search Console: sitemap indienen na livegang

## Livegang (DNS omzetten)

1. Deploy op preview-URL goedkeuren
2. DNS `www` (+ apex) omzetten naar Cloudflare Pages
3. Formspree: **Restrict to Domain** → `willemmartinot.nl`
4. Wix als host loskoppelen (domein blijft bij Strato)
5. 24–48 uur monitoren in Search Console

## Dagelijks onderhoud

Push naar `main` → Cloudflare bouwt en publiceert automatisch. Geen FTP, geen handmatige upload.

## Bronfoto's

High-res originelen staan lokaal in `source/` (niet in git). Verwerken via `./resize-images.sh source/RAW.jpg nl bestandsnaam`.
