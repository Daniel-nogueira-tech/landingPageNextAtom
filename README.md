# 🚀 Projeto Fullstack - Crypto Platform

Este repositório contém três módulos principais que compõem a aplicação:

## 📌 Estrutura

- **server** → Backend em Node.js + Express
- **crypto-landing-page** → Frontend público em React (landing page)
- **adm-client** → Painel administrativo em React

---

## ⚙️ Server (Backend)

**Stack:**
- Node.js (ES Modules)
- Express
- MongoDB + Mongoose
- Autenticação com JWT e bcrypt
- Uploads com Multer
- Emails com Nodemailer
- Pagamentos com Stripe
- Segurança: express-rate-limit, validator, cors, cookie-parser

**Scripts:**
```bash
npm run server   # inicia com nodemon
💻 Crypto Landing Page (Frontend Público)
Stack:

React + Vite

React Router DOM

Axios

UI: PrimeReact, Framer Motion, Lucide React

Notificações: React Toastify

Scripts:

bash
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
npm run preview  # preview do build
🛠️ Adm Client (Painel Administrativo)
Stack:

React + Vite

React Router DOM

Axios

Chart.js + react-chartjs-2

UI: Framer Motion, Lucide React, React Icons

Loading Indicators

Notificações: React Toastify

Scripts:

bash
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
npm run preview  # preview do build
📂 Organização do Repositório
Código
/server
  └── package.json
/crypto-landing-page
  └── package.json
/adm-client
  └── package.json
📜 Licença
Este projeto está licenciado sob ISC.
 
