/* ============================================================
   DATOS DEL TEST: intereses, habilidades, preguntas y carreras
   (los valores del catálogo son de ejemplo, no son datos reales)
   ============================================================ */

// Escapa texto para poder meterlo dentro de HTML sin romper nada
const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

/* ───────────── datos ───────────── */
const INT = {
  tec: { s: 'Tecnología', r: 'la tecnología' },
  dis: { s: 'Diseño y audiovisual', r: 'el diseño y lo audiovisual' },
  man: { s: 'Construir y crear', r: 'construir y crear con las manos' },
  sal: { s: 'Salud y bienestar', r: 'la salud y el bienestar' },
  neg: { s: 'Negocios', r: 'los negocios y el emprendimiento' },
  cie: { s: 'Ciencia y naturaleza', r: 'la ciencia y la naturaleza' },
  ens: { s: 'Enseñar y ayudar', r: 'enseñar y ayudar a otras personas' },
  ley: { s: 'Leyes y justicia', r: 'las leyes y la justicia' },
  com: { s: 'Comunicación', r: 'comunicar' },
  dep: { s: 'Deporte', r: 'el deporte y el movimiento' },
  ani: { s: 'Animales', r: 'cuidar animales' },
  gas: { s: 'Gastronomía y turismo', r: 'la gastronomía y el turismo' }
};
const SK = {
  num: { s: 'Números y lógica', r: 'razonar con números y lógica' },
  art: { s: 'Dibujo y creatividad', r: 'dibujar y crear' },
  exp: { s: 'Expresión y comunicación', r: 'expresarte y comunicar ideas' },
  org: { s: 'Organización', r: 'organizar proyectos y grupos' },
  esc: { s: 'Escuchar y ayudar', r: 'escuchar y ayudar a otras personas' },
  det: { s: 'Ser detallista', r: 'ser detallista y analizar datos' }
};
const PLACE = { ofi: 'oficina', casa: 'casa', afuera: 'afuera o viajando', lab: 'laboratorio, taller o consultorio' };

const Q = [];
function add(q) { Q.push(q); }
const PICKS = [
  ['¿Cuáles de estos temas te interesan más?', [['tec', 'Tecnología, juegos y apps'], ['dis', 'Diseño, arte y audiovisual'], ['man', 'Construir y crear con las manos']]],
  ['¿Y cuáles de estos?', [['sal', 'Salud y bienestar de las personas'], ['cie', 'Ciencia, naturaleza y ambiente'], ['ani', 'Cuidado de animales']]],
  ['¿Y de estos?', [['neg', 'Negocios, finanzas y emprendimiento'], ['ley', 'Leyes, justicia y derechos'], ['com', 'Escribir, hablar en público y redes']]],
  ['Último grupo de temas: ¿cuáles te interesan más?', [['ens', 'Enseñar, acompañar y ayudar'], ['dep', 'Deporte y entrenamiento físico'], ['gas', 'Cocina, viajes y turismo']]]
];
PICKS.forEach((g, i) => add({ n: i + 1, cat: 'Intereses', type: 'pick', kind: 'i', max: 2, text: g[0], hint: 'Tocá el tema que más te interesa.', opts: g[1].map(o => ({ v: o[0], l: o[1], img: o[0] })) }));
const SKILLQ = [
  ['¿Qué se te da bien?', [['num', 'Razonar con números, lógica o estadísticas'], ['art', 'Dibujar, diseñar o crear cosas artísticas']]],
  ['¿Y qué más se te da bien?', [['exp', 'Expresarte, escribir o comunicar ideas frente a otros'], ['org', 'Organizar proyectos y coordinar grupos']]],
  ['¿Y en esto?', [['esc', 'Escuchar, contener y ayudar a otras personas'], ['det', 'Ser detallista: analizar datos, buscar patrones y corregir errores']]]
];
SKILLQ.forEach((g, i) => add({ n: 5 + i, cat: 'Habilidades', type: 'pick', kind: 's', max: 2, text: g[0], hint: 'Tocá la opción que mejor te describe.', opts: g[1].map(o => ({ v: o[0], l: o[1] })) }));

