# Especificações do Projeto: Crypto-Landing-Page

## 🛠 Tech Stack
- **Framework:** React.js + Vite.js
- **Estilização:** CSS Modules (1 arquivo .css por componente)
- **Animações:** Framer Motion
- **Roteamento:** React Router Dom

## 🎨 Identidade Visual (Design System)
- **Tema:** Dark Mode profundo.
- **Cores:** Degradê de roxo (#2D004B para #8A2BE2).
- **Efeitos:** Glassmorphism (blur de fundo e bordas translúcidas) em containers e cards.
- **Animações:** Fade-in up e Stagger effects ao scrollar.

## 📂 Arquitetura de Páginas e Rotas

### 1. Home (`/`)
- Hero Section com CTA principal.
- Preview de 3 notícias (Destaques).

### 2. Aprender (`/aprender`)
- **Grid:** Máximo de 8 cards por página.
- **Funcionalidade:** Paginação funcional (Anterior/Próximo).
- **Detalhes:** Ao clicar, levar para `/aprender/:id` (Componente: `ArtigoCompleto.jsx`).

### 3. Notícias (`/noticias`)
- **Página Geral:** Listagem completa com paginação.
- **Navegação:** Ao clicar em uma notícia, levar para `/noticias/:slug` (Componente: `NoticiaAberta.jsx`).

### 4. Download (`/download`)
- Seção institucional com botões de lojas de aplicativos.

### 5. Fórum da Comunidade (`/forum`)
- **Feed Principal:** Listagem de threads com filtros (Mais Recentes, Populares, Sem Resposta).
- **Post Individual:** Rota `/forum/topic/:id`. Deve exibir o post completo + sistema de comentários.
- **Editor de Post:** Campo de texto (Rich Text simples) com suporte a inserção de imagens (simulado via URL ou File API).
- **Interatividade:** Botões de Upvote/Downvote e sistema de tags (ex: #Bitcoin, #Iniciante, #Segurança).

### 6. Painel Administrativo (`/admin`)
- **Gráficos:** Implementar `react-chartjs-2`. 
- **Métricas:** Faturamento, Reembolso e Segmentação de Planos (Free/Pro/Premium).
- **Feed de Atividade:** Monitoramento de vendas e interações no fórum em tempo real.
- **Gestão de Conteúdo:** Formulários rápidos na Sidebar para inserção de novas aulas (Aprender) e notícias.
- **Estilo:** Dashboard Futurista, Glassmorphism, Paleta Roxa.

### 7. Gestão do Fórum (`/manage-forum`)
- **Moderação:** Funções de Ocultar (Soft Delete) e Excluir (Hard Delete).
- **Interação:** Sistema de resposta direta do Admin com selo de autenticidade.
- **Visualização:** Lista expansível para ler comentários sem sair da página principal de gestão.
- **Status:** Badges visuais para identificar posts denunciados ou ocultados.

### 8. Gestão de Usuários (`/admin/users`)
- **Tabela de Dados:** Listagem de Nome, E-mail e Tipo de Plano.
- **Busca:** Filtro dinâmico por nome ou e-mail.
- **CRUD:** Funções para deletar e editar dados cadastrais e nível de acesso.
- **UI:** Badges de plano coloridos e linhas de tabela com efeito Glassmorphism.

### 9. Configurações e Permissões (`/admin/settings`)
- **Gestão de Equipe:** Lista de e-mails autorizados para acesso administrativo.
- **Whitelist:** Funcionalidade para adicionar novos e-mails à lista de permissões.
- **Controle:** Opção de revogar acesso (deletar colaborador) instantaneamente.
- **UI:** Layout limpo, foco em formulários e feedbacks de ação (sucesso/erro).

## 🏗️ Regras de Código
- Criar pastas individuais: `src/components/Home/`, `src/components/News/`, etc.
- O arquivo `App.jsx` deve conter o gerenciamento de rotas.
- Criar um arquivo `src/mocks/data.js` para simular o conteúdo (pelo menos 15 itens por categoria para testar a paginação).

## 🎨 Design System
- **Tema:** Dark Mode profundo.
- **Cores:** Degradê de roxo (#2D004B para #8A2BE2).
- **Efeitos:** Glassmorphism (blur de fundo e bordas translúcidas) em containers e cards.
- **Animações:** Fade-in up e Stagger effects ao scrollar.
