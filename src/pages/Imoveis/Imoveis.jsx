import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Imoveis.css";
import {
    IconeMais, IconeUsuarios, IconeRelogio,
    IconeSetaEsquerda, IconeFechar, IconeFerramenta, IconeEditar, IconeLixeira
} from "../../components/Icons";
import api from "../../services/Api";
import { toast } from 'react-toastify';

const formatCurrency = (value) => {
    const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[R$\.\,]/g, '').replace(',', '.')) : value;
    if (isNaN(numericValue) || numericValue === null) return 'N/A';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numericValue);
};

const STATUS_TRANSLATION = {
    'paid': 'Pago',
    'pending': 'Pendente',
    'overdue': 'Atrasado',
    'default': 'Desconhecido',
    'partial': 'Parcial'
};

const translateStatus = (status) => {
    if (!status) return STATUS_TRANSLATION.default;
    return STATUS_TRANSLATION[status.toLowerCase()] || STATUS_TRANSLATION.default;
};

const formatDate = (dateString, options = { day: '2-digit', month: '2-digit', year: 'numeric' }) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString.includes('T') ? dateString : `${dateString}T00:00:00`);
    
    if (isNaN(date.getTime())) return 'N/A';
    
    return date.toLocaleDateString('pt-BR', options);
};

const getScoreClass = (score) => {
    if (!score) return '';
    const s = score.toLowerCase().replace(' ', '-');
    if (s.includes('excelente')) return 'status-excelente';
    if (s.includes('bom') || s.includes('razoavel')) return 'status-razoavel';
    return 'status-preocupante';
};

const Modal = ({ aberto, fechar, titulo, children }) => {
    if (!aberto) return null;
    return (
        <div className="fundo-modal">
            <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
                <div className="modal-cabecalho">
                    <h2 className="modal-titulo">{titulo}</h2>
                    <button onClick={fechar} className="botao-fechar-modal"><IconeFechar className="icone" /></button>
                </div>
                {children}
            </div>
        </div>
    );
};

const PlaceholderEmBreve = ({ titulo, mensagem }) => {
    return (
        <div className="placeholder-conteudo">
            <IconeFerramenta className="icone" />
            <h3>{titulo}</h3>
            <p>{mensagem}</p>
        </div>
    );
};

