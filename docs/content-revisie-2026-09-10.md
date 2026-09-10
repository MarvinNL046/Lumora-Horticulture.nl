# Contentronde 10 september 2026

## Wijzigingen

- TOFU: bestaande bewortelengids herschreven rond tien praktische aandachtspunten; geen verzonnen ervaring of gegarandeerde resultaten.
- MOFU: bestaande steenwol/kokos-vergelijking herschreven rond voorbereiding, werkvolgorde, overzetten en productgegevens.
- NeemXPRO: oude neemblog vervangen door bladverzorgingsinformatie. Nieuwe URL `/blog/neemxpro-bladverzorging-gebruik`; oude URL krijgt een permanente redirect. De frontend ondersteunt beide CMS-slugs tijdens de uitrol.
- Drie andere blogs: NeemXPRO-/neemaanbevelingen verwijderd. Overige teelt-, veiligheids- en behandeladviezen zijn in deze ronde niet volledig beoordeeld.
- Koppen worden als echte h2/h3 weergegeven; links en bronnen zijn klikbaar. CMS-HTML wordt niet uitgevoerd.
- Oude NeemXPRO-actie, flyer en spuitschema verwijzen naar de huidige productinformatie.
- Generator: vervallen producten, verzonnen ervaring, geforceerde lengte/linkaantallen en ongefundeerde volumeschattingen verwijderd. Onderwerpenlijst beperkt tot passende, gemeten vervolgonderwerpen.

## CMS en terugzetten

De site gebruikt voor deze blogs `quirky-axolotl-369` (project `lumorahorti`). Zes specifieke documenten zijn via de geauthenticeerde Convex-beheerfunctie op ID gepatcht; geen tabelvervanging, schemawijziging of backenddeploy. De vijf overige documenten zijn vóór/na exact vergeleken en gelijk gebleven.

De wijzigingen staan in `content/revisions/2026-09-10.json`. Het oorspronkelijke CMS-exportbestand en publicatiescript staan in de lokale taakmap `2026-09-10/heb/work`. Terugzetten kan per aangepast veld met de oorspronkelijke waarden; houd bij terugzetten van de neemslug rekening met de frontendredirect. Credentials staan niet in de revisiebestanden.

## Bronnen

- RHS: https://www.rhs.org.uk/propagation/softwood-cuttings
- Grodan: https://www.grodan.com/global/solutions/controlled-environment-agriculture/propagation/4-phase-model/phase-1/
- CANNA: https://www.canna-uk.com/coco_professional_plus
- Productgegevens: actuele Lumora-productpagina en gebruiksgids.

Fabrikantinformatie is als productspecifiek behandeld, zonder numerieke recepten te kopiëren naar Lumora-producten. Dit is geen eigen vergelijkingsproef.

## Validatie

TypeScript en ESLint zonder fouten. Acht gerichte tests voor veilige tekst/koppen/links en de NL/DE/EN-positioneringscontrole geslaagd. Productiebuild en browsercontrole volgen via Vercel met de bestaande omgevingsvariabelen.

## Volgende contentronde

Stekpluggen of stekgrond, daarna bestaande verspenengids aanscherpen. Lange dunne zaailingen en seizoensgidsen blijven afzonderlijke briefs. Zoekvolumes worden niet als verkeersprognose gebruikt. De automatische generator is in deze ronde niet gestart.
