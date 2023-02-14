# API Livros
Esse repositório hospeda uma API que tem como objetivo trabalhar com livros.

## Qual o propósito dessa API?
Essa API foi feita para você ter uma maneira de registrar, consultar, alterar, criar, reservar e excluir livros que você tenha no seu banco de dados.

## Requisitos para utilização das rotas
Você precisa estar autenticado para utilizar todas as rotas, exceto a rota de cadastro e login.

## Respostas da API
Todos os retornos da API vem como Application JSON.

## Tempo limite de utilização
O seu login tem uma duração de 60 segundos, após esse tempo é necessário fazer login novamente.

## Quais são as rotas existentes?
- https://localhost:3000/user - {"username": string, "password": string, "email": string, "type": string} - POST
- https://localhost:3000/login - {"username": string, "password": string} - POST
- https://localhost:3000/books - {"title": string, "author": string, "available": boolean} - POST
- https://localhost:3000/books - GET
- https://localhost:3000/books/available - GET
- https://localhost:3000/books/{id} - GET
- https://localhost:3000/books/{id} - PUT
- https://localhost:3000/books/available/{id} - PUT
- https://localhost:3000/books/{id} - DELETE

## Quais tecnologias foram usadas?
- Node.Js
- Nest.Js
- MongoDB
- Mongoose