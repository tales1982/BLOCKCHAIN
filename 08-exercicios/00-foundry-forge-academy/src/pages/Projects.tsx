import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Blocks, Globe, Terminal } from "lucide-react";

type MultiLang = Record<Language, string>;

const projects: {
  title: string;
  level: string;
  description: MultiLang;
  contract: MultiLang;
  frontend: MultiLang;
  commands: string;
}[] = [
  {
    title: "Counter dApp",
    level: "beginner",
    description: {
      en: "A simple counter with increment/decrement deployed on Anvil with a React frontend.",
      pt: "Um contador simples com incremento/decremento implantado no Anvil com frontend React.",
      fr: "Un compteur simple avec incrément/décrément déployé sur Anvil avec un frontend React.",
    },
    contract: {
      en: "Counter.sol with increment(), decrement(), reset(), getCount(). Events for state changes.",
      pt: "Counter.sol com increment(), decrement(), reset(), getCount(). Eventos para mudanças de estado.",
      fr: "Counter.sol avec increment(), decrement(), reset(), getCount(). Événements pour les changements d'état.",
    },
    frontend: {
      en: "React app with buttons to increment/decrement, display count, and listen to events via ethers.js.",
      pt: "App React com botões de incrementar/decrementar, exibir contagem e ouvir eventos via ethers.js.",
      fr: "Application React avec boutons pour incrémenter/décrémenter, afficher le compteur et écouter les événements via ethers.js.",
    },
    commands: `forge init counter-dapp && cd counter-dapp
# Write contract in src/Counter.sol
forge build && forge test -vvv
anvil &
forge create src/Counter.sol:Counter --rpc-url http://localhost:8545 --private-key 0xac0974...
# Copy ABI from out/Counter.sol/Counter.json to frontend`,
  },
  {
    title: "Message Board dApp",
    level: "beginner",
    description: {
      en: "On-chain message board where users post and read messages with timestamps.",
      pt: "Quadro de mensagens on-chain onde usuários publicam e leem mensagens com timestamps.",
      fr: "Tableau de messages on-chain où les utilisateurs publient et lisent des messages avec horodatage.",
    },
    contract: {
      en: "MessageBoard.sol with postMessage(), getLatestMessages(). Struct for Message with sender, content, timestamp.",
      pt: "MessageBoard.sol com postMessage(), getLatestMessages(). Struct para Message com sender, content, timestamp.",
      fr: "MessageBoard.sol avec postMessage(), getLatestMessages(). Struct pour Message avec sender, content, timestamp.",
    },
    frontend: {
      en: "React feed component displaying messages, a compose form, and real-time updates via event listeners.",
      pt: "Componente React de feed exibindo mensagens, formulário de composição e atualizações em tempo real via event listeners.",
      fr: "Composant React de fil d'actualité affichant les messages, formulaire de composition et mises à jour en temps réel via les écouteurs d'événements.",
    },
    commands: `forge init message-board && cd message-board
forge build && forge test -vvv
anvil &
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast`,
  },
  {
    title: "Voting System",
    level: "intermediate",
    description: {
      en: "DAO-style voting with proposals, voter registration, time-based deadlines, and result tallying.",
      pt: "Votação estilo DAO com propostas, registro de eleitores, prazos baseados em tempo e apuração de resultados.",
      fr: "Vote style DAO avec propositions, inscription des électeurs, délais temporels et dépouillement des résultats.",
    },
    contract: {
      en: "VotingSystem.sol with createProposal(), vote(), getResult(). Enum for status, time-based deadlines.",
      pt: "VotingSystem.sol com createProposal(), vote(), getResult(). Enum para status, prazos baseados em tempo.",
      fr: "VotingSystem.sol avec createProposal(), vote(), getResult(). Enum pour le statut, délais temporels.",
    },
    frontend: {
      en: "Proposal cards with vote buttons, progress bars for votes, countdown timers, and result visualization.",
      pt: "Cards de proposta com botões de voto, barras de progresso, contadores regressivos e visualização de resultados.",
      fr: "Cartes de proposition avec boutons de vote, barres de progression, minuteries et visualisation des résultats.",
    },
    commands: `forge init voting-dapp && cd voting-dapp
forge build && forge test -vvv
# Test time-dependent logic with vm.warp()`,
  },
  {
    title: "Crowdfunding Platform",
    level: "advanced",
    description: {
      en: "Complete crowdfunding with campaigns, contributions, goal tracking, and conditional refunds.",
      pt: "Crowdfunding completo com campanhas, contribuições, acompanhamento de metas e reembolsos condicionais.",
      fr: "Financement participatif complet avec campagnes, contributions, suivi des objectifs et remboursements conditionnels.",
    },
    contract: {
      en: "Crowdfunding.sol with createCampaign(), contribute(), claimFunds(), claimRefund(). CEI pattern throughout.",
      pt: "Crowdfunding.sol com createCampaign(), contribute(), claimFunds(), claimRefund(). Padrão CEI em todo lugar.",
      fr: "Crowdfunding.sol avec createCampaign(), contribute(), claimFunds(), claimRefund(). Modèle CEI partout.",
    },
    frontend: {
      en: "Campaign cards with progress bars, contribute modal, refund button, and creator dashboard.",
      pt: "Cards de campanha com barras de progresso, modal de contribuição, botão de reembolso e dashboard do criador.",
      fr: "Cartes de campagne avec barres de progression, modal de contribution, bouton de remboursement et tableau de bord du créateur.",
    },
    commands: `forge init crowdfunding && cd crowdfunding
forge build && forge test -vvv --gas-report
# Test all scenarios: success, failure, refunds`,
  },
  {
    title: "Marketplace",
    level: "advanced",
    description: {
      en: "Item marketplace with listings, purchases, fee collection, and pull payment withdrawals.",
      pt: "Marketplace de itens com listagens, compras, coleta de taxas e saques por pull payment.",
      fr: "Marketplace d'articles avec listings, achats, collecte de frais et retraits par pull payment.",
    },
    contract: {
      en: "Marketplace.sol with list(), purchase(), withdraw(), cancelListing(). Pull payment pattern, basis point fees.",
      pt: "Marketplace.sol com list(), purchase(), withdraw(), cancelListing(). Padrão pull payment, taxas em basis points.",
      fr: "Marketplace.sol avec list(), purchase(), withdraw(), cancelListing(). Modèle pull payment, frais en basis points.",
    },
    frontend: {
      en: "Item grid, listing form, purchase flow with gas estimation, seller earnings dashboard.",
      pt: "Grade de itens, formulário de listagem, fluxo de compra com estimativa de gas, dashboard de ganhos do vendedor.",
      fr: "Grille d'articles, formulaire de listing, flux d'achat avec estimation de gas, tableau de bord des revenus du vendeur.",
    },
    commands: `forge init marketplace && cd marketplace
forge build && forge test --fuzz-runs 5000 --gas-report`,
  },
  {
    title: "Vault System",
    level: "advanced",
    description: {
      en: "Multi-vault system with role-based access, deposit tracking, and modular architecture.",
      pt: "Sistema multi-vault com controle de acesso baseado em papéis, rastreamento de depósitos e arquitetura modular.",
      fr: "Système multi-vault avec contrôle d'accès basé sur les rôles, suivi des dépôts et architecture modulaire.",
    },
    contract: {
      en: "VaultSystem.sol with createVault(), deposit(), withdraw(), authorizeUser(). Layered modifiers, custom errors.",
      pt: "VaultSystem.sol com createVault(), deposit(), withdraw(), authorizeUser(). Modificadores em camadas, erros customizados.",
      fr: "VaultSystem.sol avec createVault(), deposit(), withdraw(), authorizeUser(). Modificateurs en couches, erreurs personnalisées.",
    },
    frontend: {
      en: "Admin panel for vault management, user dashboard for deposits/withdrawals, authorization management.",
      pt: "Painel administrativo para gestão de vaults, dashboard do usuário para depósitos/saques, gerenciamento de autorização.",
      fr: "Panneau d'administration pour la gestion des vaults, tableau de bord utilisateur pour les dépôts/retraits, gestion des autorisations.",
    },
    commands: `forge init vault-system && cd vault-system
forge build && forge test -vvv --gas-report`,
  },
];

