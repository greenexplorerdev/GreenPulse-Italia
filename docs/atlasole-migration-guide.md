# Guida ATLASOLE → GreenPulse Italia

Sostituire i dati **rappresentativi** di `src/data/regionPlants.js` con i dati **puntuali TERNA** usando Python + pandas.

> Tempo stimato: 1–2 ore (la prima volta), 20 minuti le successive.

---

## 🎯 Obiettivo

Trasformare il dataset ATLASOLE (un CSV con ~300k impianti) in un array di oggetti con la stessa shape del file `regionPlants.js`:

```js
{
  id: "lo-sol",          // prefisso regione + sottotipo
  name: "Fotovoltaico",
  type: "renewable",     // "renewable" | "fossil"
  subtype: "solar",      // solar | wind | hydro | bio | geo | gas | coal | waste
  capacity: 3800,        // MW
  count: 142000,         // n° impianti
  co2: 0,                // g/kWh
}
```

---

## 📥 Step 1 — Download ATLASOLE

1. Vai su **https://www.terna.it/it/sistema-elettrico/statistiche**
2. Cerca la sezione **"ATLASOLE"** o **"Impianti di generazione"**
3. Scarica il CSV più recente (formato: `atlantide_impianti_<anno>.csv` o simile)
4. Salvalo in una cartella di lavoro, es: `~/downloads/atlasole/`

### ⚠️ Se il download richiede registrazione

TERNA pubblica anche dataset aggregati via **GSE** (`gse.it/dati-e-scenari/statistiche`) e via **ARERA**. In alternativa puoi usare le **open data di ISPRA** che sono già CSV puliti.

---

## 🔍 Step 2 — Esplorare la struttura del CSV

Prima di scrivere lo script, ispeziona le colonne:

```python
import pandas as pd

df = pd.read_csv("atlantide_impianti_2024.csv", encoding="latin-1", sep=";")
print(df.shape)             # es. (350000, 18)
print(df.columns.tolist())  # nomi colonne esatti
print(df.head(3))           # prime 3 righe
print(df.dtypes)            # tipi di dato
```

### Colonne tipiche (variano per anno)

| Colonna | Esempio | Note |
|---|---|---|
| `Regione` | "Lombardia" | Potrebbe essere `CODICE_REGIONE` o `REGIONE` |
| `Fonte` / `Tipologia` | "Fotovoltaico" | Nome della tecnologia |
| `Potenza attiva (kW)` | 1500.5 | Potenza installata |
| `Comune` | "Milano" | Granularità extra, non ci serve |
| `In servizio` / `Stato` | "Sì" / "No" | Filtra solo impianti attivi |

> **Se i nomi colonna sono diversi**: adatta lo script. Apri il CSV in VS Code o LibreOffice e segnati i nomi esatti.

---

## 🧹 Step 3 — Pulizia e filtro

```python
import pandas as pd

# Carica (encoding e sep variano in base all'anno)
df = pd.read_csv("atlantide_impianti_2024.csv", encoding="latin-1", sep=";")

# 1. Tieni solo impianti ATTIVI (colonna di stato variabile)
#    Se non c'è la colonna, salta questo step
if "Stato" in df.columns:
    df = df[df["Stato"].str.contains("In servizio|Attivo|Operativo", case=False, na=False)]

# 2. Tieni solo le colonne che ci servono
df = df[["Regione", "Fonte", "Potenza attiva (kW)"]].dropna()

# 3. Normalizza i nomi regione (TERNA a volte usa "LOMBARDIA" o "Lombardia")
df["Regione"] = df["Regione"].str.strip().str.title()

# 4. Mappa la fonte TERNA → sottotipo del progetto
FONTE_MAP = {
    "Fotovoltaico":        "solar",
    "Solare":              "solar",
    "Eolico":              "wind",
    "Idroelettrico":       "hydro",
    "Idro":                "hydro",
    "Geotermico":          "geo",
    "Geotermia":           "geo",
    "Biomasse":            "bio",
    "Biomassa":            "bio",
    "Biogas":              "bio",
    "Termico":             "gas",       # spesso confuso, vedi nota sotto
    "Gas":                 "gas",
    "Gas Naturale":        "gas",
    "Carbone":             "coal",
    "Rifiuti":             "waste",
    "Cogenerazione":       "gas",       # se vuoi, splitalo
}

df["subtype"] = df["Fonte"].map(FONTE_MAP)
df = df.dropna(subset=["subtype"])  # scarta fonti non mappate

# 5. Converti kW → MW e arrotonda
df["Potenza_MW"] = (df["Potenza attiva (kW)"] / 1000).round(1)
```

### ⚠️ Attenzione: impianti termoelettrici

