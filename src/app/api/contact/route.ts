import { parseContactMessage } from '@/lib/contact-message'
import { resend, EMAIL_FROM, EMAIL_NOTIFICATION_TO } from '@/lib/resend'
import { consumeDistributedRateLimit } from '@/lib/distributed-rate-limit'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return Response.json({ success: false }, { status: 415 })
  }
  let message: ReturnType<typeof parseContactMessage>
  try {
    const raw = await request.text()
    if (raw.length > 20_000) return Response.json({ success: false }, { status: 413 })
    message = parseContactMessage(JSON.parse(raw))
  } catch {
    return Response.json({ success: false }, { status: 400 })
  }
  if (!message) return Response.json({ success: false }, { status: 400 })

  const quota = await consumeDistributedRateLimit(request.headers, 'contact', 5, 15 * 60_000)
  if (quota.kind !== 'allowed') {
    return Response.json({ success: false }, {
      status: quota.kind === 'limited' ? 429 : 503,
      headers: { 'Retry-After': String(quota.retryAfterSeconds) },
    })
  }

  try {
    const result = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_NOTIFICATION_TO,
      replyTo: message.email,
      subject: `Contactformulier Lumora — ${message.name}`,
      text: [
        `Naam: ${message.name}`,
        `E-mail: ${message.email}`,
        `Bedrijf: ${message.company || '—'}`,
        `Telefoon: ${message.phone || '—'}`,
        '', message.message,
      ].join('\n'),
    })
    if (result.error || !result.data?.id) {
      return Response.json({ success: false }, { status: 502 })
    }
    return Response.json({ success: true })
  } catch {
    return Response.json({ success: false }, { status: 503 })
  }
}
