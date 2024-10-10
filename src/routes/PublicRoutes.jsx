import { Navigate, Outlet } from "react-router-dom"

const PublicRoutes = () => {
  const isAuthenticated = !!localStorage.getItem('token')

  return !isAuthenticated ? <Outlet /> : <Navigate to='/' replace />
}

export default PublicRoutes
