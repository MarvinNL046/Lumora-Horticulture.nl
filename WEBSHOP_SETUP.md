# Webshop Setup Guide - Lumora Horticulture

## ✅ Wat is er gebouwd?

Een complete e-commerce oplossing met:
- **Database**: Neon PostgreSQL met Drizzle ORM
- **Betalingen**: Mollie integratie (iDEAL)
- **Google Merchant**: XML feed voor Google Shopping Ads
- **2 Producten**: LED Groeilamp 600W & Smart Klimaatregelaar Pro

---

## 📦 Stap 1: Environment Variables Configureren

Bewerk `.env.local` en vul je credentials in:

```env
# Neon Database - Vervang <jouw-password> met je Neon database password
DATABASE_URL=postgresql://neondb_owner:<jouw-password>@ep-frosty-truth-agyfp7a7.eu-central-1.aws.neon.tech/neondb?sslmode=require

# Mollie API - Verkrijg je API key van https://www.mollie.com/dashboard/
MOLLIE_API_KEY=test_xxxxxxxxxxxxxxxxxxxxxxxxxx

# Next.js URLs
NEXT_PUBLIC_BASE_URL=https://jouw-domein.nl
NEXT_PUBLIC_STORE_NAME=Lumora Horticulture
NEXT_PUBLIC_STORE_DOMAIN=https://lumora-horticulture.nl
```

### Hoe krijg je je credentials?

**Neon Database Password:**
1. Ga naar https://neon.tech/
2. Log in op je account
3. Ga naar je project "ep-frosty-truth-agyfp7a7"
4. Kopieer de connection string met wachtwoord

**Mollie API Key:**
1. Ga naar https://www.mollie.com/dashboard/
2. Maak een account aan (of log in)
3. Ga naar Developers > API keys
4. Kopieer je Test API key (begint met `test_`)
5. Voor productie: gebruik Live API key (begint met `live_`)

---

## 🗄️ Stap 2: Database Opzetten

```bash
# Installeer dependencies (als je dat nog niet hebt gedaan)
npm install

# Voer het database setup script uit
node scripts/setup-database.js
```

Dit script:
- Maakt de `products`, `orders` en `order_items` tabellen aan
- Voegt 2 sample producten toe
- Configureert indexes voor betere performance

**Alternatief - Met Drizzle Kit:**
```bash
npm run db:push
```

---

## 🚀 Stap 3: Applicatie Starten

```bash
npm run dev
```

De applicatie draait nu op: http://localhost:3000

---

## 🛍️ Pagina's en Routes

### Shop Pagina's
- **Producten overzicht**: `/nl/shop` of `/en/shop`
- **Individueel product**: `/nl/shop/[product-id]`
- **Checkout success**: `/nl/checkout/success`

### API Endpoints
- **Products lijst**: `GET /api/products`
- **Enkel product**: `GET /api/products/[id]`
- **Checkout**: `POST /api/checkout`
- **Mollie webhook**: `POST /api/webhooks/mollie`
- **Google Merchant feed**: `GET /api/google-merchant-feed`

---

## 📊 Google Merchant Center Setup

### Stap 1: Maak Google Merchant Account
1. Ga naar https://merchants.google.com/
2. Maak een account aan voor je bedrijf
3. Vul je bedrijfsgegevens in

### Stap 2: Voeg Product Feed Toe
1. Ga naar "Products" > "Feeds"
2. Klik op "Add feed"
3. Kies "Scheduled fetch"
4. Vul in:
   - **Feed name**: Lumora Products
   - **URL**: `https://lumora-horticulture.nl/api/google-merchant-feed`
   - **Frequency**: Daily
5. Klik "Create feed"

### Stap 3: Verifieer Website
1. Ga naar "Settings" > "Website verification"
2. Volg de instructies om je website te verifiëren
3. Claim je website URL

