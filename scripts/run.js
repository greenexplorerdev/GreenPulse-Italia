import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SC = '/home/explorer/Scaricati';
const TG = path.join(__dirname, '../src/data/energy-datasets');
if(!fs.existsSync(TG))fs.mkdirSync(TG,{recursive:true});
function cn(s){if(!s||s.trim()===''||s.trim()==='0')return 0;return parseFloat(s.trim().replace(/\./g,'').replace(',','.'))||0;}
function py(s){if(!s||s.trim()==='')return null;const t=s.trim(),p=t.includes('%'),v=parseFloat(t.replace(/[⤴⤵→\s%]/g,''));return isNaN(v)?null:{v,p};}
const CF=[{n:'produzioneYoYRegionali',f:'Produzione YoY% nelle regioni.csv',k:['Regione'],v:null,y:'YoY mappa fonte',s:3},{n:'produzioneRegionalePerFonte',f:'Produzione regionale per fonte.csv',k:['Regione','Fonte'],v:'Sum of Produzione (GWh)',y:'YoY fonte',s:3},{n:'produzioneProvincialePerFonte',f:'Produzione provinciale per fonte.csv',k:['Provincia','Fonte'],v:'Sum of Produzione (GWh)',y:'YoY fonte',s:3},{n:'produzionePerFonteAnnuale',f:'Produzione per fonte [GWh].csv',k:['Anno','Fonte'],v:'Sum of Produzione (GWh)',y:null,s:1},{n:'produzioneLordaRegionalePerCombustibile',f:'Produzione lorda regionale per combustibile [GWh].csv',k:['Regione','Combustibile'],v:'Sum of Produzione',y:null,s:3},{n:'potenzaEfficienteRegionaleFonteRinnovabile',f:'Potenza efficiente regionale per fonte rinnovabile [MW].csv',k:['Regione','Fonte'],v:'Sum of Potenza Efficiente (MW)',y:'YoY rinnovabile',s:3},{n:'potenzaEfficienteRegionalePerFonte',f:'Potenza efficiente regionale per fonte [MW].csv',k:['Regione','Tipo Impianto'],v:'Potenza efficiente per fonte',y:null,s:3},{n:'potenzaEfficienteProvincialeFonteRinnovabile',f:'Potenza efficiente provinciale per fonte rinnovabile [MW].csv',k:['Provincia','Fonte'],v:'Sum of Potenza Efficiente (MW)',y:'YoY rinnovabile',s:3},{n:'potenzaEfficienteProvincialePerFonte',f:'Potenza efficiente provinciale per fonte [MW].csv',k:['Provincia','Tipo Impianto'],v:'Potenza efficiente per fonte',y:null,s:3},{n:'emissioneRegionalePerCombustibile',f:'Emissione regionale per combustibile [mln di tonnellate].csv',k:['Regione','Combustibile'],v:'Sum of Emissioni',y:null,s:3},{n:'domandaTotaleRegionale',f:'Domanda totale regionale [GWh].csv',k:['Regione','Tipologia'],v:'Sum of Domanda (GWh)',y:'YoY tipologia',s:3}];
// Rileva automaticamente la riga header: cerca la prima riga che contiene
// almeno una delle colonne chiave come campo (es. "Regione", "Anno", "Provincia")
function findHeaderRow(lines, keyColumns) {
  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    const line = lines[i];
    if (!line) continue;
    // Se la riga contiene almeno una colonna chiave come campo CSV, è l'header
    const matches = keyColumns.filter(k =>
      new RegExp('(?:^|,)("?)' + k + '\\1(?:,|$)').test(line)
    );
    if (matches.length > 0) return i;
  }
  return -1;
}

for(const c of CF){
  const fp = path.join(SC, c.f);
  if (!fs.existsSync(fp)) { console.log('SKIP: ' + c.f); continue; }
  const L = fs.readFileSync(fp, 'utf-8').split('\n');
  // Rileva automaticamente la riga header
  const st = findHeaderRow(L, c.k);
  if (st < 0) { console.log('NO HEADER for ' + c.f); continue; }
  const H = L[st].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const rows=[];
  for(let i=st+1;i<L.length;i++){
    const line=L[i].trim();
    if(!line) continue;
    const vals=[];let cur='',q=false;
    for(let j=0;j<line.length;j++){
      const c2=line[j];
      if(c2==='"')q=!q;
      else if(c2===','&&!q){vals.push(cur.trim());cur='';}
      else cur+=c2;
    }
    vals.push(cur.trim());
    while(vals.length<H.length)vals.push('');
    const row={};
    for(let h=0;h<H.length;h++) row[H[h]]=vals[h]||'';
    const kp=c.k.map(col=>(row[col]||'').trim()).filter(k=>k);
    const key=kp.join('|');
    if(!key) continue;
    const r={key};
    if(c.v&&row[c.v]) r.value=cn(row[c.v]);
    if(c.y&&row[c.y]){
      const p=py(row[c.y]);
      if(p){r.yoYValue=p.v;r.yoYPercentage=p.p;}
    }
    rows.push(r);
  }
  const idx={};
  for(const r of rows){if(!idx[r.key])idx[r.key]=[];idx[r.key].push(r);}
  const o={source:'CSV: '+c.f,generated:new Date().toISOString(),totalRecords:rows.length,indexed:idx,flat:rows};
  fs.writeFileSync(path.join(TG,c.n+'.json'),JSON.stringify(o,null,2),'utf-8');
  console.log('OK '+c.n+': '+rows.length+' records (header at line '+(st+1)+')');
}
console.log('ALL DONE');
