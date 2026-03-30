import React, { createContext, useContext, useState, useCallback } from "react";

interface ProgressState {
  completedExercises: string[];
  favorites: string[];
  currentLevel: string;
}

interface ProgressContextType {
  state: ProgressState;
  toggleComplete: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isCompleted: (id: string) => boolean;
  isFavorite: (id: string) => boolean;
  resetProgress: () => void;
  getCompletionCount: (level?: string) => number;
  getCompletionPercentage: (level?: string, total?: number) => number;
}

const STORAGE_KEY = "solidity-academy-progress";

function loadState(): ProgressState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return { completedExercises: [], favorites: [], currentLevel: "beginner" };
}

function saveState(state: ProgressState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(loadState);

  const update = useCallback((updater: (prev: ProgressState) => ProgressState) => {
    setState(prev => {
      const next = updater(prev);
      saveState(next);
      return next;
    });
  }, []);

  const toggleComplete = useCallback((id: string) => {
    update(prev => ({
      ...prev,
      completedExercises: prev.completedExercises.includes(id)
        ? prev.completedExercises.filter(e => e !== id)
        : [...prev.completedExercises, id],
    }));
  }, [update]);

  const toggleFavorite = useCallback((id: string) => {
    update(prev => ({
      ...prev,
      favorites: prev.favorites.includes(id)
        ? prev.favorites.filter(e => e !== id)
        : [...prev.favorites, id],
    }));
  }, [update]);

  const isCompleted = useCallback((id: string) => state.completedExercises.includes(id), [state.completedExercises]);
  const isFavorite = useCallback((id: string) => state.favorites.includes(id), [state.favorites]);

  const resetProgress = useCallback(() => {
    const fresh = { completedExercises: [], favorites: [], currentLevel: "beginner" };
    setState(fresh);
    saveState(fresh);
  }, []);

  const getCompletionCount = useCallback((level?: string) => {
    if (!level) return state.completedExercises.length;
    return state.completedExercises.filter(id => id.startsWith(level)).length;
  }, [state.completedExercises]);

  const getCompletionPercentage = useCallback((level?: string, total = 10) => {
    const count = getCompletionCount(level);
    const t = level ? total : 30;
    return Math.round((count / t) * 100);
  }, [getCompletionCount]);

  return (
    <ProgressContext.Provider value={{
      state, toggleComplete, toggleFavorite, isCompleted, isFavorite,
      resetProgress, getCompletionCount, getCompletionPercentage
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used within ProgressProvider");
  return context;
}
