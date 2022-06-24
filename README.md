# Amp-x-recipe-Api

Api che si occupa di gestire le ricette

## Installazione e avvio

### Installazione di tutte le dipendenze:
```sh
$ npm install
```

### Avvio delle api in locale:
```sh
$ npm run start-api
```

### Monitorare i log
```sh
$ npm run logs
```

### Eseguire le migrazioni
```sh
$ npm run mysql -- -e "create database app;" && npm run migrate
```

### Accesso al database
```sh
$ npm run mysql
```

### Esempi di chiamate

List

```sh
curl --location --request GET 'http://127.0.0.1:3000/v1/recipe'
```

Creazione

```sh
curl --location --request POST 'http://127.0.0.1:3000/v1/recipe' \
--form 'name="test123ss"' \
--form 'image=@"xyz.jpg"' \
--form 'ingredients="[\"ingredient1\"]"'
```

Modica

```sh
curl --location --request PATCH 'http://127.0.0.1:3000/v1/recipe/1' \
--form 'ingredients="[\"ingredient2\"]"'
```

