/* ============================================================
   PUNTAJE: cómo se calcula la afinidad entre tus respuestas y cada carrera
   ============================================================ */
/* ───────────── puntaje ───────────── */
const HOBBIES = [['Jugar videojuegos', 'tec'], ['Programar', 'tec'], ['Dibujar o pintar', 'dis'], ['Sacar fotos o editar videos', 'dis'], ['Armar o reparar cosas', 'man'], ['Cuidar a otras personas', 'sal'], ['Leer sobre ciencia', 'cie'], ['Salir a la naturaleza', 'cie'], ['Cuidar mascotas', 'ani'], ['Vender o emprender', 'neg'], ['Debatir sobre derechos', 'ley'], ['Escribir o hacer podcasts', 'com'], ['Hacer contenido para redes', 'com'], ['Ayudar a otros a estudiar', 'ens'], ['Practicar deportes', 'dep'], ['Cocinar', 'gas'], ['Viajar', 'gas'], ['Jugar juegos de mesa', null], ['Escuchar música', null], ['Leer novelas', null]];
const HOBDIM = {}; HOBBIES.forEach(h => { HOBDIM[h[0]] = h[1]; });
function effI(a) { const o = Object.assign({}, a.i || {}); (a.hobbies || []).forEach(h => { const d = HOBDIM[h]; if (d && (o[d] || 0) < 1) o[d] = 1; }); return o; }
const DUR_ADJ = {
  corta: { corta: 0.06, media: -0.04, larga: -0.10 },
  media: { corta: -0.02, media: 0.04, larga: -0.04 },
  larga: { corta: -0.06, media: 0, larga: 0.05 },
  igual: { corta: 0, media: 0, larga: 0 }
};
const MOD_ADJ = {
  virtual: { 0: -0.08, 1: 0, 2: 0.05 },
  hibrida: { 0: -0.04, 1: 0.02, 2: 0.03 },
  presencial: { 0: 0, 1: 0, 2: 0 },
  igual: { 0: 0, 1: 0, 2: 0 }
};
const UV = { indep: 1, org: -1, gente: 1, detras: -1 };
const match = (u, cv) => (cv === 0 ? 0.7 : (u === cv ? 1 : 0.3));

function score(a, c) {
  const ui = effI(a), us = a.s || {};
  let n = 0, d = 0;
  for (const k in c.i) { n += c.i[k] * (ui[k] || 0); d += c.i[k] * 2; }
  const iS = d ? n / d : 0;
  n = 0; d = 0;
  for (const k in c.s) { n += c.s[k] * (us[k] || 0); d += c.s[k] * 2; }
  const sS = d ? n / d : 0;
  const pl = !a.place ? 0.6 : (c.p.length === 0 ? 0.6 : (c.p.includes(a.place) ? 1 : 0.25));
  const inS = a.indep ? match(UV[a.indep], c.ind) : 0.7;
  const geS = a.gente ? match(UV[a.gente], c.ge) : 0.7;
  const eS = (pl + inS + geS) / 3;
  const prio = a.prio || [];
  const w = prio.includes('pasion') ? [0.65, 0.20, 0.15] : [0.55, 0.25, 0.20];
  let s = w[0] * iS + w[1] * sS + w[2] * eS;
  s += (DUR_ADJ[a.dur || 'igual'] || DUR_ADJ.igual)[c.d];
  s += (MOD_ADJ[a.mod || 'igual'] || MOD_ADJ.igual)[c.vi];
  if (a.trab === 'trab') s += 0.04 * (c.vi - 1);
  if (prio.includes('salida')) s += 0.04 * (c.sa - 2);
  if (prio.includes('ingreso')) s += 0.04 * (c.ig - 2);
  if (prio.includes('estable')) s += 0.04 * (c.es - 2);
  return Math.max(0, Math.min(1, s));
}
const CAL = 1.12;
const pctOf = s => Math.max(1, Math.min(99, Math.round(100 * s / CAL)));

function rank(a) {
  const all = CAREERS.map(c => ({ c, s: score(a, c) })).sort((x, y) => y.s - x.s || x.c.n.localeCompare(y.c.n));
  const top = [], rest = [], fam = {};
  all.forEach(r => {
    if (top.length < 3 && (fam[r.c.f] || 0) < 2) { top.push(r); fam[r.c.f] = (fam[r.c.f] || 0) + 1; }
    else rest.push(r);
  });
  top.forEach(r => { r.pct = pctOf(r.s); });
  rest.forEach(r => { r.pct = pctOf(r.s); });
  return { top, others: rest.slice(0, 3), all };
}

function reasons(a, c) {
  const out = [];
  const ui = a.i || {}, us = a.s || {};
  const di = Object.keys(c.i).sort((x, y) => c.i[y] - c.i[x]);
  const hit = di.filter(k => c.i[k] >= 2 && ui[k] === 2).slice(0, 2);
  hit.forEach(k => out.push('Te interesa ' + INT[k].r + '.'));
  if (!hit.length) {
    const soft = di.filter(k => ui[k] >= 1)[0];
    if (soft) out.push('Marcaste que quizás te interesa ' + INT[soft].r + '.');
  }
  const ds = Object.keys(c.s).filter(k => us[k] === 2).slice(0, 1);
  ds.forEach(k => out.push('Se te da bien ' + SK[k].r + '.'));
  if (a.place && c.p.includes(a.place)) out.push('Encaja con dónde te imaginás trabajando (' + PLACE[a.place] + ').');
  else if (a.gente && c.ge !== 0 && UV[a.gente] === c.ge) out.push(c.ge === 1 ? 'Es un trabajo con trato directo con personas, como preferís.' : 'Es un trabajo de concentración, detrás de escena, como preferís.');
  const prio = a.prio || [];
  if (prio.includes('salida') && c.sa === 3) out.push('Tiene salida laboral rápida (estimada).');
  if (prio.includes('ingreso') && c.ig === 3) out.push('Tiene buenos ingresos (estimado).');
  if (prio.includes('estable') && c.es === 3) out.push('Tiene estabilidad laboral (estimada).');
  return out.slice(0, 4);
}

