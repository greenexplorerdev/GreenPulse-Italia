// src/hooks/useTERNA.js
//
// Carica i dati reali TERNA/GSE per la regione selezionata e per l'Italia.
// Tutto proviene dai dataset JSON in src/data/energy-datasets/ (cachati).
//
// Ritorna:
//   production       → GWh per fonte (rinnovabili + termoelettrico)
//   capacity         → MW rinnovabili aggregati per fonte
//   plants           → MW dei singoli impianti (potenzaEfficienteRegionalePerFonte)
//   fuels            → produzione lorda per combustibile (GWh)
//   emissions        → emissioni per combustibile (mln ton CO₂)
//   demand           → domanda regionale per tipologia (GWh)
//   provincialPlants → impianti MW per provincia
//   renewableMW      → capacità rinnovabile totale (MW)
//   fossilMW         → capacità fossile da dataset reale impianti
//   national         → aggregato Italia: totalGWh, renewableGWh, renewablePct, bySource, byYear
//   regions          → tutte le regioni nei dataset
//   loading, error

import { useEffect, useState } from "react";
import * as terna from "../services/ternaData.js";
import { PROVINCE_TO_REGION } from "../data/regions.js";

const RENEWABLE_SOURCES = new Set([
  "Idrico", "Fotovoltaico", "Eolico", "Eolico Offshore", "Geotermico", "Bioenergie",
  "Accumulo stand alone",
]);

const SOURCE_META = {
  "Idrico":          { icon: "💧", short: "Idrico",        type: "renewable" },
  "Fotovoltaico":    { icon: "☀️", short: "Fotovoltaico",  type: "renewable" },
  "Eolico":          { icon: "💨", short: "Eolico",        type: "renewable" },
  "Eolico Offshore": { icon: "🌊", short: "Eolico off.",   type: "renewable" },
  "Geotermico":      { icon: "🌋", short: "Geotermico",   type: "renewable" },
  "Bioenergie":      { icon: "🌿", short: "Bioenergie",    type: "renewable" },
  "Accumulo stand alone": { icon: "🔋", short: "Accumulo", type: "renewable" },
  "Termoelettrico":  { icon: "🏭", short: "Termoelettrico", type: "fossil" },
};

export default function useTERNA(region) {
  const [state, setState] = useState({
    production: [], capacity: [], plants: [], fuels: [], emissions: [],
    demand: [], provincialPlants: [], renewableMW: 0, fossilMW: 0, regionYoY: null,
    national: { totalGWh: 0, renewableGWh: 0, renewablePct: 0, bySource: {}, byYear: [] },
    regions: [], loading: true, error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState(s => ({ ...s, loading: true, error: null }));

    (async () => {
      try {
        const [
          productionAll, capacityAll, plantsAll, fuelsAll,
          emissionsAll, demandAll, provincialAll, yearlyAll, regionalYoY, regions,
        ] = await Promise.all([
          terna.getProduzioneByRegionSource(),
          terna.getPotenzaRinnovabileByRegion(),
          terna.getPotenzaRegionaleAll(),
          terna.getProduzioneLordaByRegionFuel(),
          terna.getEmissioneByRegionFuel(),
          terna.getDomandaByRegion(),
          terna.getPotenzaProvincialeAll(),
          terna.getProduzioneAnnualePerFonte(),
          terna.getProduzioneYoYRegionale(),
          terna.getAllRegions(),
        ]);

        if (cancelled) return;

        const sortByValue = (a, b) => (b.value ?? 0) - (a.value ?? 0);

        const production = productionAll
          .filter(d => d.region === region)
          .map(d => ({ source: d.source, value: d.value ?? 0, type: SOURCE_META[d.source]?.type ?? "fossil", ...(SOURCE_META[d.source] ?? { icon: "⚡", short: d.source }) }))
          .sort(sortByValue);

        const capacity = capacityAll
          .filter(d => d.region === region)
          .map(d => ({ source: d.source, value: d.value ?? 0, type: "renewable", ...(SOURCE_META[d.source] ?? { icon: "⚡", short: d.source }) }))
          .sort(sortByValue);

        const plants = plantsAll
          .filter(d => d.region === region)
          .map(d => ({
            type: SOURCE_META[d.type]?.type ?? "fossil",
            subtype: d.type,
            capacity: d.value ?? 0,
          }))
          .sort((a, b) => b.capacity - a.capacity);

        const fuels = fuelsAll
          .filter(d => d.region === region)
          .map(d => ({ fuel: d.fuel, value: d.value ?? 0 }))
          .sort(sortByValue);

        const emissions = emissionsAll
          .filter(d => d.region === region)
          .map(d => ({ fuel: d.fuel, value: d.value ?? 0 }))
          .sort(sortByValue);

        const demand = demandAll
          .filter(d => d.region === region)
          .map(d => ({ tipologia: d.tipologia, value: d.value ?? 0, yoYValue: d.yoYValue }))
          .sort(sortByValue);

        const provincialPlants = provincialAll
          .filter(d => PROVINCE_TO_REGION[d.province] === region)
          .map(d => ({ province: d.province, type: SOURCE_META[d.type]?.type ?? "fossil", subtype: d.type, capacity: d.value ?? 0 }))
          .sort((a, b) => b.capacity - a.capacity);

        const renewableMW = capacity.reduce((s, c) => s + c.value, 0);
        const fossilMW    = plants.filter(p => p.type === "fossil").reduce((s, p) => s + p.capacity, 0);

        // Nazionale aggregato per fonte
        const bySource = {};
        let totalGWh = 0, renewableGWh = 0;
        for (const d of productionAll) {
          bySource[d.source] = (bySource[d.source] || 0) + (d.value ?? 0);
          totalGWh += d.value ?? 0;
          if (RENEWABLE_SOURCES.has(d.source)) renewableGWh += d.value ?? 0;
        }

        // Serie storica nazionale per anno (aggrega tutte le regioni per anno)
        const byYearMap = {};
        for (const d of yearlyAll) {
          if (!byYearMap[d.year]) byYearMap[d.year] = { year: d.year, renewable: 0, fossil: 0 };
          const isRenewable = RENEWABLE_SOURCES.has(d.source);
          if (isRenewable) byYearMap[d.year].renewable += d.value ?? 0;
          else byYearMap[d.year].fossil += d.value ?? 0;
        }
        const byYear = Object.values(byYearMap).sort((a, b) => a.year - b.year);

        // YoY della regione corrente
        const regionYoY = regionalYoY.find(d => d.region === region);

        const national = { totalGWh, renewableGWh, renewablePct: totalGWh > 0 ? (renewableGWh / totalGWh) * 100 : 0, bySource, byYear };

        setState({
          production, capacity, plants, fuels, emissions, demand, provincialPlants,
          renewableMW, fossilMW, regionYoY, national, regions, loading: false, error: null,
        });
      } catch (e) {
        if (!cancelled) setState(s => ({ ...s, loading: false, error: e.message ?? "Errore caricamento dati" }));
      }
    })();

    return () => { cancelled = true; };
  }, [region]);

  return state;
}
