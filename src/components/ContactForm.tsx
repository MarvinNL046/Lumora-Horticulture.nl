'use client'

import { useState, FormEvent } from 'react'
import { sendEmail, EmailParams } from '@/lib/emailjs'
import { ArrowRightIcon } from '@/app/lumora-premium/_components/Icons'
import styles from '@/app/lumora-premium/_components/content.module.css'

interface ContactFormProps {
  translations?: {
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    success: string;
    error: string;
    namePlaceholder?: string;
    companyPlaceholder?: string;
    messagePlaceholder?: string;
    requiredError?: string;
    submitting?: string;
    successFollowup?: string;
    retryError?: string;
    optional?: string;
    privacyNote?: string;
  }
}

const defaultTranslations: NonNullable<ContactFormProps['translations']> = {
  name: 'Name',
  company: 'Company',
  email: 'Email',
  phone: 'Phone',
  message: 'Message',
  submit: 'Submit',
  success: 'Thank you for your message. We will get back to you as soon as possible.',
  error: 'There was an error submitting your message. Please try again later.',
}

export default function ContactForm({ translations }: ContactFormProps) {
  const t = translations || defaultTranslations
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(null)
    setErrorMessage('')

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage(t.requiredError || 'Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    try {
      const emailParams: EmailParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }
      if (formData.company) emailParams.company = formData.company
      if (formData.phone) emailParams.phone = formData.phone

      const result = await sendEmail(emailParams)
      if (result.success) {
        setSubmitSuccess(true)
        setFormData({ name: '', company: '', email: '', phone: '', message: '' })
      } else {
        setSubmitSuccess(false)
        setErrorMessage(t.error)
      }
    } catch {
      setSubmitSuccess(false)
      setErrorMessage(t.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label>
        <span>{t.name} *</span>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder={t.namePlaceholder || 'John Doe'} autoComplete="name" required />
      </label>
      <label>
        <span>{t.company} <small>{t.optional}</small></span>
        <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder={t.companyPlaceholder || 'Company Ltd.'} autoComplete="organization" />
      </label>
      <label>
        <span>{t.email} *</span>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@company.com" autoComplete="email" required />
      </label>
      <label>
        <span>{t.phone} <small>{t.optional}</small></span>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+31 6 12345678" autoComplete="tel" />
      </label>
      <label className={styles.formFull}>
        <span>{t.message} *</span>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder={t.messagePlaceholder || 'How can we help you?'} required />
      </label>

      {submitSuccess === true ? (
        <p className={`${styles.formStatus} ${styles.formStatusOk}`} role="status">
          {t.success} {t.successFollowup}
        </p>
      ) : null}
      {errorMessage ? (
        <p className={`${styles.formStatus} ${styles.formStatusError}`} role="alert">
          {errorMessage} {submitSuccess === false ? t.retryError : ''}
        </p>
      ) : null}

      <div className={`${styles.formFull} ${styles.formActions}`}>
        <small>{t.privacyNote}</small>
        <button type="submit" className={styles.button} disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? (t.submitting || 'Submitting…') : t.submit}
          {isSubmitting ? null : <ArrowRightIcon />}
        </button>
      </div>
    </form>
  )
}
