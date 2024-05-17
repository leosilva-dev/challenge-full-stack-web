# Decisões de arquitetura

A arquitetura deste projeto segue um padrão modularizado e separado em diferentes camadas, cada uma com sua responsabilidade.

## Backend

### Configuração e dependências

A camada de configuração, que inclui arquivos como `package.json`, `tsconfig.json`, `.env`, entre outros. Esses arquivos são essenciais para definir dependências, configurações do TypeScript, variáveis de ambiente e outras configurações necessárias para o funcionamento do projeto.

### Dados

Na camada de acesso ao banco de dados, a pasta `src/database` contém tudo relacionado ao Knex, incluindo a configuração de conexão (`connection.ts`), migrations para versionamento do esquema do banco de dados, e os modelos (`models`) que representam as tabelas do banco. Isso garante que todas as interações com o banco de dados estejam centralizadas e organizadas.

### Rotas

As rotas da aplicação são definidas na pasta `src/routes`. Cada entidade tem sua própria pasta, como `students`, onde estão os arquivos que definem as rotas e os handlers para cada ação (listar, criar, atualizar, deletar).

### Controllers

A lógica de negócio está na pasta `src/controllers`. Aqui, cada controller corresponde a uma rota específica e contém a lógica necessária para processar as requisições. Isso inclui validações, chamadas aos repositórios e formatação das respostas.

### Repositórios

A pasta `src/repositories` é responsável por definir interfaces e suas implementações para acesso aos dados. Isso permite uma abstração do acesso ao banco de dados e facilita a troca de implementações, caso necessário, além de facilitar a criação de mocks para testes.

### Testes

Os testes unitários estão na pasta `src/test`. Cada operação (criar, listar, atualizar, deletar) tem seus próprios testes, garantindo que todas as funcionalidades críticas da aplicação sejam verificadas regularmente.

### Utils

A pasta `src/utils` contém funções auxiliares que são usadas em várias partes do projeto.

### Middlewares

A pasta `src/middlewares` armazena middlewares que processam as requisições antes de chegarem aos controladores.

### Infra

A pasta `src/infra` é responsável pela configuração e gerenciamento da infraestrutura necessária para o desenvolvimento e execução do projeto. Ao definir um contêiner Docker para o PostgreSQL, o projeto se torna mais fácil de configurar, gerenciar e escalar, garantindo consistência e isolando dependências críticas.

## Frontend

### Configuração e dependências

A camada de configuração inclui arquivos como `package.json`, `tsconfig.json`, `vite.config.ts`, `.eslintrc.cjs`, entre outros. Esses arquivos são essenciais para definir dependências, configurações do TypeScript, configurações do Vite (ferramenta de build) e regras de linting.

### Assets

A pasta `src/assets` contém recursos estáticos utilizados na aplicação, como imagens, ícones e estilos. Por exemplo, `logo.svg` é um ícone que pode ser usado em várias partes da aplicação.

### Services

A pasta `src/services` contém serviços que lidam com a comunicação com APIs. Arquivos como `StudentsServices.ts` e `ApiConfigs.ts` encapsulam a lógica de chamadas HTTP, separando essa responsabilidade da camada de apresentação.

### Componentes

A pasta `src/components` contém componentes Vue reutilizáveis que formam a base da interface do usuário. Por exemplo, `MainLayout.vue` e `LayoutBase.vue` são componentes que definem layouts comuns usados em diferentes partes da aplicação.

### Views

A pasta `src/views` contém as views da aplicação, que são componentes Vue que representam páginas ou seções específicas da aplicação. Por exemplo, `HomeView.vue`, `StudentsDetailsView.vue` e `StudentsListView.vue` são vistas específicas para as páginas de início e de estudantes.

### Plugins

A pasta `src/plugins` contém configurações e inicializações de plugins como o `VuetifyTheme.ts` que configura o tema para o Vuetify.

### Roteamento

A pasta `src/router` contém a configuração de rotas da aplicação. O arquivo `index.ts` define as rotas e suas respectivas vistas, permitindo a navegação entre diferentes partes da aplicação.

# Bibliotecas de terceiros

## Backend

### Dependências

1. `@fastify/cors`: ^9.0.1

   - Middleware para habilitar CORS (Cross-Origin Resource Sharing) no Fastify, permitindo que a API seja acessada de diferentes origens.

2. `dotenv`: ^16.4.5

   - Carrega variáveis de ambiente de um arquivo `.env`, facilitando a configuração de variáveis sensíveis.

3. `eslint-config-prettier`: ^9.1.0

   - Desativa regras do ESLint que podem conflitar com o Prettier.

4. `eslint-plugin-prettier`: ^5.1.3

   - Integra o Prettier ao ESLint, permitindo a formatação de código automaticamente conforme as regras do Prettier.

5. `fastify`: ^4.26.2

   - Framework web rápido e de baixo overhead para Node.js, usado para criar servidores HTTP.

6. `knex`: ^3.1.0

   - Query builder SQL para Node.js, facilitando a construção de queries para diferentes bancos de dados.

7. `pg`: ^8.11.5

   - Cliente PostgreSQL para Node.js, usado para conectar e interagir com bancos de dados PostgreSQL.

8. `prettier`: ^3.2.5

   - Ferramenta de formatação de código, garantindo consistência e estilo no código.

9. `zod`: ^3.23.4
   - Biblioteca de validação e tipagem, usada para definir esquemas de dados e validar inputs.

### Dependências de Desenvolvimento

1. `@faker-js/faker`: ^8.4.1

   - Usada para gerar dados fictícios para testes.

