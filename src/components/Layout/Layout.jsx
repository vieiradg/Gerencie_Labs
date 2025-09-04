import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuLateral from './MenuLateral';
import './Layout.css';
import { useAuth } from '../../context/AuthContext';

export default function Layout() {
    const { logout } = useAuth(); 

    return (
        <div className="layout-container">
            <MenuLateral onSair={logout} />
            
            <main className="conteudo-principal">
                <Outlet />
            </main>
        </div>
    );
}
