import React, { useState, useEffect } from "react";
import "./Documentos.css";
import { IconeMais, IconeDocumento } from "../../components/Icons";

const apiSimulada = {
  buscarDocumentos: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { nome: "Contrato - João Silva.pdf", data: "22/07/2024" },
          { nome: "Vistoria - Apto Centro.pdf", data: "15/07/2024" },
          { nome: "RG Maria Santos.pdf", data: "01/06/2024" },
        ]);
      }, 500);
    }),
};

export default function Documentos() {
  const [documentos, setDocumentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  useEffect(() => {
    apiSimulada.buscarDocumentos().then((dados) => {
      setDocumentos(dados);
      setCarregando(false);
    });
  }, []);
  return (
    <div>
      {" "}
      <div className="pagina-cabecalho">
        {" "}
        <h1 className="pagina-titulo">Documentos</h1>{" "}
        <button className="botao botao-principal botao-adicionar">
          {" "}
          <IconeMais
            className="icone-branco"
            style={{ width: "1.2rem", height: "1.2rem" }}
          />{" "}
          <span>Gerar Contrato</span>{" "}
        </button>{" "}
      </div>{" "}
      {carregando ? (
        <p>Carregando documentos...</p>
      ) : (
        <div className="lista-documentos">
          {" "}
          {documentos.map((doc, index) => (
            <div key={index} className="item-documento">
              {" "}
              <IconeDocumento className="icone documento-icone" />{" "}
              <div className="documento-info">
                {" "}
                <p className="documento-nome">{doc.nome}</p>{" "}
                <p className="documento-data">Enviado em: {doc.data}</p>{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>
      )}{" "}
    </div>
  );
}