add({ n: 8, cat: 'Entorno de trabajo', type: 'imgs', key: 'place', text: '¿Dónde te imaginás trabajando?', opts: [
  { v: 'ofi', l: 'En una oficina', img: 'Escritorio con computadora' },
  { v: 'casa', l: 'En mi casa', img: 'Home-office en una casa' },
  { v: 'afuera', l: 'Afuera o viajando', img: 'Persona trabajando al aire libre o en movimiento' },
  { v: 'lab', l: 'En un laboratorio, taller o consultorio', img: 'Espacio técnico: laboratorio, taller o consultorio' } ] });
add({ n: 9, cat: 'Entorno de trabajo', type: 'imgs', key: 'indep', text: '¿Cómo preferís trabajar?', opts: [
  { v: 'indep', l: 'Por mi cuenta, de forma independiente (freelance)', img: 'Persona sola con su laptop, trabajando por su cuenta' },
  { v: 'org', l: 'En una organización o empresa', img: 'Grupo de personas en un espacio de trabajo' } ] });
add({ n: 10, cat: 'Entorno de trabajo', type: 'imgs', key: 'gente', text: '¿Cómo te imaginás tu día de trabajo?', opts: [
  { v: 'gente', l: 'En equipo y atendiendo personas', img: 'Atención directa: trabajo cara a cara con personas' },
  { v: 'detras', l: 'Concentrado detrás de escena', img: 'Persona concentrada en su tarea, detrás de escena' } ] });
add({ n: 11, cat: 'Cursada', type: 'chips', key: 'dur', text: '¿Cuánto tiempo querés estudiar?', opts: [
  { v: 'corta', l: 'Poco: de 1 a 3 años' }, { v: 'media', l: 'Medio: 4 años' }, { v: 'larga', l: 'Mucho: 5 años o más' }, { v: 'igual', l: 'Me da igual' } ] });
add({ n: 12, cat: 'Cursada', type: 'chips', key: 'trab', text: '¿Pensás trabajar mientras estudiás?', opts: [
  { v: 'trab', l: 'Sí, necesito una cursada flexible' }, { v: 'solo', l: 'No, prefiero dedicarme solo a estudiar' }, { v: 'igual', l: 'Todavía no lo sé' } ] });
add({ n: 13, cat: 'Cursada', type: 'chips', key: 'dist', text: '¿Hasta dónde estarías dispuesto/a a ir a estudiar?', opts: [
  { v: 'cerca', l: 'Cerca de mi casa' }, { v: 'prov', l: 'En mi provincia' }, { v: 'pais', l: 'A cualquier lugar del país' } ] });
add({ n: 14, cat: 'Plata y cierre', type: 'chips', key: 'inst', text: '¿Qué tipo de institución preferís?', opts: [
  { v: 'publica', l: 'Pública y gratuita' }, { v: 'privada', l: 'Privada' }, { v: 'igual', l: 'Me da igual' } ] });
add({ n: 15, cat: 'Plata y cierre', type: 'chips', key: 'cuota', text: '¿Cuánto podrías pagar de cuota por mes?', opts: [
  { v: 'nopaga', l: 'No podría pagar una cuota' }, { v: 'baja', l: 'Una cuota baja' }, { v: 'media', l: 'Una cuota media' }, { v: 'alta', l: 'Una cuota alta' } ] });
add({ n: 16, cat: 'Plata y cierre', type: 'multi', key: 'prio', max: 2, text: '¿Qué es lo más importante para vos al elegir una carrera?', hint: 'Elegí hasta 2', opts: [
  { v: 'pasion', l: 'Que me apasione' }, { v: 'salida', l: 'Que tenga salida laboral rápida' }, { v: 'ingreso', l: 'Que se gane bien' }, { v: 'estable', l: 'Que sea estable' } ] });

/* catálogo de carreras de ejemplo (valores del prototipo, a reemplazar por datos reales)
   d: duración · f: familia · i: intereses (1-3) · s: habilidades (1-2) · p: lugares · ind: -1 organización / 0 / 1 independiente
   ge: -1 detrás de escena / 0 / 1 con personas · sa: salida laboral · ig: ingresos · es: estabilidad (1-3) · vi: cursada a distancia (0-2) */
