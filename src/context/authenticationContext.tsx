
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { IUser } from '../interfaces/iUser'

const AuthenticationContext = createContext<{
    isAuthentication: boolean
    setIsAuthentication: React.Dispatch<React.SetStateAction<boolean>>
    user: IUser | undefined
    setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>
} | null>(null)

export const AuthenticationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthentication, setIsAuthentication] = useState<boolean>(false)
    const [user, setUser] = useState<IUser>()

    return (
        <AuthenticationContext.Provider value={{ isAuthentication, setIsAuthentication, user, setUser }}>
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
