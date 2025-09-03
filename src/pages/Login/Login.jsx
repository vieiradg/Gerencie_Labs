import React, { useState } from 'react';
import './Login.css';
import { IconeCasa, IconeOlho, IconeOlhoFechado } from '../../components/Icons';
import api from "../../services/Api";
import { set, z } from "zod"


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
    // Use states de cadastro
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    // Erros
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
    const [erroConfirmarSenha, setErroConfirmarSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState("");
    const [erros, setErros] = useState({});


    const schema = z.object({
        nome: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("Email inválido"),
        senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
        cpf: z
            .string()
            .min(11, "CPF deve ter 11 dígitos")
            .max(11, "CPF deve ter 11 dígitos")
            .regex(/^\d+$/, "CPF só pode conter números"),
    });

    const cadastrarUsuario = async (e) => {
        e.preventDefault();

        const formData = {
            nome,
            email,
            senha,
            cpf
        };

        const result = schema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = result.error.format();
            const novosErros = {
                nome: fieldErrors.nome?._errors?.[0] || "",
                email: fieldErrors.email?._errors?.[0] || "",
                senha: fieldErrors.senha?._errors?.[0] || "",
                cpf: fieldErrors.cpf?._errors?.[0] || "",
            };
            setErros(novosErros);
            return;
        } else {
            setErros({});
        }

        const usuario = {
            name: nome,
            email,
            password: senha,
            cpf: cpf
        }

        try {
            const resposta = await api.post("/user/register", usuario, {});

            if (resposta.status === 201) {
                alert(`Parabéns ${nome} foi cadastrado com sucesso!`);
                setView('login');
            }
        } catch (error) {
            console.log(error.response?.data);
            setMensagemErro(error.response?.data?.message || "Erro ao cadastrar usuário");

        }
    };


    return (
        <>
            <h2 className="login-titulo">Crie sua conta</h2>
            <form onSubmit={cadastrarUsuario} className="login-formulario" noValidate>

                <div className="campo-grupo">
                    <label htmlFor="nome">Nome completo</label>
                    <input type="text" id="nome" placeholder="Seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
                    {erros.nome && <p className="mensagem-erro">{erros.nome}</p>}
                </div>

                <div className="campo-grupo">
                    <label htmlFor="email-criar">Email</label>
                    <input type="email" id="email-criar" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {erros.email && <p className="mensagem-erro">{erros.email}</p>}
                </div>

                <div className="campo-grupo">
                    <label htmlFor="cpf-criar">Cpf</label>
                    <input type="text" id="cpf-criar" placeholder="00000000000" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                    {erros.cpf && <p className="mensagem-erro">{erros.cpf}</p>}
                </div>

                <div className="campo-grupo">
                    <label htmlFor="senha-criar">Senha</label>
                    <div className="campo-senha-container">
                        <input type={mostrarSenha ? 'text' : 'password'} id="senha-criar" placeholder="Crie uma senha forte" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        <button type="button" className="botao-olho" onClick={() => setMostrarSenha(!mostrarSenha)}>
                            {mostrarSenha ? <IconeOlhoFechado className="icone" /> : <IconeOlho className="icone" />}
                        </button>
                    </div>
                    {erros.senha && <p className="mensagem-erro">{erros.senha}</p>}
                </div>

                {/* <div className="campo-grupo">
                    <label htmlFor="senha-confirmar">Confirmar Senha</label>
                    <div className="campo-senha-container">
                        <input type={mostrarConfirmarSenha ? 'text' : 'password'} id="senha-confirmar" placeholder="Repita a senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                        <button type="button" className="botao-olho" onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}>
                            {mostrarConfirmarSenha ? <IconeOlhoFechado className="icone" /> : <IconeOlho className="icone" />}
                        </button>
                    </div>
                    {erroConfirmarSenha && <p className="mensagem-erro">{erroConfirmarSenha}</p>}
                    {erros.ConfirmarSenha && <p className="mensagem-erro">{erros.nome}</p>}
                </div> */}

                <button type="submit" className="botao botao-principal botao-cheio">Criar Conta</button>
            </form>

            {mensagemErro && <p className="mensagem-erro">{mensagemErro}</p>}

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