'use client'

import { useState, FormEvent, useEffect } from 'react'

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
  }
}

export default function ContactForm({ translations }: ContactFormProps) {
  // Default translations (fallback to English if no translations provided)
  const t = translations || {
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    message: "Message",
    submit: "Submit",
    success: "Thank you for your message. We will get back to you as soon as possible.",
    error: "There was an error submitting your message. Please try again later."
  }
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  })
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  
  // Animation states
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    // Trigger animation on component mount with slight delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 150)
    
    return () => clearTimeout(timer)
  }, [])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(null)
    
    // Validate form (basic validation)
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }
    
    try {
      // In a real application, this would be an API call to a serverless function
      // or an API route that handles the email submission
      // For now, we'll simulate a successful submission
      setTimeout(() => {
        setSubmitSuccess(true)
        setIsSubmitting(false)
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          message: ''
        })
      }, 1000)
    } catch (error) {
      setSubmitSuccess(false)
      setErrorMessage(t.error)
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className={`transition-all duration-1000 transform ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <div className="card bg-white p-8 md:p-10 shadow-soft-lg max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="transition-all duration-300 transform hover:translate-y-[-2px] focus-within:translate-y-[-2px]">
              <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-2">
                {t.name} <span className="text-lumora-gold">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
            
            {/* Company Field */}
            <div className="transition-all duration-300 transform hover:translate-y-[-2px] focus-within:translate-y-[-2px]">
              <label htmlFor="company" className="block text-base font-medium text-gray-700 mb-2">
                {t.company}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="Company Ltd."
                />
              </div>
            </div>
            
            {/* Email Field */}
            <div className="transition-all duration-300 transform hover:translate-y-[-2px] focus-within:translate-y-[-2px]">
              <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
                {t.email} <span className="text-lumora-gold">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>
            
            {/* Phone Field */}
            <div className="transition-all duration-300 transform hover:translate-y-[-2px] focus-within:translate-y-[-2px]">
              <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-2">
                {t.phone}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="+31 123 456 789"
                />
              </div>
            </div>
          </div>
          
          {/* Message Field */}
          <div className="transition-all duration-300 transform hover:translate-y-[-2px] focus-within:translate-y-[-2px]">
            <label htmlFor="message" className="block text-base font-medium text-gray-700 mb-2">
              {t.message} <span className="text-lumora-gold">*</span>
            </label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="input resize-none"
                placeholder="How can we help you?"
                required
              />
            </div>
          </div>
          
          {/* Form Submission */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-lumora-dark hover:bg-lumora-dark-700 text-lumora-cream w-full justify-center py-4 px-6 text-base relative overflow-hidden group rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>{t.submit}</span>
                    <svg className="ml-2 -mr-1 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>
          
          {/* Success/Error Messages */}
          <div className="transition-all duration-500 ease-in-out">
            {submitSuccess === true && (
              <div className="glass bg-lumora-cream/90 text-lumora-dark px-6 py-4 rounded-xl shadow-soft flex items-start">
                <svg className="h-6 w-6 mr-3 flex-shrink-0 text-lumora-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">{t.success}</p>
                  <p className="text-sm mt-1">We'll get back to you as soon as possible.</p>
                </div>
              </div>
            )}
            
            {submitSuccess === false && (
              <div className="glass bg-red-50/90 text-red-800 px-6 py-4 rounded-xl shadow-soft flex items-start">
                <svg className="h-6 w-6 mr-3 flex-shrink-0 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">{t.error}</p>
                  <p className="text-sm mt-1">{errorMessage || 'Please try again later.'}</p>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
