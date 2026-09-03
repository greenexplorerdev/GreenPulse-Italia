// src/services/ternaData.js
// Data access layer for processed TERNA CSV datasets.
// Expected JSON structure in src/data/energy-datasets/*.json
// Run scripts/process-csv.py first to generate them.

const DATASETS = [
  'produzioneYoYRegionali',
  'produzioneRegionalePerFonte',
  'produzioneProvincialePerFonte',
  'produzionePerFonteAnnuale',
  'produzioneLordaRegionalePerCombustibile',
  'potenzaEfficienteRegionaleFonteRinnovabile',
  'potenzaEfficienteRegionalePerFonte',
  'potenzaEfficienteProvincialeFonteRinnovabile',
  'potenzaEfficienteProvincialePerFonte',
  'emissioneRegionalePerCombustibile',
  'domandaTotaleRegionale',
];

const cache = new Map();

async function loadDataset(name) {
  if (cache.has(name)) return cache.get(name);
  try {
    const response = await fetch(`/data/energy-datasets/${name}.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    cache.set(name, data);
    return data;
  } catch (e) {
    console.warn(`ternaData: failed to load ${name}`, e);
    return { indexed: {}, flat: [], totalRecords: 0 };
  }
}

// ─── Query helpers ──────────────────────────────────────────────────────────

/** All regions present in any dataset */
export async function getAllRegions() {
  const sets = ['produzioneRegionalePerFonte', 'produzioneYoYRegionali', 'domandaTotaleRegionale'];
  const regions = new Set();
  for (const name of sets) {
    const { indexed } = await loadDataset(name);
    for (const key of Object.keys(indexed)) {
      const region = key.split('|')[0];
      if (region) regions.add(region);
    }
  }
  return Array.from(regions).sort();
}

/** All provinces */
export async function getAllProvinces() {
  const { indexed } = await loadDataset('produzioneProvincialePerFonte');
  const provinces = new Set();
  for (const key of Object.keys(indexed)) {
    const prov = key.split('|')[0];
    if (prov) provinces.add(prov);
  }
  return Array.from(provinces).sort();
}

/** All energy sources (fonti) */
export async function getAllSources() {
  const sets = ['produzioneRegionalePerFonte', 'produzioneProvincialePerFonte',
                'potenzaEfficienteRegionaleFonteRinnovabile', 'potenzaEfficienteProvincialeFonteRinnovabile'];
  const sources = new Set();
  for (const name of sets) {
    const { indexed } = await loadDataset(name);
    for (const key of Object.keys(indexed)) {
      const parts = key.split('|');
      if (parts.length > 1) sources.add(parts[1]);
    }
  }
  return Array.from(sources).sort();
}

/** All combustibili (fuels) */
export async function getAllFuels() {
  const sets = ['produzioneLordaRegionalePerCombustibile', 'emissioneRegionalePerCombustibile'];
  const fuels = new Set();
  for (const name of sets) {
    const { indexed } = await loadDataset(name);
    for (const key of Object.keys(indexed)) {
      const parts = key.split('|');
      if (parts.length > 1) fuels.add(parts[1]);
    }
  }
  return Array.from(fuels).sort();
}

// ─── Specific queries ───────────────────────────────────────────────────────

/**
 * Production by region + source (GWh) for 2024 (latest year in data)
 * Returns array of { region, source, value, yoYValue, yoYPercentage }
 */
export async function getProduzioneByRegionSource() {
  const { indexed } = await loadDataset('produzioneRegionalePerFonte');
  const out = [];
  for (const [key, entries] of Object.entries(indexed)) {
    const [region, source] = key.split('|');
    for (const e of entries) {
      out.push({ region, source, value: e.value, yoYValue: e.yoYValue, yoYPercentage: e.yoYPercentage });
    }
  }
  return out;
}

/** Yearly production by source (national total) — timeseries */
export async function getProduzioneAnnualePerFonte() {
  const { indexed } = await loadDataset('produzionePerFonteAnnuale');
  const out = [];
  for (const [key, entries] of Object.entries(indexed)) {
    const [year, source] = key.split('|');
    for (const e of entries) out.push({ year: parseInt(year), source, value: e.value });
  }
  return out.sort((a,b) => a.year - b.year);
}

/** Regional YoY % (2024 vs 2023) */
export async function getProduzioneYoYRegionale() {
  const { indexed } = await loadDataset('produzioneYoYRegionali');
  const out = [];
  for (const [region, entries] of Object.entries(indexed)) {
    for (const e of entries) out.push({ region, yoYValue: e.yoYValue, yoYPercentage: e.yoYPercentage });
  }
  return out;
}

/** Capacity (MW) by region + renewable source */
export async function getPotenzaRinnovabileByRegion() {
  const { indexed } = await loadDataset('potenzaEfficienteRegionaleFonteRinnovabile');
  const out = [];
  for (const [key, entries] of Object.entries(indexed)) {
    const [region, source] = key.split('|');
    for (const e of entries) out.push({ region, source, value: e.value, yoYValue: e.yoYValue, yoYPercentage: e.yoYPercentage });
  }
  return out;
}

/** Capacity (MW) by province + renewable source */
export async function getPotenzaRinnovabileByProvince() {
  const { indexed } = await loadDataset('potenzaEfficienteProvincialeFonteRinnovabile');
  const out = [];
  for (const [key, entries] of Object.entries(indexed)) {
    const [province, source] = key.split('|');
    for (const e of entries) out.push({ province, source, value: e.value, yoYValue: e.yoYValue, yoYPercentage: e.yoYPercentage });
  }
  return out;
}

/** Total capacity (MW) by region + plant type (all types) */
export async function getPotenzaRegionaleAll() {
  const { indexed } = await loadDataset('potenzaEfficienteRegionalePerFonte');
  const out = [];
  for (const [key, entries] of Object.entries(indexed)) {
    const [region, type] = key.split('|');
    for (const e of entries) out.push({ region, type, value: e.value });
  }
  return out;
}

/** Total capacity (MW) by province + plant type */
export async function getPotenzaProvincialeAll() {
  const { indexed } = await loadDataset('potenzaEfficienteProvincialePerFonte');
  const out = [];
  for (const [key, entries] of Object.entries(indexed)) {
    const [province, type] = key.split('|');
    for (const e of entries) out.push({ province, type, value: e.value });
  }
  return out;
}

/** Emissions (mln tonnes) by region + fuel */
export async function getEmissioneByRegionFuel() {
  const { indexed } = await loadDataset('emissioneRegionalePerCombustibile');
  const out = [];
  for (const [key, entries] of Object.entries(indexed)) {
    const [region, fuel] = key.split('|');
    for (const e of entries) out.push({ region, fuel, value: e.value });
  }
  return out;
}

/** Demand (GWh) by region + typology (tradizionali/rinnovabili/import) */
export async function getDomandaByRegion() {
  const { indexed } = await loadDataset('domandaTotaleRegionale');
  const out = [];
  for (const [key, entries] of Object.entries(indexed)) {
    const [region, tipologia] = key.split('|');
    for (const e of entries) out.push({ region, tipologia, value: e.value, yoYValue: e.yoYValue, yoYPercentage: e.yoYPercentage });
  }
  return out;
}

/** Gross production by region + fuel (GWh) */
export async function getProduzioneLordaByRegionFuel() {
  const { indexed } = await loadDataset('produzioneLordaRegionalePerCombustibile');
  const out = [];
  for (const [key, entries] of Object.entries(indexed)) {
    const [region, fuel] = key.split('|');
    for (const e of entries) out.push({ region, fuel, value: e.value });
  }
  return out;
}

// ─── Aggregation helpers ────────────────────────────────────────────────────

/** Total production per region (sum of all sources) */
export async function getTotalProduzioneByRegion() {
  const data = await getProduzioneByRegionSource();
  const agg = {};
  for (const d of data) {
    agg[d.region] = (agg[d.region] || 0) + d.value;
  }
  return Object.entries(agg).map(([region, value]) => ({ region, value }));
}

/** Renewable share per region */
export async function getRenewableShareByRegion() {
  const [prod, cap] = await Promise.all([
    getProduzioneByRegionSource(),
    getPotenzaRinnovabileByRegion(),
  ]);

  const totals = {};
  const renew = {};

  for (const d of prod) {
    totals[d.region] = (totals[d.region] || 0) + d.value;
  }
  const renewableSources = new Set(['Idrico', 'Fotovoltaico', 'Eolico', 'Eolico Offshore', 'Geotermico', 'Bioenergie']);
  for (const d of prod) {
    if (renewableSources.has(d.source)) {
      renew[d.region] = (renew[d.region] || 0) + d.value;
    }
  }

  return Object.keys(totals).map(region => ({
    region,
    total: totals[region],
    renewable: renew[region] || 0,
    share: totals[region] ? ((renew[region] || 0) / totals[region]) * 100 : 0,
  }));
}

/** Emission intensity per region (tonnes CO2 / GWh) */
export async function getEmissionIntensityByRegion() {
  const [emissions, production] = await Promise.all([
    getEmissioneByRegionFuel(),
    getTotalProduzioneByRegion(),
  ]);
  const prodMap = Object.fromEntries(production.map(p => [p.region, p.value]));
  const emByRegion = {};
  for (const e of emissions) {
    emByRegion[e.region] = (emByRegion[e.region] || 0) + e.value;
  }
  return Object.entries(emByRegion).map(([region, tonnes]) => ({
    region,
    emissions: tonnes,
    production: prodMap[region] || 0,
    intensity: prodMap[region] ? (tonnes * 1e6) / prodMap[region] : 0, // tonnes -> kg
  }));
}

/** Capacità MW fossili stimati per regione.
 *  Non esiste un dataset TERNA per capacità fossile regionale.
 *  Stimiamo dai GWh di produzione lorda fossile / 5500h (capacity factor medio fossili).
 */
export async function getFossilCapacityByRegion() {
  const prod = await getProduzioneLordaByRegionFuel();
  const fossilFuels = new Set(['Gas naturale', 'Carbone', 'Prodotti petroliferi', 'Altro']);
  const byRegion = {};
  for (const d of prod) {
    if (fossilFuels.has(d.fuel)) {
      byRegion[d.region] = (byRegion[d.region] || 0) + d.value;
    }
  }
  // GWh → MW: divide per 5500h/anno (capacity factor medio ~60-65%)
  const CF = 5500;
  return Object.entries(byRegion).map(([region, gwh]) => ({
    region,
    value: Math.round(gwh / CF),
  }));
}

// ─── Batch preload (call once on app init) ─────────────────────────────────

export async function preloadAll() {
  await Promise.all(DATASETS.map(loadDataset));
}

export default {
  loadDataset,
  preloadAll,
  getAllRegions,
  getAllProvinces,
  getAllSources,
  getAllFuels,
  getProduzioneByRegionSource,
  getProduzioneAnnualePerFonte,
  getProduzioneYoYRegionale,
  getPotenzaRinnovabileByRegion,
  getPotenzaRinnovabileByProvince,
  getPotenzaRegionaleAll,
  getPotenzaProvincialeAll,
  getEmissioneByRegionFuel,
  getDomandaByRegion,
  getProduzioneLordaByRegionFuel,
  getTotalProduzioneByRegion,
  getRenewableShareByRegion,
  getEmissionIntensityByRegion,
  getFossilCapacityByRegion,
};