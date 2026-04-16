import { useState, useCallback } from 'react'

export function useToast() {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((title, msg, type = 'success') => {
    const id = Date.now()
    setToasts(t => [...t, { id, title, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3800)
  }, [])

  return { toasts, showToast }
}
