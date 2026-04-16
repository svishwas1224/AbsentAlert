import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [role, setRole]       = useState('student')
  const [email, setEmail]     = useState('')
  const [pass, setPass]       = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !pass) { setError('Please enter your credentials.'); return }
    setLoading(true); setError('')
    try {
      await login(email, pass, role)
    } catch (e) {
      setError(e.message || 'Invalid credentials.')
      setLoading(false)
    }
  }

  const fillDemo = (r) => {
    setRole(r)
    setEmail(r === 'student' ? 'student@demo.com' : 'faculty@demo.com')
    setPass('1234')
    setError('')
  }

  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding:'1.5rem', position:'relative', zIndex:1 }}>
      <div className="fade-up" style={{ width:'100%', maxWidth:'440px' }}>

        {/* Brand */}
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ width:64, height:64, background:'linear-gradient(135deg,rgba(45,212,191,.15),rgba(45,212,191,.05))', border:'1px solid rgba(45,212,191,.3)', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem', fontSize:28, boxShadow:'0 0 40px rgba(45,212,191,.12)' }}>🎓</div>
          <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'2.1rem', letterSpacing:'-.5px' }}>
            Absent<span style={{ color:'var(--teal)' }}>Alert</span>
          </h1>
          <p style={{ color:'var(--text-3)', fontSize:'.875rem', marginTop:'.35rem' }}>
            Automated Leave Intimation System for Colleges
          </p>
        </div>

        {/* Card */}
        <div className="card" style={{ borderRadius:24, padding:'2rem', background:'rgba(15,30,53,.9)', backdropFilter:'blur(24px)', boxShadow:'0 24px 64px rgba(0,0,0,.5)' }}>

          {/* Role tabs */}
          <div style={{ display:'flex', gap:4, background:'rgba(0,0,0,.3)', borderRadius:14, padding:4, marginBottom:'1.75rem' }}>
            {['student','faculty'].map(r => (
              <button key={r} onClick={() => { setRole(r); setError('') }}
                style={{ flex:1, padding:'.55rem', border:`1px solid ${role===r?'rgba(45,212,191,.25)':'transparent'}`,
                  background: role===r ? 'var(--teal-dim)' : 'transparent',
                  color: role===r ? 'var(--teal)' : 'var(--text-3)',
                  fontFamily:"'Inter',sans-serif", fontSize:'.875rem', fontWeight:500,
                  cursor:'pointer', borderRadius:11, transition:'all var(--tr)' }}>
                {r === 'student' ? '🎓 Student' : '👨‍🏫 Faculty'}
              </button>
            ))}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email / Roll Number</label>
            <div className="input-group">
              <span className="input-icon">✉️</span>
              <input className="form-control" type="text" value={email}
                placeholder={role === 'student' ? 'student@demo.com' : 'faculty@demo.com'}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input className="form-control" type="password" value={pass}
                placeholder="••••••••"
                onChange={e => setPass(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ color:'var(--rejected)', fontSize:'.82rem', marginTop:'.75rem', padding:'.6rem .875rem', background:'var(--rejected-bg)', border:'1px solid rgba(248,113,113,.25)', borderRadius:10, textAlign:'center' }}>
              ⚠ {error}
            </div>
          )}

          {/* Submit */}
          <button className="btn btn-primary btn-full" style={{ marginTop:'.75rem', padding:'.875rem', borderRadius:14, fontSize:'.95rem' }}
            onClick={handleLogin} disabled={loading}>
            {loading ? <><span className="spinner" /> Signing in…</> : 'Sign In →'}
          </button>

          <div className="divider"><span>Quick Demo Access</span></div>

          {/* Demo */}
          <div style={{ padding:'.875rem 1rem', background:'rgba(45,212,191,.04)', border:'1px solid rgba(45,212,191,.1)', borderRadius:12, fontSize:'.8rem', color:'var(--text-3)', lineHeight:1.9 }}>
            <strong style={{ color:'var(--teal)' }}>Student:</strong>{' '}
            <code onClick={() => fillDemo('student')} style={{ background:'rgba(45,212,191,.1)', border:'1px solid rgba(45,212,191,.2)', borderRadius:6, padding:'1px 8px', color:'var(--teal)', cursor:'pointer' }}>student@demo.com</code> / <code onClick={() => fillDemo('student')} style={{ background:'rgba(45,212,191,.1)', border:'1px solid rgba(45,212,191,.2)', borderRadius:6, padding:'1px 8px', color:'var(--teal)', cursor:'pointer' }}>1234</code><br/>
            <strong style={{ color:'var(--teal)' }}>Faculty:</strong>{' '}
            <code onClick={() => fillDemo('faculty')} style={{ background:'rgba(45,212,191,.1)', border:'1px solid rgba(45,212,191,.2)', borderRadius:6, padding:'1px 8px', color:'var(--teal)', cursor:'pointer' }}>faculty@demo.com</code> / <code onClick={() => fillDemo('faculty')} style={{ background:'rgba(45,212,191,.1)', border:'1px solid rgba(45,212,191,.2)', borderRadius:6, padding:'1px 8px', color:'var(--teal)', cursor:'pointer' }}>1234</code>
          </div>

          {/* Features */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.5rem', marginTop:'1.25rem' }}>
            {['✍️ Easy Applications','🔔 Auto Notifications','📊 Digital Records','✅ Quick Approvals'].map(f => (
              <div key={f} style={{ display:'flex', alignItems:'center', gap:7, padding:'.5rem .75rem', background:'rgba(45,212,191,.03)', border:'1px solid rgba(45,212,191,.07)', borderRadius:10, fontSize:'.75rem', color:'var(--text-3)' }}>{f}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
