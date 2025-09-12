**Passo 1: Criar o projeto Next.js**

npx create-next-app frontend

**Passo 2: Entre na pasta:**

cd frontend

**Passo 3: Instalar dependências**

npm install ethers axios @reduxjs/toolkit react-redux

* **ethers** : pra conversar com o contrato
* **axios** : pra chamar nossa API interna de ABI/endereço
* **@reduxjs/toolkit & react-redux** : pra gerenciar globalmente nome e idade

**Passo 4: Configurar variáveis de ambiente**

NEXT_PUBLIC_CONTRACT_ADDRESS=0xSEU_CONTRATO_SEPOLIA

**Passo 5: Estrutura de pastas**

simple-signature-frontend/
├─ pages/
│  ├─ _app.js
│  ├─ index.js
│  └─ api/
│     └─ contract.js
├─ store/
│  ├─ index.js
│  └─ userSlice.js
├─ .env.local
├─ package.json

**Passo 6: Configurar o Redux**
