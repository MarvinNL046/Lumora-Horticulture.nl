'use client'

import dynamic from 'next/dynamic'

const ApplicationsClient = dynamic(() => import('./ApplicationsClient'), {
  ssr: false,
})

export default function ApplicationsLoader({
  t,
  locale,
}: {
  t: Record<string, unknown>
  locale: string
}) {
  return <ApplicationsClient t={t} locale={locale} />
}
