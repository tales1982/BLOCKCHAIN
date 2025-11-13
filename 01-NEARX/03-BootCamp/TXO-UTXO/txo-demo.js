// txo_demo.js
// Exemplo simples de TXO / UTXO em JavaScript

// "Banco de dados" em memória
let utxos = []; // lista de saídas não gastas

// Função para criar uma transação
function createTransaction(inputs, outputs) {
  console.log("\n--- Nova Transação ---");

  // Marcar os inputs como gastos (remover dos UTXOs)
  inputs.forEach(inputId => {
    const index = utxos.findIndex(u => u.id === inputId);
    if (index !== -1) {
      console.log(`Consumindo UTXO: ${utxos[index].id} (${utxos[index].amount} BTC)`);
      utxos.splice(index, 1);
    } else {
      console.log(`⚠️ Input ${inputId} não encontrado (talvez já gasto)`);
    }
  });

  // Criar novos outputs (TXOs)
  outputs.forEach(output => {
    const txo = {
      id: "txo_" + Math.random().toString(36).slice(2, 10),
      owner: output.owner,
      amount: output.amount
    };
    utxos.push(txo);
    console.log(`Novo TXO criado: ${txo.id} -> ${txo.owner} (${txo.amount} BTC)`);
  });

  console.log("\nUTXOs atuais:", utxos);
}

// --------- TESTE -----------

// 1️⃣ Alice recebe 1 BTC (primeiro UTXO da rede)
createTransaction([], [{ owner: "Alice", amount: 1.0 }]);

// 2️⃣ Alice envia 0.6 BTC para Bob e recebe troco de 0.4 BTC
// Usa o TXO anterior como input
const aliceFirstUTXO = utxos[0].id;
createTransaction(
  [aliceFirstUTXO],
  [
    { owner: "Bob", amount: 0.6 },
    { owner: "Alice", amount: 0.4 } // troco
  ]
);

// 3️⃣ Bob envia 0.5 BTC para Carol
const bobUTXO = utxos.find(u => u.owner === "Bob").id;
createTransaction(
  [bobUTXO],
  [
    { owner: "Carol", amount: 0.5 },
    { owner: "Bob", amount: 0.1 } // troco do Bob
  ]
);
