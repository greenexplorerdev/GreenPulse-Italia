import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SCARICATI = '/home/explorer/Scaricati';
const TARGET    = path.join(__dirname, '../src/data/energy-datasets');

if (!fs.existsSync(TARGET)) {
  fs.mkdirSync(TARGET, { recursive: true });
}

function cleanNumber(s) {
  if (!s || s.trim() === '' || s.trim() === '0' || s.trim() === 'nd' || s.trim() === 'n.d.') {
    return 0.0;
  }
  let cleaned = s.trim();
  cleaned = cleaned.replace(/\./g, '');
  cleaned = cleaned.replace(',', '.');
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0.0 : n;
}

function parseYoY(s) {
  if (!s || s.trim() === '' || s.trim() === 'nd' || s.trim() === 'n.d.') return null;
  const trimmed = s.trim();
  const isPct = trimmed.includes('%');
  const value = parseFloat(trimmed.replace(/[⤴⤵→\s%]/g, ''));
  if (isNaN(value)) return null;
  return { value, percentage: isPct };
}

const CONFIGS = [
  { name: 'produzioneYoYRegionali', file: 'Produzione YoY% nelle regioni.csv', key: ['Regione'], value: null, yoy: 'YoY mappa fonte' },
  { name: 'produzioneRegionalePerFonte', file: 'Produzione regionale per fonte.csv', key: ['Regione', 'Fonte'], value: 'Sum of Produzione (GWh)', yoy: 'YoY fonte' },
  { name: 'produzioneProvincialePerFonte', file: 'Produzione provinciale per fonte.csv', key: ['Provincia', 'Fonte'], value: 'Sum of Produzione (GWh)', yoy: 'YoY fonte' },
  { name: 'produzionePerFonteAnnuale', file: 'Produzione per fonte [GWh].csv', key: ['Anno', 'Fonte'], value: 'Sum of Produzione (GWh)', yoy: null },
  { name: 'produzioneLordaRegionalePerCombustibile', file: 'Produzione lorda regionale per combustibile [GWh].csv', key: ['Regione', 'Combustibile'], value: 'Sum of Produzione', yoy: null },
  { name: 'potenzaEfficienteRegionaleFonteRinnovabile', file: 'Potenza efficiente regionale per fonte rinnovabile [MW].csv', key: ['Regione', 'Fonte'], value: 'Sum of Potenza Efficiente (MW)', yoy: 'YoY rinnovabile' },
  { name: 'potenzaEfficienteRegionalePerFonte', file: 'Potenza efficiente regionale per fonte [MW].csv', key: ['Regione', 'Tipo Impianto'], value: 'Potenza efficiente per fonte', yoy: null },
  { name: 'potenzaEfficienteProvincialeFonteRinnovabile', file: 'Potenza efficiente provinciale per fonte rinnovabile [MW].csv', key: ['Provincia', 'Fonte'], value: 'Sum of Potenza Efficiente (MW)', yoy: 'YoY rinnovabile' },
  { name: 'potenzaEfficienteProvincialePerFonte', file: 'Potenza efficiente provinciale per fonte [MW].csv', key: ['Provincia', 'Tipo Impianto'], value: 'Potenza efficiente per fonte', yoy: null },
  { name: 'emissioneRegionalePerCombustibile', file: 'Emissione regionale per combustibile [mln di tonnellate].csv', key: ['Regione', 'Combustibile'], value: 'Sum of Emissioni', yoy: null },
  { name: 'domandaTotaleRegionale', file: 'Domanda totale regionale [GWh].csv', key: ['Regione', 'Tipologia'], value: 'Sum of Domanda (GWh)', yoy: 'YoY tipologia' },
];

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

function findHeaderRow(lines, keyColumns) {
  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    const line = lines[i];
    if (!line) continue;
    const matches = keyColumns.filter(k =>
      new RegExp('(?:^|,)("?)' + k + '\\1(?:,|$)').test(line)
    );
    if (matches.length > 0) return i;
  }
  return -1;
}

function parseCSV(fp, config) {
  const raw = fs.readFileSync(fp, 'utf-8');
  const lines = raw.split('\n');

  const start = findHeaderRow(lines, config.key);
  if (start < 0) return { records: [], headerRow: -1 };

  const headers = parseCSVLine(lines[start]).map(h => h.trim());

  const records = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const vals = parseCSVLine(line);
    while (vals.length < headers.length) vals.push('');

    const row = {};
    for (let h = 0; h < headers.length; h++) {
      row[headers[h]] = h < vals.length ? vals[h] : '';
    }

    const keyParts = config.key.map(col => (row[col] || '').trim()).filter(k => k !== '');
    const key = keyParts.join('|');
    if (!key) continue;

    const record = { key };

    if (config.value && row[config.value] !== undefined && row[config.value] !== '') {
      record.value = cleanNumber(row[config.value]);
    }

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

console.log('Elaborazione CSV avviata...\n');

for (const cfg of CONFIGS) {
  const fp = path.join(SCARICATI, cfg.file);
  if (!fs.existsSync(fp)) {
    console.log(`File non trovato: ${cfg.file}`);
    continue;
  }

  const { records: rows, headerRow } = parseCSV(fp, cfg);

  const indexed = {};
  for (const r of rows) {
    if (!indexed[r.key]) indexed[r.key] = [];
    indexed[r.key].push(r);
  }

  const flat = rows;

  const output = {
    source: `CSV: ${cfg.file}`,
    generated: new Date().toISOString(),
    totalRecords: flat.length,
    indexed,
    flat,
  };

  const outPath = path.join(TARGET, `${cfg.name}.json`);
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`${cfg.name}: ${flat.length} record (header riga ${headerRow + 1}) -> ${outPath}`);
}

console.log(`\nFatto! JSON salvati in: ${TARGET}`);

const files = fs.readdirSync(TARGET);
console.log(`\n${files.length} file generati:`);
files.forEach(f => {
  const stats = fs.statSync(path.join(TARGET, f));
  const kb = (stats.size / 1024).toFixed(1);
  console.log(`   - ${f} (${kb} KB)`);
});
