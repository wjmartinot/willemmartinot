#!/usr/bin/env python3
"""Premium copy batch 4: bedrijfsfotograaf AMS/RTM, homepage FAQ, event CTAs."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PROOF_NL = """        <ul class="proof-points" aria-label="Kernpunten bedrijfsfotografie">
          <li><strong>25+ jaar</strong> ervaring</li>
          <li><strong>Branding</strong> · Jaarverslagen · Campagnes</li>
          <li>Op locatie of in studio</li>
          <li>Discreet &amp; professioneel</li>
        </ul>
"""

PROOF_EN = """        <ul class="proof-points" aria-label="Key points">
          <li><strong>25+ years</strong> experience</li>
          <li><strong>Branding</strong> · Annual reports · Campaigns</li>
          <li>On location or in studio</li>
          <li>Discreet &amp; professional</li>
        </ul>
"""

STICKY_NL = {
    "bedrijfsfotograaf-amsterdam/index.html": ("Bedrijfsfotograaf Amsterdam", "/contact/", "Offerte aanvragen"),
    "bedrijfsfotograaf-rotterdam/index.html": ("Bedrijfsfotograaf Rotterdam", "/contact/", "Offerte aanvragen"),
}

STICKY_EN = {
    "en/business-photographer-amsterdam/index.html": ("Business photographer Amsterdam", "/en/contact/", "Request a quote"),
    "en/business-photographer-rotterdam/index.html": ("Business photographer Rotterdam", "/en/contact/", "Request a quote"),
}

BUSINESS_NL = {
    "bedrijfsfotograaf-amsterdam/index.html": {
        "title_old": "Bedrijfsfotograaf Amsterdam | Reportages &amp; branding | Willem Martinot Fotografie",
        "title_new": "Bedrijfsfotograaf Amsterdam | Willem Martinot",
        "desc_old": "Bedrijfsfotograaf Amsterdam voor reportages, employer branding en communicatie. Op locatie in kantoor, lab of productie. Vraag een offerte aan.",
        "desc_old2": "Bedrijfsfotograaf in Amsterdam voor reportages, employer branding en communicatie. Op locatie in kantoor, lab of productie. Vraag een offerte aan.",
        "desc_new": "Bedrijfsfotografie in Amsterdam voor branding, jaarverslagen en corporate communicatie. Professioneel, tijdloos en breed inzetbaar voor organisaties in de Metropoolregio.",
        "json_name_old": "Bedrijfsfotograaf Amsterdam | Reportages & branding | Willem Martinot Fotografie",
    },
    "bedrijfsfotograaf-rotterdam/index.html": {
        "title_old": "Bedrijfsfotograaf Rotterdam | Reportages &amp; branding | Willem Martinot Fotografie",
        "title_new": "Bedrijfsfotograaf Rotterdam | Willem Martinot",
        "desc_old": "Bedrijfsfotograaf Rotterdam voor reportages, employer branding en communicatie. Op locatie in kantoor, lab of productie. Vraag een offerte aan.",
        "desc_old2": "Bedrijfsfotograaf in Rotterdam voor reportages, employer branding en communicatie. Op locatie in kantoor, lab of productie. Vraag een offerte aan.",
        "desc_new": "Bedrijfsfotografie in Rotterdam voor branding, jaarverslagen en corporate communicatie. Professioneel, tijdloos en breed inzetbaar voor organisaties in de Rijnmond.",
        "json_name_old": "Bedrijfsfotograaf Rotterdam | Reportages & branding | Willem Martinot Fotografie",
    },
}

BUSINESS_EN = {
    "en/business-photographer-amsterdam/index.html": {
        "title_old": "Business Photographer Amsterdam | Reports &amp; branding | Willem Martinot Photography",
        "title_new": "Business Photographer Amsterdam | Willem Martinot",
        "desc_old": "Business photographer Amsterdam for corporate reports, branding and communications. On location in office, lab or production. Request a quote.",
        "desc_new": "Corporate photography in Amsterdam for branding, annual reports and corporate communications. Professional, timeless and widely usable for organisations in the metropolitan region.",
        "json_name_old": "Business Photographer Amsterdam | Reports & branding | Willem Martinot Photography",
    },
    "en/business-photographer-rotterdam/index.html": {
        "title_old": "Business Photographer Rotterdam | Reports &amp; branding | Willem Martinot Photography",
        "title_new": "Business Photographer Rotterdam | Willem Martinot",
        "desc_old": "Business photographer Rotterdam for corporate reports, branding and communications. On location in office, lab or production. Request a quote.",
        "desc_new": "Corporate photography in Rotterdam for branding, annual reports and corporate communications. Professional, timeless and widely usable for organisations in the Rijnmond region.",
        "json_name_old": "Business Photographer Rotterdam | Reports & branding | Willem Martinot Photography",
    },
}

HUB_DELIVERY_NL = (
    "Dat hangt af van het type opdracht en de afspraken vooraf. Voor events "
    "volgt een eerste selectie doorgaans dezelfde dag of de volgende werkdag; "
    "portretten binnen twee tot vijf werkdagen. De volledige set volgt binnen "
    "de afgesproken termijn — altijd afgestemd op uw planning."
)

HUB_DELIVERY_EN = (
    "That depends on the assignment type and agreements made in advance. For "
    "events, an initial selection usually follows the same day or the next "
    "business day; portraits within two to five business days. The full set "
    "follows within the agreed timeframe — always aligned with your schedule."
)

HOME_DELIVERY_NL_OLD = (
    "Dat hangt af van de opdracht. Voor events kan een eerste selectie vaak dezelfde "
    "dag of binnen 24 uur worden geleverd — handig voor social media en pers. "
    "Portretfoto's lever ik meestal binnen één werkdag. De volledige bewerkte set "
    "volgt binnen de afgesproken termijn, doorgaans binnen enkele dagen."
)

HOME_LINKEDIN_NL_OLD = (
    "Ja. Ik maak professionele LinkedIn-profielfoto's in mijn studio in Den Haag "
    "of op locatie bij jouw kantoor. De sessie is efficiënt (meestal 30–45 minuten) "
    "en de beelden worden vaak binnen één werkdag geleverd. Ook geschikt voor teams "
    "en organisaties in de Randstad. Meer info op de pagina LinkedIn profielfotograaf."
)

HOME_LINKEDIN_NL_NEW = (
    "Ja. Ik maak professionele LinkedIn-profielfoto's in mijn studio in Den Haag "
    "of op locatie bij uw kantoor. De sessie is efficiënt (meestal 30–45 minuten). "
    "Ook geschikt voor teams en organisaties in de Randstad. Meer info op de pagina "
    "LinkedIn profielfotograaf."
)

HOME_LINKEDIN_NL_HTML_OLD = HOME_LINKEDIN_NL_OLD.replace(
    "Meer info op de pagina LinkedIn profielfotograaf.",
    "Meer info op de pagina <a href=\"/linkedin-profielfoto-den-haag/\">LinkedIn profielfotograaf</a>.",
)

HOME_CONTACT_NL_OLD = (
    "Via het contactformulier of per e-mail. Beschrijf kort het type opdracht, "
    "de gewenste datum en locatie. Ik reageer doorgaans binnen één werkdag met een "
    "voorstel of een paar gerichte vragen. Offertes zijn vrijblijvend."
)

HOME_CONTACT_NL_NEW = (
    "Via het contactformulier of per e-mail. Beschrijf kort het type opdracht, "
    "de gewenste datum en locatie. Ik reageer doorgaans snel met een voorstel of "
    "een paar gerichte vragen. Offertes zijn vrijblijvend."
)

HOME_CONTACT_NL_HTML_OLD = HOME_CONTACT_NL_OLD.replace(
    "Via het contactformulier",
    "Via het <a href=\"/contact/\">contactformulier</a>",
)

HOME_DELIVERY_EN_OLD = (
    "It depends on the assignment. For events, an initial selection can often be "
    "delivered the same day or within 24 hours — useful for social media and press. "
    "Portrait photos are usually delivered within one business day. The full retouched "
    "set follows within the agreed timeframe, typically within a few days."
)

HOME_LINKEDIN_EN_OLD = (
    "Yes. I create professional LinkedIn headshots in my The Hague studio or on "
    "location at your office. Sessions are efficient (usually 30–45 minutes) and "
    "images are often delivered within one business day. Also suitable for teams "
    "and organisations across the Randstad. More info on the LinkedIn portrait "
    "photographer page."
)

HOME_LINKEDIN_EN_NEW = (
    "Yes. I create professional LinkedIn headshots in my The Hague studio or on "
    "location at your office. Sessions are efficient (usually 30–45 minutes). Also "
    "suitable for teams and organisations across the Randstad. More info on the "
    "LinkedIn portrait photographer page."
)

HOME_LINKEDIN_EN_HTML_OLD = HOME_LINKEDIN_EN_OLD.replace(
    "More info on the LinkedIn portrait photographer page.",
    "More info on the <a href=\"/en/linkedin-portrait-the-hague/\">LinkedIn portrait photographer</a> page.",
)

HOME_CONTACT_EN_OLD = (
    "Via the contact form or by email. Briefly describe the type of assignment, "
    "preferred date and location. I typically respond within one business day with "
    "a proposal or a few targeted questions. Quotes are non-binding."
)

HOME_CONTACT_EN_NEW = (
    "Via the contact form or by email. Briefly describe the type of assignment, "
    "preferred date and location. I typically respond promptly with a proposal or "
    "a few targeted questions. Quotes are non-binding."
)

HOME_CONTACT_EN_HTML_OLD = HOME_CONTACT_EN_OLD.replace(
    "Via the contact form",
    "Via the <a href=\"/en/contact/\">contact form</a>",
)


def replace_all(path: Path, old: str, new: str) -> None:
    text = path.read_text(encoding="utf-8")
    if old in text:
        path.write_text(text.replace(old, new), encoding="utf-8")


def update_business_nl(rel: str, cfg: dict) -> None:
    path = ROOT / rel
    replace_all(path, cfg["title_old"], cfg["title_new"])
    replace_all(path, cfg["desc_old"], cfg["desc_new"])
    replace_all(path, cfg["desc_old2"], cfg["desc_new"])
    replace_all(path, cfg["json_name_old"], cfg["title_new"].replace("&amp;", "&"))
    replace_all(
        path,
        '        <a href="/contact/" class="btn-outline">Vraag offerte aan</a>\n      </div>\n    </section>\n\n    <section class="content-section',
        PROOF_NL + '        <a href="/contact/" class="btn-outline">Vraag offerte aan</a>\n      </div>\n    </section>\n\n    <section class="content-section',
    )


def update_business_en(rel: str, cfg: dict) -> None:
    path = ROOT / rel
    replace_all(path, cfg["title_old"], cfg["title_new"])
    replace_all(path, cfg["desc_old"], cfg["desc_new"])
    replace_all(path, cfg["json_name_old"], cfg["title_new"].replace("&amp;", "&"))
    replace_all(
        path,
        '        <a href="/en/contact/" class="btn-outline">Request a quote</a>\n      </div>\n    </section>\n\n    <section class="content-section',
        PROOF_EN + '        <a href="/en/contact/" class="btn-outline">Request a quote</a>\n      </div>\n    </section>\n\n    <section class="content-section',
    )


def add_sticky(path: Path, label: str, href: str, btn: str) -> None:
    block = f"""  <div class="sticky-cta" id="sticky-cta" aria-hidden="true">
    <p class="sticky-cta__text">{label}</p>
    <a href="{href}" class="sticky-cta__btn">{btn}</a>
  </div>

  <footer class="footer" """
    replace_all(path, '  <footer class="footer" ', block)


def main():
    for rel, cfg in BUSINESS_NL.items():
        update_business_nl(rel, cfg)
    for rel, cfg in BUSINESS_EN.items():
        update_business_en(rel, cfg)

    for rel, (label, href, btn) in STICKY_NL.items():
        add_sticky(ROOT / rel, label, href, btn)
    for rel, (label, href, btn) in STICKY_EN.items():
        add_sticky(ROOT / rel, label, href, btn)

    # Den Haag JSON-LD sync
    den_haag = ROOT / "bedrijfsfotograaf-den-haag/index.html"
    replace_all(
        den_haag,
        '"name": "Bedrijfsfotograaf Den Haag | Reportages & branding | Willem Martinot Fotografie",',
        '"name": "Bedrijfsfotograaf Den Haag | Willem Martinot",',
    )
    replace_all(
        den_haag,
        '"description": "Bedrijfsfotograaf in Den Haag voor reportages, employer branding en communicatie. Op locatie in kantoor, lab of productie. Vraag een offerte aan.",',
        '"description": "Bedrijfsfotografie in Den Haag voor branding, jaarverslagen en corporate communicatie. Professioneel, tijdloos en breed inzetbaar voor organisaties in de Randstad.",',
    )

    # Event grid CTAs
    event_cta_nl = (
        ("event-fotograaf-den-haag/index.html",),
        ("eventfotograaf-amsterdam/index.html",),
        ("eventfotograaf-rotterdam/index.html",),
    )
    for rel in [
        "event-fotograaf-den-haag/index.html",
        "eventfotograaf-amsterdam/index.html",
        "eventfotograaf-rotterdam/index.html",
    ]:
        replace_all(
            ROOT / rel,
            "<p>Evenement gepland? Vraag direct een offerte aan — ik reageer doorgaans binnen één werkdag.</p>",
            "<p>Evenement gepland? Vraag direct een offerte aan.</p>",
        )

    for rel in [
        "en/event-photographer-the-hague/index.html",
        "en/event-photographer-amsterdam/index.html",
        "en/event-photographer-rotterdam/index.html",
    ]:
        replace_all(
            ROOT / rel,
            "<p>Event coming up? Request a quote directly — I typically respond within one business day.</p>",
            "<p>Event coming up? Request a quote directly.</p>",
        )

    # Homepage FAQ NL
    home = ROOT / "index.html"
    replace_all(home, HOME_DELIVERY_NL_OLD, HUB_DELIVERY_NL)
    replace_all(home, HOME_LINKEDIN_NL_OLD, HOME_LINKEDIN_NL_NEW)
    replace_all(home, HOME_LINKEDIN_NL_HTML_OLD, HOME_LINKEDIN_NL_NEW.replace(
        "Meer info op de pagina LinkedIn profielfotograaf.",
        'Meer info op de pagina <a href="/linkedin-profielfoto-den-haag/">LinkedIn profielfotograaf</a>.',
    ))
    replace_all(home, HOME_CONTACT_NL_OLD, HOME_CONTACT_NL_NEW)
    replace_all(home, HOME_CONTACT_NL_HTML_OLD, HOME_CONTACT_NL_NEW.replace(
        "Via het contactformulier",
        'Via het <a href="/contact/">contactformulier</a>',
    ))

    # Homepage FAQ EN
    en_home = ROOT / "en/index.html"
    replace_all(en_home, HOME_DELIVERY_EN_OLD, HUB_DELIVERY_EN)
    replace_all(en_home, HOME_LINKEDIN_EN_OLD, HOME_LINKEDIN_EN_NEW)
    replace_all(en_home, HOME_LINKEDIN_EN_HTML_OLD, HOME_LINKEDIN_EN_NEW.replace(
        "More info on the LinkedIn portrait photographer page.",
        'More info on the <a href="/en/linkedin-portrait-the-hague/">LinkedIn portrait photographer</a> page.',
    ))
    replace_all(en_home, HOME_CONTACT_EN_OLD, HOME_CONTACT_EN_NEW)
    replace_all(en_home, HOME_CONTACT_EN_HTML_OLD, HOME_CONTACT_EN_NEW.replace(
        "Via the contact form",
        'Via the <a href="/en/contact/">contact form</a>',
    ))

    print("Premium copy batch 4 applied.")


if __name__ == "__main__":
    main()
