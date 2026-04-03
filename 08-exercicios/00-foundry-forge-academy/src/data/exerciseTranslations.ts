interface ExercisePT {
  challenge: string;
  hints: string[];
  commonMistakes: string[];
  bestPractices: string[];
  checklist: string[];
}

export const exerciseTranslationsPT: Record<string, ExercisePT> = {
  "beginner-01": {
    challenge: `Crie um contrato chamado \`HelloFoundry\` seguindo estes passos:\n\n**Passo 1:** No terminal, execute \`forge init hello-foundry\` e entre na pasta com \`cd hello-foundry\`\n\n**Passo 2:** Abra \`src/Counter.sol\`, apague tudo e comece do zero\n\n**Passo 3:** Na primeira linha, adicione a licença: \`// SPDX-License-Identifier: MIT\`\n\n**Passo 4:** Na segunda linha, adicione a versão do compilador: \`pragma solidity ^0.8.19;\`\n\n**Passo 5:** Declare o contrato: \`contract HelloFoundry { }\`\n\n**Passo 6:** Dentro do contrato, declare uma variável pública com seu nome:\n\`string public message = "SeuNome";\`\n\n**Passo 7:** Adicione a função de leitura:\n\`\`\`solidity\nfunction getMessage() public view returns (string memory) {\n    return message;\n}\n\`\`\`\n\n**Passo 8:** Compile com \`forge build\` — deve aparecer "Compiler run successful"\n\n✅ **Critério de sucesso:** \`forge build\` compila sem erros e sem warnings`,
    hints: [
      "Use `string public` para declarar uma variável string pública",
      "Uma função `view` não modifica o estado",
      "A palavra-chave `memory` é necessária para retornar strings",
    ],
    commonMistakes: [
      "Esquecer a diretiva pragma",
      "Usar uma versão incompatível do Solidity",
      "Omitir o identificador de licença SPDX (gera aviso do compilador)",
      "Esquecer a palavra-chave `memory` no retorno de strings",
    ],
    bestPractices: [
      "Sempre especifique um identificador de licença",
      "Use um pragma com caret (^) para flexibilidade de versão menor",
      "Mantenha um contrato por arquivo",
      "Nomeie o arquivo igual ao contrato",
    ],
    checklist: [
      "Contrato compila com `forge build`",
      "Tem identificador de licença SPDX",
      "Tem diretiva pragma",
      "Variável pública é acessível",
      "Função retorna o valor correto",
    ],
  },

  "beginner-02": {
    challenge: `Crie um contrato chamado \`DataTypes\` que demonstra os principais tipos:\n\n**Passo 1:** Declare uma variável de estado pública:\n\`uint256 public age = 25;\`\n\n**Passo 2:** Declare uma variável imutável (definida só no constructor):\n\`address public immutable owner;\`\n\n**Passo 3:** Declare um booleano:\n\`bool public isActive = true;\`\n\n**Passo 4:** Declare uma constante (zero custo de gas, fica no bytecode):\n\`uint256 public constant VERSION = 1;\`\n\n**Passo 5:** Crie o constructor que define o owner:\n\`\`\`solidity\nconstructor() {\n    owner = msg.sender;\n}\n\`\`\`\n\n**Passo 6:** Crie uma função que retorna todos os valores de uma vez (tupla):\n\`\`\`solidity\nfunction getInfo() public view returns (uint256, address, bool, uint256) {\n    return (age, owner, isActive, VERSION);\n}\n\`\`\`\n\n**Passo 7:** Compile com \`forge build\`\n\n✅ **Critério de sucesso:** \`getInfo()\` retorna \`(25, endereço_do_deployer, true, 1)\``,
    hints: [
      "Use `constant` para valores conhecidos em tempo de compilação",
      "Use `immutable` para valores definidos uma única vez no constructor",
      "`msg.sender` retorna o endereço do chamador",
    ],
    commonMistakes: [
      "Usar `uint` sem especificar bits (use uint256 explicitamente)",
      "Não usar constant/immutable quando possível (desperdiça gas)",
      "Confundir storage e memory para tipos de referência",
    ],
    bestPractices: [
      "Use uint256 explicitamente em vez de uint",
      "Marque constantes de tempo de compilação como `constant`",
      "Marque valores definidos no constructor como `immutable`",
      "Use nomes de variáveis significativos",
    ],
    checklist: [
      "Todos os tipos de dados compilam corretamente",
      "Proprietário é definido via constructor",
      "Constante não ocupa slot de storage",
      "Função retorna todos os valores",
    ],
  },

  "beginner-03": {
    challenge: `Crie um contrato \`Calculator\` explorando todos os tipos de visibilidade:\n\n**Passo 1:** Declare a variável privada (não acessível de fora):\n\`uint256 private result;\`\n\n**Passo 2:** Função pública que modifica o estado (custa gas):\n\`\`\`solidity\nfunction add(uint256 x) public {\n    result += x;\n}\n\`\`\`\n\n**Passo 3:** Função que subtrai com proteção contra underflow:\n\`\`\`solidity\nfunction subtract(uint256 x) public {\n    require(result >= x, "Underflow: resultado ficaria negativo");\n    result -= x;\n}\n\`\`\`\n\n**Passo 4:** Função \`pure\` — não lê nem modifica estado, só opera com os parâmetros:\n\`\`\`solidity\nfunction multiply(uint256 a, uint256 b) public pure returns (uint256) {\n    return a * b;\n}\n\`\`\`\n\n**Passo 5:** Função \`view\` — lê o estado mas não modifica:\n\`\`\`solidity\nfunction getResult() public view returns (uint256) {\n    return result;\n}\n\`\`\`\n\n**Passo 6:** Tente chamar \`result\` diretamente de fora — vai falhar porque é \`private\`\n\n✅ **Critério de sucesso:** \`multiply\` não consegue acessar \`result\` (puro), \`forge build\` sem erros`,
    hints: [
      "Funções privadas convencionalmente começam com underscore",
      "Funções external gastam menos gas quando chamadas externamente",
      "Funções pure não podem acessar nenhuma variável de estado",
    ],
    commonMistakes: [
      "Tornar todas as funções públicas (risco de segurança)",
      "Usar public quando external seria suficiente",
      "Marcar uma função que lê estado como pure em vez de view",
    ],
    bestPractices: [
      "Use a visibilidade mais restritiva possível",
      "Prefixe funções private/internal com underscore",
      "Use external para funções chamadas apenas externamente",
      "Use pure para funções auxiliares/matemáticas",
    ],
    checklist: [
      "Cada tipo de visibilidade é usado corretamente",
      "Função private não pode ser chamada externamente",
      "Função pure não acessa estado",
      "Função view não modifica estado",
    ],
  },

  "beginner-04": {
    challenge: `Crie um contrato \`Vault\` (cofre de ETH) com constructor e validações:\n\n**Passo 1:** Declare as variáveis de estado:\n\`\`\`solidity\naddress public owner;\nuint256 public minDeposit;\n\`\`\`\n\n**Passo 2:** Crie o constructor que recebe o mínimo de depósito como parâmetro:\n\`\`\`solidity\nconstructor(uint256 _min) {\n    require(_min > 0, "Minimo deve ser maior que zero");\n    owner = msg.sender;\n    minDeposit = _min;\n}\n\`\`\`\n\n**Passo 3:** Função \`deposit()\` — note o \`payable\` para receber ETH:\n\`\`\`solidity\nfunction deposit() public payable {\n    require(msg.value >= minDeposit, "Abaixo do deposito minimo");\n}\n\`\`\`\n\n**Passo 4:** Função \`withdraw()\` — somente o owner:\n\`\`\`solidity\nfunction withdraw() public {\n    require(msg.sender == owner, "Apenas o dono pode sacar");\n    require(address(this).balance > 0, "Saldo zero");\n    payable(owner).transfer(address(this).balance);\n}\n\`\`\`\n\n**Passo 5:** Função de consulta:\n\`function getBalance() public view returns (uint256) { return address(this).balance; }\`\n\n**Passo 6:** No Anvil, tente depositar menos que o mínimo — deve reverter com a mensagem de erro\n\n✅ **Critério de sucesso:** Apenas o owner saca, depósitos abaixo do mínimo são rejeitados`,
    hints: [
      "Use `msg.value` para verificar o ETH enviado com a transação",
      "Use o modificador `payable` para funções que recebem ETH",
      "Argumentos do constructor são passados na implantação",
    ],
    commonMistakes: [
      "Não validar argumentos do constructor",
      "Esquecer que require consome todo o gas antes do Solidity 0.8",
      "Não usar mensagens de erro descritivas no require",
    ],
    bestPractices: [
      "Sempre valide entradas com require",
      "Inclua mensagens de erro descritivas",
      "Valide os parâmetros do constructor",
      "Verifique endereço zero ao definir o proprietário",
    ],
    checklist: [
      "Constructor define o estado corretamente",
      "Require bloqueia entradas inválidas",
      "Mensagens de erro são descritivas",
      "Funções restritas ao proprietário estão protegidas",
    ],
  },

  "beginner-05": {
    challenge: `Crie um contrato \`GradingSystem\` com lógica de notas completa:\n\n**Passo 1:** Crie a função principal com validação de entrada:\n\`\`\`solidity\nfunction getGrade(uint256 score) public pure returns (string memory) {\n    require(score <= 100, "Nota invalida: deve ser entre 0 e 100");\n    ...\n}\n\`\`\`\n\n**Passo 2:** Dentro da função, implemente a lógica de notas com if/else if/else:\n\`\`\`solidity\nif (score >= 90) return "A";\nelse if (score >= 80) return "B";\nelse if (score >= 70) return "C";\nelse if (score >= 60) return "D";\nelse return "F";\n\`\`\`\n\n**Passo 3:** Crie a função de aprovação (retorna bool):\n\`\`\`solidity\nfunction passed(uint256 score) public pure returns (bool) {\n    require(score <= 100, "Nota invalida");\n    return score >= 60;\n}\n\`\`\`\n\n**Passo 4:** Crie uma função que retorna os dois valores juntos (tupla):\n\`\`\`solidity\nfunction getGradeAndStatus(uint256 score)\n    public pure returns (string memory grade, bool pass)\n{\n    grade = getGrade(score);\n    pass = passed(score);\n}\n\`\`\`\n\n**Passo 5:** Teste manualmente os casos limítrofes: 0, 59, 60, 69, 70, 79, 80, 89, 90, 100\n\n✅ **Critério de sucesso:** \`getGrade(75)\` → "C", \`passed(60)\` → true, \`passed(59)\` → false`,
    hints: [
      "Retorne `string memory` para tipos string",
      "Use múltiplos if/else para os intervalos de notas",
      "Um retorno booleano simples funciona para aprovado/reprovado",
    ],
    commonMistakes: [
      "Não cobrir todos os casos extremos",
      "Condicionais aninhados complexos (mantenha simples)",
      "Esquecer que cada ramificação adiciona custo de gas",
    ],
    bestPractices: [
      "Mantenha condicionais simples e legíveis",
      "Valide entradas antes de ramificar",
      "Prefira retornos antecipados para reduzir aninhamento",
      "Use require para pré-condições, if/else para lógica",
    ],
    checklist: [
      "Todos os intervalos de nota estão cobertos",
      "Casos extremos (0, 100) funcionam corretamente",
      "Função aprovado/reprovado é precisa",
      "Validação de entrada impede notas inválidas",
    ],
  },

  "beginner-06": {
    challenge: `Crie um contrato \`NumberList\` com gerenciamento completo de array:\n\n**Passo 1:** Declare o array dinâmico:\n\`uint256[] public numbers;\`\n\n**Passo 2:** Função para adicionar:\n\`function add(uint256 n) public { numbers.push(n); }\`\n\n**Passo 3:** Função para remover por índice usando o padrão **swap-and-pop** (O(1), sem gaps):\n\`\`\`solidity\nfunction remove(uint256 index) public {\n    require(index < numbers.length, "Indice fora dos limites");\n    numbers[index] = numbers[numbers.length - 1]; // copia o último para cá\n    numbers.pop(); // remove o último (agora duplicado)\n}\n\`\`\`\n⚠️ **Atenção:** a ordem dos elementos muda! [10,20,30] remove(0) → [30,20]\n\n**Passo 4:** Função para retornar todos:\n\`function getAll() public view returns (uint256[] memory) { return numbers; }\`\n\n**Passo 5:** Função de tamanho:\n\`function length() public view returns (uint256) { return numbers.length; }\`\n\n**Passo 6:** Função para verificar existência (loop):\n\`\`\`solidity\nfunction exists(uint256 value) public view returns (bool) {\n    for (uint256 i = 0; i < numbers.length; i++) {\n        if (numbers[i] == value) return true;\n    }\n    return false;\n}\n\`\`\`\n\n✅ **Critério de sucesso:** \`remove()\` não deixa gaps, \`exists()\` encontra valores corretamente`,
    hints: [
      "Use o padrão swap-and-pop para remoção eficiente",
      "Lembre-se que arrays são indexados a partir de zero",
      "Retornar arrays dinâmicos funciona com a palavra-chave `memory`",
    ],
    commonMistakes: [
      "Deletar elementos de array com `delete` (deixa um espaço com valor zero)",
      "Não verificar limites do array antes de acessar",
      "Iterar sobre arrays muito grandes (limite de gas)",
    ],
    bestPractices: [
      "Use swap-and-pop para remoção O(1)",
      "Sempre verifique os limites do array",
      "Evite loops ilimitados sobre arrays",
      "Considere mappings para grandes conjuntos de dados",
    ],
    checklist: [
      "Adicionar e remover funcionam corretamente",
      "Verificação de limites está implementada",
      "Padrão swap-and-pop é utilizado",
      "Função de comprimento é precisa",
    ],
  },

  "beginner-07": {
    challenge: `Crie um contrato \`Phonebook\` (lista telefônica) com mapping completo:\n\n**Passo 1:** Declare o mapping e o contador:\n\`\`\`solidity\nmapping(string => string) public entries;\nuint256 public count;\n\`\`\`\n\n**Passo 2:** Função \`add\` — valida que o nome não existe antes de adicionar:\n\`\`\`solidity\nfunction add(string memory name, string memory phone) public {\n    require(bytes(entries[name]).length == 0, "Nome ja existe");\n    entries[name] = phone;\n    count++;\n}\n\`\`\`\n\n**Passo 3:** Função \`update\` — valida que o nome JÁ existe antes de atualizar:\n\`\`\`solidity\nfunction update(string memory name, string memory phone) public {\n    require(bytes(entries[name]).length > 0, "Nome nao encontrado");\n    entries[name] = phone;\n}\n\`\`\`\n\n**Passo 4:** Função \`remove\` — deleta e decrementa o contador:\n\`\`\`solidity\nfunction remove(string memory name) public {\n    require(bytes(entries[name]).length > 0, "Nome nao encontrado");\n    delete entries[name];\n    count--;\n}\n\`\`\`\n\n**Passo 5:** Função \`lookup\`:\n\`function lookup(string memory name) public view returns (string memory) { return entries[name]; }\`\n\n**Passo 6:** Tente listar TODAS as entradas — perceba que é impossível sem um array auxiliar (mappings não são iteráveis)\n\n✅ **Critério de sucesso:** \`add\` rejeita duplicatas, \`remove\` mantém o \`count\` correto`,
    hints: [
      "Use `bytes(str).length == 0` para verificar strings vazias",
      "Delete uma entrada de mapping com `delete mapping[chave]`",
      "Rastreie o total manualmente, pois mappings não têm comprimento",
    ],
    commonMistakes: [
      "Tentar iterar sobre um mapping",
      "Assumir que valores deletados não existem (voltam ao valor padrão)",
      "Não rastrear o tamanho do mapping separadamente",
    ],
    bestPractices: [
      "Combine mappings com arrays quando precisar de iteração",
      "Use mappings aninhados para dados multi-dimensionais",
      "Rastreie o tamanho do mapping com um contador",
      "Verifique existência antes de operar",
    ],
    checklist: [
      "Adicionar, atualizar, remover funcionam corretamente",
      "Contador rastreia entradas com precisão",
      "Busca retorna valores corretos",
      "Casos extremos são tratados",
    ],
  },

  "beginner-08": {
    challenge: `Construa o Counter dApp completo do zero ao deploy:\n\n**Passo 1 — Contrato:** Salve o código de exemplo em \`src/Counter.sol\` (o exemplo já é o contrato completo)\n\n**Passo 2 — Testes:** Crie \`test/Counter.t.sol\`:\n\`\`\`solidity\ncontract CounterTest is Test {\n    Counter counter;\n    function setUp() public { counter = new Counter(); }\n    function testIncrement() public {\n        counter.increment();\n        assertEq(counter.count(), 1);\n    }\n    function testDecrementAtZero() public {\n        vm.expectRevert("Cannot go below zero");\n        counter.decrement();\n    }\n    function testReset() public {\n        counter.increment();\n        counter.increment();\n        counter.reset();\n        assertEq(counter.count(), 0);\n    }\n}\n\`\`\`\n\n**Passo 3 — Execute os testes:** \`forge test -vvv\`\n\n**Passo 4 — Deploy no Anvil:**\nTerminal 1: \`anvil\`\nTerminal 2: \`forge create src/Counter.sol:Counter --rpc-url http://localhost:8545 --private-key 0xac0974...\`\n\n**Passo 5 — Interação via cast:**\n\`cast call <ADDR> "getCount()" --rpc-url http://localhost:8545\`\n\`cast send <ADDR> "increment()" --rpc-url http://localhost:8545 --private-key 0xac0974...\`\n\n**Passo 6 — Frontend (conceitual):** Descreva em comentários como você conectaria via ethers.js: criar BrowserProvider, obter Signer, instanciar Contract com a ABI de \`out/Counter.sol/Counter.json\`, chamar \`increment()\` e escutar o evento \`CountChanged\`\n\n✅ **Critério de sucesso:** Todos os testes passam, deploy funciona, cast incrementa o contador`,
    hints: [
      "Eventos ajudam o frontend a detectar mudanças de estado",
      "A ABI é gerada na pasta `out/` após `forge build`",
      "Use a classe Contract do ethers.js para interagir via JS",
    ],
    commonMistakes: [
      "Esquecer de emitir eventos (o frontend não detecta mudanças)",
      "Não tratar o underflow no decremento",
      "Codificar endereços de contrato diretamente (use variáveis de ambiente)",
    ],
    bestPractices: [
      "Sempre emita eventos para mudanças de estado",
      "Escreva testes completos antes do deploy",
      "Use variáveis de ambiente para endereços",
      "Trate todos os casos extremos no contrato",
    ],
    checklist: [
      "Contrato compila e todos os testes passam",
      "Eventos são emitidos corretamente",
      "Decremento trata o caso zero",
      "Contrato faz deploy no Anvil",
      "ABI está acessível para o frontend",
    ],
  },

  "beginner-09": {
    challenge: `Construa o MessageBoard (quadro de mensagens on-chain) completo:\n\n**Passo 1 — Struct e storage:** Defina o struct \`Message\` com \`sender\`, \`content\` e \`timestamp\`, e declare \`Message[] public messages\`\n\n**Passo 2 — Função \`postMessage\`** com validações obrigatórias:\n\`\`\`solidity\nfunction postMessage(string memory _content) public {\n    require(bytes(_content).length > 0, "Mensagem vazia");\n    require(bytes(_content).length <= 280, "Mensagem muito longa");\n    messages.push(Message(msg.sender, _content, block.timestamp));\n    messageCount[msg.sender]++;\n    emit MessagePosted(msg.sender, _content, block.timestamp);\n}\n\`\`\`\n\n**Passo 3 — Função de leitura individual:**\n\`\`\`solidity\nfunction getMessage(uint256 index) public view returns (address, string memory, uint256) {\n    require(index < messages.length, "Indice invalido");\n    Message memory m = messages[index];\n    return (m.sender, m.content, m.timestamp);\n}\n\`\`\`\n\n**Passo 4 — Função das últimas N mensagens** (veja o exemplo para o código)\n\n**Passo 5 — Testes:** escreva testes para: postar mensagem, ler mensagem, postar vazia (deve reverter), postar com mais de 280 chars (deve reverter)\n\n**Passo 6 — Deploy e interação:** deploy no Anvil, use cast send para postar, cast call para ler\n\n✅ **Critério de sucesso:** mensagens guardam sender e timestamp, textos vazios são rejeitados`,
    hints: [
      "Use structs para agrupar dados relacionados",
      "Eventos com parâmetros `indexed` podem ser filtrados",
      "O frontend pode filtrar eventos por remetente",
    ],
    commonMistakes: [
      "Não limitar o tamanho das mensagens (risco de DoS)",
      "Retornar todas as mensagens de uma vez (limite de gas)",
      "Não usar parâmetros indexados nos eventos",
    ],
    bestPractices: [
      "Limite o tamanho de strings para evitar abusos",
      "Use paginação para grandes conjuntos de dados",
      "Indexe parâmetros de eventos para filtragem eficiente",
      "Armazene o mínimo de dados on-chain",
    ],
    checklist: [
      "Mensagens são armazenadas corretamente",
      "Eventos emitem com dados corretos",
      "Função de mensagens recentes funciona",
      "Validação de entrada é completa",
      "Testes cobrem todas as funções",
    ],
  },

  "beginner-10": {
    challenge: `Construa o TodoList on-chain com dados isolados por usuário:\n\n**Passo 1 — Estruturas de dados:**\n\`\`\`solidity\nstruct Todo { uint256 id; string content; bool completed; uint256 createdAt; }\nmapping(address => Todo[]) private userTodos;\nmapping(address => uint256) private nextId;\n\`\`\`\n\n**Passo 2 — Criar todo:**\n\`\`\`solidity\nfunction createTodo(string memory _content) public {\n    require(bytes(_content).length > 0, "Conteudo vazio");\n    uint256 id = nextId[msg.sender]++;\n    userTodos[msg.sender].push(Todo(id, _content, false, block.timestamp));\n    emit TodoCreated(msg.sender, id, _content);\n}\n\`\`\`\n\n**Passo 3 — Alternar status (toggle):**\n\`\`\`solidity\nfunction toggleTodo(uint256 _index) public {\n    require(_index < userTodos[msg.sender].length, "Indice invalido");\n    userTodos[msg.sender][_index].completed = !userTodos[msg.sender][_index].completed;\n}\n\`\`\`\n\n**Passo 4 — Deletar com swap-and-pop** (veja exemplo acima)\n\n**Passo 5 — Leitura:**\n\`function getTodos() public view returns (Todo[] memory) { return userTodos[msg.sender]; }\`\n\n**Passo 6 — Teste de isolamento:** crie todos como Alice (vm.prank), leia como Bob — deve retornar array vazio\n\n✅ **Critério de sucesso:** dados de diferentes usuários são 100% isolados, CRUD completo funciona`,
    hints: [
      "Use `msg.sender` como chave para storage por usuário",
      "Swap-and-pop para remoção O(1)",
      "Retorne o array completo para listas pequenas; pagine para grandes",
    ],
    commonMistakes: [
      "Não isolar dados por usuário",
      "Usar `delete` em elementos de array (deixa espaços)",
      "Não emitir eventos para sincronização com frontend",
    ],
    bestPractices: [
      "Isole dados do usuário com mapping(address => ...)",
      "Use eventos para todas as mudanças de estado",
      "Implemente remoção swap-and-pop",
      "Mantenha dados on-chain mínimos",
    ],
    checklist: [
      "Todas as operações CRUD funcionam",
      "Isolamento de dados por usuário verificado",
      "Eventos emitem corretamente",
      "Delete usa swap-and-pop",
      "Testes cobrem todos os caminhos",
    ],
  },

  "intermediate-01": {
    challenge: `Crie um \`TaskManager\` com enum de prioridade e struct de tarefa:\n\n**Passo 1 — Enum e Struct:**\n\`\`\`solidity\nenum Priority { Low, Medium, High, Critical }\nstruct Task {\n    uint256 id;\n    string title;\n    address assignee;\n    Priority priority;\n    bool completed;\n}\n\`\`\`\n\n**Passo 2 — Storage:**\n\`Task[] public tasks;\`\n\n**Passo 3 — Criar tarefa:**\n\`\`\`solidity\nfunction createTask(string memory _title, address _assignee, Priority _priority) public {\n    tasks.push(Task(tasks.length, _title, _assignee, _priority, false));\n}\n\`\`\`\n\n**Passo 4 — Completar tarefa** (use \`storage\`, não \`memory\`!):\n\`\`\`solidity\nfunction completeTask(uint256 _id) public {\n    require(_id < tasks.length, "Tarefa nao existe");\n    Task storage task = tasks[_id]; // storage = referência real\n    task.completed = true;\n}\n\`\`\`\n⚠️ Se usar \`Task memory task\`, a mudança NÃO é salva!\n\n**Passo 5 — Ler tarefa:**\n\`function getTask(uint256 _id) public view returns (Task memory) { return tasks[_id]; }\`\n\n**Passo 6 — Filtrar por prioridade:** itere o array e retorne apenas tarefas com a prioridade pedida\n\n✅ **Critério de sucesso:** \`Task storage\` modifica corretamente, \`Task memory\` não modifica (teste os dois!)`,
    hints: [
      "Enums podem ser comparados com operadores > < (são uint8 internamente)",
      "Use a palavra-chave `storage` ao modificar campos de struct diretamente",
      "Cópias de struct em memory são mais baratas para operações somente leitura",
    ],
    commonMistakes: [
      "Esquecer `storage` vs `memory` ao modificar structs",
      "Não validar transições de enum",
      "Criar structs aninhados excessivamente complexos",
    ],
    bestPractices: [
      "Use enums para máquinas de estado finito",
      "Mantenha structs focados e mínimos",
      "Use referências storage para modificações, memory para leituras",
      "Valide transições de estado",
    ],
    checklist: [
      "Valores de enum estão definidos corretamente",
      "Struct armazena todos os campos necessários",
      "Operações CRUD funcionam",
      "Transições de estado são validadas",
    ],
  },

  "intermediate-02": {
    challenge: `Crie um \`PaymentProcessor\` com eventos completos e testes de emissão:\n\n**Passo 1 — Declare os eventos** com parâmetros indexed para filtragem eficiente:\n\`\`\`solidity\nevent PaymentSent(address indexed from, address indexed to, uint256 amount);\nevent PaymentReceived(address indexed receiver, uint256 amount);\nevent RefundIssued(address indexed to, uint256 amount);\n\`\`\`\n\n**Passo 2 — Mapping de saldos:**\n\`mapping(address => uint256) public balances;\`\n\n**Passo 3 — Função \`send\`** que emite DOIS eventos:\n\`\`\`solidity\nfunction send(address to) public payable {\n    require(msg.value > 0, "Envie ETH");\n    balances[to] += msg.value;\n    emit PaymentSent(msg.sender, to, msg.value);\n    emit PaymentReceived(to, msg.value);\n}\n\`\`\`\n\n**Passo 4 — Função \`refund\`** seguindo o padrão CEI:\n\`\`\`solidity\nfunction refund(address to, uint256 amount) public {\n    require(balances[to] >= amount, "Saldo insuficiente");\n    balances[to] -= amount; // Effect ANTES da interação\n    emit RefundIssued(to, amount);\n    (bool sent,) = payable(to).call{value: amount}("");\n    require(sent, "Falha na transferencia");\n}\n\`\`\`\n\n**Passo 5 — Teste de evento com vm.expectEmit:**\n\`\`\`solidity\nfunction testSendEmitsEvent() public {\n    vm.expectEmit(true, true, false, true);\n    emit PaymentSent(address(this), bob, 1 ether);\n    processor.send{value: 1 ether}(bob);\n}\n\`\`\`\n\n✅ **Critério de sucesso:** \`vm.expectEmit\` verifica eventos corretamente, parâmetros indexed funcionam`,
    hints: [
      "Até 3 parâmetros podem ser indexados",
      "Use `vm.expectEmit` nos testes Foundry para verificar eventos",
      "Eventos são mais baratos que storage para dados históricos",
    ],
    commonMistakes: [
      "Não indexar parâmetros importantes",
      "Indexar parâmetros demais (máximo 3)",
      "Emitir eventos com ordem de parâmetros incorreta",
      "Não emitir eventos para mudanças críticas de estado",
    ],
    bestPractices: [
      "Indexe endereços e IDs para filtragem",
      "Emita eventos para cada mudança de estado",
      "Use nomes descritivos para eventos",
      "Mantenha parâmetros de eventos mínimos",
    ],
    checklist: [
      "Eventos declarados com parâmetros corretos",
      "Parâmetros indexados permitem filtragem",
      "Eventos emitidos nos pontos corretos",
      "Testes verificam emissão de eventos",
    ],
  },

  "intermediate-03": {
    challenge: `Crie um \`SecureContract\` com 3 modifiers diferentes empilhados:\n\n**Passo 1 — Variáveis de estado:**\n\`\`\`solidity\naddress public owner;\nbool public paused;\nmapping(address => uint256) public lastAction;\nconstructor() { owner = msg.sender; }\n\`\`\`\n\n**Passo 2 — Modifier \`onlyOwner\`:**\n\`\`\`solidity\nmodifier onlyOwner() {\n    require(msg.sender == owner, "Nao e o dono");\n    _; // aqui o corpo da função é executado\n}\n\`\`\`\n\n**Passo 3 — Modifier \`whenNotPaused\`:**\n\`\`\`solidity\nmodifier whenNotPaused() {\n    require(!paused, "Contrato pausado");\n    _;\n}\n\`\`\`\n\n**Passo 4 — Modifier com parâmetro \`rateLimited\`:**\n\`\`\`solidity\nmodifier rateLimited(uint256 cooldown) {\n    require(block.timestamp >= lastAction[msg.sender] + cooldown, "Aguarde o cooldown");\n    _;\n    lastAction[msg.sender] = block.timestamp; // registra DEPOIS da execução\n}\n\`\`\`\n\n**Passo 5 — Funções usando os modifiers:**\n\`\`\`solidity\nfunction pause() public onlyOwner { paused = true; }\nfunction unpause() public onlyOwner { paused = false; }\n// Os 3 modifiers juntos:\nfunction sensitiveAction() public onlyOwner whenNotPaused rateLimited(60) {\n    // ação importante\n}\n\`\`\`\n\n**Passo 6 — Testes:** use \`vm.prank(alice)\` para chamar como Alice (não owner) — deve reverter. Use \`vm.warp(block.timestamp + 61)\` para passar o cooldown\n\n✅ **Critério de sucesso:** modifiers empilhados funcionam em ordem, rate limit bloqueia chamadas repetidas`,
    hints: [
      "O placeholder `_;` executa o corpo da função",
      "Modifiers podem receber parâmetros",
      "Empilhe modifiers: `function f() public onlyOwner whenNotPaused`",
    ],
    commonMistakes: [
      "Esquecer o `_;` no corpo do modifier",
      "Lógica complexa em modifiers (mantenha simples)",
      "Não considerar a ordem de execução dos modifiers",
    ],
    bestPractices: [
      "Mantenha modifiers focados em uma única verificação",
      "Use nomes descritivos para modifiers",
      "Evite mudanças de estado em modifiers",
      "Combine modifiers para segurança em camadas",
    ],
    checklist: [
      "Modifiers restringem acesso corretamente",
      "Múltiplos modifiers funcionam juntos",
      "Reverts têm mensagens claras",
      "Testes verificam todos os caminhos de acesso",
    ],
  },

  "intermediate-04": {
    challenge: `Crie uma hierarquia de contratos: Interface → Abstrato → Concreto:\n\n**Passo 1 — Interface** (só assinaturas, sem implementação):\n\`\`\`solidity\ninterface IVault {\n    function deposit() external payable;\n    function withdraw(uint256 amount) external;\n    function getBalance() external view returns (uint256);\n}\n\`\`\`\n\n**Passo 2 — Contrato abstrato** (lógica compartilhada, sem implementar a interface):\n\`\`\`solidity\nabstract contract BaseVault is IVault {\n    address public owner;\n    event Deposited(address indexed user, uint256 amount);\n    event Withdrawn(address indexed user, uint256 amount);\n    constructor() { owner = msg.sender; }\n    modifier onlyOwner() { require(msg.sender == owner, "Not owner"); _; }\n}\n\`\`\`\n\n**Passo 3 — Contrato concreto** (implementa tudo com \`override\`):\n\`\`\`solidity\ncontract ETHVault is BaseVault {\n    mapping(address => uint256) public balances;\n    function deposit() external payable override {\n        balances[msg.sender] += msg.value;\n        emit Deposited(msg.sender, msg.value);\n    }\n    function withdraw(uint256 amount) external override {\n        require(balances[msg.sender] >= amount, "Saldo insuficiente");\n        balances[msg.sender] -= amount;\n        payable(msg.sender).transfer(amount);\n        emit Withdrawn(msg.sender, amount);\n    }\n    function getBalance() external view override returns (uint256) {\n        return balances[msg.sender];\n    }\n}\n\`\`\`\n\n**Passo 4 — Teste via interface:** use \`IVault vault = new ETHVault();\` para verificar conformidade\n\n✅ **Critério de sucesso:** ETHVault compila com todos os \`override\`, testes passam usando o tipo \`IVault\``,
    hints: [
      "Interfaces só podem ter assinaturas de funções",
      "Contratos abstratos usam `virtual` para funções substituíveis",
      "Use a palavra-chave `override` nos contratos filhos",
    ],
    commonMistakes: [
      "Problemas de herança diamante (use linearização C3)",
      "Esquecer `virtual` nas funções base",
      "Não implementar todas as funções da interface",
    ],
    bestPractices: [
      "Mantenha árvores de herança rasas",
      "Use interfaces para contratos externos",
      "Use contratos abstratos para lógica compartilhada",
      "Siga o padrão Checks-Effects-Interactions",
    ],
    checklist: [
      "Interface está definida corretamente",
      "Contrato abstrato compila",
      "Contrato concreto implementa todas as funções",
      "Cadeia de herança funciona corretamente",
    ],
  },

  "intermediate-05": {
    challenge: `Organize um projeto real com arquitetura de múltiplos arquivos:\n\n**Passo 1 — Crie a estrutura de pastas:**\n\`\`\`\nsrc/\n  interfaces/\n    IVault.sol\n  base/\n    Ownable.sol\n  Vault.sol\n\`\`\`\n\n**Passo 2 — \`src/interfaces/IVault.sol\`:**\n\`\`\`solidity\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.19;\ninterface IVault {\n    function deposit() external payable;\n    function withdraw(uint256 amount) external;\n}\n\`\`\`\n\n**Passo 3 — \`src/base/Ownable.sol\`:**\n\`\`\`solidity\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.19;\nabstract contract Ownable {\n    address public owner;\n    constructor() { owner = msg.sender; }\n    modifier onlyOwner() { require(msg.sender == owner); _; }\n}\n\`\`\`\n\n**Passo 4 — \`src/Vault.sol\`** com imports nomeados (preferido sobre wildcard):\n\`\`\`solidity\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.19;\nimport {IVault} from "./interfaces/IVault.sol";\nimport {Ownable} from "./base/Ownable.sol";\ncontract Vault is Ownable, IVault {\n    function deposit() external payable override {}\n    function withdraw(uint256 amount) external override onlyOwner {}\n}\n\`\`\`\n\n**Passo 5 — Instale a OpenZeppelin:**\n\`forge install OpenZeppelin/openzeppelin-contracts\`\nAdicione ao \`foundry.toml\`: \`remappings = ["@openzeppelin/=lib/openzeppelin-contracts/"]\`\n\n**Passo 6:** Substitua seu Ownable pelo da OZ: \`import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";\`\n\n**Passo 7:** Execute \`forge build\` — todos os arquivos devem compilar\n\n✅ **Critério de sucesso:** forge build compila projeto com múltiplos arquivos e imports da OpenZeppelin`,
    hints: [
      "Importações nomeadas: `import {Contrato} from './caminho'`",
      "Use remappings no foundry.toml para caminhos limpos",
      "Um contrato por arquivo é a convenção",
    ],
    commonMistakes: [
      "Importações wildcard poluindo o namespace",
      "Importações circulares",
      "Caminhos de importação incorretos com remappings do Foundry",
    ],
    bestPractices: [
      "Use importações nomeadas para clareza",
      "Agrupe arquivos por tipo: interfaces, base, implementações",
      "Mantenha caminhos de importação relativos e curtos",
      "Use remappings para bibliotecas externas",
    ],
    checklist: [
      "Importações nomeadas usadas em todo o projeto",
      "Estrutura de arquivos é lógica",
      "Sem dependências circulares",
      "Remappings configurados corretamente",
    ],
  },

  "intermediate-06": {
    challenge: `Implemente um sistema RBAC (Role-Based Access Control) com 3 papéis:\n\n**Passo 1 — Defina os papéis como constantes bytes32:**\n\`\`\`solidity\nbytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");\nbytes32 public constant EDITOR_ROLE = keccak256("EDITOR_ROLE");\nbytes32 public constant VIEWER_ROLE = keccak256("VIEWER_ROLE");\n\`\`\`\n\n**Passo 2 — Mapping de permissões:**\n\`mapping(bytes32 => mapping(address => bool)) private _roles;\`\n\n**Passo 3 — Constructor:** concede ADMIN_ROLE ao deployer\n\n**Passo 4 — Modifier:**\n\`\`\`solidity\nmodifier onlyRole(bytes32 role) {\n    require(_roles[role][msg.sender], "Sem permissao");\n    _;\n}\n\`\`\`\n\n**Passo 5 — Gerenciamento de papéis** (somente ADMIN):\n\`\`\`solidity\nfunction grantRole(bytes32 role, address account) public onlyRole(ADMIN_ROLE) {\n    _roles[role][account] = true;\n    emit RoleGranted(role, account);\n}\nfunction revokeRole(bytes32 role, address account) public onlyRole(ADMIN_ROLE) {\n    _roles[role][account] = false;\n    emit RoleRevoked(role, account);\n}\n\`\`\`\n\n**Passo 6 — Funções protegidas por papel:**\n\`\`\`solidity\nfunction editContent(string memory content) public onlyRole(EDITOR_ROLE) { ... }\nfunction readContent() public view onlyRole(VIEWER_ROLE) returns (string memory) { ... }\n\`\`\`\n\n**Passo 7 — Testes:** Admin concede EDITOR para Alice → Alice edita (sucesso). Bob sem papel tenta editar → reverter\n\n✅ **Critério de sucesso:** cada papel tem acesso correto, endereços sem papel são rejeitados`,
    hints: [
      "Use `keccak256` para criar identificadores de papéis",
      "Mappings aninhados: `mapping(bytes32 => mapping(address => bool))`",
      "Apenas o Admin deve poder conceder/revogar papéis",
    ],
    commonMistakes: [
      "Não proteger funções de gerenciamento de papéis",
      "Admin único sem backup (adicione o papel a múltiplos endereços)",
      "Não emitir eventos para mudanças de papéis",
    ],
    bestPractices: [
      "Use constantes bytes32 para nomes de papéis",
      "Emita eventos para todas as mudanças de papéis",
      "Considere hierarquias de papéis",
      "Sempre tenha uma forma de recuperar o acesso de admin",
    ],
    checklist: [
      "Papéis estão definidos corretamente",
      "Concessão e revogação funcionam corretamente",
      "Verificações de papel protegem as funções",
      "Eventos rastreiam todas as mudanças",
    ],
  },

  "intermediate-07": {
    challenge: `Escreva testes Foundry abrangentes para um contrato Vault usando todos os cheatcodes:\n\n**Passo 1 — Setup do teste:**\n\`\`\`solidity\ncontract VaultTest is Test {\n    Vault vault;\n    address alice = makeAddr("alice");\n    address bob = makeAddr("bob");\n    function setUp() public {\n        vault = new Vault();\n        vm.deal(alice, 10 ether); // dá ETH para alice\n        vm.deal(bob, 10 ether);\n    }\n}\n\`\`\`\n\n**Passo 2 — Teste de depósito (happy path):**\n\`\`\`solidity\nfunction testDeposit() public {\n    vm.prank(alice); // próxima chamada vem de alice\n    vault.deposit{value: 1 ether}();\n    assertEq(vault.balances(alice), 1 ether);\n}\n\`\`\`\n\n**Passo 3 — Teste de revert (acesso negado):**\n\`\`\`solidity\nfunction testWithdrawNotOwner() public {\n    vm.prank(bob);\n    vm.expectRevert("Not owner"); // próxima chamada DEVE reverter\n    vault.withdraw(1 ether);\n}\n\`\`\`\n\n**Passo 4 — Teste com tempo:**\n\`\`\`solidity\nfunction testTimeLock() public {\n    vm.warp(block.timestamp + 7 days); // avança 7 dias\n    // teste de saque após lock period\n}\n\`\`\`\n\n**Passo 5 — Teste de evento:**\n\`\`\`solidity\nfunction testDepositEmitsEvent() public {\n    vm.expectEmit(true, false, false, true);\n    emit Deposited(alice, 1 ether);\n    vm.prank(alice);\n    vault.deposit{value: 1 ether}();\n}\n\`\`\`\n\n**Passo 6 — Fuzz test:**\n\`\`\`solidity\nfunction testFuzz_Deposit(uint256 amount) public {\n    amount = bound(amount, 1 wei, 10 ether); // sem bound quebra!\n    vm.deal(alice, amount);\n    vm.prank(alice);\n    vault.deposit{value: amount}();\n    assertEq(vault.balances(alice), amount);\n}\n\`\`\`\n\n✅ **Critério de sucesso:** \`forge test -vvv\` mostra todos os testes passando incluindo o fuzz test`,
    hints: [
      "`makeAddr()` cria endereços de teste com labels",
      "`vm.deal(addr, valor)` fornece ETH a um endereço",
      "`bound(valor, min, max)` restringe entradas de fuzz",
    ],
    commonMistakes: [
      "Não testar condições de revert",
      "Esquecer que setUp() é executado antes de cada teste",
      "Não usar bound() para entradas de fuzz",
    ],
    bestPractices: [
      "Teste caminhos felizes E casos de falha",
      "Use nomes descritivos: testXxx_QuandoYyy_DeveZzz",
      "Use fuzz testing para entradas numéricas",
      "Verifique eventos com vm.expectEmit",
    ],
    checklist: [
      "Testes do caminho feliz passam",
      "Condições de revert são testadas",
      "Teste de fuzz incluído",
      "Cheatcodes usados corretamente",
    ],
  },

  "intermediate-08": {
    challenge: `Escreva um script de deploy para Token + Vault e interaja via cast:\n\n**Passo 1 — Inicie o Anvil:**\n\`anvil\`\nAnote a primeira conta: endereço + private key\n\n**Passo 2 — Crie \`script/Deploy.s.sol\`:**\n\`\`\`solidity\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.19;\nimport "forge-std/Script.sol";\nimport {Token} from "../src/Token.sol";\nimport {Vault} from "../src/Vault.sol";\n\ncontract DeployScript is Script {\n    function run() external {\n        vm.startBroadcast();\n        Token token = new Token();\n        Vault vault = new Vault(address(token));\n        console.log("Token:", address(token));\n        console.log("Vault:", address(vault));\n        vm.stopBroadcast();\n    }\n}\n\`\`\`\n\n**Passo 3 — Dry-run** (sem --broadcast, só simula):\n\`forge script script/Deploy.s.sol --rpc-url http://localhost:8545\`\n\n**Passo 4 — Deploy real** (com --broadcast):\n\`forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --private-key <KEY> --broadcast\`\n\n**Passo 5 — Interaja via cast:**\n\`\`\`bash\n# Leitura (gratuita)\ncast call <TOKEN_ADDR> "totalSupply()" --rpc-url http://localhost:8545\n\n# Escrita (custa gas)\ncast send <TOKEN_ADDR> "transfer(address,uint256)" <DEST> 100 \\\n  --rpc-url http://localhost:8545 --private-key <KEY>\n\`\`\`\n\n✅ **Critério de sucesso:** dois contratos deployados em ordem de dependência, cast call retorna dados corretos`,
    hints: [
      "Use `vm.startBroadcast()` / `vm.stopBroadcast()` para transações",
      "Faça deploy na ordem das dependências",
      "Use console.log para exibir endereços dos contratos implantados",
    ],
    commonMistakes: [
      "Esquecer o flag --broadcast (sem ele é apenas simulação)",
      "Chave privada errada para contas Anvil",
      "Não iniciar o Anvil antes de fazer deploy",
    ],
    bestPractices: [
      "Sempre teste scripts no Anvil primeiro",
      "Registre endereços dos contratos implantados",
      "Use variáveis de ambiente para chaves privadas",
      "Mantenha scripts idempotentes quando possível",
    ],
    checklist: [
      "Script compila e executa",
      "Contratos fazem deploy com sucesso",
      "Endereços são registrados",
      "Interações com cast funcionam",
    ],
  },

  "intermediate-09": {
    challenge: `Construa o VotingSystem completo com testes de todos os cenários:\n\n**Passo 1 — Contrato:** implemente o VotingSystem do exemplo (registro, proposta, voto, resultado)\n\n**Passo 2 — Testes obrigatórios:**\n\n\`testRegisterVoter\` — admin registra Alice, verifica \`registeredVoters[alice] == true\`\n\n\`testOnlyAdminCanRegister\` — Bob tenta registrar → \`vm.expectRevert("Not admin")\`\n\n\`testCreateProposal\` — admin cria proposta com duração 1 dia, verifica deadline = \`block.timestamp + 1 days\`\n\n\`testVote\` — Alice registrada vota a favor → \`forVotes == 1\`\n\n\`testDoubleVote\` — Alice tenta votar duas vezes → \`vm.expectRevert\`\n\n\`testVoteAfterDeadline\`:\n\`\`\`solidity\nfunction testVoteAfterDeadline() public {\n    // cria proposta, registra alice\n    vm.warp(block.timestamp + 2 days); // passa o prazo!\n    vm.prank(alice);\n    vm.expectRevert("Voting ended");\n    voting.vote(0, true);\n}\n\`\`\`\n\n\`testGetResult\` — após deadline com maioria a favor → \`passed == true\`\n\n**Passo 3 — Deploy e teste manual no Anvil:**\n- Registre 2 eleitores com cast send\n- Crie uma proposta\n- Vote com ambas as contas\n- Leia o resultado\n\n✅ **Critério de sucesso:** todos os 7 testes passam, incluindo o teste de tempo com vm.warp`,
    hints: [
      "Use `vm.warp()` nos testes para simular passagem de tempo",
      "Mappings dentro de structs não podem ser retornados de funções",
      "Use eventos para o frontend rastrear votos em tempo real",
    ],
    commonMistakes: [
      "Não verificar o prazo de votação",
      "Permitir voto duplo",
      "Não separar o registro de eleitores da votação",
    ],
    bestPractices: [
      "Use prazos baseados em tempo com block.timestamp",
      "Emita eventos para todas as mudanças de estado",
      "Separe claramente funções de admin e eleitor",
      "Considere requisitos de quórum",
    ],
    checklist: [
      "Registro funciona corretamente",
      "Propostas têm prazos",
      "Voto duplo é impedido",
      "Resultados são precisos",
      "Eventos são abrangentes",
    ],
  },

  "intermediate-10": {
    challenge: `Construa o RecordManager CRUD completo com soft delete:\n\n**Passo 1 — Contrato:** implemente o RecordManager do exemplo com todos os modifiers\n\n**Passo 2 — Testes CRUD (escreva todos os 7):**\n\n\`testCreate\` — cria registro, verifica id=0, title correto, active=true, creator=msg.sender\n\n\`testRead\` — cria e lê, verifica todos os campos\n\n\`testUpdate\` — cria, atualiza title, verifica novo title e que \`updatedAt != createdAt\`\n\n\`testSoftDelete\` — cria, deleta, verifica \`active==false\` e \`activeCount\` diminuiu\n\n\`testReadDeletedRecord\`:\n\`\`\`solidity\nfunction testReadDeletedRecord() public {\n    uint256 id = manager.create("Titulo", "Dados");\n    manager.remove(id);\n    vm.expectRevert("Record not found");\n    manager.read(id);\n}\n\`\`\`\n\n\`testUpdateNotCreator\`:\n\`\`\`solidity\nfunction testUpdateNotCreator() public {\n    uint256 id = manager.create("Titulo", "Dados");\n    vm.prank(bob); // bob não é o criador\n    vm.expectRevert("Not creator");\n    manager.update(id, "Novo titulo", "Novos dados");\n}\n\`\`\`\n\n\`testDeleteNotCreator\` — mesma lógica\n\n**Passo 3 — Interação no Anvil:**\ncrie 3 registros → leia o registro 1 → delete o registro 0 → tente ler o 0 (deve falhar)\n\n✅ **Critério de sucesso:** soft delete preserva dados mas bloqueia acesso, todos os 7 testes passam`,
    hints: [
      "Soft delete (definir active=false) é mais seguro que remover dados",
      "Use modifiers para verificações comuns",
      "Paginação pode ser feita off-chain consultando eventos",
    ],
    commonMistakes: [
      "Deletar dados permanentemente (sem recuperação)",
      "Não verificar existência do registro antes de operar",
      "Não restringir atualizações ao criador do registro",
    ],
    bestPractices: [
      "Use soft delete para recuperabilidade",
      "Empilhe modifiers para validação limpa",
      "Rastreie timestamps para trilhas de auditoria",
      "Use eventos para sincronização com frontend",
    ],
    checklist: [
      "Todas as operações CRUD funcionam",
      "Controle de acesso é aplicado",
      "Soft delete preserva dados",
      "Eventos rastreiam todas as mudanças",
      "Testes cobrem todas as operações",
    ],
  },

  "advanced-01": {
    challenge: `Implemente o padrão Ownable avançado com transferência em 2 etapas e custom errors:\n\n**Passo 1 — Declare custom errors** (fora do contrato, no topo do arquivo):\n\`\`\`solidity\nerror NotOwner(address caller, address owner);\nerror ZeroAddress();\nerror InsufficientBalance(uint256 requested, uint256 available);\n\`\`\`\n\n**Passo 2 — Variáveis privadas:**\n\`address private _owner; address private _pendingOwner;\`\n\n**Passo 3 — Modifier com custom error** (mais eficiente que require string):\n\`\`\`solidity\nmodifier onlyOwner() {\n    if (msg.sender != _owner) revert NotOwner(msg.sender, _owner);\n    _;\n}\n\`\`\`\n\n**Passo 4 — Transferência em 2 etapas** (previne envio acidental para endereço errado):\n\`\`\`solidity\nfunction transferOwnership(address newOwner) public onlyOwner {\n    if (newOwner == address(0)) revert ZeroAddress();\n    _pendingOwner = newOwner; // só nomeia, não transfere ainda\n    emit OwnershipTransferStarted(_owner, newOwner);\n}\nfunction acceptOwnership() public {\n    if (msg.sender != _pendingOwner) revert NotOwner(msg.sender, _pendingOwner);\n    address old = _owner;\n    _owner = _pendingOwner;\n    _pendingOwner = address(0);\n    emit OwnershipTransferred(old, _owner);\n}\n\`\`\`\n\n**Passo 5 — Treasury herdando AdvancedOwnable:**\n\`\`\`solidity\ncontract Treasury is AdvancedOwnable {\n    function withdraw(uint256 amount) public onlyOwner {\n        if (amount > address(this).balance)\n            revert InsufficientBalance(amount, address(this).balance);\n        payable(owner()).transfer(amount);\n    }\n}\n\`\`\`\n\n**Passo 6 — Compare gas:** crie versão com \`require("string")\` e compare com \`--gas-report\`\n\n✅ **Critério de sucesso:** custom errors economizam ~200 gas por revert, 2-step transfer funciona`,
    hints: [
      "Erros customizados: `error MeuErro(param);` depois `revert MeuErro(valor);`",
      "Transferência em dois passos evita perda acidental de propriedade",
      "Teste erros customizados com `abi.encodeWithSelector`",
    ],
    commonMistakes: [
      "Transferência de propriedade em um único passo (arriscado)",
      "Usar strings em require em vez de erros customizados (desperdiça gas)",
      "Não emitir eventos para mudanças de propriedade",
    ],
    bestPractices: [
      "Sempre use transferência de propriedade em dois passos",
      "Erros customizados para todos os reverts",
      "Inclua dados relevantes nos parâmetros de erro",
      "Considere as implicações de renounceOwnership",
    ],
    checklist: [
      "Transferência em dois passos funciona corretamente",
      "Erros customizados economizam gas",
      "Eventos rastreiam mudanças de propriedade",
      "Casos extremos tratados (endereço zero, auto-transferência)",
    ],
  },

  "advanced-02": {
    challenge: `Otimize um contrato e meça as economias de gas com forge:\n\n**Passo 1 — Contrato NÃO otimizado** (crie \`Unoptimized.sol\`):\n\`\`\`solidity\ncontract Unoptimized {\n    uint8 a;    // slot 0 (desperdiça 31 bytes!)\n    uint256 b;  // slot 1\n    uint8 c;    // slot 2 (desperdiça 31 bytes!)\n    uint256 d;  // slot 3\n    // Total: 4 slots = 4 × 20.000 gas no primeiro write\n}\n\`\`\`\n\n**Passo 2 — Contrato otimizado** (crie \`Optimized.sol\`):\n\`\`\`solidity\ncontract Optimized {\n    uint256 b;  // slot 0\n    uint256 d;  // slot 1\n    uint8 a;    // slot 2 (packed!)\n    uint8 c;    // slot 2 (packed com a!)\n    // Total: 3 slots = economiza 20.000+ gas no deploy!\n}\n\`\`\`\n\n**Passo 3 — Loop NÃO otimizado:**\n\`\`\`solidity\nfor (uint256 i = 0; i < data.length; i++) { // relê length toda iteração!\n    total += data[i];\n}\n\`\`\`\n\n**Passo 4 — Loop otimizado:**\n\`\`\`solidity\nuint256 len = data.length; // cache: 1 SLOAD\nfor (uint256 i; i < len;) {\n    total += data[i];\n    unchecked { ++i; } // sem overflow check = economiza gas\n}\n\`\`\`\n\n**Passo 5 — Calldata vs Memory:**\n- \`function bad(uint256[] memory arr)\` — copia para memory (caro)\n- \`function good(uint256[] calldata arr)\` — lê direto do calldata (barato)\n\n**Passo 6 — Meça com Foundry:**\n\`\`\`bash\nforge test --gas-report\nforge inspect Unoptimized storage-layout\nforge inspect Optimized storage-layout\n\`\`\`\n\n✅ **Critério de sucesso:** gas-report mostra diferença mensurável entre as duas implementações`,
    hints: [
      "Agrupe variáveis do mesmo tamanho para empacotamento",
      "Use `calldata` em vez de `memory` para parâmetros de funções externas",
      "Faça cache de `array.length` antes dos loops",
    ],
    commonMistakes: [
      "Otimização prematura (escreva código correto primeiro)",
      "Usar unchecked onde overflow é possível",
      "Super-empacotar tornando o código ilegível",
    ],
    bestPractices: [
      "Perfile primeiro, otimize os caminhos quentes",
      "Empacote structs ordenando campos por tamanho",
      "Use unchecked apenas quando matematicamente seguro",
      "Prefira eventos a storage para dados históricos",
    ],
    checklist: [
      "Layout de storage está otimizado",
      "Loops usam incremento unchecked",
      "Calldata usado para parâmetros somente leitura",
      "Relatório de gas mostra melhoria",
    ],
  },

  "advanced-03": {
    challenge: `Demonstre o ataque de reentrância e implemente a correção:\n\n**Passo 1 — VulnerableVault** (vulnerável — NÃO use em produção!):\n\`\`\`solidity\nfunction withdraw() public {\n    uint256 bal = balances[msg.sender];\n    require(bal > 0);\n    (bool sent,) = msg.sender.call{value: bal}(""); // chamada externa ANTES\n    require(sent);\n    balances[msg.sender] = 0; // atualiza DEPOIS — TARDE DEMAIS!\n}\n\`\`\`\n\n**Passo 2 — Contrato Atacante:**\n\`\`\`solidity\ncontract Attacker {\n    VulnerableVault public vault;\n    constructor(address _vault) { vault = VulnerableVault(_vault); }\n    function attack() external payable {\n        vault.deposit{value: msg.value}();\n        vault.withdraw();\n    }\n    receive() external payable {\n        if (address(vault).balance > 0) {\n            vault.withdraw(); // re-entra antes do saldo ser zerado!\n        }\n    }\n}\n\`\`\`\n\n**Passo 3 — Teste do ataque:**\n- 3 usuários depositam 10 ETH total\n- Atacante deposita 1 ETH e executa o ataque\n- Verifique que o atacante drena mais que 1 ETH!\n\n**Passo 4 — SecureVault** (correção com CEI + nonReentrant):\n\`\`\`solidity\nfunction withdraw() public nonReentrant {\n    uint256 bal = balances[msg.sender];\n    if (bal == 0) revert InsufficientBalance();\n    balances[msg.sender] = 0; // Effect ANTES da Interaction!\n    (bool sent,) = msg.sender.call{value: bal}("");\n    if (!sent) revert TransferFailed();\n}\n\`\`\`\n\n**Passo 5:** O mesmo ataque no SecureVault deve reverter\n\n✅ **Critério de sucesso:** teste mostra VulnerableVault explorado, SecureVault imune`,
    hints: [
      "O atacante usa receive()/fallback() para re-entrar",
      "Sempre atualize o estado antes de chamadas externas",
      "Use o modifier nonReentrant como segurança extra",
    ],
    commonMistakes: [
      "Chamada externa antes da atualização de estado",
      "Usar transfer() (tem limite de gas mas ainda é padrão arriscado)",
      "Não considerar reentrância entre funções",
    ],
    bestPractices: [
      "Sempre siga Checks-Effects-Interactions",
      "Use guard nonReentrant em todas as funções com chamadas externas",
      "Prefira pull-over-push para pagamentos",
      "Audite todos os pontos de chamada externa",
    ],
    checklist: [
      "Versão vulnerável é explorável nos testes",
      "Versão segura impede reentrância",
      "Padrão CEI é seguido",
      "Modifier nonReentrant é aplicado",
    ],
  },

  "advanced-04": {
    challenge: `Construa um sistema de recompensas com pull payments que resiste a ataques DoS:\n\n**Passo 1 — O PROBLEMA (push payments):**\n\`\`\`solidity\n// RUIM: se qualquer transfer falha, TODAS falham!\nfunction distribuirRecompensas(address[] memory usuarios) public {\n    for (uint i = 0; i < usuarios.length; i++) {\n        payable(usuarios[i]).transfer(recompensa); // pode falhar!\n    }\n}\n\`\`\`\n\n**Passo 2 — A SOLUÇÃO (pull payments):**\n\`\`\`solidity\nmapping(address => uint256) public pendingWithdrawals;\n\nfunction addReward(address recipient, uint256 amount) public {\n    pendingWithdrawals[recipient] += amount; // só registra, não transfere\n    emit PaymentAvailable(recipient, amount);\n}\n\nfunction withdraw() public {\n    uint256 amount = pendingWithdrawals[msg.sender];\n    if (amount == 0) revert NothingToWithdraw();\n    pendingWithdrawals[msg.sender] = 0; // Effect ANTES\n    (bool sent,) = msg.sender.call{value: amount}(""); // Interaction DEPOIS\n    if (!sent) revert WithdrawFailed();\n    emit PaymentWithdrawn(msg.sender, amount);\n}\n\`\`\`\n\n**Passo 3 — Contrato malicioso para testar DoS:**\n\`\`\`solidity\ncontract MaliciousReceiver {\n    // sem receive() — não consegue receber ETH!\n}\n\`\`\`\n\n**Passo 4 — Testes:**\n- Alice, MaliciousReceiver e Bob recebem recompensas\n- Alice saca com sucesso\n- MaliciousReceiver tenta sacar → falha (sem receive), mas NÃO bloqueia Bob\n- Bob saca com sucesso independentemente\n\n✅ **Critério de sucesso:** falha de um destinatário não bloqueia os outros`,
    hints: [
      "Um contrato sem receive() fará transfer() falhar",
      "Pull payments isolam o saque de cada usuário",
      "Sempre zere o saldo antes de transferir",
    ],
    commonMistakes: [
      "Usar push payments em loops",
      "Não seguir CEI nas funções de saque",
      "Esquecer que contratos podem rejeitar ETH",
    ],
    bestPractices: [
      "Use pull payments por padrão",
      "Siga CEI religiosamente",
      "Teste com contratos de destinatário malicioso",
      "Emita eventos para todos os pagamentos",
    ],
    checklist: [
      "Padrão pull implementado corretamente",
      "CEI seguido no saque",
      "Destinatário malicioso não consegue fazer DoS nos outros",
      "Eventos rastreiam todos os pagamentos",
    ],
  },

  "advanced-05": {
    challenge: `Construa um protocolo DeFi modular com 4 módulos independentes:\n\n**Passo 1 — \`AccessModule.sol\`:**\n\`\`\`solidity\nabstract contract AccessModule {\n    mapping(address => bool) private _admins;\n    constructor() { _admins[msg.sender] = true; }\n    modifier onlyAdmin() { require(_admins[msg.sender], "Not admin"); _; }\n    function addAdmin(address a) external onlyAdmin { _admins[a] = true; }\n}\n\`\`\`\n\n**Passo 2 — \`PausableModule.sol\`:**\n\`\`\`solidity\nabstract contract PausableModule {\n    bool public paused;\n    modifier whenNotPaused() { require(!paused, "Paused"); _; }\n    function _pause() internal { paused = true; }\n    function _unpause() internal { paused = false; }\n}\n\`\`\`\n\n**Passo 3 — \`FeeModule.sol\`:**\n\`\`\`solidity\nabstract contract FeeModule {\n    uint256 public feePercent; // basis points\n    address public feeRecipient;\n    function _calculateFee(uint256 amount) internal view returns (uint256) {\n        return (amount * feePercent) / 10000;\n    }\n}\n\`\`\`\n\n**Passo 4 — Biblioteca utilitária:**\n\`\`\`solidity\nlibrary MathUtils {\n    function percentOf(uint256 value, uint256 pct) internal pure returns (uint256) {\n        return (value * pct) / 100;\n    }\n}\n\`\`\`\n\n**Passo 5 — Composição final:**\n\`\`\`solidity\ncontract DeFiProtocol is AccessModule, PausableModule, FeeModule {\n    using MathUtils for uint256;\n    function swap(uint256 amount) external whenNotPaused returns (uint256) {\n        uint256 fee = _calculateFee(amount);\n        return amount - fee;\n    }\n    function pause() external onlyAdmin { _pause(); }\n}\n\`\`\`\n\n**Passo 6:** Teste cada módulo em isolamento ANTES de testar o protocolo composto\n\n**Passo 7:** Verifique o tamanho: \`forge build --sizes\` (limite é 24KB)\n\n✅ **Critério de sucesso:** cada módulo testado isoladamente, contrato composto abaixo de 24KB`,
    hints: [
      "Use contratos abstratos para módulos",
      "Bibliotecas para lógica compartilhada sem estado",
      "Componha módulos através de herança",
    ],
    commonMistakes: [
      "Contratos 'deus' com tudo em um arquivo",
      "Cadeias de herança profundas (difíceis de auditar)",
      "Não testar módulos independentemente",
    ],
    bestPractices: [
      "Uma responsabilidade por módulo",
      "Teste módulos isoladamente",
      "Mantenha profundidade de herança <= 3",
      "Use interfaces entre módulos",
    ],
    checklist: [
      "Módulos são independentes",
      "Composição funciona corretamente",
      "Cada módulo é testável sozinho",
      "Tamanho do contrato está abaixo de 24KB",
    ],
  },

  "advanced-06": {
    challenge: `Escreva fuzz tests para um DEX simplificado testando invariantes matemáticas:\n\n**Passo 1 — SimpleDEX com reservas:**\n\`\`\`solidity\ncontract SimpleDEX {\n    uint256 public reserveA;\n    uint256 public reserveB;\n    uint256 public constant FEE_BPS = 30; // 0.3%\n    function addLiquidity(uint256 a, uint256 b) external {\n        reserveA += a; reserveB += b;\n    }\n    function swap(uint256 amountA) external returns (uint256 amountB) {\n        require(amountA < reserveA, "Sem liquidez");\n        uint256 fee = (amountA * FEE_BPS) / 10000;\n        amountB = reserveB * (amountA - fee) / (reserveA + amountA - fee);\n        reserveA += amountA;\n        reserveB -= amountB;\n    }\n}\n\`\`\`\n\n**Passo 2 — Fuzz test: reservas nunca zeradas:**\n\`\`\`solidity\nfunction testFuzz_SwapNeverDrainsReserves(uint256 amountA) public {\n    amountA = bound(amountA, 1, dex.reserveA() / 2);\n    dex.swap(amountA);\n    assertGt(dex.reserveB(), 0, "ReservaB zerada!");\n}\n\`\`\`\n\n**Passo 3 — Fuzz test: taxa sempre positiva:**\n\`\`\`solidity\nfunction testFuzz_FeeAlwaysPositive(uint256 amount) public pure {\n    amount = bound(amount, 1, 1e18);\n    uint256 fee = (amount * 30) / 10000;\n    assertGt(fee, 0);\n}\n\`\`\`\n\n**Passo 4 — Fuzz test: liquidez conservada:**\nApós swap, total de valor (reserveA + reserveB em ETH) deve ser >= antes do swap\n\n**Passo 5 — Aumente as iterações:**\n\`forge test --fuzz-runs 10000 --match-test testFuzz\`\n\n**Passo 6 — Quando falhar:** o Foundry mostra os valores exatos que causaram a falha — corrija e re-execute\n\n✅ **Critério de sucesso:** todos os fuzz tests passam com 10.000 iterações`,
    hints: [
      "`bound(valor, min, max)` restringe entradas de fuzz",
      "Defina invariantes como propriedades matemáticas",
      "Entradas de fuzz com falha são reproduzíveis com a semente",
    ],
    commonMistakes: [
      "Não limitar entradas de fuzz (a maioria vai reverter inutilmente)",
      "Testar implementação em vez de propriedades",
      "Não executar iterações suficientes de fuzz para ter confiança",
    ],
    bestPractices: [
      "Defina invariantes: totalSupply == soma dos saldos",
      "Limite entradas a intervalos significativos",
      "Aumente as execuções de fuzz para código crítico",
      "Use testes de invariante para propriedades de protocolo",
    ],
    checklist: [
      "Testes de fuzz cobrem propriedades principais",
      "Entradas são corretamente limitadas",
      "Invariantes estão claramente definidos",
      "Testes passam com 10.000+ execuções",
    ],
  },

  "advanced-07": {
    challenge: `Construa uma integração React + Solidity completa com todos os padrões essenciais:\n\n**Passo 1 — Conectar wallet:**\n\`\`\`typescript\nasync function connectWallet() {\n    const provider = new ethers.BrowserProvider(window.ethereum);\n    const signer = await provider.getSigner();\n    setAccount(await signer.getAddress());\n    setContract(new ethers.Contract(ADDRESS, ABI, signer));\n}\n\`\`\`\n\n**Passo 2 — Ler estado ao montar:**\n\`\`\`typescript\nuseEffect(() => {\n    if (!contract) return;\n    contract.totalPlayers().then(setTotal);\n}, [contract]);\n\`\`\`\n\n**Passo 3 — Enviar transação com status:**\n\`\`\`typescript\nasync function handleJoin() {\n    setStatus("Enviando...");\n    try {\n        const tx = await contract.join();\n        setStatus("Aguardando confirmacao...");\n        await tx.wait();\n        setStatus("Confirmado!");\n    } catch(err: any) {\n        if (err.code === 4001) setStatus("Rejeitado pelo usuario");\n        else setStatus("Erro: " + (err.reason ?? err.message));\n    }\n}\n\`\`\`\n\n**Passo 4 — Escutar eventos em tempo real:**\n\`\`\`typescript\nuseEffect(() => {\n    if (!contract) return;\n    contract.on("PlayerJoined", (player) => {\n        setPlayers(prev => [...prev, player]);\n    });\n    return () => { contract.removeAllListeners(); };\n}, [contract]);\n\`\`\`\n\n**Passo 5 — Configure o Anvil no MetaMask:**\nNetwork: Anvil Local | RPC: http://localhost:8545 | Chain ID: 31337\n\n**Passo 6 — ABI:** copie de \`out/DAppBackend.sol/DAppBackend.json\` após \`forge build\`\n\n✅ **Critério de sucesso:** botão conecta wallet, transações mostram status, eventos atualizam UI sem refresh`,
    hints: [
      "Sempre mostre o status da transação aos usuários",
      "Trate rejeição do usuário e revert do contrato de formas diferentes",
      "Atualizações otimistas melhoram a UX (reverta em caso de falha)",
    ],
    commonMistakes: [
      "Não tratar desconexão da carteira",
      "Bloquear a UI durante confirmação de transação",
      "Não mostrar estimativas de gas antes de enviar",
    ],
    bestPractices: [
      "Mostre status claro da transação",
      "Trate todos os tipos de erro",
      "Use eventos para atualizações em tempo real",
      "Implemente lógica de retry para leituras com falha",
    ],
    checklist: [
      "Carteira conecta com sucesso",
      "Leituras exibem estado atual",
      "Escritas mostram status pendente/confirmado",
      "Eventos atualizam UI em tempo real",
      "Erros são tratados adequadamente",
    ],
  },

  "advanced-08": {
    challenge: `Construa o Crowdfunding completo e teste todos os cenários de vida da campanha:\n\n**Passo 1 — Contrato:** implemente o Crowdfunding do exemplo com todos os custom errors\n\n**Cenário A — Campanha bem-sucedida:**\n\`\`\`solidity\nfunction testSuccessfulCampaign() public {\n    uint256 id = crowdfunding.createCampaign("Projeto X", 5 ether, 30 days);\n    vm.deal(bob, 3 ether); vm.prank(bob);\n    crowdfunding.contribute{value: 3 ether}(id);\n    vm.deal(carol, 2 ether); vm.prank(carol);\n    crowdfunding.contribute{value: 2 ether}(id);\n    vm.warp(block.timestamp + 31 days); // passa o prazo\n    vm.prank(alice); // alice é a criadora\n    crowdfunding.claimFunds(id);\n    // bob tenta reembolso → deve reverter com GoalReached\n    vm.prank(bob); vm.expectRevert(Crowdfunding.GoalReached.selector);\n    crowdfunding.claimRefund(id);\n}\n\`\`\`\n\n**Cenário B — Campanha fracassada:**\n\`\`\`solidity\nfunction testFailedCampaign() public {\n    uint256 id = crowdfunding.createCampaign("Projeto Y", 10 ether, 7 days);\n    vm.deal(bob, 2 ether); vm.prank(bob);\n    crowdfunding.contribute{value: 2 ether}(id);\n    vm.warp(block.timestamp + 8 days);\n    // criadora tenta sacar → deve reverter\n    vm.expectRevert(Crowdfunding.GoalNotReached.selector);\n    crowdfunding.claimFunds(id);\n    // bob pega reembolso\n    uint256 antes = bob.balance;\n    vm.prank(bob);\n    crowdfunding.claimRefund(id);\n    assertEq(bob.balance, antes + 2 ether);\n}\n\`\`\`\n\n**Testes de edge cases:**\n- Contribuir após deadline → \`CampaignEnded\`\n- Sacar antes do deadline → \`CampaignNotEnded\`\n- Double refund → \`NoContribution\`\n- Double claim → \`AlreadyClaimed\`\n\n✅ **Critério de sucesso:** ambos os cenários passam, todos os edge cases revertem corretamente`,
    hints: [
      "Use vm.warp() para testar lógica dependente de tempo",
      "Padrão CEI nas funções claimFunds e claimRefund",
      "Frontend mostra UI diferente conforme o estado da campanha",
    ],
    commonMistakes: [
      "Não seguir CEI nas funções de saque",
      "Permitir contribuições após o prazo",
      "Não impedir reembolsos duplos",
    ],
    bestPractices: [
      "Padrão CEI para todos os saques",
      "Erros customizados para eficiência de gas",
      "Testes abrangentes baseados em tempo",
      "Frontend mostra status claro da campanha",
    ],
    checklist: [
      "Ciclo de vida da campanha funciona de ponta a ponta",
      "Reembolsos funcionam quando meta não é atingida",
      "Saques funcionam quando meta é atingida",
      "Lógica baseada em tempo está correta",
      "Padrão CEI seguido em todo lugar",
    ],
  },

  "advanced-09": {
    challenge: `Construa o Marketplace completo com taxas em basis points e testes abrangentes:\n\n**Passo 1 — Contrato:** implemente o Marketplace do exemplo com struct Listing e todas as funções\n\n**Passo 2 — Cálculo correto de taxa** (basis points: 250 = 2.5%):\n\`\`\`solidity\nuint256 fee = (msg.value * feePercent) / 10000;\nuint256 sellerAmount = msg.value - fee;\n// Crédito ao vendedor (pull payment)\npendingWithdrawals[listing.seller] += sellerAmount;\npendingWithdrawals[feeCollector] += fee;\n\`\`\`\n\n**Passo 3 — 8 testes obrigatórios:**\n- \`testCreateListing\` — seller lista item por 1 ETH → active==true\n- \`testBuy\` — buyer envia 1 ETH → sold==true, active==false\n- \`testFeeCollected\` — após compra → feeCollector tem o valor correto\n- \`testSellerReceived\` — após compra → seller pendingWithdrawals correto\n- \`testBuyAlreadySold\` → vm.expectRevert\n- \`testBuyInsufficientETH\` → vm.expectRevert\n- \`testCancelListing\` — seller cancela → active==false\n- \`testCancelByNonSeller\` → vm.expectRevert\n\n**Passo 4 — Fuzz test nas taxas:**\n\`\`\`solidity\nfunction testFuzz_FeeCalculation(uint256 price, uint256 feeBps) public pure {\n    feeBps = bound(feeBps, 0, 1000); // máximo 10%\n    price = bound(price, 0.001 ether, 100 ether);\n    uint256 fee = (price * feeBps) / 10000;\n    assertLe(fee, price); // taxa nunca maior que o preço\n}\n\`\`\`\n\n**Passo 5:** Liste 2 itens no Anvil, compre 1, cancele o outro\n\n✅ **Critério de sucesso:** todos os 8 testes passam, fuzz test valida matemática de taxas`,
    hints: [
      "Use basis points (10000 = 100%) para cálculos precisos de taxa",
      "Pull payments previnem ataques DoS",
      "Teste de fuzz na matemática de taxas para prevenir erros de arredondamento",
    ],
    commonMistakes: [
      "Push payments para vendedores (risco de DoS)",
      "Erros de arredondamento inteiro no cálculo de taxas",
      "Não tratar reembolsos de pagamento em excesso",
    ],
    bestPractices: [
      "Padrão pull payment para todos os pagamentos",
      "Basis points para cálculos percentuais",
      "Teste com valores pequenos e grandes",
      "Trate pagamentos em excesso adequadamente",
    ],
    checklist: [
      "Ciclo de vida da listagem completo",
      "Taxas calculadas corretamente",
      "Pull payments implementados",
      "Pagamentos em excesso reembolsados",
      "Testes de fuzz passam",
    ],
  },

  "advanced-10": {
    challenge: `Construa o VaultSystem integrando TODOS os padrões aprendidos no curso:\n\n**Passo 1 — Estrutura com roles + time-lock + pausa:**\n\`\`\`solidity\ncontract VaultSystem {\n    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");\n    mapping(bytes32 => mapping(address => bool)) private _roles;\n    bool public paused;\n    mapping(address => uint256) public balances;\n    mapping(address => uint256) public withdrawalTime;\n    mapping(address => uint256) public withdrawalAmount;\n    uint256 public constant TIMELOCK_DELAY = 24 hours;\n    uint256 public constant TIMELOCK_THRESHOLD = 1 ether;\n    bool private locked; // nonReentrant\n}\n\`\`\`\n\n**Passo 2 — Deposit, requestWithdraw e executeWithdraw** (com CEI + nonReentrant)\n\n**Passo 3 — Time-lock:** saques > 1 ETH ficam pendentes 24h antes de executar\n\n**Passo 4 — 10+ testes obrigatórios:**\n- Deposit e withdraw básico\n- Time-lock: tenta sacar antes de 24h → reverter\n- Time-lock: saca depois de 24h (vm.warp) → sucesso\n- Pausa: tenta depositar → reverter\n- Access control: não-admin tenta pausar → reverter\n- Reentrância: ataque com contrato malicioso → bloqueado pelo nonReentrant\n- Saque sem depósito → reverter\n- Double requestWithdraw → sobrescreve ou reverter\n\n**Passo 5 — Auto-auditoria:** revise seu código e responda:\n- Existe algum caminho de reentrância?\n- O CEI é seguido em executeWithdraw?\n- Custom errors estão sendo usados?\n- Todos os state changes emitem eventos?\n\n**Passo 6:** corrija qualquer problema encontrado na auditoria\n\n✅ **Critério de sucesso:** 10+ testes passam, auto-auditoria não encontra vulnerabilidades`,
    hints: [
      "Modifiers empilhados para segurança em camadas",
      "Teste com múltiplos vaults e usuários simultaneamente",
      "Frontend precisa de views diferentes para admin, gerente e usuário",
    ],
    commonMistakes: [
      "Não testar com múltiplos vaults simultâneos",
      "Verificações de autorização ausentes em funções de borda",
      "Não seguir CEI no saque",
    ],
    bestPractices: [
      "Use modifiers em camadas para defesa em profundidade",
      "Teste todas as combinações de papéis",
      "Use eventos para trilha de auditoria completa",
      "Siga CEI em todos os caminhos de saque",
    ],
    checklist: [
      "Gerenciamento multi-vault funciona",
      "Controle de acesso baseado em papéis aplicado",
      "Depósitos e saques corretos",
      "Desativação impede operações",
      "Cobertura de testes abrangente",
      "CEI seguido em todo lugar",
    ],
  },
};
