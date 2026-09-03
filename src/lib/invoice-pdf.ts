import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib'

type AddressLike = Record<string, unknown> | null | undefined

export type InvoiceOrder = {
  _id: string
  order_number?: string
  customer_email: string
  customer_name?: string
  customer_phone?: string
  billing_address?: AddressLike
  shipping_address?: AddressLike
  total_amount: number
  created_at: number
  paid_at?: number
  locale?: string
}

export type InvoiceLocale = 'nl' | 'en' | 'de'

export function resolveInvoiceLocale(locale: unknown): InvoiceLocale {
  return locale === 'en' || locale === 'de' ? locale : 'nl'
}

// The invoice follows the language the customer ordered in.
export const invoiceCopy: Record<InvoiceLocale, {
  intl: string
  title: string
  subject: string
  filePrefix: string
  details: string
  number: string
  date: string
  from: string
  companyCountry: string
  registration: string
  billTo: string
  customer: string
  product: string
  quantity: string
  price: string
  total: string
  subtotal: string
  vat: string
  totalPaid: string
  thanks: string
  countries: Record<string, string>
}> = {
  nl: {
    intl: 'nl-NL', title: 'Factuur', subject: 'Aankoopfactuur', filePrefix: 'factuur', details: 'Factuurgegevens', number: 'Factuurnummer', date: 'Factuurdatum',
    from: 'Van', companyCountry: 'Nederland', registration: 'KvK 96669772 · BTW NL005224624B80', billTo: 'Factuur voor', customer: 'Klant',
    product: 'Product', quantity: 'Aantal', price: 'Prijs', total: 'Totaal', subtotal: 'Subtotaal excl. btw', vat: 'Btw 21%', totalPaid: 'Totaal betaald',
    thanks: 'Bedankt voor je bestelling bij Lumora Horticulture.',
    countries: { NL: 'Nederland', BE: 'België', DE: 'Duitsland' },
  },
  en: {
    intl: 'en-IE', title: 'Invoice', subject: 'Purchase invoice', filePrefix: 'invoice', details: 'Invoice details', number: 'Invoice number', date: 'Invoice date',
    from: 'From', companyCountry: 'The Netherlands', registration: 'Chamber of Commerce 96669772 · VAT NL005224624B80', billTo: 'Invoice to', customer: 'Customer',
    product: 'Product', quantity: 'Qty', price: 'Price', total: 'Total', subtotal: 'Subtotal excl. VAT', vat: 'VAT 21%', totalPaid: 'Total paid',
    thanks: 'Thank you for your order at Lumora Horticulture.',
    countries: { NL: 'Netherlands', BE: 'Belgium', DE: 'Germany' },
  },
  de: {
    intl: 'de-DE', title: 'Rechnung', subject: 'Kaufrechnung', filePrefix: 'rechnung', details: 'Rechnungsdaten', number: 'Rechnungsnummer', date: 'Rechnungsdatum',
    from: 'Von', companyCountry: 'Niederlande', registration: 'Handelsregister (KvK) 96669772 · USt-IdNr. NL005224624B80', billTo: 'Rechnung an', customer: 'Kunde',
    product: 'Produkt', quantity: 'Menge', price: 'Preis', total: 'Gesamt', subtotal: 'Zwischensumme exkl. MwSt.', vat: 'MwSt. 21 %', totalPaid: 'Gesamt bezahlt',
    thanks: 'Vielen Dank für Ihre Bestellung bei Lumora Horticulture.',
    countries: { NL: 'Niederlande', BE: 'Belgien', DE: 'Deutschland' },
  },
}

export type InvoiceItem = {
  quantity: number
  price_at_purchase: number
  product_name: string
}

const GREEN = rgb(0.09, 0.24, 0.16)
const ACCENT = rgb(0.18, 0.49, 0.27)
const MUTED = rgb(0.35, 0.41, 0.38)
const LINE = rgb(0.86, 0.9, 0.87)
const SOFT = rgb(0.96, 0.97, 0.96)

function euro(value: number, intl: string): string {
  return new Intl.NumberFormat(intl, { style: 'currency', currency: 'EUR' }).format(value)
}

function addressLines(address: AddressLike, countries: Record<string, string> = {}): string[] {
  if (!address || typeof address !== 'object') return []
  const value = address as Record<string, unknown>
  const line = (key: string) => typeof value[key] === 'string' ? value[key].trim() : ''
  const street = line('street')
  const postalCode = line('postal_code') || line('postalCode')
  const city = line('city')
  const countryCode = line('country')
  const country = countries[countryCode.toUpperCase()] || countryCode
  return [street, [postalCode, city].filter(Boolean).join(' '), country].filter(Boolean)
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (font.widthOfTextAtSize(next, size) <= maxWidth || !current) {
      current = next
    } else {
      lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)
  return lines
}

function drawText(page: PDFPage, text: string, x: number, y: number, size: number, font: PDFFont, color = GREEN) {
  page.drawText(text, { x, y, size, font, color })
}