const CAREERS = [
  { id: 'sis', n: 'Ingeniería en Sistemas', y: '5 años aprox.', d: 'larga', f: 'tec', i: { tec: 3, cie: 1 }, s: { num: 2, det: 2, org: 1 }, p: ['ofi', 'casa'], ind: 0, ge: -1, sa: 3, ig: 3, es: 2, vi: 1 },
  { id: 'pro', n: 'Tecnicatura en Programación', y: '2 a 3 años aprox.', d: 'corta', f: 'tec', i: { tec: 3 }, s: { det: 2, num: 1 }, p: ['casa', 'ofi'], ind: 0, ge: -1, sa: 3, ig: 2, es: 2, vi: 2 },
  { id: 'dat', n: 'Ciencia de Datos', y: '3 a 5 años aprox.', d: 'media', f: 'tec', i: { tec: 2, cie: 2, neg: 1 }, s: { num: 2, det: 2 }, p: ['ofi', 'casa'], ind: 0, ge: -1, sa: 3, ig: 3, es: 2, vi: 2 },
  { id: 'dg', n: 'Diseño Gráfico', y: '3 a 4 años aprox.', d: 'media', f: 'dis', i: { dis: 3, com: 1, tec: 1 }, s: { art: 2, exp: 1, det: 1 }, p: ['casa', 'ofi'], ind: 1, ge: 0, sa: 2, ig: 2, es: 1, vi: 2 },
  { id: 'vj', n: 'Diseño de Videojuegos y Animación', y: '3 a 4 años aprox.', d: 'media', f: 'dis', i: { dis: 3, tec: 3 }, s: { art: 2, num: 1, det: 1 }, p: ['casa', 'ofi'], ind: 0, ge: -1, sa: 2, ig: 2, es: 1, vi: 1 },
  { id: 'av', n: 'Producción Audiovisual', y: '3 a 4 años aprox.', d: 'media', f: 'dis', i: { dis: 3, com: 2, tec: 1 }, s: { art: 2, org: 1, exp: 1 }, p: ['afuera', 'ofi'], ind: 1, ge: 0, sa: 2, ig: 1, es: 1, vi: 1 },
  { id: 'arq', n: 'Arquitectura', y: '5 a 6 años aprox.', d: 'larga', f: 'ing', i: { dis: 3, man: 2, tec: 1 }, s: { art: 2, num: 1, det: 1, org: 1 }, p: ['ofi', 'afuera'], ind: 0, ge: 0, sa: 2, ig: 2, es: 2, vi: 0 },
  { id: 'civ', n: 'Ingeniería Civil', y: '5 a 6 años aprox.', d: 'larga', f: 'ing', i: { man: 3, cie: 1, tec: 1 }, s: { num: 2, org: 1, det: 1 }, p: ['afuera', 'ofi'], ind: 0, ge: 0, sa: 3, ig: 3, es: 2, vi: 0 },
  { id: 'ind', n: 'Ingeniería Industrial', y: '5 años aprox.', d: 'larga', f: 'ing', i: { man: 2, neg: 2, tec: 1 }, s: { num: 2, org: 2, det: 1 }, p: ['ofi', 'afuera'], ind: -1, ge: 0, sa: 3, ig: 3, es: 2, vi: 0 },
  { id: 'ele', n: 'Ingeniería Electrónica', y: '5 años aprox.', d: 'larga', f: 'ing', i: { man: 3, tec: 2, cie: 1 }, s: { num: 2, det: 2 }, p: ['lab', 'ofi'], ind: 0, ge: -1, sa: 3, ig: 3, es: 2, vi: 0 },
  { id: 'emc', n: 'Tecnicatura en Electromecánica', y: '2 a 3 años aprox.', d: 'corta', f: 'ing', i: { man: 3, tec: 1 }, s: { det: 1, num: 1 }, p: ['lab', 'afuera'], ind: 1, ge: 0, sa: 3, ig: 2, es: 2, vi: 0 },
  { id: 'di', n: 'Diseño Industrial', y: '5 años aprox.', d: 'larga', f: 'dis', i: { dis: 3, man: 3, tec: 1 }, s: { art: 2, num: 1, det: 1 }, p: ['lab', 'ofi'], ind: 0, ge: -1, sa: 2, ig: 2, es: 1, vi: 0 },
  { id: 'med', n: 'Medicina', y: '6 años aprox.', d: 'larga', f: 'sal', i: { sal: 3, cie: 2, ens: 1 }, s: { det: 2, esc: 1, num: 1 }, p: ['lab'], ind: -1, ge: 1, sa: 3, ig: 2, es: 3, vi: 0 },
  { id: 'enf', n: 'Enfermería', y: '3 a 5 años aprox.', d: 'media', f: 'sal', i: { sal: 3, ens: 2 }, s: { esc: 2, det: 1, org: 1 }, p: ['lab'], ind: -1, ge: 1, sa: 3, ig: 1, es: 3, vi: 0 },
  { id: 'kin', n: 'Kinesiología', y: '4 a 5 años aprox.', d: 'media', f: 'sal', i: { sal: 3, dep: 2, ens: 1 }, s: { esc: 1, det: 1 }, p: ['lab'], ind: 0, ge: 1, sa: 2, ig: 2, es: 2, vi: 0 },
  { id: 'nut', n: 'Nutrición', y: '4 a 5 años aprox.', d: 'media', f: 'sal', i: { sal: 3, cie: 1, gas: 1 }, s: { det: 1, esc: 1, num: 1 }, p: ['lab', 'ofi'], ind: 0, ge: 1, sa: 2, ig: 2, es: 2, vi: 0 },
  { id: 'odo', n: 'Odontología', y: '5 a 6 años aprox.', d: 'larga', f: 'sal', i: { sal: 3, man: 1, cie: 1 }, s: { det: 2, art: 1 }, p: ['lab'], ind: 1, ge: 1, sa: 2, ig: 3, es: 2, vi: 0 },
  { id: 'psi', n: 'Psicología', y: '5 años aprox.', d: 'larga', f: 'soc', i: { ens: 3, sal: 2, cie: 1 }, s: { esc: 2, exp: 1, det: 1 }, p: ['ofi', 'lab'], ind: 1, ge: 1, sa: 2, ig: 2, es: 2, vi: 1 },
  { id: 'far', n: 'Farmacia y Bioquímica', y: '5 años aprox.', d: 'larga', f: 'nat', i: { cie: 3, sal: 2 }, s: { det: 2, num: 1 }, p: ['lab'], ind: -1, ge: -1, sa: 2, ig: 2, es: 2, vi: 0 },
  { id: 'vet', n: 'Veterinaria', y: '5 a 6 años aprox.', d: 'larga', f: 'nat', i: { ani: 3, cie: 2, sal: 1 }, s: { det: 1, esc: 1 }, p: ['afuera', 'lab'], ind: 0, ge: 0, sa: 2, ig: 2, es: 2, vi: 0 },
  { id: 'bio', n: 'Ciencias Biológicas', y: '5 años aprox.', d: 'larga', f: 'nat', i: { cie: 3, ani: 1 }, s: { det: 2, num: 1 }, p: ['lab', 'afuera'], ind: -1, ge: -1, sa: 1, ig: 1, es: 2, vi: 0 },
  { id: 'amb', n: 'Gestión Ambiental', y: '4 a 5 años aprox.', d: 'media', f: 'nat', i: { cie: 3, ley: 1 }, s: { det: 1, org: 1 }, p: ['afuera', 'lab'], ind: 0, ge: 0, sa: 1, ig: 1, es: 2, vi: 1 },
  { id: 'agr', n: 'Ingeniería Agronómica', y: '5 años aprox.', d: 'larga', f: 'nat', i: { cie: 2, man: 1, ani: 1, neg: 1 }, s: { org: 1, num: 1 }, p: ['afuera'], ind: 0, ge: 0, sa: 2, ig: 2, es: 2, vi: 0 },
  { id: 'abo', n: 'Abogacía', y: '5 a 6 años aprox.', d: 'larga', f: 'neg', i: { ley: 3, com: 1, neg: 1 }, s: { exp: 2, det: 1, esc: 1 }, p: ['ofi'], ind: 1, ge: 1, sa: 2, ig: 2, es: 2, vi: 1 },
  { id: 'cp', n: 'Contador Público', y: '5 años aprox.', d: 'larga', f: 'neg', i: { neg: 3, ley: 1 }, s: { num: 2, det: 2, org: 1 }, p: ['ofi'], ind: 0, ge: 0, sa: 3, ig: 2, es: 3, vi: 2 },
  { id: 'adm', n: 'Licenciatura en Administración', y: '4 a 5 años aprox.', d: 'media', f: 'neg', i: { neg: 3, com: 1 }, s: { org: 2, num: 1, exp: 1 }, p: ['ofi'], ind: -1, ge: 1, sa: 3, ig: 2, es: 2, vi: 2 },
  { id: 'eco', n: 'Economía', y: '5 años aprox.', d: 'larga', f: 'neg', i: { neg: 2, cie: 1 }, s: { num: 2, det: 1, exp: 1 }, p: ['ofi'], ind: 0, ge: -1, sa: 2, ig: 3, es: 2, vi: 1 },
  { id: 'mkt', n: 'Marketing y Publicidad', y: '3 a 4 años aprox.', d: 'media', f: 'com', i: { neg: 2, com: 2, dis: 1 }, s: { exp: 2, art: 1, org: 1 }, p: ['ofi', 'casa'], ind: 1, ge: 1, sa: 2, ig: 2, es: 1, vi: 2 },
  { id: 'rrhh', n: 'Recursos Humanos', y: '4 años aprox.', d: 'media', f: 'neg', i: { ens: 2, neg: 2, ley: 1 }, s: { esc: 2, org: 2 }, p: ['ofi'], ind: -1, ge: 1, sa: 2, ig: 2, es: 2, vi: 2 },
  { id: 'com', n: 'Comunicación y Periodismo', y: '4 años aprox.', d: 'media', f: 'com', i: { com: 3, ley: 1 }, s: { exp: 2, esc: 1 }, p: ['afuera', 'ofi'], ind: 1, ge: 1, sa: 1, ig: 1, es: 1, vi: 2 },
  { id: 'prof', n: 'Profesorado (docencia)', y: '4 años aprox.', d: 'media', f: 'soc', i: { ens: 3 }, s: { exp: 2, esc: 2, org: 1 }, p: [], ind: -1, ge: 1, sa: 2, ig: 1, es: 3, vi: 1 },
  { id: 'ts', n: 'Trabajo Social', y: '4 años aprox.', d: 'media', f: 'soc', i: { ens: 3, ley: 1 }, s: { esc: 2, org: 1 }, p: ['afuera'], ind: -1, ge: 1, sa: 2, ig: 1, es: 2, vi: 1 },
  { id: 'ef', n: 'Educación Física y Entrenamiento', y: '4 años aprox.', d: 'media', f: 'sal', i: { dep: 3, ens: 2, sal: 1 }, s: { org: 1, esc: 1 }, p: ['afuera'], ind: 0, ge: 1, sa: 2, ig: 1, es: 2, vi: 0 },
  { id: 'gas', n: 'Gastronomía', y: '2 a 3 años aprox.', d: 'corta', f: 'ser', i: { gas: 3, man: 1, dis: 1 }, s: { org: 1, det: 1, art: 1 }, p: ['lab'], ind: 0, ge: 0, sa: 2, ig: 1, es: 1, vi: 0 },
  { id: 'tur', n: 'Turismo y Hotelería', y: '3 a 4 años aprox.', d: 'media', f: 'ser', i: { gas: 3, com: 1, neg: 1 }, s: { org: 1, exp: 1, esc: 1 }, p: ['afuera', 'ofi'], ind: -1, ge: 1, sa: 2, ig: 1, es: 1, vi: 2 }
];

