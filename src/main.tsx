import ReactDOM from 'react-dom/client'
import { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import store from 'store'
import { persistor } from 'store'
import { RequiredAuth } from 'utils/RequiredAuth'

import 'styles/reset.css'
import 'styles/main.scss'

const MainLayout = lazy(() => import('layouts/MainLayout/MainLayout'))
const AuthLayout = lazy(() => import('layouts/AuthLayout'))
const LoginPage = lazy(() => import('pages/AuthPages/LoginPage'))
const RegistrationPage = lazy(() => import('pages/AuthPages/RegistrationPage'))
const MenuPage = lazy(() => import('pages/MainPages/MenuPage/MenuPage'))
const CartPage = lazy(() => import('pages/MainPages/CartPage'))
const SuccessPage = lazy(() => import('pages/MainPages/SuccessPage'))
const ProductPage = lazy(() => import('pages/MainPages/ProductPage'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <RequiredAuth>
            <Suspense fallback={null}>
              <MainLayout />
            </Suspense>
          </RequiredAuth>
        }
      >
        <Route index element={<MenuPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/success" element={<SuccessPage />} />

        <Route path="/product/:id" element={<ProductPage />} />
      </Route>

      <Route
        path="/auth"
        element={
          <Suspense fallback={null}>
            <AuthLayout />
          </Suspense>
        }
      >
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistrationPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)
