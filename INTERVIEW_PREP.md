# GreenPulse Italia — Preparazione Colloquio

## Cos'è
Dashboard interattiva che mostra dati reali sulla produzione energetica italiana (GWh, MW installati, emissioni CO₂) per ogni regione, con dati meteo live e serie storiche dal 2007.

**Fonte dati:** TERNA/GSE — gestore rete elettrica nazionale (dataset reali 2024).

---

## Per l'HR

### Di cosa ti sei occupato?
Di un'applicazione React che mostra i dati reali della produzione energetica italiana regione per regione, collegata a fonti dati ufficiali (TERNA/GSE).

### Che stack hai usato?
- **Frontend:** React 19 + Vite (toolchain moderna, build velocissimo)
- **Styling:** Tailwind CSS v4 (via CDN, nessuna configurazione complessa)
- **State management:** Zustand (alternativa leggera a Redux, 1KB)
- **Routing:** React Router v7
- **Dati:** fetch da API REST pubbliche (Open-Meteo per meteo live) + JSON locali (dataset TERNA/GSE)

### Che problemi hai risolto?
- Eliminato dati finti e sostituiti con fonti reali (dataset TERNA)
- Rifattorizzato codice duplicato con componenti riutilizzabili
- Gestito stato asincrono con custom hooks e cancellation flag (evita memory leak)
- Reso il codice leggibile e manutenibile per un team

### Cosa hai imparato?
- Pattern custom hooks per isolare la logica di fetching
- Architettura componenti con proprietà chiare (props chiare, nessun prop drilling eccessivo)
- Come integrare dataset statici con dati da API esterne
- Gestione del dark mode con CSS custom properties

---

## Per il Tecnico

### Architettura

```
src/
├── pages/
│   ├── Dashboard.jsx        # Home: selettore regione, card live, grafici
│   ├── RegionPage.jsx      # Dettaglio regione: tabella impianti, mix, province
│   └── AboutPage.jsx
├── components/
│   ├── charts/              # SolarBarChart, CO2LineChart, EnergyAreaChart, HistoryChart
│   ├── icons.jsx           # SVG inline (nessuna dipendenza lucide-react)
│   ├── ProductionBars.jsx  # Barre GWh riutilizzabili
│   ├── LiveCard.jsx        # Card dati live
│   └── CO2Badge.jsx       # Badge CO2
├── hooks/
│   ├── useEnergyData.js    # Fetch Open-Meteo (meteo live)
│   └── useTERNA.js         # Fetch tutti i dataset TERNA (1 hook, fetch parallelo)
├── services/
│   └── ternaData.js        # Parser JSON → array, cache in memoria
└── data/
    ├── regions.js           # Coordinate capoluoghi + helper getRegionStats()
    └── energy-datasets/    # 11 JSON (caching lazy, nessun fetch ripetuto)
```

### Pattern chiave

**Custom Hook per i dati:**
```js
// useTERNA.js — un solo hook per TUTTI i dati TERNA
const { production, capacity, plants, fuels, emissions, demand, national } = useTERNA(region);
```
- Fetch parallelo con `Promise.all`
- Cancellation flag per evitare memory leak su unmount
- Dati processati prima dello stato (no trasformazioni nel render)

**Custom Hook per il meteo:**
```js
// useEnergyData.js — Open-Meteo con hourly (24 datapoint)
const { data, loading, error } = useEnergyData(lat, lng);
```

**Cache dei dataset:**
```js
// ternaData.js — cache in memoria, loading lazy
const cache = {};
async function loadDataset(name) {
  if (cache[name]) return cache[name];
  cache[name] = await import(`../data/energy-datasets/${name}.json`);
  return cache[name];
}
```

### Routing
```
/dashboard         → Dashboard (default)
/regioni/:regionId → Dettaglio regione (es. /regioni/Lombardia)
/about            → Info progetto
```

### Stato (Zustand)
```js
// useAppStore: theme, region, selectedCity, filter
const theme = useAppStore((s) => s.theme);  // selector isolato, no re-render globale
```

### Sfide tecniche risolte
1. **Dati finti → reali:** rimpiazzato mock con fetch da JSON locali (cache in memoria)
2. **Fetch paralleli:** `Promise.all` in useEffect con cancellation flag
3. **Coerenza tipi:** `SOURCE_META` map che garantisce che ogni fonte abbia sempre `{ icon, short, type }`
4. **Componenti duplicati:** estratti ProductionBars, LiveCard, CO2Badge, icons.jsx

