# Deploy-checklist — Cloudflare Pages

Korte handleiding om `willemmartinot.nl` van Wix/Strato naar Cloudflare Pages te zetten.  
Repo: https://github.com/wjmartinot/willemmartinot

## Vóór de eerste deploy

- [ ] Alle lokale wijzigingen committen en pushen naar `main`
- [x] Contactformulier — Formspree (`xykqqpgj`) op `/contact/`, `/en/contact/`, `/tarieven/`, `/en/rates/`
- [x] `sitemap.xml` toegevoegd (40 pagina's)
- [x] Redirects controleren in `_redirects` (vervangt `.htaccess`)

## Eenmalige Cloudflare-setup (~30 min)

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Repo `wjmartinot/willemmartinot` koppelen, branch `main`
3. Build-instellingen:
   - **Framework preset:** None
   - **Build command:** *(leeg)*
   - **Build output directory:** `/`
4. Deploy starten → noteer de `*.pages.dev` preview-URL
5. **Custom domains** → `www.willemmartinot.nl` toevoegen

## DNS bij Strato (domein + e-mail blijven hier)

- [ ] `www` → CNAME naar `<project>.pages.dev` (waarde uit Cloudflare Pages)
- [ ] MX-records en overige e-mail-DNS **niet** wijzigen
- [ ] Optioneel: apex `willemmartinot.nl` → redirect naar `www` (via Strato-forwarding of Cloudflare als nameservers later verhuizen)

## Na de deploy — rooktest

- [ ] Homepage NL + EN laden
- [ ] Steekproef: event-, portret- en blogpagina's
- [ ] `_redirects` testen:
  - `/en/corporate-photographer-amsterdam/` → `/en/commercial-photographer-amsterdam/`
  - `/en/portretfotograaf-den-haag/` → `/en/corporate-portrait-photographer-the-hague/`
- [ ] `/partials/` geeft 404
- [ ] OG-images laden (`/images/site/og/`)
- [ ] Contactformulier testen (Formspree → bevestigingsmail + groene melding op pagina)
- [ ] Google Search Console: property controleren, sitemap indienen

## Livegang (DNS omzetten)

1. Deploy op preview-URL goedkeuren
2. DNS `www` omzetten naar Cloudflare Pages
3. Wix als host loskoppelen (domein blijft bij Strato)
4. 24–48 uur monitoren in Search Console

## Dagelijks onderhoud

Push naar `main` → Cloudflare bouwt en publiceert automatisch. Geen FTP, geen handmatige upload.
