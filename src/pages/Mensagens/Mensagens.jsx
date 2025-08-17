import React, { useState, useEffect } from "react";
import "./Mensagens.css";
import { IconeEnviar } from "../../components/Icons";

const apiSimulada = {
  buscarConversas: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            nome: "João Silva",
            preview: "Olá! Sobre o aluguel...",
            mensagens: [
              {
                id: 1,
                texto: "Olá! Sobre o aluguel, está tudo certo para este mês.",
                tipo: "recebida",
              },
              {
                id: 2,
                texto: "Oi João, tudo certo. Recebemos o pagamento. Obrigado!",
                tipo: "enviada",
              },
            ],
          },
          {
            id: 2,
            nome: "Maria Santos",
            preview: "Preciso de um reparo no chuveiro.",
            mensagens: [
              {
                id: 1,
                texto: "Bom dia, preciso de um reparo no chuveiro.",
                tipo: "recebida",
              },
            ],
          },
        ]);
      }, 500);
    }),
};

export default function Mensagens() {
  const [conversas, setConversas] = useState([]);
  const [conversaAtiva, setConversaAtiva] = useState(null);
  const [carregando, setCarregando] = useState(true);
  useEffect(() => {
    apiSimulada.buscarConversas().then((dados) => {
      setConversas(dados);
      setCarregando(false);
    });
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {" "}
      <div className="pagina-cabecalho">
        {" "}
        <h1 className="pagina-titulo">Mensagens</h1>{" "}
      </div>{" "}
      {carregando ? (
        <p>Carregando conversas...</p>
      ) : (
        <div className="mensagens-layout">
          {" "}
          <aside className="lista-conversas">
            {" "}
            {conversas.map((conversa) => (
              <div
                key={conversa.id}
                onClick={() => setConversaAtiva(conversa)}
                className={`item-conversa ${
                  conversaAtiva?.id === conversa.id ? "ativo" : ""
                }`}
              >
                {" "}
                <div className="conversa-avatar">
                  {conversa.nome.charAt(0)}
                </div>{" "}
                <div className="conversa-info">
                  {" "}
                  <p className="conversa-nome">{conversa.nome}</p>{" "}
                  <p className="conversa-preview">{conversa.preview}</p>{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </aside>{" "}
          <section className="janela-chat">
            {" "}
            {conversaAtiva ? (
              <>
                {" "}
                <header className="chat-cabecalho">
                  {conversaAtiva.nome}
                </header>{" "}
                <div className="area-mensagens">
                  {" "}
                  {conversaAtiva.mensagens.map((msg) => (
                    <div key={msg.id} className={`bolha-mensagem ${msg.tipo}`}>
                      {" "}
                      {msg.texto}{" "}
                    </div>
                  ))}{" "}
                </div>{" "}
                <div className="area-enviar-mensagem">
                  {" "}
                  <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                  />{" "}
                  <button className="botao botao-principal">
                    {" "}
                    <IconeEnviar
                      className="icone-branco"
                      style={{ width: "1.2rem", height: "1.2rem" }}
                    />{" "}
                  </button>{" "}
                </div>{" "}
              </>
            ) : (
              <div className="chat-vazio">
                {" "}
                <p>Selecione uma conversa para começar</p>{" "}
              </div>
            )}{" "}
          </section>{" "}
        </div>
      )}{" "}
    </div>
  );
}
