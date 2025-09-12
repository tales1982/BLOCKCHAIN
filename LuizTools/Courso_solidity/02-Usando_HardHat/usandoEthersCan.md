# Utilizando o Ethers Scan para pode testa minhas funcoes meu contrato 
1--> estale o pluguin no meu projeto
```shell
npm i -D @nomiclabs/hardhat-etherscan

2--> adcione mais uma vareavel no .env API_KEY que vai ter o endereco da api do etherscan

3-->adcione no hardhat.config.ts
```shell
etherscan:{
    apiKey: process.env.API_KEY
}
```

# Agora vamos verificar o contrato que foi feito o deploy

```shell
npx hardhat verify --network sepolia endereco_do contrato