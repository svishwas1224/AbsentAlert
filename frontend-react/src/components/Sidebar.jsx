import { useAuth } from '../context/AuthContext'

export default function Sidebar({ role, activePage, onNavigate, unread }) {
  const { user, logout } = useAuth()
  const ini = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '??'

  const studentNav = [
    { id: 'dashboard',     icon: '🏠', label: 'Dashboard' },
    { id: 'apply',         icon: '✍️', label: 'Apply Leave' },
    { id: 'history',       icon: '📋', label: 'Leave History' },
    { id: 'calendar',      icon: '📅', label: 'Calendar' },
    { id: 'notifications', icon: '🔔', label: 'Notifications', badge: unread },
    { id: 'profile',       icon: '👤', label: 'Profile' },
  ]
  const facultyNav = [
    { id: 'dashboard',    icon: '🏠', label: 'Dashboard' },
    { id: 'pending',      icon: '⏳', label: 'Pending Requests', badge: unread, badgeClass: 'yellow' },
    { id: 'all-requests', icon: '📋', label: 'All Requests' },
    { id: 'students',     icon: '👥', label: 'My Students' },
    { id: 'reports',      icon: '📊', label: 'Reports' },
    { id: 'profile',      icon: '👤', label: 'Profile' },
  ]
  const nav = role === 'student' ? studentNav : facultyNav

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">🎓</div>
        <div className="brand-text">
          <h2>Absent<span>Alert</span></h2>
          <p>{role === 'student' ? 'Student Portal' : 'Faculty Portal'}</p>
        </div>
      </div>

      <div className="sidebar-user">
        <div className={`sidebar-avatar ${role}`}>{ini}</div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">{user?.name}</div>
          <div className="sidebar-user-meta">
            {role === 'student' ? `${user?.roll_id} · ${user?.year}` : user?.designation}
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">Navigation</div>
        {nav.map(item => (
          <div
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
            {item.badge > 0 && (
              <span className={`nav-badge ${item.badgeClass || ''}`}>{item.badge}</span>
            )}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="btn-logout" onClick={logout}>↩ &nbsp;Sign Out</button>
      </div>
    </aside>
  )
}
