import React, { useState, useEffect } from "react";
import "./Inquilinos.css";
import { IconeMais, IconeFechar } from "../../components/Icons";
import { toast } from "react-toastify"
import api from "../../services/Api";



const Modal = ({ aberto, fechar, titulo, children }) => {
    if (!aberto) return null;
    return (
        <div className="fundo-modal" onClick={fechar}>
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

const FormularioInquilino = ({ inquilino, fechar }) => {
    const [name, setName] = useState(inquilino?.name || "");
    const [phoneNumber, setPhoneNumber] = useState(inquilino?.phone_number || "");
    const [cpf, setCpf] = useState(inquilino?.cpf || "");
    const [erro, setErro] = useState("");

    const tenantRegister = async (tenantData) => {
        try {
            await api.post("/tenant/register", tenantData);
            toast.success(`Inquilino registrado com sucesso!`);
            fechar();
        } catch (error) {
            setErro(mensagem);
            toast.error(mensagem);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        tenantRegister({
            name,
            phone_number: phoneNumber,
            cpf
        });
    };

    return (
        <form className="formulario-modal" onSubmit={handleSubmit}>
            {erro && <p className="erro">{erro}</p>}

            <div className="campo-grupo">
                <label htmlFor="nome">Nome do Inquilino</label>
                <input
                    type="text"
                    id="nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="campo-grupo">
                <label htmlFor="telefone">Telefone</label>
                <input
                    type="text"
                    id="telefone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>

            <div className="campo-grupo">
                <label htmlFor="cpf">CPF</label>
                <input
                    type="text"
                    id="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />
            </div>

            <div className="modal-rodape">
                <button type="button" className="botao botao-contorno" onClick={fechar}>Cancelar</button>
                <button type="submit" className="botao botao-principal">Salvar</button>
            </div>
        </form>
    );
};


export default function Inquilinos() {
    const [inquilinos, setInquilinos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [modalAberto, setModalAberto] = useState(false);
    const [inquilinoSelecionado, setInquilinoSelecionado] = useState(null);
    const [erro, setErro] = useState("");
    const token = localStorage.getItem("token");


    const carregarInquilinos = async () => {
        try {
            const resposta = await api.get("/dashboard/tenants_panel", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const { tenants } = resposta.data;

            setInquilinos(tenants);
            toast.success("Painel carregado com sucesso!");
        } catch (error) {
            const mensagem = error.response?.data?.error || "Erro desconhecido";
            setErro(mensagem);
            toast.error(mensagem);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarInquilinos();
    }, []);

    const abrirModalParaNovo = () => {
        setInquilinoSelecionado(null);
        setModalAberto(true);
    };

    const abrirModalParaEditar = (inquilino) => {
        setInquilinoSelecionado(inquilino);
        setModalAberto(true);
    };

    return (
        <div>
            <Modal
                aberto={modalAberto}
                fechar={() => setModalAberto(false)}
                titulo={inquilinoSelecionado ? "Editar Inquilino" : "Adicionar Novo Inquilino"}
            >
                <FormularioInquilino
                    inquilino={inquilinoSelecionado}
                    fechar={() => setModalAberto(false)}
                />
            </Modal>

            <div className="pagina-cabecalho">
                <h1 className="pagina-titulo">Inquilinos</h1>
                <button onClick={abrirModalParaNovo} className="botao botao-principal botao-adicionar">
                    <IconeMais className="icone-branco" style={{ width: "1.2rem", height: "1.2rem" }} />
                    <span>Adicionar Inquilino</span>
                </button>
            </div>

            {carregando ? (
                <p>Carregando inquilinos...</p>
            ) : (
                <div className="tabela-container">
                    <table className="tabela">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Imóvel</th>
                                <th>Status do Pagamento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquilinos.map((inquilino) => (
                                <tr key={inquilino.id} onClick={() => abrirModalParaEditar(inquilino)} title="Clique para ver os detalhes">
                                    <td>{inquilino.name}</td>
                                    <td>{inquilino.property_name || "Inquilino não cadastrado a nenhum imóvel"}</td>
                                    <td>
                                        <span className={`status-pagamento ${inquilino.status === "Em dia" ? "status-em-dia" : "status-atrasado"}`}>
                                            {inquilino.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
}
