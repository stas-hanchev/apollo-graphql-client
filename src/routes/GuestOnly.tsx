import { Navigate, Outlet, useLocation, type Location } from 'react-router'
import { useAuthStore } from '../stores/auth'
import { paths } from './paths'

function GuestOnly() {
  const token = useAuthStore((s) => s.token)
  const from = (useLocation().state as { from?: Location } | null)?.from

  if (token) return <Navigate to={from ?? paths.home} replace />
  return <Outlet />
}

export default GuestOnly
