# Node App Template

### To start dev environment:

#### Install dependencies:

```shell
yarn install
```

#### Configure .env file

```shell
cp .env.example .env
```
Then update values for your environment.

---

## How to run:

### Run HTTP server

```shell
yarn run dev:server:start:http
```

or

```shell
yarn build && node dist/app.js server:start
```

## Run HTTPS server

### Go to app config directory

```shell
cd src/config
```

### Generate a Private Key

```shell
openssl genrsa -out key.pem
```

### Create a CSR (Certificate Signing Request)

```shell
openssl req -new -key key.pem -out csr.pem
```

### Generate the SSL Certificate

```shell
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
```

#### !!! Update .env to provide correct path to your key & cert files:

```
APP_SSL_KEY_PATH=/<absolute_path>/src/config/key.pem
APP_SSL_CERT_PATH=/<absolute_path>/src/config/cert.pem
```

## Start https server

```shell
yarn run dev:server:start:https
```

or

```shell
yarn build && node dist/app.js server:start
```