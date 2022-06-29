# Test Store


## Description

Server application for a store with an admin panel.
The application has the following features:

* __registration;__
* __authorization;__
* __adding items to database;__
* __items editing;__
* __purchase of items;__
* __viewing the history of purchase.__

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Routers
```text
AUTH
POST /api/auth/login - user login
POST /api/auth/register - user registration

USER
GET /api/user/:id - get user
PATCH /api/user - update user balance
DELETE  /api/user - delete user

ITEM
GET /api/item/my - get user items
GET /api/item/list - get all items
GET /api/item/:id - get item
POST /api/item/create - create item
PATCH /api/item/edit/:id - update item
GET /api/item/admin/list - get items for admin

PURCHASE
POST /api/purchase/buy/:id - buy item
GET /api/purchase/history - purchase history 
```

##Swagger

Swagger is available on the following route: **host/api/docs**