const levelColors: Record<string, string> = {
  beginner: "text-beginner border-beginner/30 bg-beginner/5",
  intermediate: "text-intermediate border-intermediate/30 bg-intermediate/5",
  advanced: "text-advanced border-advanced/30 bg-advanced/5",
};

export default function Projects() {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-slide-in">
      <h1 className="text-3xl font-display font-bold text-gradient-green mb-2">{t("projects.title")}</h1>
      <p className="text-muted-foreground mb-8">{t("projects.subtitle")}</p>

      <div className="space-y-6">
        {projects.map((project, i) => (
          <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${levelColors[project.level]}`}>
                  {t(`level.${project.level}`)}
                </span>
              </div>
              <h2 className="text-xl font-display font-bold mb-2">{project.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{project.description[language]}</p>

              <div className="grid gap-3 sm:grid-cols-2 mb-4">
                <div className="rounded-lg bg-secondary/50 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Blocks className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold">{t("projects.smartContract")}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{project.contract[language]}</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-4 h-4 text-accent" />
                    <span className="text-xs font-semibold">{t("projects.frontend")}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{project.frontend[language]}</p>
                </div>
              </div>

              <div className="rounded-lg bg-[hsl(var(--code-bg))] p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="w-4 h-4 text-terminal" />
                  <span className="text-xs font-mono text-muted-foreground">{t("projects.quickStart")}</span>
                </div>
                <pre className="text-xs font-mono text-foreground/80 overflow-x-auto whitespace-pre-wrap">{project.commands}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
