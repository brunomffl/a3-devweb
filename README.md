# Sistema de Gerenciamento de Artistas e Álbuns

Sistema desenvolvido para o trabalho A3 de Desenvolvimento Web que permite o gerenciamento de artistas e álbuns musicais, com autenticação e controle de acesso baseado em papéis (ADMIN/USER).

## 🚀 Tecnologias Utilizadas

- **Frontend**: React.js, TypeScript, Vite, TailwindCSS
- **Backend**: Node.js, Express, TypeScript
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Autenticação**: JWT (JSON Web Tokens)

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- PostgreSQL (pode ser executado via Docker)
- Git

## 🛠️ Configuração do Ambiente

### 1. Clonar o repositório

```bash
git clone https://github.com/brunomffl/a3-devweb
cd a3-devweb-main
```

### 2. Configuração do Backend
Instalar dependências

```bash
npm install
```

## Configurar variáveis de ambiente
Crie um arquivo 
.env
 na raiz do backend baseado no 
.env-example
:

```bash
cp .env-example .env
```
Edite o arquivo 
.env
 com as configurações do seu banco de dados:
```
.env

DATABASE_URL="file:./dev.db"
PORT=3000
JWT_SECRET="codigoJWT"
```
Isso irá criar um usuário administrador padrão:
```
npx prisma db seed
```
```
Email: admin@admin.com
Senha: senha123
```

## Iniciar o servidor
```
bash
npm run dev
```

### 3. Configuração do Frontend
Instalar dependências
```
bash
cd frontend
npm install
```

## Configurar variáveis de ambiente
Rodar
```
npm run dev
```


## 🌐 Acesso ao Sistema
URL do Frontend: http://localhost:5173
URL da API: http://localhost:3000
Credenciais de Acesso
### Admin:
```
## Email: admin@admin.com
## Senha: senha123
```
