import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuthStore } from '../stores/auth'
import { paths } from './paths'

function RequireAuth() {
  const token = useAuthStore((s) => s.token)
  const location = useLocation()

  if (!token) return <Navigate to={paths.login} replace state={{ from: location }} />
  return <Outlet />
}

export default RequireAuth
