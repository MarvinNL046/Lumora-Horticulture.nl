import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { requireServerSecret } from "./lib/serverSecret";

export const seedProducts = mutation({
  args: { server_secret: v.string() },
  returns: v.object({
    added: v.number(),
    updated: v.number(),
    total: v.number(),
  }),
  handler: async (ctx, { server_secret }) => {
    requireServerSecret(server_secret);
    const products = [
      {
        slug: "paper-plug-tray-84",
        name: "Stekpluggen Steenwol 84",
        name_en: "Rockwool Propagation Plugs 84",
        name_de: "Steinwolle-Anzuchtstopfen 84",
        description: "Professionele stekpluggen in een Paper Plug Tray 84 met Ellepot FP 12+ technologie voor efficiënte zaailingen- en stekkenkweek. 84 cellen per tray, Ø38 mm x 42 mm diep. De papierwikkel houdt de plug bij elkaar en maakt direct overzetten mogelijk. Per doos ontvang je 8 trays met in totaal 672 cellen.",
        description_en: "Professional propagation plugs in a Paper Plug Tray 84 with Ellepot FP 12+ technology for efficient seedling and cutting production. 84 cells per tray, Ø38 mm x 42 mm deep. The paper wrap keeps each plug together for direct transplanting. Each box contains 8 trays with 672 cells in total.",
        description_de: "Professionelle Anzuchtstopfen im Paper Plug Tray 84 mit Ellepot FP 12+ Technologie für die effiziente Sämlings- und Stecklingsanzucht. 84 Zellen pro Tray, Ø38 mm x 42 mm tief. Die Papierhülle hält den Stopfen beim direkten Umpflanzen zusammen. Pro Karton 8 Trays mit insgesamt 672 Zellen.",
        price: 84,
        image_url: "/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-84-tray-front.webp",
        brand: "Ellepot",
        gtin: "9508277144577",
        availability: "in stock",
        google_product_category: "2988",
        product_type: "Business & Industrial > Agriculture > Plant Propagation",
        display_order: 1,
        metadata: {
          cells_per_tray: 84,
          cell_diameter: "38mm",
          cell_depth: "42mm",
          tray_dimensions: "540mm x 280mm x 42mm",
          volume_per_cell: "40ml",
          material: "Paper-wrapped growing plug",
          technology: "Ellepot FP 12+",
          stability: "12+ months",
          trays_per_box: 8,
          cells_per_box: 672,
          images: [
            "/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-84-tray-front.webp",
            "/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-84-tray-alternate.webp",
            "/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-84-open-box.webp",
            "/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-paperbus-detail.webp"
          ],
        },
      },
      {
        slug: "paper-plug-tray-104",
        name: "Stekpluggen Steenwol 104",
        name_en: "Rockwool Propagation Plugs 104",
        name_de: "Steinwolle-Anzuchtstopfen 104",
        description: "Professionele stekpluggen in een Paper Plug Tray 104 met Ellepot FP 12+ technologie voor intensieve zaailingen- en stekkenkweek. 104 cellen per tray, Ø32 mm x 40 mm diep. De hogere plantdichtheid benut de beschikbare ruimte efficiënt. Per doos ontvang je 7 trays met in totaal 728 cellen.",
        description_en: "Professional propagation plugs in a Paper Plug Tray 104 with Ellepot FP 12+ technology for intensive seedling and cutting production. 104 cells per tray, Ø32 mm x 40 mm deep. The higher cell density uses the available growing space efficiently. Each box contains 7 trays with 728 cells in total.",
        description_de: "Professionelle Anzuchtstopfen im Paper Plug Tray 104 mit Ellepot FP 12+ Technologie für die intensive Sämlings- und Stecklingsanzucht. 104 Zellen pro Tray, Ø32 mm x 40 mm tief. Die höhere Zelldichte nutzt die verfügbare Anbaufläche effizient. Pro Karton 7 Trays mit insgesamt 728 Zellen.",
        price: 80,
        image_url: "/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-104-tray.webp",
        brand: "Ellepot",
        gtin: "9508277144584",
        availability: "in stock",
        google_product_category: "2988",
        product_type: "Business & Industrial > Agriculture > Plant Propagation",
        display_order: 2,
        metadata: {
          cells_per_tray: 104,
          cell_diameter: "32mm",
          cell_depth: "40mm",
          tray_dimensions: "540mm x 280mm x 40mm",
          volume_per_cell: "30ml",
          material: "Paper-wrapped growing plug",
          technology: "Ellepot FP 12+",
          stability: "12+ months",
          trays_per_box: 7,
          cells_per_box: 728,
          images: [
            "/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-104-tray.webp",
            "/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-104-open-box.webp",
            "/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-paperbus-detail.webp"
          ],
        },
      },
      {
        slug: "transportdoos-vouwdoos",
        name: "Transportdoos (Vouwdoos)",
        name_en: "Transport Box (Foldable)",
        name_de: "Transportbox (Faltbar)",
        description: "Duurzame vouwbare transportdoos voor veilig transport van tuinbouwproducten. Stapelbaar en efficiënt. Afmetingen: 557 x 322 x 180mm. Verkocht per 25 stuks (inclusief verzendkosten).",
        description_en: "Durable foldable transport box for safe transportation of horticulture products. Stackable and efficient. Dimensions: 557 x 322 x 180mm. Sold per 25 units (shipping included).",
        description_de: "Haltbare faltbare Transportbox für den sicheren Transport von Gartenbau-Produkten. Stapelbar und effizient. Abmessungen: 557 x 322 x 180mm. Verkauft pro 25 Stück (Versand inklusive).",
        price: 62.50,
        image_url: "/productAfbeeldingen/verpakkingsdoos/transportdoos-sfeer.webp",
        brand: "Lumora",
        gtin: "9504398341949",
        availability: "in stock",
        google_product_category: "4215",
        product_type: "Business & Industrial > Agriculture > Transport & Packaging",
        display_order: 5,
        metadata: {
          dimensions: "557 x 322 x 180mm",
          units_per_package: 25,
          stackable: true,
          foldable: true,
          images: [
            "/productAfbeeldingen/verpakkingsdoos/transportdoos-sfeer.webp",
            "/productAfbeeldingen/verpakkingsdoos/lumorahorticulture-vouwdoos.jpg"
          ],
        },
      },
      {
        slug: "neemx-pro-10ml",
        name: "NEEMX PRO 10 ml",
        name_en: "NEEMX PRO 10 ml",
        name_de: "NEEMX PRO 10 ml",
        description: "Premium plantaardig olieconcentraat voor bladverzorging. NEEMX PRO combineert zorgvuldig geselecteerde plantaardige oliën, een natuurlijke antioxidant en een professioneel emulgatorsysteem voor een goede verdeling in water en gelijkmatige bedekking van het bladoppervlak. Het compacte 10 ml formaat is geschikt om kennis te maken met de formule.",
        description_en: "Premium plant-based oil concentrate for leaf care. NEEMX PRO combines carefully selected botanical oils, a natural antioxidant and a professional emulsifier system for good dispersion in water and even coverage of the leaf surface. The compact 10 ml size is suited to getting started with the formula.",
        description_de: "Hochwertiges pflanzliches Ölkonzentrat für die Blattpflege. NEEMX PRO kombiniert sorgfältig ausgewählte Pflanzenöle, ein natürliches Antioxidationsmittel und ein professionelles Emulgatorsystem für eine gute Verteilung im Wasser und eine gleichmäßige Benetzung der Blattoberfläche. Die kompakte 10-ml-Größe eignet sich zum Kennenlernen der Formel.",
        price: 24.95,
        image_url: "/productAfbeeldingen/neemxpro/neemx-pro-assortiment-travertijn-neem-bloesem.webp",
        brand: "NeemX",
        availability: "in stock",
        google_product_category: "2988",
        product_type: "Business & Industrial > Agriculture > Plant Care",
        display_order: 10,
        metadata: {
          volume: "10ml",
          type: "Botanical oil concentrate",
          concentrated: true,
          formulation: ["botanical oils", "natural antioxidant", "emulsifiers"],
          suitable_for: ["leaf care", "indoor plants", "greenhouse plants"],
          spray_coverage_m2: {
            min: 5,
            max: 40,
            basis: "0.1-0.2 L spray per m²",
            breakdown: [
              { dosage: "2.5 ml/L", spray_liters: 4, m2_range: "20-40" },
              { dosage: "5 ml/L", spray_liters: 2, m2_range: "10-20" },
              { dosage: "7 ml/L", spray_liters: 1.4, m2_range: "7-14" },
              { dosage: "10 ml/L", spray_liters: 1, m2_range: "5-10" },
            ],
          },
          images: [
            "/productAfbeeldingen/neemxpro/neemx-pro-assortiment-travertijn-neem-bloesem.webp",
            "/productAfbeeldingen/neemxpro/neemx-pro-50ml-travertijn-sokkel.webp",
            "/productAfbeeldingen/neemxpro/neemx-pro-50ml-leisteen-donker.webp",
            "/productAfbeeldingen/neemxpro/neemx-pro-hero-marmer-neem-tak.webp"
          ],
        },
      },
      {
        slug: "neemx-pro-30ml",
        name: "NEEMX PRO 30 ml",
        name_en: "NEEMX PRO 30 ml",
        name_de: "NEEMX PRO 30 ml",
        description: "Premium plantaardig olieconcentraat voor bladverzorging. NEEMX PRO combineert zorgvuldig geselecteerde plantaardige oliën, een natuurlijke antioxidant en een professioneel emulgatorsysteem voor een goede verdeling in water en gelijkmatige bedekking van het bladoppervlak. Het ruime 30 ml formaat is zuinig in gebruik.",
        description_en: "Premium plant-based oil concentrate for leaf care. NEEMX PRO combines carefully selected botanical oils, a natural antioxidant and a professional emulsifier system for good dispersion in water and even coverage of the leaf surface. The practical 30 ml size offers economical use.",
        description_de: "Hochwertiges pflanzliches Ölkonzentrat für die Blattpflege. NEEMX PRO kombiniert sorgfältig ausgewählte Pflanzenöle, ein natürliches Antioxidationsmittel und ein professionelles Emulgatorsystem für eine gute Verteilung im Wasser und eine gleichmäßige Benetzung der Blattoberfläche. Die praktische 30-ml-Größe ist sparsam im Gebrauch.",
        price: 44.95,
        image_url: "/productAfbeeldingen/neemxpro/neemx-pro-assortiment-travertijn-neem-bloesem.webp",
        brand: "NeemX",
        availability: "in stock",
        google_product_category: "2988",
        product_type: "Business & Industrial > Agriculture > Plant Care",
        display_order: 12,
        metadata: {
          volume: "30ml",
          type: "Botanical oil concentrate",
          concentrated: true,
          formulation: ["botanical oils", "natural antioxidant", "emulsifiers"],
          suitable_for: ["leaf care", "indoor plants", "greenhouse plants"],
          professional: true,
          spray_coverage_m2: {
            min: 15,
            max: 120,
            basis: "0.1-0.2 L spray per m²",
            breakdown: [
              { dosage: "2.5 ml/L", spray_liters: 12, m2_range: "60-120" },
              { dosage: "5 ml/L", spray_liters: 6, m2_range: "30-60" },
              { dosage: "7 ml/L", spray_liters: 4.3, m2_range: "21-43" },
              { dosage: "10 ml/L", spray_liters: 3, m2_range: "15-30" },
            ],
          },
          images: [
            "/productAfbeeldingen/neemxpro/neemx-pro-assortiment-travertijn-neem-bloesem.webp",
            "/productAfbeeldingen/neemxpro/neemx-pro-50ml-travertijn-sokkel.webp",
            "/productAfbeeldingen/neemxpro/neemx-pro-50ml-leisteen-donker.webp",
            "/productAfbeeldingen/neemxpro/neemx-pro-hero-marmer-neem-tak.webp"
          ],
        },
      },
      {
        slug: "neemx-pro-50ml",
        name: "NEEMX PRO 50 ml",
        name_en: "NEEMX PRO 50 ml",
        name_de: "NEEMX PRO 50 ml",
        description: "Premium plantaardig olieconcentraat voor bladverzorging. NEEMX PRO combineert zorgvuldig geselecteerde plantaardige oliën, een natuurlijke antioxidant en een professioneel emulgatorsysteem voor een goede verdeling in water en gelijkmatige bedekking van het bladoppervlak. Het grootste 50 ml formaat is bedoeld voor regelmatig gebruik.",
        description_en: "Premium plant-based oil concentrate for leaf care. NEEMX PRO combines carefully selected botanical oils, a natural antioxidant and a professional emulsifier system for good dispersion in water and even coverage of the leaf surface. The largest 50 ml size is intended for regular use.",
        description_de: "Hochwertiges pflanzliches Ölkonzentrat für die Blattpflege. NEEMX PRO kombiniert sorgfältig ausgewählte Pflanzenöle, ein natürliches Antioxidationsmittel und ein professionelles Emulgatorsystem für eine gute Verteilung im Wasser und eine gleichmäßige Benetzung der Blattoberfläche. Die größte 50-ml-Größe ist für die regelmäßige Anwendung vorgesehen.",
        price: 59.95,
        image_url: "/productAfbeeldingen/neemxpro/neemx-pro-50ml-travertijn-sokkel.webp",
        brand: "NeemX",
        availability: "in stock",
        google_product_category: "2988",
        product_type: "Business & Industrial > Agriculture > Plant Care",
        display_order: 13,
        metadata: {
          volume: "50ml",
          type: "Botanical oil concentrate",
          concentrated: true,
          formulation: ["botanical oils", "natural antioxidant", "emulsifiers"],
          suitable_for: ["leaf care", "indoor plants", "greenhouse plants"],
          professional: true,
          spray_coverage_m2: {
            min: 25,
            max: 200,
            basis: "0.1-0.2 L spray per m²",
            breakdown: [
              { dosage: "2.5 ml/L", spray_liters: 20, m2_range: "100-200" },
              { dosage: "5 ml/L", spray_liters: 10, m2_range: "50-100" },
              { dosage: "7 ml/L", spray_liters: 7.1, m2_range: "35-71" },
              { dosage: "10 ml/L", spray_liters: 5, m2_range: "25-50" },
            ],
          },
          images: [
            "/productAfbeeldingen/neemxpro/neemx-pro-50ml-travertijn-sokkel.webp",
            "/productAfbeeldingen/neemxpro/neemx-pro-50ml-leisteen-donker.webp",
            "/productAfbeeldingen/neemxpro/neemx-pro-assortiment-travertijn-neem-bloesem.webp",
            "/productAfbeeldingen/neemxpro/neemx-pro-hero-marmer-neem-tak.webp"
          ],
        },
      },
    ];

    // Remove old incorrect product (neemx-pro-15ml)
    const old15ml = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", "neemx-pro-15ml"))
      .first();
    if (old15ml) {
      await ctx.db.delete(old15ml._id);
    }

    let added = 0;
    let updated = 0;

    for (const product of products) {
      const existing = await ctx.db
        .query("products")
        .withIndex("by_slug", (q) => q.eq("slug", product.slug))
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, product);
        updated++;
      } else {
        await ctx.db.insert("products", product);
        added++;
      }
    }

    return { added, updated, total: products.length };
  },
});
