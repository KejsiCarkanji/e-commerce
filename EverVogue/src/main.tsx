import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import AddProduct from './pages/AddProduct.tsx'
import Products from './pages/Products.tsx'
import { ProductsContextProvider } from './store/useProductsContext.tsx'
import { CartContextProvider } from './store/useCartContext.tsx'
import Cart from './pages/Cart.tsx'
import Checkout from './pages/Checkout.tsx'
import History from './pages/History.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/add-product',
    element: <AddProduct />
  },
  {
    path: '/products',
    element: <Products />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/checkout',
    element: <Checkout />
  },
  {
    path: '/history',
    element: <History />
  }
 ])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductsContextProvider>
  <CartContextProvider>
        <RouterProvider router={router} />
  </CartContextProvider>
    </ProductsContextProvider>
  </StrictMode>,
)


