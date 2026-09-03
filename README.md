# GreenPulse Italia - Versione 3

GreenPulse Italia è un'applicazione React per il monitoraggio e la visualizzazione dei dati energetici delle regioni italiane. Questa versione introduce significative migliorie architetturali e nuove funzionalità.

## Nuove Funzionalità nella Versione 3

### 🗺️ **RegionSelector Avanzato**
Il selettore di regione è stato completamente rinnovato per:
- Mostrare i dati energetici della regione selezionata (capacità rinnovabili, fossili, irraggiamento medio e capacità totale)
- Fornire link diretti alle pagine dettaglio delle regioni per:
  - Impianti rinnovabili (`/region/:regionId/renewable`)
  - Impianti fossili (`/region/:regionId/fossil`)
  - Mix energetico completo (`/region/:regionId/all`)

### 📊 **Pagine Dettaglio Regione**
Nuove pagine dedicate per esplorare in profondità il mix energetico di ogni regione italiana:
- Visualizzazione dettagliata degli impianti per tecnologia (solare, eolico, idroelettrico, geotermico, gas, carbone)
- Dati di irraggiamento solare specifici per ogni regione
- Widget solare regionale con dati simulati basati sull'irraggiamento medio
- Autenticazione richiesta per l'accesso (vedi sotto)

### 🔐 **Sistema di Autenticazione**
- Pagina di login a tema green con credenziali demo (`username: demo`, `password: demo`)
- Protezione delle rotte tramite `RequireAuth` wrapper
- Redirect automatico al login per l'accesso non autorizzato a pagine protette
- Logout disponibile nelle pagine dettaglio regione

### 💾 **State Management con Zustand**
- Sostituito il vecchio `DashboardContext` con uno store Zustand più efficiente
- Persistenza locale della selezione regione tramite middleware `persist`
- Stato di autenticazione gestito centralmente
- API pulita tramite hook personalizzati (`useStore`, `useAuth`)

### 📈 **Resoconto Capacità per Regione**
Aggiunto nella dashboard un nuovo section che mostra:
- Tabella comparativa delle capacità installate per tutte le regioni italiane
- Colonne: Rinnovabili (MW), Fossili (MW), Totale (MW)
- Dati dimostrativi per scopi illustrativi
- Design responsive con ottimizzazione per mobile e desktop

### 🎨 **Migliorie UI/UX**
- Integrazione di `lucide-react` per icone moderne e coerenti
- Pagina 404 completamente ridisegnata con tema green
- Modal di benvenuto aggiornato per guidare gli utenti attraverso le nuove funzionalità
- Miglioramenti generali di layout, spacing e tipografia
- Supporto completo per tema chiaro/scuro

## Funzionalità Preservate dalla Versione Originale

- 📊 Visualizzazione dati energetici in tempo reale tramite API Open-Meteo
- 🎴 Cards informative per solare, vento e quota verde
- 📈 Grafici interattivi (SolarBarChart, CO2LineChart, EnergyAreaChart)
- 📋 Lista dettagliata delle fonti energetiche con filtro per tipo
- 🌡️ Indicatore CO2 e widget solare giornaliero
- 🎨 Design responsivo con Tailwind CSS
- 🌓 Tema chiaro/scuro basato sulle preferenze di sistema
- 📱 Ottimizzazione per dispositivi mobili e desktop

## Scelte Architetturali della Versione 3

### Stato Globale con Zustand
Abbiamo scelto Zustand per la sua semplicità, performance e capacità di integrazione con middleware come `persist` per lo storage locale. Questo elimina il prop-drilling presente nella versione originale con Context API, mantenendo però la persistenza della selezione regione tra i refresh di pagina.

### Routing Protetta
Le rotte relative al dashboard e alle pagine dettaglio regione sono protette tramite un componente `RequireAuth` che reindirizza automaticamente gli utenti non autenticati alla pagina di login. Questo fornisce un'esperienza utente fluida mentre protegge le funzionalità che richiedono autenticazione.

### Separatizzazione delle Preoccupazioni
- **RegionSelector**: Componente ibrido che funge sia da display informativo che da hub di navigazione
- **RegionDetailPage**: Pagina dedicata all'esplorazione approfondita del mix energetico regionale
- **Dashboard**: Vista sintetica con focus sui dati in tempo reale e sul confronto inter-regionale
- **LoginPage**: Porta d'accesso tematica per le funzionalità protette

### Gestione degli Errori e dello Stato di Caricamento
Mantenuto e migliorato il sistema di gestione degli stati di loading e errori, applicato consistemente in tutte le nuove funzionalità.

## Struttura delle Rotte

### Rotte Pubbliche (Accessibili senza autenticazione)
- `/` - Home page con introduzione al progetto
- `/about` - Pagina informativa su GreenPulse Italia
- `/login` - Pagina di autenticazione

### Rotte Protette (Richiedono autenticazione)
- `/dashboard` - Vista principale con dati in tempo reale e confronto inter-regionale
- `/region/:regionId` - Vista overview della regione (redirect a `/region/:regionId/all`)
- `/region/:regionId/renewable` - Dettaglio impianti rinnovabili della regione
- `/region/:regionId/fossil` - Dettaglio impianti fossili della regione
- `/region/:regionId/all` - Mix energetico completo della regione
- `*` - Pagina 404 personalizzata per rotte inesistenti o accessi non autorizzati

## Tecnologie Utilizzate

- **React 18** con Vite per il build tooling
- **Zustand** per lo state management con persistenza locale
- **React Router v6** per la gestione delle rotte e protezione delle stesse
- **Tailwind CSS** per lo styling responsivo e tema-aware
- **lucide-react** per icone moderne e coerenti
- **Recharts** per la visualizzazione dei dati grafici
- **Open-Meteo API** per i dati energetici in tempo reale
- **Vite** come strumento di build e sviluppo

## Come Eseguire il Progetto

1. Clona il repository
2. Installa le dipendenze: `npm install`
3. Avvia lo sviluppo: `npm run dev`
4. Apri `http://localhost:5173` nel tuo browser

## Credenziali di Demo

Per accedere alle funzionalità protette:
- **Username:** demo
- **Password:** demo

## Autori

- **Progetto originale:** Corso React Full-Stack
- **Versione 3:** Restyling e implementazione nuove funzionalità
- **Data:** Agosto 2026

## Licenza

MIT