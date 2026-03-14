import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const role = localStorage.getItem('role')
    const fullName = localStorage.getItem('fullName')

    if (token && email) {
      setUser({ token, email, role, fullName })
    }
    setLoading(false)
  }, [])

  const login = (data) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('email', data.email)
    localStorage.setItem('role', data.role)
    localStorage.setItem('fullName', data.fullName)
    setUser(data)
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
  }

  const isOrganizer = () => user?.role === 'ROLE_ORGANIZER'
  const isBuyer = () => user?.role === 'ROLE_BUYER'

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isOrganizer, isBuyer }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)