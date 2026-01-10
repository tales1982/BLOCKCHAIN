import { Web3 } from "web3";
import readline from "readline";

const web3 = new Web3();

const account = web3.eth.accounts.wallet.create(1)[0];
const privateKey = account.privateKey;
console.log("Chave Privada:", privateKey);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Função para solicitar a senha e encriptar a chave privada
const encryptPrivateKey = async () => {
  rl.question("Digite sua senha para encriptar: ", async (password) => {
    rl.close();

    const keystore = await web3.eth.accounts.encrypt(privateKey, password);
    console.log("Keystore Encriptado:", JSON.stringify(keystore, null, 2));

    // Chamar a função para decriptar
    decryptKeystore(keystore);
  });
};

// Função para solicitar a senha e decriptar a chave privada
const decryptKeystore = (keystore) => {
  const rlDecrypt = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rlDecrypt.question("Digite sua senha para decriptar: ", async (password) => {
    rlDecrypt.close();

    try {
      const decryptedAccount = await web3.eth.accounts.decrypt(keystore, password);
      console.log("Conta Decriptada:", decryptedAccount);
    } catch (error) {
      console.error("Erro ao decriptar a chave:", error.message);
    }
  });
};

cons0x4975335475faf2b75db302205b61f95c7a59dc73818e646ee6c05f77cc8db652

// Inicia o processo
encryptPrivateKey();