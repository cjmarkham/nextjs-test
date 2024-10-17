import { Product } from '@/lib/models'
import { useProducts } from '@/hooks/products'
import { useSearchParams } from 'next/navigation'
import ProductPartial from '@/components/product'

export default function Index() {
  const query = useSearchParams()
  const queryLimit = query.get('limit')
  let limit = 12
  if (queryLimit) {
    limit = Number(queryLimit)
  }

  const { products } = useProducts(limit)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product: Product) => (
        <ProductPartial key={product.id} product={product}></ProductPartial>
      ))}
    </div>
  )
}
