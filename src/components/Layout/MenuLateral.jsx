import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconeCasa, IconeGrafico, IconeUsuarios, IconeDocumento, IconeDinheiro } from '../Icons'; 
import './Layout.css';

export default function MenuLateral({ onSair }) {
    return (
        <aside className="menu-lateral">
            <div className="logo" style={{ marginBottom: '2.5rem' }}>
                <div className="logo-icone-fundo">
                    <IconeCasa className="icone-branco" />
                </div>
                <span className="logo-nome">Gerencie</span>
            </div>
            <nav className="menu-navegacao">
                <NavLink to="/dashboard" end className="menu-item">
                    <IconeGrafico className="icone"/>
                    <span>Painel de Controle</span>
                </NavLink>
                <NavLink to="/dashboard/imoveis" className="menu-item">
                    <IconeCasa className="icone"/>
                    <span>Meus Imóveis</span>
                </NavLink>
                <NavLink to="/dashboard/inquilinos" className="menu-item">
                    <IconeUsuarios className="icone"/>
                    <span>Inquilinos</span>
                </NavLink>
                
                <NavLink to="/dashboard/pagamentos" className="menu-item">
                    <IconeDinheiro className="icone"/>
                    <span>Pagamentos</span>
                </NavLink>
                
                <NavLink to="/dashboard/documentos" className="menu-item">
                    <IconeDocumento className="icone"/>
                    <span>Documentos</span>
                </NavLink>
            </nav>
            <div className="menu-lateral-rodape">
                <button onClick={onSair} className="botao botao-contorno botao-cheio">Sair</button>
            </div>
        </aside>
    );
}