# Vue2 Demo

## Demo users

### User

-   email: user@vue2.test
-   password: test

### Admin

-   email: admin@vue2.test
-   password: test

# Vue2 Demo BACKEND

## Node JS Express

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

-   Node - v14.0.0
-   NPM - v7.0.0
-   Docker - v20.10.08 (optional)

### Installing

Go to the backend directory from terminal.

#### config setup

```
cp .env.example .env
```

Fill your enviroments.

#### install dependencies

```
npm install
```

#### docker setup

```
docker-compose up -d
```

#### database setup

```
npm run db-setup-fresh
```

#### optionals scripts

Queues

```
npm run queues
```

#### start node server

```
npm run dev
```

# Vue2 Demo FRONTEND

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

-   Node - v14.0.0
-   NPM - v7.0.0

### Installing

Go to the frontend-app directory from terminal.

#### config setup

```
cp .env.example .env
```

Fill your enviroments.

#### install dependencies

```
npm install
```

#### start node server

```
npm run dev
```
