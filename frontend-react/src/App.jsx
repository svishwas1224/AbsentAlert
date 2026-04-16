import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import FacultyDashboard from './pages/FacultyDashboard'

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', color:'var(--teal)', fontSize:'1.5rem' }}>
      <span className="spinner" style={{ width:32, height:32, borderWidth:3 }} />
    </div>
  )

  if (!user) return <Login />
  if (user.role === 'student') return <StudentDashboard />
  if (user.role === 'faculty') return <FacultyDashboard />
  return <Login />
}

export default function App() {
  return (
    <AuthProvider>
      <div className="bg-mesh" />
      <div className="bg-grid" />
      <AppRoutes />
    </AuthProvider>
  )
}
