# AppWeb3
## Instalando as dependências !

usarei o NPM, pode ussar o YARN fica a sua escolharfg

crie uma pasta AppWeb3

```bash
cd AppWeb3
´´´

```bash
npm create vite@latest
```
✔ Project name: … client
✔ Select a framework: › React
✔ Select a variant: › JavaScript

agora execute :
e estale as dependecias restantes:
```bash
  cd client
  npm install
  npm install @tailwindcss/forms eth-revert-reason ethers framer-motion react react-dom react-icons
  npm run dev
```
## Vamos usar uma ferramenta tailwindcss pra facilitar o uso do css

```bash
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init
```

## Agora navegue ate pasta smart_contract

```bash
  cd../smart_contract
```
- crie um json vazio

```bash
  npm install -y
```
- retorne para o cliente

```bash
  cd../client
```
# Vamos criar os components