export interface Exercise {
  id: string;
  level: "beginner" | "intermediate" | "advanced";
  title: string;
  concept: string;
  explanation: { en: string; pt: string };
  learningPath: { en: string; pt: string };
  example: string;
  foundryWorkflow: string;
  challenge: string;
  hints: string[];
  commonMistakes: string[];
  bestPractices: string[];
  checklist: string[];
  shortSolution: string;
  fullSolution: string;
  order: number;
}

export const exercises: Exercise[] = [
  // ===== BEGINNER (1-10) =====
  {
    id: "beginner-01",
    level: "beginner",
    order: 1,
    title: "Contract Structure & Pragma",
    concept: "Solidity file structure, SPDX license, pragma directive",
    explanation: {
      en: `Every Solidity file starts with an SPDX license identifier and a pragma directive that specifies the compiler version. The pragma ensures your code compiles with a compatible version. Contracts are defined with the \`contract\` keyword, similar to classes in other languages. Understanding the basic file structure is essential before writing any logic.`,
      pt: `Todo arquivo Solidity começa com duas linhas obrigatórias antes do contrato em si:\n\n1. **Licença SPDX** — identifica a licença do código: \`// SPDX-License-Identifier: MIT\`. O compilador emite um aviso se você omitir isso. MIT é a mais comum para contratos abertos.\n\n2. **Pragma** — diz ao compilador qual versão do Solidity usar: \`pragma solidity ^0.8.19;\`. O símbolo \`^\` significa "esta versão ou superiores compatíveis" (ex: 0.8.19, 0.8.20, mas não 0.9.x). Isso previne que seu código compile com versões incompatíveis e quebre.\n\nDepois vem o **contrato**: \`contract NomeDoContrato { }\`. Pense no contrato como uma classe em OOP — ele agrupa variáveis de estado (dados armazenados na blockchain) e funções (lógica que opera sobre esses dados). Cada contrato tem um endereço único na blockchain após o deploy.\n\nO **Foundry** é o framework que usaremos: \`forge init\` cria o projeto, \`forge build\` compila, \`forge test\` executa os testes.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MyFirstContract {
    // State variables go here
    string public greeting = "Hello, Solidity!";

    // Functions go here
    function getGreeting() public view returns (string memory) {
        return greeting;
    }
}`,
    foundryWorkflow: `# Initialize a new Foundry project
forge init my-first-project
cd my-first-project

# The project structure:
# src/          - Your contracts
# test/         - Your tests
# script/       - Deployment scripts
# foundry.toml  - Configuration

# Create your contract
# Save the code in src/MyFirstContract.sol

# Compile
forge build

# You should see: Compiler run successful`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• What is Solidity and how it works (solidity-by-example.org)\n• What is an SPDX license identifier and why it matters\n• What is the pragma directive and semantic versioning (^0.8.x)\n• What is a Solidity contract (similar to a class in OOP)\n• How to install and use Foundry (forge init, forge build)\n\n🔍 **Search for:** "Solidity pragma versioning", "SPDX license identifier Solidity", "forge init tutorial"\n\n📖 **Docs:** docs.soliditylang.org → Introduction to Smart Contracts`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• O que é Solidity e como funciona (solidity-by-example.org)\n• O que é uma licença SPDX e por que é importante\n• O que é a diretiva pragma e versioning semântico (^0.8.x)\n• O que é um contrato Solidity (similar a uma classe em OOP)\n• Como instalar e usar o Foundry (forge init, forge build)\n\n🔍 **Pesquise por:** "Solidity pragma versioning", "SPDX license identifier Solidity", "forge init tutorial"\n\n📖 **Documentação:** docs.soliditylang.org → Introduction to Smart Contracts`,
    },
    challenge: `Crie um contrato chamado \`HelloFoundry\` com:\n\n**Passo 1:** Execute \`forge init hello-foundry\` no terminal para criar um novo projeto Foundry\n\n**Passo 2:** Abra \`src/Counter.sol\` e delete o conteúdo existente\n\n**Passo 3:** Declare o arquivo com o identificador de licença: \`// SPDX-License-Identifier: MIT\`\n\n**Passo 4:** Adicione a diretiva pragma: \`pragma solidity ^0.8.19;\`\n\n**Passo 5:** Declare o contrato \`HelloFoundry { }\`\n\n**Passo 6:** Dentro do contrato, declare uma variável string pública chamada \`message\` com seu nome como valor inicial\n\n**Passo 7:** Adicione uma função \`getMessage()\` que seja \`public view\` e retorne a variável \`message\`\n\n**Passo 8:** Execute \`forge build\` — deve compilar sem erros\n\n✅ **Critério de sucesso:** O comando \`forge build\` exibe "Compiler run successful"`,
    hints: [
      "Use `string public` to declare a public string variable",
      "A `view` function doesn't modify state",
      "The `memory` keyword is needed for string return types",
    ],
    commonMistakes: [
      "Forgetting the pragma directive",
      "Using an incompatible Solidity version",
      "Missing the SPDX license identifier (compiler warning)",
      "Forgetting `memory` keyword for string returns",
    ],
    bestPractices: [
      "Always specify a license identifier",
      "Use a caret (^) pragma for minor version flexibility",
      "Keep one contract per file",
      "Name your file the same as your contract",
    ],
    checklist: [
      "Contract compiles with `forge build`",
      "Has SPDX license identifier",
      "Has pragma directive",
      "Public variable is accessible",
      "Function returns correct value",
    ],
    shortSolution: `contract HelloFoundry {
    string public message = "Alice";
    function getMessage() public view returns (string memory) {
        return message;
    }
}`,
    fullSolution: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HelloFoundry {
    string public message = "Alice";

    function getMessage() public view returns (string memory) {
        return message;
    }
}

// Test file: test/HelloFoundry.t.sol
// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.19;
// import "forge-std/Test.sol";
// import "../src/HelloFoundry.sol";
// contract HelloFoundryTest is Test {
//     HelloFoundry hello;
//     function setUp() public {
//         hello = new HelloFoundry();
//     }
//     function testMessage() public {
//         assertEq(hello.getMessage(), "Alice");
//     }
// }`,
  },
  {
    id: "beginner-02",
    level: "beginner",
    order: 2,
    title: "Variables & Data Types",
    concept: "State variables, local variables, uint, int, bool, address, string",
    explanation: {
      en: `Solidity has value types (uint, int, bool, address, bytes) and reference types (string, arrays, mappings). State variables are stored on the blockchain permanently and cost gas. Local variables exist only during function execution. Understanding storage vs memory is fundamental to writing efficient contracts.`,
      pt: `Solidity tem dois grupos de tipos:\n\n**Tipos de valor** (armazenados direto na variável):\n- \`uint256\` — inteiro sem sinal de 256 bits (0 a 2²⁵⁶-1). Use sempre \`uint256\` explicitamente, nunca apenas \`uint\`\n- \`int256\` — inteiro com sinal (-2¹²⁵ a 2¹²⁵-1)\n- \`bool\` — true ou false\n- \`address\` — endereço Ethereum de 20 bytes (ex: 0x742d35Cc...)\n- \`bytes32\` — sequência fixa de 32 bytes, útil para hashes\n\n**Tipos de referência** (armazenados por referência):\n- \`string\` — texto de tamanho variável\n- Arrays e Mappings (veremos nos exercícios seguintes)\n\n**Onde as variáveis vivem:**\n- **Storage** (variáveis de estado): ficam permanentemente na blockchain, custam gas caro para escrever (20.000 gas para novo slot)\n- **Memory**: existem só durante a execução de uma função, muito mais baratas\n- **Stack**: variáveis locais simples, praticamente gratuitas\n\n**Constant vs Immutable:**\n- \`constant\`: valor definido no código, nunca muda, ocupa zero storage (fica no bytecode)\n- \`immutable\`: definido uma vez no constructor, depois nunca muda — mais barato que uma variável normal`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Variables {
    // State variables (stored on-chain)
    uint256 public myUint = 42;
    int256 public myInt = -10;
    bool public myBool = true;
    address public myAddress = 0x1234567890AbcdEF1234567890aBcdef12345678;
    string public myString = "Hello";
    bytes32 public myBytes = "data";

    // Constants save gas - stored in bytecode
    uint256 public constant MAX_SUPPLY = 10000;

    // Immutable - set once in constructor
    address public immutable owner;

    constructor() {
        owner = msg.sender;
    }

    function getLocalVar() public pure returns (uint256) {
        // Local variable (only exists during execution)
        uint256 localVar = 100;
        return localVar;
    }
}`,
    foundryWorkflow: `# After writing your contract in src/Variables.sol
forge build

# Run tests with verbosity
forge test -vvv

# Check gas usage
forge test --gas-report`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• Value types in Solidity: uint256, int256, bool, address, bytes32\n• Difference between uint and uint256 (identical, but uint256 is more explicit)\n• What are state variables (stored in blockchain storage)\n• What are local variables (exist only during function execution)\n• Difference between \`constant\` and \`immutable\` — when to use each\n• What is \`msg.sender\` — the address of who called the function\n\n🔍 **Search for:** "Solidity data types", "Solidity constant vs immutable", "Solidity storage vs memory"\n\n📖 **Docs:** solidity-by-example.org/variables, solidity-by-example.org/constants`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• Tipos de valor em Solidity: uint256, int256, bool, address, bytes32\n• Diferença entre uint e uint256 (são iguais, mas uint256 é mais explícito)\n• O que são variáveis de estado (ficam no storage da blockchain)\n• O que são variáveis locais (existem só durante a execução da função)\n• Diferença entre \`constant\` e \`immutable\` — quando usar cada um\n• O que é \`msg.sender\` — o endereço de quem chamou a função\n\n🔍 **Pesquise por:** "Solidity data types", "Solidity constant vs immutable", "Solidity storage vs memory"\n\n📖 **Documentação:** solidity-by-example.org/variables, solidity-by-example.org/constants`,
    },
    challenge: `Crie um contrato chamado \`DataTypes\` que demonstre os principais tipos de dados:\n\n**Passo 1:** Declare uma variável pública \`uint256 public age\` com o valor 25\n\n**Passo 2:** Declare uma variável imutável \`address public immutable owner\` que será definida no constructor\n\n**Passo 3:** Declare uma variável \`bool public isActive\` com valor \`true\`\n\n**Passo 4:** Declare uma constante \`uint256 public constant VERSION = 1\`\n\n**Passo 5:** Crie um constructor que define \`owner = msg.sender\`\n\n**Passo 6:** Adicione uma função \`getInfo()\` que seja \`public view\` e retorne todos os 4 valores em um único return (use tuple: \`returns (uint256, address, bool, uint256)\`)\n\n**Passo 7:** Compile com \`forge build\` e verifique que não há erros\n\n✅ **Critério de sucesso:** A função getInfo() retorna (25, endereço_do_deployer, true, 1)`,
    hints: [
      "Use `constant` for values known at compile time",
      "Use `immutable` for values set once in the constructor",
      "`msg.sender` gives the address of the caller",
    ],
    commonMistakes: [
      "Using `uint` without specifying bits (use uint256 explicitly)",
      "Not using constant/immutable when possible (wastes gas)",
      "Confusing storage and memory for reference types",
    ],
    bestPractices: [
      "Use uint256 explicitly instead of uint",
      "Mark compile-time constants as `constant`",
      "Mark constructor-set values as `immutable`",
      "Use meaningful variable names",
    ],
    checklist: [
      "All data types compile correctly",
      "Owner is set via constructor",
      "Constant uses no storage slot",
      "Function returns all values",
    ],
    shortSolution: `contract DataTypes {
    uint256 public age = 25;
    address public immutable owner;
    bool public isActive = true;
    uint256 public constant VERSION = 1;
    constructor() { owner = msg.sender; }
}`,
    fullSolution: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DataTypes {
    uint256 public age = 25;
    address public immutable owner;
    bool public isActive = true;
    uint256 public constant VERSION = 1;

    constructor() {
        owner = msg.sender;
    }

    function getInfo() public view returns (uint256, address, bool, uint256) {
        return (age, owner, isActive, VERSION);
    }
}`,
  },
  {
    id: "beginner-03",
    level: "beginner",
    order: 3,
    title: "Functions & Visibility",
    concept: "public, private, internal, external, view, pure",
    explanation: {
      en: `Functions in Solidity have visibility specifiers that control who can call them. \`public\` functions can be called internally and externally. \`external\` can only be called from outside. \`internal\` only from the contract or derived contracts. \`private\` only from the contract itself. Additionally, \`view\` means the function reads but doesn't modify state, and \`pure\` means it neither reads nor modifies state.`,
      pt: `Cada função em Solidity tem dois tipos de especificadores:\n\n**Visibilidade** — quem pode chamar:\n- \`public\`: qualquer pessoa pode chamar, de dentro ou fora do contrato. O compilador gera um getter automático para variáveis \`public\`\n- \`external\`: só pode ser chamada de fora do contrato (não funciona internamente sem \`this.\`). É mais eficiente em gas para chamadas externas pois os parâmetros ficam no calldata\n- \`internal\`: só este contrato e contratos que herdam dele podem chamar (equivale ao \`protected\` em OOP)\n- \`private\`: só este contrato pode chamar — contratos filhos não têm acesso\n\n**Estado** — o que a função faz com o estado:\n- \`view\`: lê variáveis de estado mas não as modifica. Não custa gas quando chamada externamente (off-chain)\n- \`pure\`: não lê nem modifica nenhuma variável de estado. Apenas opera com os parâmetros recebidos. Também gratuita off-chain\n- (sem modificador): pode ler e modificar o estado — custa gas\n\n**Regra prática:** use sempre a visibilidade mais restritiva possível. Funções internas com underscore: \`_meuHelper()\`. Se uma função só é chamada de fora, prefira \`external\` — economiza gas.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FunctionVisibility {
    uint256 private secretNumber = 42;
    uint256 public publicNumber = 100;

    // Anyone can call this
    function getPublicNumber() public view returns (uint256) {
        return publicNumber;
    }

    // Only callable from outside the contract
    function getExternal() external view returns (uint256) {
        return publicNumber;
    }

    // Only this contract can call this
    function _getSecret() private view returns (uint256) {
        return secretNumber;
    }

    // This contract and child contracts
    function _getInternal() internal view returns (uint256) {
        return secretNumber;
    }

    // Pure function - no state access
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }

    // Uses the private function internally
    function revealSecret() public view returns (uint256) {
        return _getSecret();
    }
}`,
    foundryWorkflow: `# Build and test
forge build
forge test -vvv

# Test specific function
forge test --match-test testGetPublicNumber -vvv`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• The 4 visibility types: \`public\`, \`private\`, \`internal\`, \`external\`\n• Difference between \`view\` (reads state) and \`pure\` (neither reads nor modifies state)\n• Why \`external\` is more gas-efficient than \`public\` for externally-called functions\n• Convention of naming private functions with underscore: \`_myFunction()\`\n• How the Solidity compiler auto-generates getters for \`public\` variables\n\n🔍 **Search for:** "Solidity function visibility", "Solidity view vs pure functions", "Solidity gas optimization visibility"\n\n📖 **Docs:** solidity-by-example.org/function`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• Os 4 tipos de visibilidade: \`public\`, \`private\`, \`internal\`, \`external\`\n• A diferença entre \`view\` (lê estado) e \`pure\` (não lê nem modifica estado)\n• Por que usar \`external\` é mais eficiente em gas do que \`public\` para funções chamadas de fora\n• Convenção de nomear funções privadas com underscore: \`_minhaFuncao()\`\n• Como o compilador do Solidity gera getters automáticos para variáveis \`public\`\n\n🔍 **Pesquise por:** "Solidity function visibility", "Solidity view vs pure functions", "Solidity gas optimization visibility"\n\n📖 **Documentação:** solidity-by-example.org/function`,
    },
    challenge: `Crie um contrato \`Calculator\` com as seguintes funções e visibilidades:\n\n**Passo 1:** Declare uma variável de estado \`uint256 private result\` (privada — não visível externamente)\n\n**Passo 2:** Crie uma função \`add(uint256 x) public\` que some x ao resultado\n\n**Passo 3:** Crie uma função \`subtract(uint256 x) public\` que subtraia x do resultado. Use \`require(result >= x, "Underflow")\` para evitar underflow\n\n**Passo 4:** Crie uma função \`multiply(uint256 a, uint256 b) public pure returns (uint256)\` — note que é \`pure\` porque não acessa o estado\n\n**Passo 5:** Crie uma função \`getResult() public view returns (uint256)\` para ler o resultado\n\n**Passo 6:** Crie uma função \`reset() public\` que zera o resultado\n\n**Passo 7:** Tente chamar _result diretamente no Remix ou nos testes — deve falhar (é private)\n\n✅ **Critério de sucesso:** Forge build compila, e a função multiply não pode acessar a variável result`,
    hints: [
      "Private functions conventionally start with underscore",
      "External functions use less gas when called externally",
      "Pure functions can't access any state variables",
    ],
    commonMistakes: [
      "Making all functions public (security risk)",
      "Using public when external would suffice",
      "Marking a state-reading function as pure instead of view",
    ],
    bestPractices: [
      "Use the most restrictive visibility possible",
      "Prefix private/internal functions with underscore",
      "Use external for functions only called externally",
      "Use pure for helper/math functions",
    ],
    checklist: [
      "Each visibility type is used correctly",
      "Private function cannot be called externally",
      "Pure function has no state access",
      "View function doesn't modify state",
    ],
    shortSolution: `contract Calculator {
    uint256 private result;
    function add(uint256 x) public { result += x; }
    function subtract(uint256 x) public { result -= x; }
    function multiply(uint256 a, uint256 b) public pure returns (uint256) { return a * b; }
    function getResult() public view returns (uint256) { return result; }
}`,
    fullSolution: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Calculator {
    uint256 private result;

    function add(uint256 x) public {
        result += x;
    }

    function subtract(uint256 x) public {
        require(result >= x, "Underflow");
        result -= x;
    }

    function multiply(uint256 a, uint256 b) public pure returns (uint256) {
        return a * b;
    }

    function getResult() public view returns (uint256) {
        return result;
    }

    function reset() public {
        result = 0;
    }
}`,
  },
  {
    id: "beginner-04",
    level: "beginner",
    order: 4,
    title: "Constructors & Require",
    concept: "Constructor function, require statements, input validation",
    explanation: {
      en: `The constructor runs once when the contract is deployed. It's used to initialize state. \`require\` is used for input validation - if the condition is false, the transaction reverts and remaining gas is refunded. This is the primary way to enforce rules and protect your contract from invalid inputs.`,
      pt: `O **constructor** é uma função especial que roda exatamente UMA vez — quando o contrato é publicado na blockchain (deploy). Depois disso, nunca mais executa. Ele é usado para:\n- Definir o owner (\`owner = msg.sender\`)\n- Configurar parâmetros iniciais (ex: preço, supply máximo)\n- Inicializar estruturas de dados\n\n\`msg.sender\` dentro do constructor é o endereço de quem fez o deploy.\n\n**require** é a principal ferramenta de validação em Solidity:\n\`require(condição, "mensagem de erro")\`\n\nSe a condição for **false**, a transação inteira é revertida: todas as mudanças de estado são desfeitas e o gas restante é devolvido ao chamador. Isso protege o contrato de entradas inválidas.\n\nExemplos comuns:\n- \`require(msg.value > 0, "Envie ETH")\` — verifica que ETH foi enviado\n- \`require(msg.sender == owner, "Apenas o dono")\` — restringe acesso\n- \`require(amount <= balance, "Saldo insuficiente")\` — valida quantidade\n\n**payable** é necessário em funções que recebem ETH. Sem \`payable\`, a função rejeitará qualquer ETH enviado.\n\`msg.value\` é a quantidade de ETH (em wei) enviada com a transação atual.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TokenSale {
    address public owner;
    uint256 public price;
    uint256 public totalSold;
    uint256 public constant MAX_SUPPLY = 1000;

    constructor(uint256 _price) {
        require(_price > 0, "Price must be greater than zero");
        owner = msg.sender;
        price = _price;
    }

    function buy(uint256 amount) public payable {
        require(amount > 0, "Must buy at least 1");
        require(totalSold + amount <= MAX_SUPPLY, "Exceeds supply");
        require(msg.value >= price * amount, "Insufficient payment");

        totalSold += amount;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner");
        payable(owner).transfer(address(this).balance);
    }
}`,
    foundryWorkflow: `# Test with constructor arguments
forge test -vvv

# In your test file, deploy with args:
# TokenSale sale = new TokenSale(1 ether);

# Deploy to local anvil with constructor args
anvil &
forge create src/TokenSale.sol:TokenSale \\
  --constructor-args 1000000000000000000 \\
  --rpc-url http://localhost:8545 \\
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• What is the constructor and when it runs (only once at deploy)\n• How to pass arguments to the constructor at deploy\n• What is \`require(condition, "message")\` and how it works\n• What happens when a require fails: transaction is reverted and remaining gas is returned\n• What is \`msg.value\` — the amount of ETH sent with the transaction\n• What is \`payable\` — functions and addresses that can receive ETH\n• What is \`msg.sender\` — who is calling the function\n\n🔍 **Search for:** "Solidity constructor arguments", "Solidity require revert", "Solidity payable function"\n\n📖 **Docs:** solidity-by-example.org/payable`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• O que é o constructor e quando ele é executado (apenas 1 vez no deploy)\n• Como passar argumentos para o constructor no deploy\n• O que é \`require(condição, "mensagem")\` e como ele funciona\n• O que acontece quando um require falha: a transação é revertida e o gas restante é devolvido\n• O que é \`msg.value\` — a quantidade de ETH enviada com a transação\n• O que é \`payable\` — funções e endereços que podem receber ETH\n• O que é \`msg.sender\` — quem está chamando a função\n\n🔍 **Pesquise por:** "Solidity constructor arguments", "Solidity require revert", "Solidity payable function"\n\n📖 **Documentação:** solidity-by-example.org/payable`,
    },
    challenge: `Crie um contrato \`Vault\` (cofre) que controla depósitos e saques de ETH:\n\n**Passo 1:** Declare as variáveis: \`address public owner\` e \`uint256 public minDeposit\`\n\n**Passo 2:** Crie um constructor que recebe \`uint256 _min\` como parâmetro. Dentro do constructor:\n  - Valide com \`require(_min > 0, "Min deve ser maior que zero")\`\n  - Defina \`owner = msg.sender\`\n  - Defina \`minDeposit = _min\`\n\n**Passo 3:** Crie uma função \`deposit() public payable\` com os requires:\n  - \`require(msg.value >= minDeposit, "Abaixo do mínimo")\`\n\n**Passo 4:** Crie uma função \`withdraw() public\` com os requires:\n  - \`require(msg.sender == owner, "Apenas o dono pode sacar")\`\n  - \`require(address(this).balance > 0, "Saldo zero")\`\n  - Use \`payable(owner).transfer(address(this).balance)\` para transferir\n\n**Passo 5:** Adicione uma função \`getBalance() public view returns (uint256)\` que retorna o saldo do contrato\n\n**Passo 6:** No teste ou no Anvil, tente depositar menos do que o mínimo — deve reverter\n\n✅ **Critério de sucesso:** Apenas o owner pode sacar, e depósitos abaixo do mínimo são rejeitados`,
    hints: [
      "Use `msg.value` to check ETH sent with a transaction",
      "Use `payable` modifier for functions receiving ETH",
      "Constructor arguments are passed at deployment time",
    ],
    commonMistakes: [
      "Not validating constructor arguments",
      "Forgetting that require consumes all gas before Solidity 0.8",
      "Not using custom error messages in require",
    ],
    bestPractices: [
      "Always validate inputs with require",
      "Include descriptive error messages",
      "Validate constructor parameters",
      "Check for zero address when setting owner",
    ],
    checklist: [
      "Constructor sets state correctly",
      "Require blocks invalid inputs",
      "Error messages are descriptive",
      "Owner-only functions are protected",
    ],
    shortSolution: `contract Vault {
    address public owner;
    uint256 public minDeposit;
    constructor(uint256 _min) { owner = msg.sender; minDeposit = _min; }
    function deposit() public payable { require(msg.value >= minDeposit, "Too low"); }
    function withdraw() public { require(msg.sender == owner, "Not owner"); payable(owner).transfer(address(this).balance); }
}`,
    fullSolution: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Vault {
    address public owner;
    uint256 public minDeposit;
    mapping(address => uint256) public balances;

    constructor(uint256 _min) {
        require(_min > 0, "Min must be > 0");
        owner = msg.sender;
        minDeposit = _min;
    }

    function deposit() public payable {
        require(msg.value >= minDeposit, "Below minimum deposit");
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds");
        payable(owner).transfer(balance);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}`,
  },
  {
    id: "beginner-05",
    level: "beginner",
    order: 5,
    title: "Conditionals & Control Flow",
    concept: "if/else, ternary operators, logical operators",
    explanation: {
      en: `Control flow in Solidity works similarly to other languages but has blockchain-specific considerations. Every branch costs gas, so keeping logic simple is important. Solidity supports if/else, ternary operators, and logical operators (&&, ||, !). There are no switch statements in Solidity.`,
      pt: `O fluxo de controle em Solidity funciona igual a C, Java ou JavaScript, mas com uma diferença importante: **cada operação custa gas**. Isso significa que lógica complexa com muitos branches torna o contrato mais caro de usar.\n\n**if / else if / else:**\n\`\`\`solidity\nif (score >= 90) return "A";\nelse if (score >= 80) return "B";\nelse return "F";\n\`\`\`\nNão existe \`switch/case\` em Solidity — use if/else if encadeados.\n\n**Operador ternário** — para lógica simples em uma linha:\n\`bool isAdult = age >= 18 ? true : false;\`\n\n**Operadores lógicos:**\n- \`&&\` (E): ambas as condições devem ser verdadeiras\n- \`||\` (OU): pelo menos uma deve ser verdadeira\n- \`!\` (NÃO): inverte o valor booleano\n\nSolidity usa **short-circuit evaluation**: em \`A && B\`, se A for falso, B nem é avaliado (economiza gas). Em \`A || B\`, se A for verdadeiro, B nem é avaliado.\n\n**Boas práticas:** valide entradas com \`require\` ANTES do if/else, use \`require\` para pré-condições e if/else apenas para lógica de negócio. Prefira retornos antecipados (\`if (x) return "A";\`) para evitar aninhamento profundo.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AccessControl {
    address public owner;
    mapping(address => bool) public admins;
    mapping(address => uint256) public userLevel;

    constructor() {
        owner = msg.sender;
        admins[msg.sender] = true;
        userLevel[msg.sender] = 3;
    }

    function getAccessTier(address user) public view returns (string memory) {
        if (user == owner) {
            return "Owner";
        } else if (admins[user]) {
            return "Admin";
        } else if (userLevel[user] > 0) {
            return "User";
        } else {
            return "Guest";
        }
    }

    function canPerformAction(address user, uint256 requiredLevel) public view returns (bool) {
        // Ternary + logical operators
        return user == owner ? true : (admins[user] && userLevel[user] >= requiredLevel);
    }

    function setUserLevel(address user, uint256 level) public {
        require(msg.sender == owner || admins[msg.sender], "Not authorized");
        require(level <= 3, "Invalid level");
        userLevel[user] = level;
    }
}`,
    foundryWorkflow: `forge build
forge test -vvv

# Use verbose mode to see which branches execute
forge test -vvvv`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• if/else syntax in Solidity (same as C, Java, JavaScript)\n• Ternary operator: \`condition ? true_value : false_value\`\n• Logical operators: \`&&\` (AND), \`||\` (OR), \`!\` (NOT)\n• There is no switch/case in Solidity — use if/else if/else\n• Each conditional branch adds gas cost — keep it simple\n• How to return \`string memory\` in Solidity\n\n🔍 **Search for:** "Solidity if else", "Solidity ternary operator", "Solidity control flow"\n\n📖 **Docs:** solidity-by-example.org/if-else`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• Sintaxe if/else em Solidity (igual a C, Java, JavaScript)\n• Operador ternário: \`condição ? valor_true : valor_false\`\n• Operadores lógicos: \`&&\` (E), \`||\` (OU), \`!\` (NÃO)\n• Não existe switch/case em Solidity — use if/else if/else\n• Cada branch condicional adiciona custo de gas — mantenha simples\n• Como retornar \`string memory\` em Solidity\n\n🔍 **Pesquise por:** "Solidity if else", "Solidity ternary operator", "Solidity control flow"\n\n📖 **Documentação:** solidity-by-example.org/if-else`,
    },
    challenge: `Crie um contrato \`GradingSystem\` (sistema de notas) com:\n\n**Passo 1:** Crie uma função \`getGrade(uint256 score) public pure returns (string memory)\`\n\n**Passo 2:** Dentro da função, adicione validação: \`require(score <= 100, "Nota deve ser entre 0 e 100")\`\n\n**Passo 3:** Implemente a lógica de notas usando if/else if/else:\n  - score >= 90 → retorna "A"\n  - score >= 80 → retorna "B"\n  - score >= 70 → retorna "C"\n  - score >= 60 → retorna "D"\n  - caso contrário → retorna "F"\n\n**Passo 4:** Crie uma segunda função \`passed(uint256 score) public pure returns (bool)\` que retorna true se score >= 60\n\n**Passo 5:** Crie uma terceira função \`getGradeAndStatus(uint256 score) public pure returns (string memory grade, bool pass)\` que chama as duas funções anteriores e retorna ambos os valores em uma tupla\n\n**Passo 6:** Teste com os casos: 0, 59, 60, 70, 80, 90, 100 para verificar todos os limites\n\n✅ **Critério de sucesso:** getGrade(75) retorna "C", passed(60) retorna true, passed(59) retorna false`,
    hints: [
      "Return `string memory` for string return types",
      "Use multiple if/else branches for grade ranges",
      "A simple boolean return works for pass/fail",
    ],
    commonMistakes: [
      "Not covering all edge cases",
      "Complex nested conditionals (keep it flat)",
      "Forgetting that each branch adds gas cost",
    ],
    bestPractices: [
      "Keep conditionals simple and readable",
      "Validate inputs before branching",
      "Prefer early returns to reduce nesting",
      "Use require for preconditions, if/else for logic",
    ],
    checklist: [
      "All grade ranges are covered",
      "Edge cases (0, 100) work correctly",
      "Pass/fail function is accurate",
      "Input validation prevents invalid scores",
    ],
    shortSolution: `contract GradingSystem {
    function getGrade(uint256 score) public pure returns (string memory) {
        require(score <= 100, "Invalid");
        if (score >= 90) return "A";
        else if (score >= 80) return "B";
        else if (score >= 70) return "C";
        else if (score >= 60) return "D";
        else return "F";
    }
    function passed(uint256 score) public pure returns (bool) { return score >= 60; }
}`,
    fullSolution: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GradingSystem {
    function getGrade(uint256 score) public pure returns (string memory) {
        require(score <= 100, "Score must be 0-100");
        if (score >= 90) return "A";
        else if (score >= 80) return "B";
        else if (score >= 70) return "C";
        else if (score >= 60) return "D";
        else return "F";
    }

    function passed(uint256 score) public pure returns (bool) {
        require(score <= 100, "Score must be 0-100");
        return score >= 60;
    }

    function getGradeAndStatus(uint256 score) public pure returns (string memory grade, bool pass) {
        grade = getGrade(score);
        pass = passed(score);
    }
}`,
  },
  {
    id: "beginner-06",
    level: "beginner",
    order: 6,
    title: "Arrays",
    concept: "Fixed and dynamic arrays, push, pop, length, iteration",
    explanation: {
      en: `Solidity supports both fixed-size and dynamic arrays. Dynamic arrays stored in storage can grow with \`push()\` and shrink with \`pop()\`. Arrays are zero-indexed. Be cautious with loops over arrays — gas costs grow linearly with array size. For large datasets, consider mappings instead.`,
      pt: `Arrays em Solidity armazenam múltiplos valores do mesmo tipo em sequência.\n\n**Tipos de array:**\n- **Fixo:** \`uint256[3] public fixedArr\` — sempre tem exatamente 3 elementos\n- **Dinâmico:** \`uint256[] public dynArr\` — cresce e diminui conforme necessário\n\n**Operações principais:**\n- \`dynArr.push(valor)\` — adiciona ao final\n- \`dynArr.pop()\` — remove o último elemento\n- \`dynArr.length\` — retorna o tamanho atual\n- \`dynArr[i]\` — acessa o elemento no índice i (começa em 0!)\n\n**O padrão swap-and-pop** para remover do meio em O(1):\n\`\`\`solidity\n// Remove elemento no índice i sem deixar gap\narr[i] = arr[arr.length - 1]; // copia o último para o lugar do removido\narr.pop(); // remove o último (que agora está duplicado)\n\`\`\`\nCuidado: isso muda a ordem do array! Se a ordem importa, use outro método.\n\n**NÃO use** \`delete arr[i]\` para remover — ele deixa um zero no lugar, criando um "gap" no array.\n\n**Custo de gas:** loops em arrays crescem linearmente. Um array com 1000 itens custa 1000x mais gas que um com 1 item. Para dados grandes, prefira mappings. Arrays são bons para listas pequenas (< 100 itens) onde você precisa de iteração.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TodoList {
    string[] public todos;
    uint256[] public priorities;

    function addTodo(string memory _todo, uint256 _priority) public {
        todos.push(_todo);
        priorities.push(_priority);
    }

    function removeLast() public {
        require(todos.length > 0, "No todos");
        todos.pop();
        priorities.pop();
    }

    function getTodoCount() public view returns (uint256) {
        return todos.length;
    }

    function getAllTodos() public view returns (string[] memory) {
        return todos;
    }

    // Remove by index (swap with last, then pop)
    function remove(uint256 index) public {
        require(index < todos.length, "Out of bounds");
        todos[index] = todos[todos.length - 1];
        priorities[index] = priorities[priorities.length - 1];
        todos.pop();
        priorities.pop();
    }
}`,
    foundryWorkflow: `forge build
forge test -vvv

# Check gas for array operations
forge test --gas-report`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• Difference between fixed-size arrays (\`uint256[3]\`) and dynamic arrays (\`uint256[]\`)\n• Array methods: \`.push()\` to add, \`.pop()\` to remove last, \`.length\` for size\n• Why arrays are zero-indexed\n• The "swap and pop" pattern to remove elements from the middle in O(1)\n• Why using delete on arrays leaves gaps (zeros) — avoid it!\n• Gas cost increases linearly with array size in loops\n• Returning arrays: use \`returns (uint256[] memory)\`\n\n🔍 **Search for:** "Solidity dynamic array push pop", "Solidity array delete gas", "swap and pop pattern Solidity"\n\n📖 **Docs:** solidity-by-example.org/array`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• Diferença entre arrays de tamanho fixo (\`uint256[3]\`) e dinâmicos (\`uint256[]\`)\n• Métodos de array: \`.push()\` para adicionar, \`.pop()\` para remover o último, \`.length\` para tamanho\n• Por que arrays são indexados a partir de 0 (zero-indexed)\n• O padrão "swap and pop" para remover elementos do meio do array em O(1)\n• Por que usar delete em arrays deixa gaps (zeros) — evite!\n• O custo de gas aumenta linearmente com o tamanho do array em loops\n• Retornar arrays: use \`returns (uint256[] memory)\`\n\n🔍 **Pesquise por:** "Solidity dynamic array push pop", "Solidity array delete gas", "swap and pop pattern Solidity"\n\n📖 **Documentação:** solidity-by-example.org/array`,
    },
    challenge: `Crie um contrato \`NumberList\` que gerencia uma lista de números:\n\n**Passo 1:** Declare \`uint256[] public numbers\` como variável de estado\n\n**Passo 2:** Crie \`add(uint256 n) public\` que usa \`numbers.push(n)\` para adicionar\n\n**Passo 3:** Crie \`remove(uint256 index) public\` usando o padrão swap-and-pop:\n  - Validação: \`require(index < numbers.length, "Indice invalido")\`\n  - Copie o último elemento para o índice removido: \`numbers[index] = numbers[numbers.length - 1]\`\n  - Remova o último: \`numbers.pop()\`\n  - Por que isso funciona? Porque a ordem não importa, mas é O(1) em vez de O(n)\n\n**Passo 4:** Crie \`getAll() public view returns (uint256[] memory)\` que retorna o array inteiro\n\n**Passo 5:** Crie \`length() public view returns (uint256)\` que retorna \`numbers.length\`\n\n**Passo 6:** Crie \`exists(uint256 value) public view returns (bool)\` que itera pelo array e retorna true se o valor existir\n\n**Passo 7:** Teste: adicione [10, 20, 30], remova o índice 0 e verifique que o array ficou [30, 20] (a ordem muda com swap-and-pop!)\n\n✅ **Critério de sucesso:** remove() funciona sem gaps, exists() encontra valores corretamente`,
    hints: [
      "Use swap-and-pop pattern for efficient removal",
      "Remember arrays are zero-indexed",
      "Returning dynamic arrays works with `memory` keyword",
    ],
    commonMistakes: [
      "Deleting array elements with `delete` (leaves a gap with zero value)",
      "Not checking array bounds before access",
      "Iterating over very large arrays (gas limit)",
    ],
    bestPractices: [
      "Use swap-and-pop for O(1) removal",
      "Always check array bounds",
      "Avoid unbounded loops over arrays",
      "Consider mappings for large datasets",
    ],
    checklist: [
      "Add and remove work correctly",
      "Bounds checking is implemented",
      "Swap-and-pop pattern is used",
      "Length function is accurate",
    ],
    shortSolution: `contract NumberList {
    uint256[] public numbers;
    function add(uint256 n) public { numbers.push(n); }
    function remove(uint256 i) public {
        numbers[i] = numbers[numbers.length - 1];
        numbers.pop();
    }
    function getAll() public view returns (uint256[] memory) { return numbers; }
    function length() public view returns (uint256) { return numbers.length; }
}`,
    fullSolution: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract NumberList {
    uint256[] public numbers;

    function add(uint256 n) public {
        numbers.push(n);
    }

    function remove(uint256 index) public {
        require(index < numbers.length, "Out of bounds");
        numbers[index] = numbers[numbers.length - 1];
        numbers.pop();
    }

    function getAll() public view returns (uint256[] memory) {
        return numbers;
    }

    function length() public view returns (uint256) {
        return numbers.length;
    }

    function exists(uint256 value) public view returns (bool) {
        for (uint256 i = 0; i < numbers.length; i++) {
            if (numbers[i] == value) return true;
        }
        return false;
    }
}`,
  },
  {
    id: "beginner-07",
    level: "beginner",
    order: 7,
    title: "Mappings",
    concept: "Key-value storage, nested mappings, mapping patterns",
    explanation: {
      en: `Mappings are hash tables that map keys to values. They are the most gas-efficient way to store and retrieve data by key. Unlike arrays, you cannot iterate over mappings or get their length. All possible keys exist with a default value (0 for uint, false for bool, address(0) for address). Nested mappings are common for complex relationships.`,
      pt: `Mappings são como dicionários ou hash tables em outras linguagens: você associa uma chave a um valor.\n\n**Sintaxe:** \`mapping(TipoChave => TipoValor) public meuMapping;\`\n\nExemplos:\n- \`mapping(address => uint256) public balances;\` — saldo por endereço\n- \`mapping(string => string) public phonebook;\` — nome → telefone\n- \`mapping(address => mapping(address => bool)) public aprovados;\` — mapping aninhado\n\n**Diferenças cruciais vs arrays:**\n- Mappings **NÃO têm length** — você não sabe quantas entradas existem\n- Mappings **NÃO podem ser iterados** — não dá para listar todas as chaves\n- Todas as chaves **já "existem"** com valor padrão: 0, false ou address(0)\n- \`delete mapping[key]\` **não remove** a chave — apenas reseta para o valor padrão\n\n**Verificar se uma string está vazia:** \`bytes(str).length == 0\`\n\n**Quando usar mapping vs array:**\n- Mapping: quando você sabe a chave e quer busca em O(1) (ex: saldo por endereço)\n- Array: quando você precisa iterar ou não conhece a chave antecipadamente\n- Combo: use mapping + array juntos quando precisar de ambos`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract UserRegistry {
    mapping(address => string) public userNames;
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => bool)) public isFriend;

    uint256 public userCount;

    function register(string memory name) public {
        require(bytes(userNames[msg.sender]).length == 0, "Already registered");
        userNames[msg.sender] = name;
        userCount++;
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function addFriend(address friend) public {
        require(friend != msg.sender, "Cannot friend yourself");
        isFriend[msg.sender][friend] = true;
    }

    function areFriends(address a, address b) public view returns (bool) {
        return isFriend[a][b] && isFriend[b][a];
    }
}`,
    foundryWorkflow: `forge build