const FormularioImovel = ({ fechar, onImovelAdicionado, imovelParaEditar, onImovelAtualizado }) => {
    const [formData, setFormData] = useState({
        house_street: '', house_number: '', house_complement: '',
        house_neighborhood: '', city: '', postal_code: ''
    });
    const [erro, setErro] = useState('');
    const [buscandoCep, setBuscandoCep] = useState(false);
    const isEditMode = !!imovelParaEditar;
    
    const cepNaoEncontrado = !formData.house_street;
    const disableFields = !isEditMode && !cepNaoEncontrado;

    useEffect(() => {
        if (isEditMode && imovelParaEditar) {
            setFormData({
                house_street: imovelParaEditar.house_street || '',
                house_number: imovelParaEditar.house_number || '',
                house_complement: imovelParaEditar.house_complement || '',
                house_neighborhood: imovelParaEditar.house_neighborhood || '',
                city: imovelParaEditar.city || '',
                postal_code: imovelParaEditar.postal_code || ''
            });
        } else {
            setFormData({
                house_street: '', house_number: '', house_complement: '',
                house_neighborhood: '', city: '', postal_code: ''
            });
        }
    }, [imovelParaEditar, isEditMode]);

    const buscarCep = useCallback(async (cepLimpo) => {
        setBuscandoCep(true);
        setErro('');
        
        if (!/^\d{8}$/.test(cepLimpo)) {
            setBuscandoCep(false);
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            
            if (!response.ok) {
                toast.error("Erro no formato do CEP. Verifique se tem 8 dígitos.");
                return;
            }

            const data = await response.json();

            if (data.erro) {
                toast.error("CEP não encontrado na base de dados.");
                setFormData(prev => ({
                    ...prev,
                    house_street: '',
                    house_neighborhood: '',
                    city: '',
                }));
                return;
            }

            toast.success(`Endereço encontrado: ${data.logradouro}, ${data.bairro}`);

            setFormData(prev => ({
                ...prev,
                house_street: data.logradouro || '',
                house_neighborhood: data.bairro || '',
                city: data.localidade || '',
            }));

        } catch (error) {
            toast.error("Erro ao buscar CEP. Tente novamente.");
        } finally {
            setBuscandoCep(false);
        }
    }, []);

    const handleChange = useCallback((e) => {
        const { id, value } = e.target;
        
        let finalValue = value;
        if (id === 'postal_code' || id === 'house_number') {
            finalValue = value.replace(/\D/g, ''); 
        }

        setFormData(prev => ({ ...prev, [id]: finalValue }));
        if (erro) setErro('');

        if (id === 'postal_code') {
            if (finalValue.length === 8) {
                buscarCep(finalValue);
            }
        }
    }, [erro, buscarCep]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setErro('');

        const { house_street, house_number, house_complement, house_neighborhood, city, postal_code } = formData;
        
        const requiredFields = ['house_street', 'house_number', 'house_neighborhood', 'city', 'postal_code'];
        const isFormIncomplete = requiredFields.some(field => !formData[field]);

        if (isFormIncomplete) {
            setErro("Todos os campos obrigatórios precisam ser preenchidos.");
            toast.warn("Verifique os campos obrigatórios.");
            return;
        }
        
        const autoHouseName = `${house_street.toUpperCase()}, ${house_number}`;
        
        const payload = {
            ...formData,
            house_name: autoHouseName,
        };

        try {
            if (isEditMode) {
                const response = await api.put(`/property/update/${imovelParaEditar.id}`, payload);
                toast.success(response.data.message || 'Imóvel atualizado com sucesso!');
                onImovelAtualizado(response.data.property);
            } else {
                const response = await api.post('/property/register', payload);
                toast.success(response.data.message || 'Imóvel cadastrado com sucesso!');
                onImovelAdicionado(response.data.property);
            }
            fechar();
        } catch (error) {
            const mensagemErro = error.response?.data?.message || "Ocorreu um erro.";
            setErro(mensagemErro);
            toast.error(mensagemErro);
        }
    }, [formData, isEditMode, imovelParaEditar, fechar, onImovelAdicionado, onImovelAtualizado]);

    return (
        <form className="formulario-modal" onSubmit={handleSubmit}>
            {erro && <p className="mensagem-erro">{erro}</p>}
            
            {/* 1. CEP - LINHA ÚNICA */}
            <div className="campo-grupo">
                <label htmlFor="postal_code">CEP</label>
                <input type="text" id="postal_code" value={formData.postal_code} onChange={handleChange} maxLength={8} required disabled={buscandoCep} />
            </div>

            {/* 2. RUA / AVENIDA - LINHA ÚNICA */}
            <div className="campo-grupo">
                <label htmlFor="house_street">Rua / Avenida {buscandoCep && "(Buscando...)"}</label>
                <input type="text" id="house_street" value={formData.house_street} onChange={handleChange} required disabled={disableFields} />
            </div>
            
            {/* 3. NÚMERO - LINHA ÚNICA (Removido do 'campos-divididos') */}
            <div className="campo-grupo">
                <label htmlFor="house_number">Número</label>
                <input type="text" id="house_number" value={formData.house_number} onChange={handleChange} required />
            </div>
            
            {/* 4. COMPLEMENTO - LINHA ÚNICA (Removido do 'campos-divididos') */}
            <div className="campo-grupo">
                <label htmlFor="house_complement">Complemento</label>
                <input type="text" id="house_complement" value={formData.house_complement} onChange={handleChange} />
            </div>
            
            {/* 5. BAIRRO - LINHA ÚNICA */}
            <div className="campo-grupo">
                <label htmlFor="house_neighborhood">Bairro</label>
                <input type="text" id="house_neighborhood" value={formData.house_neighborhood} onChange={handleChange} required disabled={disableFields} />
            </div>
            
            {/* 6. CIDADE - LINHA ÚNICA */}
            <div className="campo-grupo">
                <label htmlFor="city">Cidade</label>
                <input type="text" id="city" value={formData.city} onChange={handleChange} required disabled={disableFields} />
            </div>

            <div className="modal-rodape">
                <button type="button" className="botao botao-contorno" onClick={fechar} disabled={buscandoCep}>Cancelar</button>
                <button type="submit" className="botao botao-principal" disabled={buscandoCep}>{isEditMode ? 'Salvar Alterações' : 'Salvar Imóvel'}</button>
            </div>
        </form>
    );
};

