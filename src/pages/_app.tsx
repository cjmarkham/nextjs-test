import Layout from '../components/layout'
import '../components/globals.css'
import { CartProvider } from '@/context/cart'

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  )
}
