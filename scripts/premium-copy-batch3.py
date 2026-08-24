#!/usr/bin/env python3
"""Premium copy batch 3: hub pages FAQ + blog meta/excerpts."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

HUB_DELIVERY_NL_OLD = (
    "Voor events kan een eerste selectie vaak binnen 24 uur worden geleverd. "
    "Portretten meestal binnen één werkdag. De volledige set volgt binnen de "
    "afgesproken termijn — altijd afgestemd op jouw planning."
)
HUB_DELIVERY_NL_NEW = (
    "Dat hangt af van het type opdracht en de afspraken vooraf. Voor events "
    "volgt een eerste selectie doorgaans dezelfde dag of de volgende werkdag; "
    "portretten binnen twee tot vijf werkdagen. De volledige set volgt binnen "
    "de afgesproken termijn — altijd afgestemd op uw planning."
)

HUB_DELIVERY_EN_OLD = (
    "For events an initial selection can often be delivered within 24 hours. "
    "Portraits usually within one business day. The full set follows within the "
    "agreed timeframe — always aligned with your schedule."
)
HUB_DELIVERY_EN_NEW = (
    "That depends on the assignment type and agreements made in advance. For "
    "events, an initial selection usually follows the same day or the next "
    "business day; portraits within two to five business days. The full set "
    "follows within the agreed timeframe — always aligned with your schedule."
)

BLOG_COMPARE_META_NL_OLD = (
    "Evenementenfotograaf vergelijken? Checklist voor congressen en corporate "
    "events: portfolio, levering binnen 24 uur, prijs vanaf €650 en locatie-ervaring."
)
BLOG_COMPARE_META_NL_NEW = (
    "Evenementenfotograaf vergelijken? Checklist voor congressen en corporate "
    "events: portfolio, werkwijze, oplevering en locatie-ervaring."
)

BLOG_COMPARE_META_EN_OLD = (
    "Comparing event photographers for conferences and corporate events? "
    "Checklist: portfolio fit, photos within 24h, rates from €650, and venue experience."
)
BLOG_COMPARE_META_EN_NEW = (
    "Comparing event photographers for conferences and corporate events? "
    "Checklist: portfolio fit, working style, delivery and venue experience."
)

BLOG_EXCERPT_NL_OLD = (
    "Waar let je op bij het vergelijken van evenementenfotografen? Portfolio, "
    "levering binnen 24 uur, tarieven vanaf €650 en locatie-ervaring."
)
BLOG_EXCERPT_NL_NEW = (
    "Waar let je op bij het vergelijken van evenementenfotografen? Portfolio, "
    "werkwijze, oplevering en locatie-ervaring."
)

BLOG_EXCERPT_EN_OLD = (
    "What to check when comparing event photographers: portfolio fit, delivery "
    "within 24 hours, rates from €650 and venue experience."
)
BLOG_EXCERPT_EN_NEW = (
    "What to check when comparing event photographers: portfolio fit, working "
    "style, delivery and venue experience."
)

PORTRAIT_BLOG_NL_OLD = (
    "De beelden worden geleverd als professioneel nabewerkte JPEG's, via een "
    "beveiligde downloadlink — in veel gevallen al binnen één werkdag. Direct "
    "inzetbaar voor LinkedIn, website, pers en interne communicatie."
)
PORTRAIT_BLOG_NL_NEW = (
    "De beelden worden geleverd als professioneel nabewerkte JPEG's via een "
    "beveiligde downloadlink. Direct inzetbaar voor LinkedIn, website, pers "
    "en interne communicatie."
)

PORTRAIT_BLOG_EN_OLD = (
    "Images are delivered as professionally edited JPEGs via a secure download "
    "link — in most cases within one working day. Ready to use immediately for "
    "LinkedIn, your website, press and internal communications."
)
PORTRAIT_BLOG_EN_NEW = (
    "Images are delivered as professionally edited JPEGs via a secure download "
    "link. Ready to use immediately for LinkedIn, your website, press and "
    "internal communications."
)


def replace_all(path: Path, old: str, new: str) -> int:
    text = path.read_text(encoding="utf-8")
    count = text.count(old)
    if count:
        path.write_text(text.replace(old, new), encoding="utf-8")
    return count


def main():
    for rel in [
        "fotograaf-amsterdam/index.html",
        "fotograaf-rotterdam/index.html",
    ]:
        replace_all(ROOT / rel, HUB_DELIVERY_NL_OLD, HUB_DELIVERY_NL_NEW)

    for rel in [
        "en/commercial-photographer-amsterdam/index.html",
        "en/commercial-photographer-rotterdam/index.html",
    ]:
        replace_all(ROOT / rel, HUB_DELIVERY_EN_OLD, HUB_DELIVERY_EN_NEW)

    replace_all(
        ROOT / "blog-fotograaf-den-haag/evenementen-fotograaf-vergelijking/index.html",
        BLOG_COMPARE_META_NL_OLD,
        BLOG_COMPARE_META_NL_NEW,
    )
    replace_all(
        ROOT / "en/blog/event-photographer-comparison/index.html",
        BLOG_COMPARE_META_EN_OLD,
        BLOG_COMPARE_META_EN_NEW,
    )
    replace_all(ROOT / "blog-fotograaf-den-haag/index.html", BLOG_EXCERPT_NL_OLD, BLOG_EXCERPT_NL_NEW)
    replace_all(ROOT / "en/blog/index.html", BLOG_EXCERPT_EN_OLD, BLOG_EXCERPT_EN_NEW)
    replace_all(
        ROOT / "blog-fotograaf-den-haag/zakelijke-portretfotografie/index.html",
        PORTRAIT_BLOG_NL_OLD,
        PORTRAIT_BLOG_NL_NEW,
    )
    replace_all(
        ROOT / "en/blog/corporate-portrait-photography/index.html",
        PORTRAIT_BLOG_EN_OLD,
        PORTRAIT_BLOG_EN_NEW,
    )
    print("Premium copy batch 3 applied.")


if __name__ == "__main__":
    main()
