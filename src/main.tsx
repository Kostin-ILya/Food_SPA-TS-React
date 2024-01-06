import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { MainLayout } from 'layouts/MainLayout'
import { MenuPage } from 'pages/MenuPage'

import 'styles/main.scss'
import 'styles/reset.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MenuPage />,
      },
      {
        path: 'menu',
        element: <MenuPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
