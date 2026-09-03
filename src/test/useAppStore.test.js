// Test per useAppStore (Zustand)
import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../store/useAppStore.js';

describe('useAppStore', () => {
  beforeEach(() => {
    // reset store ai valori di default prima di ogni test
    useAppStore.setState({
      region: 'Lombardia',
      selectedCity: null,
      filter: 'all',
      theme: 'light',
    });
    localStorage.clear();
  });

  it('ha i valori di default corretti', () => {
    const { region, filter, theme, selectedCity } = useAppStore.getState();
    expect(region).toBe('Lombardia');
    expect(filter).toBe('all');
    expect(theme).toBe('light');
    expect(selectedCity).toBeNull();
  });

  it('setRegion aggiorna la regione', () => {
    useAppStore.getState().setRegion('Toscana');
    expect(useAppStore.getState().region).toBe('Toscana');
  });

  it('setCity salva l\'oggetto city', () => {
    const city = { id: 'roma', name: 'Roma', lat: 41.9, lng: 12.5, region: 'Lazio' };
    useAppStore.getState().setCity(city);
    expect(useAppStore.getState().selectedCity).toEqual(city);
  });

  it('setFilter cambia filtro fonti', () => {
    useAppStore.getState().setFilter('renewable');
    expect(useAppStore.getState().filter).toBe('renewable');
    useAppStore.getState().setFilter('fossil');
    expect(useAppStore.getState().filter).toBe('fossil');
  });

  it('toggleTheme alterna light ↔ dark', () => {
    expect(useAppStore.getState().theme).toBe('light');
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe('dark');
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe('light');
  });

  it('reset mantiene il tema ma azzera gli altri campi', () => {
    useAppStore.getState().setRegion('Sicilia');
    useAppStore.getState().setCity({ id: 'pa', name: 'Palermo' });
    useAppStore.getState().setFilter('renewable');
    useAppStore.getState().toggleTheme(); // dark

    useAppStore.getState().reset();

    const s = useAppStore.getState();
    expect(s.region).toBe('Lombardia');
    expect(s.selectedCity).toBeNull();
    expect(s.filter).toBe('all');
    expect(s.theme).toBe('dark'); // tema preservato
  });
});
