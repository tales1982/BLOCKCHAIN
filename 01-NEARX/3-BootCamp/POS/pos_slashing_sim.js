// pos_slashing_sim.js
// Simulação didática de Proof of Stake com slashing (NÃO é código real do Ethereum)

const ROUNDS = 8;

// Parâmetros (ajuste como quiser)
const REWARD_PROPOSER = 0.1;    // recompensa por propor bloco
const REWARD_ATTESTER = 0.02;   // recompensa por atestar bloco
const PENALTY_OFFLINE = 0.01;   // penalidade leve por ficar offline
const SLASH_DOUBLE_VOTE = 2;    // slashing por atestar duas vezes (equivocação)
const SLASH_DOUBLE_PROPOSAL = 4;// slashing por propor dois blocos no mesmo slot
const EJECT_THRESHOLD = 1;      // stake mínimo para continuar ativo (simplificado)

// Probabilidades (didáticas)
const PROB_OFFLINE = 0.15;          // 15% de chance de um validador estar offline no slot
const PROB_MALICIOUS_ATTEST = 0.05; // 5% de tentar atestar duas vezes
const PROB_MALICIOUS_PROPOSE = 0.03;// 3% de tentar propor dois blocos no mesmo slot

let validators = [
  { name: "Alice", stake: 32, active: true },
  { name: "Bob",   stake: 64, active: true },
  { name: "Carol", stake: 16, active: true },
  { name: "Dave",  stake: 96, active: true },
  { name: "Eve",   stake: 48, active: true },
];

// Utilitários
function totalActiveStake() {
  return validators.filter(v => v.active).reduce((s, v) => s + v.stake, 0);
}

function weightedChoice() {
  const pool = validators.filter(v => v.active && v.stake > 0);
  const total = pool.reduce((s, v) => s + v.stake, 0);
  let r = Math.random() * total;
  for (const v of pool) {
    if (r < v.stake) return v;
    r -= v.stake;
  }
  return pool[pool.length - 1];
}

function slash(v, amount, reason) {
  const before = v.stake;
  v.stake = Math.max(0, v.stake - amount);
  if (v.stake < EJECT_THRESHOLD) v.active = false;
  console.log(`  ⚠️ SLASH: ${v.name} -${amount} ETH (de ${before} → ${v.stake}) por ${reason}`);
}

function reward(v, amount, label) {
  v.stake += amount;
  console.log(`  💰 RECOMPENSA: ${v.name} +${amount} ETH (${label})`);
}

function printState() {
  const list = validators
    .map(v => `${v.name}:${v.stake.toFixed(2)}${v.active ? "" : " (ejetado)"}`)
    .join("  |  ");
  console.log(`  ≈ Estado: ${list}`);
}

for (let round = 1; round <= ROUNDS; round++) {
  console.log(`\n=== RODADA ${round} ===`);

  // Escolha do propositor (ponderada por stake)
  const proposer = weightedChoice();
  console.log(`🔹 Propositor: ${proposer.name} (stake: ${proposer.stake.toFixed(2)} ETH)`);

  // Proposição maliciosa? (double proposal)
  let proposerDidDoubleProposal = false;
  if (Math.random() < PROB_MALICIOUS_PROPOSE) {
    proposerDidDoubleProposal = true;
    slash(proposer, SLASH_DOUBLE_PROPOSAL, "double proposal (equivocação do propositor)");
  }

  // Atestações
  const activeStake = totalActiveStake();
  let attestedStake = 0;

  const attesters = validators.filter(v => v.active && v !== proposer);
  const alreadyAttested = new Set();

  for (const v of attesters) {
    // offline?
    if (Math.random() < PROB_OFFLINE) {
      // penalidade leve por inatividade
      v.stake = Math.max(0, v.stake - PENALTY_OFFLINE);
      if (v.stake < EJECT_THRESHOLD) v.active = false;
      console.log(`  💤 Offline: ${v.name} (-${PENALTY_OFFLINE} ETH inatividade)`);
      continue;
    }

    // atesta honestamente
    attestedStake += v.stake;
    reward(v, REWARD_ATTESTER, "atestar");

    // tentativa de double-vote?
    if (Math.random() < PROB_MALICIOUS_ATTEST) {
      // só slasha se já atestou nesse slot
      if (alreadyAttested.has(v.name)) {
        slash(v, SLASH_DOUBLE_VOTE, "double vote (equivocação do atestador)");
      } else {
        // simula um segundo atestado malicioso e slasha
        alreadyAttested.add(v.name);
        slash(v, SLASH_DOUBLE_VOTE, "double vote (equivocação do atestador)");
      }
    } else {
      alreadyAttested.add(v.name);
    }
  }

  // Finalização: precisa de ≥ 2/3 do stake ativo (regra simplificada)
  const threshold = (2 / 3) * activeStake;
  const finalized = attestedStake >= threshold && !proposerDidDoubleProposal;

  if (finalized) {
    console.log(`🏁 Bloco FINALIZADO (atestações: ${attestedStake.toFixed(2)} / limiar: ${threshold.toFixed(2)})`);
    reward(proposer, REWARD_PROPOSER, "propor bloco");
  } else {
    console.log(`⛔ Bloco NÃO finalizado (atestações: ${attestedStake.toFixed(2)} / limiar: ${threshold.toFixed(2)})`);
    if (proposerDidDoubleProposal) {
      console.log("   Motivo adicional: propositor com equivocação (double proposal).");
    }
  }

  // Ejetar quem caiu abaixo do limiar
  for (const v of validators) {
    if (v.active && v.stake < EJECT_THRESHOLD) {
      v.active = false;
      console.log(`  🚪 ${v.name} ejetado por stake < ${EJECT_THRESHOLD} ETH`);
    }
  }

  printState();
}

console.log("\n=== FIM ===");
