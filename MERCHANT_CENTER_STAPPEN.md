# 🚀 Google Merchant Center - Eenvoudige Setup

## Wat je gaat invullen in Merchant Center:

### **Stap 1: Productbron toevoegen**

Kies: **"Producten uit een bestand toevoegen"** ✅

---

### **Stap 2: Productbron configureren**

**Naam van gegevensbron:**
```
Lumora Products NL
```
(of "Lumora Products EN" / "Lumora Products DE" voor andere talen)

---

### **Stap 3: Primair voer**

Selecteer: **"Gepland ophalen"** (Scheduled fetch)

Dit betekent dat Google automatisch elke dag je producten ophaalt van je website.

---

### **Stap 4: Feed URL invullen**

**Voor Nederlandse producten:**
```
https://lumorahorticulture.nl/api/feed/google-shopping?locale=nl
```

**Voor Engelse producten:**
```
https://lumorahorticulture.nl/api/feed/google-shopping?locale=en
```

**Voor Duitse producten:**
```
https://lumorahorticulture.nl/api/feed/google-shopping?locale=de
```

---

### **Stap 5: Land en taal**

**Land van verkoop:**
- 🇳🇱 Nederland (voor NL feed)
- 🇬🇧 United Kingdom (voor EN feed)
- 🇩🇪 Germany (voor DE feed)

**Taal van feed:**
- Nederlands (voor NL)
- English (voor EN)
- Deutsch (voor DE)

---

### **Stap 6: Ophaalfrequentie**

**Hoe vaak ophalen:**
- Dagelijks ✅

**Welk tijdstip:**
- 08:00 (ochtend) - aanbevolen
- Of elk ander tijdstip dat je wilt

---

### **Stap 7: Authenticatie**

**Gebruikersnaam:** Laat leeg

**Wachtwoord:** Laat leeg

De feed is publiek beschikbaar, geen login nodig.

---

### **Stap 8: Opslaan**

Klik op **"Opslaan"** of **"Create Feed"**

Google gaat nu:
1. Je feed ophalen
2. Je producten valideren
3. Eventuele fouten/waarschuwingen tonen

⏱️ Dit duurt 15 minuten tot 24 uur

---

## ✅ Checklist

- [ ] Feed toegevoegd in Merchant Center
- [ ] Feed URL correct ingevuld
- [ ] Land en taal ingesteld
- [ ] Gepland ophalen actief (dagelijks)
- [ ] Feed status: "Verwerken" of "Actief"

---

## 🔍 Feed Controleren

Na het toevoegen:

1. Ga naar **"Producten"** → **"Feeds"** in Merchant Center
2. Klik op je feed naam
3. Check de status:
   - ✅ **Actief** = Alles goed!
   - ⏳ **Verwerken** = Google is bezig (wacht 15-30 min)
   - ❌ **Fout** = Zie foutmelding en fix

---

## ⚠️ Mogelijke Waarschuwingen (en hoe te fixen)

### **"Missing GTIN"**
**Betekenis:** Je producten hebben geen EAN/barcode

**Oplossing:**
- Dit is OK voor custom producten!
- Google accepteert dit (feed bevat al `identifier_exists: false`)
- Je kunt deze waarschuwing negeren

---

### **"Image quality issue"**
**Betekenis:** Product afbeelding is te klein

**Oplossing:**
- Upload betere product foto's (minimaal 800x800 pixels)
- Gebruik witte achtergrond (aanbevolen)

---

### **"Missing price"**
**Betekenis:** Product heeft geen prijs

**Oplossing:**
- Check of alle producten in je database een prijs hebben
- Ververs de feed (wacht op volgende automatische update)

---

## 🎯 Na Goedkeuring

Zodra je feed is goedgekeurd (status: Actief):

### **Stap 1: Maak Shopping Campagne**

1. Ga naar **Google Ads**
2. Klik **"+ Nieuwe campagne"**
3. Doel: **"Verkopen"**
4. Type: **"Shopping"**
5. Selecteer je Merchant Center account
6. Stel budget in (start met €10-20/dag)
7. Kies locaties (NL, BE, DE)
8. Launch!

---

## 📞 Hulp Nodig?

### **Feed werkt niet?**

Test de feed URL in je browser:
```
https://lumorahorticulture.nl/api/feed/google-shopping?locale=nl
```

Je zou XML moeten zien met al je producten.

### **Google geeft errors?**

1. Check Merchant Center → Products → Diagnostics
2. Zie welke producten problemen hebben
3. Fix het probleem in je database
4. Wacht op volgende automatische update (of forceer update)

---

## 🚀 Klaar!

Je bent nu klaar om Google Shopping advertenties te draaien!

Monitor je resultaten in:
- **Google Ads** - Clicks, conversies, kosten
- **Merchant Center** - Product status, feed health
- **Google Analytics 4** - Gebruikersgedrag, verkopen

**Succes!** 📈
