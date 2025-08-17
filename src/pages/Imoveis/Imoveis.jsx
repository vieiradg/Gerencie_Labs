import React, { useState, useEffect } from "react";
import "./Imoveis.css";
import {
  IconeMais,
  IconeCasa,
  IconeUsuarios,
  IconeRelogio,
  IconeCheck,
  IconeDownload,
  IconeOlho,
  IconeSetaEsquerda,
} from "../../components/Icons";

const apiSimulada = {
  buscarImoveis: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            nome: "Apartamento Centro",
            endereco: "Rua das Flores, 123 - Apto 205",
            status: "Alugado",
          },
          {
            id: 2,
            nome: "Casa de Praia",
            endereco: "Avenida Beira Mar, 500",
            status: "Disponível",
          },
          {
            id: 3,
            nome: "Kitnet Estudante",
            endereco: "Rua das Universidades, 78",
            status: "Alugado",
          },
        ]);
      }, 500);
    }),
  buscarDetalhesContrato: (imovelId) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          inquilino: "João Silva",
          proprietario: "Maria Oliveira Costa",
          inicioContrato: "15/01/2024",
          fimContrato: "15/01/2025",
          valorAtual: "R$ 1.850,50",
          diaVencimento: "Todo dia 25",
          historicoPagamentos: [
            {
              mes: "Janeiro 2025",
              valor: "R$ 1.850,50",
              vencimento: "25/01/2025",
              status: "Pendente",
              pagoEm: "-",
            },
            {
              mes: "Dezembro 2024",
              valor: "R$ 1.850,50",
              vencimento: "25/12/2024",
              status: "Pago",
              pagoEm: "23/12/2024",
            },
          ],
          historicoReajustes: [
            {
              data: "01/11/2024",
              valorAnterior: "R$ 1.780,00",
              valorNovo: "R$ 1.850,50",
              percentual: "+3.96%",
              indice: "IGP-M",
              motivo: "Reajuste anual por índice",
            },
            {
              data: "15/01/2024",
              valorAnterior: "R$ 0,00",
              valorNovo: "R$ 1.780,00",
              percentual: "-",
              indice: "-",
              motivo: "Valor inicial do contrato",
            },
          ],
        });
      }, 500);
    }),
};

