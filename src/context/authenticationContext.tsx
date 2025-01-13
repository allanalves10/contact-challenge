
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { IUser } from '../interfaces/iUser'

const AuthenticationContext = createContext<{
    isAuthentication: boolean
    handleAuthentication: (value: boolean) => void
    user: IUser | undefined
    handleUser: (value: IUser | undefined) => void
} | null>(null)

export const AuthenticationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthentication, setIsAuthentication] = useState<boolean>(false)
    const [user, setUser] = useState<IUser>()

    useEffect(() => {
        const storageAuthenticatedValue = localStorage.getItem('isAuthenticated')
        const storageUserAuthenticatedValue = localStorage.getItem('userAuthenticated')

        if (storageAuthenticatedValue) {
            setIsAuthentication(JSON.parse(storageAuthenticatedValue))
        }

        if (storageUserAuthenticatedValue) {
            setUser(JSON.parse(storageUserAuthenticatedValue))
        }
    }, [])

    const handleAuthentication = (value: boolean) => {
        localStorage.setItem('isAuthenticated', JSON.stringify(value))

        setIsAuthentication(value)
    }

    const handleUser = (value: IUser | undefined) => {
        if (!value) {
            localStorage.removeItem('userAuthenticated')
            return
        }

        localStorage.setItem('userAuthenticated', JSON.stringify(value))

        setUser(value)
    }

    return (
        <AuthenticationContext.Provider value={{ isAuthentication, handleAuthentication, handleUser, user }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export const useAuthentication = () => {
    const context = useContext(AuthenticationContext)

    if (!context) {
        throw new Error('useAuthentication must be used with a AuthenticationProvider')
    }

    return context
}
