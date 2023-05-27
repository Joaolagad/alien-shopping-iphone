import '@/styles/globals.css'
import { CartProvider } from '../Components/CartContext'
export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
          <Component {...pageProps} />
    </CartProvider>
  )

}
