# Como rodar o projeto

## Pré-requisitos

- **Node.js** versão 18 ou superior
- **Docker** e **Docker Compose** (para o banco de dados PostgreSQL)
- **Git** (para clonar o repositório)

## 1. Clonando e configurando o Backend

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd challenge-full-stack-web

# Acesse a pasta do backend
cd backend

# Instale as dependências
npm install
```

## 2. Configuração do Ambiente (Backend)

Copie o arquivo de exemplo e configure as variáveis de ambiente:

```bash
cp .env.example .env
```

O arquivo `.env` deve conter as seguintes variáveis:

```
# Banco de dados
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/students_db?schema=public"

# JWT
JWT_SECRET="seu-jwt-secret-super-secreto-aqui"

# Servidor
PORT=3333
```

## 3. Executando o banco de dados

O projeto inclui um Docker Compose que configura automaticamente o PostgreSQL:

```bash
# Inicia o banco de dados (PostgreSQL) em background
npm run services:up

# Para parar os serviços (quando necessário)
npm run services:down
```

## 4. Configuração do banco e dados iniciais

Execute as migrações e popule o banco com dados de exemplo:

```bash
# Executa as migrações do Prisma
npx prisma migrate dev

# Popula o banco com usuários e alunos de exemplo
npm run seed
```

O seed criará:

- **1 usuário admin:** `admin@sistema.com` / `admin123456`
- **1 usuário comum:** `user@sistema.com` / `123456`
- **5 alunos** cadastrados para testes

## 5. Executando o Backend

Este comando irá subir o banco de dados e iniciará o servidor.

```bash
# Inicia o servidor em modo desenvolvimento
npm run dev

# O backend estará disponível em http://localhost:3333
```

## 6. Configurando o Frontend

Em um novo terminal, acesse a pasta do frontend:

```bash
cd ../frontend

# Instale as dependências
npm install
```

## 7. Configuração do Ambiente (Frontend)

Crie o arquivo `.env`:

```bash
cp .env.example .env
```

O arquivo `.env` do frontend pode conter:

```
VITE_API_URL=http://localhost:3333
```

## 8. Executando o Frontend

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# O frontend estará disponível em http://localhost:3001
```

## 9. Acessando a aplicação

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3333

### Credenciais para teste:

- **Administrador (pode deletar alunos):**

  - Email: `admin@sistema.com`
  - Senha: `admin123456`

- **Usuário comum:**
  - Email: `user@sistema.com`
  - Senha: `123456`

## Scripts úteis

### Backend

- `npm run dev` - Inicia o servidor em desenvolvimento
- `npm run seed` - Popula o banco com dados de exemplo
- `npm test` - Executa os testes
- `npm run services:up/down` - Controla o banco Docker

### Frontend

- `npm run dev` - Inicia em desenvolvimento
