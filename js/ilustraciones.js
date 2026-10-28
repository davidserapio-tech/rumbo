/* ============================================================
   ILUSTRACIONES: dibujos SVG propios, estilo plano, con los colores de Rumbo
   ============================================================ */
/* ───────────── ilustraciones (SVG propios, estilo plano) ───────────── */
const SKN = ['#F1C7A0', '#D49A6A', '#8D5A3B', '#E8B48A'];
const rr = (x, y, w, h, r, f, e) => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + r + '" fill="' + f + '"' + (e || '') + '/>';
const ci = (x, y, r, f, e) => '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + f + '"' + (e || '') + '/>';
const ln = (a, b, c, d, col, w) => '<line x1="' + a + '" y1="' + b + '" x2="' + c + '" y2="' + d + '" stroke="' + col + '" stroke-width="' + (w || 3) + '" stroke-linecap="round"/>';
const pa = (d, f, e) => '<path d="' + d + '" fill="' + f + '"' + (e || '') + '/>';
function P(cx, by, o) {
  o = o || {};
  const s = o.s || 1, skin = o.skin || SKN[0], sh = o.sh || '#0E6E78', hr = o.hr || '#2B2B33';
  return '<g transform="translate(' + cx + ' ' + by + ') scale(' + s + ')">' + (o.back || '') +
    (o.long ? rr(-20, -82, 40, 44, 17, hr) : '') +
    rr(-26, -50, 52, 72, 22, sh) + (o.coat || '') + ci(0, -68, 17, skin) +
    pa('M-18 -68C-18 -90 18 -90 18 -68C10 -79 -8 -79 -18 -68Z', hr) + (o.extra || '') + '</g>';
}
const floor = () => '<line x1="0" y1="150" x2="240" y2="150" stroke="#111821" stroke-width="1.4"/>';
const desk = (x, w, y) => rr(x, y || 126, w, 26, 4, '#8A6A4F') + rr(x, y || 126, w, 5, 3, '#A88465');
const bubble = (x, y, w, h) => rr(x, y, w, h, 12, '#fff') + ci(x + w / 2 - 12, y + h / 2, 3, '#0E6E78') + ci(x + w / 2, y + h / 2, 3, '#0E6E78') + ci(x + w / 2 + 12, y + h / 2, 3, '#0E6E78');
const laptop = (x, y, w) => rr(x, y, w, w * .62, 4, '#2F3E4E') + rr(x + 5, y + 5, w - 10, w * .62 - 10, 2, '#BFE3E6') + rr(x + 10, y + 11, w * .4, 3, 1, '#0E6E78') + rr(x + 10, y + 19, w * .55, 3, 1, '#F5B83D') + rr(x + 10, y + 27, w * .3, 3, 1, '#0E6E78') + rr(x - 6, y + w * .62, w + 12, 4, 2, '#4B5A6A');
const plant = (x, y) => rr(x, y, 20, 24, 4, '#E8705F') + pa('M' + (x + 10) + ' ' + y + 'C' + (x - 8) + ' ' + (y - 6) + ' ' + (x - 4) + ' ' + (y - 26) + ' ' + (x + 10) + ' ' + (y - 4) + 'Z', '#5FA37A') + pa('M' + (x + 10) + ' ' + y + 'C' + (x + 28) + ' ' + (y - 8) + ' ' + (x + 26) + ' ' + (y - 30) + ' ' + (x + 10) + ' ' + (y - 6) + 'Z', '#7FB59B');

