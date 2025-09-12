// frontend/global.d.ts

export {}; // garante que seja um módulo

declare global {
  interface Window {
    ethereum?: {
      request: (...args: any[]) => Promise<any>;
      // você pode adicionar aqui outros métodos que usar, como on, removeListener, etc.
    };
  }
}
