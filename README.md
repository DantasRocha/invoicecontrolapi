# Vibbra-invoiceControlApi

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

# invoiceControl

Projeto para controle de faturamento

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
Coleção do postman anexa no projeto invoicecontrol
cd..
cd invoicecontrol
VibbraTest.postman_collection.json

```

## Ecosistema da Api

```

Ide de desenvolvimento Visual Code
Linguagem typescript /NodeJS/sql
Docker-distribuição
Banco postegrer  (mas poderia seu oracle ou sqlserver)
Setup projeto IBM.loopback.io
Construção do banco Knex migrations and seeds
Distribuição - Docker
Autenticação e autorização: JWT
Documentação da Api - Swegger
Teste Api - Postman (Collection anexa)
TestLab para testes unitários
SQL nativo para construção de consultas no banco com agrupamento, join e aliás.
Mock para integração do Google firebase para SSO
Revisão de codigo foi utilisado a extensão  @typescript-eslint
Padroes de projeto:(Deu para explicitar )
    - Factory  src/service/factory.report.ts
    - Singleton src/services/singleton.ts
    - injeção de dependencia -> src/services/
    - Princípio de responsabilidade única -> src/services/


```

## Projetos / Dependecia

```
-invoicecontrolApi - Descritivo
-invoicecontrolApi - DevOps infra estrutura e banco de dados , docker
-invoicecontrolInfra - Api projeto

```

## Test

```
Anexo a coleção do postman : VibbraTest.postman_collection.json

```

## Trello atividades

```sh

#1 - Analise e entendimento da demanda
#2 - Dividir para conquistar - dividir o projeto em atividades via trello
#3 - Validar escopo e alinhar expectativa do solicitado com o entendimento do que sera entregue
#4 - Criar setup do projeto
#5 - Gerar o Diagrama classes
#6 - criar a base de dados
#7 - Criar os migrates
#8 - Criar os seeds
#9 - configurar o docker
#10- Gerar os modelos
#11- gerar as controller-limpar
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

## Video Projeto execultaldo

```sh
 https://www.youtube.com/watch?v=asBUKIQANP4

```
