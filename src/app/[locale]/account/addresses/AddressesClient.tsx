'use client'

import { useState } from 'react'
import styles from '../account.module.css'

interface Address {
  id: string
  user_id: string
  name: string
  street: string
  city: string
  postal_code: string
  country: string
  phone: string | null
  is_default: boolean
  created_at: string
  updated_at: string
}

interface AddressesClientProps {
  addresses: Array<Partial<Address> & { _id?: string }>
  locale: 'nl' | 'en' | 'de'
}

const ADDRESS_COUNTRIES = ['NL', 'BE', 'DE'] as const

// Convex returns `_id`; the API routes return `{ address: { _id } }` on
// create/update. The client keeps a single `id` field for both.
function normalizeAddress(raw: Partial<Address> & { _id?: string }): Address {
  return {
    id: raw.id ?? raw._id ?? '',
    user_id: raw.user_id ?? '',
    name: raw.name ?? '',
    street: raw.street ?? '',
    city: raw.city ?? '',
    postal_code: raw.postal_code ?? '',
    country: raw.country ?? 'NL',
    phone: raw.phone ?? null,
    is_default: Boolean(raw.is_default),
    created_at: raw.created_at ?? '',
    updated_at: raw.updated_at ?? '',
  }
}

export default function AddressesClient({ addresses: initialAddresses, locale }: AddressesClientProps) {
  const [addresses, setAddresses] = useState<Address[]>(() => initialAddresses.map(normalizeAddress))
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    postal_code: '',
    country: 'NL',
    phone: '',
    is_default: false,
  })

  const t = {
    noAddresses: locale === 'de' ? 'Sie haben noch keine gespeicherten Adressen' : locale === 'en' ? 'You have no saved addresses yet' : 'Je hebt nog geen opgeslagen adressen',
    addFirst: locale === 'de' ? 'Fügen Sie Ihre erste Adresse hinzu, um den Bestellvorgang zu beschleunigen' : locale === 'en' ? 'Add your first address to speed up checkout' : 'Voeg je eerste adres toe om de checkout te versnellen',
    addAddress: locale === 'de' ? 'Adresse hinzufügen' : locale === 'en' ? 'Add address' : 'Adres toevoegen',
    saveAddress: locale === 'de' ? 'Speichern' : locale === 'en' ? 'Save' : 'Opslaan',
    cancel: locale === 'de' ? 'Abbrechen' : locale === 'en' ? 'Cancel' : 'Annuleren',
    edit: locale === 'de' ? 'Bearbeiten' : locale === 'en' ? 'Edit' : 'Bewerken',
    delete: locale === 'de' ? 'Löschen' : locale === 'en' ? 'Delete' : 'Verwijderen',
    default: locale === 'de' ? 'Standard' : locale === 'en' ? 'Default' : 'Standaard',
    setDefault: locale === 'de' ? 'Als Standard festlegen' : locale === 'en' ? 'Set as default' : 'Instellen als standaard',
    // Form labels
    labelName: locale === 'de' ? 'Label (z.B. "Zuhause", "Arbeit")' : locale === 'en' ? 'Label (e.g. "Home", "Work")' : 'Label (bijv. "Thuis", "Werk")',
    street: locale === 'de' ? 'Straße und Hausnummer' : locale === 'en' ? 'Street and house number' : 'Straat en huisnummer',
    city: locale === 'de' ? 'Stadt' : locale === 'en' ? 'City' : 'Plaats',
    postalCode: locale === 'de' ? 'Postleitzahl' : locale === 'en' ? 'Postal code' : 'Postcode',
    country: locale === 'de' ? 'Land' : locale === 'en' ? 'Country' : 'Land',
    phone: locale === 'de' ? 'Telefonnummer (optional)' : locale === 'en' ? 'Phone number (optional)' : 'Telefoonnummer (optioneel)',
    defaultAddress: locale === 'de' ? 'Als Standardadresse verwenden' : locale === 'en' ? 'Use as default address' : 'Gebruik als standaardadres',
    confirmDelete: locale === 'de' ? 'Möchten Sie diese Adresse wirklich löschen?' : locale === 'en' ? 'Are you sure you want to delete this address?' : 'Weet je zeker dat je dit adres wilt verwijderen?',
    saving: locale === 'de' ? 'Wird gespeichert…' : locale === 'en' ? 'Saving…' : 'Opslaan…',
    editTitle: locale === 'de' ? 'Adresse bearbeiten' : locale === 'en' ? 'Edit address' : 'Adres bewerken',
    newTitle: locale === 'de' ? 'Neue Adresse' : locale === 'en' ? 'New address' : 'Nieuw adres',
    savedAddresses: locale === 'de' ? 'Gespeicherte Adressen' : locale === 'en' ? 'Saved addresses' : 'Opgeslagen adressen',
    phoneShort: locale === 'de' ? 'Telefon' : locale === 'en' ? 'Phone' : 'Telefoon',
    labelPlaceholder: locale === 'de' ? 'z. B. Zuhause' : locale === 'en' ? 'e.g. Home' : 'bijv. Thuis',
    countries: locale === 'de'
      ? { NL: 'Niederlande', BE: 'Belgien', DE: 'Deutschland', FR: 'Frankreich', GB: 'Vereinigtes Königreich' }
      : locale === 'en'
        ? { NL: 'Netherlands', BE: 'Belgium', DE: 'Germany', FR: 'France', GB: 'United Kingdom' }
        : { NL: 'Nederland', BE: 'België', DE: 'Duitsland', FR: 'Frankrijk', GB: 'Verenigd Koninkrijk' },
  }

  const resetForm = () => {
    setFormData({
      name: '',
      street: '',
      city: '',
      postal_code: '',
      country: 'NL',
      phone: '',
      is_default: false,
    })
    setIsAdding(false)
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const payload = { ...formData, phone: formData.phone.trim() || undefined }
      const response = await fetch(editingId ? `/api/addresses/${editingId}` : '/api/addresses', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error(editingId ? 'Failed to update address' : 'Failed to create address')

      const data = await response.json() as { address?: { _id?: string; id?: string } }
      const savedId = editingId ?? data.address?._id ?? data.address?.id
      if (!savedId) throw new Error('Address id missing in response')

      const existing = editingId ? addresses.find((a) => a.id === editingId) : undefined
      const saved: Address = {
        ...(existing ?? normalizeAddress({})),
        id: savedId,
        name: formData.name.trim(),
        street: formData.street.trim(),
        city: formData.city.trim(),
        postal_code: formData.postal_code.trim(),
        country: formData.country,
        phone: formData.phone.trim() || null,
        is_default: formData.is_default,
      }

      setAddresses((prev) => {
        const next = editingId
          ? prev.map((a) => (a.id === editingId ? saved : a))
          : [saved, ...prev]
        // The server unsets the previous default when a new default is saved.
        return saved.is_default ? next.map((a) => ({ ...a, is_default: a.id === saved.id })) : next
      })

      resetForm()
    } catch (error) {
      console.error('Error saving address:', error)
      alert(locale === 'de' ? 'Fehler beim Speichern der Adresse' : locale === 'en' ? 'Error saving address' : 'Fout bij opslaan adres')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (address: Address) => {
    setFormData({
      name: address.name,
      street: address.street,
      city: address.city,
      postal_code: address.postal_code,
      country: address.country,
      phone: address.phone || '',
      is_default: address.is_default,
    })
    setEditingId(address.id)
    setIsAdding(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t.confirmDelete)) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/addresses/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete address')

      setAddresses((prev) => prev.filter((a) => a.id !== id))
    } catch (error) {
      console.error('Error deleting address:', error)
      alert(locale === 'de' ? 'Fehler beim Löschen der Adresse' : locale === 'en' ? 'Error deleting address' : 'Fout bij verwijderen adres')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetDefault = async (id: string) => {
    const address = addresses.find((a) => a.id === id)
    if (!address) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/addresses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...address, is_default: true }),
      })

      if (!response.ok) throw new Error('Failed to set default')

      setAddresses((prev) =>
        prev.map((a) => ({
          ...a,
          is_default: a.id === id,
        }))
      )
    } catch (error) {
      console.error('Error setting default:', error)
      alert(locale === 'de' ? 'Fehler beim Setzen der Standardadresse' : locale === 'en' ? 'Error setting default address' : 'Fout bij instellen standaardadres')
    } finally {
      setIsLoading(false)
    }
  }

  const countryName = (code: string) => t.countries[code as keyof typeof t.countries] ?? code

  return (
    <div className={styles.addressStack}>
      {!isAdding && (
        <div className={styles.addressToolbar}>
          <span>{t.savedAddresses} · {addresses.length}</span>
          <button type="button" className={styles.addressPrimary} onClick={() => setIsAdding(true)}>
            <PlusIcon /> {t.addAddress}
          </button>
        </div>
      )}

      {isAdding && (
        <section className={`${styles.panel} ${styles.addressFormPanel}`} aria-labelledby="address-form-title">
          <div className={styles.panelHeading}>
            <div><span>{t.savedAddresses}</span><h2 id="address-form-title">{editingId ? t.editTitle : t.newTitle}</h2></div>
          </div>
          <form onSubmit={handleSubmit} className={styles.addressForm}>
            <label className={styles.addressFieldFull}>
              <span>{t.labelName}</span>
              <input type="text" required value={formData.name} aria-label={t.labelName} placeholder={t.labelPlaceholder} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </label>
            <label className={styles.addressFieldFull}>
              <span>{t.street}</span>
              <input type="text" required autoComplete="street-address" value={formData.street} aria-label={t.street} onChange={(e) => setFormData({ ...formData, street: e.target.value })} />
            </label>
            <label>
              <span>{t.postalCode}</span>
              <input type="text" required autoComplete="postal-code" value={formData.postal_code} aria-label={t.postalCode} onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })} />
            </label>
            <label>
              <span>{t.city}</span>
              <input type="text" required autoComplete="address-level2" value={formData.city} aria-label={t.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
            </label>
            <label>
              <span>{t.country}</span>
              <select required autoComplete="country" value={formData.country} aria-label={t.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })}>
                {ADDRESS_COUNTRIES.map((code) => <option key={code} value={code}>{countryName(code)}</option>)}
              </select>
            </label>
            <label>
              <span>{t.phone}</span>
              <input type="tel" autoComplete="tel" value={formData.phone} aria-label={t.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </label>
            <label className={`${styles.addressFieldFull} ${styles.addressCheck}`}>
              <input type="checkbox" checked={formData.is_default} onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })} />
              <span>{t.defaultAddress}</span>
            </label>
            <div className={`${styles.addressFieldFull} ${styles.addressFormActions}`}>
              <button type="submit" className={styles.addressPrimary} disabled={isLoading}>{isLoading ? t.saving : t.saveAddress}</button>
              <button type="button" className={styles.addressSecondary} onClick={resetForm} disabled={isLoading}>{t.cancel}</button>
            </div>
          </form>
        </section>
      )}

      {addresses.length === 0 && !isAdding ? (
        <section className={`${styles.panel} ${styles.emptyState}`}>
          <span><PinIcon /></span>
          <h2>{t.noAddresses}</h2>
          <p>{t.addFirst}</p>
          <button type="button" className={styles.addressPrimary} onClick={() => setIsAdding(true)}><PlusIcon /> {t.addAddress}</button>
        </section>
      ) : (
        <div className={styles.addressGrid}>
          {addresses.map((address) => (
            <article key={address.id} className={`${styles.panel} ${styles.addressCard} ${address.is_default ? styles.addressCardDefault : ''}`}>
              <header>
                <span className={styles.orderThumb}><PinIcon /></span>
                <div>
                  <h3>{address.name}</h3>
                  {address.is_default && <small>{t.default}</small>}
                </div>
              </header>
              <p>
                {address.street}<br />
                {address.postal_code} {address.city}<br />
                {countryName(address.country)}
                {address.phone ? <><br />{t.phoneShort}: {address.phone}</> : null}
              </p>
              <footer>
                <button type="button" onClick={() => handleEdit(address)} disabled={isLoading}>{t.edit}</button>
                {!address.is_default && (
                  <button type="button" onClick={() => handleSetDefault(address.id)} disabled={isLoading}>{t.setDefault}</button>
                )}
                <button type="button" className={styles.addressDanger} onClick={() => handleDelete(address.id)} disabled={isLoading}>{t.delete}</button>
              </footer>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

function IconBase({ children }: { children: React.ReactNode }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg> }
function PinIcon() { return <IconBase><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></IconBase> }
function PlusIcon() { return <IconBase><path d="M12 5v14M5 12h14"/></IconBase> }
