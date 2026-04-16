// Central API helper — all calls go through here
const BASE = '/api'

async function req(method, path, body) {
  const res = await fetch(BASE + path, {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const api = {
  // Auth
  login:  (email, password, role) => req('POST', '/auth/login',  { email, password, role }),
  logout: ()                       => req('POST', '/auth/logout'),
  me:     ()                       => req('GET',  '/auth/me'),

  // Leaves
  getLeaves:   ()       => req('GET',   '/leaves/'),
  applyLeave:  (data)   => req('POST',  '/leaves/', data),
  updateLeave: (id, d)  => req('PATCH', `/leaves/${id}`, d),

  // Notifications
  getNotifs:  ()  => req('GET',   '/notifications/'),
  markRead:   ()  => req('PATCH', '/notifications/read-all'),
}
