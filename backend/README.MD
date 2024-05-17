# Instalação e Execução do projeto Backend

## Dependências

### Dependências Globais

É necessário possuir o Node.JS, Yarn e o Docker instalados globalmente em sua máquina.

- Node.JS
- Yarn
- Docker (com Docker Compose)

### Dependências Locais

Com o repositório clonado e as dependências globais instaladas, você pode instalar as dependências locais do projeto utilizando o Yarn:

```bash
yarn install
```

## Executar o Projeto

Certifique-se de que o Docker esteja em execução.
Execute o seguinte comando para iniciar o projeto:

```bash
yarn dev
```

Isso iniciará os serviços necessários, como o banco de dados e o servidor da aplicação, e irá expor a aplicação em:

http://localhost:3333/

### Observações:

Para parar todos os serviços, basta pressionar CTRL+C no terminal.
Você pode configurar o ambiente e outras variáveis de ambiente no arquivo .env.

## Testes

O projeto utiliza testes automatizados para garantir a qualidade do código.

Para rodar os testes, utilize o seguinte comando:

```bash
yarn test
```

Este comando irá executar todos os testes e garantir que o código esteja funcionando conforme o esperado.

Se preferir manter os testes rodando enquanto desenvolve, utilize o modo de observação com o seguinte comando:

```bash
yarn test:watch
```

Isso executará os testes continuamente e os reexecutará sempre que houver alterações no código.
