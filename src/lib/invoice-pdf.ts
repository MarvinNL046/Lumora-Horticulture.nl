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

function euro(value: number): string {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value)
}

function addressLines(address: AddressLike): string[] {
  if (!address || typeof address !== 'object') return []
  const value = address as Record<string, unknown>
  const line = (key: string) => typeof value[key] === 'string' ? value[key].trim() : ''
  const street = line('street')
  const postalCode = line('postal_code') || line('postalCode')
  const city = line('city')
  const country = line('country')
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
  const document = await PDFDocument.create()
  document.setTitle(`Factuur ${order.order_number || order._id}`)
  document.setAuthor('Lumora Horticulture')
  document.setSubject('Aankoopfactuur')

  const page = document.addPage([595.28, 841.89])
  const regular = await document.embedFont(StandardFonts.Helvetica)
  const bold = await document.embedFont(StandardFonts.HelveticaBold)
  const width = page.getWidth()
  const margin = 48

  page.drawRectangle({ x: 0, y: 735, width, height: 107, color: GREEN })
  drawText(page, 'LUMORA', margin, 790, 23, bold, rgb(1, 1, 1))
  drawText(page, 'HORTICULTURE', margin, 773, 9, bold, rgb(0.77, 0.68, 0.39))
  drawText(page, 'FACTUUR', 428, 780, 18, bold, rgb(1, 1, 1))

  const invoiceNumber = order.order_number || `LUM-${order._id.slice(0, 10).toUpperCase()}`
  const date = new Date(order.paid_at || order.created_at).toLocaleDateString('nl-NL', {
    day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Europe/Amsterdam',
  })

  drawText(page, 'Factuurgegevens', margin, 700, 10, bold, ACCENT)
  drawText(page, `Factuurnummer  ${invoiceNumber}`, margin, 681, 10, regular, GREEN)
  drawText(page, `Factuurdatum     ${date}`, margin, 665, 10, regular, GREEN)

  drawText(page, 'Van', 344, 700, 10, bold, ACCENT)
  const company = [
    'Lumora Horticulture',
    'Aan de Bogen 11',
    '6118 AS Nieuwstadt',
    'Nederland',
    'KvK 96669772 · BTW NL005224624B80',
  ]
  company.forEach((line, index) => drawText(page, line, 344, 681 - index * 15, 9.5, index === 0 ? bold : regular, GREEN))

  page.drawLine({ start: { x: margin, y: 604 }, end: { x: width - margin, y: 604 }, thickness: 1, color: LINE })
  drawText(page, 'Factuur voor', margin, 577, 10, bold, ACCENT)
  const customer = [
    order.customer_name || 'Klant',
    ...addressLines(order.billing_address || order.shipping_address),
    order.customer_email,
    order.customer_phone || '',
  ].filter(Boolean)
  customer.forEach((line, index) => drawText(page, line, margin, 556 - index * 15, 9.5, index === 0 ? bold : regular, GREEN))

  let y = 430
  page.drawRectangle({ x: margin, y, width: width - margin * 2, height: 30, color: SOFT })
  drawText(page, 'Product', margin + 10, y + 10, 9, bold, MUTED)
  drawText(page, 'Aantal', 365, y + 10, 9, bold, MUTED)
  drawText(page, 'Prijs', 420, y + 10, 9, bold, MUTED)
  drawText(page, 'Totaal', 490, y + 10, 9, bold, MUTED)
  y -= 26

  for (const item of items) {
    const nameLines = wrapText(item.product_name, regular, 9.5, 285).slice(0, 2)
    const rowHeight = Math.max(38, nameLines.length * 14 + 16)
    nameLines.forEach((line, index) => drawText(page, line, margin + 10, y - index * 13, 9.5, regular, GREEN))
    drawText(page, String(item.quantity), 377, y, 9.5, regular, GREEN)
    drawText(page, euro(item.price_at_purchase), 420, y, 9.5, regular, GREEN)
    drawText(page, euro(item.price_at_purchase * item.quantity), 490, y, 9.5, bold, GREEN)
    page.drawLine({ start: { x: margin, y: y - rowHeight + 14 }, end: { x: width - margin, y: y - rowHeight + 14 }, thickness: 0.7, color: LINE })
    y -= rowHeight
  }

  const vat = order.total_amount - order.total_amount / 1.21
  const net = order.total_amount - vat
  const totalsX = 350
  y -= 14
  drawText(page, 'Subtotaal excl. btw', totalsX, y, 9.5, regular, MUTED)
  drawText(page, euro(net), 490, y, 9.5, regular, GREEN)
  y -= 19
  drawText(page, 'Btw 21%', totalsX, y, 9.5, regular, MUTED)
  drawText(page, euro(vat), 490, y, 9.5, regular, GREEN)
  y -= 45
  page.drawRectangle({ x: totalsX - 12, y: y - 10, width: 209, height: 42, color: GREEN })
  drawText(page, 'Totaal betaald', totalsX, y + 5, 10.5, bold, rgb(1, 1, 1))
  drawText(page, euro(order.total_amount), 479, y + 5, 11, bold, rgb(1, 1, 1))

  page.drawLine({ start: { x: margin, y: 72 }, end: { x: width - margin, y: 72 }, thickness: 1, color: LINE })
  drawText(page, 'Bedankt voor je bestelling bij Lumora Horticulture.', margin, 50, 9, bold, GREEN)
  drawText(page, 'info@lumorahorticulture.com  ·  lumorahorticulture.nl', 310, 50, 8.5, regular, MUTED)

  return await document.save()
}
