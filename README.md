# VOYAGER DANS LE TEMPS

## Le but de cette API

```Cette application a pour but de regrouper tout une famille, qui peut même inclure les grands oncles et tantes, les arrières petits cousins, etc...
Chacun pourra:
        * intégrer à l'application des photographies anciennes concernant la famille avec une information pour chacune.
        * regarder toutes les photographies et informations que tout le monde aurra enregistré.
        * mettre un commentaire à n'importe quelle photographies.
```

## Mes bonus:
```
  1. Créer une messagerie entre les utilisateurs d'une même famille.
  2. Créer un arbre généalogique de la famille à partir des donnéers des utilisateurs.
```

## Installation


### Dans le Terminal 'bash':

```
$ npm install

$ npm install -g @nestjs/cli

$ nest new back_voyager_dans_le_temps

$ npm install --save @nestjs/swagger @nestjs/config

$ npm install --save @nestjs/typeorm typeorm pg

$ npm install bcrypt

$ npm install -D @types/bcrypt

$ npm install --save @nestjs/passport passport passport-local

$ npm install --save-dev @types/passport-local

$ npm install --save @nestjs/jwt passport-jwt

$ npm install --save-dev @types/passport-jwt

$ npm i --save class-validator class-transformer

$ npm install --save @nestjs/serve-static

$ npm install -g typescript

$ npm i -D @types/multer


```
### Création des tables typeorm dans le Terminal 'bash':

```
$ nest g resource users

$ nest g resource profiles

$ nest g resource photographies

$ nest g resource comments

$  nest g resource families

$ nest g module auth

$ nest g service auth

$ nest g resource images

```

## upload an image

### Sending HTTP request

```
Once the server has started successfully, you can start sending HTTP requests to the three endpoints:

- GET request - `localhost:3000/:imgpath` - Get an uploaded image
- POST request - `localhost:3000` - Upload a single image
- POST request - `localhost:3000/multiple` - Upload multiple images at a time
```
