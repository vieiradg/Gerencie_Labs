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
import Pagamentos from './pages/Pagamentos/Pagamentos';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {

    return (
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
            
            <Routes>
                <Route path="/" element={<PaginaInicial />} />
                <Route path="/login" element={<Login />} />

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
                    <Route path="imoveis/:imovelId" element={<Imoveis />} /> 
                    <Route path="inquilinos" element={<Inquilinos />} />
                    <Route path="documentos" element={<Documentos />} />
                    <Route path="pagamentos" element={<Pagamentos />} />
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </React.Fragment>
    );
}