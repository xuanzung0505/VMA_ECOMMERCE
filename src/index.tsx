import ReactDOM from 'react-dom'
import React from 'react'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './routes/error-page'

import { App } from './routes/App'
import { LoginPage } from './routes/LoginPage'
import { CartPage } from './routes/CartPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      //login
      // {
      //   path: '/login',
      //   element: <LoginPage />,
      // },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
    errorElement: <ErrorPage />,
  },
])

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
)
