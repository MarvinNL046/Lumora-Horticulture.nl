# Google Shopping Feed Setup Guide

## 📦 Product Feed URLs

Je product feeds zijn nu automatisch gegenereerd en beschikbaar op:

### **Nederland (NL)**
```
https://lumorahorticulture.nl/api/feed/google-shopping?locale=nl
```

### **English (EN)**
```
https://lumorahorticulture.com/api/feed/google-shopping?locale=en
```

### **Deutsch (DE)**
```
https://lumorahorticulture.de/api/feed/google-shopping?locale=de
```

---

## 🚀 Google Merchant Center Setup

### **Stap 1: Voeg Product Feed Toe**

1. Ga naar [Google Merchant Center](https://merchants.google.com)
2. Klik op **"Products"** in het menu
3. Klik op **"Feeds"**
4. Klik op **"+ Add Feed"** (blauwe knop)

### **Stap 2: Feed Configuratie**

**Land selecteren:**
- 🇳🇱 Netherlands → Use feed URL with `?locale=nl`
- 🇬🇧 United Kingdom / International → Use `?locale=en`
- 🇩🇪 Germany → Use `?locale=de`

**Taal selecteren:**
- Nederlands (nl) / English (en) / Deutsch (de)

**Doelland:**
- Netherlands, Belgium, Germany (gratis verzending)

**Feed naam:**
- Bijv: "Lumora Products NL" of "Lumora Products EN"

### **Stap 3: Feed Bron Kiezen**

Selecteer: **"Scheduled fetch"** (Automatische ophaling)

**Feed URL:**
Plak de juiste feed URL (zie boven)

**Ophaal frequentie:**
- **Aanbevolen:** Dagelijks om 08:00 (of wanneer je wilt)
- Je kunt ook vaker updaten als je prijzen vaak wijzigt

**Username/Password:**
- Laat leeg (feed is publiek toegankelijk)

### **Stap 4: Feed Verwerking**

Klik op **"Create Feed"**

Google gaat nu:
1. ✅ Je feed ophalen
2. ✅ Producten valideren
3. ✅ Eventuele fouten rapporteren

⏱️ **Verwerkingstijd:** 15 minuten - 24 uur

---

## 📊 Feed Validatie & Troubleshooting

### **Controleer Feed Status**

Na het aanmaken:
1. Ga naar **Products → Feeds**
2. Klik op je feed naam
3. Check het **"Processing"** tabblad

### **Veel Voorkomende Waarschuwingen:**

#### ⚠️ **"Missing GTIN"**
**Oplossing:** Je producten hebben geen EAN/barcode. Dit is OK voor custom producten.
- De feed bevat al `<g:identifier_exists>false</g:identifier_exists>`
- Google accepteert dit voor unieke/custom producten

#### ⚠️ **"Image quality"**
**Oplossing:** Zorg dat product afbeeldingen:
- Minimaal 800x800 pixels zijn
- JPG, PNG, GIF, BMP, TIFF, WEBP formaat
- Witte achtergrond (aanbevolen)

#### ⚠️ **"Missing google_product_category"**
**Oplossing:** De feed gebruikt al category `2962` (Agriculture > Horticulture).
Je kunt specifiekere categorieën toevoegen in de database:
- Zie: https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt

---

## 🎯 Shopping Campagne Aanmaken

### **Stap 1: Nieuwe Campagne**

1. Ga naar **Google Ads**
2. Klik op **"+ New Campaign"**
3. Kies doel: **"Sales"** of **"Website traffic"**
4. Campagne type: **"Shopping"**

### **Stap 2: Shopping Campagne Type**

Kies: **"Standard Shopping Campaign"** (voor beginners)

Later kun je upgraden naar **"Performance Max"** voor betere AI-optimalisatie.

### **Stap 3: Merchant Center Koppeling**

Selecteer je **Merchant Center account**
- Moet al gekoppeld zijn aan je Google Ads account

### **Stap 4: Campagne Instellingen**

**Campagne naam:** Bijv. "Lumora Shopping NL"

**Netwerken:**
- ✅ Google Zoekresultaten
- ✅ Google Shopping tab
- ⚠️ Search partners (optioneel, kan later)

**Locaties:**
- Nederland, België, Duitsland (of waar je wilt adverteren)

**Budget:**
- Start met €10-20 per dag
- Verhoog als je resultaten ziet

**Bidding strategie (begin):**
- **Manual CPC** → Meer controle, goed voor start
- Later: **Target ROAS** (Return on Ad Spend)

### **Stap 5: Ad Group & Products**

**Ad Group naam:** "Alle Producten" (of specifieke groep)

**Producten selecteren:**
- **"All products"** → Adverteer alle producten
- Of maak product groepen op basis van:
  - Product type (Trays, Pluggen, Verpakkingen)
  - Prijs range
  - Best sellers

### **Stap 6: Launch!**

Klik **"Publish Campaign"**

Google gaat nu je producten reviewen (24-48 uur).

---

## 📈 Optimalisatie Tips

### **Week 1-2: Learning Phase**
- ⏰ Laat campagne minimaal 2 weken draaien
- 📊 Verzamel data (clicks, impressions, conversions)
- 🚫 Verander niet te veel tegelijk

### **Week 3+: Optimaliseren**

**Top Performers:**
- 🎯 Verhoog bids voor best verkopende producten
- 💰 Maak aparte ad groups voor top sellers

**Underperformers:**
- 📉 Verlaag bids of sluit uit
- 🔍 Check of product title/description aantrekkelijk genoeg is

**Negatieve Keywords:**
- ❌ Voeg toe via Search Terms rapport
- Bijv: "gratis", "tweedehands", "review"

**Bid Strategie:**
- Start: Manual CPC (€0.50 - €2.00 per click)
- Later: Target ROAS (bijv. 300% = €3 omzet per €1 kosten)

---

## 🔄 Feed Updates

### **Automatisch:**
De feed update **elke dag automatisch** met:
- ✅ Nieuwe producten
- ✅ Prijswijzigingen
- ✅ Voorraad updates
- ✅ Product beschrijvingen

### **Handmatige Update (indien nodig):**
1. Merchant Center → Feeds
2. Klik op feed naam
3. Klik **"Fetch now"**

---

## 🛠️ Feed Technische Details

### **Wat zit er in de feed?**

```xml
<item>
  <g:id>product-uuid</g:id>
  <g:title>Paper Plug Tray 84</g:title>
  <g:description>Professionele kweektray...</g:description>
  <g:link>https://lumorahorticulture.nl/winkel/paper-plug-tray-84</g:link>
  <g:image_link>https://lumorahorticulture.nl/images/product.jpg</g:image_link>
  <g:price>XX.XX EUR</g:price>
  <g:availability>in_stock</g:availability>
  <g:condition>new</g:condition>
  <g:brand>Lumora</g:brand>
  <g:google_product_category>2962</g:google_product_category>
  <g:shipping>
    <g:country>NL</g:country>
    <g:price>0.00 EUR</g:price>
  </g:shipping>
</item>
```

### **Multi-taal Support:**
- `?locale=nl` → Nederlandse namen/descriptions
- `?locale=en` → English names/descriptions
- `?locale=de` → Deutsche Namen/Beschreibungen

### **Gratis Verzending:**
Automatisch toegevoegd voor:
- 🇳🇱 Nederland
- 🇧🇪 België
- 🇩🇪 Duitsland

---

## 📞 Support

### **Google Merchant Center Issues:**
- Check: Products → Diagnostics
- Contact Google Merchant Support via help center

### **Feed Technische Problemen:**
- Test feed URL in browser: `/api/feed/google-shopping?locale=nl`
- Check Netlify deployment logs
- Verify database connectivity

---

## ✅ Checklist

- [ ] Merchant Center account gekoppeld aan Google Ads
- [ ] Feed toegevoegd in Merchant Center (NL/EN/DE)
- [ ] Feed succesvol gevalideerd (geen critical errors)
- [ ] Producten approved (kan 24-48u duren)
- [ ] Shopping campagne aangemaakt
- [ ] Budget ingesteld (start €10-20/dag)
- [ ] Locatie targeting ingesteld (NL, BE, DE)
- [ ] Conversie tracking actief (✅ al geïnstalleerd!)
- [ ] Campagne live gezet

---

## 🎉 Klaar!

Je Google Shopping campagne is nu live!

Monitor resultaten in:
- **Google Ads:** Campaign performance, clicks, conversions
- **Google Analytics 4:** User behavior, e-commerce tracking
- **Merchant Center:** Product status, feed issues

**Succes met je campagne!** 🚀📈
