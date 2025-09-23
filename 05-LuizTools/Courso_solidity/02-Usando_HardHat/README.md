# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat compile
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```
# Como configurar o solidity-coverage:
Instale o plugin: Execute o comando abaixo na raiz do seu projeto:

```shell
npm install --save-dev solidity-coverage
```
Configure o Hardhat: Normalmente, o plugin já funciona sem configurações adicionais. Caso precise de ajustes, consulte a documentação oficial.

# Execute a cobertura: Rode o seguinte comando:

```shell
npx hardhat coverage
```
- Isso gerará um relatório, geralmente em HTML, onde você poderá visualizar quais linhas do seu código foram executadas nos testes.

# possível abrir o relatório de cobertura gerado em HTML. Após executar o comando:
um relatório geralmente é gerado na pasta coverage, com o arquivo principal index.html. Para visualizá-lo, basta abrir esse arquivo no seu navegador. Se estiver usando Linux, você pode usar, por exemplo:
```shell
xdg-open coverage/index.html
```

# Como Rodar em uma (blochain) node local para teste que vai me gerar carteiras.

---> OBS: deixe o terminal rodando nao pode fechar.
```shell
npx hardhat node
```
# Agora vamos fazer a configuracao na metamesk pra que ela olhe pra esta rede.
Abra a metamask no seu navegador 
--> vai onde escolha a rede (em cima do lado esquedo) e clica adciona rede
--> ADICIONE EXEMPL: HardHat
--> ADICIONE o URL RPC (o endereco  JSON-RPC) http://127.0.0.1:8545/  que foi gerado no comeco.
--> ADICINE o ID da carteira 31337
--> ADICIONE o simbol ETH
--> SALVA

# Agora adciona umas das carteira na sua nova rede HardHat no metamask
--> clica em rede de teste em cima, adciona uma carteira
--> seleciona um private kay no termina e adiciona no meta mask

# configure o arquivo de deploy ignition para fazer o deploy do contrato na rede

# configure o arquivo hardhat.config e adicione a configuracao abaixo

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks:{
    local:{
        url: "http://127.0.0.1:8545",//Obs e o mesmo que adicionou na metamask
        chainId: 31337,//Obs e o mesmo que adicionou na metamask
        accounts:{
            mnemonic: "test test test test test test test test test test test junk"
        }
    }
  }
};

# Agora crie um script de deploy do arquivo que vou fazer o deploy no .json
"deploy": "npx hardhat ignition deploy ignition/modules/BookDataBase.ts --network local"

# rode o npm run deploy 

# PARA INTERAGIR PELO TERMINAL COM MEU CONTRATO DIRETAMENTE ADCIONA REMOVER COMO FAIS NO REMIX
# EXECUTE A LINHA DE CODIGOS ABEIXO

```shell
npx hardhat console
```
loguei com a conta principal na rede blockchaine local
agora tenho acesso a um objeto chamado "ethers"  se digita vai me dar os dados da rede
de todos os objetos que posso interaji com a blockchain.
```shell
ethers
```
- agora posso me conectar com meu contrato

```shell
const contract = await ethers.getContractAt("nome_do_contrato", "endereco do contrato que foi gerado 0x00000");
 ```

- agora posso adciona um boobk
```shell
await contract2.addBook({ title: "new book", year: 2023 });
```
- posso usar as funcoes

```shell
await contrack.books(1)
await contract.removeBook(1)
etc....
```

