// pos_simples.js
// Simulação bem simples de consenso Proof of Stake

// --- "Validadores" com quantidade de ETH em stake ---
const validators = [
  { name: "Alice", stake: 32 },
  { name: "Bob", stake: 64 },
  { name: "Carol", stake: 16 },
  { name: "Dave", stake: 128 }
];

// Função para escolher um propositor proporcional ao stake
function chooseProposer() {
  const totalStake = validators.reduce((sum, v) => sum + v.stake, 0);
  let r = Math.random() * totalStake;
  for (let v of validators) {
    if (r < v.stake) return v;
    r -= v.stake;
  }
}

// Função para simular um bloco
function proposeBlock(round) {
  const proposer = chooseProposer();
  console.log(`\n🔹 Rodada ${round}: Propositor escolhido -> ${proposer.name} (stake: ${proposer.stake} ETH)`);

  // Outros validadores atestam
  validators
    .filter(v => v.name !== proposer.name)
    .forEach(v => console.log(`  ✅ ${v.name} atesta o bloco`));

  console.log(`🏆 Bloco ${round} finalizado!\n`);
}

// Simular algumas rodadas
for (let i = 1; i <= 5; i++) {
  proposeBlock(i);
}
