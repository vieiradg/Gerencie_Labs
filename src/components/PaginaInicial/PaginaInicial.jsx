import React, { useState } from 'react';
import './PaginaInicial.css';
import { 
    IconeCasa, IconeUsuarios, IconeMensagem, IconeTendencia, IconeEscudo, 
    IconeRelogio, IconeCheck, IconeEstrela, IconeMenu, IconeFechar, IconeSetaDireita, 
    IconeGrafico, IconeSino, IconeDocumento 
} from '../../assets/Icones';

export default function PaginaInicial() {
    const [menuAberto, setMenuAberto] = useState(false);

    const funcionalidades = [
        { icone: IconeGrafico, titulo: "Dashboard Completo", descricao: "Visualize toda a saúde financeira dos seus aluguéis em um só lugar" },
        { icone: IconeUsuarios, titulo: "Gestão de Inquilinos", descricao: "Controle completo sobre contratos, pagamentos e comunicação" },
        { icone: IconeSino, titulo: "Alertas Inteligentes", descricao: "Receba notificações sobre vencimentos, atrasos e ações necessárias" },
        { icone: IconeMensagem, titulo: "Comunicação Direta", descricao: "Chat integrado para se comunicar facilmente com seus inquilinos" },
        { icone: IconeDocumento, titulo: "Documentos Digitais", descricao: "Armazene e gerencie todos os documentos de forma segura na nuvem" },
        { icone: IconeEscudo, titulo: "Segurança Total", descricao: "Seus dados protegidos com criptografia de ponta a ponta" },
    ];

    const depoimentos = [
        { nome: "Maria Santos", cargo: "Proprietária de 8 imóveis", texto: "O Gerencie revolucionou como administro meus aluguéis. Economizo 5 horas por semana!", estrelas: 5 },
        { nome: "João Silva", cargo: "Investidor Imobiliário", texto: "Finalmente posso acompanhar todos os meus investimentos em tempo real. Recomendo!", estrelas: 5 },
        { nome: "Ana Costa", cargo: "Proprietária de 3 imóveis", texto: "A comunicação com os inquilinos ficou muito mais fácil. App indispensável!", estrelas: 5 },
    ];

    const estatisticas = [
        { numero: "10k+", rotulo: "Proprietários ativos" },
        { numero: "50k+", rotulo: "Imóveis gerenciados" },
        { numero: "R$ 2B+", rotulo: "Em aluguéis processados" },
        { numero: "99.9%", rotulo: "Uptime garantido" },
    ];

    const planosPreco = [
      {
        nome: "Gratuito por 7 dias",
        preco: "R$ 0",
        descricao: "Perfeito para começar",
        recursos: ["1 imóvel", "Dashboard básico", "Suporte por email"],
        textoBotao: "Começar Grátis",
        popular: false,
        botaoPrimario: false,
      },
      {
        nome: "Profissional",
        preco: "R$ 49",
        descricao: "Para proprietários sérios",
        recursos: ["Até 10 imóveis", "Dashboard completo", "Chat com inquilinos", "Relatórios avançados", "Suporte prioritário"],
        textoBotao: "Começar Teste Grátis",
        popular: true,
        botaoPrimario: true,
      },
      {
        nome: "Empresarial",
        preco: "R$ 149",
        descricao: "Para grandes portfólios",
        recursos: ["Imóveis ilimitados", "lorem", "lorem", "lorem", "lorem"],
        textoBotao: "Falar com Vendas",
        popular: false,
        botaoPrimario: false,
      }
    ];

    return (
        <div className="pagina-inicial">
            {/* nav */}
            <header className="cabecalho">
                <div className="container cabecalho-container">
                    <div className="logo">
                        <div className="logo-icone-fundo">
                            <IconeCasa className="icone-branco" />
                        </div>
                        <span className="logo-nome">Gerencie</span>
                    </div>
                    <nav className="menu-desktop">
                        <a href="#funcionalidades" className="menu-link">Funcionalidades</a>
                        <a href="#precos" className="menu-link">Preços</a>
                        <a href="#depoimentos" className="menu-link">Depoimentos</a>
                        <button className="botao botao-contorno">Entrar</button>
                        <button className="botao botao-principal">Começar Grátis</button>
                    </nav>
                    <div className="menu-mobile-botao">
                        <button onClick={() => setMenuAberto(!menuAberto)}>
                            {menuAberto ? <IconeFechar className="icone" /> : <IconeMenu className="icone" />}
                        </button>
                    </div>
                </div>
                {menuAberto && (
                    <nav className="menu-mobile">
                        <a href="#funcionalidades" className="menu-link-mobile">Funcionalidades</a>
                        <a href="#precos" className="menu-link-mobile">Preços</a>
                        <a href="#depoimentos" className="menu-link-mobile">Depoimentos</a>
                        <div className="menu-mobile-botoes-container">
                            <button className="botao botao-contorno botao-cheio">Entrar</button>
                            <button className="botao botao-principal botao-cheio">Começar Grátis</button>
                        </div>
                    </nav>
                )}
            </header>

            <main>
                {/* 1 section */}
                <section className="secao-apresentacao">
                    <div className="container secao-apresentacao-container">
                        <div className="conteudo-apresentacao">
                            <span className="aviso-novo">✨ Novo: Dashboard com IA integrada</span>
                            <h1 className="titulo-principal">
                                Gerencie seus <span className="texto-discreto">aluguéis</span> com <span className="texto-escuro">inteligência</span>
                            </h1>
                            <p className="subtitulo-principal">
                                A plataforma completa para proprietários que querem maximizar seus rendimentos e minimizar dores de cabeça. Controle total na palma da sua mão.
                            </p>
                            <div className="botoes-apresentacao">
                                <button className="botao botao-principal botao-grande">
                                    Começar Gratuitamente <IconeSetaDireita className="icone-direita" />
                                </button>
                                <button className="botao botao-contorno botao-grande">Ver Demonstração</button>
                            </div>
                            <div className="texto-info-garantia">
                                <IconeCheck className="icone-sucesso" />
                                Teste grátis por 7 dias • Sem cartão de crédito
                            </div>
                        </div>
                        {/* <div className="container-celular-mockup">
                            <div className="celular-mockup">
                                <div className="tela-celular">
                                    <div className="app-cabecalho">
                                        <div className="app-cabecalho-conteudo">
                                            <div>
                                                <h3>Olá, Carlos Silva</h3>
                                                <p>Bem-vindo de volta</p>
                                            </div>
                                            <div className="avatar"></div>
                                        </div>
                                    </div>
                                    <div className="app-corpo">
                                        <div className="cartao-sem-borda">
                                            <div className="cartao-conteudo-linha">
                                                <div>
                                                    <p className="texto-pequeno texto-discreto">Total Recebido</p>
                                                    <p className="texto-grande texto-negrito">R$ 58.400</p>
                                                    <div className="tendencia">
                                                        <IconeTendencia className="icone-pequeno icone-sucesso-escuro" />
                                                        <span className="texto-pequeno texto-sucesso">+12%</span>
                                                    </div>
                                                </div>
                                                <div className="cartao-icone-fundo fundo-sucesso">
                                                    <IconeTendencia className="icone-grande icone-sucesso-escuro" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid-colunas-2">
                                            <div className="cartao-sem-borda">
                                                <div className="cartao-conteudo-centro">
                                                    <IconeRelogio className="icone-grande icone-aviso" />
                                                    <p className="texto-pequeno texto-discreto">Pendente</p>
                                                    <p className="texto-medio texto-negrito">R$ 8.200</p>
                                                </div>
                                            </div>
                                            <div className="cartao-sem-borda">
                                                <div className="cartao-conteudo-centro">
                                                    <IconeUsuarios className="icone-grande icone-info" />
                                                    <p className="texto-pequeno texto-discreto">Inquilinos</p>
                                                    <p className="texto-medio texto-negrito">17</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section>

                {/* 2 section */}
                <section id="estatisticas" className="secao">
                    <div className="container">
                        <div className="grid-estatisticas">
                            {estatisticas.map((item, index) => (
                                <div key={index} className="item-estatistica">
                                    <div className="numero-estatistica">{item.numero}</div>
                                    <div className="rotulo-estatistica">{item.rotulo}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3 section */}
                <section id="funcionalidades" className="secao secao-fundo-claro">
                     <div className="container">
                        <div className="secao-cabecalho">
                            <h2 className="secao-titulo">Tudo que você precisa para gerenciar seus imóveis</h2>
                            <p className="secao-subtitulo">Funcionalidades pensadas especificamente para proprietários que querem profissionalizar a gestão dos seus aluguéis.</p>
                        </div>
                        <div className="grid-funcionalidades">
                            {funcionalidades.map((item, index) => (
                                <div key={index} className="cartao cartao-funcionalidade">
                                    <div className="cartao-icone-fundo fundo-claro">
                                        <item.icone className="icone-grande texto-escuro" />
                                    </div>
                                    <h3 className="titulo-funcionalidade">{item.titulo}</h3>
                                    <p className="texto-discreto">{item.descricao}</p>
                                </div>
                            ))}
                        </div>
                     </div>
                </section>

                {/* 4 section */}
                <section id="depoimentos" className="secao">
                  <div className="container">
                    <div className="secao-cabecalho">
                      <h2 className="secao-titulo">O que nossos clientes dizem</h2>
                      <p className="secao-subtitulo">Mais de 10.000 proprietários já confiam no Gerencie</p>
                    </div>
                    <div className="grid-depoimentos">
                      {depoimentos.map((item, index) => (
                        <div key={index} className="cartao cartao-depoimento">
                          <div className="depoimento-estrelas">
                            {[...Array(item.estrelas)].map((_, i) => (
                              <IconeEstrela key={i} className="icone" />
                            ))}
                          </div>
                          <p className="depoimento-texto">"{item.texto}"</p>
                          <div>
                            <p className="depoimento-autor">{item.nome}</p>
                            <p className="depoimento-cargo">{item.cargo}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 5 section */}
                <section id="precos" className="secao secao-fundo-claro">
                  <div className="container">
                    <div className="secao-cabecalho">
                      <h2 className="secao-titulo">Planos que se adaptam ao seu negócio</h2>
                      <p className="secao-subtitulo">Comece grátis e escale conforme seu portfólio cresce</p>
                    </div>
                    <div className="grid-precos">
                      {planosPreco.map((plano, index) => (
                        <div key={index} className={`cartao cartao-preco ${plano.popular ? 'popular' : ''}`}>
                          {plano.popular && <div className="aviso-popular">Mais Popular</div>}
                          <h3 className="preco-titulo">{plano.nome}</h3>
                          <p className="preco-valor">{plano.preco}<span>/mês</span></p>
                          <p className="preco-descricao">{plano.descricao}</p>
                          <ul className="preco-lista-recursos">
                            {plano.recursos.map((recurso, i) => (
                              <li key={i} className="preco-item-recurso">
                                <IconeCheck className="icone" />
                                <span>{recurso}</span>
                              </li>
                            ))}
                          </ul>
                          <button className={`botao ${plano.botaoPrimario ? 'botao-principal' : 'botao-contorno'} botao-cheio botao-final-cartao`}>
                            {plano.textoBotao}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 6 section */}
                <section className="secao secao-fundo-escuro">
                  <div className="container">
                    <div className="secao-cabecalho">
                      <h2 className="secao-titulo texto-branco">Pronto para revolucionar a gestão dos seus aluguéis?</h2>
                      <p className="secao-subtitulo">Junte-se a milhares de proprietários que já transformaram seus negócios com o Gerencie.</p>
                    </div>
                    <div className="cta-botoes">
                      <button className="botao botao-grande botao-branco">
                        Começar Teste Grátis <IconeSetaDireita className="icone-direita" />
                      </button>
                      <button className="botao botao-grande botao-contorno-branco">Agendar Demonstração</button>
                    </div>
                    <p className="cta-texto-info">7 dias grátis • Sem cartão de crédito • Cancele quando quiser</p>
                  </div>
                </section>
            </main>

            {/* Rodapé */}
            <footer className="rodape">
              <div className="container">
                <div className="rodape-grid">
                  <div className="rodape-logo-area">
                    <div className="logo">
                        <div className="logo-icone-fundo">
                            <IconeCasa className="icone-branco" />
                        </div>
                        <span className="logo-nome">Gerencie</span>
                    </div>
                    <p className="texto-discreto">A plataforma completa para gestão inteligente de aluguéis.</p>
                    <div className="rodape-redes-sociais">
                      <a href="#" className="icone-social">f</a>
                      <a href="#" className="icone-social">t</a>
                      <a href="#" className="icone-social">in</a>
                    </div>
                  </div>
                  <div className="rodape-coluna-links">
                    <h4 className="texto-negrito-pequeno">Produto</h4>
                    <ul className="lista-links">
                      <li><a href="#" className="link-rodape">Funcionalidades</a></li>
                      <li><a href="#" className="link-rodape">Preços</a></li>
                      <li><a href="#" className="link-rodape">Segurança</a></li>
                    </ul>
                  </div>
                   <div className="rodape-coluna-links">
                    <h4 className="texto-negrito-pequeno">Empresa</h4>
                    <ul className="lista-links">
                      <li><a href="#" className="link-rodape">Sobre nós</a></li>
                      <li><a href="#" className="link-rodape">Carreiras</a></li>
                      <li><a href="#" className="link-rodape">Contato</a></li>
                    </ul>
                  </div>
                   <div className="rodape-coluna-links">
                    <h4 className="texto-negrito-pequeno">Suporte</h4>
                    <ul className="lista-links">
                      <li><a href="#" className="link-rodape">Central de Ajuda</a></li>
                      <li><a href="#" className="link-rodape">Documentação</a></li>
                      <li><a href="#" className="link-rodape">Status</a></li>
                    </ul>
                  </div>
                </div>
                <div className="rodape-final">
                  <p className="texto-discreto">© 2024 Gerencie. Todos os direitos reservados.</p>
                  <div className="rodape-links-legais">
                    <a href="#" className="link-rodape">Privacidade</a>
                    <a href="#" className="link-rodape">Termos</a>
                    <a href="#" className="link-rodape">Cookies</a>
                  </div>
                </div>
              </div>
            </footer>
        </div>
    );
}
