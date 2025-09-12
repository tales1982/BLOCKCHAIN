# Primeiro Projeto Hardhat
- Este projeto foi criado como parte do aprendizado de blockchain usando o Hardhat. Ele inclui a configuração inicial para trabalhar com contratos inteligentes e realizar deploys em um ambiente de desenvolvimento Ethereum.

## Requisitos
- Node.js (versão 14 >= 18)
- NPM (gerenciador de pacotes do Node.js)
- Hardhat (ferramenta de desenvolvimento para contratos inteligentes Ethereum)
## Passos para Inicializar o Projeto
1. Instalação do Hardhat
O projeto foi iniciado utilizando o Hardhat. Para instalar, execute o seguinte comando no terminal:

```bash
npm install --save-dev hardhat
```
- Durante a instalação, foram encontrados alguns avisos de pacotes obsoletos e vulnerabilidades de baixa severidade. Esses pacotes foram verificados e as correções necessárias foram aplicadas utilizando:

```bash
npm audit fix
```
2. Criação do Projeto
Após instalar o Hardhat, foi inicializado um projeto com o seguinte comando:

```bash
npx hardhat
```
- Este comando inicia o assistente do Hardhat, que ajuda a configurar o projeto. As seguintes opções foram escolhidas durante a configuração:

## Create a basic sample project
- Add a .gitignore file
- Install sample project's dependencies with npm

3. Instalação das Dependências
As dependências do projeto foram instaladas automaticamente pelo assistente do Hardhat. No entanto, você pode instalar manualmente executando:

```bash
npm install
```

4. Auditoria de Segurança
Durante a instalação das dependências, algumas vulnerabilidades foram detectadas e corrigidas. Para auditar e corrigir vulnerabilidades, utilize:

```bash
npm audit fix
```
Se necessário, utilize o seguinte comando para forçar a correção de todas as vulnerabilidades (incluindo breaking changes):

```bash
npm audit fix --force
```
#### Atenção: O uso de --force pode causar mudanças incompatíveis no projeto, exigindo ajustes manuais.

5. Rodando o Hardhat
Após a configuração, o ambiente Hardhat já está pronto para o desenvolvimento. Para compilar, testar e fazer deploy de contratos, você pode usar os seguintes comandos:

Compilar contratos:

```bash
npx hardhat compile
```
Testar contratos:

```bash
npx hardhat test
```
Deploy de contratos:

```bash
npx hardhat run scripts/deploy.js
```
- Estrutura do Projeto
- contracts/: Diretório onde os contratos inteligentes são armazenados.
- scripts/: Scripts de deploy e configuração.
- test/: Testes unitários para contratos inteligentes.
- hardhat.config.js: Arquivo de configuração do Hardhat.

#### Contribuições
-Se desejar contribuir para o projeto, sinta-se à vontade para abrir uma issue ou enviar um pull request.