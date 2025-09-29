import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';
import { IconeCasa, IconeOlho, IconeOlhoFechado } from '../../components/Icons';
import api from "../../services/Api";
import { z } from "zod"
import { toast } from 'react-toastify';

const FormularioLogin = ({ setView }) => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const fazerLogin = useCallback(async (e) => {
        e.preventDefault();
        setErro('');

        try {
            const resposta = await api.post("/user/login", {
                email: email,
                password: senha,
            });

            const { token, user } = resposta.data;
            
            toast.success("Login realizado com sucesso!");
            
            login(token, user); 
            
            navigate('/dashboard');

        } catch (error) {
            const mensagem = error.response?.data?.message || "Email ou senha inválidos.";
            console.log(error.response?.data);
            setErro(mensagem);
            toast.error(mensagem);
        }
    }, [email, senha, login, navigate]);

    return (
        <>
            <h2 className="login-titulo">Acesse sua conta</h2>
        
            <form onSubmit={fazerLogin} className="login-formulario">
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
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmaSenha, setMostrarConfirmaSenha] = useState(false);
    const [erros, setErros] = useState({});

    const nomeCompletoRegex = /^\S+\s+\S+/;
    const senhaForteRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    const MENSAGEM_SENHA = "A senha deve ter 8+ caracteres, 1 letra maiúscula e 1 caractere especial.";

    const schema = z.object({
        nome: z.string()
            .min(1, "Nome é obrigatório")
            .regex(nomeCompletoRegex, "Por favor, digite seu nome completo (Nome e Sobrenome)"),
        email: z.string().trim().email("Email inválido"),
        cpf: z.string()
            .length(11, "CPF deve ter 11 dígitos")
            .regex(/^\d+$/, "CPF só pode conter números")
            .refine(value => !/^(\d)\1{10}$/.test(value), {
                message: "CPF inválido",
            }),
        senha: z.string()
            .regex(senhaForteRegex, MENSAGEM_SENHA),
        confirmarSenha: z.string(),
    })
    .refine((data) => data.senha === data.confirmarSenha, {
        message: "As senhas não coincidem",
        path: ["confirmarSenha"],
    });

    const handleInputChange = useCallback((setter, field) => (e) => {
        setter(e.target.value);
        if (erros[field]) {
            setErros(prev => {
                const newErros = { ...prev };
                delete newErros[field];
                return newErros;
            });
        }
    }, [erros]);

    const cadastrarUsuario = useCallback(async (e) => {
        e.preventDefault();
        setErros({});
    
        const formData = { nome, email, senha, confirmarSenha, cpf };
        const result = schema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErros(fieldErrors);
            toast.warn("Por favor, corrija os erros no formulário.");
            return;
        }

        const usuario = {
            name: nome,
            email,
            password: senha,
            cpf: cpf
        }

        try {
            const resposta = await api.post("/user/register", usuario);
            if (resposta.status === 201) {
                toast.success(`Parabéns ${nome}, sua conta foi criada com sucesso!`);
                setView('login');
            }
        } catch (error) {
            const mensagem = error.response?.data?.message || "Erro ao cadastrar usuário. Tente novamente.";
            console.log(error.response?.data);
            setErros({ api: mensagem });
            toast.error(mensagem);
        }
    }, [nome, email, senha, confirmarSenha, cpf, setView]);

    return (
        <>
            <h2 className="login-titulo">Crie sua conta</h2>
            <form onSubmit={cadastrarUsuario} className="login-formulario" noValidate>
                <div className="campo-grupo">
                    <label htmlFor="nome">Nome completo</label>
                    <input type="text" id="nome" placeholder="Seu nome completo" value={nome} onChange={handleInputChange(setNome, 'nome')} />
                    {erros.nome && <p className="mensagem-erro">{erros.nome}</p>}
                </div>
                <div className="campo-grupo">
                    <label htmlFor="email-criar">Email</label>
                    <input type="email" id="email-criar" placeholder="seu@email.com" value={email} onChange={handleInputChange(setEmail, 'email')} />
                    {erros.email && <p className="mensagem-erro">{erros.email}</p>}
                </div>
                <div className="campo-grupo">
                    <label htmlFor="cpf-criar">CPF</label>
                    <input type="text" id="cpf-criar" placeholder="00000000000" value={cpf} onChange={handleInputChange(setCpf, 'cpf')} />
                    {erros.cpf && <p className="mensagem-erro">{erros.cpf}</p>}
                </div>
                <div className="campo-grupo">
                    <label htmlFor="senha-criar">Senha</label>
                    <div className="campo-senha-container">
                        <input type={mostrarSenha ? 'text' : 'password'} id="senha-criar" placeholder="Crie uma senha forte" value={senha} onChange={handleInputChange(setSenha, 'senha')} />
                        <button type="button" className="botao-olho" onClick={() => setMostrarSenha(!mostrarSenha)}>
                            {mostrarSenha ? <IconeOlhoFechado className="icone" /> : <IconeOlho className="icone" />}
                        </button>
                    </div>
                    {erros.senha && <p className="mensagem-erro">{erros.senha}</p>}
                </div>
                <div className="campo-grupo">
                    <label htmlFor="confirmar-senha-criar">Confirme a Senha</label>
                    <div className="campo-senha-container">
                        <input 
                            type={mostrarConfirmaSenha ? 'text' : 'password'} 
                            id="confirmar-senha-criar" 
                            placeholder="Confirme sua senha" 
                            value={confirmarSenha} 
                            onChange={handleInputChange(setConfirmarSenha, 'confirmarSenha')} 
                        />
                        <button type="button" className="botao-olho" onClick={() => setMostrarConfirmaSenha(!mostrarConfirmaSenha)}>
                            {mostrarConfirmaSenha ? <IconeOlhoFechado className="icone" /> : <IconeOlho className="icone" />}
                        </button>
                    </div>
                    {erros.confirmarSenha && <p className="mensagem-erro">{erros.confirmarSenha}</p>}
                </div>
                <button type="submit" className="botao botao-principal botao-cheio">Criar Conta</button>
            </form>
            {erros.api && <p className="mensagem-erro">{erros.api}</p>}
            <p className="criar-conta-link">
                Já tem uma conta? <a href="#" onClick={(e) => { e.preventDefault(); setView('login'); }}>Faça login</a>
            </p>
        </>
    );
};

const FormularioRecuperarSenha = ({ setView }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.info("Email de recuperação enviado! (Simulação)");
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

export default function Login() {
    const location = useLocation();
    const [view, setView] = useState('login');

    useEffect(() => {
        if (location.state?.view === 'criar') {
            setView('criar');
        }
    }, [location.state]);

    const renderizarView = () => {
        switch (view) {
            case 'criar':
                return <FormularioCriarConta setView={setView} />;
            case 'recuperar':
                return <FormularioRecuperarSenha setView={setView} />;
            case 'login':
            default:
                return <FormularioLogin setView={setView} />;
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