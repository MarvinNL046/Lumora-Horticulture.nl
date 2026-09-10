export function parseContactMessage(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const data = value as Record<string, unknown>
  const limits = { name: 120, email: 254, company: 200, phone: 50, message: 5000 }
  const fields = { name: '', email: '', company: '', phone: '', message: '' }
  for (const key of Object.keys(fields) as (keyof typeof fields)[]) {
    if (data[key] !== undefined && typeof data[key] !== 'string') return null
    const text = ((data[key] as string | undefined) ?? '').trim()
    if (text.length > limits[key] || text.includes('\0')) return null
    fields[key] = text
  }
  if (!fields.name || !fields.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return null
  if (/[\r\n]/.test(fields.name + fields.email)) return null
  return fields
}