export async function createInvoicePdf(order: InvoiceOrder, items: InvoiceItem[]): Promise<Uint8Array> {
  const copy = invoiceCopy[resolveInvoiceLocale(order.locale)]
  const money = (value: number) => euro(value, copy.intl)
  const document = await PDFDocument.create()
  document.setTitle(`${copy.title} ${order.order_number || order._id}`)
  document.setAuthor('Lumora Horticulture')
  document.setSubject(copy.subject)
  document.setLanguage(resolveInvoiceLocale(order.locale))

  const page = document.addPage([595.28, 841.89])
  const regular = await document.embedFont(StandardFonts.Helvetica)
  const bold = await document.embedFont(StandardFonts.HelveticaBold)
  const width = page.getWidth()
  const margin = 48

  page.drawRectangle({ x: 0, y: 735, width, height: 107, color: GREEN })
  drawText(page, 'LUMORA', margin, 790, 23, bold, rgb(1, 1, 1))
  drawText(page, 'HORTICULTURE', margin, 773, 9, bold, rgb(0.77, 0.68, 0.39))
  drawText(page, copy.title.toUpperCase(), 428, 780, 18, bold, rgb(1, 1, 1))

  const invoiceNumber = order.order_number || `LUM-${order._id.slice(0, 10).toUpperCase()}`
  const date = new Date(order.paid_at || order.created_at).toLocaleDateString(copy.intl, {
    day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Europe/Amsterdam',
  })

  drawText(page, copy.details, margin, 700, 10, bold, ACCENT)
  drawText(page, `${copy.number}  ${invoiceNumber}`, margin, 681, 10, regular, GREEN)
  drawText(page, `${copy.date}  ${date}`, margin, 665, 10, regular, GREEN)

  drawText(page, copy.from, 344, 700, 10, bold, ACCENT)
  const company = [
    'Lumora Horticulture',
    'Aan de Bogen 11',
    '6118 AS Nieuwstadt',
    copy.companyCountry,
    copy.registration,
  ]
  company.forEach((line, index) => drawText(page, line, 344, 681 - index * 15, 9.5, index === 0 ? bold : regular, GREEN))

  page.drawLine({ start: { x: margin, y: 604 }, end: { x: width - margin, y: 604 }, thickness: 1, color: LINE })
  drawText(page, copy.billTo, margin, 577, 10, bold, ACCENT)
  const customer = [
    order.customer_name || copy.customer,
    ...addressLines(order.billing_address || order.shipping_address, copy.countries),
    order.customer_email,
    order.customer_phone || '',
  ].filter(Boolean)
  customer.forEach((line, index) => drawText(page, line, margin, 556 - index * 15, 9.5, index === 0 ? bold : regular, GREEN))

  let y = 430
  page.drawRectangle({ x: margin, y, width: width - margin * 2, height: 30, color: SOFT })
  drawText(page, copy.product, margin + 10, y + 10, 9, bold, MUTED)
  drawText(page, copy.quantity, 365, y + 10, 9, bold, MUTED)
  drawText(page, copy.price, 420, y + 10, 9, bold, MUTED)
  drawText(page, copy.total, 490, y + 10, 9, bold, MUTED)
  y -= 26

  for (const item of items) {
    const nameLines = wrapText(item.product_name, regular, 9.5, 285).slice(0, 2)
    const rowHeight = Math.max(38, nameLines.length * 14 + 16)
    nameLines.forEach((line, index) => drawText(page, line, margin + 10, y - index * 13, 9.5, regular, GREEN))
    drawText(page, String(item.quantity), 377, y, 9.5, regular, GREEN)
    drawText(page, money(item.price_at_purchase), 420, y, 9.5, regular, GREEN)
    drawText(page, money(item.price_at_purchase * item.quantity), 490, y, 9.5, bold, GREEN)
    page.drawLine({ start: { x: margin, y: y - rowHeight + 14 }, end: { x: width - margin, y: y - rowHeight + 14 }, thickness: 0.7, color: LINE })
    y -= rowHeight
  }

  const vat = order.total_amount - order.total_amount / 1.21
  const net = order.total_amount - vat
  const totalsX = 350
  y -= 14
  drawText(page, copy.subtotal, totalsX, y, 9.5, regular, MUTED)
  drawText(page, money(net), 490, y, 9.5, regular, GREEN)
  y -= 19
  drawText(page, copy.vat, totalsX, y, 9.5, regular, MUTED)
  drawText(page, money(vat), 490, y, 9.5, regular, GREEN)
  y -= 45
  page.drawRectangle({ x: totalsX - 12, y: y - 10, width: 209, height: 42, color: GREEN })
  drawText(page, copy.totalPaid, totalsX, y + 5, 10.5, bold, rgb(1, 1, 1))
  drawText(page, money(order.total_amount), 479, y + 5, 11, bold, rgb(1, 1, 1))

  page.drawLine({ start: { x: margin, y: 72 }, end: { x: width - margin, y: 72 }, thickness: 1, color: LINE })
  drawText(page, copy.thanks, margin, 50, 9, bold, GREEN)
  drawText(page, 'info@lumorahorticulture.com  ·  lumorahorticulture.nl', 310, 50, 8.5, regular, MUTED)

  return await document.save()
}
