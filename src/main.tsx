import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import {
  CartPage,
  MenuPage,
  ProductPage,
  SuccessPage,
  LoginPage,
  RegistrationPage,
  productLoader,
} from 'pages'
import { AuthLayout, MainLayout } from 'layouts'

import store from 'store'
import { persistor } from 'store'
import { RequiredAuth } from 'utils/RequiredAuth'

import 'styles/reset.css'
import 'styles/main.scss'

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

        <Route path="/success" element={<SuccessPage />} />

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
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)