function ListaDeImoveis({ onImovelClick }) {
  const [imoveis, setImoveis] = useState([]);
  const [carregando, setCarregando] = useState(true);
  useEffect(() => {
    apiSimulada.buscarImoveis().then((dados) => {
      setImoveis(dados);
      setCarregando(false);
    });
  }, []);

  return (
    <div>
      <div className="pagina-cabecalho">
        <h1 className="pagina-titulo">Meus Imóveis</h1>
        <button className="botao botao-principal botao-adicionar">
          <IconeMais
            className="icone-branco"
            style={{ width: "1.2rem", height: "1.2rem" }}
          />
          <span>Adicionar Imóvel</span>
        </button>
      </div>
      {carregando ? (
        <p>Carregando imóveis...</p>
      ) : (
        <div className="grid-cartoes">
          {imoveis.map((imovel) => (
            <div
              key={imovel.id}
              className="cartao-imovel"
              onClick={() => onImovelClick(imovel)}
            >
              <h3 className="imovel-nome">{imovel.nome}</h3>
              <p className="imovel-endereco">{imovel.endereco}</p>
              <span
                className={`imovel-status ${
                  imovel.status === "Alugado"
                    ? "status-alugado"
                    : "status-disponivel"
                }`}
              >
                {imovel.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DetalhesDoImovel({ imovel, onVoltar }) {
  const [abaAtiva, setAbaAtiva] = useState("contrato");
  const [detalhes, setDetalhes] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [concordo, setConcordo] = useState(false);

  useEffect(() => {
    setCarregando(true);
    apiSimulada.buscarDetalhesContrato(imovel.id).then((dados) => {
      setDetalhes(dados);
      setCarregando(false);
    });
  }, [imovel.id]);

  const renderizarConteudoAba = () => {
    if (carregando) return <p>Carregando detalhes...</p>;
    if (!detalhes) return <p>Não foi possível carregar os detalhes.</p>;

    switch (abaAtiva) {
      case "historico":
        return (
          <div className="tabela-container">
            {" "}
            <h3
              className="pagina-titulo"
              style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}
            >
              Histórico de Pagamentos
            </h3>{" "}
            <table className="tabela">
              <thead>
                <tr>
                  <th>Mês</th>
                  <th>Valor</th>
                  <th>Vencimento</th>
                  <th>Status</th>
                  <th>Pago em</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {detalhes.historicoPagamentos.map((pag, i) => (
                  <tr key={i}>
                    <td>{pag.mes}</td>
                    <td>{pag.valor}</td>
                    <td>{pag.vencimento}</td>
                    <td>
                      <span
                        className={`status-pagamento ${
                          pag.status === "Pago"
                            ? "status-em-dia"
                            : "status-atrasado"
                        }`}
                      >
                        {pag.status}
                      </span>
                    </td>
                    <td>{pag.pagoEm}</td>
                    <td>
                      <div style={{ display: "flex", gap: "1rem" }}>
                        <IconeDownload className="icone" />
                        <IconeOlho className="icone" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "reajustes":
        return (
          <div className="tabela-container">
            {" "}
            <h3
              className="pagina-titulo"
              style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}
            >
              Histórico de Reajustes
            </h3>{" "}
            <table className="tabela">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Valor Anterior</th>
                  <th>Valor Novo</th>
                  <th>Percentual</th>
                  <th>Índice</th>
                  <th>Motivo</th>
                </tr>
              </thead>
              <tbody>
                {detalhes.historicoReajustes.map((item, i) => (
                  <tr key={i}>
                    <td>{item.data}</td>
                    <td>{item.valorAnterior}</td>
                    <td
                      style={{
                        fontWeight: 600,
                        color: "var(--cor-texto-escuro)",
                      }}
                    >
                      {item.valorNovo}
                    </td>
                    <td>
                      <span className="status-pagamento status-em-dia">
                        {item.percentual}
                      </span>
                    </td>
                    <td>{item.indice}</td>
                    <td>{item.motivo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "contrato":
      default:
        return (
          <div className="contrato-layout">
            <div className="texto-contrato">
              <h3>Contrato de Locação Residencial</h3>
              <h4>DO ALUGUEL E FORMA DE PAGAMENTO</h4>
              <p>
                O valor mensal do aluguel é de R$ 1.850,50..., que deverá ser
                pago até o dia 25 de cada mês.
              </p>
              <h4>DOS REAJUSTES</h4>
              <p>
                O aluguel será reajustado anualmente pela variação do IGP-M...
              </p>
              <h4>DAS OBRIGAÇÕES DO LOCATÁRIO</h4>
              <p>
                a) Pagar pontualmente o aluguel;
                <br />
                b) Usar o imóvel para a finalidade contratada;
              </p>
            </div>
            <aside className="resumo-contrato-container">
              <div className="cartao">
                <h3 style={{ marginBottom: "1.5rem" }}>Resumo do Contrato</h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  <div className="resumo-contrato-item">
                    <IconeCasa className="icone" />
                    <div>
                      <h4>Imóvel</h4>
                      <p>{imovel.endereco}</p>
                    </div>
                  </div>
                  <div className="resumo-contrato-item">
                    <IconeUsuarios className="icone" />
                    <div>
                      <h4>Inquilino</h4>
                      <p>{detalhes.inquilino}</p>
                    </div>
                  </div>
                  <div className="resumo-contrato-item">
                    <IconeRelogio className="icone" />
                    <div>
                      <h4>Valor do Aluguel</h4>
                      <p>{detalhes.valorAtual}</p>
                    </div>
                  </div>
                </div>
                <div className="assinatura-digital">
                  <div className="assinatura-checkbox">
                    <input
                      type="checkbox"
                      id="concordo"
                      checked={concordo}
                      onChange={() => setConcordo(!concordo)}
                    />
                    <label htmlFor="concordo">
                      Li e concordo com todos os termos.
                    </label>
                  </div>
                  <button
                    className={`botao botao-principal botao-cheio ${
                      !concordo ? "botao-desabilitado" : ""
                    }`}
                    disabled={!concordo}
                  >
                    Assinar Digitalmente
                  </button>
                </div>
              </div>
            </aside>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="pagina-cabecalho">
        {" "}
        <button
          onClick={onVoltar}
          className="botao botao-contorno"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          {" "}
          <IconeSetaEsquerda style={{ width: "1rem", height: "1rem" }} /> Voltar
          para Meus Imóveis{" "}
        </button>{" "}
      </div>
      <div className="abas-navegacao">
        {" "}
        <button
          onClick={() => setAbaAtiva("contrato")}
          className={`aba-item ${abaAtiva === "contrato" ? "ativo" : ""}`}
        >
          Contrato
        </button>{" "}
        <button
          onClick={() => setAbaAtiva("historico")}
          className={`aba-item ${abaAtiva === "historico" ? "ativo" : ""}`}
        >
          Histórico
        </button>{" "}
        <button
          onClick={() => setAbaAtiva("reajustes")}
          className={`aba-item ${abaAtiva === "reajustes" ? "ativo" : ""}`}
        >
          Reajustes
        </button>{" "}
      </div>
      <div>{renderizarConteudoAba()}</div>
    </div>
  );
}

export default function Imoveis({ onImovelClick, imovelProp, onVoltar }) {
  if (imovelProp) {
    return <DetalhesDoImovel imovel={imovelProp} onVoltar={onVoltar} />;
  }
  return <ListaDeImoveis onImovelClick={onImovelClick} />;
}
