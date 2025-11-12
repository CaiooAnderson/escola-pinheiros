# Centro Educacional Pinheiros — Projeto

Este repositório contém a aplicação web do Centro Educacional Pinheiros, composta por frontend (cliente) e backend (API). O objetivo é oferecer um site institucional para pais e alunos e um painel administrativo para gerenciar promoções, eventos, FAQs e feedbacks.

## Visão geral do projeto

- Frontend: React + Vite + TypeScript — interface pública e painel administrativo.
- Backend: Node.js + Express + TypeScript + Prisma — API REST responsável por autenticação, gerenciamento de recursos e persistência no banco de dados.
- Banco de dados: configurado via Prisma (migrations e seed).

## Estrutura principal

- escola-frontend/ — código do cliente (Vite, React, TypeScript).
- escola-backend/ — API (Express, TypeScript, Prisma).
  - server.ts — ponto de entrada que dá listen na porta.
  - app.ts — configura middlewares, CORS, rotas e tratamento de erros.
  - src/modules/ — controllers, serviços e repositórios por domínio (auth, promotions, events, faq, feedback).
  - prisma/ — schema.prisma, migrations e seed.

## Tecnologias

- Node.js, TypeScript, Express.
- Prisma ORM.
- React, Vite.
- JWT para autenticação.
- Multer para upload, AWS SDK para S3 (quando aplicável).
- Zod para validação de dados.

## Como rodar localmente

1. Backend

   - Entre em escola-backend:
     - npm install
     - npm run dev
   - Executar Prisma:
     - npx prisma generate
     - npm run prisma:migrate
     - npm run prisma:seed

2. Frontend
   - Entre em escola-frontend:
     - npm install
     - npm run dev

As URLs usadas pelo frontend para a API são configuradas via variáveis de ambiente (ex.: VITE_API_URL).

## Scripts principais (exemplo: escola-backend/package.json)

- npm run dev — rodar em modo desenvolvimento (ts-node-dev).
- npm run build — compilar TypeScript para dist.
- npm start — executar build em produção.
- prisma:generate, prisma:migrate, prisma:seed — tarefas Prisma.

## Variáveis de ambiente importantes

- BACKEND: PORT, DATABASE_URL, JWT_SECRET, AWS (se usar S3), outras relacionadas a credenciais administrativas.
- FRONTEND: VITE_API_URL (endpoint da API).

## Endpoints principais (resumo)

- GET /health — verifica status da aplicação.
- POST /login — autenticação.
- Rotas sob /promotions, /events, /faqs, /feedbacks — CRUD conforme permissões.
- Rotas de administração protegidas por autenticação (JWT).

## Boas práticas e contribuições

- Seguir padrões de modularização: controllers → services → repositories.
- Escrever migrations e seeds via Prisma antes de fazer deploy.
- Testar endpoints e fluxos críticos manualmente ou com testes automatizados antes de abrir PR.
- Documentar alterações relevantes no código e no README.

## Deploy

- Frontend: build Vite e deploy estático (ex.: Vercel).
- Backend: compilar TypeScript (npm run build) e executar dist/server.js em ambiente Node; configurar variáveis de ambiente e migrations do Prisma no ambiente de produção (ex.: Render).