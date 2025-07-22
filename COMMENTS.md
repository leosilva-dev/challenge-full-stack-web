# Decisão da Arquitetura Utilizada

### Backend (Node.js + TypeScript)

**Arquitetura em Camadas (Layered Architecture)**

- **Controllers**: Responsáveis por receber requisições HTTP, validar dados de entrada, delegar processamento para services e formatar respostas adequadas para o cliente.
- **Services**: Contêm a lógica de negócio da aplicação, orquestrando operações complexas e garantindo que as regras de negócio sejam respeitadas. Não conhecem detalhes de protocolo HTTP ou de persistência de dados.
- **Repositories**: Abstraem o acesso aos dados e comunicação com o banco, fornecendo uma interface consistente e agnostica em relação ao banco de dados.
- **DTOs (Data Transfer Objects)**: Definem contratos explícitos de entrada e saída de dados entre as diferentes camadas do sistema, garantindo que apenas os dados necessários sejam transferidos.
- **Middlewares**: Interceptam requisições para realizar processamentos como autenticação, autorização, tratamento de erros e monitoramento de performance.

**Justificativas:**

- **Separation of Concerns**: Cada camada tem uma responsabilidade específica e bem definida, facilitando a manutenção do código e permitindo que desenvolvedores diferentes possam trabalhar em camadas distintas sem conflitos.
- **Testabilidade**: A clara separação de responsabilidades facilita a criação de testes unitários e de integração, permitindo mockar dependências e isolar componentes para testes mais precisos e confiáveis.

**Padrões Implementados:**

- **Repository Pattern**: Para abstração do acesso a dados, permitindo trocar o ORM ou até mesmo o banco de dados com impacto mínimo no restante da aplicação. Implementei repositories específicos para cada entidade de domínio.
- **Dependency Injection**: Utilizei injeção de dependências nos services para facilitar a testabilidade e reduzir acoplamento entre componentes, isolando detalhes de implementação.
- **DTO Pattern**: Implementei DTOs específicos para cada operação, garantindo que os dados sejam validados e transformados adequadamente entre as camadas, evitando exposição indesejada de dados sensíveis.
- **Middleware Pattern**: Implementei middlewares para autenticação JWT e tratamento unificado de erros.

### Frontend (Vue.js 3 + TypeScript)

**Composition API + Composables Architecture**

- **Pages**: Componentes de alto nível que definem rotas completas da aplicação, combinando vários componentes menores e coordenando a lógica específica da página.
- **Composables**: Funções que encapsulam e reutilizam lógica reativa estateful. Permitem compartilhar lógica complexa entre componentes sem duplicação.
- **Services**: Módulos que centralizam a comunicação com APIs externas, encapsulando detalhes de implementação como cabeçalhos HTTP, tratamento de erros e etc. Fornecem interfaces limpas para o resto da aplicação.
- **Stores**: Gerenciamento de estado global utilizando Pinia, com stores organizadas por domínio de negócio. Cada store encapsula estado, getters e actions relacionadas a uma entidade ou feature específica.
- **Types**: Definições de tipos TypeScript compartilhadas por toda a aplicação, garantindo consistência de dados e melhorando a developer experience com autocompletion.

**Justificativas:**

- **Composition API**: Oferece melhor organização de código e reutilização quando comparada à Options API, especialmente em componentes complexos. Facilita a extração de lógica para composables independentes e melhora a tipagem em TypeScript.
- **Type Safety**: O TypeScript proporciona tipagem forte em tempo de desenvolvimento, reduzindo erros comuns e facilitando refatorações. A integração com Vue 3 melhora a experiência de desenvolvimento com autocomplete e validações em tempo real.

## Lista de Bibliotecas de Terceiros Utilizadas

### Backend

- **fastify**: Framework web rápido e eficiente para Node.js
- **@prisma/client**: ORM moderno para TypeScript/JavaScript
- **bcryptjs**: Biblioteca para hash de senhas
- **jsonwebtoken**: Implementação de JSON Web Tokens para autenticação
- **zod**: Biblioteca de validação de schemas TypeScript-first
- **@fastify/cors**: Plugin para configuração de CORS
- **dotenv**: Carregamento de variáveis de ambiente
- **jest**: Framework de testes JavaScript
- **tsx**: Executor TypeScript para desenvolvimento
- **@types/\***: Definições de tipos para bibliotecas JavaScript

### Frontend

- **vue**: Framework progressivo para construção de interfaces
- **vuetify**: Framework de componentes Material Design para Vue.js
- **vue-router**: Roteamento oficial para Vue.js
- **pinia**: Store pattern/biblioteca de gerenciamento de estado
- **@vueuse/core**: Coleção de composables utilitários
- **axios**: Cliente HTTP baseado em promises
- **vite**: Build tool rápida para desenvolvimento frontend
- **typescript**: Superset tipado do JavaScript

### Infraestrutura

- **docker**: Containerização do banco de dados PostgreSQL.
- **postgresql**: Banco de dados relacional.

## O que Melhoraria se Tivesse Mais Tempo

### Backend

1. Testes

Aumentaria cobertura de testes unitários, especialmente nas camadas de service e repository
Implementar testes de integração. Adicionaria testes E2E com Playwright ou Cypress simulando fluxos completos do usuário
Implementar testes de carga/performance com k6 ou JMeter para verificar comportamento sob estresse

2. Documentação da API

Implementaria Swagger para documentação automática gerada a partir do código
Adicionar exemplos reais de requisições e respostas para cada endpoint

3. Segurança

Implementaria rate limiting para prevenir abusos e ataques de força bruta e sistema de refresh tokens com rotação para melhorar a segurança da autenticação. Realizar sanitização avançada de entrada para prevenir injeção de SQL.

4. Monitoramento

Configuraria logging estruturado com Winston e correlação de requests através de request IDs e health checks detalhados que verifiquem não só disponibilidade mas também saúde de dependências

5. Infraestrutura

Configurar pipeline CI/CD completo com GitHub Actions e containerização completa com Docker Compose.

### Frontend

1. Testes

Configuraria testes E2E com Cypress para simular interações reais do usuário.

2. Qualidade de Código

Configurar regras ESLint mais rigorosas adaptadas às particularidades do projeto e integraria Prettier para formatação automática com hooks de pre-commit.
