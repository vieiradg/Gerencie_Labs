import { useEffect, useState } from 'react';
import './Dashboard.css';
import { IconeTendencia, IconeRelogio, IconeUsuarios, IconeCalendario, IconeFerramenta, IconeDocumento } from '../../components/Icons';
import api from "../../services/Api";
import { toast } from 'react-toastify';

export default function Dashboard({ setPaginaAtiva }) {
    const [propertys, setPropertys] = useState([]);
    const [erro, setErro] = useState(null);
    const [activeTenants, setActiveTenants] = useState(0);

    const token = localStorage.getItem("token"); 

    const proximasAcoes = [
        { id: 1, icone: IconeCalendario, titulo: 'Contrato a vencer', detalhe: 'Apt 201 - Maria Santos', status: '15 dias', tipo: 'aviso', destino: 'imoveis' },
        { id: 2, icone: IconeFerramenta, titulo: 'Reparo solicitado', detalhe: 'Casa 15 - João Silva', status: 'Urgente', tipo: 'info', destino: 'mensagens' },
        { id: 3, icone: IconeDocumento, titulo: 'Documentos pendentes', detalhe: 'Apt 305 - Ana Costa', status: '3 docs', tipo: 'sucesso', destino: 'documentos' },
    ];

    const carregarPainel = async () => {
        try {
            const resposta = await api.get("/dashboard/control_panel", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { propertys } = resposta.data;
            setPropertys(propertys);
            setActiveTenants(resposta.data.active_tenants);

            toast.success("Painel carregado com sucesso!");
        } catch (error) {
            const mensagem = error.response?.data?.error || "Erro desconhecido";
            setErro(mensagem);
            toast.error(mensagem);
            console.log(error.response?.data);
        }
    };

    useEffect(() => { carregarPainel(); }, []);

    return (
        <div>
            <div className="pagina-cabecalho">
                <h1 className="pagina-titulo">Painel de Controle</h1>
            </div>

            <div className="grid-cartoes">
                <div className="cartao-dashboard interativo" onClick={() => setPaginaAtiva('financeiro')}>
                    <div className="cartao-conteudo">
                        <p className="cartao-titulo">Total Recebido (mês)</p>
                        <p className="cartao-valor">R$ 58.400</p>
                    </div>
                    <div className="cartao-icone fundo-sucesso">
                        <IconeTendencia className="icone-sucesso-escuro" />
                    </div>
                </div>

                <div className="cartao-dashboard interativo" onClick={() => setPaginaAtiva('inquilinos')}>
                    <div className="cartao-conteudo">
                        <p className="cartao-titulo">Aluguéis Pendentes</p>
                        <p className="cartao-valor">R$ 8.200</p>
                    </div>
                    <div className="cartao-icone fundo-aviso">
                        <IconeRelogio className="icone-aviso" />
                    </div>
                </div>

                <div className="cartao-dashboard interativo" onClick={() => setPaginaAtiva('inquilinos')}>
                    <div className="cartao-conteudo">
                        <p className="cartao-titulo">Inquilinos Ativos</p>
                        <p className="cartao-valor">{activeTenants}</p>
                    </div>
                    <div className="cartao-icone fundo-info">
                        <IconeUsuarios className="icone-info" />
                    </div>
                </div>
            </div>

            <div className="cartao-dashboard-acoes">
                <h3 className="acoes-titulo">Próximas Ações</h3>
                <div className="lista-acoes">
                    {proximasAcoes.map(acao => (
                        <div key={acao.id} className={`item-acao interativo fundo-${acao.tipo}-claro`} onClick={() => setPaginaAtiva(acao.destino)}>
                            <div className="acao-info">
                                <acao.icone className={`icone icone-${acao.tipo}`} />
                                <div>
                                    <p className="acao-titulo-item">{acao.titulo}</p>
                                    <p className="acao-detalhe-item">{acao.detalhe}</p>
                                </div>
                            </div>
                            <span className={`aviso-status fundo-${acao.tipo}`}>{acao.status}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
