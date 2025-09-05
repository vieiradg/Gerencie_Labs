import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaginaInicial.css';
import { 
    IconeCasa, IconeUsuarios, IconeMensagem, IconeTendencia, IconeEscudo, 
    IconeRelogio, IconeCheck, IconeEstrela, IconeMenu, IconeFechar, IconeSetaDireita, 
    IconeGrafico, IconeSino, IconeDocumento 
} from '../../components/Icons';

export default function PaginaInicial() {
    const [menuAberto, setMenuAberto] = useState(false);
    const navigate = useNavigate();

    const irParaLogin = () => navigate('/login');
    const irParaCriarConta = () => navigate('/login', { state: { view: 'criar' } });

    const funcionalidades = [
        { icone: IconeGrafico, titulo: "Painel Inteligente", descricao: "Descubra em segundos onde está perdendo dinheiro e como aumentar seus lucros." },
        { icone: IconeUsuarios, titulo: "Controle Total de Inquilinos", descricao: "Nunca mais corra atrás de boletos ou contratos. Tudo automatizado." },
        { icone: IconeSino, titulo: "Avisos Automáticos", descricao: "Esqueça o medo de atrasos. Você será avisado antes de qualquer problema acontecer." },
        { icone: IconeMensagem, titulo: "Chat Instantâneo", descricao: "Fale com seus inquilinos sem dor de cabeça e resolva tudo em minutos." },
        { icone: IconeDocumento, titulo: "Contratos na Nuvem", descricao: "Assine, armazene e compartilhe documentos com 100% de segurança e zero papelada." },
        { icone: IconeEscudo, titulo: "Segurança Blindada", descricao: "Seus dados protegidos com tecnologia de nível bancário. Paz de espírito garantida." },
    ];

    const depoimentos = [
        { nome: "Maria Santos", cargo: "Proprietária de 8 imóveis", texto: "Eu vivia estressada com atrasos. Hoje tenho controle total e tempo para minha família.", estrelas: 5, avatarUrl: "/assets/pessoa2.jpg" },
        { nome: "João Silva", cargo: "Investidor Imobiliário", texto: "Antes era um caos. Agora sei exatamente quanto ganho, onde investir e quando agir.", estrelas: 5, avatarUrl: "/assets/pessoa1.jpg" },
        { nome: "Ana Costa", cargo: "Proprietária de 3 imóveis", texto: "Era uma dor de cabeça falar com inquilinos. Hoje é simples, rápido e até prazeroso.", estrelas: 5, avatarUrl: "/assets/pessoa3.jpg" },
    ];

    const estatisticas = [
        { numero: "10k+", rotulo: "Proprietários livres do estresse" },
        { numero: "50k+", rotulo: "Imóveis gerando mais lucro" },
        { numero: "R$ 2B+", rotulo: "Em aluguéis processados com sucesso" },
        { numero: "99.9%", rotulo: "Tranquilidade garantida" },
    ];

    const planosPreco = [
      {
        nome: "Gratuito",
        preco: "R$ 0",
        descricao: "Ideal para sentir na pele a diferença",
        recursos: ["Até 3 imóveis", "Painel básico", "Suporte por email"],
        textoBotao: "Quero Começar Agora",
        popular: false,
        botaoPrimario: false,
      },
      {
        nome: "Profissional",
        preco: "R$ 49",
        descricao: "Perfeito para quem quer liberdade e mais lucro",
        recursos: ["Até 20 imóveis", "Painel completo", "Chat com inquilinos", "Relatórios avançados", "Suporte prioritário"],
        textoBotao: "Ativar 14 dias Grátis",
        popular: true,
        botaoPrimario: true,
      },
      {
        nome: "Empresarial",
        preco: "R$ 149",
        descricao: "Para grandes portfólios sem dor de cabeça",
        recursos: ["Imóveis ilimitados", "API personalizada", "Integrações avançadas", "Gerente de conta", "Suporte 24/7"],
        textoBotao: "Falar com Especialista",
        popular: false,
        botaoPrimario: false,
      }
    ];

    return (
        <div className="pagina-inicial">
            <header className="cabecalho">
                <div className="container cabecalho-container">
                    <a className="logo" href="#apresentacao">
                        <div className="logo-icone-fundo"> <IconeCasa className="icone-branco" /> </div>
                        <span className="logo-nome">Gerencie</span>
                    </a>
                    <nav className="menu-desktop">
                        <a href="#funcionalidades" className="menu-link">Funcionalidades</a>
                        <a href="#precos" className="menu-link">Preços</a>
                        <a href="#depoimentos" className="menu-link">Depoimentos</a>
                        <button onClick={irParaLogin} className="botao botao-contorno">Entrar</button>
                        <button onClick={irParaCriarConta} className="botao botao-principal">Quero Liberdade</button>
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
                            <button onClick={irParaLogin} className="botao botao-contorno botao-cheio">Entrar</button>
                            <button onClick={irParaCriarConta} className="botao botao-principal botao-cheio">Quero Liberdade</button>
                        </div>
                    </nav>
                )}
            </header>
            <main>
                <section id="apresentacao" className="secao-apresentacao">
                    <div className="container secao-apresentacao-container">
                        <div className="conteudo-apresentacao">
                            <span className="aviso-novo">✨ Nova era: IA que coloca mais dinheiro no seu bolso</span>
                            <h1 className="titulo-principal"> Transforme a <span className="texto-discreto">gestão dos seus aluguéis</span> em <span className="texto-escuro">lucro e liberdade</span> </h1>
                            <p className="subtitulo-principal"> Chega de estresse, atrasos e dores de cabeça. O Gerencie cuida do que tira seu sono e devolve sua tranquilidade — enquanto seus rendimentos crescem. </p>
                            <div className="botoes-apresentacao">
                                <button onClick={irParaCriarConta} className="botao botao-principal botao-grande"> Quero Meu Teste Grátis Agora <IconeSetaDireita className="icone-direita" /> </button>
                                <button className="botao botao-contorno botao-grande">Ver Como Funciona</button>
                            </div>
                            <div className="texto-info-garantia"> <IconeCheck className="icone-sucesso" /> Teste grátis por 14 dias • Sem cartão de crédito • Resultados desde a 1ª semana </div>
                        </div>
                        <div className="ilustracao-hero">
                            <img 
                                src="/assets/velho.jpg" 
                                alt="Senhor feliz usando celular, mostrando a facilidade de usar o aplicativo." 
                                className="imagem-hero"
                            />
                        </div>
                    </div>
                </section>
                <section id="estatisticas" className="secao">
                    <div className="container">
                        <div className="grid-estatisticas">
                            {estatisticas.map((item, index) => (<div key={index} className="item-estatistica"> <div className="numero-estatistica">{item.numero}</div> <div className="rotulo-estatistica">{item.rotulo}</div> </div>))}
                        </div>
                    </div>
                </section>
                <section id="funcionalidades" className="secao secao-fundo-claro">
                    <div className="container">
                        <div className="secao-cabecalho">
                            <h2 className="secao-titulo">Pare de perder dinheiro e tempo com seus imóveis</h2>
                            <p className="secao-subtitulo">O Gerencie resolve de uma vez as maiores dores de quem tem imóveis alugados.</p>
                        </div>
                        <div className="grid-funcionalidades">
                            {funcionalidades.map((item, index) => (<div key={index} className="cartao cartao-funcionalidade"> <div className="cartao-icone-fundo fundo-claro"> <item.icone className="icone-grande texto-escuro" /> </div> <h3 className="titulo-funcionalidade">{item.titulo}</h3> <p className="texto-discreto">{item.descricao}</p> </div>))}
                        </div>
                    </div>
                </section>
                <section id="depoimentos" className="secao">
                    <div className="container">
                        <div className="secao-cabecalho">
                            <h2 className="secao-titulo">Histórias reais de transformação</h2>
                            <p className="secao-subtitulo">Donos de imóveis que viviam estressados agora têm paz, lucros e liberdade.</p>
                        </div>
                        <div className="grid-depoimentos">
                            {depoimentos.map((item, index) => (
                                <div key={index} className="cartao cartao-depoimento">
                                     <div className="depoimento-cabecalho">
                                        <img src={item.avatarUrl} alt={`Foto de ${item.nome}`} className="depoimento-avatar" />
                                        <div>
                                            <p className="depoimento-autor">{item.nome}</p>
                                            <p className="depoimento-cargo">{item.cargo}</p>
                                        </div>
                                    </div>
                                    <div className="depoimento-estrelas">
                                        {[...Array(item.estrelas)].map((_, i) => (<IconeEstrela key={i} className="icone" />))}
                                    </div>
                                    <p className="depoimento-texto">"{item.texto}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section id="precos" className="secao secao-fundo-claro">
                    <div className="container">
                        <div className="secao-cabecalho">
                            <h2 className="secao-titulo">Escolha sua liberdade</h2>
                            <p className="secao-subtitulo">Você pode continuar sofrendo com planilhas... ou viver a tranquilidade que milhares já escolheram.</p>
                        </div>
                        <div className="grid-precos">
                            {planosPreco.map((plano, index) => (<div key={index} className={`cartao cartao-preco ${plano.popular ? 'popular' : ''}`}> {plano.popular && <div className="aviso-popular">Mais Escolhido</div>} <h3 className="preco-titulo">{plano.nome}</h3> <p className="preco-valor">{plano.preco}<span>/mês</span></p> <p className="preco-descricao">{plano.descricao}</p> <ul className="preco-lista-recursos"> {plano.recursos.map((recurso, i) => (<li key={i} className="preco-item-recurso"> <IconeCheck className="icone" /> <span>{recurso}</span> </li>))} </ul> <button onClick={plano.textoBotao === "Falar com Especialista" ? null : irParaCriarConta} className={`botao ${plano.botaoPrimario ? 'botao-principal' : 'botao-contorno'} botao-cheio botao-final-cartao`}> {plano.textoBotao} </button> </div>))}
                        </div>
                    </div>
                </section>
                <section className="secao secao-fundo-escuro">
                    <div className="container">
                        <div className="secao-cabecalho">
                            <h2 className="secao-titulo texto-branco">Está pronto para se livrar do estresse e ter mais lucro?</h2>
                            <p className="secao-subtitulo">Milhares de proprietários já transformaram suas finanças e sua paz de espírito. Agora é sua vez.</p>
                        </div>
                        <div className="cta-botoes">
                            <button onClick={irParaCriarConta} className="botao botao-grande botao-branco"> Quero Minha Liberdade Agora <IconeSetaDireita className="icone-direita" /> </button>
                            <button className="botao botao-grande botao-contorno-branco">Conversar com Especialista</button>
                        </div>
                        <p className="cta-texto-info">14 dias grátis • Sem cartão de crédito • Resultados desde a primeira semana</p>
                    </div>
                </section>
            </main>
            <footer className="rodape">
                <div className="container">
                    <div className="rodape-grid">
                        <div className="rodape-logo-area">
                            <div className="logo">
                                <div className="logo-icone-fundo"> <IconeCasa className="icone-branco" /> </div>
                                <span className="logo-nome">Gerencie</span>
                            </div>
                            <p className="texto-discreto">O sistema que liberta você da dor de cabeça da gestão de imóveis.</p>
                            <div className="rodape-redes-sociais">
                                <a href="#" className="icone-social">f</a>
                                <a href="#" className="icone-social">t</a>
                                <a href="#" className="icone-social">in</a>
                            </div>
                        </div>
                        <div className="rodape-coluna-links"> <h4 className="texto-negrito-pequeno">Produto</h4> <ul className="lista-links"> <li><a href="#" className="link-rodape">Funcionalidades</a></li> <li><a href="#" className="link-rodape">Preços</a></li> <li><a href="#" className="link-rodape">Segurança</a></li> <li><a href="#" className="link-rodape">Integrações</a></li> </ul> </div>
                        <div className="rodape-coluna-links"> <h4 className="texto-negrito-pequeno">Empresa</h4> <ul className="lista-links"> <li><a href="#" className="link-rodape">Sobre nós</a></li> <li><a href="#" className="link-rodape">Blog</a></li> <li><a href="#" className="link-rodape">Carreiras</a></li> <li><a href="#" className="link-rodape">Contato</a></li> </ul> </div>
                        <div className="rodape-coluna-links"> <h4 className="texto-negrito-pequeno">Suporte</h4> <ul className="lista-links"> <li><a href="#" className="link-rodape">Central de Ajuda</a></li> <li><a href="#" className="link-rodape">Documentação</a></li> <li><a href="#" className="link-rodape">Status</a></li> <li><a href="#" className="link-rodape">API</a></li> </ul> </div>
                    </div>
                    <div className="rodape-final">
                        <p className="texto-discreto">© 2024 Gerencie. Todos os direitos reservados.</p>
                        <div className="rodape-links-legais"> <a href="#" className="link-rodape">Privacidade</a> <a href="#" className="link-rodape">Termos</a> <a href="#" className="link-rodape">Cookies</a> </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