### Cosa miglioreresti?
- Aggiungere React Query (TanStack Query) per cache lato server + invalidazione
- Pagination per la tabella province (può essere lunga)
- Test E2E con Playwright
- PWA offline (service worker + IndexedDB per i dataset)

---

## Frasi da usare

**HR:**
> "Ho costruito una dashboard React che mostra dati reali sulla produzione energetica italiana per ogni regione, collegata a dataset ufficiali TERNA e ad API meteo live. Mi sono occupato di tutto: architettura, refactoring del codice esistente, integrazione dati, gestione stati e UI."

**Tecnico:**
> "Ho usato un pattern custom hook per centralizzare la logica di fetching. L'app fa fetch paralleli di 9 dataset JSON con Promise.all, gestisce cancellation per evitare memory leak su unmount, e processa i dati prima dello stato così il render non fa calcoli. Ho estratto componenti riutilizzabili (ProductionBars, LiveCard) per eliminare codice duplicato tra Dashboard e RegionPage."

---

## Domande e Risposte

### HR / Soft Skills

**1. "Raccontami il progetto in breve."**
> È una dashboard che visualizza i dati reali della produzione energetica italiana, regione per regione. I dati vengono da TERNA, il gestore nazionale della rete elettrica. Mostra produzione, capacità installata, emissioni, serie storiche dal 2007 e meteo live. L'utente può navigare tra regioni e vedere il mix energetico, gli impianti attivi e l'impatto climatico.

**2. "Perché l'hai fatto?"**
> Per imparare React in modo pratico, costruendo qualcosa di concreto con dati reali. È anche un tema che mi interessa: la transizione energetica in Italia.

**3. "Qual è stata la parte più difficile?"**
> All'inizio il progetto aveva molti dati finti (mock). Trasformarlo per usare solo dati reali e rendere il codice pulito e riutilizzabile è stato il lavoro più lungo.

**4. "Hai lavorato in team?"**
> No, l'ho fatto da solo. Ma ho strutturato il codice come se dovesse essere mantenuto da altri: componenti piccoli, nomi chiari, logica separata in hook.

**5. "Come gestisci il tempo?"**
> Ho fatto iterazioni brevi: prima far funzionare tutto con dati mock, poi sostituire con dati reali, poi rifattorizzare. Ad ogni step verificavo che funzionasse prima di passare al successivo.

**6. "Qual è la tua più grande forza come developer?"**
> La capacità di prendere codice esistente e migliorarlo senza romperlo. Ho fatto refactoring importanti su questo progetto, eliminando duplicazioni e rendendolo più manutenibile.

**7. "Dove vorresti migliorare?"**
> Nei test automatici: ho iniziato con Vitest ma la copertura non è completa. È la prima cosa su cui lavorerei in un progetto nuovo.

---

### Tecnico — React & Frontend

**1. "Perché React?"**
> È lo standard di mercato, ha un ecosistema maturo, e il modello a componenti si presta bene a interfacce complesse come questa. L'ho imparato sul campo con questo progetto.

**2. "Cosa sono gli hook?"**
> Funzioni che permettono di usare stato e side effects nei componenti funzionali. I più usati sono `useState`, `useEffect`, `useMemo`, `useCallback`. Permettono di estrarre logica riutilizzabile senza classi.

**3. "Cos'è un custom hook?"**
> Una funzione che inizia con `use` e può usare altri hook al suo interno. Serve a estrarre logica complessa. Nel mio progetto ho `useTERNA` che fa fetch di 9 dataset e li processa, e `useEnergyData` per il meteo.

**4. "Cos'è useEffect e quando si usa?"**
> Esegue side effects dopo il render: fetch, subscription, manipolazione DOM. Ha un array di dipendenze che determina quando si ri-esegue. Nel mio progetto lo uso per fetchare i dati quando cambia la regione.

**5. "Cos'è la dependency array di useEffect?"**
> Una lista di valori che React confronta prima di ri-eseguire l'effect. Se uno cambia, l'effect si ri-esegue. Se è vuoto `[]`, si esegue una volta al mount. Io passo `[region]` così l'effect riparte quando cambio regione.

