# Task List

---

## 🇧🇷 README — Português

### 📌 Descrição

Projeto fullstack para gerenciamento de tarefas, com autenticação e dashboard, desenvolvido para estudo e testes de arquitetura moderna com **Next.js**.

---

## 🚀 Instruções para rodar o projeto

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- npm (ou pnpm/yarn)

---

### 1️⃣ Clonar o repositório

```bash
git clone <url-do-repositorio>
cd task-list
```

---

### 2️⃣ Subir o banco de dados (PostgreSQL via Docker)

```bash
docker compose up -d
```

Credenciais do banco (DEV):

- **Usuário:** docker
- **Senha:** docker
- **Banco:** connect
- **Porta:** 5432

---

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/connect"
```

> ⚠️ Não utilize variáveis com `NEXT_PUBLIC_` para conexão com banco de dados.

---

### 4️⃣ Instalar dependências

```bash
npm install
```

---

### 5️⃣ Gerar e aplicar migrations (Drizzle ORM)

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

---

### 6️⃣ Rodar o projeto

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 🧱 Stack utilizada

### Front-end

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Back-end

- tRPC
- Drizzle ORM
- PostgreSQL
- Better Auth

### Infra / Dev

- Docker + Docker Compose
- Drizzle Kit (migrations)

---

## 🧠 Decisões técnicas e arquiteturais

- **Next.js Fullstack** para reduzir complexidade e centralizar lógica
- **tRPC** para comunicação typesafe sem REST
- **Drizzle ORM** para SQL explícito, tipado e previsível
- **PostgreSQL via Docker** para ambiente local isolado
- **Sem SSL em DEV**, garantindo compatibilidade com Postgres local
- Estrutura modular separando banco, regras de negócio e UI

---

---

## 🇺🇸 README — English

### 📌 Description

Fullstack task management project with authentication and dashboard, built to study and test a modern **Next.js** architecture.

---

## 🚀 How to run the project

### Requirements

- Node.js 18+
- Docker & Docker Compose
- npm (or pnpm/yarn)

---

### 1️⃣ Clone the repository

```bash
git clone <repository-url>
cd task-list
```

---

### 2️⃣ Start the database (PostgreSQL via Docker)

```bash
docker compose up -d
```

Database credentials (DEV):

- **User:** docker
- **Password:** docker
- **Database:** connect
- **Port:** 5432

---

### 3️⃣ Environment variables

Create a `.env` file at the project root:

```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/connect"
```

> ⚠️ Do not use `NEXT_PUBLIC_` variables for database connections.

---

### 4️⃣ Install dependencies

```bash
npm install
```

---

### 5️⃣ Generate and run migrations (Drizzle ORM)

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

---

### 6️⃣ Run the application

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

---

## 🧱 Tech stack

### Front-end

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Back-end

- tRPC (typesafe APIs)
- Drizzle ORM
- PostgreSQL
- Better Auth

### Infra / Dev

- Docker & Docker Compose
- Drizzle Kit (migrations)

---

## 🧠 Technical and architectural decisions

- **Next.js Fullstack** approach to centralize frontend and backend
- **tRPC** for end-to-end type safety without REST
- **Drizzle ORM** for explicit, predictable SQL
- **PostgreSQL via Docker** for isolated local development
- **No SSL in DEV**, ensuring compatibility with local Postgres
- Clear separation of concerns between database, business logic, and UI

---

## 👨‍💻 Author

**Matheus Tavares**

---

This project is focused on development and learning purposes. Production environments should include SSL, connection pooling strategies, and environment separation.