forge test -vvv

# Interact with deployed contract
anvil &
forge create src/UserRegistry.sol:UserRegistry --rpc-url http://localhost:8545 --private-key 0xac0974...

# Call functions using cast
cast call <CONTRACT_ADDRESS> "userCount()" --rpc-url http://localhost:8545
cast send <CONTRACT_ADDRESS> "register(string)" "Alice" --rpc-url http://localhost:8545 --private-key 0xac0974...`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• What is a mapping — like a hash table/dictionary in other languages\n• Syntax: \`mapping(KeyType => ValueType) public myMapping\`\n• Key differences vs arrays:\n  - Mappings have NO length\n  - Mappings CANNOT be iterated\n  - All keys "exist" with default value (0, false, address(0))\n• How to check if a string is empty: \`bytes(str).length == 0\`\n• How to delete an entry: \`delete myMapping[key]\` (resets to default value)\n• Nested mappings: \`mapping(address => mapping(address => bool))\`\n\n🔍 **Search for:** "Solidity mapping tutorial", "Solidity nested mapping", "Solidity mapping vs array when to use"\n\n📖 **Docs:** solidity-by-example.org/mapping`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• O que é um mapping — como uma hash table/dicionário em outras linguagens\n• Sintaxe: \`mapping(KeyType => ValueType) public myMapping\`\n• Diferenças chave vs arrays:\n  - Mappings NÃO têm length\n  - Mappings NÃO podem ser iterados\n  - Todas as keys "existem" com valor padrão (0, false, address(0))\n• Como verificar se uma string está vazia: \`bytes(str).length == 0\`\n• Como deletar uma entrada: \`delete myMapping[key]\` (reseta para o valor padrão)\n• Mappings aninhados: \`mapping(address => mapping(address => bool))\`\n\n🔍 **Pesquise por:** "Solidity mapping tutorial", "Solidity nested mapping", "Solidity mapping vs array when to use"\n\n📖 **Documentação:** solidity-by-example.org/mapping`,
    },
    challenge: `Crie um contrato \`Phonebook\` (lista telefônica) com:\n\n**Passo 1:** Declare \`mapping(string => string) public entries\` para mapear nomes para números\n\n**Passo 2:** Declare \`uint256 public count\` para rastrear a quantidade de entradas\n\n**Passo 3:** Crie \`add(string memory name, string memory phone) public\`:\n  - Valide que o nome não existe ainda: \`require(bytes(entries[name]).length == 0, "Ja existe")\`\n  - Adicione: \`entries[name] = phone\`\n  - Incremente: \`count++\`\n\n**Passo 4:** Crie \`update(string memory name, string memory phone) public\`:\n  - Valide que o nome existe: \`require(bytes(entries[name]).length > 0, "Nao encontrado")\`\n  - Atualize: \`entries[name] = phone\`\n\n**Passo 5:** Crie \`remove(string memory name) public\`:\n  - Valide existência\n  - Delete: \`delete entries[name]\`\n  - Decremente: \`count--\`\n\n**Passo 6:** Crie \`lookup(string memory name) public view returns (string memory)\` que retorna o número\n\n**Passo 7:** Observe que você não pode listar TODAS as entradas — mappings não são iteráveis!\n\n✅ **Critério de sucesso:** add/update/remove/lookup funcionam, e tentar adicionar um nome duplicado reverte`,
    hints: [
      "Use `bytes(str).length == 0` to check for empty strings",
      "Delete a mapping entry with `delete mapping[key]`",
      "Track count manually since mappings have no length",
    ],
    commonMistakes: [
      "Trying to iterate over a mapping",
      "Assuming deleted mapping values don't exist (they reset to default)",
      "Not tracking mapping size separately",
    ],
    bestPractices: [
      "Combine mappings with arrays when you need iteration",
      "Use nested mappings for multi-dimensional data",
      "Track mapping size with a counter",
      "Check for existence before operations",
    ],
    checklist: [
      "Add, update, remove work correctly",
      "Count tracks entries accurately",
      "Lookup returns correct values",
      "Edge cases are handled",
    ],
    shortSolution: `contract Phonebook {
    mapping(string => string) public entries;
    uint256 public count;
    function add(string memory name, string memory phone) public {
        require(bytes(entries[name]).length == 0, "Exists");
        entries[name] = phone;
        count++;
    }
    function remove(string memory name) public { delete entries[name]; count--; }
}`,
    fullSolution: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Phonebook {
    mapping(string => string) public entries;
    uint256 public count;

    function add(string memory name, string memory phone) public {
        require(bytes(entries[name]).length == 0, "Already exists");
        entries[name] = phone;
        count++;
    }

    function update(string memory name, string memory phone) public {
        require(bytes(entries[name]).length > 0, "Not found");
        entries[name] = phone;
    }

    function remove(string memory name) public {
        require(bytes(entries[name]).length > 0, "Not found");
        delete entries[name];
        count--;
    }

    function lookup(string memory name) public view returns (string memory) {
        return entries[name];
    }
}`,
  },
  {
    id: "beginner-08",
    level: "beginner",
    order: 8,
    title: "Mini-Project: Counter dApp",
    concept: "Building a complete counter contract with frontend integration",
    explanation: {
      en: `This is your first full project! You'll build a counter smart contract and connect it to a React frontend. This teaches the fundamental pattern of all dApps: deploy a contract, create an ABI, and interact with it from JavaScript using ethers.js or viem. The counter is simple but the workflow is the same for complex apps.`,
      pt: `Este é seu primeiro projeto completo — do contrato ao deploy real!\n\nO fluxo de qualquer dApp é sempre o mesmo:\n1. **Escreva o contrato** em Solidity\n2. **Compile** com \`forge build\` → gera a ABI em \`out/\`\n3. **Teste** com \`forge test\`\n4. **Deploy** na blockchain (Anvil local ou rede real)\n5. **Conecte o frontend** usando a ABI e o endereço do contrato\n\n**O que é a ABI?** Application Binary Interface — um arquivo JSON que descreve todas as funções, parâmetros e eventos do contrato. O JavaScript usa a ABI para saber como chamar o contrato.\n\n**Por que eventos são importantes para o frontend?** Sem eventos, o frontend teria que ficar fazendo polling (consultas repetidas) para saber se algo mudou. Com eventos, o contrato "avisa" o frontend quando o estado muda — como um WebSocket.\n\n**ethers.js** é a biblioteca mais popular para conectar JavaScript/TypeScript à Ethereum. Com ela você cria um objeto \`Contract\` que tem os mesmos métodos do contrato Solidity.\n\nO Counter é simples, mas o padrão é idêntico para qualquer dApp complexo.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Counter {
    uint256 public count;

    event CountChanged(uint256 newCount, address changedBy);

    function increment() public {
        count++;
        emit CountChanged(count, msg.sender);
    }

    function decrement() public {
        require(count > 0, "Cannot go below zero");
        count--;
        emit CountChanged(count, msg.sender);
    }

    function reset() public {
        count = 0;
        emit CountChanged(count, msg.sender);
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}`,
    foundryWorkflow: `# Initialize project
forge init counter-dapp
cd counter-dapp

# Write contract in src/Counter.sol
# Write test in test/Counter.t.sol

forge build
forge test -vvv

# Start local blockchain
anvil

# Deploy (in another terminal)
forge create src/Counter.sol:Counter \\
  --rpc-url http://localhost:8545 \\
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

# Interact via cast
cast call <ADDRESS> "getCount()" --rpc-url http://localhost:8545
cast send <ADDRESS> "increment()" --rpc-url http://localhost:8545 --private-key 0xac0974...

# Frontend: Use the ABI from out/Counter.sol/Counter.json
# Connect with ethers.js or viem`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• What is a dApp (decentralized application) — frontend + contract on the blockchain\n• What is an ABI (Application Binary Interface) — how the frontend calls the contract\n• What are events in Solidity — how the frontend detects state changes\n• How to use Foundry: forge build, forge test, anvil, forge create\n• What is ethers.js — JavaScript library for interacting with Ethereum\n• Basic dApp flow: deploy → read ABI → create Contract object → call functions\n\n🔍 **Search for:** "Foundry forge create deploy", "ethers.js Contract object", "Solidity events frontend"\n\n📖 **Docs:** book.getfoundry.sh/reference/forge/forge-create`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• O que é um dApp (decentralized application) — frontend + contrato na blockchain\n• O que é uma ABI (Application Binary Interface) — como o frontend chama o contrato\n• O que são eventos em Solidity — como o frontend detecta mudanças de estado\n• Como usar o Foundry: forge build, forge test, anvil, forge create\n• O que é ethers.js — biblioteca JavaScript para interagir com Ethereum\n• Fluxo básico de dApp: deploy → ler ABI → criar Contract object → chamar funções\n\n🔍 **Pesquise por:** "Foundry forge create deploy", "ethers.js Contract object", "Solidity events frontend"\n\n📖 **Documentação:** book.getfoundry.sh/reference/forge/forge-create`,
    },
    challenge: `Construa o Counter dApp completo:\n\n**Passo 1 — Contrato:** Salve o código de exemplo em \`src/Counter.sol\` (já está no exemplo acima)\n\n**Passo 2 — Testes:** Crie \`test/Counter.t.sol\` com:\n  - função \`setUp()\` que faz deploy: \`counter = new Counter()\`\n  - \`testIncrement()\`: chama increment() e verifica count == 1\n  - \`testDecrement()\`: incrementa, depois decrementa e verifica count == 0\n  - \`testDecrementAtZero()\`: use \`vm.expectRevert\` para verificar que decrement() reverte quando count == 0\n  - \`testReset()\`: incrementa 3 vezes, reseta, verifica count == 0\n\n**Passo 3 — Deploy local:** Execute \`anvil\` em um terminal separado. No outro terminal:\n  \`forge create src/Counter.sol:Counter --rpc-url http://localhost:8545 --private-key 0xac0974...\`\n\n**Passo 4 — Interação via cast:**\n  - Leia o count: \`cast call <ENDERECO> "getCount()" --rpc-url http://localhost:8545\`\n  - Incremente: \`cast send <ENDERECO> "increment()" --rpc-url http://localhost:8545 --private-key 0xac0974...\`\n\n**Passo 5 — Integração Frontend (conceitual):** Descreva (em comentários ou README) como você:\n  - Conectaria MetaMask\n  - Criaria o objeto \`ethers.Contract\` com a ABI do arquivo \`out/Counter.sol/Counter.json\`\n  - Chamaria \`increment()\` com um botão\n  - Escutaria o evento \`CountChanged\` para atualizar a UI em tempo real\n\n✅ **Critério de sucesso:** forge test passa, deploy funciona, cast send incrementa o contador`,
    hints: [
      "Events help the frontend listen for state changes",
      "The ABI is generated in the `out/` folder after `forge build`",
      "Use ethers.js Contract class to interact from JS",
    ],
    commonMistakes: [
      "Forgetting to emit events (frontend can't detect changes)",
      "Not handling the decrement underflow",
      "Hardcoding contract addresses (use environment variables)",
    ],
    bestPractices: [
      "Always emit events for state changes",
      "Write comprehensive tests before deployment",
      "Use environment variables for addresses",
      "Handle all edge cases in the contract",
    ],
    checklist: [
      "Contract compiles and all tests pass",
      "Events are emitted correctly",
      "Decrement handles zero case",
      "Contract deploys to Anvil",
      "ABI is accessible for frontend",
    ],
    shortSolution: `// See example above - the Counter contract is the solution.
// Key addition: tests
contract CounterTest is Test {
    Counter counter;
    function setUp() public { counter = new Counter(); }
    function testIncrement() public {
        counter.increment();
        assertEq(counter.count(), 1);
    }
}`,
    fullSolution: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Counter {
    uint256 public count;
    event CountChanged(uint256 newCount, address changedBy);

    function increment() public { count++; emit CountChanged(count, msg.sender); }
    function decrement() public { require(count > 0, "Cannot go below zero"); count--; emit CountChanged(count, msg.sender); }
    function reset() public { count = 0; emit CountChanged(count, msg.sender); }
    function getCount() public view returns (uint256) { return count; }
}

