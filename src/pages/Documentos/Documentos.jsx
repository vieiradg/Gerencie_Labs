import React, { useState, useEffect } from "react";
import "./Documentos.css";
import { IconeMais, IconeDocumento } from "../../components/Icons";
import Modal from "../Modal/Modal";
import api from "../../services/Api";
import { toast } from "react-toastify";

const FormularioContrato = ({ fechar, inquilinos, imoveis }) => {
  const [inquilinoSelecionado, setInquilinoSelecionado] = useState("");
  const [imovelSelecionado, setImovelSelecionado] = useState("");
  const [leasePeriod, setLeasePeriod] = useState("");
  const [rentValue, setRentValue] = useState("");
  const [dueDay, setDueDay] = useState("");
  const [startDate, setStartDate] = useState("");

  const contractRegister = async (contractData) => {
    try {
      await api.post("/contract/register", contractData);
      toast.success(`Contrato registrado com sucesso!`);
      fechar();
    } catch (error) {
      const mensagem = error.response?.data?.error || "Erro ao registrar contrato";
      toast.error(mensagem);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    contractRegister({
      tenant_id: inquilinoSelecionado,
      property_id: imovelSelecionado,
      lease_period: leasePeriod,
      rent_value: rentValue,
      due_day: dueDay,
      start_date: startDate,
    });
  };

  return (
    <form className="formulario-modal" onSubmit={handleSubmit}>
      <div className="campo-grupo">
        <select
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
      </div>

      <div className="campo-grupo">
        <select
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
      </div>

      <div className="campo-grupo">
        <label>Duração do contrato</label>
        <input
          type="number"
          value={leasePeriod}
          onChange={(e) => setLeasePeriod(e.target.value)}
        />
      </div>

      <div className="campo-grupo">
        <label>Valor do aluguel</label>
        <input
          type="number"
          value={rentValue}
          onChange={(e) => setRentValue(e.target.value)}
        />
      </div>

      <div className="campo-grupo">
        <label>Dia de vencimento</label>
        <input
          type="number"
          value={dueDay}
          onChange={(e) => setDueDay(e.target.value)}
        />
      </div>

      <div className="campo-grupo">
        <label>Data de início</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
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

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  const carregarDocumentos = async () => {
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
  };

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
            />
          </Modal>

          {documentos.map((doc, index) => (
            <div key={index} className="item-documento">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
