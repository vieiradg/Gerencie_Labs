import React, { useState, useEffect, useCallback } from "react";
import "./Pagamentos.css";
import { IconeCheck, IconeDinheiro } from "../../components/Icons";
import { toast } from "react-toastify";
import api from "../../services/Api";

const STATUS_TRANSLATION = {
    'paid': 'Pago',
    'pending': 'Pendente',
    'overdue': 'Atrasado',
    'partial': 'Parcial'
};

const translateStatus = (status) => {
    if (!status) return 'Desconhecido';
    return STATUS_TRANSLATION[status.toLowerCase()] || 'Desconhecido';
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString.includes('T') ? dateString : `${dateString}T00:00:00`);
    
    if (isNaN(date.getTime())) return 'N/A';
    
    return date.toLocaleDateString('pt-BR');
};

const formatarMoeda = (valor) => {
    if (valor === undefined || valor === null || isNaN(valor)) return 'R$ 0,00';
    return parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const Pagamentos = () => {
    const [parcelas, setParcelas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    const carregarPagamentos = useCallback(async () => {
        setCarregando(true);
        try {
            const response = await api.get("/payment/list"); 
            setParcelas(response.data.payments); 
        } catch (error) {
            const mensagem = error.response?.data?.error || "Erro ao carregar parcelas";
            setErro(mensagem);
            toast.error(mensagem);
        } finally {
            setCarregando(false);
        }
    }, []);

    const handleMarcarPago = async (parcelaId) => {
        const confirmar = window.confirm("Deseja realmente marcar esta parcela como PAGA?");
        if (!confirmar) return;

        try {
            await api.put(`/payment/status/${parcelaId}`, { status: 'paid' }); 
            toast.success("Parcela marcada como paga!");
            carregarPagamentos(); 
        } catch (error) {
            toast.error("Falha ao atualizar o status da parcela.");
        }
    };

    useEffect(() => {
        carregarPagamentos();
    }, [carregarPagamentos]);
    
    const getStatusClass = (status) => {
        if (!status) return 'pending';
        return status.toLowerCase(); 
    };

    return (
        <div>
            <div className="pagina-cabecalho">
                <h1 className="pagina-titulo">Controle de Pagamentos</h1>
            </div>

            {carregando ? (
                <p>Carregando pagamentos...</p>
            ) : (
                <div className="tabela-container">
                    {parcelas.length === 0 ? (
                        <p>Nenhuma parcela pendente ou registrada.</p>
                    ) : (
                        <table className="tabela">
                            <thead>
                                <tr>
                                    <th>Contrato</th>
                                    <th>Imóvel</th>
                                    <th>Vencimento</th>
                                    <th>Valor (R$)</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parcelas.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.contract_id}</td>
                                        <td>{p.property_name || 'N/A'}</td>
                                        
                                        <td>{formatDate(p.due_date)}</td>
                                        
                                        <td>{formatarMoeda(p.amount)}</td>
                                        
                                        <td>
                                            <span className={`status-pagamento status-${getStatusClass(p.status)}`}>
                                                {translateStatus(p.status)}
                                            </span>
                                        </td>
                                        <td>
                                            {p.status !== 'paid' ? (
                                                <button 
                                                    className="botao botao-pequeno botao-principal"
                                                    onClick={() => handleMarcarPago(p.id)}
                                                    title="Marcar como Pago"
                                                >
                                                    <IconeCheck style={{ width: '1rem', height: '1rem' }} />
                                                </button>
                                            ) : (
                                                <IconeDinheiro style={{ width: '1.2rem', height: '1.2rem', color: 'var(--cor-sucesso)' }} title="Parcela Paga" />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
            
            {erro && <p className="mensagem-erro">{erro}</p>}
        </div>
    );
};

export default Pagamentos;