**6. "Come gestisci la pulizia in useEffect?"**
> Con la funzione di ritorno. Nel mio hook uso un cancellation flag:
> ```js
> useEffect(() => {
>   let cancelled = false;
>   // fetch...
>   if (cancelled) return;
>   setState(...);
>   return () => { cancelled = true; };
> }, [region]);
> ```
> Se il componente si smonta o cambia la regione prima che il fetch finisca, evito di settare lo stato su un componente morto.

**7. "Cos'è il virtual DOM?"**
> Una copia leggera del DOM reale. React calcola le differenze e applica solo le modifiche necessarie. Migliora le performance perché le manipolazioni del DOM sono costose.

**8. "Cos'è JSX?"**
> Un'estensione di sintassi che permette di scrivere HTML dentro JavaScript. Viene compilato in `React.createElement()`. Esempio:
> ```jsx
> const el = <div className="x">Ciao {nome}</div>;
> ```

**9. "Cos'è useState?"**
> Hook per gestire stato locale in un componente funzionale. Ritorna `[value, setter]`. Quando chiami il setter, il componente si ri-renderizza. Esempio: `const [count, setCount] = useState(0);`

**10. "Cos'è useMemo e useCallback?"**
> - `useMemo`: memorizza il risultato di un calcolo pesante, ricalcola solo se cambiano le dipendenze.
> - `useCallback`: memorizza una funzione, utile quando la passi a componenti figli ottimizzati.
> In questo progetto non li uso molto perché i dataset sono piccoli e il rendering non è un collo di bottiglia.

---

### Tecnico — State Management

**1. "Cos'è Zustand e perché non Redux?"**
> Zustand è un gestore di stato minimale (1KB) basato su hook. Ha la stessa idea di Redux (store globale, selettori) ma senza boilerplate: niente action types, reducer, provider. In questo progetto gestisco tema, regione selezionata, città e filtro.

**2. "Cos'è un selettore?"**
> Una funzione che estrae solo lo stato che ti serve dallo store. Esempio: `useAppStore(s => s.theme)`. Vantaggio: il componente si ri-renderizza SOLO quando cambia quel valore, non tutto lo store.

**3. "Cos'è il prop drilling?"**
> Passare props attraverso molti componenti intermedi che non le usano, solo per raggiungere un componente figlio. Soluzione: state globale (Zustand, Context API) o state co-locato.

---

### Tecnico — Architettura & Pattern

**1. "Come hai strutturato il progetto?"**
> Per responsabilità: `pages` (route), `components` (UI riutilizzabile), `hooks` (logica), `services` (accesso dati), `data` (file statici). Ogni file fa una cosa sola.

**2. "Cos'è il pattern Container/Presentational?"**
> Separare componenti che gestiscono logica e stato (container) da componenti che solo mostrano UI (presentational). Nel mio progetto: `Dashboard.jsx` è container, `ProductionBars.jsx` è presentational.

**3. "Perché fetch parallelo e non seriale?"**
> `Promise.all` esegue tutte le fetch in contemporanea invece di aspettare una dopo l'altra. 9 fetch seriali = 9× tempo medio, 9 fetch parallele = 1× tempo medio. Enorme differenza su connessioni lente.

**4. "Cos'è una cache in memoria?"**
> Salvare il risultato di operazioni costose in una variabile. La prossima volta che ti serve lo stesso dato, lo prendi dalla cache invece di rifare l'operazione. Nel mio progetto i dataset JSON vengono cachati dopo il primo caricamento.

**5. "Cos'è il lazy loading?"**
> Caricare qualcosa solo quando serve, non all'avvio. Esempio: importare un componente solo quando l'utente naviga su quella rotta. Riduce il bundle iniziale.

**6. "Cos'è HMR?"**
> Hot Module Replacement: Vite ricarica solo il file che hai modificato, senza perdere lo stato dell'app. Velocissimo per lo sviluppo.

---

### Tecnico — Performance & Best Practices

**1. "Cos'è il code splitting?"**
> Dividere il bundle in pezzi più piccoli caricati on-demand. In Vite/React si fa con `React.lazy` e `Suspense`:
> ```js
> const Dashboard = React.lazy(() => import('./pages/Dashboard'));
> ```

