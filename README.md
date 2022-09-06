# Vibbra-invoiceControlApi

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

# invoiceControl

Projeto para controle de faturamento

## Descrição

```

Ide de desenvolvimento Visual Code
Linguagem typescript /NodeJS/sql
Docker-distribuição
Banco postegrer  (mas poderia seu oracle ou sqlserver)
Setup projeto IBM.loopback.io
Construção do banco Knex migrations and seeds
Docker distribuição
Autenticação e autorização: JWT
Swegger para documentação
Postman para testar os endpoint
TestLab para testes unitários
SQL nativo para construção de consultas no banco com agrupamento, join e aliás.
Mock para integração do Google firebase para SSO
Revisão de codigo foi utilisado a extensão  @typescript-eslint
Padroes dw projeto:(Deu para explicitar )
    - Factory  src/service/factory.report.ts
    - Singleton src/services/singleton.ts
    - injeççao de dependencia -> src/services/
    - Princípio de responsabilidade única -> src/services/


Tive 2 dúvidas:
1- referente ao SSO onde usi um mock so para exemplificar
2-referente a um endpoint no escopo que faz referência a um archives, tomei como verdade que se tratava de uma tabela externa qu e contos a URL do arquivo.


```

## Descrição

```
invoicecontrolapi
invoicecontrolinfra

```

## Test

```
Anexo a coleção do postman : VibbraTest.postman_collection.json

```

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
yarn install
```

## Run the application

```sh
yarn start
```

## Tests

```sh
yarn test

```

## Run the application

```sh

#1 - Anale e entendimento da demanda
#2 - Dividir para conquistar - dividir o projeto em atividades via trello
#3 - Validar escopo e alinhar expectativa do solicitado com o entendimento do que sera entregue
#4 - Criar setup do projeto
#5 - Gerar o Diagrama classes
#6 - criar a base de dados
#7 - Criar os migrates
#8 - Criar os seeds
#9 - configurar o docker
#10- Gerar os modelos
#11- gear as controller-limpar
#13- Configurar jwt
#15- Gerar os testes unitarios
#16- Testar e refatorar
#17- Atualizar o Re
#18- Validações
#19-pipline
#20-sso
#21-relatorio
#22-seeds full para relatorios
#23-Gerar o versionamento
#24-ferramenta de teste
#25-Adicionar user_id no costomer
#26-Rel item por mes
#27-Alterar nome reports
#28-revenue-by-month,reports/total-revenue

```
