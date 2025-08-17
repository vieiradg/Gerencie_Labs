import React, { useState } from 'react';
import MenuLateral from './MenuLateral';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Imoveis from '../../pages/Imoveis/Imoveis';
import Inquilinos from '../../pages/Inquilinos/Inquilinos';
import Mensagens from '../../pages/Mensagens/Mensagens';
import Documentos from '../../pages/Documentos/Documentos';
import './Layout.css';

export default function Layout({ onSair }) {
    const [paginaAtiva, setPaginaAtiva] = useState('dashboard');
    const [imovelSelecionado, setImovelSelecionado] = useState(null);

    const renderizarPagina = () => {
        if (imovelSelecionado) {
            return <Imoveis imovelProp={imovelSelecionado} onVoltar={() => setImovelSelecionado(null)} />;
        }

        switch (paginaAtiva) {
            case 'imoveis': return <Imoveis onImovelClick={setImovelSelecionado} />;
            case 'inquilinos': return <Inquilinos />;
            case 'mensagens': return <Mensagens />;
            case 'documentos': return <Documentos />;
            case 'dashboard': default: return <Dashboard />;
        }
    };

    return (
        <div className="layout-container">
            <MenuLateral 
                paginaAtiva={paginaAtiva} 
                setPaginaAtiva={setPaginaAtiva} 
                onSair={onSair}
                setImovelSelecionado={setImovelSelecionado}
                temImovelSelecionado={!!imovelSelecionado}
            />
            <main className="conteudo-principal">
                {renderizarPagina()}
            </main>
        </div>
    );
}
