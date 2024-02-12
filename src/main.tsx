import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'
import { Provider } from 'react-redux'

import { MainLayout } from 'layouts/MainLayout'
import { MenuPage } from 'pages/MenuPage'
import { ProductPage, productLoader } from 'pages/ProductPage'
import { AuthLayout } from 'layouts/AuthLayout'
import { LoginPage } from 'pages/LoginPage'
import { RegistrationPage } from 'pages/RegistrationPage'
import { RequiredAuth } from 'utils/RequiredAuth/RequiredAuth'

import store from 'store'

import 'styles/reset.css'
import 'styles/main.scss'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <RequiredAuth>
              <MenuPage />
            </RequiredAuth>
          }
        />
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

      <Route path="*" element={<h1>Page not found</h1>} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
