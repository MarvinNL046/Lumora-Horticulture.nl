'use client'

import { useState, FormEvent } from 'react'

interface HeroContactFormProps {
  translations?: {
    name: string;
    email: string;
    message: string;
    submit: string;
    success: string;
    error: string;
    quickContact: string;
  }
}

export default function HeroContactForm({ translations }: HeroContactFormProps) {
  // Default translations (fallback to English if no translations provided)
  const t = translations || {
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Send",
    success: "Message sent!",
    error: "Error sending message",
    quickContact: "Quick Contact"
  }
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(null)
      }, 5000)
    } catch (error) {
      setSubmitSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="glass-contact backdrop-blur-lg bg-gradient-to-br from-lumora-dark/80 to-lumora-dark-800/90 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-lumora-cream/10 transform hover:-translate-y-1">
      <div className="bg-gradient-to-r from-lumora-dark-700/30 to-transparent px-4 py-3 border-b border-lumora-cream/10">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-lumora-gold-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {t.quickContact}
        </h3>
      </div>
      <div className="p-5">
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-lumora-cream/10 border border-lumora-cream/20 text-lumora-cream placeholder-lumora-cream/60 focus:outline-none focus:ring-2 focus:ring-lumora-gold/40 focus:bg-lumora-cream/15 transition-all duration-300"
              placeholder={t.name}
              required
            />
          </div>
          
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-lumora-cream/10 border border-lumora-cream/20 text-lumora-cream placeholder-lumora-cream/60 focus:outline-none focus:ring-2 focus:ring-lumora-gold/40 focus:bg-lumora-cream/15 transition-all duration-300"
              placeholder={t.email}
              required
            />
          </div>
          
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg bg-lumora-cream/10 border border-lumora-cream/20 text-lumora-cream placeholder-lumora-cream/60 focus:outline-none focus:ring-2 focus:ring-lumora-gold/40 focus:bg-lumora-cream/15 transition-all duration-300 resize-none"
              placeholder={t.message}
              required
            ></textarea>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-lumora-cream hover:bg-lumora-cream/90 text-lumora-dark py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center group shadow-lg shadow-lumora-cream/20"
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <span>{t.submit}</span>
                  <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
          
          {submitSuccess === true && (
            <div className="text-center py-2 px-3 rounded-lg bg-green-500/30 text-white border border-green-500/40 shadow-inner">
              {t.success}
            </div>
          )}
          
          {submitSuccess === false && (
            <div className="text-center py-2 px-3 rounded-lg bg-red-500/30 text-white border border-red-500/40 shadow-inner">
              {t.error}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