2. `@types/jest`: ^29.5.12

   - Tipagens para o Jest, permitindo testes com TypeScript.

3. `@types/knex`: ^0.16.1

   - Tipagens para o Knex, fornecendo autocompletar e verificações de tipo.

4. `@types/node`: ^20.12.7

   - Tipagens para o Node.js, necessárias para usar APIs do Node com TypeScript.

5. `@types/pg`: ^8.11.4

   - Tipagens para o pg (node-postgres), usado para interação com o banco de dados PostgreSQL.

6. `@typescript-eslint/eslint-plugin`: ^7.4.0

   - Plugin ESLint para suportar TypeScript, ajudando a manter a qualidade do código.

7. `@typescript-eslint/parser`: ^7.4.0

   - Parser ESLint para TypeScript, necessário para interpretar corretamente o código TypeScript.

8. `eslint`: ^8.57.0

   - Ferramenta de linting para identificar e corrigir problemas no código.

9. `jest`: ^29.7.0

   - Framework de testes JavaScript para criar, organizar e executar testes.

10. `ts-jest`: ^29.1.2

    - Permite usar o Jest com TypeScript.

11. `ts-node`: ^10.9.2

    - Executa arquivos TypeScript diretamente no Node.js.

12. `tsx`: ^4.7.3

    - Ferramenta para compilar e executar arquivos TypeScript.

13. `typescript`: ^5.4.5
    - Superset de JavaScript que adiciona tipagem estática, melhorando a manutenção do código.

## Frontend

### Dependências

1. `@mdi/font`: ^7.4.47

   - Conjunto de ícones para serem usados na interface do usuário.

2. `axios`: ^1.6.8

   - Biblioteca para fazer requisições HTTP, usada para comunicação com APIs.

3. `vue`: ^3.4.21

   - Framework JavaScript progressivo para construção de interfaces de usuário.

4. `vue-router`: ^4.3.0
   - Biblioteca oficial de roteamento para Vue.js, utilizada para navegação entre páginas.

### Dependências de Desenvolvimento

1. `@mdi/js`: ^7.4.47

   - Ícones em formato de JavaScript, complementando `@mdi/font`.

2. `@rushstack/eslint-patch`: ^1.8.0

   - Patch para resolver problemas de integração do ESLint.

3. `@tsconfig/node20`: ^20.1.4

   - Configurações TypeScript para Node.js versão 20.

4. `@types/node`: ^20.12.5

   - Tipagens para Node.js, necessárias para usar APIs do Node com TypeScript.

5. `@types/vue`: ^2.0.0

   - Tipagens para Vue.js, permitindo o uso de TypeScript com Vue.

6. `@vitejs/plugin-vue`: ^5.0.4

   - Plugin para Vite que adiciona suporte a arquivos Vue.

7. `@vue/eslint-config-prettier`: ^9.0.0

   - Configuração do ESLint que desativa regras que conflitam com o Prettier.

8. `@vue/eslint-config-typescript`: ^13.0.0

   - Configuração do ESLint para suportar TypeScript em projetos Vue.

9. `@vue/tsconfig`: ^0.5.1

   - Configurações padrão de TypeScript para projetos Vue.

10. `eslint`: ^8.57.0

    - Ferramenta de linting para identificar e corrigir problemas no código.

11. `eslint-plugin-vue`: ^9.23.0

    - Plugin ESLint para Vue.js, adicionando regras específicas para projetos Vue.

12. `npm-run-all2`: ^6.1.2

    - Executa múltiplos scripts npm em paralelo ou em sequência.

13. `prettier`: ^3.2.5

    - Ferramenta de formatação de código, garantindo consistência e estilo no código.

14. `typescript`: ~5.4.0

    - Superset de JavaScript que adiciona tipagem estática, melhorando a robustez e a manutenção do código.

15. `vite`: ^5.2.8

    - Ferramenta de build e desenvolvimento rápida para projetos modernos de front-end.

16. `vite-plugin-vuetify`: ^2.0.3

    - Plugin para integrar Vuetify com Vite.

17. `vue-tsc`: ^2.0.11

    - Compilador de TypeScript para projetos Vue, garantindo que os componentes Vue sejam compilados corretamente.

18. `vuetify`: ^3.6.1
    - Framework de componentes de UI para Vue.js, oferecendo uma ampla gama de componentes prontos para uso.

# Melhorias

## Backend

### Autenticação e Autorização

Implementar autenticação baseada em tokens JWT para garantir a segurança das rotas protegidas.

### Monitoramento e Logging

Adicionar uma biblioteca de logging como Winston ou Pino para capturar e armazenar logs de maneira estruturada.

### Testes e Cobertura de Código

Adicionar testes de integração para garantir que diferentes partes do sistema funcionem corretamente juntas.

### Segurança

Implementar limitação de taxa para proteger a API contra abusos e ataques de força bruta.

### Internacionalização

Adicionar suporte para internacionalização, permitindo que a API suporte múltiplos idiomas e formatos regionais.

## Frontend

### Autenticação e Autorização

Implementar autenticação para garantir que apenas usuários autorizados tenham acesso a aplicação.

### Testes

Implementar testes end-to-end (E2E) com Cypress para validar fluxos completos da aplicação, além dissoUtilizar Storybook para desenvolver e testar componentes isoladamente.

### Suporte para Temas

Adicionar suporte para temas claro e escuro para melhorar a experiência do usuário.

# Requisitos obrigatórios que não foram entregues

Todos os requisitos obrigatórios foram entregues.
