import React from 'react';
import { IconeCasa, IconeGrafico, IconeUsuarios, IconeMensagem, IconeDocumento } from '../Icons';
import './Layout.css';

export default function MenuLateral({ paginaAtiva, setPaginaAtiva, onSair, setImovelSelecionado, temImovelSelecionado }) {
    
    const handleMenuClick = (pagina) => {
        setPaginaAtiva(pagina);
        setImovelSelecionado(null);
    };

    return (
        <aside className="menu-lateral">
            <div className="menu-lateral-logo">
                <div className="logo-icone-fundo">
                    <IconeCasa className="icone-branco" />
                </div>
                <span className="logo-nome">gerencie</span>
            </div>
            <nav className="menu-navegacao">
                <button onClick={() => handleMenuClick('dashboard')} className={`menu-item ${paginaAtiva === 'dashboard' && !temImovelSelecionado ? 'ativo' : ''}`}>
                    <IconeGrafico className="icone" /> <span>Painel de Controle</span>
                </button>
                <button onClick={() => handleMenuClick('imoveis')} className={`menu-item ${paginaAtiva === 'imoveis' || temImovelSelecionado ? 'ativo' : ''}`}>
                    <IconeCasa className="icone" /> <span>Meus Imóveis</span>
                </button>
                <button onClick={() => handleMenuClick('inquilinos')} className={`menu-item ${paginaAtiva === 'inquilinos' ? 'ativo' : ''}`}>
                    <IconeUsuarios className="icone" /> <span>Inquilinos</span>
                </button>
                 <button onClick={() => handleMenuClick('mensagens')} className={`menu-item ${paginaAtiva === 'mensagens' ? 'ativo' : ''}`}>
                    <IconeMensagem className="icone" /> <span>Mensagens</span>
                </button>
                <button onClick={() => handleMenuClick('documentos')} className={`menu-item ${paginaAtiva === 'documentos' ? 'ativo' : ''}`}>
                    <IconeDocumento className="icone" /> <span>Documentos</span>
                </button>
            </nav>
            <div className="menu-lateral-rodape">
                <button onClick={onSair} className="botao botao-contorno botao-cheio">Sair</button>
            </div>
        </aside>
    );
}
