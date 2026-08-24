#!/usr/bin/env python3
"""Premium copy batch 2: homepage meta, NL event AMS/RTM, NL portret FAQ, EN mirrors."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PORTRAIT_DELIVERY_NL = (
    "Na de shoot maak ik een zorgvuldige selectie en bewerk ik de definitieve "
    "beelden professioneel. U ontvangt de foto's doorgaans binnen twee tot "
    "vijf werkdagen via een beveiligde downloadlink. Bij grotere series of "
    "teams stemmen we de levertijd vooraf af."
)

PORTRAIT_DELIVERY_EN = (
    "After the shoot I make a careful selection and professionally retouch the "
    "final images. You usually receive the photos within two to five business "
    "days via a secure download link. For larger series or teams we agree the "
    "delivery timeframe in advance."
)

PORTRAIT_DELIVERY_OLD = (
    "Na de shoot maak ik een zorgvuldige selectie en bewerk ik de definitieve "
    "beelden professioneel. Meestal ontvang je de foto's binnen één werkdag "
    "via een beveiligde downloadlink (Google Drive). Bij grotere series kan de "
    "levertijd iets langer zijn — dat stemmen we vooraf af."
)

PORTRAIT_DELIVERY_OLD_EN = (
    "After the shoot I make a careful selection and professionally retouch the "
    "final images. You usually receive the photos within one business day via a "
    "secure download link (Google Drive). For larger series delivery may take "
    "slightly longer — we agree this in advance."
)

WERKWIJZE_AMS_OLD = """        <h2>Werkwijze: van sfeerimpressie tot snelle oplevering</h2>
        <p>Vooraf stemmen we de doelen, de gewenste sfeer en de uiteindelijke toepassing van de beelden af.</p>
        <ul>
          <li><strong>Onopvallend aanwezig:</strong> Tijdens het event beweeg ik mij onopvallend tussen de gasten om authentieke beelden te maken.</li>
          <li><strong>Snelle levering:</strong> De eerste selectie beelden voor directe communicatie (LinkedIn/nieuwsberichten) kan vaak al tijdens of direct na het event worden geleverd.</li>
          <li><strong>Nabewerking:</strong> Alle foto's worden zorgvuldig nabewerkt en opgeleverd in zowel hoge resolutie (voor print) als geoptimaliseerde webformaten.</li>
        </ul>
        <p>Neem gerust <a href="/contact/">contact</a> op om uw aanstaande evenement in Amsterdam te bespreken en een vrijblijvende prijsindicatie te ontvangen. Bekijk ook de <a href="/tarieven/">tarieven</a> voor evenementfotografie.</p>"""

WERKWIJZE_AMS_NEW = """        <ul>
          <li><strong>Onopvallend aanwezig:</strong> Tijdens het event beweeg ik mij onopvallend tussen de gasten om authentieke beelden te maken.</li>
          <li><strong>Tijdige oplevering:</strong> De eerste selectie voor directe communicatie wordt afgestemd op uw communicatiebehoefte en planning. De volledige bewerkte set volgt doorgaans binnen enkele werkdagen.</li>
          <li><strong>Nabewerking:</strong> Alle foto's worden zorgvuldig nabewerkt en opgeleverd in zowel hoge resolutie (voor print) als geoptimaliseerde webformaten.</li>
        </ul>
        <p>Neem gerust <a href="/contact/">contact</a> op om uw aanstaande evenement in Amsterdam te bespreken.</p>"""

WERKWIJZE_RTM_OLD = """        <h2>Werkwijze: van sfeerimpressie tot snelle oplevering</h2>
        <p>Vooraf stemmen we de doelen, de gewenste sfeer en de uiteindelijke toepassing van de beelden af.</p>
        <ul>
          <li><strong>Onopvallend aanwezig:</strong> Tijdens het event beweeg ik mij onopvallend tussen de gasten om authentieke beelden te maken.</li>
          <li><strong>Snelle levering:</strong> De eerste selectie beelden voor directe communicatie (LinkedIn/nieuwsberichten) kan vaak al tijdens of direct na het event worden geleverd.</li>
          <li><strong>Nabewerking:</strong> Alle foto's worden zorgvuldig nabewerkt en opgeleverd in zowel hoge resolutie (voor print) als geoptimaliseerde webformaten.</li>
        </ul>
        <p>Neem gerust <a href="/contact/">contact</a> op om uw aanstaande evenement in Rotterdam te bespreken en een vrijblijvende prijsindicatie te ontvangen. Bekijk ook de <a href="/tarieven/">tarieven</a> voor evenementfotografie.</p>"""

WERKWIJZE_RTM_NEW = """        <h2>Werkwijze: van briefing tot oplevering</h2>
        <p>Een opdracht begint met een korte briefing: doel van de beelden, programma, locatie en wie er intern aanspreekpunt is. Daarna stemmen we het draaiboek af — van keynotes en persmomenten tot netwerkborrel — zodat ik op de dag weet waar ik moet staan zonder het programma te verstoren. Na afloop volgt een snelle eerste selectie voor LinkedIn of nieuws, en daarna de volledige, nabewerkte set.</p>
        <p>Of je een multinational, scale-up of organisatieteam bent: boeken gaat via <a href="/contact/">contact</a>. Vanuit Den Haag werk ik regelmatig in Rotterdam (Ahoy, De Doelen en regio); zo combineer je lokale kennis met snelle inzetbaarheid in de Rijnmond.</p>
        <ul>
          <li><strong>Onopvallend aanwezig:</strong> Tijdens het event beweeg ik mij onopvallend tussen de gasten om authentieke beelden te maken.</li>
          <li><strong>Tijdige oplevering:</strong> De eerste selectie voor directe communicatie wordt afgestemd op uw communicatiebehoefte en planning. De volledige bewerkte set volgt doorgaans binnen enkele werkdagen.</li>
          <li><strong>Nabewerking:</strong> Alle foto's worden zorgvuldig nabewerkt en opgeleverd in zowel hoge resolutie (voor print) als geoptimaliseerde webformaten.</li>
        </ul>
        <p>Neem gerust <a href="/contact/">contact</a> op om uw aanstaande evenement in Rotterdam te bespreken.</p>"""

EN_EVENT_META = {
    "en/event-photographer-the-hague/index.html": {
        "webpage_name": "Corporate Event Photographer The Hague | Willem Martinot",
        "description": "Corporate event photography for conferences, summits and diplomatic events in The Hague. Professional, discreet and reliable for international organisations.",
        "service_name": "Event Photography The Hague",
        "city": "The Hague",
        "intro": "I am Willem Martinot, an event photographer in The Hague for companies, government institutions and organisations. I photograph conferences and corporate events — discreetly, with an eye for atmosphere, interaction and the moments that matter for LinkedIn, press and internal communications.",
        "bullets": [
            ("25+ years", "experience"),
            ("FS-ISAC", " · TU Delft · Mojo · Embassies"),
            ("World Forum", " · Fokker Terminal · Ahoy · De Witte Society"),
            (None, "Discreet &amp; professional"),
        ],
        "workflow_city": "The Hague",
        "workflow_extra": "Whether you are a multinational, international organisation or local team: booking goes via <a href=\"/en/contact/\">contact</a>. The Hague is my base, so I know the logistics of World Forum, Fokker Terminal and embassies, and can respond quickly to current moments.",
        "duplicate_heading": "Workflow: from atmosphere impressions to fast delivery",
        "sticky": "Event photographer The Hague",
    },
    "en/event-photographer-amsterdam/index.html": {
        "webpage_name": "Corporate Event Photographer Amsterdam | Willem Martinot",
        "description": "Corporate event photography for conferences and business events in Amsterdam. Professional, discreet and reliable for organisations that expect quality.",
        "service_name": "Event Photography Amsterdam",
        "city": "Amsterdam",
        "intro": "I am Willem Martinot, an event photographer in Amsterdam for companies, government institutions and organisations. I photograph conferences and corporate events — discreetly, with an eye for atmosphere, interaction and the moments that matter for LinkedIn, press and internal communications.",
        "bullets": [
            ("25+ years", "experience"),
            ("FS-ISAC", " · TU Delft · Mojo · Embassies"),
            ("RAI", " · Beurs van Berlage · Westergasfabriek"),
            (None, "Discreet &amp; professional"),
        ],
        "workflow_city": "Amsterdam",
        "workflow_extra": "Whether you are a multinational, scale-up or organising team: booking goes via <a href=\"/en/contact/\">contact</a>. From my base in The Hague I work regularly in Amsterdam (RAI, Zuidas and the region), combining local knowledge with fast availability in the metropolitan area.",
        "duplicate_heading": "Approach: from atmosphere impressions to fast delivery",
        "sticky": "Event photographer Amsterdam",
    },
    "en/event-photographer-rotterdam/index.html": {
        "webpage_name": "Corporate Event Photographer Rotterdam | Willem Martinot",
        "description": "Corporate event photography for conferences and business events in Rotterdam. Professional, discreet and reliable for organisations that expect quality.",
        "service_name": "Event Photography Rotterdam",
        "city": "Rotterdam",
        "intro": "I am Willem Martinot, an event photographer in Rotterdam for companies, government institutions and organisations. I photograph conferences and corporate events — discreetly, with an eye for atmosphere, interaction and the moments that matter for LinkedIn, press and internal communications.",
        "bullets": [
            ("25+ years", "experience"),
            ("TU Delft", " · Brandformula · Business organisations"),
            ("Ahoy", " · De Doelen · Van Nelle Factory"),
            (None, "Discreet &amp; professional"),
        ],
        "workflow_city": "Rotterdam",
        "workflow_extra": "Whether you are a multinational, scale-up or organising team: booking goes via <a href=\"/en/contact/\">contact</a>. From my base in The Hague I work regularly in Rotterdam (Ahoy, De Doelen and the region), combining local knowledge with fast availability in the Rijnmond.",
        "duplicate_heading": None,
        "single_workflow_old": True,
        "sticky": "Event photographer Rotterdam",
    },
}


def replace(path: Path, old: str, new: str) -> bool:
    text = path.read_text(encoding="utf-8")
    if old not in text:
        return False
    path.write_text(text.replace(old, new, 1), encoding="utf-8")
    return True


def replace_all(path: Path, old: str, new: str) -> int:
    text = path.read_text(encoding="utf-8")
    count = text.count(old)
    if count:
        path.write_text(text.replace(old, new), encoding="utf-8")
    return count


def bullets_html(items):
    lines = ['        <ul class="proof-points" aria-label="Key points">']
    for strong, rest in items:
        if strong:
            lines.append(f"          <li><strong>{strong}</strong>{rest}</li>")
        else:
            lines.append(f"          <li>{rest}</li>")
    lines.append("        </ul>")
    return "\n".join(lines)


def update_homepage():
    path = ROOT / "index.html"
    old = (
        "Fotograaf voor events, congressen en portretten in de Randstad. "
        "Foto's vaak binnen 24 uur. Klanten: North Sea Jazz &amp; DP World. "
        "Vraag een offerte aan."
    )
    new = (
        "Fotograaf voor events, congressen en portretten in de Randstad. "
        "Klanten: North Sea Jazz &amp; DP World. Professioneel, discreet en betrouwbaar."
    )
    replace_all(path, old, new)


def update_nl_events():
    replace(ROOT / "eventfotograaf-amsterdam/index.html", WERKWIJZE_AMS_OLD, WERKWIJZE_AMS_NEW)
    replace(ROOT / "eventfotograaf-rotterdam/index.html", WERKWIJZE_RTM_OLD, WERKWIJZE_RTM_NEW)

    for path in [
        ROOT / "eventfotograaf-amsterdam/index.html",
        ROOT / "eventfotograaf-rotterdam/index.html",
    ]:
        replace_all(path, "Hoe snel lever je eventfoto's?", "Hoe verloopt de oplevering van eventfoto's?")

    den_haag = ROOT / "event-fotograaf-den-haag/index.html"
    replace_all(den_haag, "Waarom boeken organisaties jou als eventfotograaf?", "Waarom boeken organisaties je als eventfotograaf?")
    old_faq = (
        "Organisaties kiezen mij om discrete werkwijze, snelle eerste selectie "
        "(vaak binnen 24 uur) en beelden die direct inzetbaar zijn voor LinkedIn, "
        "pers en interne communicatie."
    )
    new_faq = (
        "Organisaties kiezen mij om discrete werkwijze en beelden die direct "
        "inzetbaar zijn voor LinkedIn, pers en interne communicatie."
    )
    replace_all(den_haag, old_faq, new_faq)


def update_nl_portraits():
    for rel in ["portretfotograaf-amsterdam/index.html", "portretfotograaf-rotterdam/index.html"]:
        replace_all(ROOT / rel, PORTRAIT_DELIVERY_OLD, PORTRAIT_DELIVERY_NL)


def update_linkedin_nl():
    path = ROOT / "linkedin-profielfoto-den-haag/index.html"
    old = (
        "Neem contact op via het contactformulier of e-mail. We plannen een sessie "
        "van 30–45 minuten in studio of op jouw kantoor. Je ontvangt de bewerkte "
        "LinkedIn profielfoto meestal binnen één werkdag, klaar om te uploaden."
    )
    new = (
        "Neem contact op via het contactformulier of e-mail. We plannen een sessie "
        "van 30–45 minuten in studio of op uw kantoor. U ontvangt professioneel "
        "bewerkte beelden, klaar om te uploaden."
    )
    replace_all(path, old, new)


def update_en_portraits():
    for rel in [
        "en/corporate-portrait-photographer-the-hague/index.html",
        "en/corporate-portrait-photographer-amsterdam/index.html",
        "en/corporate-portrait-photographer-rotterdam/index.html",
    ]:
        replace_all(ROOT / rel, PORTRAIT_DELIVERY_OLD_EN, PORTRAIT_DELIVERY_EN)


def update_en_linkedin():
    path = ROOT / "en/linkedin-portrait-the-hague/index.html"
    replace_all(
        path,
        "Need a LinkedIn profile photo in The Hague? Studio or at your office, 30–45 min, photos within one working day, from €350. Also for teams.",
        "Professional LinkedIn portrait photography in The Hague for a confident and authoritative presence. Session of 30–45 minutes, on location or in studio.",
    )
    old = (
        "Get in touch via the contact form or email. We schedule a 30–45 minute "
        "session in studio or at your office. You usually receive the retouched "
        "LinkedIn profile photo within one working day, ready to upload."
    )
    new = (
        "Get in touch via the contact form or email. We schedule a 30–45 minute "
        "session in studio or at your office. You receive professionally retouched "
        "images, ready to upload."
    )
    replace_all(path, old, new)


def update_en_event(rel: str, cfg: dict):
    path = ROOT / rel
    text = path.read_text(encoding="utf-8")
    desc = cfg["description"]

    # JSON-LD WebPage
    import re

    text = re.sub(
        r'("@type": "WebPage",\s*"name": )"[^"]*"',
        rf'\1"{cfg["webpage_name"]}"',
        text,
        count=1,
    )
    text = re.sub(
        r'("@type": "WebPage",[\s\S]*?"description": )"[^"]*"',
        rf'\1"{desc}"',
        text,
        count=1,
    )

    # JSON-LD Service description
    text = re.sub(
        r'("@type": "Service",[\s\S]*?"description": )"[^"]*"',
        rf'\1"{desc}"',
        text,
        count=1,
    )

    # Hero intro + bullets
    intro_pattern = re.compile(
        r'(<h1 class="intro__h1">[^<]+</h1>\s*)<p>[^<]+</p>',
        re.MULTILINE,
    )
    bullets = bullets_html(cfg["bullets"])
    text = intro_pattern.sub(
        rf'\1<p>{cfg["intro"]}</p>\n{bullets}',
        text,
        count=1,
    )

    city = cfg["workflow_city"]
    duplicate = cfg.get("duplicate_heading")

    if cfg.get("single_workflow_old"):
        old_block = f"""        <h2>Approach: from atmosphere impressions to fast delivery</h2>
        <p>In advance we align on the goals, desired atmosphere and final use of the images.</p>
        <ul>
          <li><strong>Unobtrusive presence:</strong> During the event I move unobtrusively among guests to create authentic images.</li>
          <li><strong>Fast delivery:</strong> A first selection of images for immediate communication (LinkedIn/news updates) can often be delivered during or right after the event.</li>
          <li><strong>Post-production:</strong> All photos are carefully edited and delivered in both high resolution (for print) and optimised web formats.</li>
        </ul>
        <p>Feel free to <a href="/en/contact/">get in touch</a> to discuss your upcoming event in {city} and receive a no-obligation quote. Also see my <a href="/en/rates/">rates</a> for event photography.</p>"""
        new_block = f"""        <h2>Workflow: from briefing to delivery</h2>
        <p>An assignment starts with a short briefing: the purpose of the images, the programme, the venue and who is the internal contact. We then align on a run-of-day — from keynotes and press moments to the networking reception — so I know where to be without disrupting the programme. Afterwards you get a fast first selection for LinkedIn or news, followed by the full, edited set.</p>
        <p>{cfg["workflow_extra"]}</p>
        <ul>
          <li><strong>Unobtrusive presence:</strong> During the event I move discreetly among guests to create authentic images.</li>
          <li><strong>Timely delivery:</strong> The first selection for immediate communication is aligned with your communications needs and schedule. The full edited set usually follows within a few business days.</li>
          <li><strong>Post-processing:</strong> All photos are carefully edited and delivered in high resolution (for print) and optimised web formats.</li>
        </ul>
        <p>Feel free to <a href="/en/contact/">get in touch</a> to discuss your upcoming event in {city}.</p>"""
        text = text.replace(old_block, new_block, 1)
    elif duplicate:
        old_block = f"""        <h2>{duplicate}</h2>
        <p>In advance we align on the goals, desired atmosphere and final use of the images.</p>
        <ul>
          <li><strong>Unobtrusive presence:</strong> During the event I move unobtrusively among guests to create authentic images.</li>
          <li><strong>Fast delivery:</strong> A first selection of images for immediate communication (LinkedIn/news updates) can often be delivered during or right after the event.</li>
          <li><strong>Post-production:</strong> All photos are carefully edited and delivered in both high resolution (for print) and optimised web formats.</li>
        </ul>
        <p>Feel free to <a href="/en/contact/">get in touch</a> to discuss your upcoming event in {city} and receive a no-obligation quote. Also see my <a href="/en/rates/">rates</a> for event photography.</p>"""
        new_block = f"""        <ul>
          <li><strong>Unobtrusive presence:</strong> During the event I move discreetly among guests to create authentic images.</li>
          <li><strong>Timely delivery:</strong> The first selection for immediate communication is aligned with your communications needs and schedule. The full edited set usually follows within a few business days.</li>
          <li><strong>Post-processing:</strong> All photos are carefully edited and delivered in high resolution (for print) and optimised web formats.</li>
        </ul>
        <p>Feel free to <a href="/en/contact/">get in touch</a> to discuss your upcoming event in {city}.</p>"""
        text = text.replace(old_block, new_block, 1)

    text = text.replace(
        "How quickly do you deliver event photos?",
        "How does delivery of event photos work?",
    )

    text = text.replace(
        f'<p class="sticky-cta__text">{cfg["sticky"]} · from €650</p>',
        f'<p class="sticky-cta__text">{cfg["sticky"]}</p>',
    )

    path.write_text(text, encoding="utf-8")


def main():
    update_homepage()
    update_nl_events()
    update_nl_portraits()
    update_linkedin_nl()
    update_en_portraits()
    update_en_linkedin()
    for rel, cfg in EN_EVENT_META.items():
        update_en_event(rel, cfg)
    print("Premium copy batch 2 applied.")


if __name__ == "__main__":
    main()
