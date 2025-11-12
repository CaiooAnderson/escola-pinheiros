# Centro Educacional Pinheiros — Frontend

Este diretório contém o frontend da aplicação do Centro Educacional Pinheiros. A interface foi construída com React, Vite e TypeScript e fornece tanto o site público quanto o painel administrativo usado pela equipe da escola.

## Visão geral

O frontend consome a API do backend para autenticação, gerenciamento de promoções, eventos, FAQs e feedbacks. Ele segue uma arquitetura de componentes com separação clara entre UI, layouts e páginas.

## Tecnologias principais

- React 19 + TypeScript
- Vite (bundler/development server)
- Tailwind CSS
- Radix UI (componentes acessíveis)
- react-hook-form + zod (validação de formulários)
- react-router-dom (navegação)

Consulte `package.json` para a lista completa de dependências e versões.

## Como rodar localmente

1. Abra um terminal na pasta `escola-frontend`.
2. Instale dependências:

```bash
npm install
```

3. Garanta que o backend esteja rodando e que a variável `VITE_API_URL` aponte para ele (ex.: `http://localhost:3000`).
4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite normalmente expõe a aplicação em `http://localhost:5173` (verifique o terminal para a porta exata).

## Scripts úteis

- `npm run dev` — servidor de desenvolvimento (Vite).
- `npm run build` — compila TypeScript e gera o build do Vite para produção.
- `npm run preview` — pré-visualiza o build gerado.
- `npm run lint` — executa ESLint.

## Estrutura do projeto (resumo)

- `src/`
  - `main.tsx` — ponto de entrada
  - `App.tsx` — wrapper com providers e rotas
  - `routes/` — definição de rotas (públicas e administrativas)
  - `pages/` — telas (Login, Landing, AdminPages, ClientPages)
  - `components/` — componentes reutilizáveis (ui, global, skeletons, animations)
  - `lib/` — utilitários (ex.: `cn`) e helpers
  - `assets/` — imagens e fontes

## Variáveis de ambiente

As variáveis de ambiente utilizadas no frontend devem começar com o prefixo `VITE_` para serem expostas ao código cliente.

- `VITE_API_URL` — URL base da API (ex.: `http://localhost:3000` ou URL de produção).

Crie um arquivo `.env` em `escola-frontend` com a variável acima (não comitar o `.env` com segredos).

## Integração com o backend

O frontend envia requisições para a API do backend. Fluxos principais:

- Autenticação: `POST /login` — recebe token JWT.
- Promoções, Eventos, FAQ e Feedbacks: rotas sob `/promotions`, `/events`, `/faqs`, `/feedbacks`.

O token JWT deve ser enviado no header `Authorization: Bearer <token>` para rotas protegidas. No projeto o token é gerenciado por um `AuthContext` em `src/components/context`.

## Boas práticas e convenções

- Componentes atômicos/ UI em `src/components/ui`.
- Layouts e componentes globais em `src/components/global`.
- Páginas em `src/pages/*` e chamadas de API centralizadas em hooks/serviços.
- Validação de formulários com `zod` + `react-hook-form`.

## Deploy

Recomendo usar Vercel (configuração parcial já incluída no repositório). Para deploy genérico:

1. Execute `npm run build`.
2. Publique o conteúdo da pasta de saída do Vite (por padrão `dist`) no serviço de hospedagem estática.

Exemplo:

```bash
npm run build
```
