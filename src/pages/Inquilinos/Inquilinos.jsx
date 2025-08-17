import React, { useState, useEffect } from "react";
import "./Inquilinos.css";
import { IconeMais } from "../../components/Icons";

const apiSimulada = {
  buscarInquilinos: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            nome: "João Silva",
            imovel: "Apartamento Centro",
            status: "Em dia",
          },
          {
            nome: "Maria Santos",
            imovel: "Kitnet Estudante",
            status: "Atrasado",
          },
          {
            nome: "Carlos Souza",
            imovel: "Casa Bairro Novo",
            status: "Em dia",
          },
        ]);
      }, 500);
    }),
};

export default function Inquilinos() {
  const [inquilinos, setInquilinos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  useEffect(() => {
    apiSimulada.buscarInquilinos().then((dados) => {
      setInquilinos(dados);
      setCarregando(false);
    });
  }, []);
  return (
    <div>
      {" "}
      <div className="pagina-cabecalho">
        {" "}
        <h1 className="pagina-titulo">Inquilinos</h1>{" "}
        <button className="botao botao-principal botao-adicionar">
          {" "}
          <IconeMais
            className="icone-branco"
            style={{ width: "1.2rem", height: "1.2rem" }}
          />{" "}
          <span>Adicionar Inquilino</span>{" "}
        </button>{" "}
      </div>{" "}
      {carregando ? (
        <p>Carregando inquilinos...</p>
      ) : (
        <div className="tabela-container">
          {" "}
          <table className="tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Imóvel</th>
                <th>Status do Pagamento</th>
              </tr>
            </thead>
            <tbody>
              {inquilinos.map((inquilino, index) => (
                <tr key={index}>
                  {" "}
                  <td>{inquilino.nome}</td> <td>{inquilino.imovel}</td>{" "}
                  <td>
                    {" "}
                    <span
                      className={`status-pagamento ${
                        inquilino.status === "Em dia"
                          ? "status-em-dia"
                          : "status-atrasado"
                      }`}
                    >
                      {" "}
                      {inquilino.status}{" "}
                    </span>{" "}
                  </td>{" "}
                </tr>
              ))}
            </tbody>
          </table>{" "}
        </div>
      )}{" "}
    </div>
  );
}
