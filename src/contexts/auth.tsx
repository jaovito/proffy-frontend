import React, { createContext, useState, useEffect } from 'react'
import * as auth from '../services/auth'

interface AuthContextData {
    signed: boolean
    user: [] | null
    loading: boolean
    signIn(email: string, password: string): Promise<void>
    signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<[] | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function loadStorageData() {

        const storagedUser =  localStorage.getItem("@ProffyAuth:user")
        const storagedToken =  localStorage.getItem("@ProffyAuth:token")
            
        if (storagedUser && storagedToken) {
            setUser(JSON.parse(storagedUser))
            setLoading(false)
        }
    }
        loadStorageData()
    }, [])

    async function signIn(email: string, password: string) {
        const response = await auth.signIn(email, password)

        setUser(response.user)
        
        localStorage.setItem("@ProffyAuth:user", JSON.stringify(response.user))
        localStorage.setItem("@ProffyAuth:token", response.token)
        
    }

   async function signOut() {
        localStorage.clear()

       setUser(null)
    }

    

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            signOut,
            loading
          }}>
              {children}
        </AuthContext.Provider> 
    )
}

export default AuthContext