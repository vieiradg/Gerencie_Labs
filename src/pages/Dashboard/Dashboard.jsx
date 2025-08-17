import React from 'react';
import './Dashboard.css';
import { IconeTendencia, IconeRelogio, IconeUsuarios } from '../../components/Icons';

export default function Dashboard() {
    return (
        <div>
            <div className="pagina-cabecalho">
                <h1 className="pagina-titulo">Painel de Controle</h1>
            </div>
            <div className="grid-cartoes">
                <div className="cartao-dashboard">
                    <div className="cartao-conteudo">
                        <p className="cartao-titulo">Total Recebido (mês)</p>
                        <p className="cartao-valor">R$ 58.400</p>
                    </div>
                    <div className="cartao-icone fundo-sucesso">
                        <IconeTendencia className="icone-sucesso-escuro" />
                    </div>
                </div>
                <div className="cartao-dashboard">
                    <div className="cartao-conteudo">
                        <p className="cartao-titulo">Aluguéis Pendentes</p>
                        <p className="cartao-valor">R$ 8.200</p>
                    </div>
                    <div className="cartao-icone fundo-aviso">
                        <IconeRelogio className="icone-aviso" />
                    </div>
                </div>
                <div className="cartao-dashboard">
                    <div className="cartao-conteudo">
                        <p className="cartao-titulo">Inquilinos Ativos</p>
                        <p className="cartao-valor">17</p>
                    </div>
                    <div className="cartao-icone fundo-info">
                        <IconeUsuarios className="icone-info" />
                    </div>
                </div>
            </div>
        </div>
    );
}
