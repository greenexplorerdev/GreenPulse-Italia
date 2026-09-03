// scripts/process-csv.js — Elabora 11 CSV TERNA in JSON normalizzato
// Uso: node scripts/process-csv.js

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SCARICATI = '/home/explorer/Scaricati';
const TARGET    = path.join(__dirname, '../src/data/energy-datasets');

// Crea directory di output se non esiste
if (!fs.existsSync(TARGET)) {
  fs.mkdirSync(TARGET, { recursive: true });
}

/**
 * Converte numero in formato italiano (1.234,56) → float (1234.56)
 * Formato CSV: i separatori delle migliaia sono "." prima della virgola decimale
 */
function cleanNumber(s) {
  if (!s || s.trim() === '' || s.trim() === '0' || s.trim() === 'nd' || s.trim() === 'n.d.') {
    return 0.0;
  }
  let cleaned = s.trim();
  // Sostituisce TUTTI i punti (migliaia) → li rimuove,
  // poi la virgola decimale → punto
  cleaned = cleaned.replace(/\./g, '');
  cleaned = cleaned.replace(',', '.');
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0.0 : n;
}

/**
 * Estrae valore numerico YoY da stringhe come:
 * "⤴ 47.9%", "→ 0%", "⤵ -2.5%", "⤵ -12.7%"
 */
function parseYoY(s) {
  if (!s || s.trim() === '' || s.trim() === 'nd' || s.trim() === 'n.d.') return null;
  const trimmed = s.trim();
  const isPct = trimmed.includes('%');
  // Rimuove le frecce unicode e spazi
  const value = parseFloat(trimmed.replace(/[⤴⤵→\s%]/g, ''));
  if (isNaN(value)) return null;
  return { value, percentage: isPct };
}

// Configurazione dei dataset: nome file, colonne chiave, colonna valore, colonna YoY.
// L'header viene rilevato automaticamente cercando la riga che contiene
// almeno una colonna chiave (es. "Regione", "Anno", "Provincia") come campo CSV.
const CONFIGS = [
  {
    name: 'produzioneYoYRegionali',
    file: 'Produzione YoY% nelle regioni.csv',
    key: ['Regione'],
    value: null,
    yoy: 'YoY mappa fonte',
  },
  {
    name: 'produzioneRegionalePerFonte',
    file: 'Produzione regionale per fonte.csv',
    key: ['Regione', 'Fonte'],
    value: 'Sum of Produzione (GWh)',
    yoy: 'YoY fonte',
  },
  {
    name: 'produzioneProvincialePerFonte',
    file: 'Produzione provinciale per fonte.csv',
    key: ['Provincia', 'Fonte'],
    value: 'Sum of Produzione (GWh)',
    yoy: 'YoY fonte',
  },
  {
    name: 'produzionePerFonteAnnuale',
    file: 'Produzione per fonte [GWh].csv',
    key: ['Anno', 'Fonte'],
    value: 'Sum of Produzione (GWh)',
    yoy: null,
  },
  {
    name: 'produzioneLordaRegionalePerCombustibile',
    file: 'Produzione lorda regionale per combustibile [GWh].csv',
    key: ['Regione', 'Combustibile'],
    value: 'Sum of Produzione',
    yoy: null,
  },
  {
    name: 'potenzaEfficienteRegionaleFonteRinnovabile',
    file: 'Potenza efficiente regionale per fonte rinnovabile [MW].csv',
    key: ['Regione', 'Fonte'],
    value: 'Sum of Potenza Efficiente (MW)',
    yoy: 'YoY rinnovabile',
  },
  {
    name: 'potenzaEfficienteRegionalePerFonte',
    file: 'Potenza efficiente regionale per fonte [MW].csv',
    key: ['Regione', 'Tipo Impianto'],
    value: 'Potenza efficiente per fonte',
    yoy: null,
  },
  {
    name: 'potenzaEfficienteProvincialeFonteRinnovabile',
    file: 'Potenza efficiente provinciale per fonte rinnovabile [MW].csv',
    key: ['Provincia', 'Fonte'],
    value: 'Sum of Potenza Efficiente (MW)',
    yoy: 'YoY rinnovabile',
  },
  {
    name: 'potenzaEfficienteProvincialePerFonte',
    file: 'Potenza efficiente provinciale per fonte [MW].csv',
    key: ['Provincia', 'Tipo Impianto'],
    value: 'Potenza efficiente per fonte',
    yoy: null,
  },
  {
    name: 'emissioneRegionalePerCombustibile',
    file: 'Emissione regionale per combustibile [mln di tonnellate].csv',
    key: ['Regione', 'Combustibile'],
    value: 'Sum of Emissioni',
    yoy: null,
  },
  {
    name: 'domandaTotaleRegionale',
    file: 'Domanda totale regionale [GWh].csv',
    key: ['Regione', 'Tipologia'],
    value: 'Sum of Domanda (GWh)',
    yoy: 'YoY tipologia',
  },
];

