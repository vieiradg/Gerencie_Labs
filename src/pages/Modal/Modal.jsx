import { IconeFechar } from "../../components/Icons";
import "./Modal.css";

export default function Modal({ aberto, fechar, titulo, children }) {
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
}
