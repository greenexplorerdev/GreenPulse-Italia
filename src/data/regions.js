// src/data/regions.js
//
// Coordinate dei capoluoghi di ogni regione italiana + helper di sintesi.
// Usate da RegionPage per le chiamate Open-Meteo (irraggiamento solare)
// e da Dashboard/RegionPage per calcolare totalMW, quota rinnovabile, CO₂ evitata.
// Fonte: coordinate geografiche standard dei comuni italiani.

// Mappa province → regioni (per filtrare dati provinciali TERNA)
export const PROVINCE_TO_REGION = {
  // Lombardia
  "Bergamo": "Lombardia", "Brescia": "Lombardia", "Como": "Lombardia",
  "Cremona": "Lombardia", "Lecco": "Lombardia", "Lodi": "Lombardia",
  "Mantova": "Lombardia", "Milano": "Lombardia", "Monza e della Brianza": "Lombardia",
  "Pavia": "Lombardia", "Sondrio": "Lombardia", "Varese": "Lombardia",
  // Piemonte
  "Alessandria": "Piemonte", "Asti": "Piemonte", "Biella": "Piemonte",
  "Cuneo": "Piemonte", "Novara": "Piemonte", "Torino": "Piemonte",
  "Verbano-Cusio-Ossola": "Piemonte", "Vercelli": "Piemonte",
  // Veneto
  "Belluno": "Veneto", "Padova": "Veneto", "Rovigo": "Veneto",
  "Treviso": "Veneto", "Venezia": "Veneto", "Verona": "Veneto", "Vicenza": "Veneto",
  // Emilia-Romagna
  "Bologna": "Emilia-romagna", "Ferrara": "Emilia-romagna", "Forlì-Cesena": "Emilia-romagna",
  "Modena": "Emilia-romagna", "Parma": "Emilia-romagna", "Piacenza": "Emilia-romagna",
  "Ravenna": "Emilia-romagna", "Reggio Emilia": "Emilia-romagna", "Rimini": "Emilia-romagna",
  // Toscana
  "Arezzo": "Toscana", "Firenze": "Toscana", "Grosseto": "Toscana",
  "Livorno": "Toscana", "Lucca": "Toscana", "Massa-Carrara": "Toscana",
  "Pisa": "Toscana", "Pistoia": "Toscana", "Prato": "Toscana", "Siena": "Toscana",
  // Lazio
  "Frosinone": "Lazio", "Latina": "Lazio", "Rieti": "Lazio", "Roma": "Lazio", "Viterbo": "Lazio",
  // Campania
  "Avellino": "Campania", "Benevento": "Campania", "Caserta": "Campania",
  "Napoli": "Campania", "Salerno": "Campania",
  // Puglia
  "Bari": "Puglia", "Barletta-Andria-Trani": "Puglia", "Brindisi": "Puglia",
  "Foggia": "Puglia", "Lecce": "Puglia", "Taranto": "Puglia",
  // Calabria
  "Catanzaro": "Calabria", "Cosenza": "Calabria", "Crotone": "Calabria",
  "Reggio Calabria": "Calabria", "Vibo Valentia": "Calabria",
  // Sicilia
  "Agrigento": "Sicilia", "Caltanissetta": "Sicilia", "Catania": "Sicilia",
  "Enna": "Sicilia", "Messina": "Sicilia", "Palermo": "Sicilia",
  "Ragusa": "Sicilia", "Siracusa": "Sicilia", "Trapani": "Sicilia",
  // Sardegna
  "Cagliari": "Sardegna", "Nuoro": "Sardegna", "Oristano": "Sardegna", "Sassari": "Sardegna",
  // Altre regioni
  "Ancona": "Marche", "Ascoli Piceno": "Marche", "Fermo": "Marche", "Macerata": "Marche", "Pesaro e Urbino": "Marche",
  "Campobasso": "Molise", "Isernia": "Molise",
  "Avellino": "Campania",
  "Chieti": "Abruzzo", "L'Aquila": "Abruzzo", "Pescara": "Abruzzo", "Teramo": "Abruzzo",
  "Matera": "Basilicata", "Potenza": "Basilicata",
  "Catanzaro": "Calabria",
  "Forlì": "Emilia-romagna", "Cesena": "Emilia-romagna",
  "Bolzano": "Trentino-Alto Adige", "Trento": "Trentino-Alto Adige",
  "Udine": "Friuli-Venezia Giulia", "Gorizia": "Friuli-Venezia Giulia", "Pordenone": "Friuli-Venezia Giulia", "Trieste": "Friuli-Venezia Giulia",
  "Arezzo": "Toscana",
  "Perugia": "Umbria", "Terni": "Umbria",
  "Frosinone": "Lazio",
  "Biella": "Piemonte",
  "Verbano": "Piemonte", "Cusio": "Piemonte", "Ossola": "Piemonte",
  "Reggio Emilia": "Emilia-romagna",
  "Monza": "Lombardia", "Brianza": "Lombardia",
  "Valle d'Aosta": "Valle d'Aosta", "Aosta": "Valle d'Aosta",
  "Imperia": "Liguria", "Savona": "Liguria", "Genova": "Liguria", "La Spezia": "Liguria",
};

