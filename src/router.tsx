import { createBrowserRouter } from 'react-router'
import RootLayout from './components/RootLayout'
import RequireAuth from './routes/RequireAuth'
import GuestOnly from './routes/GuestOnly'
import FeedPage from './pages/FeedPage'
import SearchPage from './pages/SearchPage'
import CreateLinkPage from './pages/CreateLinkPage'
import EditLinkPage from './pages/EditLinkPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import ErrorPage from './pages/ErrorPage'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <FeedPage /> },
      { path: 'search', element: <SearchPage /> },
      {
        element: <RequireAuth />,
        children: [
          { path: 'create', element: <CreateLinkPage /> },
          { path: 'links/:id/edit', element: <EditLinkPage /> },
        ],
      },
      {
        element: <GuestOnly />,
        children: [{ path: 'login', element: <LoginPage /> }],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
