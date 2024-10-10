import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  const isAuthenticated = !!localStorage.getItem('token')
  return isAuthenticated ? <Outlet /> : <Navigate to='/signin' replace />
}

export default PrivateRoutes