/**
 * Parsifica una riga CSV rispettando le virgolette
 * Restituisce array di campi
 */
function parseCSVLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current.trim());
  return fields;
}

/**
 * Rileva automaticamente la riga header: cerca la prima riga che contiene
 * almeno una delle colonne chiave come campo CSV (es. "Regione", "Anno", "Provincia")
 */
function findHeaderRow(lines, keyColumns) {
  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    const line = lines[i];
    if (!line) continue;
    // Testa se la riga contiene almeno una colonna chiave come campo CSV
    const matches = keyColumns.filter(k =>
      new RegExp('(?:^|,)("?)' + k + '\\1(?:,|$)').test(line)
    );
    if (matches.length > 0) return i;
  }
  return -1;
}

/**
 * Legge un CSV e restituisce i record parsificati.
 * Ritorna { records, headerRow } così il chiamante sa dove è stato trovato l'header.
 */
function parseCSV(fp, config) {
  const raw = fs.readFileSync(fp, 'utf-8');
  const lines = raw.split('\n');

  // Rileva automaticamente la riga header
  const start = findHeaderRow(lines, config.key);
  if (start < 0) return { records: [], headerRow: -1 }; // Header non trovato

  // Parsa header
  const headers = parseCSVLine(lines[start]).map(h => h.trim());

  const records = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // salta righe vuote

    const vals = parseCSVLine(line);
    // Padding: se la riga ha meno campi, aggiungi stringhe vuote
    while (vals.length < headers.length) vals.push('');

    const row = {};
    for (let h = 0; h < headers.length; h++) {
      row[headers[h]] = h < vals.length ? vals[h] : '';
    }

    // Costruisce chiave composita dalle colonne chiave
    const keyParts = config.key.map(col => (row[col] || '').trim()).filter(k => k !== '');
    const key = keyParts.join('|');
    if (!key) continue;

    const record = { key };

    // Parsa valore numerico
    if (config.value && row[config.value] !== undefined && row[config.value] !== '') {
      record.value = cleanNumber(row[config.value]);
    }

    // Parsa YoY
    if (config.yoy && row[config.yoy]) {
      const parsed = parseYoY(row[config.yoy]);
      if (parsed) {
        record.yoYValue = parsed.value;
        record.yoYPercentage = parsed.percentage;
      }
    }

    records.push(record);
  }
  return { records, headerRow: start };
}

// ─── Main ──────────────────────────────────────────────────────────────────────
console.log('🚀 Elaborazione CSV avviata...\n');

for (const cfg of CONFIGS) {
  const fp = path.join(SCARICATI, cfg.file);
  if (!fs.existsSync(fp)) {
    console.log(`⚠️  File non trovato: ${cfg.file}`);
    continue;
  }

  const { records: rows, headerRow } = parseCSV(fp, cfg);

  // Indicizza per chiave composita
  const indexed = {};
  for (const r of rows) {
    if (!indexed[r.key]) indexed[r.key] = [];
    indexed[r.key].push(r);
  }

  // Array piatto di tutti i record
  const flat = rows;

  const output = {
    source: `CSV: ${cfg.file}`,
    generated: new Date().toISOString(),
    totalRecords: flat.length,
    // indexed: chiave → array di entries (per lookup veloce)
    indexed,
    // flat: array semplice (per iterazioni)
    flat,
  };

  const outPath = path.join(TARGET, `${cfg.name}.json`);
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`✅ ${cfg.name}: ${flat.length} record (header riga ${headerRow + 1}) → ${outPath}`);
}

console.log(`\n🏁 Fatto! JSON salvati in: ${TARGET}`);

// Verifica finale
const files = fs.readdirSync(TARGET);
console.log(`\n📁 ${files.length} file generati:`);
files.forEach(f => {
  const stats = fs.statSync(path.join(TARGET, f));
  const kb = (stats.size / 1024).toFixed(1);
  console.log(`   · ${f} (${kb} KB)`);
});