// Frontend pseudo-code (React + ethers.js):
// const provider = new ethers.BrowserProvider(window.ethereum);
// const signer = await provider.getSigner();
// const contract = new ethers.Contract(ADDRESS, ABI, signer);
// const count = await contract.getCount();
// await contract.increment();
// contract.on("CountChanged", (newCount, changedBy) => { setCount(newCount); });`,
  },
  {
    id: "beginner-09",
    level: "beginner",
    order: 9,
    title: "Mini-Project: Message Storage dApp",
    concept: "String storage, message board, frontend reads/writes",
    explanation: {
      en: `A message storage contract teaches string handling, event emission, and how frontends display on-chain data. You'll store messages with sender addresses and timestamps, then read them from a React frontend. This pattern is the basis for social media dApps, comment systems, and forums.`,
      pt: `Uma MessageBoard on-chain ensina como guardar dados estruturados na blockchain e expô-los ao frontend.\n\n**Structs** permitem agrupar dados relacionados em um único tipo:\n\`\`\`solidity\nstruct Message {\n    address sender;    // quem enviou\n    string content;    // o texto\n    uint256 timestamp; // quando (block.timestamp)\n}\n\`\`\`\n\n**block.timestamp** é o timestamp Unix do bloco atual (em segundos). Cuidado: mineradores podem manipular esse valor em ±15 segundos — não use para lógica crítica de segurança, mas é ótimo para timestamps de mensagens.\n\n**Por que limitar o tamanho das mensagens?** Strings grandes aumentam o custo de gas. Limite com \`require(bytes(content).length <= 280)\`. \`bytes(str).length\` retorna o número de bytes da string.\n\n**Eventos indexed** permitem que o frontend filtre por remetente:\n\`event MessagePosted(address indexed sender, string content, uint256 timestamp);\`\nCom \`indexed\`, o frontend pode buscar apenas mensagens de um endereço específico usando \`contract.filters.MessagePosted(enderecoEspecifico)\`.\n\n**Problema de escala:** retornar todas as mensagens de uma vez pode ultrapassar o limite de gas. A função \`getLatestMessages(uint256 count)\` retorna apenas as últimas N — este é o padrão de paginação básica.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MessageBoard {
    struct Message {
        address sender;
        string content;
        uint256 timestamp;
    }

    Message[] public messages;
    mapping(address => uint256) public messageCount;

    event MessagePosted(address indexed sender, string content, uint256 timestamp);

    function postMessage(string memory _content) public {
        require(bytes(_content).length > 0, "Empty message");
        require(bytes(_content).length <= 280, "Too long");

        messages.push(Message({
            sender: msg.sender,
            content: _content,
            timestamp: block.timestamp
        }));

        messageCount[msg.sender]++;
        emit MessagePosted(msg.sender, _content, block.timestamp);
    }

    function getMessageCount() public view returns (uint256) {
        return messages.length;
    }

    function getMessage(uint256 index) public view returns (address, string memory, uint256) {
        require(index < messages.length, "Invalid index");
        Message memory m = messages[index];
        return (m.sender, m.content, m.timestamp);
    }

    function getLatestMessages(uint256 count) public view returns (Message[] memory) {
        uint256 len = messages.length;
        uint256 resultCount = count > len ? len : count;
        Message[] memory result = new Message[](resultCount);

        for (uint256 i = 0; i < resultCount; i++) {
            result[i] = messages[len - resultCount + i];
        }
        return result;
    }
}`,
    foundryWorkflow: `forge init message-board
cd message-board

# Write contract, then test
forge build
forge test -vvv

# Deploy and interact
anvil &
forge create src/MessageBoard.sol:MessageBoard --rpc-url http://localhost:8545 --private-key 0xac0974...

cast send <ADDR> "postMessage(string)" "Hello World!" --rpc-url http://localhost:8545 --private-key 0xac0974...
cast call <ADDR> "getMessageCount()" --rpc-url http://localhost:8545`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• How to use structs to group related data\n• How to store structs in arrays: \`Message[] public messages\`\n• How to create structs: \`messages.push(Message({sender: msg.sender, content: _content, timestamp: block.timestamp}))\`\n• What is \`block.timestamp\` — the current block timestamp in Unix seconds\n• What is an \`indexed\` event — allows filtering events by that parameter\n• How to limit string size: \`bytes(_content).length\`\n• Why returning all data at once can be dangerous (gas limit)\n\n🔍 **Search for:** "Solidity struct array", "Solidity block.timestamp", "Solidity event indexed parameter"\n\n📖 **Docs:** solidity-by-example.org/structs`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• Como usar structs para agrupar dados relacionados\n• Como armazenar structs em arrays: \`Message[] public messages\`\n• Como criar structs: \`messages.push(Message({sender: msg.sender, content: _content, timestamp: block.timestamp}))\`\n• O que é \`block.timestamp\` — o timestamp do bloco atual em segundos Unix\n• O que é um evento \`indexed\` — permite filtrar eventos por esse parâmetro\n• Como limitar tamanho de strings: \`bytes(_content).length\`\n• Por que retornar todos os dados de uma vez pode ser perigoso (gas limit)\n\n🔍 **Pesquise por:** "Solidity struct array", "Solidity block.timestamp", "Solidity event indexed parameter"\n\n📖 **Documentação:** solidity-by-example.org/structs`,
    },
    challenge: `Construa o MessageBoard (quadro de mensagens) completo:\n\n**Passo 1 — Contrato:** Implemente o MessageBoard com o struct \`Message\` contendo: sender, content, timestamp\n\n**Passo 2 — Validações em postMessage():**\n  - Mensagem não pode ser vazia: \`require(bytes(_content).length > 0)\`\n  - Limite de 280 caracteres: \`require(bytes(_content).length <= 280)\`\n  - Use \`block.timestamp\` para o timestamp\n  - Emita o evento \`MessagePosted\`\n\n**Passo 3 — Funções de leitura:**\n  - \`getMessageCount()\` — retorna messages.length\n  - \`getMessage(uint256 index)\` — retorna uma mensagem específica com validação de bounds\n  - \`getLatestMessages(uint256 count)\` — retorna as últimas N mensagens\n\n**Passo 4 — Testes:** Escreva testes para:\n  - Postar uma mensagem e verificar o conteúdo\n  - Tentar postar mensagem vazia (deve reverter)\n  - Tentar postar mensagem com mais de 280 chars (deve reverter)\n  - Verificar que o timestamp é o correto\n\n**Passo 5 — Deploy e interação:**\n  - Deploy no Anvil\n  - Post via cast send\n  - Leia via cast call\n\n✅ **Critério de sucesso:** Mensagens são armazenadas com sender e timestamp, mensagens vazias são rejeitadas`,
    hints: [
      "Use structs to group related data",
      "Events with `indexed` parameters are filterable",
      "The frontend can filter events by sender",
    ],
    commonMistakes: [
      "Not limiting message length (DoS risk)",
      "Returning all messages at once (gas limit)",
      "Not using indexed event parameters",
    ],
    bestPractices: [
      "Limit string lengths to prevent abuse",
      "Use pagination for large datasets",
      "Index event parameters for efficient filtering",
      "Store minimal data on-chain",
    ],
    checklist: [
      "Messages store correctly",
      "Events emit with correct data",
      "Latest messages function works",
      "Input validation is thorough",
      "Tests cover all functions",
    ],
    shortSolution: `// See example above. The MessageBoard contract is complete.`,
    fullSolution: `// The example code above is the full solution.
// For the frontend, use ethers.js to:
// 1. Connect to provider
// 2. Load contract with ABI
// 3. Call getLatestMessages() to display feed
// 4. Call postMessage() on form submit
// 5. Listen to MessagePosted events for real-time updates`,
  },
  {
    id: "beginner-10",
    level: "beginner",
    order: 10,
    title: "Mini-Project: On-Chain Todo List",
    concept: "CRUD operations, struct arrays, todo management with frontend",
    explanation: {
      en: `The todo list contract combines arrays, structs, mappings, and CRUD operations into a practical project. Each user has their own todo list stored on-chain. This teaches per-user data isolation, state management patterns, and how a frontend would render and update a dynamic list.`,
      pt: `A TodoList on-chain combina tudo que aprendemos nos exercícios anteriores em um CRUD real.\n\n**Isolamento de dados por usuário** é o conceito central:\n\`mapping(address => Todo[]) private userTodos;\`\n\nCada endereço tem seu próprio array de todos. Quando Alice chama \`createTodo()\`, os dados vão para \`userTodos[alice]\`. Quando Bob chama, vão para \`userTodos[bob]\`. É impossível acessar os dados de outro usuário.\n\n**IDs auto-incrementais por usuário:**\n\`mapping(address => uint256) private nextId;\`\nCada usuário tem seu próprio contador de IDs. Alice tem todos 0,1,2 e Bob também tem todos 0,1,2 — não conflitam.\n\n**CRUD em Solidity:**\n- **Create:** \`userTodos[msg.sender].push()\`\n- **Read:** \`return userTodos[msg.sender]\`\n- **Update:** \`userTodos[msg.sender][index].completed = !...\`\n- **Delete:** swap-and-pop para evitar gaps\n\n**Por que emitir eventos para todas as operações?** O frontend precisa saber quando algo mudou para atualizar a UI. Sem eventos, seria necessário fazer polling constante, o que é ineficiente. Com eventos, a UI atualiza em tempo real.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TodoList {
    struct Todo {
        uint256 id;
        string content;
        bool completed;
        uint256 createdAt;
    }

    mapping(address => Todo[]) private userTodos;
    mapping(address => uint256) private nextId;

    event TodoCreated(address indexed user, uint256 id, string content);
    event TodoToggled(address indexed user, uint256 id, bool completed);
    event TodoDeleted(address indexed user, uint256 id);

    function createTodo(string memory _content) public {
        require(bytes(_content).length > 0, "Empty content");
        uint256 id = nextId[msg.sender]++;

        userTodos[msg.sender].push(Todo({
            id: id,
            content: _content,
            completed: false,
            createdAt: block.timestamp
        }));

        emit TodoCreated(msg.sender, id, _content);
    }

    function toggleTodo(uint256 _index) public {
        require(_index < userTodos[msg.sender].length, "Invalid index");
        userTodos[msg.sender][_index].completed = !userTodos[msg.sender][_index].completed;
        emit TodoToggled(msg.sender, userTodos[msg.sender][_index].id, userTodos[msg.sender][_index].completed);
    }

    function deleteTodo(uint256 _index) public {
        require(_index < userTodos[msg.sender].length, "Invalid index");
        uint256 id = userTodos[msg.sender][_index].id;
        uint256 lastIndex = userTodos[msg.sender].length - 1;

        if (_index != lastIndex) {
            userTodos[msg.sender][_index] = userTodos[msg.sender][lastIndex];
        }
        userTodos[msg.sender].pop();
        emit TodoDeleted(msg.sender, id);
    }

    function getTodos() public view returns (Todo[] memory) {
        return userTodos[msg.sender];
    }

    function getTodoCount() public view returns (uint256) {
        return userTodos[msg.sender].length;
    }
}`,
    foundryWorkflow: `forge init todo-dapp
cd todo-dapp
# Write contract and tests
forge build
forge test -vvv --gas-report

# Deploy
anvil &
forge create src/TodoList.sol:TodoList --rpc-url http://localhost:8545 --private-key 0xac0974...

# Test CRUD via cast
cast send <ADDR> "createTodo(string)" "Learn Solidity" --rpc-url http://localhost:8545 --private-key 0xac0974...
cast call <ADDR> "getTodoCount()" --rpc-url http://localhost:8545`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• How to do CRUD (Create, Read, Update, Delete) in Solidity\n• How to isolate data per user: \`mapping(address => Todo[])\`\n• Why using \`msg.sender\` as key ensures each user only accesses their own data\n• The swap-and-pop pattern for deleting from arrays\n• How to use auto-incrementing IDs: \`mapping(address => uint256) private nextId\`\n• Why emitting events for ALL CRUD operations is important for the frontend\n\n🔍 **Search for:** "Solidity per user data mapping", "Solidity CRUD contract pattern", "Solidity array deletion pattern"\n\n📖 **Docs:** solidity-by-example.org/mapping`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• Como fazer CRUD (Create, Read, Update, Delete) em Solidity\n• Como isolar dados por usuário: \`mapping(address => Todo[])\`\n• Por que usar \`msg.sender\` como chave garante que cada usuário só acessa seus próprios dados\n• O padrão swap-and-pop para deletar de arrays\n• Como usar IDs auto-incrementais: \`mapping(address => uint256) private nextId\`\n• Por que emitir eventos para TODAS as operações CRUD é importante para o frontend\n\n🔍 **Pesquise por:** "Solidity per user data mapping", "Solidity CRUD contract pattern", "Solidity array deletion pattern"\n\n📖 **Documentação:** solidity-by-example.org/mapping`,
    },
    challenge: `Construa o TodoList on-chain completo:\n\n**Passo 1 — Estruturas:** Defina o struct \`Todo\` com: id, content, completed, createdAt\n\n**Passo 2 — Storage:** Use \`mapping(address => Todo[]) private userTodos\` e \`mapping(address => uint256) private nextId\`\n\n**Passo 3 — createTodo(string memory _content):**\n  - Valide: require content não vazio\n  - Obtenha o id: \`uint256 id = nextId[msg.sender]++\`\n  - Adicione ao array do usuário\n  - Emita TodoCreated\n\n**Passo 4 — toggleTodo(uint256 _index):**\n  - Valide: index < userTodos[msg.sender].length\n  - Inverta: \`userTodos[msg.sender][_index].completed = !userTodos[msg.sender][_index].completed\`\n  - Emita TodoToggled\n\n**Passo 5 — deleteTodo(uint256 _index):**\n  - Valide o índice\n  - Use swap-and-pop\n  - Emita TodoDeleted\n\n**Passo 6 — Leitura:**\n  - \`getTodos()\` retorna todos os todos do \`msg.sender\`\n  - \`getTodoCount()\` retorna o número de todos do usuário\n\n**Passo 7 — Testes:** Verifique isolamento de dados — crie todos como Alice, tente ler como Bob, deve retornar array vazio\n\n✅ **Critério de sucesso:** Dados de diferentes usuários são completamente isolados, CRUD funciona corretamente`,
    hints: [
      "Use `msg.sender` as the key for per-user storage",
      "Swap-and-pop for O(1) deletion",
      "Return the full array for small lists; paginate for large ones",
    ],
    commonMistakes: [
      "Not isolating data per user",
      "Using `delete` on array elements (leaves gaps)",
      "Not emitting events for frontend sync",
    ],
    bestPractices: [
      "Isolate user data with mapping(address => ...)",
      "Use events for all state changes",
      "Implement swap-and-pop deletion",
      "Keep on-chain data minimal",
    ],
    checklist: [
      "CRUD operations all work",
      "Per-user data isolation verified",
      "Events emit correctly",
      "Delete uses swap-and-pop",
      "Tests cover all paths",
    ],
    shortSolution: `// See example - it's the complete TodoList contract`,
    fullSolution: `// The example code above is the full solution.
// Frontend integration:
// 1. Connect wallet
// 2. Load user's todos with getTodos()
// 3. Render as a list with checkboxes and delete buttons
// 4. Call createTodo(), toggleTodo(), deleteTodo() on user actions
// 5. Listen to events for real-time updates`,
  },

  // ===== INTERMEDIATE (11-20) =====
  {
    id: "intermediate-01",
    level: "intermediate",
    order: 1,
    title: "Structs & Enums",
    concept: "Custom data types with structs and enums",
    explanation: {
      en: `Structs let you define custom data types grouping related variables. Enums define a set of named constants, perfect for states and categories. Together they make contracts more readable and type-safe. Enums are represented as uint8 internally, starting from 0.`,
      pt: `Structs e Enums são as ferramentas para criar tipos de dados customizados em Solidity.\n\n**Struct** — agrupa variáveis relacionadas em um único tipo:\n\`\`\`solidity\nstruct Order {\n    uint256 id;\n    address buyer;\n    uint256 amount;\n    Status status; // usa o enum abaixo\n}\n\`\`\`\n\n**Enum** — conjunto fixo de estados nomeados, representado internamente como uint8:\n\`\`\`solidity\nenum Status { Pending, Shipped, Delivered, Cancelled }\n// Pending = 0, Shipped = 1, Delivered = 2, Cancelled = 3\n\`\`\`\n\nEnums podem ser comparados com operadores: \`Status.Shipped > Status.Pending\` é true.\n\n**Storage vs Memory com structs — diferença CRÍTICA:**\n\`\`\`solidity\n// ERRADO: memory cria uma cópia local — não salva!\nOrder memory order = orders[id];\norder.status = Status.Shipped; // modifica apenas a cópia!\n\n// CORRETO: storage é uma referência real ao blockchain\nOrder storage order = orders[id];\norder.status = Status.Shipped; // modifica o storage real!\n\`\`\`\n\n**Quando usar memory:** apenas para leitura (view functions) — é mais barato.\n**Quando usar storage:** quando você precisa modificar campos do struct no lugar.\n\nEste erro de storage vs memory é um dos mais comuns em Solidity — memorize bem!`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract OrderSystem {
    enum Status { Pending, Shipped, Delivered, Cancelled }

    struct Order {
        uint256 id;
        address buyer;
        string product;
        uint256 amount;
        Status status;
        uint256 createdAt;
    }

    Order[] public orders;
    mapping(address => uint256[]) public userOrders;

    event OrderCreated(uint256 indexed id, address indexed buyer, string product);
    event OrderStatusChanged(uint256 indexed id, Status newStatus);

    function createOrder(string memory _product) public payable {
        require(msg.value > 0, "Must send ETH");

        uint256 id = orders.length;
        orders.push(Order({
            id: id,
            buyer: msg.sender,
            product: _product,
            amount: msg.value,
            status: Status.Pending,
            createdAt: block.timestamp
        }));

        userOrders[msg.sender].push(id);
        emit OrderCreated(id, msg.sender, _product);
    }

    function updateStatus(uint256 _id, Status _status) public {
        require(_id < orders.length, "Invalid order");
        Order storage order = orders[_id];
        require(order.status != Status.Cancelled, "Order cancelled");
        require(uint8(_status) > uint8(order.status), "Cannot go backwards");

        order.status = _status;
        emit OrderStatusChanged(_id, _status);
    }

    function getOrder(uint256 _id) public view returns (Order memory) {
        require(_id < orders.length, "Invalid order");
        return orders[_id];
    }
}`,
    foundryWorkflow: `forge build
forge test -vvv

# Test enum transitions
forge test --match-test testStatusTransition -vvv`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• What are structs — custom data types that group related variables\n• How to declare and use structs: creation, access with dot notation (struct.field)\n• What are enums — sets of named constants (internally they are uint8 starting at 0)\n• How to use enums for finite state machines (e.g.: Pending → Shipped → Delivered)\n• Critical difference between \`storage\` and \`memory\` when working with structs:\n  - \`Task storage t = tasks[id]\` → real reference, modifies storage\n  - \`Task memory t = tasks[id]\` → local copy, does NOT modify storage\n\n🔍 **Search for:** "Solidity struct storage vs memory", "Solidity enum state machine", "Solidity struct array mapping"\n\n📖 **Docs:** solidity-by-example.org/structs, solidity-by-example.org/enum`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• O que são structs — tipos de dados customizados que agrupam variáveis relacionadas\n• Como declarar e usar structs: criação, acesso com ponto (struct.campo)\n• O que são enums — conjuntos de constantes nomeadas (internamente são uint8 começando em 0)\n• Como usar enums para máquinas de estado finito (ex: Pending → Shipped → Delivered)\n• Diferença crítica entre \`storage\` e \`memory\` ao trabalhar com structs:\n  - \`Task storage t = tasks[id]\` → referência real, modifica o storage\n  - \`Task memory t = tasks[id]\` → cópia local, NÃO modifica o storage\n\n🔍 **Pesquise por:** "Solidity struct storage vs memory", "Solidity enum state machine", "Solidity struct array mapping"\n\n📖 **Documentação:** solidity-by-example.org/structs, solidity-by-example.org/enum`,
    },
    challenge: `Crie um \`TaskManager\` com prioridades e status:\n\n**Passo 1:** Declare o enum \`Priority { Low, Medium, High, Critical }\`\n\n**Passo 2:** Declare o struct \`Task\` com campos: id (uint256), title (string), assignee (address), priority (Priority), completed (bool)\n\n**Passo 3:** Declare \`Task[] public tasks\` para armazenar todas as tarefas\n\n**Passo 4:** Crie \`createTask(string memory _title, address _assignee, Priority _priority) public\`:\n  - Faça push do novo Task no array com \`tasks.push(Task(tasks.length, _title, _assignee, _priority, false))\`\n\n**Passo 5:** Crie \`completeTask(uint256 _id) public\`:\n  - ATENÇÃO: use \`Task storage task = tasks[_id]\` (não memory!) para modificar em lugar\n  - Valide que o id existe: \`require(_id < tasks.length)\`\n  - Marque como completo: \`task.completed = true\`\n\n**Passo 6:** Crie \`getTask(uint256 _id) public view returns (Task memory)\`\n\n**Passo 7:** Crie \`getTasksByPriority(Priority _priority) public view returns (Task[] memory)\`:\n  - Itere o array, filtre por prioridade, retorne subarray\n\n✅ **Critério de sucesso:** Task storage (não memory) modifica o estado corretamente, enums são comparáveis com > e <`,
    hints: [
      "Enums can be compared with > < operators (they're uint8)",
      "Use `storage` keyword when modifying struct fields in place",
      "Struct memory copies are cheaper for read-only operations",
    ],
    commonMistakes: [
      "Forgetting `storage` vs `memory` when modifying structs",
      "Not validating enum transitions",
      "Creating overly complex nested structs",
    ],
    bestPractices: [
      "Use enums for finite state machines",
      "Keep structs focused and minimal",
      "Use storage references for modifications, memory for reads",
      "Validate state transitions",
    ],
    checklist: [
      "Enum values are correctly defined",
      "Struct stores all required fields",
      "CRUD operations work",
      "Status transitions are validated",
    ],
    shortSolution: `enum Priority { Low, Medium, High, Critical }
struct Task { uint256 id; string title; address assignee; Priority priority; bool completed; }
mapping(uint256 => Task) public tasks;`,
    fullSolution: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
contract TaskManager {
    enum Priority { Low, Medium, High, Critical }
    struct Task { uint256 id; string title; address assignee; Priority priority; bool completed; }
    Task[] public tasks;
    function createTask(string memory _title, address _assignee, Priority _priority) public {
        tasks.push(Task(tasks.length, _title, _assignee, _priority, false));
    }
    function completeTask(uint256 _id) public { tasks[_id].completed = true; }
    function getTask(uint256 _id) public view returns (Task memory) { return tasks[_id]; }
}`,
  },
  {
    id: "intermediate-02",
    level: "intermediate",
    order: 2,
    title: "Events & Logging",
    concept: "Event declaration, emission, indexed parameters, frontend listening",
    explanation: {
      en: `Events are the bridge between smart contracts and frontends. When emitted, they create logs stored on-chain that are searchable but not accessible from within contracts. Indexed parameters (up to 3) enable efficient filtering. Events cost gas to emit but are much cheaper than storage. Frontends use event listeners to react to contract changes in real-time.`,
      pt: `Eventos são a forma que contratos têm de "comunicar" mudanças ao mundo externo.\n\n**Como funcionam:**\n1. O contrato emite um evento: \`emit Transferido(msg.sender, to, amount)\`\n2. O evento é gravado nos **logs** do bloco (não no state da EVM)\n3. O frontend escuta e reage: \`contract.on("Transferido", callback)\`\n\n**Eventos vs Storage:**\n- Storage: caro (20.000 gas por slot), acessível de dentro do contrato\n- Eventos: baratos (~375 gas base), **não** acessíveis de dentro do contrato, mas consultáveis externamente\n\n**Parâmetros \`indexed\`** — permitem filtragem eficiente (máx. 3 por evento):\n\`\`\`solidity\nevent Transfer(address indexed from, address indexed to, uint256 amount);\n// Com indexed, você pode buscar: "todas as transferências de alice"\n// Sem indexed, você teria que varrer TODOS os eventos\n\`\`\`\n\n**\`vm.expectEmit\` no Foundry** verifica que um evento foi emitido corretamente nos testes:\n\`\`\`solidity\nvm.expectEmit(true, true, false, true); // quais params verificar\nemit Transfer(alice, bob, 100);          // o evento esperado\ntoken.transfer(bob, 100);               // a chamada que deve emitir\n\`\`\`\nOs 4 bools indicam: verificar topic1 (from), topic2 (to), topic3 (sem indexed aqui), dados não-indexed.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AuctionHouse {
    event AuctionCreated(uint256 indexed auctionId, address indexed seller, uint256 startPrice);
    event BidPlaced(uint256 indexed auctionId, address indexed bidder, uint256 amount);
    event AuctionEnded(uint256 indexed auctionId, address winner, uint256 finalPrice);

    struct Auction {
        address seller;
        uint256 highestBid;
        address highestBidder;
        bool ended;
    }

    mapping(uint256 => Auction) public auctions;
    uint256 public auctionCount;

    function createAuction(uint256 startPrice) public {
        uint256 id = auctionCount++;
        auctions[id] = Auction(msg.sender, startPrice, address(0), false);
        emit AuctionCreated(id, msg.sender, startPrice);
    }

    function bid(uint256 auctionId) public payable {
        Auction storage auction = auctions[auctionId];
        require(!auction.ended, "Auction ended");
        require(msg.value > auction.highestBid, "Bid too low");

        auction.highestBid = msg.value;
        auction.highestBidder = msg.sender;
        emit BidPlaced(auctionId, msg.sender, msg.value);
    }
}`,
    foundryWorkflow: `forge test -vvv
# Verbose output shows emitted events

# Check event logs
forge test --match-test testBidPlaced -vvvv

# In tests, use vm.expectEmit to verify events:
# vm.expectEmit(true, true, false, true);
# emit BidPlaced(0, bidder, 1 ether);`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• What are events in Solidity and how they differ from storage:\n  - Events are cheap (not stored in EVM state)\n  - Events cannot be read from inside the contract\n  - Events create logs on the blockchain that can be queried\n• What is \`indexed\` in events — allows filtering by that parameter (max 3)\n• How to use \`vm.expectEmit\` in Foundry to verify events in tests\n• Why frontends depend on events to detect changes in real time\n• The difference between \`emit EventName(param1, param2)\` and simply updating a variable\n\n🔍 **Search for:** "Solidity events indexed", "forge vm.expectEmit", "ethers.js event listener"\n\n📖 **Docs:** solidity-by-example.org/events`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• O que são eventos em Solidity e como eles diferem do storage:\n  - Eventos são baratos (não ficam no state da EVM)\n  - Eventos não podem ser lidos de dentro do contrato\n  - Eventos criam logs na blockchain que podem ser consultados\n• O que é \`indexed\` em eventos — permite filtrar por esse parâmetro (máximo 3)\n• Como usar \`vm.expectEmit\` no Foundry para verificar eventos nos testes\n• Por que frontends dependem de eventos para detectar mudanças em tempo real\n• A diferença entre \`emit EventName(param1, param2)\` e simplesmente atualizar uma variável\n\n🔍 **Pesquise por:** "Solidity events indexed", "forge vm.expectEmit", "ethers.js event listener"\n\n📖 **Documentação:** solidity-by-example.org/events`,
    },
    challenge: `Crie um \`PaymentProcessor\` com eventos completos:\n\n**Passo 1:** Declare os eventos:\n  - \`event PaymentSent(address indexed from, address indexed to, uint256 amount)\`\n  - \`event PaymentReceived(address indexed receiver, uint256 amount)\`\n  - \`event RefundIssued(address indexed to, uint256 amount)\`\n\n**Passo 2:** Declare \`mapping(address => uint256) public balances\`\n\n**Passo 3:** Crie \`send(address to) public payable\`:\n  - Valide: require(msg.value > 0)\n  - Atualize o balanço do destinatário\n  - Emita AMBOS os eventos: PaymentSent e PaymentReceived\n\n**Passo 4:** Crie \`refund(address to, uint256 amount) public\`:\n  - Valide saldo suficiente\n  - Atualize o saldo ANTES de transferir (CEI pattern!)\n  - Transfira com \`payable(to).call{value: amount}("")\`\n  - Emita RefundIssued\n\n**Passo 5 — Testes com vm.expectEmit:**\n\`\`\`solidity\nvm.expectEmit(true, true, false, true);\nemit PaymentSent(address(this), bob, 1 ether);\nprocessor.send{value: 1 ether}(bob);\n\`\`\`\n\n✅ **Critério de sucesso:** vm.expectEmit verifica eventos corretamente nos testes`,
    hints: [
      "Up to 3 parameters can be indexed",
      "Use `vm.expectEmit` in Foundry tests to verify events",
      "Events are cheaper than storage for historical data",
    ],
    commonMistakes: [
      "Not indexing important parameters",
      "Indexing too many parameters (max 3)",
      "Emitting events with wrong parameter order",
      "Not emitting events for critical state changes",
    ],
    bestPractices: [
      "Index addresses and IDs for filtering",
      "Emit events for every state change",
      "Use descriptive event names",
      "Keep event parameters minimal",
    ],
    checklist: [
      "Events declared with proper parameters",
      "Indexed parameters enable filtering",
      "Events emitted at correct points",
      "Tests verify event emission",
    ],
    shortSolution: `event PaymentSent(address indexed from, address indexed to, uint256 amount);
event RefundIssued(address indexed to, uint256 amount);
function send(address to) public payable { emit PaymentSent(msg.sender, to, msg.value); }`,
    fullSolution: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
