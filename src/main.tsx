import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'

import { MainLayout } from 'layouts/MainLayout'
import { MenuPage } from 'pages/MenuPage'
import { ProductPage, productLoader } from 'pages/ProductPage'

import 'styles/main.scss'
import 'styles/reset.css'
import { AuthLayout } from 'layouts/AuthLayout'
import { Login } from 'layouts/AuthLayout/Login'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MenuPage />} />
        <Route
          path="/product/:id"
          element={<ProductPage />}
          loader={productLoader}
          errorElement={<h1>Page not found</h1>}
        />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>

      <Route path="*" element={<h1>Page not found</h1>} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
