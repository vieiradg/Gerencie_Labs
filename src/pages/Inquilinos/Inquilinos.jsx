import React, { useState, useEffect, useCallback } from "react";
import "./Inquilinos.css";
import { IconeMais, IconeFechar, IconeEditar, IconeLixeira } from "../../components/Icons";
import { toast } from "react-toastify"
import api from "../../services/Api";
import { z } from "zod";

const Modal = ({ aberto, fechar, titulo, children }) => {
    if (!aberto) return null;
    return (
        <div className="fundo-modal">
            <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
                <div className="modal-cabecalho">
                    <h2 className="modal-titulo">{titulo}</h2>
                    <button onClick={fechar} className="botao-fechar-modal">
                        <IconeFechar className="icone" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

const formatarCpf = (valor = '') => String(valor).replace(/\D/g, '').slice(0, 11).replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
const formatarTelefone = (valor = '') => String(valor).replace(/\D/g, '').slice(0, 11).replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');

const FormularioInquilino = ({ inquilino, fechar, onTenantAction, imoveis }) => {
    const isEditMode = !!inquilino;
    const [name, setName] = useState(inquilino?.name || "");
    const [phoneNumber, setPhoneNumber] = useState(formatarTelefone(inquilino?.phone_number));
    const [cpf, setCpf] = useState(formatarCpf(inquilino?.cpf));
    const [imovelId, setImovelId] = useState(inquilino?.property_id || "");
    const [erro, setErro] = useState({});

    const tenantSchema = z.object({
        name: z.string().min(1, "Nome é obrigatório").regex(/^\S+\s+\S+/, "Nome precisa ser completo (Nome e Sobrenome)"),
        cpf: z.string().length(14, "CPF incompleto").refine(value => !/^(\d)\1{10}$/.test(value.replace(/\D/g, '')), { message: "CPF inválido" }),
        phoneNumber: z.string().min(14, "Telefone incompleto"),
    });

    const handleCpfChange = (e) => {
        const rawCpf = e.target.value.replace(/\D/g, '');
        setCpf(formatarCpf(rawCpf));
        if (erro.cpf) setErro(prev => ({ ...prev, cpf: undefined }));
    };

    const handlePhoneChange = (e) => {
        const rawPhone = e.target.value.replace(/\D/g, '');
        setPhoneNumber(formatarTelefone(rawPhone));
        if (erro.phoneNumber) setErro(prev => ({ ...prev, phoneNumber: undefined }));
    };

    const tenantSubmit = useCallback(async (tenantData) => {
        try {
            let response;
            const finalData = { 
                name: tenantData.name, 
                cpf: tenantData.cpf.replace(/\D/g, ''),
                phone_number: tenantData.phoneNumber.replace(/\D/g, ''),
                property_id: imovelId || null,
            };

            if (isEditMode) {
                response = await api.put(`/tenant/update/${inquilino.id}`, finalData); 
                toast.success("Inquilino atualizado com sucesso!");
            } else {
                response = await api.post("/tenant/register", finalData);
                toast.success("Inquilino registrado com sucesso!");
            }
            onTenantAction(response.data.tenant, isEditMode);
            fechar();

        } catch (error) {
            const mensagem = error.response?.data?.message || "Erro desconhecido";
            setErro({ api: mensagem });
            toast.error(mensagem);
        }
    }, [inquilino, isEditMode, fechar, onTenantAction, imovelId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErro({});

        const formData = { name, phoneNumber, cpf };
        const result = tenantSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErro(fieldErrors);
            toast.warn("Por favor, corrija os erros no formulário.");
            return;
        }

        tenantSubmit(formData);
    };

    return (
        <form className="formulario-modal" onSubmit={handleSubmit}>
            {erro.api && <p className="mensagem-erro">{erro.api}</p>}

            <div className="campo-grupo">
                <label htmlFor="nome">Nome do Inquilino</label>
                <input
                    type="text"
                    id="nome"
                    value={name}
                    onChange={(e) => { setName(e.target.value); if(erro.name) setErro(prev => ({...prev, name: undefined})); }}
                    required
                />
                {erro.name && <p className="mensagem-erro">{erro.name}</p>}
            </div>

            <div className="campo-grupo">
                <label htmlFor="imovel">Imóvel Alugado</label>
                <select
                    id="imovel"
                    value={imovelId}
                    onChange={(e) => setImovelId(e.target.value)}
                >
                    <option value="">-- Nenhum Imóvel (Desocupado) --</option>
                    {imoveis.map(imovel => (
                        <option key={imovel.id} value={imovel.id}>
                            {imovel.house_name} 
                        </option>
                    ))}
                </select>
            </div>

            <div className="campo-grupo">
                <label htmlFor="telefone">Telefone</label>
                <input
                    type="text"
                    id="telefone"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    maxLength={15}
                    required
                />
                {erro.phoneNumber && <p className="mensagem-erro">{erro.phoneNumber}</p>}
            </div>

            <div className="campo-grupo">
                <label htmlFor="cpf">CPF</label>
                <input
                    type="text"
                    id="cpf"
                    value={cpf}
                    onChange={handleCpfChange}
                    maxLength={14}
                    required
                />
                {erro.cpf && <p className="mensagem-erro">{erro.cpf}</p>}
            </div>

            <div className="modal-rodape">
                <button type="button" className="botao botao-contorno" onClick={fechar}>Cancelar</button>
                <button type="submit" className="botao botao-principal">{isEditMode ? "Salvar Alterações" : "Salvar"}</button>
            </div>
        </form>
    );
};


export default function Inquilinos() {
    const [inquilinos, setInquilinos] = useState([]);
    const [imoveis, setImoveis] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [carregandoImoveis, setCarregandoImoveis] = useState(true);
    const [modalAberto, setModalAberto] = useState(false);
    const [inquilinoSelecionado, setInquilinoSelecionado] = useState(null);
    const [erro, setErro] = useState("");
    
    const token = localStorage.getItem("token"); 

    const carregarImoveis = useCallback(async () => {
        setCarregandoImoveis(true);
        try {
            const resposta = await api.get("/property/properties");
            setImoveis(resposta.data);
        } catch (error) {
            toast.error("Erro ao carregar lista de imóveis.");
        } finally {
            setCarregandoImoveis(false);
        }
    }, []);

    const carregarInquilinos = useCallback(async () => {
        setCarregando(true);
        try {
            const resposta = await api.get("/tenant/tenants_panel"); 
            
            setInquilinos(resposta.data.tenants);
        } catch (error) {
            const mensagem = error.response?.data?.error || "Erro desconhecido ao carregar painel";
            setErro(mensagem);
            toast.error(mensagem);
        } finally {
            setCarregando(false);
        }
    }, [token]);

    useEffect(() => {
        carregarInquilinos();
        carregarImoveis();
    }, [carregarInquilinos, carregarImoveis]);

    const handleTenantAction = (tenant, isEdit) => {
        if (isEdit) {
            setInquilinos(prev => prev.map(t => t.id === tenant.id ? tenant : t));
        } else {
            setInquilinos(prev => [...prev, tenant]);
        }
        setModalAberto(false);
        setInquilinoSelecionado(null);
        carregarInquilinos();
    };

    const abrirModalParaNovo = () => {
        setInquilinoSelecionado(null);
        setModalAberto(true);
    };

    const abrirModalParaEditar = (inquilino) => {
        setInquilinoSelecionado(inquilino);
        setModalAberto(true);
    };

    const handleModalClose = () => {
        setModalAberto(false);
        setInquilinoSelecionado(null);
    };

    const handleDelete = async (inquilinoId) => {
        const confirmar = window.confirm("Tem certeza que deseja excluir este inquilino?");
        if (confirmar) {
            try {
                await api.delete(`/tenant/delete/${inquilinoId}`);
                toast.success("Inquilino excluído com sucesso!");
                setInquilinos(prev => prev.filter(t => t.id !== inquilinoId));
            } catch (error) {
                toast.error(error.response?.data?.message || "Erro ao excluir inquilino.");
            }
        }
    };

    const isCarregandoTudo = carregando || carregandoImoveis;

    return (
        <div>
            <Modal
                aberto={modalAberto}
                fechar={handleModalClose}
                titulo={inquilinoSelecionado ? "Editar Inquilino" : "Adicionar Novo Inquilino"}
            >
                <FormularioInquilino
                    inquilino={inquilinoSelecionado}
                    fechar={handleModalClose}
                    onTenantAction={handleTenantAction}
                    imoveis={imoveis}
                />
            </Modal>

            <div className="pagina-cabecalho">
                <h1 className="pagina-titulo">Inquilinos</h1>
                <button onClick={abrirModalParaNovo} className="botao botao-principal botao-adicionar" disabled={isCarregandoTudo}>
                    <IconeMais className="icone-branco" style={{ width: "1.2rem", height: "1.2rem" }} />
                    <span>Adicionar Inquilino</span>
                </button>
            </div>

            {isCarregandoTudo ? (
                <p>Carregando dados...</p>
            ) : (
                <div className="tabela-container">
                    <table className="tabela">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>CPF</th>
                                <th>Imóvel</th>
                                <th>Status do Pagamento</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquilinos.map((inquilino) => (
                                <tr key={inquilino.id} onClick={() => abrirModalParaEditar(inquilino)} title="Clique para editar ou ver detalhes">
                                    <td>{inquilino.name}</td>
                                    <td>{formatarTelefone(inquilino.phone_number)}</td>
                                    <td>{formatarCpf(inquilino.cpf)}</td>
                                    <td>{inquilino.property_name || "N/A"}</td>
                                    <td>
                                        <span className={`status-pagamento ${inquilino.status === "Em dia" ? "status-em-dia" : "status-atrasado"}`}>
                                            {inquilino.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="botao botao-pequeno" onClick={(e) => { e.stopPropagation(); abrirModalParaEditar(inquilino); }}>
                                            <IconeEditar style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
                                        </button>
                                        <button className="botao botao-pequeno botao-perigo" onClick={(e) => { e.stopPropagation(); handleDelete(inquilino.id); }}>
                                            <IconeLixeira style={{ width: '1rem', height: '1rem' }} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            {erro && <p className="mensagem-erro">{erro}</p>}
        </div>
    );
}