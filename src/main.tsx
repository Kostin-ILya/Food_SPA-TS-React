import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'

import { MainLayout } from 'layouts/MainLayout'
import { MenuPage } from 'pages/MenuPage'

import 'styles/main.scss'
import 'styles/reset.css'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <MainLayout />,
//     children: [
//       {
//         index: true,
//         element: <MenuPage />,
//       },
//       {
//         path: 'menu',
//         element: <MenuPage />,
//       },
//     ],
//   },
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MenuPage />} />
        <Route path="menu" element={<MenuPage />} />
      </Route>
      <Route path="*" element={<h1>Page not found</h1>} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
