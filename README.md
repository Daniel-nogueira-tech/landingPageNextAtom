# Crypto Trading Platform

Plataforma para gerenciamento, análise e operação de estratégias relacionadas ao mercado de criptomoedas.

O projeto é dividido em três aplicações principais:

* **Server** — API/backend responsável por autenticação, usuários, pagamentos e comunicação com o banco de dados.
* **Crypto Landing Page** — aplicação pública destinada à apresentação da plataforma e interação com usuários.
* **ADM Client** — painel administrativo para gerenciamento e acompanhamento da plataforma.

## Arquitetura

```text
                    ┌──────────────────────┐
                    │    Landing Page      │
                    │   React + Vite       │
                    └──────────┬───────────┘
                               │
                               │ HTTP / API
                               ▼
                    ┌──────────────────────┐
                    │       Server         │
                    │ Node.js + Express    │
                    └───────┬───────┬──────┘
                            │       │
                 ┌──────────┘       └──────────┐
                 ▼                             ▼
          ┌──────────────┐              ┌──────────────┐
          │   MongoDB    │              │    Stripe    │
          │  Mongoose    │              │  Pagamentos   │
          └──────────────┘              └──────────────┘
                            ▲
                            │
                    ┌───────┴────────┐
                    │   ADM Client   │
                    │ React + Vite   │
                    └────────────────┘
```

## Tecnologias

### Backend — Server

O backend utiliza **Node.js** com **Express**, fornecendo uma API para as aplicações frontend.

Principais tecnologias:

* Node.js
* Express 5
* MongoDB
* Mongoose
* JWT
* Bcrypt
* Stripe
* Nodemailer
* Multer
* CORS
* Express Rate Limit
* Dotenv
* Validator

### Frontend — Landing Page

Aplicação pública desenvolvida com:

* React 19
* Vite
* React Router
* Axios
* Framer Motion
* PrimeReact
* Lucide React
* React Toastify

### Frontend — Administração

Painel administrativo desenvolvido com:

* React 19
* Vite
* React Router
* Axios
* Chart.js
* React Chart.js 2
* Framer Motion
* Lucide React
* React Icons
* React Toastify

## Estrutura do projeto

Uma possível organização do projeto:

```text
crypto-project/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── crypto-landing-page/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── adm-client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Funcionalidades

### Autenticação

O sistema utiliza:

* JWT para autenticação;
* Bcrypt para hash de senhas;
* Cookies para gerenciamento de autenticação;
* Middleware de proteção de rotas;
* Rate limiting para proteção da API.

### Usuários

O backend é responsável pelo gerenciamento de usuários e suas informações de acesso.

### Pagamentos

Integração com **Stripe** para gerenciamento de pagamentos e assinaturas da plataforma.

### E-mails

O sistema utiliza **Nodemailer** para envio de e-mails relacionados à aplicação.

### Uploads

O **Multer** é utilizado para processamento de arquivos enviados para o servidor.

### Banco de dados

O projeto utiliza **MongoDB**, com **Mongoose** como camada de modelagem e interação com os dados.

## Segurança

O backend possui mecanismos para aumentar a segurança da aplicação:

* Senhas armazenadas utilizando hash com Bcrypt;
* Autenticação baseada em JWT;
* Variáveis sensíveis armazenadas em `.env`;
* Controle de CORS;
* Rate limiting;
* Validação de dados;
* Cookies para gerenciamento de autenticação.

**Nunca envie o arquivo `.env` para o Git.**

Exemplo de `.gitignore`:

```gitignore
node_modules/
.env
.env.local
dist/
build/
*.log
```

## Configuração

### 1. Clone o projeto

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_PROJETO>
```

### 2. Instale as dependências do servidor

```bash
cd server
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo:

```text
.env
```

Exemplo:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
```

### 4. Inicie o servidor

```bash
npm run server
```

O servidor utiliza **Nodemon** para reiniciar automaticamente durante o desenvolvimento.

### 5. Instale e execute a Landing Page

```bash
cd crypto-landing-page
npm install
npm run dev
```

### 6. Execute o painel administrativo

```bash
cd adm-client
npm install
npm run dev
```

## Scripts

### Server

```bash
npm run server
```

Inicia o backend utilizando Nodemon.

### Landing Page

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### ADM Client

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Ambiente de desenvolvimento

O projeto utiliza:

```text
Node.js
React
Vite
Express
MongoDB
Stripe
JWT
```

## Fluxo da aplicação

O fluxo básico da plataforma é:

```text
Usuário
   │
   ▼
Landing Page
   │
   ├── Cadastro
   ├── Login
   └── Assinatura
          │
          ▼
       Server
          │
     ┌────┼─────┐
     ▼    ▼     ▼
 MongoDB JWT  Stripe
          │
          ▼
    Área autenticada
          │
          ▼
     ADM Client
```

## Status

🚧 **Em desenvolvimento**

O projeto está sendo desenvolvido como uma plataforma voltada ao mercado de criptomoedas, com backend, aplicação pública e painel administrativo independentes.

## Licença

Este projeto possui licença **ISC**, conforme configuração atual do backend.
