import React, { useState, useEffect } from "react";
import "./Inquilinos.css";
import { IconeMais, IconeFechar } from "../../components/Icons";


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

    const [nome, setNome] = useState(inquilino ? inquilino.nome : '');
    const [imovel, setImovel] = useState(inquilino ? inquilino.imovel : '');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Inquilino ${inquilino ? 'atualizado' : 'salvo'} com sucesso! (Simulação)`);
        fechar();
    };

    return (
        <form className="formulario-modal" onSubmit={handleSubmit}>
            <div className="campo-grupo">
                <label htmlFor="nome">Nome do Inquilino</label>
                <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div className="campo-grupo">
                <label htmlFor="imovel">Imóvel Alugado</label>
                <input type="text" id="imovel" value={imovel} onChange={(e) => setImovel(e.target.value)} required />
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

    useEffect(() => {

        const buscarInquilinos = () => {
            setTimeout(() => {
                setInquilinos([
                    { id: 1, nome: "João Silva", imovel: "Apartamento Centro", status: "Em dia" },
                    { id: 2, nome: "Maria Santos", imovel: "Kitnet Estudante", status: "Atrasado" },
                    { id: 3, nome: "Carlos Souza", imovel: "Casa Bairro Novo", status: "Em dia" },
                ]);
                setCarregando(false);
            }, 500);
        };
        buscarInquilinos();
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
                                    <td>{inquilino.nome}</td>
                                    <td>{inquilino.imovel}</td>
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