const ART = {
  tec: ['#D9ECEE', 'Persona con una laptop mostrando una app, con un joystick al lado',
    () => P(72, 128, { sh: '#E8705F', skin: SKN[1] }) + desk(30, 180) + laptop(100, 80, 66) + rr(176, 112, 30, 12, 6, '#E8705F') + ci(184, 118, 3, '#fff') + ci(198, 118, 3, '#fff')],
  dis: ['#F6E7D2', 'Persona pintando frente a un caballete, con una paleta de colores',
    () => ln(140, 108, 128, 152, '#8A6A4F', 4) + ln(186, 108, 198, 152, '#8A6A4F', 4) + rr(118, 30, 90, 78, 6, '#fff', ' stroke="#C9B79C" stroke-width="2"') + ci(150, 56, 10, '#F5B83D') + pa('M120 106V86Q146 64 166 86T206 80V106Z', '#0E6E78') + floor() + P(62, 152, { sh: '#9B8AC4', skin: SKN[0], long: true, hr: '#6B3F2A' }) + '<ellipse cx="96" cy="132" rx="18" ry="12" fill="#E9C48B"/>' + ci(90, 129, 3, '#E8705F') + ci(98, 126, 3, '#0E6E78') + ci(104, 134, 3, '#fff')],
  man: ['#EADFD0', 'Persona con casco armando una maqueta con herramientas',
    () => P(66, 150, { sh: '#2F4B6E', skin: SKN[2], extra: pa('M-19 -76a19 14 0 0 1 38 0z', '#F5B83D') + rr(-22, -78, 44, 5, 2, '#F5B83D') }) + desk(20, 200, 124) + rr(130, 92, 44, 32, 0, '#F2D9B0') + pa('M126 94L152 70L178 94Z', '#E8705F') + rr(146, 106, 12, 18, 2, '#8A6A4F') + rr(186, 114, 30, 5, 2, '#8A6A4F') + rr(204, 108, 10, 16, 2, '#6B7280')],
  sal: ['#DCEFE6', 'Profesional de la salud atendiendo a una persona',
    () => rr(180, 28, 10, 34, 3, '#0E6E78') + rr(168, 40, 34, 10, 3, '#0E6E78') + floor() + P(78, 150, { sh: '#FFFFFF', skin: SKN[3], coat: '<path d="M-12 -48q0 22 12 22q12 0 12-22" fill="none" stroke="#0E6E78" stroke-width="3"/>' + ci(0, -24, 4, '#0E6E78') }) + P(168, 150, { s: .9, sh: '#9B8AC4', skin: SKN[2], long: true, hr: '#2B2B33' })],
  neg: ['#E3E6F3', 'Persona presentando un gráfico de crecimiento de un emprendimiento',
    () => rr(108, 26, 112, 80, 6, '#fff', ' stroke="#C9CCE0" stroke-width="2"') + rr(124, 78, 18, 20, 2, '#9AA9D6') + rr(150, 62, 18, 36, 2, '#F5B83D') + rr(176, 44, 18, 54, 2, '#0E6E78') + ln(122, 66, 190, 36, '#E8705F', 3) + floor() + P(60, 150, { sh: '#2F4B6E', skin: SKN[3] }) + ln(82, 122, 124, 82, '#6B7280', 3) + ci(206, 132, 9, '#F5B83D') + ci(206, 132, 5, '#E7A21F')],
  cie: ['#DDEBD9', 'Microscopio, plantas y un frasco de laboratorio',
    () => desk(14, 212, 124) + plant(28, 100) + rr(96, 112, 54, 8, 3, '#2F3E4E') + rr(118, 78, 9, 36, 2, '#4B5A6A') + '<path d="M123 86Q158 86 150 112" stroke="#4B5A6A" stroke-width="8" fill="none" stroke-linecap="round"/>' + '<g transform="rotate(-22 112 70)">' + rr(104, 44, 15, 46, 4, '#2F3E4E') + rr(106, 86, 11, 8, 2, '#9AA9B0') + '</g>' + pa('M176 80h12v14l14 24h-40l14-24z', '#BFE3E6') + pa('M168 112h36l-6 6h-24z', '#F5B83D')],
  ens: ['#F3E3E3', 'Docente señalando el pizarrón ante un grupo de estudiantes',
    () => rr(20, 26, 124, 70, 5, '#2F5F5A') + ln(34, 46, 96, 46, '#fff', 3) + ln(34, 60, 118, 60, '#fff', 3) + ln(34, 74, 80, 74, '#fff', 3) + floor() + P(188, 150, { sh: '#E8705F', skin: SKN[1], long: true, hr: '#4A2C1A' }) + ln(166, 118, 128, 68, '#8A6A4F', 3) +
      [48, 84, 120].map((x, i) => rr(x - 13, 126, 26, 24, 9, ['#0E6E78', '#F5B83D', '#9B8AC4'][i]) + ci(x, 116, 11, SKN[[0, 2, 3][i]])).join('') + rr(30, 148, 110, 6, 2, '#8A6A4F')],
  ley: ['#E7E2D4', 'Balanza de la justicia sobre un libro',
    () => rr(94, 130, 52, 8, 3, '#8A6A4F') + rr(116, 50, 8, 82, 2, '#8A6A4F') + rr(58, 46, 124, 7, 3, '#B9893F') + ci(120, 44, 8, '#B9893F') + ln(66, 52, 48, 92, '#8A6A4F', 2) + ln(66, 52, 84, 92, '#8A6A4F', 2) + ln(174, 52, 156, 92, '#8A6A4F', 2) + ln(174, 52, 192, 92, '#8A6A4F', 2) + pa('M42 92h48a24 12 0 0 1-48 0z', '#F5B83D') + pa('M150 92h48a24 12 0 0 1-48 0z', '#F5B83D') + rr(60, 142, 36, 10, 2, '#0E6E78') + rr(60, 142, 36, 3, 1, '#fff', ' opacity=".5"')],
  com: ['#E9E0F2', 'Persona con micrófono grabando una nota, con un celular y un globo de diálogo',
    () => rr(24, 58, 42, 74, 8, '#2F3E4E') + rr(29, 65, 32, 60, 3, '#BFE3E6') + pa('M39 86l16 9-16 9z', '#0E6E78') + bubble(150, 26, 72, 40) + floor() + P(112, 152, { sh: '#9B8AC4', skin: SKN[2], long: true }) + ln(134, 128, 152, 100, SKN[2], 8) + rr(148, 82, 9, 20, 4, '#2F3E4E') + ci(152.5, 80, 8, '#6B7280')],
  dep: ['#DDEBF4', 'Persona en una cancha lanzando una pelota hacia el aro',
    () => rr(176, 28, 44, 32, 3, '#fff', ' stroke="#9AA9B0" stroke-width="2"') + rr(190, 40, 16, 12, 1, 'none', ' stroke="#E8705F" stroke-width="2"') + '<ellipse cx="198" cy="62" rx="14" ry="4" fill="none" stroke="#E8705F" stroke-width="3"/>' + rr(0, 150, 240, 30, 0, '#D9B98E') + P(86, 152, { sh: '#E8705F', skin: SKN[1], extra: '<line x1="22" y1="-44" x2="40" y2="-84" stroke="' + SKN[1] + '" stroke-width="9" stroke-linecap="round"/>' }) + ci(128, 70, 11, '#E8873A') + '<path d="M117 70h22M128 59v22" stroke="#7A3B10" stroke-width="1.5"/>'],
  ani: ['#F2E8D5', 'Un perro y un gato juntos',
    () => floor('#8A6A4F') + '<ellipse cx="82" cy="128" rx="36" ry="22" fill="#C98B5E"/>' + rr(54, 138, 10, 22, 4, '#B07548') + rr(96, 138, 10, 22, 4, '#B07548') + ci(116, 104, 17, '#C98B5E') + '<ellipse cx="102" cy="100" rx="7" ry="13" fill="#7A4B2A" transform="rotate(20 102 100)"/>' + '<ellipse cx="124" cy="112" rx="9" ry="7" fill="#E8C9A8"/>' + ci(126, 109, 3, '#2B2B33') + ci(114, 100, 2.5, '#2B2B33') + pa('M48 118Q36 100 46 92', 'none', ' stroke="#C98B5E" stroke-width="9" stroke-linecap="round"') +
      '<ellipse cx="176" cy="134" rx="26" ry="18" fill="#8A8F98"/>' + rr(160, 144, 9, 16, 4, '#767B84') + rr(184, 144, 9, 16, 4, '#767B84') + ci(192, 114, 15, '#8A8F98') + pa('M180 104l2-16 10 10z', '#8A8F98') + pa('M200 102l8-14 2 18z', '#8A8F98') + ci(187, 113, 2.5, '#2B2B33') + ci(198, 113, 2.5, '#2B2B33') + pa('M152 140Q132 130 142 112', 'none', ' stroke="#8A8F98" stroke-width="8" stroke-linecap="round"') + pa('M138 44c-12-14-30 2-16 16l16 14l16-14c14-14-4-30-16-16z', '#E8705F')],
  gas: ['#F6E3D8', 'Cocinero emplatando junto a una valija y un mapa',
    () => floor() + P(76, 152, { sh: '#FFFFFF', skin: SKN[2], extra: ci(-11, -92, 10, '#fff') + ci(0, -98, 11, '#fff') + ci(11, -92, 10, '#fff') + rr(-17, -88, 34, 8, 3, '#fff', ' stroke="#E0D6CC"') }) + '<ellipse cx="124" cy="134" rx="28" ry="7" fill="#fff" stroke="#E0D6CC"/>' + ci(118, 130, 6, '#E8705F') + ci(130, 130, 5, '#5FA37A') + rr(170, 100, 48, 44, 7, '#0E6E78') + '<path d="M184 100v-8a10 10 0 0 1 10 -4h4a10 10 0 0 1 10 4v8" fill="none" stroke="#0A545C" stroke-width="4"/>' + rr(170, 118, 48, 5, 0, '#F5B83D') + pa('M194 36c-12 0-18 10-18 18c0 12 18 28 18 28s18-16 18-28c0-8-6-18-18-18z', '#E8705F') + ci(194, 54, 6, '#fff')],
  place_ofi: ['#E3EAF0', 'Escritorio con computadora en una oficina',
    () => rr(18, 22, 74, 64, 4, '#CFE8F2', ' stroke="#fff" stroke-width="4"') + ln(55, 22, 55, 86, '#fff', 3) + ln(18, 54, 92, 54, '#fff', 3) + desk(30, 180) + rr(104, 66, 76, 52, 5, '#2F3E4E') + rr(109, 71, 66, 42, 2, '#BFE3E6') + rr(116, 80, 30, 4, 1, '#0E6E78') + rr(116, 90, 46, 4, 1, '#F5B83D') + rr(136, 118, 10, 8, 0, '#4B5A6A') + plant(190, 96)],
  place_casa: ['#F3E7D8', 'Sillón y laptop en un home-office en casa',
    () => rr(18, 24, 60, 50, 4, '#CFE8F2', ' stroke="#fff" stroke-width="4"') + ln(48, 24, 48, 74, '#fff', 3) + rr(54, 76, 124, 34, 16, '#E8705F') + P(110, 124, { s: .9, sh: '#0E6E78', skin: SKN[3] }) + rr(50, 100, 132, 42, 16, '#D4584A') + rr(116, 98, 38, 22, 3, '#2F3E4E') + rr(120, 102, 30, 14, 1, '#BFE3E6') + ln(202, 66, 202, 142, '#6B7280', 4) + pa('M188 66h28l-6-22h-16z', '#F5B83D') + floor()],
  place_afuera: ['#D6ECF4', 'Persona con mochila caminando al aire libre entre montañas',
    () => ci(190, 40, 16, '#F5B83D') + pa('M0 150L62 68L112 130L156 86L240 150Z', '#7FB59B') + pa('M80 150L140 100L200 150Z', '#5FA37A') + rr(0, 140, 240, 40, 0, '#9CCB9F') + pa('M96 180L116 140H136L176 180Z', '#E3C998') + P(122, 166, { s: .7, sh: '#E8705F', skin: SKN[1], back: rr(-42, -46, 24, 42, 9, '#F5B83D') })],
  place_lab: ['#E0EDEA', 'Laboratorio o taller con frascos y herramientas sobre una mesa',
    () => rr(168, 24, 48, 60, 4, '#fff', ' stroke="#C7D5D1" stroke-width="2"') + rr(176, 38, 32, 3, 1, '#9AA9B0') + rr(176, 48, 24, 3, 1, '#9AA9B0') + rr(176, 58, 30, 3, 1, '#9AA9B0') + desk(14, 212, 122) + pa('M52 74h12v18l14 26H38l14-26z', '#BFE3E6') + pa('M42 106h32l6 12H36z', '#0E6E78') + ci(108, 100, 18, '#BFE3E6') + pa('M90 104h36a18 18 0 0 1-36 0z', '#F5B83D') + rr(104, 72, 8, 12, 2, '#BFE3E6') + [0, 1, 2].map(i => rr(144 + i * 12, 94, 8, 28, 3, ['#E8705F', '#0E6E78', '#F5B83D'][i])).join('') + ln(190, 112, 212, 98, '#6B7280', 5)],
  indep_indep: ['#E4F0EE', 'Persona sola trabajando con su laptop y un café',
    () => rr(168, 24, 48, 56, 4, '#CFE8F2', ' stroke="#fff" stroke-width="4"') + P(86, 128, { sh: '#0E6E78', skin: SKN[3], long: true, hr: '#4A2C1A' }) + desk(24, 192) + laptop(66, 80, 66) + rr(166, 108, 16, 18, 3, '#fff') + pa('M182 112h6a5 5 0 0 1 0 10h-6', 'none', ' stroke="#fff" stroke-width="3"') + pa('M172 104q-3-6 0-10M178 104q-3-6 0-10', 'none', ' stroke="#9AA9B0" stroke-width="2"')],
  indep_org: ['#E9E6F1', 'Grupo de personas trabajando juntas en una mesa',
    () => P(56, 130, { s: .9, sh: '#E8705F', skin: SKN[1] }) + P(120, 130, { s: .9, sh: '#2F4B6E', skin: SKN[0], long: true, hr: '#B9893F' }) + P(184, 130, { s: .9, sh: '#9B8AC4', skin: SKN[2] }) + desk(22, 196, 126) + rr(60, 116, 28, 8, 1, '#fff') + rr(104, 114, 30, 10, 1, '#F5B83D') + rr(150, 116, 28, 8, 1, '#fff') + ci(204, 120, 5, '#0E6E78')],
  gente_gente: ['#F6E8DA', 'Dos personas conversando cara a cara en un mostrador',
    () => bubble(34, 22, 54, 34) + bubble(148, 30, 54, 34) + floor() + P(72, 150, { sh: '#E8705F', skin: SKN[2], long: true, hr: '#2B2B33' }) + P(172, 150, { sh: '#2F4B6E', skin: SKN[3] }) + rr(96, 124, 50, 26, 4, '#8A6A4F') + rr(96, 124, 50, 5, 3, '#A88465')],
  gente_detras: ['#DDE3EA', 'Persona concentrada con auriculares frente a su pantalla',
    () => rr(24, 26, 20, 20, 2, '#F5B83D') + rr(52, 34, 20, 20, 2, '#E8705F') + P(88, 128, { sh: '#2F4B6E', skin: SKN[1], extra: '<path d="M-21 -68a21 21 0 0 1 42 0" fill="none" stroke="#2F3E4E" stroke-width="5"/>' + rr(-26, -72, 9, 16, 4, '#2F3E4E') + rr(17, -72, 9, 16, 4, '#2F3E4E') }) + desk(30, 190) + rr(122, 66, 74, 54, 5, '#2F3E4E') + rr(127, 71, 64, 44, 2, '#BFE3E6') + rr(134, 80, 24, 4, 1, '#0E6E78') + rr(134, 90, 44, 4, 1, '#F5B83D') + rr(134, 100, 34, 4, 1, '#0E6E78') + rr(152, 120, 10, 6, 0, '#4B5A6A')]
};
const MAPC = { '#F1C7A0': '#FFFFFF', '#D49A6A': '#C8DAD8', '#8D5A3B': '#94CBD3', '#E8B48A': '#B7D7E5',
  '#8A6A4F': '#94CBD3', '#A88465': '#B7D7E5', '#B07548': '#94CBD3', '#B9893F': '#0E6E78', '#C98B5E': '#B7D7E5', '#7A4B2A': '#0E6E78', '#D9B98E': '#C8DAD8', '#E3C998': '#C8DAD8', '#F2D9B0': '#FFFFFF', '#E9C48B': '#C8DAD8', '#E8C9A8': '#FFFFFF',
  '#F5B83D': '#94CBD3', '#E7A21F': '#94CBD3', '#E8705F': '#0E6E78', '#D4584A': '#0A545C', '#E8873A': '#94CBD3', '#7A3B10': '#111821',
  '#2F4B6E': '#0E6E78', '#2F3E4E': '#3B404A', '#4B5A6A': '#3B404A', '#6B7280': '#3B404A', '#767B84': '#94CBD3', '#8A8F98': '#C8DAD8',
  '#9B8AC4': '#B7D7E5', '#9AA9D6': '#B7D7E5', '#9AA9B0': '#94CBD3', '#BFE3E6': '#B7D7E5', '#CFE8F2': '#B7D7E5',
  '#5FA37A': '#0E6E78', '#7FB59B': '#94CBD3', '#9CCB9F': '#C8DAD8', '#2F5F5A': '#0E6E78',
  '#2B2B33': '#111821', '#6B3F2A': '#111821', '#4A2C1A': '#111821', '#C9B79C': '#111821', '#C9CCE0': '#111821', '#C7D5D1': '#111821', '#E0D6CC': '#111821' };
function recolor(svg) { return svg.replace(/#[0-9A-Fa-f]{6}/g, h => MAPC[h.toUpperCase()] || h); }
function art(key, label, cls) {
  const a = ART[key];
  const lb = label || (a && a[1]) || '';
  return '<div class="art ' + (cls || '') + '" role="img" aria-label="Ilustración: ' + esc(lb) + '"><svg viewBox="0 0 240 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
    recolor(a ? a[2]() : '') + '</svg></div>';
}
function artDeco(key, cls) {
  return art(key, '', cls).replace(' role="img" aria-label="Ilustración: "', ' aria-hidden="true"');
}

