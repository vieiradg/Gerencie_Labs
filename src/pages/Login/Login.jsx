import React, { useState } from 'react';
import './Login.css';
import { IconeCasa, IconeOlho, IconeOlhoFechado } from '../../components/Icons';


const FormularioLogin = ({ onLoginSucesso, setView }) => {
    const [email, setEmail] = useState('admin@gerencie.com');
    const [senha, setSenha] = useState('1234');
    const [lembrar, setLembrar] = useState(false);
    const [erro, setErro] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const handleSubmit = (evento) => {
        evento.preventDefault();
        if (email === 'admin@gerencie.com' && senha === '1234') {
            setErro('');
            console.log(`Lembrar de mim: ${lembrar}`); // Simula o envio da opção "Lembrar de mim"
            onLoginSucesso();
        } else {
            setErro('Email ou senha inválidos.');
        }
    };

    return (
        <>
            <h2 className="login-titulo">Acesse sua conta</h2>
            <form onSubmit={handleSubmit} className="login-formulario">
                <div className="campo-grupo">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="campo-grupo">
                    <label htmlFor="senha">Senha</label>
                    <div className="campo-senha-container">
                        <input type={mostrarSenha ? 'text' : 'password'} id="senha" placeholder="Sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        <button type="button" className="botao-olho" onClick={() => setMostrarSenha(!mostrarSenha)}>
                            {mostrarSenha ? <IconeOlhoFechado className="icone" /> : <IconeOlho className="icone" />}
                        </button>
                    </div>
                </div>
                <div className="login-opcoes">
                    <label className="lembrar-grupo">
                        <input type="checkbox" id="lembrar" checked={lembrar} onChange={(e) => setLembrar(e.target.checked)} />
                        Lembrar de mim
                    </label>
                    <a href="#" onClick={(e) => { e.preventDefault(); setView('recuperar'); }}>Esqueci a senha</a>
                </div>
                {erro && <p className="mensagem-erro">{erro}</p>}
                <button type="submit" className="botao botao-principal botao-cheio">Entrar</button>
            </form>
            <p className="criar-conta-link">
                Não tem uma conta? <a href="#" onClick={(e) => { e.preventDefault(); setView('criar'); }}>Crie agora</a>
            </p>
        </>
    );
};


const FormularioCriarConta = ({ setView }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    
    const [erroNome, setErroNome] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    const [erroConfirmarSenha, setErroConfirmarSenha] = useState('');

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

    const validarEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validarSenha = (senha) => {
        const re = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return re.test(senha);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setErroNome('');
        setErroEmail('');
        setErroSenha('');
        setErroConfirmarSenha('');

        let formValido = true;

        if (!nome.trim()) {
            setErroNome('O nome é obrigatório.');
            formValido = false;
        }

        if (!email) {
            setErroEmail('O email é obrigatório.');
            formValido = false;
        } else if (!validarEmail(email)) {
            setErroEmail('Por favor, insira um email válido.');
            formValido = false;
        }

        if (!senha) {
            setErroSenha('A senha é obrigatória.');
            formValido = false;
        } else if (!validarSenha(senha)) {
            setErroSenha('A senha deve ter no mínimo 8 caracteres, uma letra maiúscula e um número.');
            formValido = false;
        }

        if (!confirmarSenha) {
            setErroConfirmarSenha('A confirmação da senha é obrigatória.');
            formValido = false;
        } else if (senha !== confirmarSenha) {
            setErroConfirmarSenha('As senhas não coincidem.');
            formValido = false;
        }

        if (!formValido) {
            return;
        }

        alert("Conta criada com sucesso! (Simulação)");
        setView('login');
    };

    return (
        <>
            <h2 className="login-titulo">Crie sua conta</h2>
            <form onSubmit={handleSubmit} className="login-formulario" noValidate>
                <div className="campo-grupo">
                    <label htmlFor="nome">Nome completo</label>
                    <input type="text" id="nome" placeholder="Seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
                    {erroNome && <p className="mensagem-erro">{erroNome}</p>}
                </div>
                <div className="campo-grupo">
                    <label htmlFor="email-criar">Email</label>
                    <input type="email" id="email-criar" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {erroEmail && <p className="mensagem-erro">{erroEmail}</p>}
                </div>
                <div className="campo-grupo">
                    <label htmlFor="senha-criar">Senha</label>
                    <div className="campo-senha-container">
                        <input type={mostrarSenha ? 'text' : 'password'} id="senha-criar" placeholder="Crie uma senha forte" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        <button type="button" className="botao-olho" onClick={() => setMostrarSenha(!mostrarSenha)}>
                            {mostrarSenha ? <IconeOlhoFechado className="icone" /> : <IconeOlho className="icone" />}
                        </button>
                    </div>
                    {erroSenha && <p className="mensagem-erro">{erroSenha}</p>}
                </div>
                <div className="campo-grupo">
                    <label htmlFor="senha-confirmar">Confirmar Senha</label>
                    <div className="campo-senha-container">
                        <input type={mostrarConfirmarSenha ? 'text' : 'password'} id="senha-confirmar" placeholder="Repita a senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                        <button type="button" className="botao-olho" onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}>
                            {mostrarConfirmarSenha ? <IconeOlhoFechado className="icone" /> : <IconeOlho className="icone" />}
                        </button>
                    </div>
                    {erroConfirmarSenha && <p className="mensagem-erro">{erroConfirmarSenha}</p>}
                </div>
                <button type="submit" className="botao botao-principal botao-cheio">Criar Conta</button>
            </form>
            <p className="criar-conta-link">
                Já tem uma conta? <a href="#" onClick={(e) => { e.preventDefault(); setView('login'); }}>Faça login</a>
            </p>
        </>
    );
};


const FormularioRecuperarSenha = ({ setView }) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Email de recuperação enviado! (Simulação)");
        setView('login');
    }

    return (
        <>
            <h2 className="login-titulo">Recuperar Senha</h2>
            <p className="texto-recuperacao">Digite seu email e enviaremos um link para redefinir sua senha.</p>
            <form onSubmit={handleSubmit} className="login-formulario">
                <div className="campo-grupo">
                    <label htmlFor="email-recuperar">Email</label>
                    <input type="email" id="email-recuperar" placeholder="seu@email.com" required />
                </div>
                <button type="submit" className="botao botao-principal botao-cheio">Enviar Link</button>
            </form>
            <p className="criar-conta-link">
                Lembrou a senha? <a href="#" onClick={(e) => { e.preventDefault(); setView('login'); }}>Voltar para o login</a>
            </p>
        </>
    );
};


export default function Login({ onLoginSucesso }) {
    const [view, setView] = useState('login');

    const renderizarView = () => {
        switch (view) {
            case 'criar':
                return <FormularioCriarConta setView={setView} />;
            case 'recuperar':
                return <FormularioRecuperarSenha setView={setView} />;
            case 'login':
            default:
                return <FormularioLogin onLoginSucesso={onLoginSucesso} setView={setView} />;
        }
    }

    return (
        <div className="login-fundo">
            <div className="login-container">
                <div className="login-logo">
                    <div className="logo-icone-fundo"> <IconeCasa className="icone-branco" /> </div>
                    <span className="logo-nome">gerencie</span>
                </div>
                {renderizarView()}
            </div>
        </div>
    );
}