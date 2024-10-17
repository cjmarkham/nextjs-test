import { useEffect, useState } from 'react'
import { Product } from '@/lib/models'

export const useProducts = (limit: number) => {
  const [products, setProducts] = useState<Array<Product>>([])

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      const response = await fetch(`/api/products?limit=${limit}`, {
        signal: controller.signal,
      }).catch((err) => {
        if (err.name !== 'AbortError') {
          console.error(err)
        }
      })

      if (!response) {
        return
      }

      const products = await response.json()

      setProducts(products.data)
    })()

    return () => {
      controller.abort()
    }
  }, [limit])

  return { products }
}

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product>({ description: '', id: '', image: '', name: '', price: 0 })

  useEffect(() => {
    const controller = new AbortController()

    ;(async() => {
      const response = await fetch(`/api/products/${id}`, {
        signal: controller.signal,
      }).catch((err) => {
        if (err.name !== 'AbortController') {
          console.error(err)
        }
      })

      if (!response) {
        return
      }

      const product = await response.json()
      setProduct(product.data)
    })()

    return () => {
      controller.abort()
    }
  }, [id])

  return { product }
}
