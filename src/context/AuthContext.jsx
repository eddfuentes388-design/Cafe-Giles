import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('cgl_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('cgl_user')
    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
      api.defaults.headers.common.Authorization = `Bearer ${token}`
    }
    setLoading(false)
  }, [token])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    persistSession(data.token, data.user)
    return data.user
  }

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload)
    persistSession(data.token, data.user)
    return data.user
  }

  const requestPasswordReset = async (email) => {
    const { data } = await api.post('/auth/forgot-password', { email })
    return data
  }

  const persistSession = (newToken, newUser) => {
    localStorage.setItem('cgl_token', newToken)
    localStorage.setItem('cgl_user', JSON.stringify(newUser))
    api.defaults.headers.common.Authorization = `Bearer ${newToken}`
    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem('cgl_token')
    localStorage.removeItem('cgl_user')
    delete api.defaults.headers.common.Authorization
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(token),
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        requestPasswordReset
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de un AuthProvider')
  return ctx
}
