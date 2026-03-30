import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Language = "en" | "pt" | "fr";

type Translations = Record<string, Record<Language, string>>;

const translations: Translations = {
  "nav.dashboard": { en: "Dashboard", pt: "Painel", fr: "Tableau de bord" },
  "nav.exercises": { en: "Exercises", pt: "Exercícios", fr: "Exercices" },
  "nav.projects": { en: "Web3 Projects", pt: "Projetos Web3", fr: "Projets Web3" },
  "nav.cheatsheet": { en: "Cheat Sheet", pt: "Referência Rápida", fr: "Aide-mémoire" },
  "dashboard.title": { en: "Learning Dashboard", pt: "Painel de Aprendizado", fr: "Tableau d'apprentissage" },
  "dashboard.overall": { en: "Overall Progress", pt: "Progresso Geral", fr: "Progression globale" },
  "dashboard.completed": { en: "Completed", pt: "Concluídos", fr: "Terminés" },
  "dashboard.remaining": { en: "Remaining", pt: "Restantes", fr: "Restants" },
  "dashboard.roadmap": { en: "Learning Roadmap", pt: "Roteiro de Aprendizado", fr: "Feuille de route" },
  "level.beginner": { en: "Beginner", pt: "Iniciante", fr: "Débutant" },
  "level.intermediate": { en: "Intermediate", pt: "Intermediário", fr: "Intermédiaire" },
  "level.advanced": { en: "Advanced", pt: "Avançado", fr: "Avancé" },
  "exercise.markComplete": { en: "Mark as Complete", pt: "Marcar como Concluído", fr: "Marquer comme terminé" },
  "exercise.completed": { en: "Completed!", pt: "Concluído!", fr: "Terminé!" },
  "exercise.concept": { en: "Concept", pt: "Conceito", fr: "Concept" },
  "exercise.explanation": { en: "Explanation", pt: "Explicação", fr: "Explication" },
  "exercise.example": { en: "Example", pt: "Exemplo", fr: "Exemple" },
  "exercise.foundry": { en: "Foundry Workflow", pt: "Fluxo Foundry", fr: "Flux Foundry" },
  "exercise.challenge": { en: "Challenge", pt: "Desafio", fr: "Défi" },
  "exercise.hints": { en: "Hints", pt: "Dicas", fr: "Indices" },
  "exercise.mistakes": { en: "Common Mistakes", pt: "Erros Comuns", fr: "Erreurs courantes" },
  "exercise.bestPractices": { en: "Best Practices", pt: "Boas Práticas", fr: "Bonnes pratiques" },
  "exercise.checklist": { en: "Completion Checklist", pt: "Lista de Verificação", fr: "Liste de vérification" },
  "exercise.learningPath": { en: "What to Study First", pt: "O que Estudar Primeiro", fr: "Quoi Étudier en Premier" },
  "exercise.shortSolution": { en: "Short Solution", pt: "Solução Curta", fr: "Solution courte" },
  "exercise.fullSolution": { en: "Full Solution", pt: "Solução Completa", fr: "Solution complète" },
  "filter.all": { en: "All", pt: "Todos", fr: "Tous" },
  "filter.completed": { en: "Completed", pt: "Concluídos", fr: "Terminés" },
  "filter.pending": { en: "Pending", pt: "Pendentes", fr: "En attente" },
  "filter.search": { en: "Search exercises...", pt: "Buscar exercícios...", fr: "Rechercher..." },
  "progress.reset": { en: "Reset Progress", pt: "Resetar Progresso", fr: "Réinitialiser" },
  "projects.title": { en: "Fullstack Web3 Projects", pt: "Projetos Fullstack Web3", fr: "Projets Fullstack Web3" },
  "projects.subtitle": { en: "Complete dApps combining Solidity contracts, Foundry tests, and React frontends", pt: "dApps completos combinando contratos Solidity, testes Foundry e frontends React", fr: "dApps complets combinant contrats Solidity, tests Foundry et frontends React" },
  "projects.smartContract": { en: "Smart Contract", pt: "Contrato Inteligente", fr: "Contrat intelligent" },
  "projects.frontend": { en: "Frontend", pt: "Frontend", fr: "Frontend" },
  "projects.quickStart": { en: "Quick Start", pt: "Início Rápido", fr: "Démarrage rapide" },
  "cheatsheet.title": { en: "Foundry Cheat Sheet", pt: "Referência Rápida Foundry", fr: "Aide-mémoire Foundry" },
  "cheatsheet.subtitle": { en: "Essential Foundry commands for your daily workflow", pt: "Comandos essenciais do Foundry para seu fluxo de trabalho diário", fr: "Commandes essentielles de Foundry pour votre flux de travail quotidien" },
  "cheatsheet.projectSetup": { en: "Project Setup", pt: "Configuração do Projeto", fr: "Configuration du projet" },
  "cheatsheet.buildingCompiling": { en: "Building & Compiling", pt: "Construindo e Compilando", fr: "Construction et compilation" },
  "cheatsheet.testing": { en: "Testing", pt: "Testes", fr: "Tests" },
  "cheatsheet.localBlockchain": { en: "Local Blockchain (Anvil)", pt: "Blockchain Local (Anvil)", fr: "Blockchain locale (Anvil)" },
  "cheatsheet.deployment": { en: "Deployment", pt: "Deploy", fr: "Déploiement" },
  "cheatsheet.interacting": { en: "Interacting with Contracts (Cast)", pt: "Interagindo com Contratos (Cast)", fr: "Interaction avec les contrats (Cast)" },
  "cheatsheet.debugging": { en: "Debugging", pt: "Depuração", fr: "Débogage" },
  "cheatsheet.dependencies": { en: "Dependencies", pt: "Dependências", fr: "Dépendances" },
  "dashboard.subtitle": { en: "Solidity + Foundry Training Academy", pt: "Academia de Treinamento Solidity + Foundry", fr: "Académie de formation Solidity + Foundry" },
  "dashboard.viewAll": { en: "View all →", pt: "Ver todos →", fr: "Voir tout →" },
  "exercise.backToExercises": { en: "Back to exercises", pt: "Voltar aos exercícios", fr: "Retour aux exercices" },
  "exercise.notFound": { en: "Exercise not found", pt: "Exercício não encontrado", fr: "Exercice introuvable" },
  "exercises.count": { en: "exercises", pt: "exercícios", fr: "exercices" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("solidity-academy-lang");
    return (saved as Language) || "en";
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("solidity-academy-lang", lang);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[key]?.[language] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
