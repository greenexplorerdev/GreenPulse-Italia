// Test per src/components/Navbar.jsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { useAppStore } from '../store/useAppStore.js';
import { useAuthStore } from '../store/useAuthStore.js';

function renderNavbar() {
  return render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
}

describe('Navbar', () => {
  beforeEach(() => {
    useAppStore.setState({ region: 'Lombardia', theme: 'light' });
    useAuthStore.setState({ isAuthenticated: false, user: null });
  });

  it('renderizza il logo GreenPulse', () => {
    renderNavbar();
    expect(screen.getByText(/GreenPulse/i)).toBeInTheDocument();
  });

  it('mostra Home, Dashboard, About (Regioni solo se autenticato)', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('mostra link Regioni quando autenticato', () => {
    useAuthStore.setState({ isAuthenticated: true, user: { email: 'a@b.com', name: 'a' } });
    renderNavbar();
    expect(screen.getByRole('link', { name: /regioni/i })).toBeInTheDocument();
  });

  it('NON mostra link Regioni quando non autenticato', () => {
    renderNavbar();
    expect(screen.queryByRole('link', { name: /regioni/i })).not.toBeInTheDocument();
  });

  it('mostra nome utente quando autenticato', () => {
    useAuthStore.setState({ isAuthenticated: true, user: { email: 'test@test.com', name: 'test' } });
    renderNavbar();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('toggleTheme cambia tema da light a dark', async () => {
    const user = userEvent.setup();
    renderNavbar();
    // Il bottone ha title="Tema scuro"
    const toggleBtn = screen.getByRole('button', { name: /tema/i });
    await user.click(toggleBtn);
    expect(useAppStore.getState().theme).toBe('dark');
  });

  it('logout riporta a non autenticato', async () => {
    const user = userEvent.setup();
    useAuthStore.setState({ isAuthenticated: true, user: { email: 'a@b.com', name: 'a' } });
    renderNavbar();
    // Il bottone logout ha title="Esci"
    const logoutBtn = screen.getByRole('button', { name: /esci/i });
    await user.click(logoutBtn);
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(screen.queryByRole('button', { name: /esci/i })).not.toBeInTheDocument();
  });

  it('mostra la regione selezionata quando autenticato', () => {
    useAuthStore.setState({ isAuthenticated: true, user: { email: 'a@b.com', name: 'a' } });
    renderNavbar();
    // Il bottone regione appare solo per utenti autenticati
    expect(screen.getByRole('button', { name: /lombardia/i })).toBeInTheDocument();
  });
});