const ListaDeImoveis = ({ imoveis, carregando, onAbrirModal }) => {
    const navigate = useNavigate();
    if (carregando) return <p>Carregando imóveis...</p>;

    return (
        <div>
            <div className="pagina-cabecalho">
                <h1 className="pagina-titulo">Meus Imóveis</h1>
                <button onClick={onAbrirModal} className="botao botao-principal botao-adicionar"><IconeMais className="icone-branco" /><span>Adicionar Imóvel</span></button>
            </div>
            {imoveis && imoveis.length > 0 ? (
                <div className="grid-cartoes-imoveis">
                    {imoveis.map((imovel) => (
                        <div key={imovel.id} className="cartao-imovel" onClick={() => navigate(`/dashboard/imoveis/${imovel.id}`)}>
                            <h3 className="imovel-nome">{imovel.house_name ? imovel.house_name : `${imovel.house_street}, ${imovel.house_number}`}</h3>
                            <p className="imovel-endereco">{`${imovel.house_neighborhood} - ${imovel.city}`}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="placeholder-conteudo"><h3>Nenhum Imóvel Cadastrado</h3><p>Clique em "Adicionar Imóvel" para começar.</p></div>
            )}
        </div>
    );
};

const ReajustesTabContent = ({ propertyId }) => {
    const [currentRent, setCurrentRent] = useState('');
    const [lastAdjustmentDate, setLastAdjustmentDate] = useState('');
    const [contractDetails, setContractDetails] = useState('');
    const [suggestion, setSuggestion] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSuggest = useCallback(async () => {
        if (!currentRent || !lastAdjustmentDate) {
            toast.warn("Por favor, preencha o valor atual e a data do último reajuste.");
            return;
        }

        setLoading(true);
        setSuggestion(null);

        try {
            const response = await api.post(`/property/${propertyId}/suggest_adjustment`, {
                current_rent: currentRent, 
                last_adjustment_date: lastAdjustmentDate,
                contract_details: contractDetails,
            });

            setSuggestion(response.data.suggestion);
            toast.success("Sugestão de reajuste gerada pela IA!");
        } catch (error) {
            const message = error.response?.data?.message || "Erro ao gerar sugestão. Verifique o Back-end.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, [propertyId, currentRent, lastAdjustmentDate, contractDetails]);

    return (
        <div className="tab-container reajuste-tab cartao">
            <h2>Calculadora de Reajuste Inteligente</h2>
            <p style={{marginBottom: '1.5rem'}}>Use a inteligência artificial para sugerir um novo valor de aluguel e gerar a notificação.</p>
            
            <div className="form-grid">
                <div className="campo-grupo">
                    <label>Valor Atual do Aluguel (R$)</label>
                    <input 
                        type="number" 
                        value={currentRent} 
                        onChange={(e) => setCurrentRent(e.target.value)} 
                        placeholder="Ex: 1500.00"
                        min="0"
                    />
                </div>

                <div className="campo-grupo">
                    <label>Data do Último Reajuste (ou Início)</label>
                    <input 
                        type="date" 
                        value={lastAdjustmentDate} 
                        onChange={(e) => setLastAdjustmentDate(e.target.value)} 
                    />
                </div>
            </div>
            
            <div className="campo-grupo">
                <label>Detalhes Adicionais do Contrato (Opcional)</label>
                <textarea 
                    value={contractDetails} 
                    onChange={(e) => setContractDetails(e.target.value)} 
                    placeholder="Ex: O contrato estipula o IGP-M como índice. O inquilino é pontual."
                    rows="3"
                />
            </div>

            <div style={{ marginTop: '1.5rem' }}> 
                <button 
                    onClick={handleSuggest} 
                    className="botao botao-principal"
                    disabled={loading || !currentRent || !lastAdjustmentDate}
                >
                    {loading ? 'Gerando Sugestão...' : 'Gerar Sugestão de Reajuste'}
                </button>
            </div>

            {suggestion && (
                <div className="suggestion-result" style={{ marginTop: '2rem' }}>
                    <h3>✅ Resultado da Análise de Mercado:</h3>
                    <p><strong>Índice Base Utilizado:</strong> {suggestion.base_index}</p>
                    <p><strong>Valor Sugerido:</strong> <span className="valor-sugerido">{formatCurrency(suggestion.suggested_rent_value)}</span></p>
                    <p><strong>Justificativa:</strong> {suggestion.justification}</p>
                    
                    <h4 style={{marginTop: '1.5rem'}}>Notificação de Reajuste:</h4>
                    <pre className="notification-text-box">{suggestion.notification_text}</pre>
                    <button className='botao botao-contorno' style={{ marginTop: '1rem' }} onClick={() => navigator.clipboard.writeText(suggestion.notification_text)}>Copiar Notificação</button>
                </div>
            )}
        </div>
    );
};

const HistoricoTabContent = ({ propertyId }) => {
    const [loading, setLoading] = useState(true);
    const [analysis, setAnalysis] = useState(null);
    const [payments, setPayments] = useState([]);
    
    useEffect(() => {
        const fetchAnalysis = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/payment/${propertyId}/payment_analysis`);
                
                if (response.data.payments && response.data.payments.length > 0) {
                    setAnalysis(response.data.analysis);
                    setPayments(response.data.payments);
                    toast.success("Análise de pagamentos gerada!");
                } else {
                    setPayments([]); 
                    setAnalysis(null);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Erro ao carregar histórico ou gerar análise.");
            } finally {
                setLoading(false);
            }
        };

        if (propertyId) {
            fetchAnalysis();
        } else {
             setLoading(false);
        }
    }, [propertyId]);


    if (loading) {
        return <p>Carregando histórico e gerando análise...</p>;
    }

    if (payments.length === 0) {
        return <div className="placeholder-conteudo"><h3>Histórico de Pagamentos</h3><p>Nenhum histórico de pagamento encontrado.</p></div>;
    }
    
    return (
        <div className="tab-container historico-tab">
            {analysis && (
                <div className={`analysis-card cartao ${getScoreClass(analysis.summary_score)}`}>
                    <h3>
                        <IconeUsuarios style={{width: '1.2rem', height: '1.2rem', marginRight: '0.5rem'}}/> 
                        Resumo de Pontualidade
                    </h3>
                    
                    <p>
                        <strong style={{marginRight: '0.5rem'}}>Pontuação:</strong> 
                        <span className="score-badge">{analysis.summary_score}</span>
                    </p>
                    <p style={{marginTop: '1rem'}}>
                        <strong>Análise Detalhada:</strong> {analysis.analysis_text}
                    </p>
                    <p>
                        <strong>Ação Sugerida:</strong> <em style={{fontWeight: 'normal'}}>{analysis.suggestion}</em>
                    </p>
                </div>
            )}

            <div className="cartao" style={{ marginTop: '2rem' }}>
                <h3>Histórico Detalhado dos Pagamentos</h3>
                <table className="tabela">
                    <thead>
                        <tr>
                            <th>Pagamento</th> 
                            <th>Vencimento</th>
                            <th>Valor</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(p => (
                            <tr key={p.id}>
                                <td>{formatDate(p.payment_date, { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                                <td>{formatDate(p.due_date, { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                                <td>{formatCurrency(p.amount_paid || p.new_amount)}</td> 
                                <td className={`status-cell status-${p.status.toLowerCase().replace(' ', '-')}`}>
                                    {translateStatus(p.status)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- Aba: Geração de Contratos (Gemini) ---
const ContratoTabContent = ({ propertyId, imovelData, contractId }) => {
    const [contractText, setContractText] = useState("");
    const [loading, setLoading] = useState(false);
    const [gerado, setGerado] = useState(false);
    const [contratoData, setContratoData] = useState(null); // Dados do contrato completo

    const carregarDadosContrato = useCallback(async () => {
        // CORREÇÃO 1: Deve buscar o contrato pelo propertyId (o que acontece em DetalhesDoImovel)
        // Se a busca falhar (404 no DetalhesDoImovel), contractId será null, e não tentaremos a busca aqui.
        if (!propertyId) return; 
        try {
            // Chamada para o Back-end que busca o contrato ATIVO pelo propertyId
            const response = await api.get(`/contract/property/${propertyId}`); 
            setContratoData(response.data);
            
            // Se a busca inicial for bem sucedida, ele usa esses dados.
            
        } catch (error) {
             // Tratamento de erro 404 (sem contrato)
            setContratoData(null); 
            console.warn("Nenhum contrato ativo encontrado para este imóvel.");
        }
    }, [propertyId]);

    useEffect(() => {
        // Chama a busca assim que o propertyId estiver disponível.
        // O DetalhesDoImovel já tratou a busca por imovelId, mas a busca por contrato precisa ser feita aqui.
        carregarDadosContrato();
    }, [carregarDadosContrato]);
    
    // Fallback para dados estáticos se o contrato não for carregado
    const dadosContrato = contratoData || { 
        inquilino: "Aguardando Contrato", 
        rent_value: null, 
        due_day: null,
        tenant_id: 'N/A'
    };

    const handleGenerateContract = useCallback(async () => {
        // CORREÇÃO 2: Usa o ID do contrato que acabamos de carregar, não o 'contractId' passado que pode ser null
        if (!dadosContrato.id) {
            toast.warn("Não há dados de contrato carregados para gerar o texto.");
            return;
        }

        setLoading(true);
        setContractText("");

        try {
            // Chamada para o endpoint do Gemini, usando o ID do contrato carregado
            const response = await api.get(`/contract/${dadosContrato.id}/generate_text`);
            
            setContractText(response.data.contract_text);
            setGerado(true);
            toast.success("Contrato legal gerado por IA!");

        } catch (error) {
            const message = error.response?.data?.message || "Erro ao gerar texto do contrato.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, [dadosContrato]);
    
    // Resumo de Contrato Estático (para o lado direito)
    const ResumoContrato = () => (
        <aside className="resumo-contrato-container">
            <div className="cartao">
                <h3>Resumo do Contrato</h3>
                <div className="resumo-contrato-itens-container">
                    <div className="resumo-contrato-item"><IconeUsuarios className="icone" /><div><h4>Inquilino ID</h4><p>{dadosContrato.tenant_id}</p></div></div>
                    <div className="resumo-contrato-item"><IconeRelogio className="icone" /><div><h4>Valor do Aluguel</h4><p>{formatCurrency(dadosContrato.rent_value)}</p></div></div>
                    <div className="resumo-contrato-item"><IconeRelogio className="icone" /><div><h4>Dia de Vencimento</h4><p>{dadosContrato.due_day || 'N/A'}</p></div></div>
                </div>
                <div className="assinatura-digital">
                    <div className="assinatura-checkbox"><input type="checkbox" id="concordo" disabled={!gerado} /><label htmlFor="concordo">Li e concordo com todos os termos.</label></div>
                    <button className={`botao botao-principal botao-cheio ${!gerado ? "botao-desabilitado" : ""}`} disabled={!gerado}>Assinar Digitalmente</button>
                </div>
            </div>
        </aside>
    );

    return (
        <div className="tab-container contrato-tab">
            <div className="contrato-layout">
                {/* Lado Esquerdo: Gerador ou Conteúdo */}
                <div className="texto-contrato cartao" style={{ minHeight: '400px' }}>
                    
                    {gerado ? (
                        <>
                            <h3>Contrato de Locação Residencial Gerado por IA</h3>
                            <pre className="markdown-output" style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                                {contractText}
                            </pre>
                             <button className='botao botao-contorno' style={{ marginTop: '2rem' }} onClick={() => navigator.clipboard.writeText(contractText)}>Copiar Texto Completo</button>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
                            <IconeFerramenta className="icone" style={{ width: '3rem', height: '3rem' }} />
                            <h3>Gerador de Contratos Inteligentes</h3>
                            <p>Clique abaixo para gerar um contrato legal completo baseado nos termos registrados.</p>
                            
                            <button
                                onClick={handleGenerateContract}
                                className="botao botao-principal"
                                disabled={loading || !dadosContrato.id} // 🛑 CORREÇÃO 3: Desabilita se o ID do contrato NÃO estiver carregado
                                style={{ marginTop: '1.5rem' }}
                            >
                                {loading ? 'Gerando Documento...' : 'Gerar Contrato'}
                            </button>
                        </div>
                    )}
                </div>
                
                {/* Lado Direito: Resumo */}
                <ResumoContrato />
            </div>
        </div>
    );
};


// =========================================================
// COMPONENTE DETALHES DO IMÓVEL (CONTAINER PRINCIPAL DAS ABAS)
// =========================================================

const DetalhesDoImovel = ({ imovelId, onEditar, onImovelAtualizado, onExcluir }) => {
    const [imovel, setImovel] = useState(null);
    const [contrato, setContrato] = useState(null); 
    const [carregando, setCarregando] = useState(true);
    const [abaAtiva, setAbaAtiva] = useState("contrato");
    const [concordo, setConcordo] = useState(false);
    const navigate = useNavigate();

    const carregarDetalhes = useCallback(async () => {
        if (!imovelId) return;
        setCarregando(true);
        try {
            // 1. Busca os detalhes do Imóvel
            const imovelResponse = await api.get(`/property/property/${imovelId}`);
            const imovelData = imovelResponse.data;
            setImovel(imovelData);
            
            // 2. Busca o Contrato associado (ENDPOINT DE BUSCA POR PROPERTY ID)
            try {
                // Esta chamada busca o contrato ATIVO pelo ID do imóvel
                const contratoResponse = await api.get(`/contract/property/${imovelId}`); 
                setContrato(contratoResponse.data);
            } catch (error) {
                // Se o Back-end retornar 404 (sem contrato ativo), setContrato fica null
                setContrato(null);
            }

        } catch (error) {
            console.error("Erro ao buscar detalhes do imóvel:", error);
        } finally {
            setCarregando(false);
        }
    }, [imovelId, onImovelAtualizado]);

    useEffect(() => {
        carregarDetalhes();
    }, [carregarDetalhes]);

    const handleDelete = useCallback(async () => {
        const confirmar = window.confirm("Você tem certeza que deseja excluir este imóvel? Esta ação não pode ser desfeita.");
        if (confirmar) {
            try {
                const response = await api.delete(`/property/delete/${imovelId}`);
                toast.success("Imóvel excluído com sucesso!");
                onExcluir(imovelId);
                navigate('/dashboard/imoveis');
            } catch (error) {
                toast.error(error.response?.data?.message || "Erro ao excluir imóvel.");
            }
        }
    }, [imovelId, onExcluir, navigate]);

    if (carregando) return <p>Carregando detalhes...</p>;
    if (!imovel) return <p>Não foi possível carregar os detalhes do imóvel.</p>;
    
    // Passa o ID do contrato se existir, caso contrário, passa o ID do imóvel (embora o contrato seja nulo)
    const contractId = contrato ? contrato.id : null; 
    
    const renderizarConteudoAba = () => {
        switch (abaAtiva) {
            case "historico": 
                // A aba Histórico só funciona se houver um contrato ID
                return <HistoricoTabContent propertyId={imovel.id} contractId={contractId} />;
            case "reajustes": 
                return <ReajustesTabContent propertyId={imovel.id} />;
            case "contrato":
            default:
                // Passa o imovelData e o ID do contrato para a aba Contrato
                return <ContratoTabContent propertyId={imovel.id} imovelData={imovel} contractId={contractId} />;
        }
    };

    return (
        <div>
            <div className="detalhes-cabecalho">
                <h1 className="pagina-titulo">{imovel.house_name ? imovel.house_name : `${imovel.house_street}, ${imovel.house_number}`}</h1>
                <div className="botoes-acao">
                    <button onClick={() => onEditar(imovel)} className="botao botao-principal"><IconeEditar /><span>Editar</span></button>
                    <button onClick={handleDelete} className="botao botao-perigo"><IconeLixeira /><span>Excluir</span></button>
                    <button onClick={() => navigate('/dashboard/imoveis')} className="botao botao-contorno botao-voltar"><IconeSetaEsquerda /><span>Voltar</span></button>
                </div>
            </div>
            <div className="abas-navegacao">
                <button onClick={() => setAbaAtiva("contrato")} className={`aba-item ${abaAtiva === "contrato" ? "ativo" : ""}`}>Contrato</button>
                <button onClick={() => setAbaAtiva("historico")} className={`aba-item ${abaAtiva === "historico" ? "ativo" : ""}`}>Histórico</button>
                <button onClick={() => setAbaAtiva("reajustes")} className={`aba-item ${abaAtiva === "reajustes" ? "ativo" : ""}`}>Reajustes</button>
            </div>
            <div className="abas-conteudo">{renderizarConteudoAba()}</div>
        </div>
    );
};

// =========================================================
// COMPONENTE PRINCIPAL (ROTEADOR)
// =========================================================

export default function Imoveis() {
    const { imovelId } = useParams();
    const [modalAberto, setModalAberto] = useState(false);
    const [imoveis, setImoveis] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [imovelEmEdicao, setImovelEmEdicao] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        if (!imovelId) {
            setCarregando(true);
            api.get('/property/properties')
                .then(response => setImoveis(response.data))
                .catch(error => console.error("Erro ao buscar imóveis:", error))
                .finally(() => setCarregando(false));
        }
    }, [imovelId, refreshKey]);

    const handleImovelAdicionado = (imovelAdicionado) => {
        setImoveis(listaAntiga => [...listaAntiga, imovelAdicionado]);
    };

    const handleImovelAtualizado = (imovelAtualizado) => {
        setImoveis(listaAntiga => listaAntiga.map(item =>
            item.id === imovelAtualizado.id ? imovelAtualizado : item
        ));
        setRefreshKey(oldKey => oldKey + 1);
    };

    const handleImovelExcluido = (idImovelExcluido) => {
        setImoveis(listaAntiga => listaAntiga.filter(item => item.id !== parseInt(idImovelExcluido)));
    };

    const handleAbrirModalCriacao = () => {
        setImovelEmEdicao(null);
        setModalAberto(true);
    };

    const handleAbrirModalEdicao = (imovel) => {
        setImovelEmEdicao(imovel);
        setModalAberto(true);
    };

    const handleFecharModal = () => {
        setModalAberto(false);
        setImovelEmEdicao(null);
    };

    return (
        <div>
            <Modal
                aberto={modalAberto}
                fechar={handleFecharModal}
                titulo={imovelEmEdicao ? "Editar Imóvel" : "Adicionar Novo Imóvel"}
            >
                <FormularioImovel
                    fechar={handleFecharModal}
                    onImovelAdicionado={handleImovelAdicionado}
                    imovelParaEditar={imovelEmEdicao}
                    onImovelAtualizado={handleImovelAtualizado}
                />
            </Modal>

            {imovelId ?
                <DetalhesDoImovel
                    imovelId={imovelId}
                    onEditar={handleAbrirModalEdicao}
                    onImovelAtualizado={refreshKey}
                    onExcluir={handleImovelExcluido}
                /> :
                <ListaDeImoveis
                    imoveis={imoveis}
                    carregando={carregando}
                    onAbrirModal={handleAbrirModalCriacao}
                />
            }
        </div>
    );
}