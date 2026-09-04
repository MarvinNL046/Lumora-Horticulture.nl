# SEO-plan Lumora Horticulture (september 2026)

Bron: Ahrefs Keywords Explorer + Site Explorer (4 sep 2026), GSC 16 maanden.
Uitgangspositie: design-migratie klaar (f22a056), 82 URL's in de sitemap, DR 6 (−24 in één maand), 119 verwijzende domeinen (31 followed), organisch 1 keyword in de Ahrefs-index. Praktisch: nulpunt.

## 1. Waar de vraag zit

### Nederland (SV/maand, KD)
| Cluster | Keyword | SV | KD |
|---|---|---|---|
| Plaag | bladluis bestrijden | 4.000 | 2 |
| Plaag | spint bestrijden | 2.200 | 0 |
| Plaag | trips bestrijden | 1.700 | 0 |
| Neem | neemolie | 1.500 | 0 |
| Neem | neemolie kruidvat (branded) | 800 | 0 |
| Neem | neem olie | 700 | 0 |
| Neem | neemolie voor planten | 450 | 0 |
| Neem | neemolie kopen | 350 | 0 |
| Neem | wat is neemolie | 200 | 0 |
| Neem | neem olie werking | 100 | 0 |
| Plaag-sub | spint bestrijden buiten / kamerplant | 250 / 150 | 1 |
| Plaag-sub | bladluis bestrijden kamerplant | 150 | 1 |
| Plaag-sub | spint/trips/bladluis biologisch bestrijden | 100 / 100 / 80 | 0-2 |
| Trays | kweektrays | 150 | 0 |
| Trays | steenwol pluggen / stekpluggen | 20 / 10 | 0 |

Conclusie NL: het stekpluggen-cluster is ~30 zoekopdrachten per maand. Niet in investeren voor SEO; de PDP's volstaan. Alle hefboom zit in neemolie + plaagbestrijding (samen ~13K/maand bij KD 0-2).

### Duitsland
| Keyword | SV | KD |
|---|---|---|
| neemöl | 28.000 | 33 |
| thripse bekämpfen | 12.000 | 1 |
| blattläuse bekämpfen | 7.900 | 45 |
| spinnmilben bekämpfen | 6.500 | 1 |
| neemöl kaufen | 2.300 | 3 |
| neemöl pflanzen | 400 | 70 |
| stecklinge bewurzeln / anzuchtplatten / steinwolle würfel | 90 / 70 / 50 | 0 |

Conclusie DE: de Duitse markt is 5-10x groter dan NL voor precies dezelfde onderwerpen, met twee gaten van KD 1 (thripse, spinnmilben) en een commercieel keyword van KD 3 (neemöl kaufen).

### Engels
Nog niet onderzocht (EN-pagina's hebben geen eigen landmarkt sinds de .com-consolidatie). Pas onderzoeken als NL+DE draaien.

## 2. Structuur (hub-and-spoke, per taal)

Hub A: **NeemXPRO productpagina** (/neemx-pro) = commerciële pagina voor "neemolie kopen" / "neemöl kaufen".
Hub B: **Neemolie uitgelegd** (nieuw, kennisbank) = "neemolie", "wat is neemolie", "neem olie werking", "neemolie voor planten".
Spokes plaagbestrijding (nieuw, kennisbank), elk met NeemXPRO als één van de oplossingen, eerlijk en met bron:
1. Bladluis bestrijden (NL 4.000 / DE 7.900) — subsecties kamerplant, buiten, biologisch, azijn/afwasmiddel-mythes
2. Spint bestrijden (NL 2.200 / DE 6.500) — kamerplant, buiten, biologisch
3. Trips bestrijden (NL 1.700 / DE 12.000) — biologisch vs chemisch, spray
4. Wolluis / witte vlieg (later; "witte bladluis" 90, wolluis 80)

Elke spoke linkt naar Hub B en naar de PDP; PDP linkt terug naar de drie spokes ("Waar helpt NeemXPRO bij?").

## 3. Volgorde

**Sprint 1 (NL + DE tegelijk, zelfde pagina's in beide talen):**
1. Hub B "Neemolie uitgelegd" / "Neemöl erklärt"
2. Trips bestrijden / Thripse bekämpfen (grootste DE-gat, KD 1)
3. Spint bestrijden / Spinnmilben bekämpfen (KD 0-1)
4. Bladluis bestrijden (NL KD 2; DE KD 45 → in DE pas na autoriteit)
5. PDP NeemXPRO: koopintentie-copy aanscherpen op "neemolie kopen"/"neemöl kaufen", FAQ met dosering, veiligheid, houdbaarheid.

**Sprint 2:** wolluis/witte vlieg, kamerplant-varianten, "neemolie kruidvat/action/intratuin"-vergelijking (branded vraag: waarom een concentraat i.p.v. drogisterij-neemolie).

**Niet doen:** meer steenwol/stekpluggen-content. De 6 bestaande steenwol-FAQ's blijven staan (95% van de kennisbank-klikken in GSC) maar krijgen geen uitbreiding.

## 4. Autoriteit (blokkade)
- DR daalde van 30 naar 6 in één maand. Vermoedelijk verlies van links door de .com/.de-consolidatie of afgevallen domeinen. Actie: Ahrefs → Backlinks → "Lost" over 30 dagen bekijken; waar het eigen domeinen zijn (lumorahorticulture.com/.de) checken dat de 308's staan (ze staan) en dat Ahrefs de redirects opnieuw crawlt.
- 54 van 248 gecrawlde pagina's zijn 404 in de Ahrefs-crawl: dat zijn de oude kennisbank-URL's van vóór de redirects van 3 sep. Volgende crawl lost dit op; sitemap opnieuw indienen in GSC.
- Zonder linkopbouw blijven de DE-keywords met KD 33-45 buiten bereik; de KD 0-3 keywords zijn wél haalbaar op DR 6.

## 5. Meten
- GSC: kennisbank-clicks per pagina (baseline ≈130/16 mnd, bijna alles steenwol).
- Ahrefs Rank Tracker: de 12 keywords hierboven in NL + DE.
- Conversie: NeemXPRO-orders per taal (Convex orders.locale).
