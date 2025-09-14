import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Imoveis.css";
import {
    IconeMais, IconeCasa, IconeUsuarios, IconeRelogio,
    IconeDownload, IconeOlho, IconeSetaEsquerda, IconeFechar, IconeFerramenta, IconeEditar, IconeLixeira
} from "../../components/Icons";
import api from "../../services/Api";
import { toast } from 'react-toastify';

const Modal = ({ aberto, fechar, titulo, children }) => {
    if (!aberto) return null;
    return (
        <div className="fundo-modal" onClick={fechar}>
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
    const isEditMode = !!imovelParaEditar;

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

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        try {
            if (isEditMode) {
                const response = await api.put(`/property/update/${imovelParaEditar.id}`, formData);
                toast.success(response.data.message || 'Imóvel atualizado com sucesso!');
                onImovelAtualizado(response.data.property);
            } else {
                const response = await api.post('/property/register', formData);
                toast.success(response.data.message || 'Imóvel cadastrado com sucesso!');
                onImovelAdicionado(response.data.property);
            }
            fechar();
        } catch (error) {
            const mensagemErro = error.response?.data?.message || "Ocorreu um erro.";
            setErro(mensagemErro);
            toast.error(mensagemErro);
        }
    };

    return (
        <form className="formulario-modal" onSubmit={handleSubmit}>
            <div className="campo-grupo"><label htmlFor="house_street">Rua / Avenida</label><input type="text" id="house_street" value={formData.house_street} onChange={handleChange} required /></div>
            <div className="campos-divididos">
                <div className="campo-grupo"><label htmlFor="house_number">Número</label><input type="text" id="house_number" value={formData.house_number} onChange={handleChange} required /></div>
                <div className="campo-grupo"><label htmlFor="house_complement">Complemento</label><input type="text" id="house_complement" value={formData.house_complement} onChange={handleChange} /></div>
            </div>
            <div className="campo-grupo"><label htmlFor="house_neighborhood">Bairro</label><input type="text" id="house_neighborhood" value={formData.house_neighborhood} onChange={handleChange} required /></div>
            <div className="campos-divididos">
                <div className="campo-grupo"><label htmlFor="city">Cidade</label><input type="text" id="city" value={formData.city} onChange={handleChange} required /></div>
                <div className="campo-grupo"><label htmlFor="postal_code">CEP</label><input type="text" id="postal_code" value={formData.postal_code} onChange={handleChange} required /></div>
            </div>
            {erro && <p className="mensagem-erro">{erro}</p>}
            <div className="modal-rodape">
                <button type="button" className="botao botao-contorno" onClick={fechar}>Cancelar</button>
                <button type="submit" className="botao botao-principal">{isEditMode ? 'Salvar Alterações' : 'Salvar Imóvel'}</button>
            </div>
        </form>
    );
};

function ListaDeImoveis({ imoveis, carregando, onAbrirModal }) {
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
                            <h3 className="imovel-nome">{`${imovel.house_street}, ${imovel.house_number}`}</h3>
                            <p className="imovel-endereco">{`${imovel.house_neighborhood} - ${imovel.city}`}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="placeholder-conteudo"><h3>Nenhum Imóvel Cadastrado</h3><p>Clique em "Adicionar Imóvel" para começar.</p></div>
            )}
        </div>
    );
}

function DetalhesDoImovel({ imovelId, onEditar, onImovelAtualizado, onExcluir }) {
    const [imovel, setImovel] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [abaAtiva, setAbaAtiva] = useState("contrato");
    const [concordo, setConcordo] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!imovelId) return;
        setCarregando(true);
        api.get(`/property/property/${imovelId}`)
            .then(response => setImovel(response.data))
            .catch(error => console.error("Erro ao buscar detalhes:", error))
            .finally(() => setCarregando(false));
    }, [imovelId, onImovelAtualizado]);

    const handleDelete = async () => {
        const confirmar = window.confirm("Você tem certeza que deseja excluir este imóvel? Esta ação não pode ser desfeita.");
        if (confirmar) {
            try {
                const response = await api.delete(`/property/delete/${imovelId}`);
                toast.success(response.data.message || "Imóvel excluído com sucesso!");
                onExcluir(imovelId);
                navigate('/dashboard/imoveis');
            } catch (error) {
                toast.error(error.response?.data?.message || "Erro ao excluir imóvel.");
            }
        }
    };

    if (carregando) return <p>Carregando detalhes...</p>;
    if (!imovel) return <p>Não foi possível carregar os detalhes do imóvel.</p>;

    const renderizarConteudoAba = () => {
        const dadosContratoEstatico = { inquilino: "Aguardando Contrato", valorAtual: "A ser definido" };
        switch (abaAtiva) {
            case "historico": return <PlaceholderEmBreve titulo="Histórico de Pagamentos" mensagem="Esta funcionalidade será implementada em breve." />;
            case "reajustes": return <PlaceholderEmBreve titulo="Histórico de Reajustes" mensagem="Esta funcionalidade será implementada em breve." />;
            case "contrato":
            default:
                return (
                    <div className="contrato-layout">
                        <div className="texto-contrato cartao">
                            <h3>Contrato de Locação Residencial</h3>
                            <h4>DO IMÓVEL</h4>
                            <p>O imóvel objeto deste contrato é sito à <strong>{imovel.house_street}, {imovel.house_number} {imovel.house_complement || ''}</strong>, no bairro {imovel.house_neighborhood}, cidade de {imovel.city}, CEP {imovel.postal_code}.</p>
                        </div>
                        <aside className="resumo-contrato-container">
                            <div className="cartao">
                                <h3>Resumo do Contrato</h3>
                                {/* DIV ADICIONADA AQUI PARA O ESPAÇAMENTO DO CSS FUNCIONAR */}
                                <div className="resumo-contrato-itens-container">
                                    <div className="resumo-contrato-item"><IconeUsuarios className="icone" /><div><h4>Inquilino</h4><p>{dadosContratoEstatico.inquilino}</p></div></div>
                                    <div className="resumo-contrato-item"><IconeRelogio className="icone" /><div><h4>Valor do Aluguel</h4><p>{dadosContratoEstatico.valorAtual}</p></div></div>
                                </div>
                                <div className="assinatura-digital">
                                    <div className="assinatura-checkbox"><input type="checkbox" id="concordo" checked={concordo} onChange={() => setConcordo(!concordo)} /><label htmlFor="concordo">Li e concordo com todos os termos.</label></div>
                                    <button className={`botao botao-principal botao-cheio ${!concordo ? "botao-desabilitado" : ""}`} disabled={!concordo}>Assinar Digitalmente</button>
                                </div>
                            </div>
                        </aside>
                    </div>
                );
        }
    };

    return (
        <div>
            <div className="detalhes-cabecalho">
                <h1 className="pagina-titulo">{`${imovel.house_street}, ${imovel.house_number}`}</h1>
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
            <div>{renderizarConteudoAba()}</div>
        </div>
    );
}

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