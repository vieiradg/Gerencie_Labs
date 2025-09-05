import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PaginaInicial from './pages/PaginaInicial/PaginaInicial';
import Login from './pages/Login/Login';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Dashboard from './pages/Dashboard/Dashboard';
import Imoveis from './pages/Imoveis/Imoveis';
import Inquilinos from './pages/Inquilinos/Inquilinos';
import Documentos from './pages/Documentos/Documentos';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function App() {

    <React.Fragment>

        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </React.Fragment>

    return (
        <Routes>
            {/* --- Rotas Públicas --- */}
            <Route path="/" element={<PaginaInicial />} />
            <Route path="/login" element={<Login />} />

            {/* --- Rota Protegida com Rotas Aninhadas --- */}
            <Route 
                path="/dashboard" 
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} /> 
                <Route path="imoveis" element={<Imoveis />} />
                {/* Rota para os detalhes de um imóvel específico */}
                <Route path="imoveis/:imovelId" element={<Imoveis />} /> 
                <Route path="inquilinos" element={<Inquilinos />} />
                <Route path="documentos" element={<Documentos />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
