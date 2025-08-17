import React, { useState } from 'react';
import PaginaInicial from './pages/PaginaInicial/PaginaInicial';
import Login from './pages/Login/Login';
import Layout from './components/Layout/Layout';

export default function App() {
    const [telaAtual, setTelaAtual] = useState('inicial'); 

    const irParaLogin = () => setTelaAtual('login');
    const irParaApp = () => setTelaAtual('app');
    const sairDoApp = () => setTelaAtual('inicial');

    const renderizarTela = () => {
        switch (telaAtual) {
            case 'login':
                return <Login onLoginSucesso={irParaApp} />;
            case 'app':
                return <Layout onSair={sairDoApp} />;
            case 'inicial':
            default:
                return <PaginaInicial onEntrarClick={irParaLogin} />;
        }
    };

    return (
        <React.Fragment>
            {renderizarTela()}
        </React.Fragment>
    );
}
