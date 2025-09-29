import React, { useState, useEffect, useCallback } from "react";
import "./Documentos.css";
import { IconeMais, IconeDocumento, IconeLixeira, IconeEditar, IconeDinheiro } from "../../components/Icons";
import Modal from "../Modal/Modal";
import api from "../../services/Api";
import { toast } from "react-toastify";
import { z } from "zod";

const formatarMoeda = (value) => {
    if (!value) return '';
    const num = String(value).replace(/\D/g, '');
    const formatted = (num / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return formatted;
};

const FormularioContrato = ({ fechar, inquilinos, imoveis, onContratoRegistrado }) => {
    const [inquilinoSelecionado, setInquilinoSelecionado] = useState("");
    const [imovelSelecionado, setImovelSelecionado] = useState("");
    const [rentValue, setRentValue] = useState("");
    const [dueDay, setDueDay] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [erros, setErros] = useState({});

    const contractSchema = z.object({
        inquilinoSelecionado: z.string().min(1, "Selecione o Inquilino"),
        imovelSelecionado: z.string().min(1, "Selecione o Imóvel"),
        rentValue: z.string().min(1, "Valor do aluguel é obrigatório"),
        dueDay: z.string().regex(/^\d+$/, "Dia deve ser um número entre 1 e 31").refine(val => parseInt(val) >= 1 && parseInt(val) <= 31, "Dia de vencimento deve ser entre 1 e 31"),
        startDate: z.string().min(1, "Data de início é obrigatória"),
        endDate: z.string().min(1, "Data de término é obrigatória"),
    })
    .refine(data => new Date(data.endDate) > new Date(data.startDate), {
        message: "A data de término deve ser posterior à data de início.",
        path: ["endDate"],
    });

    const handleValorAluguelChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        setRentValue(rawValue);
        if (erros.rentValue) setErros(prev => ({ ...prev, rentValue: undefined }));
    };

    const handleNumberChange = (setter, field) => (e) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        setter(rawValue);
        if (erros[field]) setErros(prev => ({ ...prev, [field]: undefined }));
    };

    const contractRegister = useCallback(async (contractData) => {
        try {
            const response = await api.post("/contract/register", contractData);
            toast.success("Contrato registrado com sucesso!");
            onContratoRegistrado(response.data.contract);
            fechar();
        } catch (error) {
            const mensagem = error.response?.data?.error || "Erro ao registrar contrato";
            setErros({ api: mensagem });
            toast.error(mensagem);
        }
    }, [fechar, onContratoRegistrado]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErros({});

        const formData = { inquilinoSelecionado, imovelSelecionado, rentValue, dueDay, startDate, endDate };
        const result = contractSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErros(fieldErrors);
            toast.warn("Por favor, corrija os erros no formulário.");
            return;
        }

        contractRegister({
            tenant_id: parseInt(inquilinoSelecionado),
            property_id: parseInt(imovelSelecionado),
            rent_value: parseFloat(parseInt(rentValue) / 100), 
            due_day: parseInt(dueDay),
            start_date: startDate,
            end_date: endDate,
        });
    };

    return (
        <form className="formulario-modal" onSubmit={handleSubmit}>
            {erros.api && <p className="mensagem-erro">{erros.api}</p>}

            <div className="campo-grupo">
                <label htmlFor="inquilino">Inquilino</label>
                <select
                    id="inquilino"
                    value={inquilinoSelecionado}
                    onChange={(e) => setInquilinoSelecionado(e.target.value)}
                >
                    <option value="">Selecione o inquilino</option>
                    {inquilinos.map((t) => (
                        <option key={t.id} value={t.id}>
                            {t.name}
                        </option>
                    ))}
                </select>
                {erros.inquilinoSelecionado && <p className="mensagem-erro">{erros.inquilinoSelecionado}</p>}
            </div>

            <div className="campo-grupo">
                <label htmlFor="imovel">Imóvel</label>
                <select
                    id="imovel"
                    value={imovelSelecionado}
                    onChange={(e) => setImovelSelecionado(e.target.value)}
                >
                    <option value="">Selecione o imóvel</option>
                    {imoveis.map((p) => (
                        <option key={p.id} value={p.id}>
                             {p.name}
                        </option>
                    ))}
                </select>
                {erros.imovelSelecionado && <p className="mensagem-erro">{erros.imovelSelecionado}</p>}
            </div>

            <div className="campo-grupo">
                <label htmlFor="valor">Valor do aluguel (R$)</label>
                <input
                    type="text"
                    id="valor"
                    placeholder="Ex: 1.500,00"
                    value={formatarMoeda(rentValue)}
                    onChange={handleValorAluguelChange}
                />
                {erros.rentValue && <p className="mensagem-erro">{erros.rentValue}</p>}
            </div>

            <div className="campo-grupo">
                <label htmlFor="vencimento">Dia de vencimento</label>
                <input
                    type="text"
                    id="vencimento"
                    placeholder="Ex: 5"
                    value={dueDay}
                    onChange={handleNumberChange(setDueDay, 'dueDay')}
                    maxLength={2}
                />
                {erros.dueDay && <p className="mensagem-erro">{erros.dueDay}</p>}
            </div>

            <div className="campo-grupo">
                <label htmlFor="inicio">Data de início</label>
                <input
                    type="date"
                    id="inicio"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                {erros.startDate && <p className="mensagem-erro">{erros.startDate}</p>}
            </div>
            
            <div className="campo-grupo">
                <label htmlFor="termino">Data de término</label>
                <input
                    type="date"
                    id="termino"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                {erros.endDate && <p className="mensagem-erro">{erros.endDate}</p>}
            </div>

            <div className="modal-rodape">
                <button type="button" className="botao botao-contorno" onClick={fechar}>
                    Cancelar
                </button>
                <button type="submit" className="botao botao-principal">
                    Salvar
                </button>
            </div>
        </form>
    );
};

