import type {Metadata} from 'next'
import type {ReactNode} from 'react'
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell'

export const metadata: Metadata = {
  robots: {index: false, follow: false},
}

export default function AccountLayout({children}: {children: ReactNode}) {
  return <StoreShell>{children}</StoreShell>
}
