'use client'

import { useState } from 'react'

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
  addresses: Address[]
  locale: 'nl' | 'en' | 'de'
}

export default function AddressesClient({ addresses: initialAddresses, locale }: AddressesClientProps) {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses)
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
    addAddress: locale === 'de' ? 'Adresse hinzufügen' : locale === 'en' ? 'Add Address' : 'Adres toevoegen',
    saveAddress: locale === 'de' ? 'Speichern' : locale === 'en' ? 'Save' : 'Opslaan',
    cancel: locale === 'de' ? 'Abbrechen' : locale === 'en' ? 'Cancel' : 'Annuleren',
    edit: locale === 'de' ? 'Bearbeiten' : locale === 'en' ? 'Edit' : 'Bewerken',
    delete: locale === 'de' ? 'Löschen' : locale === 'en' ? 'Delete' : 'Verwijderen',
    default: locale === 'de' ? 'Standard' : locale === 'en' ? 'Default' : 'Standaard',
    setDefault: locale === 'de' ? 'Als Standard festlegen' : locale === 'en' ? 'Set as Default' : 'Instellen als standaard',
    // Form labels
    labelName: locale === 'de' ? 'Label (z.B. "Zuhause", "Arbeit")' : locale === 'en' ? 'Label (e.g. "Home", "Work")' : 'Label (bijv. "Thuis", "Werk")',
    street: locale === 'de' ? 'Straße und Hausnummer' : locale === 'en' ? 'Street and Number' : 'Straat en huisnummer',
    city: locale === 'de' ? 'Stadt' : locale === 'en' ? 'City' : 'Plaats',
    postalCode: locale === 'de' ? 'Postleitzahl' : locale === 'en' ? 'Postal Code' : 'Postcode',
    country: locale === 'de' ? 'Land' : locale === 'en' ? 'Country' : 'Land',
    phone: locale === 'de' ? 'Telefonnummer (optional)' : locale === 'en' ? 'Phone Number (optional)' : 'Telefoonnummer (optioneel)',
    defaultAddress: locale === 'de' ? 'Als Standardadresse verwenden' : locale === 'en' ? 'Use as default address' : 'Gebruik als standaardadres',
    confirmDelete: locale === 'de' ? 'Möchten Sie diese Adresse wirklich löschen?' : locale === 'en' ? 'Are you sure you want to delete this address?' : 'Weet je zeker dat je dit adres wilt verwijderen?',
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
      if (editingId) {
        // Update existing address
        const response = await fetch(`/api/addresses/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (!response.ok) throw new Error('Failed to update address')

        const { address } = await response.json()
        setAddresses((prev) => prev.map((a) => (a.id === editingId ? address : a)))
      } else {
        // Create new address
        const response = await fetch('/api/addresses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (!response.ok) throw new Error('Failed to create address')

        const { address } = await response.json()
        setAddresses((prev) => [address, ...prev])
      }

      // If this was set as default, update other addresses
      if (formData.is_default) {
        setAddresses((prev) =>
          prev.map((a) => ({
            ...a,
            is_default: a.id === editingId || a.id === addresses[0]?.id ? true : false,
          }))
        )
      }

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

  return (
    <div className="space-y-6">
      {/* Add Address Button */}
      {!isAdding && (
        <div>
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-2 bg-lumora-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-lumora-green-600 transition-colors shadow-soft-md hover:shadow-soft-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {t.addAddress}
          </button>
        </div>
      )}

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-white rounded-2xl shadow-soft-lg p-8">
          <h2 className="text-2xl font-display font-semibold text-lumora-dark mb-6">
            {editingId ? t.edit : t.addAddress}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-lumora-dark/70 mb-1">
                {t.labelName} *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-lumora-dark/20 rounded-xl focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                placeholder={locale === 'de' ? 'z.B. Zuhause' : locale === 'en' ? 'e.g. Home' : 'bijv. Thuis'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-lumora-dark/70 mb-1">
                {t.street} *
              </label>
              <input
                type="text"
                required
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className="w-full px-4 py-3 border border-lumora-dark/20 rounded-xl focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-lumora-dark/70 mb-1">
                  {t.postalCode} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.postal_code}
                  onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                  className="w-full px-4 py-3 border border-lumora-dark/20 rounded-xl focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-lumora-dark/70 mb-1">
                  {t.city} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 border border-lumora-dark/20 rounded-xl focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-lumora-dark/70 mb-1">
                {t.country} *
              </label>
              <select
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-3 border border-lumora-dark/20 rounded-xl focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
              >
                <option value="NL">Nederland</option>
                <option value="BE">België</option>
                <option value="DE">Duitsland</option>
                <option value="FR">Frankrijk</option>
                <option value="GB">Verenigd Koninkrijk</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-lumora-dark/70 mb-1">
                {t.phone}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-lumora-dark/20 rounded-xl focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_default"
                checked={formData.is_default}
                onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                className="w-4 h-4 text-lumora-green-500 border-lumora-dark/20 rounded focus:ring-lumora-green-500"
              />
              <label htmlFor="is_default" className="ml-2 text-sm text-lumora-dark/70">
                {t.defaultAddress}
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-lumora-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-lumora-green-600 transition-colors shadow-soft-md hover:shadow-soft-lg disabled:opacity-50"
              >
                {isLoading ? '...' : t.saveAddress}
              </button>
              <button
                type="button"
                onClick={resetForm}
                disabled={isLoading}
                className="flex-1 bg-lumora-dark/10 text-lumora-dark px-6 py-3 rounded-xl font-semibold hover:bg-lumora-dark/20 transition-colors disabled:opacity-50"
              >
                {t.cancel}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Addresses List */}
      {addresses.length === 0 && !isAdding ? (
        <div className="bg-white rounded-2xl shadow-soft-lg p-12 text-center">
          <svg className="w-24 h-24 mx-auto text-lumora-dark/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h2 className="text-2xl font-display font-semibold text-lumora-dark mb-2">{t.noAddresses}</h2>
          <p className="text-lumora-dark/60">{t.addFirst}</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`bg-white rounded-2xl shadow-soft-lg p-6 ${
                address.is_default ? 'ring-2 ring-lumora-green-500' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-display font-semibold text-lumora-dark">
                      {address.name}
                    </h3>
                    {address.is_default && (
                      <span className="inline-block px-3 py-1 bg-lumora-green-500 text-white text-xs font-semibold rounded-full">
                        {t.default}
                      </span>
                    )}
                  </div>
                  <div className="text-lumora-dark/70 space-y-1">
                    <p>{address.street}</p>
                    <p>
                      {address.postal_code} {address.city}
                    </p>
                    <p>{address.country}</p>
                    {address.phone && <p>Tel: {address.phone}</p>}
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(address)}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-lumora-green-500 hover:bg-lumora-green-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {t.edit}
                  </button>

                  {!address.is_default && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-lumora-dark/60 hover:bg-lumora-dark/5 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t.setDefault}
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(address.id)}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {t.delete}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
