// Test per useAuthStore (Zustand con login async simulato)
import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../store/useAuthStore.js';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      isAuthenticated: false,
      user: null,
      error: null,
      isLoading: false,
    });
    localStorage.clear();
  });

  it('stato iniziale: non autenticato', () => {
    const { isAuthenticated, user, error } = useAuthStore.getState();
    expect(isAuthenticated).toBe(false);
    expect(user).toBeNull();
    expect(error).toBeNull();
  });

  it('login con credenziali valide → autenticato', async () => {
    const ok = await useAuthStore.getState().login('cosimo@gmail.com', 'secret123');
    expect(ok).toBe(true);
    const { isAuthenticated, user, error } = useAuthStore.getState();
    expect(isAuthenticated).toBe(true);
    expect(user.email).toBe('cosimo@gmail.com');
    expect(user.name).toBe('cosimo'); // ricavato dall'email
    expect(error).toBeNull();
  });

  it('login con email invalida → errore email', async () => {
    const ok = await useAuthStore.getState().login('nonvalida', 'password');
    expect(ok).toBe(false);
    const { error, isAuthenticated } = useAuthStore.getState();
    expect(error).toBe("Inserisci un'email valida");
    expect(isAuthenticated).toBe(false);
  });

  it('login con password corta → errore password', async () => {
    const ok = await useAuthStore.getState().login('test@test.com', 'ab');
    expect(ok).toBe(false);
    expect(useAuthStore.getState().error).toBe('La password deve avere almeno 4 caratteri');
  });

  it('logout pulisce lo stato', async () => {
    await useAuthStore.getState().login('a@b.com', 'pwd1234');
    useAuthStore.getState().logout();
    const { isAuthenticated, user, error } = useAuthStore.getState();
    expect(isAuthenticated).toBe(false);
    expect(user).toBeNull();
    expect(error).toBeNull();
  });

  it('clearError azzera solo l\'errore', async () => {
    await useAuthStore.getState().login('invalid', 'x'); // genera errore
    expect(useAuthStore.getState().error).not.toBeNull();
    useAuthStore.getState().clearError();
    expect(useAuthStore.getState().error).toBeNull();
    // isAuthenticated resta false (default)
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });
});
