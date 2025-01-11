
import React, { createContext, useContext, useState, ReactNode } from 'react';

const AuthenticationContext = createContext<{
    isAuthentication: boolean;
    setIsAuthentication: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const AuthenticationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthentication, setIsAuthentication] = useState<boolean>(false);

    return (
        <AuthenticationContext.Provider value={{ isAuthentication, setIsAuthentication }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export const useAuthentication = () => {
    const context = useContext(AuthenticationContext);

    if (!context) {
        throw new Error('useAuthentication must be used with a AuthenticationProvider');
    }

    return context;
};
