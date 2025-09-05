import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './global.css';
import { AuthProvider } from './context/AuthContext.jsx';

// 1. Importe o BrowserRouter
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      {/* 2. "Envelope" o seu App com o BrowserRouter */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);