contract PaymentProcessor {
    event PaymentSent(address indexed from, address indexed to, uint256 amount);
    event RefundIssued(address indexed to, uint256 amount);
    mapping(address => uint256) public balances;
    function send(address to) public payable {
        require(msg.value > 0, "No value");
        balances[to] += msg.value;
        emit PaymentSent(msg.sender, to, msg.value);
    }
    function refund(address to, uint256 amount) public {
        require(balances[to] >= amount, "Insufficient");
        balances[to] -= amount;
        payable(to).transfer(amount);
        emit RefundIssued(to, amount);
    }
}`,
  },
  {
    id: "intermediate-03",
    level: "intermediate",
    order: 3,
    title: "Modifiers",
    concept: "Function modifiers, access control, reusable validation",
    explanation: {
      en: `Modifiers are reusable code blocks that wrap function execution. The \`_;\` placeholder indicates where the function body runs. They're perfect for access control, input validation, and state checks. You can stack multiple modifiers on a single function. Modifiers reduce code duplication and centralize access control logic.`,
      pt: `Modifiers são "wrappers" reutilizáveis que envolvem funções — evitam repetição de código de validação.\n\n**Sintaxe básica:**\n\`\`\`solidity\nmodifier onlyOwner() {\n    require(msg.sender == owner, "Nao e o dono");\n    _; // aqui o corpo da função é inserido e executado\n}\n\`\`\`\n\nSem modifier, você teria que repetir o \`require\` em CADA função protegida. Com modifier, centraliza em um lugar.\n\n**O \`_;\`** é o placeholder — indica onde o corpo da função vai. Tudo antes de \`_;\` roda antes da função, tudo depois roda depois:\n\`\`\`solidity\nmodifier rateLimited(uint256 cooldown) {\n    require(block.timestamp >= lastAction[msg.sender] + cooldown); // PRÉ\n    _; // aqui a função executa\n    lastAction[msg.sender] = block.timestamp; // PÓS (roda após a função!)\n}\n\`\`\`\n\n**Empilhando modifiers** (executam da esquerda para direita):\n\`function acao() public onlyOwner whenNotPaused rateLimited(60) { }\`\nOrdem de execução: onlyOwner → whenNotPaused → rateLimited → corpo da função\n\n**Modifiers com parâmetros:**\n\`modifier minDeposit(uint256 min) { require(msg.value >= min, "Muito baixo"); _; }\`\n\`function deposit() public payable minDeposit(0.1 ether) { }\`\n\nBoa prática: cada modifier faz UMA verificação. Modifiers com lógica complexa ficam difíceis de auditar.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MultiSigWallet {
    address[] public owners;
    mapping(address => bool) public isOwner;
    uint256 public requiredApprovals;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not an owner");
        _;
    }

    modifier validAddress(address _addr) {
        require(_addr != address(0), "Invalid address");
        _;
    }

    modifier notExecuted(uint256 _txId) {
        require(!transactions[_txId].executed, "Already executed");
        _;
    }

    struct Transaction {
        address to;
        uint256 value;
        bool executed;
        uint256 approvalCount;
    }

    Transaction[] public transactions;
    mapping(uint256 => mapping(address => bool)) public approved;

    constructor(address[] memory _owners, uint256 _required) {
        require(_owners.length > 0, "Need owners");
        require(_required > 0 && _required <= _owners.length, "Invalid required");

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "Invalid owner");
            require(!isOwner[owner], "Duplicate owner");
            isOwner[owner] = true;
            owners.push(owner);
        }
        requiredApprovals = _required;
    }

    function submitTransaction(address _to, uint256 _value)
        public onlyOwner validAddress(_to)
    {
        transactions.push(Transaction(_to, _value, false, 0));
    }

    function approve(uint256 _txId) public onlyOwner notExecuted(_txId) {
        require(!approved[_txId][msg.sender], "Already approved");
        approved[_txId][msg.sender] = true;
        transactions[_txId].approvalCount++;
    }
}`,
    foundryWorkflow: `forge build
forge test -vvv

# Test access control
forge test --match-test testOnlyOwner -vvv
# Use vm.prank(address) to simulate different callers
# Use vm.expectRevert("Not an owner") to test reverts`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• What is a modifier — a reusable "wrapper" for functions\n• The syntax: \`modifier myMod() { /* pre-conditions */; _; /* post-conditions */ }\`\n• What is \`_;\` — placeholder where the function body is inserted\n• How to stack modifiers: \`function f() public onlyOwner whenNotPaused {}\`\n• Execution order with stacked modifiers (left to right)\n• Modifiers with parameters: \`modifier rateLimited(uint256 cooldown)\`\n• Why modifiers reduce code duplication in access control checks\n\n🔍 **Search for:** "Solidity modifier tutorial", "Solidity modifier with parameters", "Solidity modifier execution order"\n\n📖 **Docs:** solidity-by-example.org/function-modifier`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• O que é um modifier — um "wrapper" reutilizável para funções\n• A sintaxe: \`modifier nomeMod() { /* pré-condições */; _; /* pós-condições */ }\`\n• O que é o \`_;\` — placeholder onde o corpo da função é inserido\n• Como empilhar modifiers: \`function f() public onlyOwner whenNotPaused {}\`\n• Ordem de execução com modifiers empilhados (da esquerda para a direita)\n• Modifiers com parâmetros: \`modifier rateLimited(uint256 cooldown)\`\n• Por que modifiers reduzem duplicação de código em verificações de acesso\n\n🔍 **Pesquise por:** "Solidity modifier tutorial", "Solidity modifier with parameters", "Solidity modifier execution order"\n\n📖 **Documentação:** solidity-by-example.org/function-modifier`,
    },
    challenge: `Crie um contrato \`SecureContract\` com 3 modifiers diferentes:\n\n**Passo 1:** Declare variáveis de estado: \`address public owner\`, \`bool public paused\`, \`mapping(address => uint256) public lastAction\`\n\n**Passo 2:** No constructor, defina \`owner = msg.sender\`\n\n**Passo 3:** Crie o modifier \`onlyOwner()\`:\n  \`modifier onlyOwner() { require(msg.sender == owner, "Nao e o dono"); _; }\`\n\n**Passo 4:** Crie o modifier \`whenNotPaused()\`:\n  \`modifier whenNotPaused() { require(!paused, "Contrato pausado"); _; }\`\n\n**Passo 5:** Crie o modifier com parâmetro \`rateLimited(uint256 cooldown)\`:\n  - Verifique: \`require(block.timestamp >= lastAction[msg.sender] + cooldown)\`\n  - Execute a função: \`_;\`\n  - Depois, registre: \`lastAction[msg.sender] = block.timestamp\`\n\n**Passo 6:** Crie funções que usam os modifiers:\n  - \`pause() public onlyOwner\`\n  - \`unpause() public onlyOwner\`\n  - \`sensitiveAction() public onlyOwner whenNotPaused rateLimited(60)\`\n\n**Passo 7 — Testes:** Use \`vm.prank(alice)\` para chamar sensitiveAction como Alice (não owner) — deve reverter\n\n✅ **Critério de sucesso:** Modifiers empilhados funcionam em ordem, rate limiting previne chamadas repetidas`,
    hints: [
      "The `_;` placeholder runs the function body",
      "Modifiers can take parameters",
      "Stack modifiers: `function f() public onlyOwner whenNotPaused`",
    ],
    commonMistakes: [
      "Forgetting the `_;` in modifier body",
      "Complex logic in modifiers (keep them simple)",
      "Not considering modifier execution order",
    ],
    bestPractices: [
      "Keep modifiers focused on one check",
      "Use descriptive modifier names",
      "Avoid state changes in modifiers",
      "Combine modifiers for layered security",
    ],
    checklist: [
      "Modifiers restrict access correctly",
      "Multiple modifiers work together",
      "Reverts have clear messages",
      "Tests verify all access paths",
    ],
    shortSolution: `modifier onlyOwner() { require(msg.sender == owner, "Not owner"); _; }
modifier whenNotPaused() { require(!paused, "Paused"); _; }
function sensitiveAction() public onlyOwner whenNotPaused { /* ... */ }`,
    fullSolution: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
