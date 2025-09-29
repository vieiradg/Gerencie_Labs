import React from "react";

const Icone = ({ children, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

export const IconeCasa = ({ className }) => (
  <Icone className={className}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </Icone>
);
export const IconeUsuarios = ({ className }) => (
  <Icone className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icone>
);
export const IconeMensagem = ({ className }) => (
  <Icone className={className}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </Icone>
);
export const IconeTendencia = ({ className }) => (
  <Icone className={className}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </Icone>
);
export const IconeEscudo = ({ className }) => (
  <Icone className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
  </Icone>
);
export const IconeRelogio = ({ className }) => (
  <Icone className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </Icone>
);
export const IconeCheck = ({ className }) => (
  <Icone className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </Icone>
);
export const IconeEstrela = ({ className }) => (
  <Icone className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Icone>
);
export const IconeMenu = ({ className }) => (
  <Icone className={className}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </Icone>
);
export const IconeFechar = ({ className }) => (
  <Icone className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Icone>
);
export const IconeSetaDireita = ({ className }) => (
  <Icone className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </Icone>
);
export const IconeGrafico = ({ className }) => (
  <Icone className={className}>
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </Icone>
);
export const IconeSino = ({ className }) => (
  <Icone className={className}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </Icone>
);
export const IconeDocumento = ({ className }) => (
  <Icone className={className}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </Icone>
);
export const IconeMais = ({ className }) => (
  <Icone className={className}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </Icone>
);
export const IconeEnviar = ({ className }) => (
  <Icone className={className}>
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </Icone>
);
export const IconeOlho = ({ className }) => (
  <Icone className={className}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </Icone>
);
export const IconeOlhoFechado = ({ className }) => (
  <Icone className={className}>
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </Icone>
);
export const IconeDownload = ({ className }) => (
  <Icone className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </Icone>
);
export const IconeSetaEsquerda = ({ className }) => (
  <Icone className={className}>
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </Icone>
);

export const IconeCalendario = ({ className }) => (
  <Icone className={className}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </Icone>
);
export const IconeFerramenta = ({ className }) => (
  <Icone className={className}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </Icone>
);

export const IconeDinheiro = ({ className }) => (
  <Icone className={className}>
    <path d="M13 7h1.4c.4 0 .8.2 1.1.5l.3.3c.4.4.6 1 .5 1.5v2.8c0 .3-.2.6-.5.7l-1.4.3c-.3.1-.6.4-.6.7v1.8c0 .3.2.6.5.7l1.4.3c.3.1.5.4.5.7v1.8c0 .3-.2.6-.5.7l-1.4.3c-.3.1-.6.4-.6.7V20" />
    <path d="M11 7H9.6c-.4 0-.8.2-1.1.5l-.3.3c-.4.4-.6 1-.5 1.5v2.8c0 .3.2.6.5.7l1.4.3c.3.1.6.4.6.7v1.8c0 .3-.2.6-.5.7l-1.4.3c-.3.1-.5.4-.5.7v1.8c0 .3.2.6.5.7l1.4.3c.3.1.6.4.6.7V20" />
    <rect width="20" height="14" x="2" y="5" rx="3" />
    <path d="M10 10h4" />
  </Icone>
);

export const IconeEditar = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
);

export const IconeLixeira = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);