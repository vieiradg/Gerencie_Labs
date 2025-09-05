import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isAuthenticated: false, user: null });

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setAuth({ isAuthenticated: true, user: JSON.parse(loggedInUser) });
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setAuth({ isAuthenticated: true, user: userData });
    };

    const logout = () => {
        localStorage.removeItem('user');
        setAuth({ isAuthenticated: false, user: null });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};