contract SecureContract {
    address public owner;
    bool public paused;
    mapping(address => uint256) public lastAction;

    constructor() { owner = msg.sender; }
    modifier onlyOwner() { require(msg.sender == owner, "Not owner"); _; }
    modifier whenNotPaused() { require(!paused, "Paused"); _; }
    modifier rateLimited(uint256 cooldown) {
        require(block.timestamp >= lastAction[msg.sender] + cooldown, "Too soon");
        _;
        lastAction[msg.sender] = block.timestamp;
    }
    function pause() public onlyOwner { paused = true; }
    function unpause() public onlyOwner { paused = false; }
    function sensitiveAction() public onlyOwner whenNotPaused rateLimited(60) { }
}`,
  },
  {
    id: "intermediate-04",
    level: "intermediate",
    order: 4,
    title: "Inheritance & Interfaces",
    concept: "Contract inheritance, virtual/override, interfaces, abstract contracts",
    explanation: {
      en: `Solidity supports single and multiple inheritance. Functions marked \`virtual\` can be overridden by child contracts using \`override\`. Interfaces define function signatures without implementation — contracts must implement all interface functions. Abstract contracts can have some implemented and some unimplemented functions. This enables modular, reusable contract design.`,
      pt: `Herança em Solidity permite reutilizar código entre contratos, similar a OOP.\n\n**Herança básica:**\n\`contract Filho is Pai { }\` — Filho herda todas as funções e variáveis de Pai.\n\n**virtual e override:**\n\`\`\`solidity\ncontract Pai {\n    function saudacao() public virtual returns (string memory) {\n        return "Ola do Pai";\n    }\n}\ncontract Filho is Pai {\n    function saudacao() public override returns (string memory) {\n        return "Ola do Filho";\n    }\n}\n\`\`\`\n- \`virtual\` — "esta função PODE ser sobrescrita"\n- \`override\` — "estou sobrescrevendo esta função do pai"\n\n**Interface** — contrato puro de definição (sem implementação, sem variáveis de estado):\n\`\`\`solidity\ninterface IToken {\n    function transfer(address to, uint256 amount) external returns (bool);\n    // todas as funções são implicitamente external e virtual\n}\n\`\`\`\nUse interfaces para interagir com contratos externos sem conhecer sua implementação.\n\n**Contrato abstract** — meio-termo: tem implementação parcial, não pode ser deployado sozinho:\n\`abstract contract Base { function logica() public virtual; } // não implementada\`\n\n**Herança múltipla** — Solidity usa C3 linearization para resolver ambiguidade:\n\`contract C is A, B { }\` — ordem importa! B "ganha" sobre A em caso de conflito.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IToken {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

abstract contract Ownable {
    address public owner;
    constructor() { owner = msg.sender; }
    modifier onlyOwner() { require(msg.sender == owner, "Not owner"); _; }
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Zero address");
        owner = newOwner;
    }
}

abstract contract Pausable is Ownable {
    bool public paused;
    modifier whenNotPaused() { require(!paused, "Paused"); _; }
    function pause() public onlyOwner { paused = true; }
    function unpause() public onlyOwner { paused = false; }
}

contract SimpleToken is Pausable, IToken {
    mapping(address => uint256) private _balances;
    uint256 public totalSupply;

    constructor(uint256 initialSupply) {
        _balances[msg.sender] = initialSupply;
        totalSupply = initialSupply;
    }

    function transfer(address to, uint256 amount) external override whenNotPaused returns (bool) {
        require(_balances[msg.sender] >= amount, "Insufficient balance");
        _balances[msg.sender] -= amount;
        _balances[to] += amount;
        return true;
    }

    function balanceOf(address account) external view override returns (uint256) {
        return _balances[account];
    }
}`,
    foundryWorkflow: `forge build
forge test -vvv

# Test interface compliance
# Test inheritance chain
# Test modifier inheritance`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• Inheritance in Solidity: \`contract Child is Parent { }\`\n• \`virtual\` functions — can be overridden by child contracts\n• The \`override\` keyword — required to override a virtual function\n• Interfaces: define function signatures without implementation, all functions are implicitly external and virtual\n• \`abstract\` contracts — have at least one unimplemented function\n• Multiple inheritance: \`contract C is A, B { }\` — order matters (C3 linearization)\n• How to call parent contract function: \`super.functionName()\`\n\n🔍 **Search for:** "Solidity inheritance override virtual", "Solidity interface", "Solidity abstract contract vs interface"\n\n📖 **Docs:** solidity-by-example.org/inheritance, solidity-by-example.org/interface`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• Herança em Solidity: \`contract Child is Parent { }\`\n• Funções \`virtual\` — podem ser sobrescritas por contratos filhos\n• Palavra-chave \`override\` — necessária para sobrescrever uma função virtual\n• Interfaces: definem assinaturas de funções sem implementação, todas funções são implicitamente external e virtual\n• Contratos \`abstract\` — têm pelo menos uma função não implementada\n• Herança múltipla: \`contract C is A, B { }\` — ordem importa (C3 linearization)\n• Como chamar função do contrato pai: \`super.functionName()\`\n\n🔍 **Pesquise por:** "Solidity inheritance override virtual", "Solidity interface", "Solidity abstract contract vs interface"\n\n📖 **Documentação:** solidity-by-example.org/inheritance, solidity-by-example.org/interface`,
    },
    challenge: `Crie uma hierarquia de contratos para um sistema de Vault:\n\n**Passo 1 — Interface:** Crie \`interface IVault\` com funções:\n  - \`function deposit() external payable\`\n  - \`function withdraw(uint256 amount) external\`\n  - \`function getBalance() external view returns (uint256)\`\n\n**Passo 2 — Contrato Abstrato:** Crie \`abstract contract BaseVault is IVault\` com:\n  - \`address public owner\`\n  - eventos: \`event Deposited(address indexed user, uint256 amount)\` e \`event Withdrawn(address indexed user, uint256 amount)\`\n  - constructor que define \`owner = msg.sender\`\n  - modifier \`onlyOwner()\`\n  - Deixe as 3 funções da interface como \`virtual\` sem implementação\n\n**Passo 3 — Implementação concreta:** Crie \`contract ETHVault is BaseVault\`:\n  - \`mapping(address => uint256) public balances\`\n  - Implemente \`deposit()\` com \`override\`: adiciona ao balanço, emite Deposited\n  - Implemente \`withdraw(amount)\` com \`override\`: valida saldo, atualiza, transfere, emite Withdrawn\n  - Implemente \`getBalance()\` com \`override\`: retorna balances[msg.sender]\n\n**Passo 4 — Teste de interface:** No teste, use a interface como tipo:\n  \`IVault vault = new ETHVault();\` — isso verifica conformidade com a interface\n\n✅ **Critério de sucesso:** ETHVault compila com todos os overrides corretos, testes via interface funcionam`,
    hints: [
      "Interfaces can only have function signatures",
      "Abstract contracts use `virtual` for overridable functions",
      "Use `override` keyword in child contracts",
    ],
    commonMistakes: [
      "Diamond inheritance problems (use C3 linearization)",
      "Forgetting `virtual` on base functions",
      "Not implementing all interface functions",
    ],
    bestPractices: [
      "Keep inheritance trees shallow",
      "Use interfaces for external contracts",
      "Use abstract contracts for shared logic",
      "Follow the Checks-Effects-Interactions pattern",
    ],
    checklist: [
      "Interface is properly defined",
      "Abstract contract compiles",
      "Concrete contract implements all functions",
      "Inheritance chain works correctly",
    ],
    shortSolution: `interface IVault { function deposit() external payable; function withdraw(uint256) external; }
abstract contract BaseVault is IVault { address public owner; constructor() { owner = msg.sender; } }
contract ETHVault is BaseVault {
    function deposit() external payable override {}
    function withdraw(uint256 amount) external override { payable(msg.sender).transfer(amount); }
}`,
    fullSolution: `// Full implementation with access control, events, and balance tracking.
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
interface IVault { function deposit() external payable; function withdraw(uint256) external; function getBalance() external view returns (uint256); }
abstract contract BaseVault is IVault {
    address public owner;
    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    constructor() { owner = msg.sender; }
    modifier onlyOwner() { require(msg.sender == owner, "Not owner"); _; }
}
contract ETHVault is BaseVault {
    mapping(address => uint256) public balances;
    function deposit() external payable override { balances[msg.sender] += msg.value; emit Deposited(msg.sender, msg.value); }
    function withdraw(uint256 amount) external override { require(balances[msg.sender] >= amount, "Insufficient"); balances[msg.sender] -= amount; payable(msg.sender).transfer(amount); emit Withdrawn(msg.sender, amount); }
    function getBalance() external view override returns (uint256) { return balances[msg.sender]; }
}`,
  },
  {
    id: "intermediate-05",
    level: "intermediate",
    order: 5,
    title: "Imports & Contract Architecture",
    concept: "File imports, project organization, separation of concerns",
    explanation: {
      en: `As projects grow, splitting contracts into multiple files becomes essential. Solidity supports named imports, wildcard imports, and path-based imports. Foundry uses remappings for cleaner import paths. Good architecture separates interfaces, libraries, base contracts, and implementations into distinct files. This mirrors production-grade projects like OpenZeppelin.`,
      pt: `Projetos reais têm dezenas de contratos — organização é essencial para manutenção e auditoria.\n\n**Tipos de import:**\n\`\`\`solidity\n// Wildcard (evite — polui o namespace):\nimport "./MeuContrato.sol";\n\n// Nomeado (preferido — explícito e claro):\nimport {MeuContrato} from "./MeuContrato.sol";\nimport {MeuContrato, MinhaLib} from "./MeuContrato.sol";\n\`\`\`\n\n**Estrutura recomendada de projeto:**\n\`\`\`\nsrc/\n  interfaces/    → apenas assinaturas (IToken.sol, IVault.sol)\n  base/          → contratos abstratos (Ownable.sol, Pausable.sol)\n  libraries/     → funções utilitárias sem estado\n  Token.sol      → implementações principais\ntest/\nscript/\n\`\`\`\n\n**Remappings no Foundry** — atalhos para imports longos:\nNo \`foundry.toml\`: \`remappings = ["@openzeppelin/=lib/openzeppelin-contracts/"]\`\nAí você usa: \`import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";\`\nEm vez de: \`import {Ownable} from "../../lib/openzeppelin-contracts/contracts/access/Ownable.sol";\`\n\n**Instalar bibliotecas:**\n\`forge install OpenZeppelin/openzeppelin-contracts\`\n\`forge install Uniswap/v3-core\`\n\nAs bibliotecas ficam em \`lib/\` e são rastreadas pelo git como submodules.\n\nImports circulares (A importa B que importa A) causam erro de compilação — planeje a arquitetura para evitar.`,
    },
    example: `// File: src/interfaces/IGovernance.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IGovernance {
    function propose(string memory description) external returns (uint256);
    function vote(uint256 proposalId, bool support) external;
}

// File: src/base/Ownable.sol
// import "./interfaces/IOwnable.sol";
// abstract contract Ownable { ... }

// File: src/Governance.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Named imports (preferred)
// import {IGovernance} from "./interfaces/IGovernance.sol";
// import {Ownable} from "./base/Ownable.sol";

// In Foundry, you can use remappings:
// import {Test} from "forge-std/Test.sol";
// import {console} from "forge-std/console.sol";

contract Governance {
    struct Proposal {
        string description;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
    }
    Proposal[] public proposals;

    function propose(string memory _desc) public returns (uint256) {
        proposals.push(Proposal(_desc, 0, 0, false));
        return proposals.length - 1;
    }
}`,
    foundryWorkflow: `# Foundry remappings in foundry.toml:
# [profile.default]
# src = "src"
# out = "out"
# libs = ["lib"]
# remappings = ["@openzeppelin/=lib/openzeppelin-contracts/"]

# Install OpenZeppelin
forge install OpenZeppelin/openzeppelin-contracts

# Now import:
# import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

forge build`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• How to do imports in Solidity: \`import "./MyContract.sol"\`\n• Named imports (preferred): \`import {MyContract} from "./MyContract.sol"\`\n• What are remappings in Foundry — how to configure them in foundry.toml\n• How to install libraries with Foundry: \`forge install OpenZeppelin/openzeppelin-contracts\`\n• Recommended project structure: \`src/interfaces/\`, \`src/base/\`, \`src/\`\n• The concept of "circular imports" and how to avoid them\n• Why one contract per file is an important convention\n\n🔍 **Search for:** "Foundry remappings", "forge install openzeppelin", "Solidity named imports best practice"\n\n📖 **Docs:** book.getfoundry.sh/config/remappings`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• Como fazer imports em Solidity: \`import "./MeuContrato.sol"\`\n• Imports nomeados (preferidos): \`import {MeuContrato} from "./MeuContrato.sol"\`\n• O que são remappings no Foundry — como configurar no foundry.toml\n• Como instalar bibliotecas com Foundry: \`forge install OpenZeppelin/openzeppelin-contracts\`\n• Estrutura de projeto recomendada: \`src/interfaces/\`, \`src/base/\`, \`src/\`\n• O conceito de "circular imports" e como evitá-los\n• Por que um contrato por arquivo é uma convenção importante\n\n🔍 **Pesquise por:** "Foundry remappings", "forge install openzeppelin", "Solidity named imports best practice"\n\n📖 **Documentação:** book.getfoundry.sh/config/remappings`,
    },
    challenge: `Organize um projeto com arquitetura modular em múltiplos arquivos:\n\n**Passo 1 — Estrutura de pastas:** Crie as pastas:\n  - \`src/interfaces/\`\n  - \`src/base/\`\n  - \`src/\`\n\n**Passo 2 — Interface:** Crie \`src/interfaces/IVault.sol\`:\n  \`interface IVault { function deposit() external payable; function withdraw(uint256 amount) external; }\`\n\n**Passo 3 — Contrato base:** Crie \`src/base/Ownable.sol\`:\n  \`abstract contract Ownable { address public owner; constructor() { owner = msg.sender; } modifier onlyOwner() { require(msg.sender == owner); _; } }\`\n\n**Passo 4 — Implementação principal:** Crie \`src/Vault.sol\` com imports nomeados:\n  \`import {IVault} from "./interfaces/IVault.sol";\`\n  \`import {Ownable} from "./base/Ownable.sol";\`\n  \`contract Vault is Ownable, IVault { ... }\`\n\n**Passo 5 — Instalar OpenZeppelin:** Execute \`forge install OpenZeppelin/openzeppelin-contracts\`\n  Adicione ao foundry.toml: \`remappings = ["@openzeppelin/=lib/openzeppelin-contracts/"]\`\n\n**Passo 6:** Importe Ownable do OpenZeppelin: \`import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";\`\n\n**Passo 7:** Execute \`forge build\` — todos os arquivos devem compilar\n\n✅ **Critério de sucesso:** forge build compila o projeto com imports de múltiplos arquivos e da OpenZeppelin`,
    hints: [
      "Named imports: `import {Contract} from './path'`",
      "Use remappings in foundry.toml for clean paths",
      "One contract per file is the convention",
    ],
    commonMistakes: [
      "Wildcard imports polluting namespace",
      "Circular imports",
      "Wrong import paths with Foundry remappings",
    ],
    bestPractices: [
      "Use named imports for clarity",
      "Group files by type: interfaces, base, implementations",
      "Keep import paths relative and short",
      "Use remappings for external libraries",
    ],
    checklist: [
      "Named imports used throughout",
      "File structure is logical",
      "No circular dependencies",
      "Remappings configured correctly",
    ],
    shortSolution: `// src/interfaces/IVault.sol
interface IVault { function deposit() external payable; }
// src/base/Ownable.sol
abstract contract Ownable { address public owner; }
// src/Vault.sol
import {IVault} from "./interfaces/IVault.sol";
import {Ownable} from "./base/Ownable.sol";
contract Vault is Ownable, IVault { function deposit() external payable override {} }`,
    fullSolution: `// See short solution - expand with full implementations for each file.`,
  },
  {
    id: "intermediate-06",
    level: "intermediate",
    order: 6,
    title: "Access Control Patterns",
    concept: "Role-based access, multi-role systems, admin patterns",
    explanation: {
      en: `Access control goes beyond simple owner checks. Role-based access control (RBAC) assigns specific permissions to addresses. Common patterns include single owner, multi-role with admin, and tiered access. OpenZeppelin's AccessControl is the industry standard. Understanding these patterns is crucial for secure contract design.`,
      pt: `Contratos reais precisam de controle de acesso granular — não apenas um único owner.\n\n**Problema do single-owner:** se a única conta com acesso for comprometida ou perdida, o contrato fica inutilizável. RBAC (Role-Based Access Control) distribui o poder.\n\n**Como funciona o RBAC:**\n\`\`\`solidity\nbytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");\nbytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");\n\nmapping(bytes32 => mapping(address => bool)) private _roles;\n\nmodifier onlyRole(bytes32 role) {\n    require(_roles[role][msg.sender], "Sem permissao");\n    _;\n}\n\`\`\`\n\n**Por que bytes32 e keccak256?** É mais eficiente em gas do que usar strings. O hash de "MINTER_ROLE" é sempre o mesmo bytes32, e é impossível gerar a mesma string de duas formas diferentes.\n\n**Padrões de acesso comuns em produção:**\n- \`ADMIN_ROLE\` — gerencia outros papéis\n- \`MINTER_ROLE\` — pode criar novos tokens\n- \`PAUSER_ROLE\` — pode pausar o contrato em emergências\n- \`UPGRADER_ROLE\` — pode atualizar o contrato (em contratos proxy)\n\n**OpenZeppelin AccessControl** implementa isso com segurança, incluindo:\n- Role admin (cada papel tem um papel "pai" que o gerencia)\n- Renúncia de papel pelo próprio detentor\n- Eventos para todas as mudanças de papel\n\nSempre tenha pelo menos 2 endereços com ADMIN_ROLE como backup!`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract RoleBasedAccess {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    mapping(bytes32 => mapping(address => bool)) private _roles;

    event RoleGranted(bytes32 indexed role, address indexed account);
    event RoleRevoked(bytes32 indexed role, address indexed account);

    modifier onlyRole(bytes32 role) {
        require(_roles[role][msg.sender], "Missing role");
        _;
    }

    constructor() {
        _roles[ADMIN_ROLE][msg.sender] = true;
        emit RoleGranted(ADMIN_ROLE, msg.sender);
    }

    function grantRole(bytes32 role, address account) public onlyRole(ADMIN_ROLE) {
        _roles[role][account] = true;
        emit RoleGranted(role, account);
    }

    function revokeRole(bytes32 role, address account) public onlyRole(ADMIN_ROLE) {
        _roles[role][account] = false;
        emit RoleRevoked(role, account);
    }

    function hasRole(bytes32 role, address account) public view returns (bool) {
        return _roles[role][account];
    }

    // Functions protected by specific roles
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        // mint logic
    }

    function burn(address from, uint256 amount) public onlyRole(BURNER_ROLE) {
        // burn logic
    }
}`,
    foundryWorkflow: `forge build
forge test -vvv

# Test role-based access
# vm.prank(minter) to simulate minter calling
# vm.expectRevert("Missing role") for unauthorized calls`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• The problem with the "single owner" pattern — a single point of failure\n• What is RBAC (Role-Based Access Control) — permissions based on roles\n• How to use \`keccak256("ROLE_NAME")\` to create role identifiers as bytes32\n• How to store permissions: \`mapping(bytes32 => mapping(address => bool))\`\n• The OpenZeppelin AccessControl pattern — industry standard\n• Why emitting \`RoleGranted\` and \`RoleRevoked\` events is important for auditing\n\n🔍 **Search for:** "Solidity role-based access control RBAC", "OpenZeppelin AccessControl", "keccak256 role identifier"\n\n📖 **Docs:** docs.openzeppelin.com/contracts/access-control`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• O problema com o padrão "single owner" — um único ponto de falha\n• O que é RBAC (Role-Based Access Control) — permissões baseadas em papéis\n• Como usar \`keccak256("NOME_DO_ROLE")\` para criar identificadores de papel como bytes32\n• Como armazenar permissões: \`mapping(bytes32 => mapping(address => bool))\`\n• O padrão da OpenZeppelin AccessControl — padrão da indústria\n• Por que emitir eventos \`RoleGranted\` e \`RoleRevoked\` é importante para auditoria\n\n🔍 **Pesquise por:** "Solidity role-based access control RBAC", "OpenZeppelin AccessControl", "keccak256 role identifier"\n\n📖 **Documentação:** docs.openzeppelin.com/contracts/access-control`,
    },
    challenge: `Implemente um sistema RBAC com 3 papéis distintos:\n\n**Passo 1:** Declare as constantes de papel:\n  - \`bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE")\`\n  - \`bytes32 public constant EDITOR_ROLE = keccak256("EDITOR_ROLE")\`\n  - \`bytes32 public constant VIEWER_ROLE = keccak256("VIEWER_ROLE")\`\n\n**Passo 2:** Declare \`mapping(bytes32 => mapping(address => bool)) private _roles\`\n\n**Passo 3:** No constructor, conceda ADMIN_ROLE ao msg.sender\n\n**Passo 4:** Crie modifier \`onlyRole(bytes32 role)\`\n\n**Passo 5:** Crie \`grantRole(bytes32 role, address account) public onlyRole(ADMIN_ROLE)\`\n\n**Passo 6:** Crie \`revokeRole(bytes32 role, address account) public onlyRole(ADMIN_ROLE)\`\n\n**Passo 7:** Crie funções protegidas por papel:\n  - \`editContent(string memory content) public onlyRole(EDITOR_ROLE)\`\n  - \`readContent() public view onlyRole(VIEWER_ROLE) returns (string memory)\`\n\n**Passo 8 — Testes:** Verifique que:\n  - Admin pode conceder papéis\n  - Editor pode editar mas não é admin\n  - Viewer só pode ler\n  - Endereço sem papel não pode fazer nada\n\n✅ **Critério de sucesso:** Funções protegidas revertem para endereços sem o papel correto`,
    hints: [
      "Use `keccak256` to create role identifiers",
      "Nested mappings: `mapping(bytes32 => mapping(address => bool))`",
      "Admin should be the only role that can grant/revoke",
    ],
    commonMistakes: [
      "Not protecting role management functions",
      "Single admin with no backup (add role to multiple addresses)",
      "Not emitting events for role changes",
    ],
    bestPractices: [
      "Use bytes32 constants for role names",
      "Emit events for all role changes",
      "Consider role hierarchies",
      "Always have a way to recover admin access",
    ],
    checklist: [
      "Roles are properly defined",
      "Grant and revoke work correctly",
      "Role checks protect functions",
      "Events track all changes",
    ],
    shortSolution: `bytes32 public constant ADMIN = keccak256("ADMIN");
mapping(bytes32 => mapping(address => bool)) roles;
modifier onlyRole(bytes32 r) { require(roles[r][msg.sender], "Denied"); _; }
function grantRole(bytes32 r, address a) public onlyRole(ADMIN) { roles[r][a] = true; }`,
    fullSolution: `// See example above for complete implementation`,
  },
  {
    id: "intermediate-07",
    level: "intermediate",
    order: 7,
    title: "Foundry Testing Deep Dive",
    concept: "Test structure, assertions, vm cheats, fuzz tests basics",
    explanation: {
      en: `Foundry's testing framework is built on Solidity itself. Tests inherit from \`forge-std/Test.sol\` which provides assertions (assertEq, assertTrue), cheatcodes (vm.prank, vm.deal, vm.warp), and console logging. The \`setUp()\` function runs before each test. Understanding these tools is essential for writing thorough tests.`,
      pt: `O Foundry é único: os testes são escritos em Solidity, não em JavaScript. Isso significa que você testa o contrato na mesma linguagem em que foi escrito.\n\n**Estrutura básica:**\n\`\`\`solidity\ncontract MeuTest is Test { // herda de forge-std/Test.sol\n    MeuContrato contrato;\n\n    function setUp() public { // roda ANTES de cada teste\n        contrato = new MeuContrato();\n    }\n\n    function testAlgumaCoisa() public { // deve começar com "test"\n        contrato.acao();\n        assertEq(contrato.valor(), 42);\n    }\n}\n\`\`\`\n\n**Assertions disponíveis:**\n- \`assertEq(a, b)\` — verifica igualdade\n- \`assertTrue(cond)\` / \`assertFalse(cond)\`\n- \`assertGt(a, b)\` (greater than), \`assertLt(a, b)\` (less than)\n- \`assertApproxEqAbs(a, b, delta)\` — igualdade aproximada\n\n**Cheatcodes essenciais (prefixo \`vm.\`):**\n- \`vm.prank(addr)\` — próxima chamada vem de \`addr\`\n- \`vm.deal(addr, amount)\` — dá ETH ao endereço\n- \`vm.warp(timestamp)\` — avança o tempo\n- \`vm.roll(blockNum)\` — avança os blocos\n- \`vm.expectRevert("msg")\` — próxima chamada DEVE reverter\n- \`vm.expectEmit(...)\` — próxima chamada DEVE emitir o evento\n- \`makeAddr("nome")\` — cria endereço de teste com label legível\n\n**Fuzz testing:** prefixe a função com \`testFuzz_\` e adicione parâmetros — o Foundry gera centenas de inputs aleatórios automaticamente.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "forge-std/console.sol";

contract Token {
    mapping(address => uint256) public balances;
    address public owner;

    constructor() { owner = msg.sender; balances[msg.sender] = 1000; }

    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}

contract TokenTest is Test {
    Token token;
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");

    function setUp() public {
        token = new Token();
        // Give alice some tokens
        token.transfer(alice, 100);
    }

    function testTransfer() public {
        vm.prank(alice); // Next call will be from alice
        token.transfer(bob, 50);
        assertEq(token.balances(bob), 50);
        assertEq(token.balances(alice), 50);
    }

    function testTransferInsufficientBalance() public {
        vm.prank(alice);
        vm.expectRevert("Insufficient balance");
        token.transfer(bob, 200);
    }

    function testTransferFuzz(uint256 amount) public {
        amount = bound(amount, 0, 100); // Bound to alice's balance
        vm.prank(alice);
        token.transfer(bob, amount);
        assertEq(token.balances(bob), amount);
    }

    // Cheatcode examples:
    function testTimeTravel() public {
        vm.warp(block.timestamp + 1 days); // Move time forward
        vm.roll(block.number + 100); // Move blocks forward
    }

    function testDealETH() public {
        vm.deal(alice, 10 ether); // Give alice ETH
        assertEq(alice.balance, 10 ether);
    }
}`,
    foundryWorkflow: `# Run all tests
forge test

# Verbose output (see logs and traces)
forge test -vvv

# Run specific test
forge test --match-test testTransfer

# Run tests in specific file
forge test --match-path test/Token.t.sol

# Gas report
forge test --gas-report

# Fuzz runs (default 256, increase for more coverage)
forge test --fuzz-runs 1000`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• How to inherit from Foundry's \`Test\`: \`contract MyTest is Test { }\`\n• What is \`setUp()\` — runs before EACH test, reinitializes state\n• The main asserts: \`assertEq\`, \`assertTrue\`, \`assertFalse\`, \`assertLt\`, \`assertGt\`\n• The essential cheatcodes:\n  - \`vm.prank(address)\` — next call comes from this address\n  - \`vm.deal(address, amount)\` — gives ETH to an address\n  - \`vm.warp(timestamp)\` — advances time\n  - \`vm.roll(blockNumber)\` — advances blocks\n  - \`vm.expectRevert("message")\` — expects the next call to revert\n• \`makeAddr("name")\` — creates a test address with a descriptive label\n• How to write basic fuzz tests with \`bound(value, min, max)\`\n\n🔍 **Search for:** "Foundry cheatcodes vm.prank", "forge-std Test assertions", "Foundry fuzz testing"\n\n📖 **Docs:** book.getfoundry.sh/forge/tests`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• Como herdar de \`Test\` do Foundry: \`contract MeuTest is Test { }\`\n• O que é \`setUp()\` — executa antes de CADA teste, reinicializa o estado\n• Os principais asserts: \`assertEq\`, \`assertTrue\`, \`assertFalse\`, \`assertLt\`, \`assertGt\`\n• Os cheatcodes essenciais:\n  - \`vm.prank(address)\` — próxima chamada vem desse endereço\n  - \`vm.deal(address, amount)\` — dá ETH a um endereço\n  - \`vm.warp(timestamp)\` — avança o tempo\n  - \`vm.roll(blockNumber)\` — avança os blocos\n  - \`vm.expectRevert("mensagem")\` — espera que a próxima chamada reverta\n• \`makeAddr("nome")\` — cria endereço de teste com label descritivo\n• Como escrever testes de fuzz básicos com \`bound(value, min, max)\`\n\n🔍 **Pesquise por:** "Foundry cheatcodes vm.prank", "forge-std Test assertions", "Foundry fuzz testing"\n\n📖 **Documentação:** book.getfoundry.sh/forge/tests`,
    },
    challenge: `Escreva testes abrangentes para um contrato Vault:\n\n**Passo 1 — Setup:** Crie \`contract VaultTest is Test\` com setUp() que:\n  - Cria endereços de teste: \`alice = makeAddr("alice")\`, \`bob = makeAddr("bob")\`\n  - Dá ETH: \`vm.deal(alice, 10 ether)\`\n  - Faz deploy do Vault: \`vault = new Vault()\`\n\n**Passo 2 — Testes de happy path:**\n  - \`testDeposit()\`: vm.prank(alice) → vault.deposit{value: 1 ether}() → assertEq(vault.balances(alice), 1 ether)\n  - \`testWithdraw()\`: deposita, saca, verifica balanço zero\n\n**Passo 3 — Testes de revert:**\n  - \`testWithdrawNotOwner()\`: vm.prank(bob) → vm.expectRevert("Not owner") → vault.withdraw(1 ether)\n  - \`testWithdrawInsufficient()\`: vm.expectRevert → vault.withdraw(999 ether)\n\n**Passo 4 — Teste de tempo:**\n  - \`testTimeLock()\`: vm.warp(block.timestamp + 7 days) → tente saque após lock period\n\n**Passo 5 — Teste de eventos:**\n  - vm.expectEmit(true, false, false, true)\n  - emit Deposited(alice, 1 ether)\n  - vault.deposit{value: 1 ether}()\n\n**Passo 6 — Fuzz test:**\n  - \`testFuzz_Deposit(uint256 amount)\`: amount = bound(amount, 1, 10 ether) → deposita → verifica balanço\n\n✅ **Critério de sucesso:** forge test -vvv mostra todos os testes passando, inclui pelo menos 1 fuzz test`,
    hints: [
      "`makeAddr()` creates labeled test addresses",
      "`vm.deal(addr, amount)` gives ETH to an address",
      "`bound(value, min, max)` constrains fuzz inputs",
    ],
    commonMistakes: [
      "Not testing revert conditions",
      "Forgetting setUp() runs before each test",
      "Not using bound() for fuzz inputs",
    ],
    bestPractices: [
      "Test happy paths AND failure cases",
      "Use descriptive test names: testXxx_WhenYyy_ShouldZzz",
      "Use fuzz testing for numeric inputs",
      "Check events with vm.expectEmit",
    ],
    checklist: [
      "Happy path tests pass",
      "Revert conditions tested",
      "Fuzz test included",
      "Cheatcodes used correctly",
    ],
    shortSolution: `function testDeposit() public { vm.deal(alice, 1 ether); vm.prank(alice); vault.deposit{value: 1 ether}(); assertEq(vault.balances(alice), 1 ether); }
function testWithdrawNotOwner() public { vm.prank(bob); vm.expectRevert("Not owner"); vault.withdraw(1 ether); }`,
    fullSolution: `// See example - expand with more test cases and fuzz testing`,
  },
  {
    id: "intermediate-08",
    level: "intermediate",
    order: 8,
    title: "Deployment Scripts & Anvil",
    concept: "Foundry scripts, local deployment, Anvil blockchain",
    explanation: {
      en: `Foundry scripts automate contract deployment and setup. Written in Solidity, they use \`forge-std/Script.sol\` for broadcasting transactions. Anvil is Foundry's local Ethereum node — a fast, lightweight blockchain for development. Together, scripts and Anvil enable a complete local development workflow matching production deployments.`,
      pt: `Scripts e Anvil formam o ambiente de desenvolvimento local completo do Foundry.\n\n**Anvil** é uma blockchain Ethereum local que roda no seu computador:\n- Inicie com: \`anvil\`\n- Cria 10 contas com 10.000 ETH cada (chaves privadas conhecidas)\n- Roda na porta \`http://localhost:8545\`, Chain ID 31337\n- Reinicia sempre que você mata o processo (estado não é persistente)\n\n**Scripts Foundry** são contratos Solidity que orquestram o deploy:\n\`\`\`solidity\ncontract Deploy is Script {\n    function run() external {\n        vm.startBroadcast(); // inicia gravação de transações\n        Token token = new Token();\n        Vault vault = new Vault(address(token));\n        console.log("Token:", address(token));\n        vm.stopBroadcast(); // para gravação\n    }\n}\n\`\`\`\n\n**Diferença entre teste e script:**\n- Teste: usa cheatcodes, não envia txs reais, verifica comportamento\n- Script: envia txs reais para a blockchain (Anvil ou rede real)\n\n**Comandos cast** para interagir após deploy:\n- \`cast call\` — leitura (gratuita, sem gas)\n- \`cast send\` — escrita (custa gas, precisa de private key)\n- \`cast balance\` — saldo ETH de um endereço\n- \`cast tx <hash>\` — detalhes de uma transação\n\n**Sem --broadcast:** o script roda em modo dry-run (simula sem enviar). Com **--broadcast**: envia as transações de verdade.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// script/Deploy.s.sol
import "forge-std/Script.sol";

// import {MyContract} from "../src/MyContract.sol";

contract DeployScript is Script {
    function run() external {
        // Load deployer private key
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerKey);

        // Deploy contracts
        // MyContract myContract = new MyContract();
        // console.log("Deployed at:", address(myContract));

        // Setup (e.g., grant roles, set parameters)
        // myContract.initialize(param1, param2);

        vm.stopBroadcast();
    }
}

// For multi-contract deployment:
contract DeployAllScript is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy in order of dependencies
        // Token token = new Token();
        // Vault vault = new Vault(address(token));
        // Governance gov = new Governance(address(vault));

        // Log addresses
        // console.log("Token:", address(token));
        // console.log("Vault:", address(vault));
        // console.log("Governance:", address(gov));

        vm.stopBroadcast();
    }
}`,
    foundryWorkflow: `# Start Anvil (local blockchain)
anvil
# Outputs 10 test accounts with private keys
# Default RPC: http://localhost:8545

# Deploy with script
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast

# Deploy with specific private key
forge script script/Deploy.s.sol \\
  --rpc-url http://localhost:8545 \\
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \\
  --broadcast

# Interact with deployed contracts using cast
cast call <ADDRESS> "getCount()" --rpc-url http://localhost:8545
cast send <ADDRESS> "increment()" --rpc-url http://localhost:8545 --private-key 0xac...

# Check balance
cast balance <ADDRESS> --rpc-url http://localhost:8545

# Decode transaction
cast tx <TX_HASH> --rpc-url http://localhost:8545`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• What is Anvil — Foundry's local blockchain, runs on port 8545\n• How Foundry scripts differ from tests — they use \`vm.startBroadcast()\` to send real txs\n• What is \`forge-std/Script.sol\` and how to inherit from it\n• The complete flow: anvil → forge script → deploy → cast interact\n• Anvil's default accounts — 10 accounts with 10000 ETH each, known private keys\n• How to use environment variables for private keys: \`vm.envUint("PRIVATE_KEY")\`\n• Essential cast commands: \`cast call\`, \`cast send\`, \`cast balance\`\n• The difference between dry-run (without --broadcast) and real deploy (with --broadcast)\n\n🔍 **Search for:** "Foundry forge script deploy", "Anvil local blockchain", "cast send call tutorial"\n\n📖 **Docs:** book.getfoundry.sh/tutorials/solidity-scripting`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• O que é o Anvil — blockchain local do Foundry, roda na porta 8545\n• Como os scripts Foundry diferem dos testes — usam \`vm.startBroadcast()\` para enviar txs reais\n• O que é \`forge-std/Script.sol\` e como herdar dele\n• O fluxo completo: anvil → forge script → deploy → cast interact\n• Contas padrão do Anvil — 10 contas com 10000 ETH cada, private key conhecida\n• Como usar variáveis de ambiente para chaves privadas: \`vm.envUint("PRIVATE_KEY")\`\n• Comandos cast essenciais: \`cast call\`, \`cast send\`, \`cast balance\`\n• A diferença entre dry-run (sem --broadcast) e deploy real (com --broadcast)\n\n🔍 **Pesquise por:** "Foundry forge script deploy", "Anvil local blockchain", "cast send call tutorial"\n\n📖 **Documentação:** book.getfoundry.sh/tutorials/solidity-scripting`,
    },
    challenge: `Escreva um script de deploy para um sistema Token + Vault:\n\n**Passo 1 — Inicie o Anvil:** Execute \`anvil\` em um terminal. Copie o endereço e private key da primeira conta\n\n**Passo 2 — Crie os contratos:** Se ainda não tem, crie um \`Token.sol\` simples e um \`Vault.sol\` que recebe o endereço do token no constructor\n\n**Passo 3 — Crie \`script/Deploy.s.sol\`:**\n\`\`\`solidity\ncontract DeployScript is Script {\n  function run() external {\n    vm.startBroadcast();\n    Token token = new Token();\n    Vault vault = new Vault(address(token));\n    console.log("Token:", address(token));\n    console.log("Vault:", address(vault));\n    vm.stopBroadcast();\n  }\n}\n\`\`\`\n\n**Passo 4 — Execute o script:**\n  \`forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --private-key <KEY> --broadcast\`\n\n**Passo 5 — Interaja via cast:**\n  - \`cast call <TOKEN_ADDR> "totalSupply()" --rpc-url http://localhost:8545\`\n  - \`cast send <TOKEN_ADDR> "transfer(address,uint256)" <DEST> 100 --rpc-url http://localhost:8545 --private-key <KEY>\`\n\n**Passo 6:** Tente PRIMEIRO sem --broadcast para ver o dry-run, depois com --broadcast para o deploy real\n\n✅ **Critério de sucesso:** Script deploya os dois contratos em sequência, cast interacts funcionam`,
    hints: [
      "Use `vm.startBroadcast()` / `vm.stopBroadcast()` for transactions",
      "Deploy in dependency order",
      "Use console.log to output deployed addresses",
    ],
    commonMistakes: [
      "Forgetting --broadcast flag (dry run only without it)",
      "Wrong private key for Anvil accounts",
      "Not starting Anvil before deploying",
    ],
    bestPractices: [
      "Always test scripts on Anvil first",
      "Log deployed addresses",
      "Use environment variables for keys",
      "Keep scripts idempotent when possible",
    ],
    checklist: [
      "Script compiles and runs",
      "Contracts deploy successfully",
      "Addresses are logged",
      "Cast interactions work",
    ],
    shortSolution: `contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();
        // Token token = new Token();
        // Vault vault = new Vault(address(token));
        vm.stopBroadcast();
    }
}`,
    fullSolution: `// See example above for complete deployment pattern`,
  },
  {
    id: "intermediate-09",
    level: "intermediate",
    order: 9,
    title: "Project: On-Chain Voting System",
    concept: "Complete voting dApp with proposals, votes, and frontend",
    explanation: {
      en: `A voting system combines access control, structs, enums, events, and time-based logic. Voters register, proposals are created, votes are cast within a time window, and results are tallied. This project teaches governance patterns used in real DAOs. The frontend displays proposals, allows voting, and shows results in real-time.`,
      pt: `O sistema de votação é o padrão fundamental de governança em DAOs (Decentralized Autonomous Organizations) — organizações governadas por código, não por pessoas.\n\n**Como funciona o fluxo:**\n1. Admin registra eleitores autorizados\n2. Admin cria propostas com deadline (prazo para votar)\n3. Eleitores registrados votam dentro do prazo\n4. Após o deadline, o resultado é calculado\n\n**block.timestamp para deadlines:**\n\`uint256 deadline = block.timestamp + duration;\`\nPara verificar se ainda está dentro do prazo: \`require(block.timestamp < deadline, "Votação encerrada")\`\n\n**Anti double-voting** com mapping dentro da struct:\n\`mapping(address => bool) hasVoted;\` — cada proposta rastreia quem já votou.\nCuidado: mappings dentro de structs NÃO podem ser retornados de funções view. Você precisa de getters separados.\n\n**vm.warp nos testes** — simula passagem de tempo sem esperar:\n\`vm.warp(block.timestamp + 2 days);\` — após isso, \`block.timestamp\` no contrato será 2 dias no futuro.\n\n**Padrões de governança reais:**\n- Compound Governor: votação com peso por tokens\n- OpenZeppelin Governor: framework genérico e auditado\n- Snapshot: votação off-chain com verificação on-chain\n\nEste exercício implementa o padrão mais simples: 1 eleitor = 1 voto, sem peso por tokens.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VotingSystem {
    struct Proposal {
        string description;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 deadline;
        bool executed;
        mapping(address => bool) hasVoted;
    }

    address public admin;
    mapping(address => bool) public registeredVoters;
    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;

    event ProposalCreated(uint256 indexed id, string description, uint256 deadline);
    event Voted(uint256 indexed proposalId, address indexed voter, bool support);
    event VoterRegistered(address indexed voter);

    modifier onlyAdmin() { require(msg.sender == admin, "Not admin"); _; }
    modifier onlyRegistered() { require(registeredVoters[msg.sender], "Not registered"); _; }

    constructor() { admin = msg.sender; }

    function registerVoter(address voter) public onlyAdmin {
        registeredVoters[voter] = true;
        emit VoterRegistered(voter);
    }

    function createProposal(string memory description, uint256 duration) public onlyAdmin returns (uint256) {
        uint256 id = proposalCount++;
        Proposal storage p = proposals[id];
        p.description = description;
        p.deadline = block.timestamp + duration;
        emit ProposalCreated(id, description, p.deadline);
        return id;
    }

    function vote(uint256 proposalId, bool support) public onlyRegistered {
        Proposal storage p = proposals[proposalId];
        require(block.timestamp < p.deadline, "Voting ended");
        require(!p.hasVoted[msg.sender], "Already voted");

        p.hasVoted[msg.sender] = true;
        if (support) p.forVotes++;
        else p.againstVotes++;

        emit Voted(proposalId, msg.sender, support);
    }

    function getResult(uint256 proposalId) public view returns (string memory, uint256, uint256, bool) {
        Proposal storage p = proposals[proposalId];
        bool passed = p.forVotes > p.againstVotes && block.timestamp >= p.deadline;
        return (p.description, p.forVotes, p.againstVotes, passed);
    }
}`,
    foundryWorkflow: `forge init voting-dapp && cd voting-dapp
# Write contract in src/VotingSystem.sol
forge build && forge test -vvv

# Deploy and test
anvil &
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast

# Register voter
cast send <ADDR> "registerVoter(address)" <VOTER_ADDR> --rpc-url http://localhost:8545 --private-key 0xac...
# Create proposal
cast send <ADDR> "createProposal(string,uint256)" "Increase budget" 86400 --rpc-url http://localhost:8545 --private-key 0xac...`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• How to use \`block.timestamp\` for deadlines\n• Why mappings inside structs cannot be returned from functions\n• How to use \`vm.warp()\` in tests to simulate time passage\n• The governance pattern used in DAOs (Decentralized Autonomous Organizations)\n• How to protect against double voting with \`mapping(address => bool) hasVoted\`\n• The difference between proposal creation (admin) and voting (registered voters)\n\n🔍 **Search for:** "Solidity governance voting contract", "Solidity block.timestamp deadline", "Foundry vm.warp time travel"\n\n📖 **Reference:** Compound Governor, OpenZeppelin Governor contract`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• Como usar \`block.timestamp\` para prazos (deadlines)\n• Por que mappings dentro de structs não podem ser retornados de funções\n• Como usar \`vm.warp()\` nos testes para simular passagem de tempo\n• O padrão de governança usado em DAOs (Decentralized Autonomous Organizations)\n• Como proteger contra double voting com \`mapping(address => bool) hasVoted\`\n• A diferença entre criação de proposta (admin) e votação (eleitores registrados)\n\n🔍 **Pesquise por:** "Solidity governance voting contract", "Solidity block.timestamp deadline", "Foundry vm.warp time travel"\n\n📖 **Referência:** Compound Governor, OpenZeppelin Governor contract`,
    },
    challenge: `Construa o VotingSystem completo:\n\n**Passo 1 — Contrato:** Implemente o VotingSystem do exemplo acima com todas as funções\n\n**Passo 2 — Testes abrangentes:**\n  - \`testRegisterVoter()\`: admin registra Alice → verifica registeredVoters[alice] == true\n  - \`testRegisterVoterOnlyAdmin()\`: Bob tenta registrar → vm.expectRevert\n  - \`testCreateProposal()\`: admin cria proposta com 1 dia de duração → verifica deadline\n  - \`testVote()\`: Alice registrada vota a favor → verifica forVotes == 1\n  - \`testDoubleVote()\`: Alice tenta votar duas vezes → vm.expectRevert\n  - \`testVoteAfterDeadline()\`: vm.warp(deadline + 1) → Alice tenta votar → vm.expectRevert\n  - \`testGetResult()\`: após deadline com maioria a favor → verifica passed == true\n\n**Passo 3 — Deploy e teste manual:**\n  - Deploy no Anvil\n  - Registre 2 endereços como eleitores\n  - Crie uma proposta\n  - Vote com ambos os endereços\n  - Espere o deadline com vm.warp ou avançando o tempo\n  - Leia o resultado\n\n**Passo 4 — Frontend (conceitual):** Descreva uma React UI com:\n  - Lista de propostas com barra de progresso de votos\n  - Botões "Votar a favor" e "Votar contra"\n  - Timer de countdown até o deadline\n  - Resultado final após expiração\n\n✅ **Critério de sucesso:** Todos os 7 testes passam, incluindo teste de tempo com vm.warp`,
    hints: [
      "Use `vm.warp()` in tests to simulate time passing",
      "Mappings inside structs can't be returned from functions",
      "Use events for frontend to track votes in real-time",
    ],
    commonMistakes: [
      "Not checking voting deadline",
      "Allowing double voting",
      "Not separating voter registration from voting",
    ],
    bestPractices: [
      "Use time-based deadlines with block.timestamp",
      "Emit events for all state changes",
      "Separate admin and voter functions clearly",
      "Consider quorum requirements",
    ],
    checklist: [
      "Registration works correctly",
      "Proposals have deadlines",
      "Double voting is prevented",
      "Results are accurate",
      "Events are comprehensive",
    ],
    shortSolution: `// See example above - complete voting contract`,
    fullSolution: `// The example is the full contract implementation.
// Frontend: React app with proposal list, vote buttons, result charts.`,
  },
  {
    id: "intermediate-10",
    level: "intermediate",
    order: 10,
    title: "Project: CRUD Smart Contract + Frontend",
    concept: "Full CRUD contract with record management and React frontend",
    explanation: {
      en: `A CRUD (Create, Read, Update, Delete) contract is a fundamental pattern for data management on-chain. This project builds a complete record management system with pagination, search by ID, batch operations, and owner-based permissions. The frontend provides a table view with forms for all operations.`,
      pt: `CRUD (Create, Read, Update, Delete) é o padrão mais fundamental de qualquer sistema de dados — e implementá-lo on-chain tem suas peculiaridades.\n\n**Soft Delete vs Hard Delete:**\n- **Hard delete:** remove permanentemente os dados do storage (economiza gas no longo prazo, mas perde o histórico)\n- **Soft delete:** marca como inativo (\`active = false\`), dados permanecem na blockchain\n\nPor que preferir soft delete em contratos?\n1. Dados on-chain são imutáveis por natureza — manter o histórico é o esperado\n2. Facilita auditoria: você pode ver o que foi "deletado"\n3. Previne reuso de IDs (o ID 0 deletado não pode ser reutilizado)\n\n**Modifiers para validação combinada:**\n\`\`\`solidity\nmodifier recordExists(uint256 id) {\n    require(records[id].active, "Registro nao encontrado");\n    _;\n}\nmodifier onlyCreator(uint256 id) {\n    require(records[id].creator == msg.sender, "Nao e o criador");\n    _;\n}\n// Empilhados:\nfunction update(uint256 id, ...) public recordExists(id) onlyCreator(id) { ... }\n\`\`\`\n\n**Timestamps de auditoria:**\n\`createdAt = block.timestamp;\`\n\`updatedAt = block.timestamp;\`\nPermitem ver quando cada registro foi criado e última vez modificado.\n\n**Paginação:** mappings não são iteráveis, então paginação é feita off-chain consultando eventos — o frontend pede eventos de \`RecordCreated\` e constrói a lista localmente.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract RecordManager {
    struct Record {
        uint256 id;
        string title;
        string data;
        address creator;
        uint256 createdAt;
        uint256 updatedAt;
        bool active;
    }

    mapping(uint256 => Record) public records;
    uint256 public nextId;
    uint256 public activeCount;

    event RecordCreated(uint256 indexed id, address indexed creator, string title);
    event RecordUpdated(uint256 indexed id, string title);
    event RecordDeleted(uint256 indexed id);

    modifier onlyCreator(uint256 id) {
        require(records[id].creator == msg.sender, "Not creator");
        _;
    }

    modifier recordExists(uint256 id) {
        require(records[id].active, "Record not found");
        _;
    }

    function create(string memory title, string memory data) public returns (uint256) {
        uint256 id = nextId++;
        records[id] = Record(id, title, data, msg.sender, block.timestamp, block.timestamp, true);
        activeCount++;
        emit RecordCreated(id, msg.sender, title);
        return id;
    }

    function read(uint256 id) public view recordExists(id) returns (Record memory) {
        return records[id];
    }

    function update(uint256 id, string memory title, string memory data)
        public recordExists(id) onlyCreator(id)
    {
        records[id].title = title;
        records[id].data = data;
        records[id].updatedAt = block.timestamp;
        emit RecordUpdated(id, title);
    }

    function remove(uint256 id) public recordExists(id) onlyCreator(id) {
        records[id].active = false;
        activeCount--;
        emit RecordDeleted(id);
    }
}`,
    foundryWorkflow: `forge build
forge test -vvv --gas-report

# Deploy and interact
anvil &
forge create src/RecordManager.sol:RecordManager --rpc-url http://localhost:8545 --private-key 0xac0974...

cast send <ADDR> "create(string,string)" "My Record" "Some data" --rpc-url http://localhost:8545 --private-key 0xac...
cast call <ADDR> "read(uint256)" 0 --rpc-url http://localhost:8545`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• The CRUD pattern in contracts — Create, Read, Update, Delete\n• What is "soft delete" — marking as inactive instead of deleting the data\n• Why soft delete is preferred in contracts (on-chain data is valuable/auditable)\n• How to use multiple modifiers on a function: \`function f() recordExists(id) onlyCreator(id)\`\n• How to track creation and update timestamps: \`block.timestamp\`\n• Pagination strategies for efficient reading of large datasets\n\n🔍 **Search for:** "Solidity CRUD contract pattern", "Solidity soft delete pattern", "Solidity pagination events"\n\n📖 **Reference:** solidity-by-example.org, Ethereum development patterns`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• O padrão CRUD em contratos — Create, Read, Update, Delete\n• O que é "soft delete" — marcar como inativo em vez de deletar os dados\n• Por que soft delete é preferível em contratos (dados on-chain são valiosos/auditáveis)\n• Como usar múltiplos modifiers em uma função: \`function f() recordExists(id) onlyCreator(id)\`\n• Como rastrear timestamps de criação e atualização: \`block.timestamp\`\n• Estratégias de paginação para leitura eficiente de grandes datasets\n\n🔍 **Pesquise por:** "Solidity CRUD contract pattern", "Solidity soft delete pattern", "Solidity pagination events"\n\n📖 **Referência:** solidity-by-example.org, Ethereum development patterns`,
    },
    challenge: `Construa o RecordManager CRUD completo:\n\n**Passo 1 — Contrato:** Implemente o RecordManager do exemplo com todas as funções CRUD\n\n**Passo 2 — Testes CRUD completos:**\n  - \`testCreate()\`: cria registro → verifica id, title, creator, active==true\n  - \`testRead()\`: cria e lê → verifica todos os campos\n  - \`testUpdate()\`: cria, atualiza → verifica novo title e updatedAt diferente de createdAt\n  - \`testDelete()\`: cria, deleta → verifica active==false, activeCount diminuiu\n  - \`testReadDeletedRecord()\`: tenta ler registro deletado → vm.expectRevert("Record not found")\n  - \`testUpdateNotCreator()\`: Bob tenta atualizar registro de Alice → vm.expectRevert("Not creator")\n  - \`testDeleteNotCreator()\`: Bob tenta deletar registro de Alice → vm.expectRevert("Not creator")\n\n**Passo 3 — Deploy e interação:**\n  - Deploy no Anvil\n  - Crie 3 registros via cast send\n  - Leia o registro 1 via cast call\n  - Delete o registro 0 via cast send\n  - Tente ler o registro 0 (deve falhar)\n\n**Passo 4 — Frontend (conceitual):** Descreva uma tabela React com:\n  - Colunas: ID, Title, Data, Creator, Status, Actions\n  - Botão "New Record" abre um modal com formulário\n  - Botão "Edit" pré-preenche o formulário (apenas para o criador)\n  - Botão "Delete" com confirmação\n  - Registros deletados mostrados com estilo riscado\n\n✅ **Critério de sucesso:** Todos os 7 testes passam, soft delete preserva os dados mas marca como inativo`,
    hints: [
      "Soft delete (set active=false) is safer than removing data",
      "Use modifiers for common checks",
      "Pagination can be done off-chain by querying events",
    ],
    commonMistakes: [
      "Hard deleting data (can't recover)",
      "Not checking record existence before operations",
      "Not restricting updates to record creator",
    ],
    bestPractices: [
      "Use soft deletes for recoverability",
      "Stack modifiers for clean validation",
      "Track timestamps for audit trails",
      "Use events for frontend synchronization",
    ],
    checklist: [
      "All CRUD operations work",
      "Access control is enforced",
      "Soft delete preserves data",
      "Events track all changes",
      "Tests cover all operations",
    ],
    shortSolution: `// See example above`,
    fullSolution: `// The example is the complete CRUD contract.`,
  },

  // ===== ADVANCED (21-30) =====
  {
    id: "advanced-01",
    level: "advanced",
    order: 1,
    title: "Ownable Pattern & Custom Errors",
    concept: "Ownable design pattern, custom error types, gas-efficient reverts",
    explanation: {
      en: `The Ownable pattern is the most fundamental access control pattern. Custom errors (introduced in Solidity 0.8.4) are more gas-efficient than require strings because they use selector encoding instead of storing string data. They also allow passing parameters for better debugging. Production contracts should always use custom errors.`,
      pt: `Ownable e custom errors são dois padrões que todo contrato de produção deve usar.\n\n**O padrão Ownable** centraliza o controle: apenas o owner pode executar funções administrativas. Mas a transferência simples de ownership tem um risco grave:\n\`transferOwnership(enderecoErrado)\` → ownership perdida para sempre!\n\n**Two-step transfer** resolve isso:\n1. Owner nomeia um candidato: \`_pendingOwner = newOwner\`\n2. Candidato aceita ativamente: \`acceptOwnership()\`\nSe o endereço estava errado, o candidato simplesmente não aceita — sem perda de controle.\n\n**Custom Errors vs require strings:**\n\`\`\`solidity\n// RUIM (caro): a string "Not owner" fica no bytecode\nrequire(msg.sender == owner, "Not owner"); // ~200 gas extra\n\n// BOM (barato): só o selector de 4 bytes é armazenado\nerror NotOwner(address caller, address owner);\nif (msg.sender != owner) revert NotOwner(msg.sender, owner);\n\`\`\`\n\nCustom errors também permitem passar **parâmetros** — muito melhor para debugging:\n\`revert InsufficientBalance(requested, available);\` → você sabe exatamente quanto foi pedido e quanto havia.\n\n**Testar custom errors no Foundry:**\n\`\`\`solidity\nvm.expectRevert(abi.encodeWithSelector(NotOwner.selector, alice, owner));\n// ou simplesmente:\nvm.expectRevert(NotOwner.selector); // sem verificar parâmetros\n\`\`\``,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

error NotOwner(address caller, address owner);
error ZeroAddress();
error InsufficientBalance(uint256 requested, uint256 available);
error TransferFailed();

contract AdvancedOwnable {
    address private _owner;
    address private _pendingOwner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event OwnershipTransferStarted(address indexed previousOwner, address indexed newOwner);

    constructor() {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    modifier onlyOwner() {
        if (msg.sender != _owner) revert NotOwner(msg.sender, _owner);
        _;
    }

    function owner() public view returns (address) {
        return _owner;
    }

    // Two-step ownership transfer (safer)
    function transferOwnership(address newOwner) public onlyOwner {
        if (newOwner == address(0)) revert ZeroAddress();
        _pendingOwner = newOwner;
        emit OwnershipTransferStarted(_owner, newOwner);
    }

    function acceptOwnership() public {
        if (msg.sender != _pendingOwner) revert NotOwner(msg.sender, _pendingOwner);
        address oldOwner = _owner;
        _owner = _pendingOwner;
        _pendingOwner = address(0);
        emit OwnershipTransferred(oldOwner, _owner);
    }

    function renounceOwnership() public onlyOwner {
        address oldOwner = _owner;
        _owner = address(0);
        emit OwnershipTransferred(oldOwner, address(0));
    }
}`,
    foundryWorkflow: `forge build
forge test -vvv

# Test custom errors:
# vm.expectRevert(abi.encodeWithSelector(NotOwner.selector, alice, owner));

# Gas comparison
forge test --gas-report
# Custom errors save ~200 gas vs require strings`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• Why custom errors are more gas-efficient than require strings:\n  - Strings are stored in bytecode (expensive)\n  - Custom errors use only a 4-byte selector\n  - Save ~200 gas per revert\n• Custom error syntax: \`error MyError(type param);\` → \`revert MyError(value);\`\n• The two-step ownership transfer pattern:\n  - Step 1: owner nominates a new pending owner\n  - Step 2: new owner accepts ownership\n  - Why it's safer: prevents accidental transfer to wrong address\n• How to test custom errors with Foundry: \`vm.expectRevert(abi.encodeWithSelector(...))\`\n\n🔍 **Search for:** "Solidity custom errors gas savings", "Solidity two-step ownership transfer", "Foundry test custom errors"\n\n📖 **Docs:** solidity-by-example.org/error, OpenZeppelin Ownable2Step`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• Por que custom errors são mais eficientes que require strings em gas:\n  - Strings são armazenadas no bytecode (caro)\n  - Custom errors usam apenas o selector de 4 bytes\n  - Economizam ~200 gas por revert\n• Sintaxe de custom errors: \`error NomeDoErro(tipo param);\` → \`revert NomeDoErro(valor);\`\n• O padrão de transferência de propriedade em 2 etapas (two-step):\n  - Passo 1: owner nomeia novo owner pendente\n  - Passo 2: novo owner aceita a propriedade\n  - Por que é mais seguro: previne transferência acidental para endereço errado\n• Como testar custom errors com Foundry: \`vm.expectRevert(abi.encodeWithSelector(...))\`\n\n🔍 **Pesquise por:** "Solidity custom errors gas savings", "Solidity two-step ownership transfer", "Foundry test custom errors"\n\n📖 **Documentação:** solidity-by-example.org/error, OpenZeppelin Ownable2Step`,
    },
    challenge: `Implemente o padrão Ownable avançado com transferência em 2 etapas e custom errors:\n\n**Passo 1 — Custom Errors:** Declare os erros no topo do arquivo (fora do contrato):\n  - \`error NotOwner(address caller, address owner)\`\n  - \`error ZeroAddress()\`\n  - \`error InsufficientBalance(uint256 requested, uint256 available)\`\n\n**Passo 2 — AdvancedOwnable:** Implemente com \`_owner\` e \`_pendingOwner\` como private\n\n**Passo 3 — transferOwnership(address newOwner):**\n  - Use revert em vez de require: \`if(newOwner == address(0)) revert ZeroAddress()\`\n  - Apenas define o _pendingOwner (não transfere ainda)\n  - Emite OwnershipTransferStarted\n\n**Passo 4 — acceptOwnership():**\n  - Apenas o _pendingOwner pode chamar\n  - Transfere a propriedade e limpa _pendingOwner\n  - Emite OwnershipTransferred\n\n**Passo 5 — Treasury:** Crie um contrato Treasury que herda AdvancedOwnable:\n  - \`deposit() public payable\`\n  - \`withdraw(uint256 amount) public onlyOwner\` — use \`InsufficientBalance\` se saldo insuficiente\n\n**Passo 6 — Compare gas:** Crie versões com require e custom error no mesmo teste, use --gas-report\n\n**Passo 7 — Testes:** Verifique que:\n  - Apenas _pendingOwner pode aceitar\n  - Transferência para address(0) reverte com ZeroAddress\n  - Custom errors incluem os parâmetros corretos\n\n✅ **Critério de sucesso:** forge test --gas-report mostra economia de gas com custom errors`,
    hints: [
      "Custom errors: `error MyError(param);` then `revert MyError(value);`",
      "Two-step transfer prevents accidental ownership loss",
      "Test custom errors with `abi.encodeWithSelector`",
    ],
    commonMistakes: [
      "Single-step ownership transfer (risky)",
      "Using require strings instead of custom errors (wastes gas)",
      "Not emitting events for ownership changes",
    ],
    bestPractices: [
      "Always use two-step ownership transfer",
      "Custom errors for all reverts",
      "Include relevant data in error parameters",
      "Consider renounceOwnership implications",
    ],
    checklist: [
      "Two-step transfer works correctly",
      "Custom errors save gas",
      "Events track ownership changes",
      "Edge cases handled (zero address, self-transfer)",
    ],
    shortSolution: `error NotOwner(address caller);
modifier onlyOwner() { if(msg.sender != owner) revert NotOwner(msg.sender); _; }`,
    fullSolution: `// See example above for complete implementation`,
  },
  {
    id: "advanced-02",
    level: "advanced",
    order: 2,
    title: "Gas Optimization Basics",
    concept: "Storage vs memory costs, packing, unchecked math, gas profiling",
    explanation: {
      en: `Gas optimization is critical for production contracts. Storage operations (SSTORE/SLOAD) are the most expensive — 20,000 gas to write a new slot, 5,000 to update. Memory is cheap by comparison. Key techniques: pack structs to minimize storage slots, use unchecked math when overflow is impossible, cache storage reads in memory, and minimize on-chain data. Foundry's gas report helps identify expensive operations.`,
      pt: `Otimização de gas é crítica para contratos em produção. Operações de storage (SSTORE/SLOAD) são as mais caras — 20.000 gas para escrever um novo slot, 5.000 para atualizar. Memory é barata em comparação. Técnicas principais: empacotar structs para minimizar slots de storage, usar matemática unchecked quando overflow é impossível, fazer cache de leituras de storage em memory e minimizar dados on-chain. O relatório de gas do Foundry ajuda a identificar operações caras.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// BAD: Wastes storage slots
contract Unoptimized {
    uint8 a;     // slot 0 (wastes 31 bytes)
    uint256 b;   // slot 1
    uint8 c;     // slot 2 (wastes 31 bytes)
    uint256 d;   // slot 3
    // Total: 4 slots
}

// GOOD: Packed storage
contract Optimized {
    uint256 b;   // slot 0
    uint256 d;   // slot 1
    uint8 a;     // slot 2 (packed)
    uint8 c;     // slot 2 (packed with a)
    // Total: 3 slots — saves 5,000+ gas

    uint256[] public data;

    // Gas optimized loop
    function sum() public view returns (uint256 total) {
        uint256 len = data.length; // Cache storage read
        for (uint256 i; i < len; ) { // No initialization, no i++
            total += data[i];
            unchecked { ++i; } // Safe: i < len prevents overflow
        }
    }

    // Batch operations save gas on repeated storage access
    function batchAdd(uint256[] calldata values) external {
        // 'calldata' is cheaper than 'memory' for read-only params
        for (uint256 i; i < values.length; ) {
            data.push(values[i]);
            unchecked { ++i; }
        }
    }

    // Use events instead of storage for historical data
    event DataStored(address indexed user, uint256 value, uint256 timestamp);

    function storeEfficently(uint256 value) external {
        // Don't store in mapping if you only need history
        emit DataStored(msg.sender, value, block.timestamp);
    }
}`,
    foundryWorkflow: `# Detailed gas report
forge test --gas-report

# Compare gas between implementations
forge test --match-test testOptimized --gas-report
forge test --match-test testUnoptimized --gas-report

# Inspect storage layout
forge inspect Optimized storage-layout
forge inspect Unoptimized storage-layout

# Snapshot gas usage
forge snapshot
forge snapshot --diff`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• EVM gas costs:\n  - SSTORE (write new slot): 20,000 gas\n  - SSTORE (update existing slot): 5,000 gas\n  - SLOAD (read slot): 2,100 gas\n  - Memory: much cheaper than storage\n• Struct packing — variables smaller than 32 bytes share the same slot:\n  - \`uint128 a; uint128 b;\` → 1 slot (saves vs 2 separate slots)\n• Unchecked math — when you know overflow is impossible, use \`unchecked { ++i; }\`\n• Storage caching: \`uint256 len = array.length\` avoids multiple SLOADs in a loop\n• \`calldata\` vs \`memory\` in external parameters — calldata is cheaper for read-only\n• Foundry commands for analysis: \`forge test --gas-report\`, \`forge inspect --storage-layout\`\n\n🔍 **Search for:** "Solidity gas optimization guide", "Solidity struct packing slots", "Solidity unchecked math"\n\n📖 **Docs:** evm.codes (see costs of each opcode)`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• Custos de gas do EVM:\n  - SSTORE (write novo slot): 20.000 gas\n  - SSTORE (update slot existente): 5.000 gas\n  - SLOAD (ler slot): 2.100 gas\n  - Memory: muito mais barato que storage\n• Struct packing — variáveis menores que 32 bytes compartilham o mesmo slot:\n  - \`uint128 a; uint128 b;\` → 1 slot (economiza vs 2 slots separados)\n• Unchecked math — quando você sabe que overflow é impossível, use \`unchecked { ++i; }\`\n• Cache de storage: \`uint256 len = array.length\` evita múltiplos SLOAD no loop\n• \`calldata\` vs \`memory\` em parâmetros externos — calldata é mais barato para read-only\n• Comandos Foundry para análise: \`forge test --gas-report\`, \`forge inspect --storage-layout\`\n\n🔍 **Pesquise por:** "Solidity gas optimization guide", "Solidity struct packing slots", "Solidity unchecked math"\n\n📖 **Documentação:** evm.codes (ver custos de cada opcode)`,
    },
    challenge: `Otimize um contrato não-otimizado e meça as economias de gas:\n\n**Passo 1 — Contrato não-otimizado:** Crie \`Unoptimized.sol\` com struct mal organizado:\n  \`uint8 a; uint256 b; uint8 c; uint256 d; bool e;\` (5 slots de storage!)\n\n**Passo 2 — Contrato otimizado:** Crie \`Optimized.sol\` com o mesmo struct reordenado:\n  \`uint256 b; uint256 d; uint8 a; uint8 c; bool e;\` (3 slots — economiza 40.000 gas no deploy!)\n\n**Passo 3 — Loop não-otimizado (adicione a ambos):**\n\`\`\`solidity\nfunction sumBad() public view returns (uint256 total) {\n  for (uint256 i = 0; i < data.length; i++) { // relê length toda iteração!\n    total += data[i];\n  }\n}\n\`\`\`\n\n**Passo 4 — Loop otimizado:**\n\`\`\`solidity\nfunction sumGood() public view returns (uint256 total) {\n  uint256 len = data.length; // cache 1 SLOAD\n  for (uint256 i; i < len;) {\n    total += data[i];\n    unchecked { ++i; } // sem overflow check\n  }\n}\n\`\`\`\n\n**Passo 5 — Calldata vs memory:** Compare:\n  - \`function bad(uint256[] memory arr)\` vs \`function good(uint256[] calldata arr)\`\n\n**Passo 6 — Meça com Foundry:**\n  - \`forge test --gas-report\` para ver diferenças\n  - \`forge inspect Unoptimized storage-layout\` vs \`forge inspect Optimized storage-layout\`\n\n✅ **Critério de sucesso:** forge --gas-report mostra diferença mensurável entre as implementações`,
    hints: [
      "Group same-sized variables together for packing",
      "Use `calldata` instead of `memory` for external function params",
      "Cache `array.length` before loops",
    ],
    commonMistakes: [
      "Premature optimization (write correct code first)",
      "Using unchecked where overflow is possible",
      "Over-packing making code unreadable",
    ],
    bestPractices: [
      "Profile first, optimize hot paths",
      "Pack structs by ordering fields by size",
      "Use unchecked only when mathematically safe",
      "Prefer events over storage for historical data",
    ],
    checklist: [
      "Storage layout is optimized",
      "Loops use unchecked increment",
      "Calldata used for read-only params",
      "Gas report shows improvement",
    ],
    shortSolution: `// Pack structs, use unchecked loops, cache storage reads
uint256 len = arr.length;
for (uint256 i; i < len;) { unchecked { ++i; } }`,
    fullSolution: `// See example above for complete optimization patterns`,
  },
  {
    id: "advanced-03",
    level: "advanced",
    order: 3,
    title: "Security: Reentrancy",
    concept: "Reentrancy attacks explained, prevention patterns, security mindset",
    explanation: {
      en: `Reentrancy is the most infamous smart contract vulnerability. It occurs when an external call allows the called contract to re-enter the calling contract before the first execution completes. The DAO hack in 2016 exploited this. Prevention uses the Checks-Effects-Interactions (CEI) pattern: check conditions, update state, then make external calls. A reentrancy guard mutex provides additional protection.`,
      pt: `Reentrância é a vulnerabilidade de contratos inteligentes mais infame. Ocorre quando uma chamada externa permite que o contrato chamado re-entre no contrato chamador antes da primeira execução ser concluída. O hack do DAO em 2016 explorou isso. A prevenção usa o padrão Checks-Effects-Interactions (CEI): verificar condições, atualizar estado e depois fazer chamadas externas. Um mutex de proteção contra reentrância oferece proteção adicional.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// VULNERABLE - DO NOT USE IN PRODUCTION
contract VulnerableVault {
    mapping(address => uint256) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    // BUG: External call BEFORE state update
    function withdraw() public {
        uint256 bal = balances[msg.sender];
        require(bal > 0, "No balance");

        (bool sent, ) = msg.sender.call{value: bal}(""); // External call
        require(sent, "Failed");

        balances[msg.sender] = 0; // State update AFTER call — too late!
    }
}

// SECURE VERSION
contract SecureVault {
    mapping(address => uint256) public balances;
    bool private locked;

    error ReentrancyGuard();
    error InsufficientBalance();
    error TransferFailed();

    modifier nonReentrant() {
        if (locked) revert ReentrancyGuard();
        locked = true;
        _;
        locked = false;
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public nonReentrant {
        uint256 bal = balances[msg.sender];
        if (bal == 0) revert InsufficientBalance();

        // CHECKS: Already done above
        // EFFECTS: Update state BEFORE external call
        balances[msg.sender] = 0;

        // INTERACTIONS: External call last
        (bool sent, ) = msg.sender.call{value: bal}("");
        if (!sent) revert TransferFailed();
    }
}`,
    foundryWorkflow: `forge build
forge test -vvv

# Write an attacker contract in tests to verify vulnerability
# Then verify the secure version prevents the attack

# Example attacker:
# contract Attacker {
#     VulnerableVault vault;
#     function attack() external payable {
#         vault.deposit{value: msg.value}();
#         vault.withdraw();
#     }
#     receive() external payable {
#         if (address(vault).balance > 0) vault.withdraw();
#     }
# }`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• What was the "DAO Hack" of 2016 — $60 million stolen via reentrancy\n• How a reentrancy attack works step by step:\n  1. Attacker deposits in vulnerable contract\n  2. Attacker calls withdraw()\n  3. The contract sends ETH BEFORE updating the balance\n  4. The attacker's contract has \`receive()\` that calls withdraw() again\n  5. Repeats until all funds are drained\n• The CEI (Checks-Effects-Interactions) pattern:\n  - Checks: validate conditions\n  - Effects: update state\n  - Interactions: make external calls AFTER\n• The nonReentrant mutex as an extra layer of protection\n• How to write an attacker contract in Foundry to verify the vulnerability\n\n🔍 **Search for:** "reentrancy attack explained", "Solidity CEI pattern", "Solidity nonReentrant mutex"\n\n📖 **Reference:** swcregistry.io/docs/SWC-107`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• O que foi o "DAO Hack" de 2016 — $60 milhões roubados via reentrância\n• Como funciona o ataque de reentrância passo a passo:\n  1. Atacante deposita no contrato vulnerável\n  2. Atacante chama withdraw()\n  3. O contrato envia ETH ANTES de atualizar o balanço\n  4. O contrato do atacante tem \`receive()\` que chama withdraw() de novo\n  5. Repete até drenar todos os fundos\n• O padrão CEI (Checks-Effects-Interactions):\n  - Checks: valide condições\n  - Effects: atualize o estado\n  - Interactions: faça chamadas externas DEPOIS\n• O mutex nonReentrant como camada extra de proteção\n• Como escrever um contrato atacante em Foundry para verificar a vulnerabilidade\n\n🔍 **Pesquise por:** "reentrancy attack explained", "Solidity CEI pattern", "Solidity nonReentrant mutex"\n\n📖 **Referência:** swcregistry.io/docs/SWC-107`,
    },
    challenge: `Crie tanto o contrato vulnerável quanto o seguro e demonstre o ataque:\n\n**Passo 1 — VulnerableVault:** Implemente o vault com a vulnerabilidade (chamada externa ANTES da atualização de estado)\n\n**Passo 2 — Contrato Atacante:** Crie \`AttackContract.sol\`:\n\`\`\`solidity\ncontract Attacker {\n  VulnerableVault public vault;\n  constructor(address _vault) { vault = VulnerableVault(_vault); }\n  function attack() external payable {\n    vault.deposit{value: msg.value}();\n    vault.withdraw();\n  }\n  receive() external payable {\n    if (address(vault).balance > 0) {\n      vault.withdraw(); // chamada recursiva!\n    }\n  }\n}\n\`\`\`\n\n**Passo 3 — Teste do ataque:**\n  - Deposite 10 ETH no VulnerableVault de 3 usuários legítimos\n  - Atacante deposita 1 ETH e chama attack()\n  - Verifique que o atacante drena muito mais que 1 ETH\n\n**Passo 4 — SecureVault:** Implemente com CEI + nonReentrant:\n  - PRIMEIRO atualize o balanço para 0\n  - DEPOIS transfira o ETH\n  - Adicione o modifier nonReentrant\n\n**Passo 5 — Teste da proteção:** Verifique que o mesmo ataque no SecureVault reverte\n\n✅ **Critério de sucesso:** Teste demonstra que VulnerableVault é explorado, SecureVault não`,
    hints: [
      "Attacker uses receive()/fallback() to re-enter",
      "Always update state before external calls",
      "Use nonReentrant modifier as extra safety",
    ],
    commonMistakes: [
      "External call before state update",
      "Using transfer() (has gas limit but still risky pattern)",
      "Not considering cross-function reentrancy",
    ],
    bestPractices: [
      "Always follow Checks-Effects-Interactions",
      "Use nonReentrant guard on all external-calling functions",
      "Prefer pull-over-push for payments",
      "Audit all external call sites",
    ],
    checklist: [
      "Vulnerable version is exploitable in tests",
      "Secure version prevents reentrancy",
      "CEI pattern is followed",
      "nonReentrant modifier is applied",
    ],
    shortSolution: `// CEI: Checks, Effects, Interactions
balances[msg.sender] = 0; // Effect BEFORE
(bool sent,) = msg.sender.call{value: bal}(""); // Interaction AFTER`,
    fullSolution: `// See example above for complete vulnerable + secure implementations`,
  },
  {
    id: "advanced-04",
    level: "advanced",
    order: 4,
    title: "Checks-Effects-Interactions & Pull Payments",
    concept: "CEI pattern, pull-over-push, payment security patterns",
    explanation: {
      en: `The Checks-Effects-Interactions pattern prevents reentrancy by ordering operations: validate (checks), update state (effects), then interact externally (interactions). Pull-over-push payments add another layer: instead of pushing ETH to recipients (risky), let them pull/withdraw their own funds. This prevents DoS attacks where a failing recipient blocks the whole contract.`,
      pt: `O padrão Checks-Effects-Interactions previne reentrância ordenando as operações: validar (checks), atualizar estado (effects) e depois interagir externamente (interactions). Pagamentos pull-over-push adicionam outra camada: em vez de enviar ETH para destinatários (arriscado), deixe-os sacar seus próprios fundos. Isso previne ataques DoS onde um destinatário com falha bloqueia todo o contrato.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// PUSH PATTERN (risky)
contract PushPayment {
    function distributeBAD(address[] memory recipients, uint256[] memory amounts) public {
        for (uint256 i; i < recipients.length; i++) {
            // If any transfer fails, ALL fail (DoS vulnerability)
            payable(recipients[i]).transfer(amounts[i]);
        }
    }
}

// PULL PATTERN (safe)
contract PullPayment {
    mapping(address => uint256) public pendingWithdrawals;

    event PaymentAvailable(address indexed recipient, uint256 amount);
    event PaymentWithdrawn(address indexed recipient, uint256 amount);

    error NothingToWithdraw();
    error WithdrawFailed();

    function _asyncPayment(address recipient, uint256 amount) internal {
        pendingWithdrawals[recipient] += amount;
        emit PaymentAvailable(recipient, amount);
    }

    function withdraw() public {
        uint256 amount = pendingWithdrawals[msg.sender];
        if (amount == 0) revert NothingToWithdraw();

        // CEI: Effect before Interaction
        pendingWithdrawals[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        if (!sent) revert WithdrawFailed();

        emit PaymentWithdrawn(msg.sender, amount);
    }

    function distribute(address[] calldata recipients, uint256[] calldata amounts) external {
        for (uint256 i; i < recipients.length; ) {
            _asyncPayment(recipients[i], amounts[i]);
            unchecked { ++i; }
        }
    }
}`,
    foundryWorkflow: `forge build && forge test -vvv

# Test DoS vulnerability on push pattern
# Test pull pattern resilience
# Create a contract that reverts on receive to test DoS`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• The CEI pattern in detail — not just for reentrancy, it's a general best practice\n• The DoS (Denial of Service) attack with push payments:\n  - A contract without \`receive()\` can block the entire distribution\n  - If any transfer fails in a loop, all others fail too\n• How pull payments solve this: each user withdraws separately\n• Why \`transfer()\` and \`send()\` are considered deprecated:\n  - 2300 gas limit can cause issues with receiver contracts\n  - Use \`call{value: amount}("")\` with return value check\n• How to create a contract without \`receive()\` to test DoS\n\n🔍 **Search for:** "Solidity pull payments pattern", "Solidity DoS attack push payments", "Solidity call vs transfer vs send"\n\n📖 **Reference:** consensys.github.io/smart-contract-best-practices (Favor Pull over Push)`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• O padrão CEI em detalhe — não é apenas para reentrância, é uma boa prática geral\n• O ataque de DoS (Denial of Service) com pagamentos push:\n  - Um contrato sem \`receive()\` pode bloquear a distribuição inteira\n  - Se qualquer transferência falha em um loop, todas as outras também falham\n• Como pull payments resolvem isso: cada usuário saca separadamente\n• Por que \`transfer()\` e \`send()\` são considerados deprecated:\n  - Limite de 2300 gas pode causar problemas com contratos receptores\n  - Use \`call{value: amount}("")\` com verificação do retorno\n• Como criar um contrato sem \`receive()\` para testar DoS\n\n🔍 **Pesquise por:** "Solidity pull payments pattern", "Solidity DoS attack push payments", "Solidity call vs transfer vs send"\n\n📖 **Referência:** consensys.github.io/smart-contract-best-practices (Favor Pull over Push)`,
    },
    challenge: `Crie um sistema de distribuição de recompensas usando pull payments:\n\n**Passo 1 — RewardDistributor:** Crie um contrato com:\n  - \`mapping(address => uint256) public pendingWithdrawals\`\n  - \`addReward(address recipient, uint256 amount) public\` — apenas adiciona ao mapping (não transfere)\n  - \`withdraw() public\` — usuário saca seus próprios fundos com CEI\n\n**Passo 2 — Implemente withdraw() com CEI:**\n\`\`\`solidity\nfunction withdraw() public {\n  uint256 amount = pendingWithdrawals[msg.sender];\n  if (amount == 0) revert NothingToWithdraw();\n  pendingWithdrawals[msg.sender] = 0; // Effect ANTES\n  (bool sent,) = msg.sender.call{value: amount}(""); // Interaction DEPOIS\n  if (!sent) revert WithdrawFailed();\n}\n\`\`\`\n\n**Passo 3 — MaliciousReceiver:** Crie um contrato sem \`receive()\` para testar DoS:\n  \`contract MaliciousReceiver { /* sem receive() */ }\`\n\n**Passo 4 — Teste de DoS com push payments:** Implemente PushPayments e teste que:\n  - Distribuir para [alice, MaliciousReceiver, bob] falha completamente\n  - bob não recebe nada mesmo sendo um endereço legítimo\n\n**Passo 5 — Teste de resiliência com pull payments:** Verifique que:\n  - alice pode sacar sua recompensa independentemente\n  - MaliciousReceiver recebe a recompensa no mapping mas não consegue sacar (sem receive)\n  - bob pode sacar sem problemas\n\n✅ **Critério de sucesso:** Demonstra que pull payments isolam falhas, DoS não é possível`,
    hints: [
      "A contract without receive() will cause transfer() to fail",
      "Pull payments isolate each user's withdrawal",
      "Always zero the balance before transferring",
    ],
    commonMistakes: [
      "Using push payments in loops",
      "Not following CEI in withdraw functions",
      "Forgetting that contracts can reject ETH",
    ],
    bestPractices: [
      "Default to pull payments",
      "Follow CEI religiously",
      "Test with malicious recipient contracts",
      "Emit events for all payments",
    ],
    checklist: [
      "Pull pattern implemented correctly",
      "CEI followed in withdraw",
      "Malicious recipient can't DoS others",
      "Events track all payments",
    ],
    shortSolution: `mapping(address => uint256) public pending;
function withdraw() public {
    uint256 amount = pending[msg.sender];
    pending[msg.sender] = 0; // Effect
    payable(msg.sender).call{value: amount}(""); // Interaction
}`,
    fullSolution: `// See example above`,
  },
  {
    id: "advanced-05",
    level: "advanced",
    order: 5,
    title: "Modular Contract Architecture",
    concept: "Separation of concerns, upgradeable patterns, contract composition",
    explanation: {
      en: `Professional contracts split logic across multiple contracts for maintainability and reusability. Common patterns: separate storage from logic, use libraries for shared code, compose contracts through interfaces. This isn't about proxy upgrades (complex topic) but about clean architecture that makes contracts easier to audit, test, and extend.`,
      pt: `Contratos profissionais dividem a lógica em múltiplos contratos para manutenibilidade e reutilização. Padrões comuns: separar storage da lógica, usar bibliotecas para código compartilhado, compor contratos através de interfaces. Isso não se trata de upgrades por proxy (tópico complexo), mas de uma arquitetura limpa que torna os contratos mais fáceis de auditar, testar e estender.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Library for shared math operations
library SafeMath {
    error Overflow();
    error DivisionByZero();

    function percentOf(uint256 value, uint256 percent) internal pure returns (uint256) {
        if (percent > 100) revert Overflow();
        return (value * percent) / 100;
    }
}

// Base: Access control module
abstract contract AccessModule {
    mapping(address => bool) private _admins;
    constructor() { _admins[msg.sender] = true; }
    modifier onlyAdmin() { require(_admins[msg.sender], "Not admin"); _; }
    function addAdmin(address a) external onlyAdmin { _admins[a] = true; }
}

// Base: Pausable module
abstract contract PausableModule {
    bool public paused;
    event Paused(address account);
    event Unpaused(address account);
    modifier whenNotPaused() { require(!paused, "Paused"); _; }
    function _pause() internal { paused = true; emit Paused(msg.sender); }
    function _unpause() internal { paused = false; emit Unpaused(msg.sender); }
}

// Composed contract
contract Treasury is AccessModule, PausableModule {
    using SafeMath for uint256;

    mapping(address => uint256) public allocations;
    uint256 public totalAllocated;

    function allocate(address recipient, uint256 percent)
        external onlyAdmin whenNotPaused
    {
        uint256 amount = address(this).balance.percentOf(percent);
        allocations[recipient] += amount;
        totalAllocated += amount;
    }

    function pause() external onlyAdmin { _pause(); }
    function unpause() external onlyAdmin { _unpause(); }

    receive() external payable {}
}`,
    foundryWorkflow: `forge build
forge test -vvv

# Inspect contract size (limit: 24KB)
forge build --sizes`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• The problem of "God Contracts" — one giant contract that does everything (hard to audit and maintain)\n• How to divide responsibilities into modules:\n  - \`abstract contract AccessModule\` — controls who can do what\n  - \`abstract contract PausableModule\` — turns the contract on/off\n  - \`abstract contract FeeModule\` — calculates and distributes fees\n• How Solidity libraries work — reusable functions without state\n• The 24KB contract size limit — why modularity helps\n• How to test modules in isolation before composing\n• The golden rule: maximum 3 levels of inheritance for easier auditing\n\n🔍 **Search for:** "Solidity contract modularity", "Solidity library pattern", "Solidity inheritance depth audit"\n\n📖 **Reference:** OpenZeppelin Contracts source code as example of modular architecture`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• O problema do "God Contract" — um contrato gigante que faz tudo (difícil de auditar e manter)\n• Como dividir responsabilidades em módulos:\n  - \`abstract contract AccessModule\` — controla quem pode fazer o quê\n  - \`abstract contract PausableModule\` — liga/desliga o contrato\n  - \`abstract contract FeeModule\` — calcula e distribui taxas\n• Como Solidity libraries funcionam — funções reutilizáveis sem estado\n• O limite de 24KB para contratos — por que modularidade ajuda\n• Como testar módulos isoladamente antes de compor\n• A regra de ouro: máximo 3 níveis de herança para facilitar auditoria\n\n🔍 **Pesquise por:** "Solidity contract modularity", "Solidity library pattern", "Solidity inheritance depth audit"\n\n📖 **Referência:** OpenZeppelin Contracts source code como exemplo de arquitetura modular`,
    },
    challenge: `Crie um protocolo DeFi modular com 4 módulos separados:\n\n**Passo 1 — AccessModule:** \`abstract contract AccessModule\`\n  - \`mapping(address => bool) private _admins\`\n  - \`constructor()\` que adiciona msg.sender como admin\n  - \`modifier onlyAdmin()\`\n  - \`addAdmin(address a) external onlyAdmin\`\n  - \`removeAdmin(address a) external onlyAdmin\`\n\n**Passo 2 — PausableModule:** \`abstract contract PausableModule\`\n  - \`bool public paused\`\n  - \`modifier whenNotPaused()\`\n  - \`_pause() internal\` e \`_unpause() internal\`\n\n**Passo 3 — FeeModule:** \`abstract contract FeeModule\`\n  - \`uint256 public feePercent\` (basis points: 100 = 1%)\n  - \`address public feeRecipient\`\n  - \`_calculateFee(uint256 amount) internal view returns (uint256)\`\n\n**Passo 4 — Library:** \`library MathUtils\`\n  - \`function percentOf(uint256 value, uint256 percent) internal pure returns (uint256)\`\n\n**Passo 5 — Protocolo Final:** Componha tudo:\n\`\`\`solidity\ncontract DeFiProtocol is AccessModule, PausableModule, FeeModule {\n  using MathUtils for uint256;\n  function swap(uint256 amount) external whenNotPaused { ... }\n  function pause() external onlyAdmin { _pause(); }\n}\n\`\`\`\n\n**Passo 6 — Testes modulares:** Escreva testes separados para cada módulo ANTES de testar o protocolo composto\n\n✅ **Critério de sucesso:** forge build --sizes mostra contrato abaixo de 24KB, cada módulo testado isoladamente`,
    hints: [
      "Use abstract contracts for modules",
      "Libraries for stateless shared logic",
      "Compose modules through inheritance",
    ],
    commonMistakes: [
      "God contracts with everything in one file",
      "Deep inheritance chains (hard to audit)",
      "Not testing modules independently",
    ],
    bestPractices: [
      "One responsibility per module",
      "Test modules in isolation",
      "Keep inheritance depth <= 3",
      "Use interfaces between modules",
    ],
    checklist: [
      "Modules are independent",
      "Composition works correctly",
      "Each module is testable alone",
      "Contract size is under 24KB",
    ],
    shortSolution: `abstract contract AccessModule { modifier onlyAdmin() { /* ... */ _; } }
abstract contract PausableModule { modifier whenNotPaused() { /* ... */ _; } }
contract App is AccessModule, PausableModule { /* composed */ }`,
    fullSolution: `// See example above`,
  },
  {
    id: "advanced-06",
    level: "advanced",
    order: 6,
    title: "Fuzz Testing & Advanced Testing",
    concept: "Property-based testing, fuzz testing, invariant testing",
    explanation: {
      en: `Fuzz testing generates random inputs to find edge cases you'd never think of. Foundry runs 256 fuzz iterations by default (configurable to thousands). Invariant testing goes further — defining properties that must ALWAYS hold true, then letting Foundry try to break them with random sequences of function calls. This catches bugs that unit tests miss.`,
      pt: `Testes de fuzz geram entradas aleatórias para encontrar casos extremos que você nunca pensaria. Foundry executa 256 iterações de fuzz por padrão (configurável para milhares). Testes de invariante vão além — definindo propriedades que SEMPRE devem ser verdadeiras, deixando o Foundry tentar quebrá-las com sequências aleatórias de chamadas de função. Isso detecta bugs que testes unitários perdem.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";

contract BoundedToken {
    mapping(address => uint256) public balances;
    uint256 public totalSupply;
    uint256 public constant MAX_SUPPLY = 1_000_000 ether;

    error ExceedsMaxSupply();
    error InsufficientBalance();

    function mint(address to, uint256 amount) external {
        if (totalSupply + amount > MAX_SUPPLY) revert ExceedsMaxSupply();
        balances[to] += amount;
        totalSupply += amount;
    }

    function transfer(address to, uint256 amount) external {
        if (balances[msg.sender] < amount) revert InsufficientBalance();
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}

contract BoundedTokenTest is Test {
    BoundedToken token;
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");

    function setUp() public {
        token = new BoundedToken();
    }

    // Fuzz test: any amount should maintain invariant
    function testFuzz_MintNeverExceedsMax(uint256 amount) public {
        amount = bound(amount, 0, token.MAX_SUPPLY());
        token.mint(alice, amount);
        assertLe(token.totalSupply(), token.MAX_SUPPLY());
    }

    // Fuzz test: transfers preserve total supply
    function testFuzz_TransferPreservesSupply(uint256 mintAmount, uint256 transferAmount) public {
        mintAmount = bound(mintAmount, 1, token.MAX_SUPPLY());
        token.mint(alice, mintAmount);

        transferAmount = bound(transferAmount, 0, mintAmount);
        vm.prank(alice);
        token.transfer(bob, transferAmount);

        assertEq(
            token.balances(alice) + token.balances(bob),
            mintAmount
        );
        assertEq(token.totalSupply(), mintAmount);
    }

    // Test that minting over max always reverts
    function testFuzz_MintOverMaxReverts(uint256 amount) public {
        amount = bound(amount, token.MAX_SUPPLY() + 1, type(uint256).max);
        vm.expectRevert(BoundedToken.ExceedsMaxSupply.selector);
        token.mint(alice, amount);
    }
}`,
    foundryWorkflow: `# Run fuzz tests with default 256 runs
forge test -vvv

# Increase fuzz runs for more coverage
forge test --fuzz-runs 10000

# Run only fuzz tests
forge test --match-test testFuzz

# Foundry will report any failing seeds for reproduction
# Failed fuzz input is shown in output for debugging`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• What is property-based testing vs unit testing:\n  - Unit test: verifies a specific input\n  - Fuzz test: generates hundreds of random inputs to verify a PROPERTY\n• How to name fuzz tests: \`function testFuzz_PropertyName(uint256 param)\`\n• What is \`bound(value, min, max)\` — essential for meaningful inputs\n• What are invariants — properties that MUST ALWAYS be true:\n  - e.g.: totalSupply == sum of all balances\n  - e.g.: balance after transfer is never greater than before\n• What are invariant tests in Foundry\n• How to increase iterations: \`forge test --fuzz-runs 10000\`\n• Why a failure seed is reproducible: \`forge test --fuzz-seed <SEED>\`\n\n🔍 **Search for:** "Foundry fuzz testing tutorial", "Solidity invariant testing", "property-based testing Ethereum"\n\n📖 **Docs:** book.getfoundry.sh/forge/fuzz-testing`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• O que é property-based testing vs unit testing:\n  - Unit test: verifica um input específico\n  - Fuzz test: gera centenas de inputs aleatórios para verificar uma PROPRIEDADE\n• Como nomear fuzz tests: \`function testFuzz_NomeDaPropriedade(uint256 param)\`\n• O que é \`bound(value, min, max)\` — essencial para inputs com sentido\n• O que são invariantes — propriedades que SEMPRE devem ser verdadeiras:\n  - Ex: totalSupply == soma de todos os balanços\n  - Ex: saldo depois da transferência nunca é maior que antes\n• O que são invariant tests (testes de invariante) no Foundry\n• Como aumentar as iterações: \`forge test --fuzz-runs 10000\`\n• Por que um seed de falha é reproduzível: \`forge test --fuzz-seed <SEED>\`\n\n🔍 **Pesquise por:** "Foundry fuzz testing tutorial", "Solidity invariant testing", "property-based testing Ethereum"\n\n📖 **Documentação:** book.getfoundry.sh/forge/fuzz-testing`,
    },
    challenge: `Escreva fuzz tests para um DEX (exchange descentralizada) simplificado:\n\n**Passo 1 — Contrato SimpleDEX:**\n\`\`\`solidity\ncontract SimpleDEX {\n  uint256 public reserveA;\n  uint256 public reserveB;\n  uint256 public constant FEE = 30; // 0.3%\n  function swap(uint256 amountA) external returns (uint256 amountB) { ... }\n  function addLiquidity(uint256 a, uint256 b) external { ... }\n}\n\`\`\`\n\n**Passo 2 — Fuzz test de swap:**\n\`\`\`solidity\nfunction testFuzz_SwapPreservesLiquidity(uint256 amountA) public {\n  amountA = bound(amountA, 1, reserveA / 2);\n  uint256 reserveBefore = reserveA + reserveB;\n  dex.swap(amountA);\n  assertGe(dex.reserveA() + dex.reserveB(), reserveBefore);\n}\n\`\`\`\n\n**Passo 3 — Fuzz test de fees:**\n\`\`\`solidity\nfunction testFuzz_FeeIsAlwaysPositive(uint256 amount) public {\n  amount = bound(amount, 1, 1e18);\n  uint256 fee = amount * FEE / 10000;\n  assertGt(fee, 0);\n}\n\`\`\`\n\n**Passo 4 — Fuzz test de liquidez:**\n  Propriedade: após addLiquidity, as reservas aumentam corretamente\n\n**Passo 5 — Aumente as iterações:**\n  Execute \`forge test --fuzz-runs 10000 --match-test testFuzz\`\n  Verifique se alguma propriedade falha com mais iterações\n\n**Passo 6 — Quando um fuzz test falha:**\n  O Foundry mostra o seed e os valores que causaram a falha — reproduza com \`--fuzz-seed\`\n\n✅ **Critério de sucesso:** Todos os fuzz tests passam com 10.000 iterações, invariantes são claramente definidas`,
    hints: [
      "`bound(value, min, max)` constrains fuzz inputs",
      "Define invariants as mathematical properties",
      "Failed fuzz inputs are reproducible with the seed",
    ],
    commonMistakes: [
      "Not bounding fuzz inputs (most will revert uselessly)",
      "Testing implementation instead of properties",
      "Not running enough fuzz iterations for confidence",
    ],
    bestPractices: [
      "Define invariants: totalSupply == sum of balances",
      "Bound inputs to meaningful ranges",
      "Increase fuzz runs for critical code",
      "Use invariant tests for protocol-level properties",
    ],
    checklist: [
      "Fuzz tests cover key properties",
      "Inputs are properly bounded",
      "Invariants are clearly defined",
      "Tests pass with 10,000+ runs",
    ],
    shortSolution: `function testFuzz_Transfer(uint256 amount) public {
    amount = bound(amount, 0, balance);
    token.transfer(bob, amount);
    assertEq(token.balances(alice) + token.balances(bob), totalMinted);
}`,
    fullSolution: `// See example above`,
  },
  {
    id: "advanced-07",
    level: "advanced",
    order: 7,
    title: "Frontend Integration Patterns",
    concept: "ethers.js/viem patterns, event listening, transaction handling",
    explanation: {
      en: `Connecting smart contracts to frontends requires understanding ABIs, providers, signers, and event handling. Modern dApps use either ethers.js or viem. Key patterns: connecting wallets, reading contract state, sending transactions, listening to events, and handling errors gracefully. The frontend should show transaction status, handle reverts, and update UI optimistically.`,
      pt: `Conectar contratos inteligentes a frontends requer entender ABIs, providers, signers e manipulação de eventos. dApps modernos usam ethers.js ou viem. Padrões principais: conectar carteiras, ler estado do contrato, enviar transações, escutar eventos e tratar erros adequadamente. O frontend deve mostrar o status da transação, tratar reversões e atualizar a UI otimisticamente.`,
    },
    example: `// Frontend integration patterns (TypeScript/React)

// 1. Connect to provider and contract
// import { ethers } from "ethers";
// const provider = new ethers.BrowserProvider(window.ethereum);
// const signer = await provider.getSigner();
// const contract = new ethers.Contract(ADDRESS, ABI, signer);

// 2. Read contract state
// const count = await contract.getCount();
// const balance = await contract.balanceOf(userAddress);

// 3. Send transaction with error handling
// try {
//   const tx = await contract.increment();
//   setStatus("Confirming...");
//   const receipt = await tx.wait();
//   setStatus("Confirmed! Block: " + receipt.blockNumber);
// } catch (err) {
//   if (err.code === "ACTION_REJECTED") setStatus("User rejected");
//   else setStatus("Error: " + err.reason);
// }

// 4. Listen to events
// contract.on("CountChanged", (newCount, changedBy) => {
//   setCount(newCount);
//   addLog("Count changed to " + newCount + " by " + changedBy);
// });

// 5. Query past events
// const filter = contract.filters.Transfer(userAddress);
// const events = await contract.queryFilter(filter, fromBlock, toBlock);

// Solidity contract for reference:
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DAppBackend {
    mapping(address => uint256) public scores;
    uint256 public totalPlayers;

    event ScoreUpdated(address indexed player, uint256 newScore);
    event PlayerJoined(address indexed player);

    function join() external {
        require(scores[msg.sender] == 0, "Already joined");
        scores[msg.sender] = 1;
        totalPlayers++;
        emit PlayerJoined(msg.sender);
    }

    function updateScore(uint256 points) external {
        require(scores[msg.sender] > 0, "Not a player");
        scores[msg.sender] += points;
        emit ScoreUpdated(msg.sender, scores[msg.sender]);
    }

    function getLeaderboard() external view returns (uint256) {
        return totalPlayers;
    }
}`,
    foundryWorkflow: `# Build to generate ABI
forge build

# ABI is at: out/DAppBackend.sol/DAppBackend.json
# Copy ABI to frontend project

# Start local chain
anvil

# Deploy
forge create src/DAppBackend.sol:DAppBackend --rpc-url http://localhost:8545 --private-key 0xac0974...

# Frontend connects to http://localhost:8545
# MetaMask: Add network -> RPC URL: http://localhost:8545, Chain ID: 31337`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• How to connect MetaMask: \`window.ethereum.request({method: 'eth_requestAccounts'})\`\n• What is a \`Provider\` — read-only connection to the blockchain\n• What is a \`Signer\` — connection with ability to sign transactions\n• What is the ABI — how JavaScript knows which functions exist in the contract\n• ethers.js v6: \`new ethers.BrowserProvider(window.ethereum)\`\n• How to handle transaction states: pending → confirming → confirmed/failed\n• How to listen to events: \`contract.on("EventName", callback)\`\n• Common errors: user rejection (4001), insufficient funds, revert with message\n• What is wagmi/viem — modern alternative to ethers.js in React projects\n\n🔍 **Search for:** "ethers.js v6 tutorial", "viem wagmi React dApp", "MetaMask integration React"\n\n📖 **Docs:** docs.ethers.org, wagmi.sh`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• Como conectar MetaMask: \`window.ethereum.request({method: 'eth_requestAccounts'})\`\n• O que é um \`Provider\` — conexão read-only com a blockchain\n• O que é um \`Signer\` — conexão com capacidade de assinar transações\n• O que é a ABI — como o JavaScript sabe quais funções existem no contrato\n• ethers.js v6: \`new ethers.BrowserProvider(window.ethereum)\`\n• Como lidar com estados de transação: pending → confirming → confirmed/failed\n• Como escutar eventos: \`contract.on("EventName", callback)\`\n• Erros comuns: user rejection (4001), insufficient funds, revert com mensagem\n• O que é wagmi/viem — alternativa moderna ao ethers.js em projetos React\n\n🔍 **Pesquise por:** "ethers.js v6 tutorial", "viem wagmi React dApp", "MetaMask integration React"\n\n📖 **Documentação:** docs.ethers.org, wagmi.sh`,
    },
    challenge: `Construa uma integração frontend completa:\n\n**Passo 1 — Contrato:** Use o DAppBackend do exemplo (ou qualquer contrato com eventos)\n\n**Passo 2 — Conexão de wallet (React component):**\n\`\`\`typescript\nasync function connectWallet() {\n  const provider = new ethers.BrowserProvider(window.ethereum);\n  const signer = await provider.getSigner();\n  const address = await signer.getAddress();\n  setAccount(address);\n}\n\`\`\`\n\n**Passo 3 — Leitura de estado:**\n  - Carregue dados no mount com \`useEffect\`\n  - Mostre loading state enquanto lê\n  - Trate erros de rede\n\n**Passo 4 — Envio de transação com feedback:**\n\`\`\`typescript\nasync function handleAction() {\n  setStatus("Enviando...");\n  try {\n    const tx = await contract.join();\n    setStatus("Aguardando confirmação...");\n    await tx.wait();\n    setStatus("Confirmado!");\n  } catch(err) {\n    if (err.code === 4001) setStatus("Rejeitado pelo usuário");\n    else setStatus("Erro: " + err.reason);\n  }\n}\n\`\`\`\n\n**Passo 5 — Event listening:**\n\`\`\`typescript\nuseEffect(() => {\n  contract.on("PlayerJoined", (player) => {\n    setPlayers(prev => [...prev, player]);\n  });\n  return () => contract.removeAllListeners();\n}, [contract]);\n\`\`\`\n\n**Passo 6 — Configure Anvil no MetaMask:**\n  Network Name: Anvil Local, RPC: http://localhost:8545, Chain ID: 31337\n\n✅ **Critério de sucesso:** Botão "Conectar Wallet" funciona, transações mostram status, eventos atualizam a UI`,
    hints: [
      "Always show transaction status to users",
      "Handle user rejection vs contract revert differently",
      "Optimistic updates improve UX (revert on failure)",
    ],
    commonMistakes: [
      "Not handling wallet disconnection",
      "Blocking UI during transaction confirmation",
      "Not showing gas estimates before sending",
    ],
    bestPractices: [
      "Show clear transaction status",
      "Handle all error types",
      "Use events for real-time updates",
      "Implement retry logic for failed reads",
    ],
    checklist: [
      "Wallet connects successfully",
      "Reads display current state",
      "Writes show pending/confirmed status",
      "Events update UI in real-time",
      "Errors are handled gracefully",
    ],
    shortSolution: `// const tx = await contract.increment();
// await tx.wait();
// contract.on("CountChanged", (n) => setCount(n));`,
    fullSolution: `// See example above for complete integration patterns`,
  },
  {
    id: "advanced-08",
    level: "advanced",
    order: 8,
    title: "Project: Crowdfunding dApp",
    concept: "Complete crowdfunding platform with time-based logic and refunds",
    explanation: {
      en: `A crowdfunding contract combines time-based deadlines, goal tracking, contribution management, and conditional refunds. If the goal is met before the deadline, the creator can withdraw funds. If not, contributors can claim refunds. This teaches essential DeFi patterns: escrow, time-locks, and conditional execution.`,
      pt: `Um contrato de crowdfunding combina prazos baseados em tempo, rastreamento de metas, gerenciamento de contribuições e reembolsos condicionais. Se a meta for atingida antes do prazo, o criador pode sacar os fundos. Se não, os contribuintes podem reivindicar reembolsos. Isso ensina padrões essenciais de DeFi: custódia, time-locks e execução condicional.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Crowdfunding {
    struct Campaign {
        address creator;
        string title;
        uint256 goal;
        uint256 deadline;
        uint256 totalFunded;
        bool claimed;
        mapping(address => uint256) contributions;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignCount;

    error CampaignEnded();
    error CampaignNotEnded();
    error GoalNotReached();
    error GoalReached();
    error AlreadyClaimed();
    error NoContribution();
    error TransferFailed();

    event CampaignCreated(uint256 indexed id, address creator, uint256 goal, uint256 deadline);
    event Contributed(uint256 indexed id, address indexed contributor, uint256 amount);
    event FundsClaimed(uint256 indexed id, uint256 amount);
    event RefundClaimed(uint256 indexed id, address indexed contributor, uint256 amount);

    function createCampaign(string memory title, uint256 goal, uint256 duration) external returns (uint256) {
        uint256 id = campaignCount++;
        Campaign storage c = campaigns[id];
        c.creator = msg.sender;
        c.title = title;
        c.goal = goal;
        c.deadline = block.timestamp + duration;
        emit CampaignCreated(id, msg.sender, goal, c.deadline);
        return id;
    }

    function contribute(uint256 id) external payable {
        Campaign storage c = campaigns[id];
        if (block.timestamp >= c.deadline) revert CampaignEnded();
        c.contributions[msg.sender] += msg.value;
        c.totalFunded += msg.value;
        emit Contributed(id, msg.sender, msg.value);
    }

    function claimFunds(uint256 id) external {
        Campaign storage c = campaigns[id];
        if (block.timestamp < c.deadline) revert CampaignNotEnded();
        if (c.totalFunded < c.goal) revert GoalNotReached();
        if (c.claimed) revert AlreadyClaimed();
        require(msg.sender == c.creator, "Not creator");

        c.claimed = true;
        uint256 amount = c.totalFunded;
        emit FundsClaimed(id, amount);

        (bool sent, ) = c.creator.call{value: amount}("");
        if (!sent) revert TransferFailed();
    }

    function claimRefund(uint256 id) external {
        Campaign storage c = campaigns[id];
        if (block.timestamp < c.deadline) revert CampaignNotEnded();
        if (c.totalFunded >= c.goal) revert GoalReached();

        uint256 amount = c.contributions[msg.sender];
        if (amount == 0) revert NoContribution();

        c.contributions[msg.sender] = 0;
        emit RefundClaimed(id, msg.sender, amount);

        (bool sent, ) = msg.sender.call{value: amount}("");
        if (!sent) revert TransferFailed();
    }
}`,
    foundryWorkflow: `forge init crowdfunding && cd crowdfunding
forge build
forge test -vvv

# Key test patterns:
# vm.warp(block.timestamp + 1 days) to simulate time
# vm.deal(alice, 10 ether) to give test ETH
# vm.prank(alice) to act as alice`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• How to use \`block.timestamp\` for deadline logic\n• The escrow pattern — funds are locked until a condition is met\n• The time-lock pattern — actions only possible after a certain time\n• Why mappings inside structs cannot be returned from view functions\n  (use separate variables or events to track individual contributions)\n• The refund pattern with pull payments (each contributor withdraws separately)\n• Custom errors for clear failure identification\n• How to test time scenarios with \`vm.warp()\` in Foundry\n\n🔍 **Search for:** "Solidity crowdfunding contract tutorial", "Solidity escrow pattern", "Foundry vm.warp testing deadlines"\n\n📖 **Reference:** ethereum.org/en/developers/tutorials`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• Como usar \`block.timestamp\` para lógica de prazo (deadline)\n• O padrão escrow — fundos ficam bloqueados até condição ser cumprida\n• O padrão time-lock — ações só são possíveis após certo tempo\n• Por que mappings dentro de structs não podem ser retornados de view functions\n  (use variáveis separadas ou eventos para rastrear contribuições individuais)\n• O padrão de reembolso com pull payments (cada contribuinte saca separadamente)\n• Custom errors para identificação clara de falhas\n• Como testar cenários de tempo com \`vm.warp()\` no Foundry\n\n🔍 **Pesquise por:** "Solidity crowdfunding contract tutorial", "Solidity escrow pattern", "Foundry vm.warp testing deadlines"\n\n📖 **Referência:** ethereum.org/en/developers/tutorials`,
    },
    challenge: `Construa o sistema de Crowdfunding completo com todos os cenários:\n\n**Passo 1 — Contrato:** Implemente o Crowdfunding do exemplo com todas as funções\n\n**Passo 2 — Testes de ciclo de vida completo:**\n\n**Cenário A — Campanha bem-sucedida:**\n  - Alice cria campanha com meta 5 ETH e prazo 30 dias\n  - Bob contribui 3 ETH, Carol contribui 2 ETH\n  - vm.warp(prazo + 1)\n  - Alice chama claimFunds() — verifica recebimento\n  - Bob tenta claimRefund() — deve reverter com GoalReached\n\n**Cenário B — Campanha fracassada:**\n  - Alice cria campanha com meta 10 ETH e prazo 7 dias\n  - Bob contribui 2 ETH\n  - vm.warp(prazo + 1)\n  - Alice tenta claimFunds() — deve reverter com GoalNotReached\n  - Bob chama claimRefund() — verifica recebimento dos 2 ETH de volta\n\n**Passo 3 — Testes de edge cases:**\n  - Tentar contribuir após deadline → CampaignEnded\n  - Tentar sacar antes do deadline → CampaignNotEnded\n  - Tentar double refund → NoContribution\n  - Alice tenta reclamar fundos duas vezes → AlreadyClaimed\n\n**Passo 4 — Deploy e teste manual no Anvil**\n\n✅ **Critério de sucesso:** Todos os cenários A e B passam nos testes, edge cases todos revertem corretamente`,
    hints: [
      "Use vm.warp() to test time-dependent logic",
      "CEI pattern in claimFunds and claimRefund",
      "Frontend shows different UI based on campaign state",
    ],
    commonMistakes: [
      "Not following CEI in claim functions",
      "Allowing contributions after deadline",
      "Not preventing double refunds",
    ],
    bestPractices: [
      "CEI pattern for all withdrawals",
      "Custom errors for gas efficiency",
      "Thorough time-based testing",
      "Frontend shows clear campaign status",
    ],
    checklist: [
      "Campaign lifecycle works end-to-end",
      "Refunds work when goal not met",
      "Claims work when goal met",
      "Time-based logic is correct",
      "CEI pattern followed everywhere",
    ],
    shortSolution: `// See example above - complete crowdfunding contract`,
    fullSolution: `// The example is the full implementation.
// Frontend: campaign list, contribute modal, progress bar, refund button.`,
  },
  {
    id: "advanced-09",
    level: "advanced",
    order: 9,
    title: "Project: Simple Marketplace",
    concept: "NFT-style marketplace with listings, purchases, and fees",
    explanation: {
      en: `A marketplace contract handles listings, purchases, fee collection, and seller payouts. Sellers list items with prices, buyers purchase by sending ETH, the marketplace takes a fee, and the seller receives the remainder. This teaches escrow patterns, fee calculations, and multi-party interactions common in real marketplaces like OpenSea.`,
      pt: `Um contrato de marketplace lida com listagens, compras, coleta de taxas e pagamentos para vendedores. Vendedores listam itens com preços, compradores compram enviando ETH, o marketplace cobra uma taxa e o vendedor recebe o restante. Isso ensina padrões de custódia, cálculos de taxas e interações com múltiplas partes comuns em marketplaces reais como o OpenSea.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Marketplace {
    struct Listing {
        address seller;
        string title;
        string description;
        uint256 price;
        bool sold;
        bool active;
    }

    address public feeCollector;
    uint256 public feePercent; // basis points (100 = 1%)
    uint256 public listingCount;
    mapping(uint256 => Listing) public listings;
    mapping(address => uint256) public pendingWithdrawals;

    error NotSeller();
    error NotActive();
    error AlreadySold();
    error InsufficientPayment();
    error NothingToWithdraw();

    event Listed(uint256 indexed id, address indexed seller, uint256 price);
    event Purchased(uint256 indexed id, address indexed buyer, uint256 price);
    event Withdrawn(address indexed user, uint256 amount);

    constructor(uint256 _feePercent) {
        feeCollector = msg.sender;
        feePercent = _feePercent;
    }

    function list(string memory title, string memory description, uint256 price) external returns (uint256) {
        require(price > 0, "Price must be > 0");
        uint256 id = listingCount++;
        listings[id] = Listing(msg.sender, title, description, price, false, true);
        emit Listed(id, msg.sender, price);
        return id;
    }

    function purchase(uint256 id) external payable {
        Listing storage item = listings[id];
        if (!item.active) revert NotActive();
        if (item.sold) revert AlreadySold();
        if (msg.value < item.price) revert InsufficientPayment();

        item.sold = true;
        item.active = false;

        uint256 fee = (item.price * feePercent) / 10000;
        uint256 sellerAmount = item.price - fee;

        // Pull pattern: credit balances
        pendingWithdrawals[item.seller] += sellerAmount;
        pendingWithdrawals[feeCollector] += fee;

        // Refund excess
        if (msg.value > item.price) {
            pendingWithdrawals[msg.sender] += msg.value - item.price;
        }

        emit Purchased(id, msg.sender, item.price);
    }

    function withdraw() external {
        uint256 amount = pendingWithdrawals[msg.sender];
        if (amount == 0) revert NothingToWithdraw();
        pendingWithdrawals[msg.sender] = 0;
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Transfer failed");
        emit Withdrawn(msg.sender, amount);
    }

    function cancelListing(uint256 id) external {
        if (listings[id].seller != msg.sender) revert NotSeller();
        if (listings[id].sold) revert AlreadySold();
        listings[id].active = false;
    }
}`,
    foundryWorkflow: `forge build && forge test -vvv --gas-report

# Test fee calculations with various prices
# Test pull payment pattern
# Test listing lifecycle`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• The marketplace pattern: listing → purchase → payment distribution\n• How to calculate fees in basis points (1 basis point = 0.01%, 100 = 1%, 10000 = 100%)\n• Why the seller should not receive ETH directly at purchase time (pull payments pattern)\n• What is \`address(this).balance\` — the ETH balance of the contract\n• How to verify the success of \`call{value: amount}("")\` — always check the returned bool\n• Protection against re-listing: a sold listing cannot be sold again\n• The difference between \`active\` (available) and \`sold\` (sold) in a marketplace\n\n🔍 **Search for:** "Solidity marketplace contract", "Solidity basis points fee calculation", "OpenSea contract architecture"\n\n📖 **Reference:** solidity-by-example.org/sending-ether`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• O padrão marketplace: listagem → compra → distribuição de pagamento\n• Como calcular taxas em basis points (1 basis point = 0.01%, 100 = 1%, 10000 = 100%)\n• Por que o vendedor não deve receber ETH diretamente na compra (padrão pull payments)\n• O que é \`address(this).balance\` — o saldo ETH do contrato\n• Como verificar o sucesso de \`call{value: amount}("")\` — sempre cheque o bool retornado\n• Proteção contra re-listagem: uma listagem vendida não pode ser vendida novamente\n• A diferença entre \`active\` (disponível) e \`sold\` (vendido) em um marketplace\n\n🔍 **Pesquise por:** "Solidity marketplace contract", "Solidity basis points fee calculation", "OpenSea contract architecture"\n\n📖 **Referência:** solidity-by-example.org/sending-ether`,
    },
    challenge: `Construa o Marketplace completo com taxas:\n\n**Passo 1 — Contrato:** Implemente o Marketplace do exemplo com struct Listing e todas as funções\n\n**Passo 2 — Calcule a taxa corretamente:**\n\`\`\`solidity\nuint256 fee = (msg.value * feePercent) / 10000; // basis points\nuint256 sellerAmount = msg.value - fee;\n\`\`\`\n\n**Passo 3 — Testes do marketplace:**\n  - \`testCreateListing()\`: seller lista item por 1 ETH → verifica listing.active == true\n  - \`testBuy()\`: buyer envia 1 ETH → verifica sold==true, active==false\n  - \`testFeeCollected()\`: após compra → verifica que fee foi para feeCollector\n  - \`testSellerReceived()\`: após compra → verifica que seller recebeu msg.value - fee\n  - \`testBuyAlreadySold()\`: tenta comprar item já vendido → vm.expectRevert\n  - \`testBuyInsufficientETH()\`: envia menos ETH que o preço → vm.expectRevert\n  - \`testCancelListing()\`: seller cancela → active == false\n  - \`testCancelByNonSeller()\`: outra pessoa tenta cancelar → vm.expectRevert\n\n**Passo 4 — Crie um test helper** para criar uma listing padrão e reutilizar nos testes\n\n**Passo 5 — Deploy e interação manual:** Liste 2 itens, compre 1, cancele o outro\n\n✅ **Critério de sucesso:** Todos os 8 testes passam, taxas são calculadas corretamente em basis points`,
    hints: [
      "Use basis points (10000 = 100%) for precise fee calculations",
      "Pull payments prevent DoS attacks",
      "Fuzz test fee math to prevent rounding errors",
    ],
    commonMistakes: [
      "Push payments to sellers (DoS risk)",
      "Integer rounding errors in fee calculation",
      "Not handling excess payment refunds",
    ],
    bestPractices: [
      "Pull payment pattern for all payouts",
      "Basis points for percentage calculations",
      "Test with small and large amounts",
      "Handle excess payments gracefully",
    ],
    checklist: [
      "Listing lifecycle complete",
      "Fees calculated correctly",
      "Pull payments implemented",
      "Excess payments refunded",
      "Fuzz tests pass",
    ],
    shortSolution: `// See example above`,
    fullSolution: `// The example is the complete marketplace implementation.`,
  },
  {
    id: "advanced-10",
    level: "advanced",
    order: 10,
    title: "Project: Vault Contract System",
    concept: "Multi-vault system with role-based access and deposit tracking",
    explanation: {
      en: `A vault system manages multiple independent vaults, each with its own balance tracking, access controls, and withdrawal logic. This capstone project combines all previous concepts: custom errors, access control, CEI pattern, pull payments, events, modular architecture, and comprehensive testing. It represents a production-quality contract system.`,
      pt: `Um sistema de vault gerencia múltiplos vaults independentes, cada um com seu próprio rastreamento de saldo, controles de acesso e lógica de saque. Este projeto final combina todos os conceitos anteriores: erros customizados, controle de acesso, padrão CEI, pull payments, eventos, arquitetura modular e testes abrangentes. Representa um sistema de contratos de qualidade de produção.`,
    },
    example: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VaultSystem {
    struct Vault {
        string name;
        address manager;
        uint256 totalDeposits;
        bool active;
        mapping(address => uint256) deposits;
        mapping(address => bool) authorized;
    }

    mapping(uint256 => Vault) public vaults;
    uint256 public vaultCount;
    address public admin;

    error NotAdmin();
    error NotManager();
    error NotAuthorized();
    error VaultInactive();
    error InsufficientDeposit();
    error TransferFailed();

    event VaultCreated(uint256 indexed id, string name, address manager);
    event Deposited(uint256 indexed vaultId, address indexed depositor, uint256 amount);
    event Withdrawn(uint256 indexed vaultId, address indexed user, uint256 amount);
    event UserAuthorized(uint256 indexed vaultId, address indexed user);

    modifier onlyAdmin() { if (msg.sender != admin) revert NotAdmin(); _; }
    modifier onlyManager(uint256 id) { if (msg.sender != vaults[id].manager) revert NotManager(); _; }
    modifier onlyAuthorized(uint256 id) {
        if (!vaults[id].authorized[msg.sender] && msg.sender != vaults[id].manager)
            revert NotAuthorized();
        _;
    }
    modifier vaultActive(uint256 id) { if (!vaults[id].active) revert VaultInactive(); _; }

    constructor() { admin = msg.sender; }

    function createVault(string memory name, address manager) external onlyAdmin returns (uint256) {
        uint256 id = vaultCount++;
        Vault storage v = vaults[id];
        v.name = name;
        v.manager = manager;
        v.active = true;
        v.authorized[manager] = true;
        emit VaultCreated(id, name, manager);
        return id;
    }

    function authorizeUser(uint256 id, address user) external onlyManager(id) {
        vaults[id].authorized[user] = true;
        emit UserAuthorized(id, user);
    }

    function deposit(uint256 id) external payable vaultActive(id) onlyAuthorized(id) {
        require(msg.value > 0, "No value");
        vaults[id].deposits[msg.sender] += msg.value;
        vaults[id].totalDeposits += msg.value;
        emit Deposited(id, msg.sender, msg.value);
    }

    function withdraw(uint256 id, uint256 amount) external vaultActive(id) onlyAuthorized(id) {
        Vault storage v = vaults[id];
        if (v.deposits[msg.sender] < amount) revert InsufficientDeposit();

        // CEI Pattern
        v.deposits[msg.sender] -= amount;
        v.totalDeposits -= amount;

        (bool sent, ) = msg.sender.call{value: amount}("");
        if (!sent) revert TransferFailed();

        emit Withdrawn(id, msg.sender, amount);
    }

    function getDeposit(uint256 id, address user) external view returns (uint256) {
        return vaults[id].deposits[user];
    }

    function deactivateVault(uint256 id) external onlyAdmin {
        vaults[id].active = false;
    }
}`,
    foundryWorkflow: `forge build
forge test -vvv --gas-report

# Comprehensive testing:
# - Test vault creation and management
# - Test authorization flow
# - Test deposit/withdraw with multiple users
# - Test deactivation prevents new deposits
# - Fuzz test deposit/withdraw amounts
# - Test reentrancy protection

forge test --fuzz-runs 5000`,
    learningPath: {
      en: `Before starting this exercise, you need to understand:\n\n📚 **Concepts to study:**\n• What is a DeFi Vault — stores assets and controls access\n• Time-locks in DeFi — why large withdrawals need a delay for security\n• The multisig pattern — multiple signatures required for critical operations\n• Strategies pattern in Vaults — how protocols like Yearn organize yield logic\n• How to calculate vault shares: shares = amount * totalShares / totalAssets\n• Why all previous patterns combine here:\n  - CEI pattern (reentrancy)\n  - Pull payments (withdrawals)\n  - Role-based access (administration)\n  - Custom errors (efficiency)\n  - Events (frontend)\n\n🔍 **Search for:** "DeFi vault contract ERC4626", "Solidity timelock", "Yearn vault architecture"\n\n📖 **Reference:** eips.ethereum.org/EIPS/eip-4626 (ERC4626 standard for vaults)`,
      pt: `Antes de começar este exercício, você precisa entender:\n\n📚 **Conceitos para estudar:**\n• O que é um Vault (cofre) DeFi — armazena ativos e controla acesso\n• Time-locks em DeFi — por que grandes saques precisam de delay para segurança\n• O padrão multisig — múltiplas assinaturas necessárias para operações críticas\n• Strategies pattern em Vaults — como protocolos como Yearn organizam a lógica de rendimento\n• Como calcular shares (cotas) de um vault: shares = amount * totalShares / totalAssets\n• Por que todos os padrões anteriores se combinam aqui:\n  - CEI pattern (reentrância)\n  - Pull payments (saques)\n  - Role-based access (administração)\n  - Custom errors (eficiência)\n  - Events (frontend)\n\n🔍 **Pesquise por:** "DeFi vault contract ERC4626", "Solidity timelock", "Yearn vault architecture"\n\n📖 **Referência:** eips.ethereum.org/EIPS/eip-4626 (padrão ERC4626 para vaults)`,
    },
    challenge: `Construa o sistema de Vault completo integrando todos os conceitos aprendidos:\n\n**Passo 1 — Estrutura do Vault:**\n  - AccessControl com roles: ADMIN, KEEPER, USER\n  - Pausable para emergências\n  - Mapeamento de depósitos por usuário\n  - Time-lock para saques grandes (> threshold)\n\n**Passo 2 — Funções principais:**\n  - \`deposit() public payable whenNotPaused\` — aceita ETH, registra shares\n  - \`requestWithdraw(uint256 amount) public\` — inicia o processo de saque com time-lock\n  - \`executeWithdraw() public\` — executa após o delay, com CEI + nonReentrant\n  - \`emergencyPause() public onlyRole(ADMIN_ROLE)\`\n\n**Passo 3 — Time-lock:**\n  - Saques > 1 ETH ficam pendentes por 24 horas\n  - \`mapping(address => uint256) public withdrawalTime\`\n  - \`mapping(address => uint256) public withdrawalAmount\`\n\n**Passo 4 — Testes completos (pelo menos 10 testes):**\n  - Deposit/withdraw básico\n  - Time-lock: tenta sacar antes do delay → reverter\n  - Time-lock: saca depois do delay → sucesso\n  - Pausa: tenta depositar em emergência → reverter\n  - Access control: não-admin tenta pausar → reverter\n  - Reentrância: ataque com contrato malicioso → bloqueado\n\n**Passo 5 — Auditoria do seu próprio código:** Revise e responda:\n  - Existe algum caminho de reentrância?\n  - O CEI é seguido em todas as funções?\n  - Custom errors estão sendo usados?\n  - Eventos cobrem todas as ações importantes?\n\n✅ **Critério de sucesso:** 10+ testes passam, auto-auditoria identifica e resolve todos os problemas`,
    hints: [
      "Modifiers stack for layered security",
      "Test with multiple vaults and users simultaneously",
      "Frontend needs different views for admin, manager, and user",
    ],
    commonMistakes: [
      "Not testing with multiple simultaneous vaults",
      "Missing authorization checks on edge functions",
      "Not following CEI in withdraw",
    ],
    bestPractices: [
      "Layer modifiers for defense in depth",
      "Test all role combinations",
      "Use events for complete audit trail",
      "Follow CEI in all withdrawal paths",
    ],
    checklist: [
      "Multi-vault management works",
      "Role-based access enforced",
      "Deposits and withdrawals correct",
      "Deactivation prevents operations",
      "Comprehensive test coverage",
      "CEI followed everywhere",
    ],
    shortSolution: `// See example above - complete vault system`,
    fullSolution: `// The example is the full VaultSystem implementation.
// Frontend: Admin panel for vault management, user dashboard for deposits.`,
  },
];

export function getExercisesByLevel(level: string): Exercise[] {
  return exercises.filter(e => e.level === level).sort((a, b) => a.order - b.order);
}

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find(e => e.id === id);
}
