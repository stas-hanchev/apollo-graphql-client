import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '../stores/auth'
import { paths } from './paths'

function GuestOnly() {
  const token = useAuthStore((s) => s.token)

  if (token) return <Navigate to={paths.home} replace />
  return <Outlet />
}

export default GuestOnly
