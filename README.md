# volunteer-platform-admin-front-end

## Requirements

* Node v14+
* Docker (optional)

## Frameworks

* [Vue v3](https://v3.vuejs.org/guide/introduction.html)
  * [Vue Router v4](https://next.router.vuejs.org/guide/)
  * [Vuex v4](https://next.vuex.vuejs.org/)
* [Bootstrap v5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)

## Environment Variables

Please see `.env.example` as an illustration of how to use these variables. For
local development, create a copy of `.env.example`, named `.env.development.local`,
and populate the variables accordingly.

| Variable                 | Description                                                     | Required?  |
| ------------------------ | --------------------------------------------------------------- | ---------- |
| VUE_APP_NAME             | The name of the volunteer platform application.                 | Yes        |
| VUE_APP_ORG_NAME         | The name of the organisation the volunteer platform belongs to. | Yes        |
| VUE_APP_BACKEND_ENDPOINT | The URL of the backend endpoint for the front-end application.  | Yes        |

## Developing via [Docker](https://www.docker.com/get-started/)

Install Docker and run:

```
docker-compose up --build
```

This will compile, serve and hot-reload for development via Docker.

## Developing via local [Node](https://nodejs.org/) / [nvm](https://github.com/nvm-sh/nvm/)

Install Node.js v14 and run:

```
npm install && npm run serve
```

This will compile, serve and hot-reload for development via local Node.js.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