**2. "Cos'è un memory leak e come lo eviti?"**
> Un memory leak succede quando allochi memoria (es. una subscription) ma non la liberi. Lo eviti con la funzione di ritorno di `useEffect`. Nel mio `useTERNA` uso un flag `cancelled` per evitare `setState` su componenti smontati.

**3. "Cos'è la prop stability?"**
> Quando passi un oggetto o array come prop, viene ricreato ad ogni render. Il figlio vede una "nuova" prop anche se i valori sono uguali. Soluzione: `useMemo` o estrarre lo stato al livello giusto.

**4. "Cos'è il key prop nelle liste?"**
> Un identificatore univoco che React usa per capire quali elementi sono cambiati in una lista. Deve essere stabile, non l'indice della map (che cambia se riordini).

**5. "Cos'è la Strict Mode di React?"**
> Una modalità di sviluppo che esegue ogni componente due volte per aiutarti a trovare bug (es. side effects non idempotenti). In produzione non fa nulla.

---

### Tecnico — API & Dati

**1. "Cos'è una API REST?"**
> Uno stile architetturale per servizi web. Le risorse sono identificate da URL, operazioni via metodi HTTP (GET, POST, PUT, DELETE). Open-Meteo è REST: io chiamo un URL con parametri, mi ritorna JSON.

**2. "Cos'è un custom hook per il fetching?"**
> Un hook che incapsula la logica di fetch: stato loading, error, data. Vantaggi: riutilizzabile, separa UI da logica, gestisce cancellation in un posto solo.

**3. "Cos'è il double-fetch problem in React 18+?"**
> In Strict Mode, React monta il componente due volte. Se il tuo effect fa fetch, farai due fetch. Soluzione: cache (controlla se hai già i dati) o librerie come React Query/SWR.

**4. "Cos'è CORS?"**
> Cross-Origin Resource Sharing: meccanismo di sicurezza del browser. Un sito su dominio A non può fare fetch a dominio B senza permesso. Soluzione: il server manda header `Access-Control-Allow-Origin`.

**5. "Perché JSON e non CSV per le API moderne?"**
> JSON è nativo JavaScript (nessun parsing), strutturato (supporta oggetti annidati), type-safe. CSV è solo tabelle piatte.

---

### Tecnico — Testing & Qualità

**1. "Cos'è Vitest?"**
> Un test runner compatibile con Jest ma ottimizzato per Vite. Stessa API (describe, it, expect), ma molto più veloce perché condivide la config di Vite.

**2. "Cos'è un unit test?"**
> Un test che verifica una singola funzione o componente in isolamento. Esempio: testare che `getRegionStats` ritorna la percentuale giusta.

**3. "Cos'è un test E2E?"**
> Un test che simula un utente reale: clicca, scrive, naviga. Strumenti: Cypress, Playwright. Verifica che l'intera app funzioni, non solo i pezzi.

**4. "Cos'è la code coverage?"**
> La percentuale di righe di codice eseguite dai test. 100% non significa 0 bug, ma bassa coverage significa parti non testate. Vitest la calcola con `c8` o `istanbul`.

---

### Comportamentali

**1. "Descrivi un bug difficile che hai risolto."**
> All'inizio avevo `c.value.toLocaleString is not a function`. Tracciando ho scoperto che `c` era un oggetto senza `value`. Il bug era nel `useTERNA`: i dataset avevano campi mancanti e io non gestivo il caso `undefined`. Fix: `value: d.value ?? 0` + null safety ovunque.

**2. "Come gestisci una scadenza stretta?"**
> Prima le feature essenziali, poi quelle nice-to-have. Per questo progetto: prima la dashboard funzionante con dati qualsiasi, poi integrazione dati reali, poi ottimizzazioni.

**3. "Cosa fai se non conosci una tecnologia richiesta?"**
> La imparo. Ho fatto così con Zustand, React Router e Tailwind v4: ho letto la documentazione, fatto piccoli esperimenti, poi applicato. Sono trasparente sul livello di confidenza.

**4. "Perché dovremmo assumerti?"**
> Perché so costruire software funzionante end-to-end, non solo pezzi. Ho fatto frontend, gestione stato, architettura, refactoring. E ho la mentalità di chi vuole migliorare: questo progetto è iniziato con codice duplicato, l'ho trasformato in qualcosa di pulito.

