<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Technologies
 - Node js
 - Typescript
 - Nest js
 - Mongoose
 - Mongo db
 - Docker


## Installation

```bash
$ npm install
```

## Running the app

```bash
# start mongodb container
$ docker-compose -f docker/database/docker-compose.yml up -d

# development
$ npm run start:dev

# production mode
$ yarn run start:prod
```

## Access Plan
CRUD operations created using domain driven design

To create a accessPlan you need this dto, http POST:
```json
{
  "planName": "intermediario",
  "price": 25.00,
  "description": "plano intermediario com cafe e biscoitos",
  "receiver": {
    "name": "nicolas leonardo miranda lima",
    "cpf": "111.111.111-11",
    "pixKey": "asfnasjfasjkbfiubiubiubibaibfasuibfasuifaijd"
  }
}
```
```txt
route: http://localhost:3000/access-plan/create
```

To update a accessPlan you need this dto with the accessPlan id, http PATCH:
```json
{
  "planName": "intermediario",
  "price": 25.00,
  "description": "plano intermediario com cafe e biscoitos",
  "receiver": {
    "name": "nicolas leonardo miranda lima",
    "cpf": "111.111.111-11",
    "pixKey": "asfnasjfasjkbfiubiubiubibaibfasuibfasuifaijd"
  }
}
```
```bash
route: http://localhost:3000/access-plan/update/65468b310588f03866b3df58
```

To delete a accessPlan you need the accessPlan id, http DELETE:
```bash
route: http://localhost:3000/access-plan/delete/65468b310588f03866b3df58
```

To find an access Plan you need only plans name or nothing to list all plans, http GET:
```bash
route: http://localhost:3000/access-plan/find?name=intermediario (findByName)
route: http://localhost:3000/access-plan/ (findAll)
```


## Signature
CRUD operations created using domain driven design

To create a signature you need this dto, http POST:
```json
{
  "clientName": "nicolas leonardo miranda lima",
  "planId": "6546bf6e64d98f2d227cf110"
}
```
```txt
route: http://localhost:3000/signature/create
```

To update a signature you need this dto with the signature id, http PATCH:
```json
{
  "planId": "6546bf6e64d98f2d227cf110",
  "clientName": "nicolas leonardo miranda lima",
  "pendingPayment": false
}
```
```bash
route: http://localhost:3000/signature/update/6546c0a822422c9dad06ea02
```

To delete a accessPlan you need the signature id, http DELETE:
```bash
route: http://localhost:3000/signature/delete/6546c0a822422c9dad06ea02
```

To find the signature you need id of signature or nothing to list all plans, http GET:
```bash
route: http://localhost:3000/signature/find?id=6546c0a822422c9dad06ea02 (findByName)
route: http://localhost:3000/signature/ (findAll)
```

