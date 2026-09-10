import { permanentRedirect } from 'next/navigation';
import { localizePathForLocale } from '@/lib/url-localizations';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  permanentRedirect(localizePathForLocale('/neemx-pro', locale));
}
