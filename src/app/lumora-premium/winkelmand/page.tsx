import { CartPage } from '../_components/CartPage'

type WinkelmandPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function readParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

export default async function WinkelmandPage({ searchParams }: WinkelmandPageProps) {
  const params = await searchParams
  const quantityValue = Number.parseInt(readParam(params.quantity) ?? '', 10)
  return (
    <CartPage
      action={readParam(params.action)}
      variantId={readParam(params.variant)}
      quantity={Number.isFinite(quantityValue) ? quantityValue : undefined}
    />
  )
}
