// merkletree.js
import crypto from "crypto";

// Função para gerar hash SHA256
function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

// Monta um nível da árvore juntando os pares
function buildLevel(nodes) {
  const level = [];
  for (let i = 0; i < nodes.length; i += 2) {
    const left = nodes[i];
    const right = nodes[i + 1] || left; // se faltar par, duplica o último
    level.push(sha256(left + right));
  }
  return level;
}

// ----- Exemplo -----
const transactions = ["Tx1", "Tx2", "Tx3", "Tx4"];
console.log("Transações:", transactions);

// Passo 1: gerar hash de cada transação
let currentLevel = transactions.map(t => sha256(t));
console.log("Hashes iniciais:", currentLevel);

// Passo 2: construir árvore até sobrar 1 nó (Merkle Root)
while (currentLevel.length > 1) {
  currentLevel = buildLevel(currentLevel);
  console.log("Nível:", currentLevel);
}

console.log("\n✅ Merkle Root:", currentLevel[0]);
