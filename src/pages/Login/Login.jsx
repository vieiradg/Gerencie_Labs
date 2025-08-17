import React, { useState } from 'react';
import './Login.css';
import { IconeCasa, IconeOlho, IconeOlhoFechado } from '../../components/Icons';

export default function Login({ onLoginSucesso }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const handleSubmit = (evento) => {
        evento.preventDefault();
        if (email === 'admin@gerencie.com' && senha === '1234') {
            setErro('');
            onLoginSucesso();
        } else {
            setErro('Email ou senha inválidos.');
        }
    };

    return (
        <div className="login-fundo">
            <div className="login-container">
                <div className="login-logo">
                    <div className="logo-icone-fundo"> <IconeCasa className="icone-branco" /> </div>
                    <span className="logo-nome">gerencie</span>
                </div>
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
                        <div className="lembrar-grupo">
                            <input type="checkbox" id="lembrar" />
                            <label htmlFor="lembrar">Lembrar de mim</label>
                        </div>
                        <a href="#">Esqueci a senha</a>
                    </div>
                    {erro && <p className="mensagem-erro">{erro}</p>}
                    <button type="submit" className="botao botao-principal botao-cheio">Entrar</button>
                </form>
                <p className="criar-conta-link">
                    Não tem uma conta? <a href="#">Crie agora</a>
                </p>
            </div>
        </div>
    );
}