export const REGIONS = {
  "Lombardia":         { capital:"Milano",       lat:45.4642, lng: 9.1900 },
  "Piemonte":          { capital:"Torino",        lat:45.0703, lng: 7.6869 },
  "Veneto":            { capital:"Venezia",      lat:45.4408, lng:12.3155 },
  "Emilia-Romagna":    { capital:"Bologna",      lat:44.4949, lng:11.3426 },
  "Toscana":           { capital:"Firenze",       lat:43.7696, lng:11.2558 },
  "Lazio":             { capital:"Roma",          lat:41.9028, lng:12.4964 },
  "Campania":          { capital:"Napoli",        lat:40.8518, lng:14.2681 },
  "Puglia":            { capital:"Bari",          lat:41.1171, lng:16.8719 },
  "Sicilia":           { capital:"Palermo",      lat:38.1157, lng:13.3613 },
  "Sardegna":          { capital:"Cagliari",     lat:39.2238, lng: 9.1217 },
  "Liguria":           { capital:"Genova",       lat:44.4056, lng: 8.9463 },
  "Calabria":          { capital:"Catanzaro",    lat:38.9098, lng:16.5877 },
  "Abruzzo":           { capital:"L'Aquila",     lat:42.3498, lng:13.3995 },
  "Molise":            { capital:"Campobasso",    lat:41.5603, lng:14.6627 },
  "Umbria":            { capital:"Perugia",       lat:43.1107, lng:12.3892 },
  "Basilicata":        { capital:"Potenza",      lat:40.6400, lng:15.8056 },
  "Marche":            { capital:"Ancona",        lat:43.6158, lng:13.5189 },
  "Friuli-Venezia Giulia": { capital:"Trieste",  lat:45.6495, lng:13.7768 },
  "Trentino-Alto Adige":   { capital:"Trento",  lat:46.0669, lng:11.1210 },
  "Valle d'Aosta":    { capital:"Aosta",        lat:45.7369, lng: 7.3202 },
};

/** Calcola totalMW, renewableMW, fossilMW, renewablePct, co2SavedTonnes per regione.
 *  Tutti i dati arrivano dai dataset reali TERNA (useTERNA → renewableMW / fossilMW).
 *  stima CO₂: capacità rinnovabile × 8760h × 0.22 CF × 0.4 kg/kWh (mix gas) */
export function getRegionStats({ renewableMW = 0, fossilMW = 0 } = {}) {
  const totalMW = renewableMW + fossilMW;
  const renewablePct = totalMW > 0 ? Math.round((renewableMW / totalMW) * 100) : 0;
  const co2SavedTonnes = Math.round(renewableMW * 8760 * 0.22 * 0.4);
  return { totalMW, renewableMW, fossilMW, renewablePct, co2SavedTonnes };
}