### Stap 4: Start Google Shopping Campagne
1. Ga naar Google Ads (https://ads.google.com/)
2. Maak een nieuwe Shopping campagne
3. Link je Merchant Center account
4. Configureer je budget en doelgroep

---

## 💳 Mollie Betalingen

### ✅ Beschikbare Betaalmethodes
Je webshop ondersteunt **automatisch alle betaalmethodes** die je activeert in Mollie:

**Populaire methodes in Nederland:**
- 🇳🇱 **iDEAL** - Meest gebruikte betaalmethode in NL
- 💳 **Creditcard** - Visa, Mastercard, American Express
- 🍎 **Apple Pay** - Snelle checkout voor Apple gebruikers
- 💰 **PayPal** - Internationaal vertrouwd
- 🇧🇪 **Bancontact** - Voor Belgische klanten
- ⏰ **Klarna** - Achteraf betalen of in delen

**Andere beschikbare methodes:**
Bankoverschrijving, SEPA Direct Debit, Przelewy24, Giropay, EPS, en meer.

### 🔧 Betaalmethodes Activeren

1. Ga naar je **Mollie Dashboard**: https://www.mollie.com/dashboard/
2. Navigeer naar **Settings** > **Payment methods**
3. Klik op **Activate** bij gewenste methodes
4. Volg de verificatiestappen (KYC voor sommige methodes)
5. **Klaar!** - De methodes verschijnen automatisch in je checkout

**Tip:** Activeer minimaal iDEAL + Creditcard voor maximale conversie in NL.

### Test Mode
Gebruik deze test credentials:

**iDEAL Test:**
- Selecteer "Test Bank" in de Mollie checkout
- Kies "Paid" voor succesvolle betaling
- Of "Failed" om foutafhandeling te testen

**Creditcard Test:**
- Kaartnummer: `5555 5555 5555 4444` (Mastercard)
- CVC: `123`
- Vervaldatum: Elke datum in de toekomst

**Andere test methodes:**
Mollie biedt test mode voor alle betaalmethodes. Zie: https://docs.mollie.com/overview/testing

### Productie Mode
1. Verander `MOLLIE_API_KEY` van `test_xxx` naar je `live_xxx` API key
2. Deploy je applicatie
3. Test met echte (kleine) bestellingen
4. Monitor betalingen in Mollie Dashboard

---

## 📝 Product Data Beheren

### Producten toevoegen via SQL

```sql
INSERT INTO products (name, description, price, image_url, gtin, brand, availability, google_product_category, product_type, metadata)
VALUES (
  'Jouw Product Naam',
  'Product beschrijving',
  149.99,
  '/productAfbeeldingen/product.jpg',
  '8719326123470',
  'Lumora',
  'in stock',
  '1626',
  'Category > Subcategory',
  '{"feature1": "value1", "feature2": "value2"}'::json
);
```

### Producten updaten
```sql
UPDATE products
SET price = 189.99, availability = 'out of stock'
WHERE id = 'product-uuid';
```

### Drizzle Studio (visuele database editor)
```bash
npm run db:studio
```
Opent een browser interface op https://local.drizzle.studio

---

## 🔧 Belangrijke Bestanden

```
├── src/
│   ├── db/
│   │   ├── schema.ts          # Database schema definitie
│   │   └── index.ts           # Database client
│   ├── lib/
│   │   └── mollie.ts          # Mollie payment helpers
│   ├── app/
│   │   ├── api/
│   │   │   ├── products/      # Product API endpoints
│   │   │   ├── checkout/      # Checkout API
│   │   │   ├── webhooks/mollie/  # Mollie webhook handler
│   │   │   └── google-merchant-feed/  # Google feed generator
│   │   └── [locale]/
│   │       ├── shop/          # Shop pagina's
│   │       └── checkout/success/  # Success pagina
├── drizzle/
│   └── 0000_initial.sql       # Database migratie SQL
├── scripts/
│   └── setup-database.js      # Database setup script
├── .env.local                 # Environment variables (NIET committen!)
└── drizzle.config.ts          # Drizzle ORM configuratie
```

---

## 🎨 Product Afbeeldingen

Plaats je product afbeeldingen in:
```
/public/productAfbeeldingen/
```

Voorbeelden:
- `/public/productAfbeeldingen/led-groeilamp-600w.jpg`
- `/public/productAfbeeldingen/klimaatregelaar-pro.jpg`

---

## 🚢 Deployment naar Vercel

### Stap 1: Environment Variables
Voeg deze toe in Vercel dashboard (Project → Settings → Environment Variables), of via `vercel env add`:
- `DATABASE_URL`
- `MOLLIE_API_KEY`
- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_STORE_NAME`
- `NEXT_PUBLIC_STORE_DOMAIN`

### Stap 2: Deploy
```bash
git add .
git commit -m "Add e-commerce functionality"
git push origin main
```

Vercel deployt automatisch bij pushes naar `main`.

---

## 📧 Order Notificaties (Toekomstige Feature)

Voor het versturen van orderbevestigingen per email, kun je een service zoals:
- SendGrid
- Mailgun
- Resend

toevoegen aan je Mollie webhook handler.

---

## 🛡️ Beveiliging

- ✅ Database credentials in `.env.local` (niet in git)
- ✅ Mollie webhook signature verificatie (al geïmplementeerd)
- ✅ Input validatie op alle API endpoints
- ✅ HTTPS verplicht voor productie (Vercel doet dit automatisch)

---

## 🐛 Troubleshooting

### Database verbinding mislukt
- Controleer of `DATABASE_URL` correct is in `.env.local`
- Test de verbinding via Neon dashboard

### Mollie betaling mislukt
- Controleer of je API key correct is
- Gebruik test mode eerst voordat je live gaat
- Check de Mollie dashboard voor error logs

### Google Merchant feed errors
- Controleer of producten geldige GTIN codes hebben
- Zorg dat alle verplichte velden zijn ingevuld
- Test de feed URL: `/api/google-merchant-feed`

---

## 📞 Support

Voor vragen:
- Neon Database: https://neon.tech/docs
- Mollie: https://docs.mollie.com/
- Google Merchant: https://support.google.com/merchants/

---

## ✨ Volgende Stappen

1. ✅ Database opzetten
2. ✅ .env.local configureren
3. ✅ App starten en testen
4. 🔲 Product afbeeldingen uploaden
5. 🔲 Google Merchant Center configureren
6. 🔲 Mollie productie API key verkrijgen
7. 🔲 Deployment naar productie
8. 🔲 Google Shopping campagne starten

**Succes met je webshop! 🎉**
