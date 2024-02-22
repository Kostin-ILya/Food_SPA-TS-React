import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from 'react-router-dom'
import { Provider } from 'react-redux'

import { MainLayout } from 'layouts/MainLayout'
import { MenuPage } from 'pages/MainPages/MenuPage'
import { ProductPage, productLoader } from 'pages/MainPages/ProductPage'
import { AuthLayout } from 'layouts/AuthLayout'
import { LoginPage } from 'pages/AuthPages/LoginPage'
import { RegistrationPage } from 'pages/AuthPages/RegistrationPage'
import { RequiredAuth } from 'utils/RequiredAuth'

import store from 'store'

import 'styles/reset.css'
import 'styles/main.scss'
import { CartPage } from 'pages/MainPages/CartPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <RequiredAuth>
            <MainLayout />
          </RequiredAuth>
        }
      >
        <Route index element={<MenuPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route
          path="/product/:id"
          element={<ProductPage />}
          loader={productLoader}
          errorElement={<h1>Page not found</h1>}
        />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistrationPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