TERNA spesso mette "Termico" come voce unica (include gas + carbone + olio). Per separarli serve la colonna `Combustibile` o `Tipo impianto`. Se non riesci a separarli, tienili come `gas` e segnalo nei commenti.

---

## 📊 Step 4 — Aggregazione

```python
# Raggruppa per (regione, sottotipo) → somma potenza + conteggio impianti
agg = (
    df.groupby(["Regione", "subtype"])
      .agg(
          capacity=("Potenza_MW", "sum"),
          count=("Potenza_MW", "count"),
      )
      .reset_index()
      .round({"capacity": 0})  # MW interi
)

# Converti capacity da float a int
agg["capacity"] = agg["capacity"].astype(int)
agg["count"] = agg["count"].astype(int)

# Aggiungi il "type" (renewable | fossil)
RENEWABLES = {"solar", "wind", "hydro", "bio", "geo"}
agg["type"] = agg["subtype"].apply(lambda s: "renewable" if s in RENEWABLES else "fossil")

# Aggiungi l'ID (prefisso regione + sottotipo)
REGION_PREFIX = {
    "Lombardia": "lo", "Piemonte": "pi", "Veneto": "ve",
    "Emilia-Romagna": "er", "Toscana": "to",
    "Trentino-Alto Adige": "ta", "Friuli-Venezia Giulia": "fv",
    "Marche": "ma", "Valle d'Aosta": "va",
    "Lazio": "la", "Campania": "ca", "Puglia": "pu",
    "Sicilia": "si", "Sardegna": "sa", "Liguria": "li",
    "Calabria": "cl", "Abruzzo": "ab", "Molise": "mo",
    "Umbria": "um", "Basilicata": "ba",
}

agg["id"] = agg.apply(lambda r: f"{REGION_PREFIX.get(r['Regione'], 'xx')}-{r['subtype']}", axis=1)

# Aggiungi i fattori CO₂ (da letteratura IPCC/ISPRA)
CO2 = {"solar": 0, "wind": 0, "hydro": 0, "bio": 0, "geo": 0,
       "gas": 400, "coal": 820, "waste": 300}
agg["co2"] = agg["subtype"].map(CO2)

# Nomi display (label UI)
NAME = {
    "solar": "Fotovoltaico", "wind": "Eolico", "hydro": "Idroelettrico",
    "bio": "Biomassa", "geo": "Geotermia", "gas": "Gas Naturale",
    "coal": "Carbone", "waste": "Rifiuti (WtE)",
}
agg["name"] = agg["subtype"].map(NAME)

# Riordina colonne come in regionPlants.js
agg = agg[["id", "name", "type", "subtype", "capacity", "count", "co2"]]

print(agg.head(10))
print(f"\nTotale record: {len(agg)}")
print(f"Totale MW: {agg['capacity'].sum():,.0f} MW")
```

### Output atteso

```
       id         name       type subtype  capacity   count  co2
0  lo-gas   Gas Naturale     fossil     gas     12500      35  400
1  lo-hyd  Idroelettrico  renewable   hydro      4500     420    0
2  lo-sol   Fotovoltaico  renewable   solar      3200  145000    0
...
```

---

## 📦 Step 5 — Esporta in JSON

```python
import json
from pathlib import Path

# Raggruppa per regione → array di impianti
result = {}
for regione, group in agg.assign(regione=df.groupby(["Regione", "subtype"]).ngroup().map(
        lambda i: agg.iloc[i]["id"].split("-")[0])).groupby("Regione"):
    result[regione] = {
        "plants": group.drop(columns="regione", errors="ignore").to_dict(orient="records")
    }

# Aggiungi descrizione e refCity (copia dal file esistente, sono fisse)
# ... (vedi sezione 6)

Path("regioni_real.json").write_text(
    json.dumps(result, indent=2, ensure_ascii=False)
)
print("✅ Salvato in regioni_real.json")
```

### Versione più pulita (un solo blocco)

```python
result = {}
for regione, group in agg.groupby(agg["id"].str.split("-").str[0].map({v: k for k, v in REGION_PREFIX.items()})):
    result[regione] = {
        "plants": group.to_dict(orient="records")
    }

# Aggiungi manualmente descrizione + refCity come in regionPlants.js
DESCR = {
    "Lombardia": "Prima regione industriale d'Italia...",
    # ... copia dal file esistente
}

REF_CITY = {
    "Lombardia": {"name": "Milano", "lat": 45.4654, "lng": 9.1859},
    # ... etc
}

for regione in result:
    result[regione]["description"] = DESCR.get(regione, "")
    result[regione]["refCity"] = REF_CITY.get(regione, {"name": regione, "lat": 0, "lng": 0})
```

