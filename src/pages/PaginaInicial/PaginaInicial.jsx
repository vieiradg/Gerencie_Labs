import React, { useState } from 'react';
import './PaginaInicial.css';
import { 
    IconeCasa, IconeUsuarios, IconeMensagem, IconeTendencia, IconeEscudo, 
    IconeRelogio, IconeCheck, IconeEstrela, IconeMenu, IconeFechar, IconeSetaDireita, 
    IconeGrafico, IconeSino, IconeDocumento 
} from '../../components/Icons';

export default function PaginaInicial({ onEntrarClick }) {
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
        nome: "Gratuito",
        preco: "R$ 0",
        descricao: "Perfeito para começar",
        recursos: ["Até 3 imóveis", "Dashboard básico", "Suporte por email"],
        textoBotao: "Começar Grátis",
        popular: false,
        botaoPrimario: false,
      },
      {
        nome: "Profissional",
        preco: "R$ 49",
        descricao: "Para proprietários sérios",
        recursos: ["Até 20 imóveis", "Dashboard completo", "Chat com inquilinos", "Relatórios avançados", "Suporte prioritário"],
        textoBotao: "Começar Teste Grátis",
        popular: true,
        botaoPrimario: true,
      },
      {
        nome: "Empresarial",
        preco: "R$ 149",
        descricao: "Para grandes portfólios",
        recursos: ["Imóveis ilimitados", "API personalizada", "Integrações avançadas", "Gerente de conta", "Suporte 24/7"],
        textoBotao: "Falar com Vendas",
        popular: false,
        botaoPrimario: false,
      }
    ];

    return (
        <div className="pagina-inicial">
            <header className="cabecalho">
                <div className="container cabecalho-container">
                    <div className="logo">
                        <div className="logo-icone-fundo"> <IconeCasa className="icone-branco" /> </div>
                        <span className="logo-nome">gerencie</span>
                    </div>
                    <nav className="menu-desktop">
                        <a href="#funcionalidades" className="menu-link">Funcionalidades</a>
                        <a href="#precos" className="menu-link">Preços</a>
                        <a href="#depoimentos" className="menu-link">Depoimentos</a>
                        <button onClick={onEntrarClick} className="botao botao-contorno">Entrar</button>
                        <button className="botao botao-principal">Começar Grátis</button>
                    </nav>
                    <div className="menu-mobile-botao">
                        <button onClick={() => setMenuAberto(!menuAberto)}> {menuAberto ? <IconeFechar className="icone" /> : <IconeMenu className="icone" />} </button>
                    </div>
                </div>
                {menuAberto && (
                    <nav className="menu-mobile">
                        <a href="#funcionalidades" className="menu-link-mobile">Funcionalidades</a>
                        <a href="#precos" className="menu-link-mobile">Preços</a>
                        <a href="#depoimentos" className="menu-link-mobile">Depoimentos</a>
                        <div className="menu-mobile-botoes-container">
                            <button onClick={onEntrarClick} className="botao botao-contorno botao-cheio">Entrar</button>
                            <button className="botao botao-principal botao-cheio">Começar Grátis</button>
                        </div>
                    </nav>
                )}
            </header>
            <main>
                <section className="secao-apresentacao">
                    <div className="container secao-apresentacao-container">
                        <div className="conteudo-apresentacao">
                            <span className="aviso-novo">✨ Novo: Dashboard com IA integrada</span>
                            <h1 className="titulo-principal"> Gerencie seus <span className="texto-discreto">aluguéis</span> com <span className="texto-escuro">inteligência</span> </h1>
                            <p className="subtitulo-principal"> A plataforma completa para proprietários que querem maximizar seus rendimentos e minimizar dores de cabeça. Controle total na palma da sua mão. </p>
                            <div className="botoes-apresentacao">
                                <button className="botao botao-principal botao-grande"> Começar Gratuitamente <IconeSetaDireita className="icone-direita" /> </button>
                                <button className="botao botao-contorno botao-grande">Ver Demonstração</button>
                            </div>
                            <div className="texto-info-garantia"> <IconeCheck className="icone-sucesso" /> Teste grátis por 14 dias • Sem cartão de crédito </div>
                        </div>
                        <div className="ilustracao-hero">
                            <div className="cartao-hero cartao-hero-1">
                                <div className="cartao-hero-icone fundo-sucesso"> <IconeTendencia className="icone-sucesso-escuro" /> </div>
                                <div> <p className="cartao-hero-titulo">Receita Mensal</p> <p className="cartao-hero-valor">R$ 58.400</p> </div>
                            </div>
                            <div className="cartao-hero cartao-hero-2">
                                <div className="cartao-hero-icone fundo-info"> <IconeUsuarios className="icone-info" /> </div>
                                <div> <p className="cartao-hero-titulo">Inquilinos Ativos</p> <p className="cartao-hero-valor">17</p> </div>
                            </div>
                            <div className="cartao-hero cartao-hero-3">
                                <div className="cartao-hero-icone fundo-aviso"> <IconeDocumento className="icone-aviso" /> </div>
                                <div> <p className="cartao-hero-titulo">Documentos</p> <p className="cartao-hero-valor">3 Pendentes</p> </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="estatisticas" className="secao">
                    <div className="container">
                        <div className="grid-estatisticas">
                            {estatisticas.map((item, index) => ( <div key={index} className="item-estatistica"> <div className="numero-estatistica">{item.numero}</div> <div className="rotulo-estatistica">{item.rotulo}</div> </div> ))}
                        </div>
                    </div>
                </section>
                <section id="funcionalidades" className="secao secao-fundo-claro">
                    <div className="container">
                        <div className="secao-cabecalho">
                            <h2 className="secao-titulo">Tudo que você precisa para gerenciar seus imóveis</h2>
                            <p className="secao-subtitulo">Funcionalidades pensadas especificamente para proprietários que querem profissionalizar a gestão dos seus aluguéis.</p>
                        </div>
                        <div className="grid-funcionalidades">
                            {funcionalidades.map((item, index) => ( <div key={index} className="cartao cartao-funcionalidade"> <div className="cartao-icone-fundo fundo-claro"> <item.icone className="icone-grande texto-escuro" /> </div> <h3 className="titulo-funcionalidade">{item.titulo}</h3> <p className="texto-discreto">{item.descricao}</p> </div> ))}
                        </div>
                    </div>
                </section>
                <section id="depoimentos" className="secao">
                    <div className="container">
                        <div className="secao-cabecalho">
                            <h2 className="secao-titulo">O que nossos clientes dizem</h2>
                            <p className="secao-subtitulo">Mais de 10.000 proprietários já confiam no Gerencie</p>
                        </div>
                        <div className="grid-depoimentos">
                            {depoimentos.map((item, index) => ( <div key={index} className="cartao cartao-depoimento"> <div className="depoimento-estrelas"> {[...Array(item.estrelas)].map((_, i) => ( <IconeEstrela key={i} className="icone" /> ))} </div> <p className="depoimento-texto">"{item.texto}"</p> <div> <p className="depoimento-autor">{item.nome}</p> <p className="depoimento-cargo">{item.cargo}</p> </div> </div> ))}
                        </div>
                    </div>
                </section>
                <section id="precos" className="secao secao-fundo-claro">
                    <div className="container">
                        <div className="secao-cabecalho">
                            <h2 className="secao-titulo">Planos que se adaptam ao seu negócio</h2>
                            <p className="secao-subtitulo">Comece grátis e escale conforme seu portfólio cresce</p>
                        </div>
                        <div className="grid-precos">
                            {planosPreco.map((plano, index) => ( <div key={index} className={`cartao cartao-preco ${plano.popular ? 'popular' : ''}`}> {plano.popular && <div className="aviso-popular">Mais Popular</div>} <h3 className="preco-titulo">{plano.nome}</h3> <p className="preco-valor">{plano.preco}<span>/mês</span></p> <p className="preco-descricao">{plano.descricao}</p> <ul className="preco-lista-recursos"> {plano.recursos.map((recurso, i) => ( <li key={i} className="preco-item-recurso"> <IconeCheck className="icone" /> <span>{recurso}</span> </li> ))} </ul> <button className={`botao ${plano.botaoPrimario ? 'botao-principal' : 'botao-contorno'} botao-cheio botao-final-cartao`}> {plano.textoBotao} </button> </div> ))}
                        </div>
                    </div>
                </section>
                <section className="secao secao-fundo-escuro">
                    <div className="container">
                        <div className="secao-cabecalho">
                            <h2 className="secao-titulo texto-branco">Pronto para revolucionar a gestão dos seus aluguéis?</h2>
                            <p className="secao-subtitulo">Junte-se a milhares de proprietários que já transformaram seus negócios com o Gerencie.</p>
                        </div>
                        <div className="cta-botoes">
                            <button className="botao botao-grande botao-branco"> Começar Teste Grátis <IconeSetaDireita className="icone-direita" /> </button>
                            <button className="botao botao-grande botao-contorno-branco">Agendar Demonstração</button>
                        </div>
                        <p className="cta-texto-info">14 dias grátis • Sem cartão de crédito • Cancele quando quiser</p>
                    </div>
                </section>
            </main>
            <footer className="rodape">
                <div className="container">
                    <div className="rodape-grid">
                        <div className="rodape-logo-area">
                            <div className="logo">
                                <div className="logo-icone-fundo"> <IconeCasa className="icone-branco" /> </div>
                                <span className="logo-nome">gerencie</span>
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
                                <li><a href="#" className="link-rodape">Integrações</a></li>
                            </ul>
                        </div>
                        <div className="rodape-coluna-links">
                            <h4 className="texto-negrito-pequeno">Empresa</h4>
                            <ul className="lista-links">
                                <li><a href="#" className="link-rodape">Sobre nós</a></li>
                                <li><a href="#" className="link-rodape">Blog</a></li>
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
                                <li><a href="#" className="link-rodape">API</a></li>
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
