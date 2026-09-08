# GreenPulse Italia

Dashboard interattiva per il monitoraggio della produzione energetica italiana. Mostra dati reali di produzione, capacità installata, emissioni CO₂ e domanda elettrica per ogni regione, con meteo live da Open-Meteo.

**Stack:** React 19 · Vite 8 · Tailwind CSS 4 · React Router v7 · Zustand · React Hook Form · Recharts

## Pagine

| Route | Descrizione |
|-------|-------------|
| `/` | Home page con hero e panoramica |
| `/login` | Login simulato (qualsiasi email valida + password ≥ 4 caratteri) |
| `/dashboard` | Dati live + grafici 24h + storico nazionale |
| `/regioni/:id` | Dettaglio regione: impianti, produzione, capacità, emissioni |
| `/about` | Stack tecnologico e fonti dati |

## Avvio

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm test
```

Credenziali demo: `test@test.it` / `1234`

## Fonti dati

- **TERNA/GSE** — CSV 2024 scaricati da terna.it, processati con `scripts/process-csv.js` in 11 JSON
- **Open-Meteo** — meteo live (irraggiamento, vento, temperatura) tramite API gratuita

I dati di capacità per singolo impianto sono stime basate su rapporti pubblici GSE/TERNA, non dati ATLASOLE puntuali. Lo script `scripts/build_region_plants.py` può processare il CSV ATLASOLE reale.

## Struttura

```
src/
├── pages/       # Route-level components
├── components/  # UI riutilizzabili (+ charts/)
├── hooks/       # useEnergyData, useTERNA
├── services/    # energyApi (Open-Meteo), ternaData (loader JSON)
├── store/       # Zustand stores (app, auth)
├── data/        # Dati statici + dataset JSON
└── test/        # Vitest
```

## Script utili

- `node scripts/process-csv.js` — rigenera JSON da CSV TERNA (CSV in `~/Scaricati/`)
- `python scripts/build_region_plants.py [csv_path]` — rigenera impianti da ATLASOLE

## Deploy

Vercel, build automatico su push a `main`. Output in `dist/`.

Per la documentazione architetturale dettagliata vedi [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Licenza

MIT
