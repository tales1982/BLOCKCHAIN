interface ExercisePT {
  challenge: string;
  hints: string[];
  commonMistakes: string[];
  bestPractices: string[];
  checklist: string[];
}

export const exerciseTranslationsPT: Record<string, ExercisePT> = {
  "beginner-01": {
    challenge: "Crie um contrato chamado `HelloFoundry` com uma variável string pública `message` com seu nome, e uma função `getMessage()` que a retorna.",
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
    challenge: "Crie um contrato `DataTypes` com: um `uint256` para idade, um `address` para proprietário (definido no constructor via msg.sender), um `bool` isActive (true), uma constante `VERSION` igual a 1, e uma função que retorna todos os valores.",
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
    challenge: "Crie um contrato `Calculator` com: uma variável de estado privada `result`, funções públicas para add/subtract que a modificam, uma função pure para multiplicar e uma view para obter o resultado.",
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
    challenge: "Crie um contrato `Vault` onde o constructor define o proprietário e um depósito mínimo. Adicione uma função `deposit()` com verificações require para o valor mínimo e uma `withdraw()` chamável apenas pelo proprietário.",
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
    challenge: "Crie um contrato `GradingSystem` que recebe uma nota (0-100) e retorna um conceito (A/B/C/D/F) usando lógica if/else. Adicione uma função que verifica se o aluno passou (nota >= 60).",
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
    challenge: "Crie um contrato `NumberList` que armazena valores uint256. Inclua funções para adicionar, remover por índice (swap-and-pop), obter o comprimento, obter todos os valores e verificar se um valor existe.",
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
    challenge: "Crie um contrato `Phonebook` com um mapping de nomes para números de telefone. Inclua funções de adicionar, atualizar, remover e buscar. Rastreie o total de entradas.",
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
    challenge: "Construa o contrato Counter completo, escreva testes Foundry para todas as funções, faça deploy no Anvil e descreva como conectar um frontend React usando ethers.js.",
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
    challenge: "Construa o contrato MessageBoard com funções post, read e getLatest. Escreva testes Foundry. Planeje como um frontend React exibiria as mensagens em um feed.",
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
    challenge: "Construa o TodoList completo com funções criar, alternar, deletar e listar. Cada usuário deve ter dados isolados. Escreva testes para todas as operações CRUD.",
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
    challenge: "Crie um `TaskManager` com um enum para Prioridade (Baixa, Média, Alta, Crítica) e uma struct para Tarefa (id, título, responsável, prioridade, concluída). Implemente operações CRUD com filtragem por status.",
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
    challenge: "Crie um `PaymentProcessor` com eventos para PaymentSent, PaymentReceived e RefundIssued. Use parâmetros indexados para endereços. Escreva testes que verificam emissão de eventos com `vm.expectEmit`.",
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
    challenge: "Crie um contrato com modifiers: `onlyOwner`, `whenNotPaused`, `rateLimited(uint256 cooldown)`. Use-os juntos em funções sensíveis.",
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
    challenge: "Crie uma interface `IVault`, um contrato abstrato `BaseVault` com lógica comum e um contrato concreto `ETHVault` que herda BaseVault e implementa IVault.",
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
    challenge: "Organize um projeto com pastas: interfaces/, base/ para contratos abstratos e contratos principais importando de ambos. Use importações nomeadas em todo o projeto.",
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
    challenge: "Implemente um sistema de controle de acesso baseado em papéis com ADMIN, EDITOR e VIEWER. Admin gerencia papéis, Editor modifica conteúdo, Viewer só lê. Inclua funções de verificação e gerenciamento de papéis.",
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
    challenge: "Escreva testes abrangentes para um contrato Vault: teste depósitos, saques, controle de acesso, casos extremos. Use vm.prank, vm.deal, vm.expectRevert e escreva ao menos um teste de fuzz.",
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
    challenge: "Escreva um script de deploy que implanta um contrato Token e um Vault (Vault depende do endereço do Token). Faça deploy no Anvil e interaja com ambos usando cast.",
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
    challenge: "Construa o VotingSystem completo, escreva testes Foundry cobrindo registro, votação, execução do prazo e contagem de resultados. Planeje o frontend com cards de propostas, botões de voto e resultados ao vivo.",
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
    challenge: "Construa o RecordManager completo com CRUD + soft delete. Escreva testes Foundry abrangentes. Projete um frontend React com tabela de dados, formulários de criação/edição e confirmação de exclusão.",
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
    challenge: "Implemente um padrão Ownable com transferência em dois passos e erros customizados. Adicione um contrato Treasury que o usa com erros customizados para toda validação. Compare o uso de gas com strings de require.",
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
    challenge: "Pegue um contrato não otimizado e aplique: empacotamento de structs, loops unchecked, parâmetros calldata, cache de storage. Meça a economia de gas com `forge test --gas-report`.",
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
    challenge: "Escreva versões vulnerável e segura de um vault. Crie um contrato atacante que explora a versão vulnerável. Verifique que a versão segura é imune. Use o padrão CEI e o guard nonReentrant.",
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
    challenge: "Construa um sistema de distribuição de recompensas usando pull payments. Múltiplos usuários acumulam recompensas e sacam eles mesmos. Teste que um destinatário malicioso não consiga bloquear saques de outros usuários.",
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
    challenge: "Projete um contrato DeFi modular com módulos separados para: controle de acesso, pausabilidade, gerenciamento de taxas e lógica principal. Cada módulo deve ser testável independentemente.",
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
    challenge: "Escreva testes de fuzz para uma função de swap de DEX. Teste que: swaps preservam o valor total, taxas são calculadas corretamente para qualquer entrada e nenhum token é criado ou destruído.",
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
    challenge: "Construa uma integração frontend completa: conexão de carteira, interação com contrato, escuta de eventos, tratamento de erros e atualizações otimistas de UI. Inclua estados de carregamento e feedback de status de transação.",
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
    challenge: "Construa o dApp de Crowdfunding completo. Teste todos os cenários: campanha bem-sucedida, campanha fracassada com reembolsos, casos extremos. Projete um frontend React com cards de campanha, formulário de contribuição e barras de progresso.",
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
    challenge: "Construa o marketplace com funções de listagem, compra, cancelamento e saque. Use pull payments para segurança. Escreva testes de fuzz para cálculos de taxas. Planeje um frontend React com grade de itens, fluxo de compra e painel do vendedor.",
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
    challenge: "Construa o VaultSystem completo. Escreva testes cobrindo: ciclo de vida do vault, depósitos/saques multi-usuário, autorização, desativação e casos extremos. Projete um painel React mostrando saldos dos vaults, depósitos de usuários e controles de gerenciamento.",
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
