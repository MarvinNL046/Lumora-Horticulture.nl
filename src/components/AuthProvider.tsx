'use client'

import { StackProvider, StackTheme } from '@stackframe/stack'
import { stackClientApp } from '@/stack/client'
import type { ReactNode } from 'react'

const dutchAuthTranslations = {
  'Sign in to your account': 'Log in op je account',
  "Don't have an account?": 'Nog geen account?',
  'Sign up': 'Registreren',
  'Create a new account': 'Maak je account aan',
  'Already have an account?': 'Heb je al een account?',
  'Sign in': 'Inloggen',
  'Sign in with {provider}': 'Inloggen met {provider}',
  'Sign up with {provider}': 'Registreren met {provider}',
  'Or continue with': 'Of ga verder met',
  'Email': 'E-mailadres',
  'Email & Password': 'E-mail en wachtwoord',
  'Send email': 'Stuur inloglink',
  'Password': 'Wachtwoord',
  'Forgot password?': 'Wachtwoord vergeten?',
  'Please enter a valid email': 'Vul een geldig e-mailadres in',
  'Please enter your password': 'Vul je wachtwoord in',
  'Continue': 'Doorgaan',
  'Reset Your Password': 'Herstel je wachtwoord',
  'Reset Password': 'Wachtwoord herstellen',
  'Sign out': 'Uitloggen',
} as const

const lumoraAuthTheme = {
  light: {
    background: '#ffffff',
    foreground: '#1d2a25',
    card: '#ffffff',
    cardForeground: '#1d2a25',
    popover: '#ffffff',
    popoverForeground: '#1d2a25',
    primary: '#2d7d46',
    primaryForeground: '#ffffff',
    secondary: '#eaf2ec',
    secondaryForeground: '#173d29',
    muted: '#f4f7f4',
    mutedForeground: '#596861',
    accent: '#eaf2ec',
    accentForeground: '#173d29',
    destructive: '#b7473f',
    destructiveForeground: '#ffffff',
    border: '#dce5df',
    input: '#dce5df',
    ring: '#2d7d46',
  },
  radius: '0.75rem',
} as const

// Only account, authentication and legacy checkout routes need the auth SDK.
export default function AuthProvider({ children, locale }: { children: ReactNode; locale: string }) {
  return (
    <StackProvider
      app={stackClientApp}
      lang={locale === 'de' ? 'de-DE' : 'en-US'}
      translationOverrides={locale === 'nl' ? dutchAuthTranslations : undefined}
    >
      <StackTheme theme={lumoraAuthTheme}>{children}</StackTheme>
    </StackProvider>
  )
}
