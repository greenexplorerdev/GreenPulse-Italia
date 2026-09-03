// Setup globale per i test Vitest
// Importa i matcher custom di jest-dom (es. toBeInTheDocument)
import '@testing-library/jest-dom';

// Mock di localStorage per Zustand persist
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  getItem(key) { return this.store[key] ?? null; }
  setItem(key, value) { this.store[key] = String(value); }
  removeItem(key) { delete this.store[key]; }
  clear() { this.store = {}; }
  get length() { return Object.keys(this.store).length; }
  key(i) { return Object.keys(this.store)[i] ?? null; }
}
globalThis.localStorage = new LocalStorageMock();

// matchMedia mock (usato da alcuni componenti)
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
