import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/Api'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isAuthenticated: false, user: null });

    useEffect(() => {
        const token = localStorage.getItem('$token');
        const user = localStorage.getItem('user');

        if (token && user) {
            api.defaults.headers.Authorization = `Bearer ${token}`;
            // setAuth({ isAuthenticated: true, user: JSON.parse(user) });
        }
    }, []);

    const login = (token, userData) => {
        localStorage.setItem('$token', token);
        localStorage.setItem('user', JSON.stringify(userData));

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setAuth({ isAuthenticated: true, user: userData });
    };

    const logout = () => {
        localStorage.removeItem('$token');
        localStorage.removeItem('user');

        api.defaults.headers.Authorization = null;

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