---

## 🔄 Step 6 — Sostituisci regionPlants.js

Apri `regioni_real.json` e trasformalo nel modulo `regionPlants.js`:

```js
// src/data/regionPlants.js
// (header con la nota di trasparenza sui dati REALI)

export const REGION_PLANTS = {
  Lombardia: {
    description: "...",
    refCity: { name: "Milano", lat: 45.4654, lng: 9.1859 },
    plants: [
      { id:"lo-gas", name:"Gas Naturale", type:"fossil", subtype:"gas", capacity:12500, count:35, co2:400 },
      { id:"lo-hyd", name:"Idroelettrico", type:"renewable", subtype:"hydro", capacity:4500, count:420, co2:0 },
      // ...
    ],
  },
  // ...
};
```

> **Suggerimento**: usa uno script Node.js o un semplice copia-incolla strutturato. La shape è identica, cambia solo l'origine dei numeri.

---

## ✅ Step 7 — Validazione

Controlla che i totali siano sensati:

```python
# Verifica totale MW per regione vs totale nazionale
print(agg.groupby("id").first()["capacity"].sum())  # somma tutte le regioni

# Deve essere vicino a ~122 GW (Italia, fine 2023)
# Se ottieni 30 GW → stai guardando solo una parte del CSV
# Se ottieni 300 GW → probabilmente la colonna potenza è in W, non kW
```

### Sanity check

| Regione | FV plausibile | Idro plausibile | Gas plausibile |
|---|---|---|---|
| Lombardia | 130k–160k impianti | 400–500 impianti | 30–50 impianti |
| Piemonte | 40k–50k | 500–600 | 15–25 |
| Toscana | 55k–65k | 150–200 | 10–20 |

Se un numero è **100x più alto o basso**, hai un errore di unità (kW vs MW vs W) o di filtro.

---

## 🧪 Step 8 — Test in app

1. Sostituisci `regionPlants.js` con i nuovi dati
2. `npm run dev` e apri `/dashboard` + `/regioni/Lombardia`
3. Controlla che:
   - I grafici si caricano senza errori
   - I totali MW sono realistici (~75–80 GW sulle 9 regioni, ~120 GW su tutte e 20)
   - I filtri `renewable`/`fossil` funzionano
4. Aggiorna la sezione "Sorgenti dati" in `AboutPage.jsx`:
   - ❌ Vecchia: "stime rappresentative dell'ordine di grandezza"
   - ✅ Nuova: "dati puntuali TERNA ATLASOLE 2024"

---

## 📝 Step 9 — Aggiorna documentazione

1. **Header di `regionPlants.js`**: cambia "DATI RAPPRESENTATIVI" → "DATI REALI TERNA ATLASOLE 2024"
2. **AboutPage → Sorgenti dati**: rimuovi la disclaimer, cita la fonte ufficiale
3. **Memory file** `green-energy-project-progress-update.md`: aggiorna la sezione "What is NOT real" → ora lo è

---

## 🎤 Per l'intervista (nuovo framing)

### ❌ Prima
> "I dati di capacità sono stime rappresentative basate sui report GSE/Terna."

### ✅ Dopo
> "I dati di capacità vengono dal dataset ATLASOLE di TERNA — l'ho scaricato come CSV, pulito con pandas, e aggregato per regione e fonte. L'unica parte modellata sono i fattori di emissione CO₂, che sono valori standard IPCC."

---

## 🚨 Troubleshooting

| Problema | Causa | Soluzione |
|---|---|---|
| `UnicodeDecodeError` | Encoding CSV | Prova `encoding="utf-8"`, `"latin-1"`, `"cp1252"` |
| `KeyError: 'Regione'` | Nome colonna diverso | `print(df.columns.tolist())` e adatta |
| Totale MW = 300,000 | Unità in watt | Dividi per 1.000.000 invece di 1.000 |
| Tutti gli impianti = 0 | Filtro `Stato` sbagliato | Rimuovi il filtro e riprova |
| `NaN` nei sottotipi | Fonte non mappata | Aggiungi al `FONTE_MAP` |
| Lombardia ha 12 milioni di impianti | Conteggio sbagliato | Sei in `count` di righe, non di impianti distinti |

---

## 📚 Riferimenti

- TERNA — [Sistema elettrico / Statistiche](https://www.terna.it/it/sistema-elettrico/statistiche)
- GSE — [Dati e scenari](https://www.gse.it/dati-e-scenari/statistiche)
- ISPRA — [Banche dati ambientali](https://www.isprambiente.gov.it/it/banche-dati)
- pandas docs — [groupby](https://pandas.pydata.org/docs/user_guide/groupby.html)
