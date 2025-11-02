import { Navigate } from 'react-router-dom'
import useAuth from '../../context/AuthContext/useAuth'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useAuth()

  // Nếu user chưa đăng nhập, chuyển hướng về trang đăng nhập
  if (!state.driver_account) {
    return <Navigate to='/auth' replace />
  }

  // Nếu đã đăng nhập, render children (protected content)
  return <>{children}</>
}

export default ProtectedRoute