export default function Documentos() {
    const [modalAberto, setModalAberto] = useState(false);
    const [carregando, setCarregando] = useState(true);
    const [inquilinos, setInquilinos] = useState([]);
    const [imoveis, setImoveis] = useState([]);
    const [documentos, setDocumentos] = useState([]);

    const handleContratoRegistrado = (novoContrato) => {
        setDocumentos(prev => [...prev, novoContrato]);
    };

    const handleDelete = useCallback(async (contractId) => {
        const confirmar = window.confirm("ATENÇÃO! Excluir este contrato também irá DELETAR TODAS as parcelas de pagamento associadas a ele. Deseja continuar?");
        if (!confirmar) return;

        try {
            await api.delete(`/contract/delete/${contractId}`);
            toast.success("Contrato e parcelas excluídos com sucesso!");
            setDocumentos(prev => prev.filter(doc => doc.id !== contractId));
        } catch (error) {
            toast.error(error.response?.data?.message || "Erro ao excluir contrato.");
        }
    }, []);

    const abrirModal = () => setModalAberto(true);
    const fecharModal = () => setModalAberto(false);

    const carregarDocumentos = useCallback(async () => {
        try {
            const response = await api.get("/dashboard/documents_panel");
            toast.success("Painel carregado com sucesso!");

            setInquilinos(response.data.tenants || []);
            setImoveis(response.data.properties || []);
            setDocumentos(response.data.contracts || []);
        } catch (error) {
            const mensagem = error.response?.data?.error || "Erro desconhecido";
            toast.error(mensagem);
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        carregarDocumentos();
    }, []);

    return (
        <div>
            <div className="pagina-cabecalho">
                <h1 className="pagina-titulo">Documentos</h1>

                <button onClick={abrirModal} className="botao botao-principal botao-adicionar">
                    <IconeMais className="icone-branco" style={{ width: "1.2rem", height: "1.2rem" }} />
                    <span>Gerar Contrato</span>
                </button>
            </div>

            {carregando ? (
                <p>Carregando documentos...</p>
            ) : (
                <div className="lista-documentos">
                    <Modal aberto={modalAberto} fechar={fecharModal} titulo="Novo Contrato">
                        <FormularioContrato
                            fechar={fecharModal}
                            inquilinos={inquilinos}
                            imoveis={imoveis}
                            onContratoRegistrado={handleContratoRegistrado}
                        />
                    </Modal>

                    {documentos.map((doc) => (
                        <div key={doc.id} className="item-documento">
                            <IconeDocumento className="icone documento-icone" />
                            <div className="documento-info">

                                <p className="documento-nome">
                                    {doc.tenant_name}
                                </p>

                                <p className="documento-data">
                                    {doc.property_name}
                                </p>

                                <p className="documento-data">
                                    Iniciado em {new Date(doc.start_date).toLocaleDateString('pt-BR')}
                                </p>
                                

                            </div>
                             <div className="documento-acoes">
                                
                                <button 
                                    className="botao botao-pequeno" 
                                    title="Editar Contrato"
                                >
                                    <IconeEditar style={{ width: '1.2rem', height: '1.2rem', marginRight: '0.25rem' }} />
                                </button>
                                <button 
                                    className="botao botao-pequeno botao-perigo" 
                                    onClick={(e) => { e.stopPropagation(); handleDelete(doc.id); }}
                                    title="Excluir Contrato"
                                >
                                    <IconeLixeira style={{ width: '1.2rem', height: '1.2rem' }} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}