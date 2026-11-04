/* ============================================================
   APP DE RUMBO
   Cada pantalla es una función "pantalla...()" que arma el HTML
   con clases de Bootstrap y lo mete dentro de <main id="app">.
   ============================================================ */

// ---------- Atajos y textos fijos ----------
const $ = sel => document.querySelector(sel);
const app = $('#app');

const FAMILIA = { tec: 'Tecnología', dis: 'Diseño y comunicación visual', ing: 'Ingeniería y construcción', sal: 'Salud y bienestar', nat: 'Ciencias naturales y ambiente', soc: 'Ciencias sociales y educación', neg: 'Negocios y derecho', com: 'Comunicación', ser: 'Gastronomía y turismo' };
const ADJETIVO = { tec: 'Tecnológico', dis: 'Creativo', man: 'Constructor', sal: 'Cuidador', neg: 'Emprendedor', cie: 'Científico', ens: 'Educador', ley: 'Jurídico', com: 'Comunicacional', dep: 'Deportivo', ani: 'Naturalista', gas: 'Gastronómico' };
const NIVEL = ['', 'baja', 'media', 'alta'];
const PROVINCIAS = ['CABA', 'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'];
const ETIQ = {
  dur: { corta: 'Carrera corta (1 a 3 años)', media: 'Carrera de 4 años', larga: 'Carrera de 5 años o más' },
  mod: { presencial: 'Presencial', virtual: 'Virtual', hibrida: 'Híbrida' },
  dist: { cerca: 'Cerca de tu casa', prov: 'En tu provincia', pais: 'En cualquier lugar del país' },
  inst: { publica: 'Pública y gratuita', privada: 'Privada' },
  cuota: { nopaga: 'Sin cuota', baja: 'Cuota baja', media: 'Cuota media', alta: 'Cuota alta' },
  prio: { pasion: 'Que te apasione', salida: 'Salida laboral rápida', ingreso: 'Que se gane bien', estable: 'Que sea estable' }
};

// ---------- Estado: todo lo que la app "recuerda" mientras la usás ----------
const respuestasNuevas = () => ({ i: {}, s: {}, prio: [], hobbies: [], name: '', loc: '', mod: '' });
let estado = {
  pantalla: 'inicio',   // inicio | carreras | carrera | reels | perfil | datos | pregunta | analizando | resultado
  n: 1,                 // número de pregunta actual (1 a 16)
  resp: respuestasNuevas(),
  historial: [],        // pantallas anteriores (para el botón Atrás)
  carrera: null,        // id de la carrera que se está mirando
  desde: null,          // desde qué pantalla se abrió la carrera
  anticipado: 0,        // si el resultado es parcial: cuántas preguntas se respondieron
  retomar: 1,           // a qué pregunta volver si se sigue respondiendo
  busqueda: '', familia: '',
  comparar: ['dg', 'pro']
};
const carreraPorId = {};
CAREERS.forEach(c => { carreraPorId[c.id] = c; });
const preguntaN = n => Q.find(q => q.n === n);

// ---------- Utilidades ----------
function aviso(texto) {
  $('#aviso-texto').textContent = texto;
  bootstrap.Toast.getOrCreateInstance($('#aviso'), { delay: 2200 }).show();
}
// localStorage puede fallar (modo privado, etc.), por eso va dentro de try/catch
function guardarLocal(clave, valor) {
  try {
    if (valor === undefined) return JSON.parse(localStorage.getItem(clave));
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch (e) { /* sin almacenamiento */ }
  return null;
}
function cantidadRespondidas() {
  const r = estado.resp;
  const sueltas = ['place', 'indep', 'gente', 'dur', 'trab', 'dist', 'inst', 'cuota'].filter(k => r[k]).length;
  return Object.keys(r.i).length + Object.keys(r.s).length + sueltas + (r.prio.length ? 1 : 0);
}

// ---------- Navegación ----------
function ir(pantalla, extra) {
  estado.historial.push({ pantalla: estado.pantalla, n: estado.n, carrera: estado.carrera, desde: estado.desde });
  Object.assign(estado, { pantalla }, extra || {});
  dibujar();
}
function volver() {
  const anterior = estado.historial.pop();
  if (!anterior) { estado.pantalla = 'inicio'; } else { Object.assign(estado, anterior); }
  dibujar();
}
function irAPestana(p) {
  estado.historial = [];
  if (p === 'test') { empezarTest(); return; }
  estado.pantalla = p;
  dibujar();
}
function empezarTest() {
  estado.resp = respuestasNuevas();
  estado.anticipado = 0;
  estado.historial = [];
  estado.pantalla = 'datos';
  dibujar();
}

// Dibuja la pantalla actual y actualiza el menú de abajo
function dibujar() {
  const pantallas = {
    inicio: pantallaInicio, carreras: pantallaCarreras, carrera: pantallaCarrera, reels: pantallaReels, perfil: pantallaPerfil,
    datos: pantallaDatos, pregunta: pantallaPregunta, analizando: pantallaAnalizando, resultado: pantallaResultado
  };
  (pantallas[estado.pantalla] || pantallaInicio)();

  // Durante el test se oculta el menú de abajo
  const enTest = ['datos', 'pregunta', 'analizando'].includes(estado.pantalla);
  $('#menu').hidden = enTest;
  const pestanaActiva = { inicio: 'inicio', carreras: 'carreras', carrera: 'carreras', reels: 'reels', perfil: 'perfil', resultado: 'test' }[estado.pantalla];
  document.querySelectorAll('[data-pestana]').forEach(b => {
    b.classList.toggle('activo', b.dataset.pestana === pestanaActiva);
    if (b.dataset.pestana === pestanaActiva) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
  app.focus({ preventScroll: true });
}

// ---------- Cálculos de texto del perfil ----------
function nombrePerfil(r) {
  const gustos = Object.keys(INT).filter(k => r.i[k] === 2).slice(0, 2).map(k => ADJETIVO[k]);
  return gustos.length ? 'Perfil ' + gustos.join(' y ') : 'Perfil Explorador';
}
function textoPerfil(r) {
  const gustos = Object.keys(INT).filter(k => r.i[k] === 2).map(k => INT[k].r);
  const buenas = Object.keys(SK).filter(k => r.s[k] === 2).map(k => SK[k].r);
  let t = gustos.length
    ? 'Tenés una marcada inclinación hacia ' + gustos.slice(0, 3).join(', ').replace(/, ([^,]*)$/, ' y $1') + '.'
    : 'Todavía estás explorando qué te interesa, y eso es un buen punto de partida.';
  if (buenas.length) t += ' Se te da bien ' + buenas.slice(0, 2).join(' y ') + '.';
  return t + ' Es una orientación para explorar carreras, no un diagnóstico.';
}
function datosDelPerfil(r) {
  const gustos = Object.keys(INT).filter(k => r.i[k] === 2).map(k => INT[k].s);
  const buenas = Object.keys(SK).filter(k => r.s[k] === 2).map(k => SK[k].s);
  const filtros = [];
  if (ETIQ.dur[r.dur]) filtros.push(ETIQ.dur[r.dur]);
  if (ETIQ.mod[r.mod]) filtros.push(ETIQ.mod[r.mod]);
  if (ETIQ.dist[r.dist]) filtros.push(ETIQ.dist[r.dist] + (r.dist === 'prov' && r.loc ? ' (' + r.loc + ')' : ''));
  if (ETIQ.inst[r.inst]) filtros.push(ETIQ.inst[r.inst]);
  if (r.inst !== 'publica' && ETIQ.cuota[r.cuota]) filtros.push(ETIQ.cuota[r.cuota]);
  return { gustos, buenas, filtros };
}
function rolesDe(c) {
  const ints = Object.keys(c.i).sort((x, y) => c.i[y] - c.i[x]).slice(0, 2).map(k => INT[k].r);
  const hab = Object.keys(c.s).sort((x, y) => c.s[y] - c.s[x]).slice(0, 2).map(k => SK[k].r);
  return { ints, hab };
}
function guardarResultado() {
  guardarLocal('rumbo.saved', { a: estado.resp, date: new Date().toISOString() });
  aviso('Guardado en tu perfil');
}
function compartir(r, ranking) {
  const texto = ['Mi perfil en Rumbo: ' + nombrePerfil(r), '']
    .concat(ranking.top.map((x, i) => (i + 1) + '. ' + x.c.n + ' · afinidad ' + x.pct + '% · ' + x.c.y))
    .concat(['', 'Resultado orientativo de Rumbo. No es un diagnóstico.']).join('\n');
  if (navigator.share) { navigator.share({ text: texto }).catch(() => {}); return; }
  try { navigator.clipboard.writeText(texto).then(() => aviso('Resultado copiado'), () => aviso('No se pudo copiar')); }
  catch (e) { aviso('No se pudo copiar'); }
}

// ============================================================
//  PANTALLAS
// ============================================================

// ---------- INICIO ----------
function pantallaInicio() {
  const pasos = [
    ['01', 'Completá tus datos', 'Sin iniciar sesión, contanos quién sos y de dónde sos para poder hacer las mejores recomendaciones para vos.'],
    ['02', 'Respondé las preguntas', 'Tocá la opción que más te represente. Son 16 preguntas en 4 bloques y cada una avanza sola.'],
    ['03', 'Recibí tu perfil vocacional', 'Obtené un perfil con las 3 carreras que mejor encajan con vos. Guardá o compartí la información.']
  ];
  app.innerHTML =
    // Portada con foto
    '<section class="hero">' +
      '<div class="copia">' +
        '<h1>Encontrá qué y dónde estudiar</h1>' +
        '<p class="mb-3">Respondé algunas preguntas, del resto nos ocupamos nosotros.</p>' +
        '<button class="btn btn-light text-primary px-4" data-accion="empezar">Comenzar test</button>' +
        '<p class="small mt-2 mb-0" style="opacity:.9">Tomará solo unos minutos.</p>' +
      '</div>' +
      '<img src="img/hero.webp" alt="" width="616" height="1100">' +
    '</section>' +

    // Tres pasos (cards de Bootstrap)
    '<div class="px-3 pt-4 d-grid gap-3">' +
      pasos.map(p => '<div class="card paso-card"><div class="card-body p-4"><div class="paso-num mb-2">' + p[0] + '</div><h2 class="h4">' + p[1] + '</h2><p class="mb-0">' + p[2] + '</p></div></div>').join('') +
      '<button class="btn btn-primary btn-lg" data-accion="empezar">Comenzar test</button>' +

      // Comparador de carreras
      '<h2 class="h3 pt-3">Compará carreras</h2>' +
      '<div class="row g-2" id="comparador">' + htmlComparador() + '</div>' +
    '</div>' +

    // Pie de página
    '<footer class="pie mt-4">' +
      '<img src="img/logo.png" alt="Rumbo" width="136" height="30" class="mb-3" style="filter: brightness(0) invert(1)">' +
      '<div class="d-flex flex-wrap gap-3 mb-3">' +
        '<a href="#" class="small" data-accion="pronto">Ayuda</a>' +
        '<a href="#" class="small" data-accion="pestana:carreras">Carreras</a>' +
        '<a href="#" class="small" data-accion="pronto">Universidades</a>' +
        '<a href="#" class="small" data-accion="pronto">Calendario de charlas</a>' +
        '<a href="#" class="small" data-accion="pestana:reels">Reels</a>' +
      '</div>' +
      '<p class="small">¿Querés que tu universidad aparezca en nuestros listados? ¡Dejanos tu contacto!</p>' +
      '<form id="form-contacto" class="input-group mb-3">' +
        '<input type="email" class="form-control rounded-start-pill" placeholder="Email" aria-label="Email">' +
        '<button class="btn btn-light text-primary" type="submit" aria-label="Enviar"><i class="bi bi-send"></i></button>' +
      '</form>' +
      '<div class="d-flex align-items-center gap-3 mb-3"><span>Seguinos:</span>' +
        '<a href="#" data-accion="pronto" aria-label="X"><i class="bi bi-twitter-x fs-5"></i></a>' +
        '<a href="#" data-accion="pronto" aria-label="Instagram"><i class="bi bi-instagram fs-5"></i></a>' +
        '<a href="#" data-accion="pronto" aria-label="YouTube"><i class="bi bi-youtube fs-5"></i></a>' +
      '</div>' +
      '<small>Todos los derechos reservados © 2026 Rumbo</small>' +
    '</footer>';

  $('#form-contacto').onsubmit = e => { e.preventDefault(); aviso('Muy pronto vamos a recibir tu contacto'); };
  engancharComparador();
}

// Comparador: dos tarjetas con un <select> cada una
function htmlComparador() {
  return [0, 1].map(idx => {
    const c = carreraPorId[estado.comparar[idx]], r = rolesDe(c);
    const opciones = CAREERS.map(x => '<option value="' + x.id + '"' + (x.id === c.id ? ' selected' : '') + '>' + esc(x.n) + '</option>').join('');
    return '<div class="col-6"><div class="card h-100 tarjeta-carrera"><div class="card-body p-2 d-flex flex-column gap-2">' +
      '<select class="form-select form-select-sm" data-comparar="' + idx + '" aria-label="Carrera ' + (idx + 1) + '">' + opciones + '</select>' +
      '<dl class="small mb-0">' +
        '<dt class="text-secondary fw-normal">Duración</dt><dd>' + esc(c.y) + '</dd>' +
        '<dt class="text-secondary fw-normal">Intereses que pesan</dt><dd>' + esc(r.ints.join(', ')) + '</dd>' +
        '<dt class="text-secondary fw-normal">Salida laboral (estimada)</dt><dd>' + NIVEL[c.sa] + '</dd>' +
        '<dt class="text-secondary fw-normal">Ingresos (estimados)</dt><dd>' + NIVEL[c.ig] + '</dd>' +
        '<dt class="text-secondary fw-normal">Cursada a distancia</dt><dd>' + ['Casi no hay', 'Algunas opciones', 'Muchas opciones'][c.vi] + '</dd>' +
      '</dl>' +
      '<button class="btn btn-outline-primary btn-sm mt-auto" data-accion="carrera:' + c.id + '">Saber más</button>' +
    '</div></div></div>';
  }).join('');
}
function engancharComparador() {
  document.querySelectorAll('[data-comparar]').forEach(sel => {
    sel.onchange = () => {
      estado.comparar[Number(sel.dataset.comparar)] = sel.value;
      $('#comparador').innerHTML = htmlComparador();
      engancharComparador();
    };
  });
}

// ---------- CARRERAS (lista con buscador y filtros) ----------
function pantallaCarreras() {
  app.innerHTML =
    '<div class="px-3 pt-4 d-grid gap-3">' +
      '<h1 class="h2">Carreras</h1>' +
      '<input type="search" id="buscar" class="form-control form-control-lg rounded-pill" placeholder="Buscá una carrera" aria-label="Buscar carrera" value="' + esc(estado.busqueda) + '">' +
      '<div class="d-flex flex-wrap gap-2" id="filtros"></div>' +
      '<div class="list-group" id="lista-carreras"></div>' +
      '<p class="small text-secondary">Catálogo de ejemplo. Estamos sumando más carreras e instituciones.</p>' +
    '</div>';
  dibujarListaCarreras();
  $('#buscar').oninput = e => { estado.busqueda = e.target.value; dibujarListaCarreras(); };
}
function dibujarListaCarreras() {
  const q = estado.busqueda.toLowerCase();
  const lista = CAREERS.filter(c => (!estado.familia || c.f === estado.familia) && (!q || c.n.toLowerCase().includes(q)));
  const chip = (id, texto) => '<button class="btn btn-sm ' + (estado.familia === id ? 'btn-primary' : 'btn-outline-primary') + '" data-familia="' + id + '" aria-pressed="' + (estado.familia === id) + '">' + esc(texto) + '</button>';
  $('#filtros').innerHTML = chip('', 'Todas') + Object.keys(FAMILIA).map(f => chip(f, FAMILIA[f])).join('');
  $('#lista-carreras').innerHTML = lista.length
    ? lista.map(c => '<button class="list-group-item list-group-item-action py-3" data-accion="carrera:' + c.id + '"><div class="fw-medium fs-5">' + esc(c.n) + '</div><div class="small text-secondary">' + esc(FAMILIA[c.f]) + ' · ' + esc(c.y) + '</div></button>').join('')
    : '<p class="text-secondary">No encontramos carreras con esa búsqueda.</p>';
  document.querySelectorAll('[data-familia]').forEach(b => { b.onclick = () => { estado.familia = b.dataset.familia; dibujarListaCarreras(); }; });
}

// ---------- DETALLE DE UNA CARRERA ----------
function pantallaCarrera() {
  const c = carreraPorId[estado.carrera];
  if (!c) { irAPestana('inicio'); return; }
  const r = rolesDe(c);
  let afinidad = '';
  if (estado.desde === 'resultado' || estado.desde === 'perfil') {
    const x = rank(estado.resp).all.find(z => z.c.id === c.id);
    if (x) afinidad = '<p class="small text-secondary">' + pctOf(x.s) + '% de afinidad estimada con tu perfil</p>';
  }
  app.innerHTML =
    '<div class="px-3 pt-3 d-grid gap-3">' +
      '<div><button class="btn btn-link text-decoration-none ps-0" id="btn-atras"><i class="bi bi-arrow-left"></i> Atrás</button></div>' +
      '<h1 class="h2 mb-0">' + esc(c.n) + '</h1>' + afinidad +
      '<p>Carrera del área de ' + esc(FAMILIA[c.f].toLowerCase()) + '. Combina ' + esc(r.ints.join(' y ')) + (r.hab.length ? ', con foco en ' + esc(r.hab.join(' y ')) : '') + '.</p>' +
      '<button class="btn btn-primary" id="btn-guardar">Guardar mi resultado</button>' +
      '<button class="btn btn-outline-primary" id="btn-copiar">Compartir</button>' +
      // Acordeón de Bootstrap con las secciones
      '<div class="accordion" id="acordeon">' +
        itemAcordeon('a1', 'Duración', '<p class="mb-1">' + esc(c.y) + '</p><p class="small text-secondary mb-0">Puede variar según la institución.</p>', true) +
        itemAcordeon('a2', 'Instituciones', '<p class="text-secondary mb-0">Muy pronto vas a ver acá dónde estudiarla, con cuota, modalidad y ubicación.</p>', true) +
        itemAcordeon('a3', 'Salida laboral (estimada)', '<ul class="mb-0"><li>Demanda laboral: ' + NIVEL[c.sa] + '</li><li>Ingresos: ' + NIVEL[c.ig] + '</li><li>Estabilidad: ' + NIVEL[c.es] + '</li></ul>', true) +
        itemAcordeon('a4', 'Perfil del graduado', '<p class="mb-0">Suele encajar con personas interesadas en ' + esc(r.ints.join(' y ')) + (r.hab.length ? ' y a quienes se les da bien ' + esc(r.hab.join(' y ')) : '') + '.</p>', true) +
      '</div>' +
      '<p class="small text-secondary">Datos de ejemplo del prototipo: hay que validarlos con fuentes reales.</p>' +
    '</div>';
  $('#btn-atras').onclick = volver;
  $('#btn-guardar').onclick = () => { if (cantidadRespondidas() || estado.resp.hobbies.length) guardarResultado(); else aviso('Hacé el test para guardar tu resultado'); };
  $('#btn-copiar').onclick = () => { try { navigator.clipboard.writeText(c.n + ' (' + c.y + ') · Rumbo').then(() => aviso('Copiado'), () => aviso('No se pudo copiar')); } catch (e) { aviso('No se pudo copiar'); } };
}
function itemAcordeon(id, titulo, contenido, abierto) {
  return '<div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button' + (abierto ? '' : ' collapsed') + '" type="button" data-bs-toggle="collapse" data-bs-target="#' + id + '" aria-expanded="' + !!abierto + '">' + titulo + '</button></h2>' +
    '<div id="' + id + '" class="accordion-collapse collapse' + (abierto ? ' show' : '') + '"><div class="accordion-body">' + contenido + '</div></div></div>';
}

// ---------- REELS (todavía no está) ----------
function pantallaReels() {
  app.innerHTML = '<div class="px-4 py-5 text-center d-grid gap-3"><h1 class="h2">Reels</h1><p class="text-secondary">Muy pronto vas a poder ver videos cortos de estudiantes y profesionales contando cómo es cada carrera.</p><button class="btn btn-primary" data-accion="empezar">Hacer el test</button></div>';
}

// ---------- PERFIL (resultado guardado) ----------
function pantallaPerfil() {
  const guardado = guardarLocal('rumbo.saved');
  if (!guardado) {
    app.innerHTML = '<div class="px-4 py-5 text-center d-grid gap-3"><h1 class="h2">Tu perfil</h1><p class="text-secondary">Todavía no guardaste ningún resultado. Hacé el test y guardalo acá.</p><button class="btn btn-primary" data-accion="empezar">Comenzar test</button></div>';
    return;
  }
  const r = guardado.a, ranking = rank(r);
  app.innerHTML =
    '<div class="px-3 pt-4 d-grid gap-3">' +
      '<h1 class="h2">' + (r.name ? esc(r.name) + ', tu perfil' : 'Tu perfil') + '</h1>' +
      tarjetaPerfil(r) +
      '<h2 class="h4">Lo más compatible</h2>' +
      '<div class="list-group">' + ranking.top.map(x => '<button class="list-group-item list-group-item-action py-3" data-accion="carrera:' + x.c.id + '"><div class="d-flex justify-content-between"><span class="fw-medium fs-5">' + esc(x.c.n) + '</span><span class="pct">' + x.pct + '%</span></div><div class="small text-secondary">' + esc(x.c.y) + '</div></button>').join('') + '</div>' +
      '<button class="btn btn-primary" id="btn-ver">Ver resultado completo</button>' +
      '<button class="btn btn-link" id="btn-borrar">Borrar mi resultado guardado</button>' +
    '</div>';
  $('#btn-ver').onclick = () => { estado.resp = JSON.parse(JSON.stringify(r)); estado.anticipado = 0; ir('resultado'); };
  $('#btn-borrar').onclick = () => { try { localStorage.removeItem('rumbo.saved'); } catch (e) { /* sin almacenamiento */ } pantallaPerfil(); };
}
function tarjetaPerfil(r) {
  return '<div class="card tarjeta-perfil"><div class="card-body p-4">' +
    '<span class="badge rounded-pill text-bg-light fs-6 fw-medium mb-2"><i class="bi bi-emoji-smile"></i> ' + esc(nombrePerfil(r)) + '</span>' +
    '<p class="mb-0">' + esc(textoPerfil(r)) + '</p></div></div>';
}

// ---------- TEST: PASO 1, DATOS ----------
function pantallaDatos() {
  const r = estado.resp;
  const modalidades = [['virtual', 'Virtual'], ['presencial', 'Presencial'], ['hibrida', 'Híbrida']];
  app.innerHTML =
    '<div class="px-3 pt-3 d-grid gap-3">' +
      encabezadoTest('Paso 1 de 17', 0) +
      '<h1 class="h2 mb-0">Completá tus datos</h1>' +
      '<div><label class="form-label" for="f-nombre">Nombre</label><input class="form-control form-control-lg" id="f-nombre" placeholder="Ej.: Sofía" autocomplete="given-name" value="' + esc(r.name) + '"></div>' +
      '<div><label class="form-label" for="f-ubicacion">Ubicación</label><select class="form-select form-select-lg" id="f-ubicacion"><option value="">Seleccioná tu ubicación</option>' + PROVINCIAS.map(p => '<option' + (r.loc === p ? ' selected' : '') + '>' + p + '</option>').join('') + '</select></div>' +
      '<div><span class="form-label d-block" id="et-mod">Modalidad de cursada</span>' +
        '<div class="btn-group w-100" role="group" aria-labelledby="et-mod">' +
          modalidades.map(m => '<input type="radio" class="btn-check" name="modalidad" id="mod-' + m[0] + '" value="' + m[0] + '"' + (r.mod === m[0] ? ' checked' : '') + '><label class="btn btn-outline-primary" for="mod-' + m[0] + '">' + m[1] + '</label>').join('') +
        '</div></div>' +
      '<div><label class="form-label" for="f-hobby">Hobbies</label>' +
        '<input class="form-control form-control-lg" id="f-hobby" list="lista-hobbies" placeholder="Buscá tus hobbies" autocomplete="off">' +
        '<datalist id="lista-hobbies">' + HOBBIES.map(h => '<option value="' + esc(h[0]) + '"></option>').join('') + '</datalist>' +
        '<div class="d-flex flex-wrap gap-2 mt-2" id="hobbies-elegidos"></div></div>' +
      '<button class="btn btn-primary btn-lg" id="btn-siguiente">Siguiente</button>' +
    '</div>';

  $('#btn-atras').onclick = volver;
  $('#f-nombre').oninput = e => { r.name = e.target.value.trim().slice(0, 30); };
  $('#f-ubicacion').onchange = e => { r.loc = e.target.value; };
  document.querySelectorAll('[name="modalidad"]').forEach(x => { x.onchange = () => { r.mod = x.value; }; });
  dibujarHobbies();
  $('#f-hobby').onchange = e => {
    const h = HOBBIES.map(x => x[0]).find(x => x.toLowerCase() === e.target.value.trim().toLowerCase());
    if (h && !r.hobbies.includes(h)) { r.hobbies.push(h); dibujarHobbies(); }
    e.target.value = '';
  };
  $('#btn-siguiente').onclick = () => ir('pregunta', { n: 1 });
}
function dibujarHobbies() {
  const r = estado.resp;
  $('#hobbies-elegidos').innerHTML = r.hobbies.map(h => '<span class="badge etiqueta etiqueta-p d-inline-flex align-items-center gap-2">' + esc(h) + '<button type="button" class="btn-close btn-close-sm" style="font-size:.6rem" data-quitar="' + esc(h) + '" aria-label="Quitar ' + esc(h) + '"></button></span>').join('');
  document.querySelectorAll('[data-quitar]').forEach(b => { b.onclick = () => { r.hobbies = r.hobbies.filter(h => h !== b.dataset.quitar); dibujarHobbies(); }; });
}

// Barra de arriba de las pantallas del test: botón Atrás, "Paso x de 17" y 4 barritas (una por bloque)
function encabezadoTest(textoPaso, avance) {
  const barras = [0, 1, 2, 3].map(b => {
    const pct = Math.round(Math.max(0, Math.min(1, avance - b)) * 100);
    return '<div class="progress"><div class="progress-bar" style="width:' + pct + '%"></div></div>';
  }).join('');
  return '<div class="d-flex justify-content-between align-items-center">' +
      '<button class="btn btn-link text-decoration-none ps-0 text-body" id="btn-atras"><i class="bi bi-arrow-left"></i> Atrás</button>' +
      '<span class="small text-secondary">' + textoPaso + '</span></div>' +
    '<div class="barra-bloques" role="progressbar" aria-label="Avance del test" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + Math.round(avance * 25) + '">' + barras + '</div>';
}

// ---------- TEST: PREGUNTAS ----------
// Intereses y habilidades: cada opción guarda un 2 (elegida) o 0 (no elegida)
const almacenDe = q => (q.kind === 'i' ? estado.resp.i : estado.resp.s);
const elegidasDe = q => q.opts.filter(o => almacenDe(q)[o.v] === 2).map(o => o.v);
function marcarPick(q, elegidas) {
  q.opts.forEach(o => { almacenDe(q)[o.v] = elegidas.includes(o.v) ? 2 : 0; });
}

function pantallaPregunta() {
  const q = preguntaN(estado.n), r = estado.resp;
  let cuerpo = '';

  if (q.type === 'pick') {
    const sel = elegidasDe(q);
    const respondida = q.opts.every(o => almacenDe(q)[o.v] !== undefined);
    const extras = q.kind === 'i'
      ? [['__none', 'Ninguno de estos', respondida && !sel.length]]
      : [['__both', 'Las dos', sel.length === q.opts.length], ['__none', 'Ninguna', respondida && !sel.length]];
    cuerpo = '<div class="d-grid gap-2">' +
      q.opts.map(o => {
        const activa = sel.length === 1 && sel[0] === o.v;
        return o.img
          ? '<button class="opcion opcion-img' + (activa ? ' activa' : '') + '" data-valor="' + o.v + '">' + art(o.img, o.l, '') + '<span>' + esc(o.l) + '</span></button>'
          : '<button class="opcion' + (activa ? ' activa' : '') + '" data-valor="' + o.v + '">' + esc(o.l) + '</button>';
      }).join('') +
      extras.map(e => '<button class="opcion' + (e[2] ? ' activa' : '') + '" data-valor="' + e[0] + '">' + e[1] + '</button>').join('') +
      '</div>';
  } else if (q.type === 'imgs') {
    cuerpo = '<div class="row row-cols-2 g-2">' + q.opts.map(o =>
      '<div class="col"><button class="tarjeta-img' + (r[q.key] === o.v ? ' activa' : '') + '" data-valor="' + o.v + '">' + art(q.key + '_' + o.v, o.img, '') + '<span>' + esc(o.l) + '</span></button></div>').join('') + '</div>';
  } else {
    const sel = q.type === 'multi' ? (r[q.key] || []) : [r[q.key]];
    cuerpo = '<div class="d-grid gap-2">' + q.opts.map(o => '<button class="opcion' + (sel.includes(o.v) ? ' activa' : '') + '" data-valor="' + o.v + '">' + esc(o.l) + '</button>').join('') + '</div>';
  }

  app.innerHTML =
    '<div class="px-3 pt-3 d-grid gap-3">' +
      encabezadoTest('Paso ' + (estado.n + 1) + ' de 17', (estado.n - 1) / 4) +
      '<div><p class="small text-secondary mb-1">' + esc(q.cat) + '</p><h1 class="h3 mb-1" id="titulo-pregunta">' + esc(q.text) + '</h1>' +
      (q.hint && q.type === 'pick' ? '<p class="small text-secondary mb-0">' + esc(q.hint) + '</p>' : '') + '</div>' +
      cuerpo +
    '</div>';

  $('#btn-atras').onclick = volver;
  // Un solo toque: se guarda la respuesta y se pasa sola a la siguiente pregunta
  document.querySelectorAll('[data-valor]').forEach(b => {
    b.onclick = () => {
      const v = b.dataset.valor;
      if (q.type === 'pick') marcarPick(q, v === '__none' ? [] : (v === '__both' ? q.opts.map(o => o.v) : [v]));
      else if (q.type === 'multi') r[q.key] = [v];
      else r[q.key] = v;
      b.classList.add('activa');
      setTimeout(despuesDeResponder, 130);
    };
  });
}

function despuesDeResponder() {
  const n = estado.n;
  if (n === 16) { estado.anticipado = 0; ir('analizando'); return; }
  let siguiente = n + 1;
  if (siguiente === 15 && estado.resp.inst === 'publica') siguiente = 16;   // si es pública, no se pregunta la cuota
  if (n % 4 === 0) { abrirModalBloque(n / 4, n, siguiente); return; }       // cada 4 preguntas: ventana con resultado estimado
  ir('pregunta', { n: siguiente });
}

// ---------- VENTANA EMERGENTE CADA 4 PREGUNTAS (modal de Bootstrap) ----------
let accionModal = null;
function abrirModalBloque(bloque, n, siguiente) {
  const ranking = rank(estado.resp), p = datosDelPerfil(estado.resp);
  const hayPistas = p.gustos.length || p.buenas.length || estado.resp.hobbies.length;
  $('#modal-bloque-n').textContent = 'Bloque ' + bloque + ' de 4 completo';
  $('#modal-cuerpo').innerHTML =
    '<h2 class="h4" id="modal-titulo">' + (hayPistas ? 'Por ahora tu perfil apunta a…' : 'Todavía no se nota un camino claro') + '</h2>' +
    (hayPistas
      ? (p.gustos.length ? '<div class="d-flex flex-wrap gap-2 mb-3">' + p.gustos.map(x => '<span class="badge etiqueta etiqueta-p">' + esc(x) + '</span>').join('') + '</div>' : '') +
        '<ul>' + ranking.top.map(x => '<li><b>' + esc(x.c.n) + '</b> · ' + esc(x.c.y) + '</li>').join('') + '</ul>'
      : '<p class="text-secondary">Está bien: seguí respondiendo y lo vamos afinando.</p>') +
    '<p class="small text-secondary mb-0">Es una primera idea con ' + n + ' de 16 preguntas. Cuantas más respondas, mejor se ajusta.</p>';

  const seguir = () => ir('pregunta', { n: siguiente });
  const verResultado = () => ir('resultado', { anticipado: n, retomar: siguiente });
  accionModal = seguir;                                   // si cierra con la X, también sigue
  $('#modal-seguir').onclick = () => { accionModal = seguir; modal.hide(); };
  $('#modal-ver').onclick = () => { accionModal = verResultado; modal.hide(); };
  const modal = bootstrap.Modal.getOrCreateInstance($('#modal-bloque'));
  modal.show();
}
// Cuando el modal termina de cerrarse, se ejecuta la acción elegida
$('#modal-bloque').addEventListener('hidden.bs.modal', () => {
  const accion = accionModal; accionModal = null;
  if (accion) accion();
});

// ---------- ANALIZANDO ----------
let temporizador;
function pantallaAnalizando() {
  app.innerHTML = '<div class="px-4 py-5 text-center d-grid gap-4" role="status"><h1 class="h3">Analizando tu perfil</h1><div class="progress" style="height:10px"><div class="progress-bar" id="barra-analisis" style="width:0%; transition: width 1.8s ease"></div></div></div>';
  const reducido = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  requestAnimationFrame(() => { const b = $('#barra-analisis'); if (b) b.style.width = '100%'; });
  clearTimeout(temporizador);
  temporizador = setTimeout(() => {
    if (estado.pantalla !== 'analizando') return;
    estado.historial.pop();                 // así "Atrás" no vuelve a esta pantalla
    estado.pantalla = 'resultado'; estado.anticipado = 0;
    dibujar();
  }, reducido ? 300 : 1900);
}

// ---------- RESULTADO ----------
function pantallaResultado() {
  const r = estado.resp, ranking = rank(r), p = datosDelPerfil(r);
  const mejor = ranking.top[0] ? ranking.top[0].s : 0;
  let h = '<div class="px-3 pt-4 d-grid gap-3">';

  if (estado.anticipado) {
    h += '<div class="alert alert-info mb-0"><p class="small mb-2"><b>Este resultado usa tus primeras ' + estado.anticipado + ' respuestas de 16.</b> Si seguís respondiendo, se ajusta mejor.</p><button class="btn btn-primary btn-sm" id="btn-retomar">Seguir respondiendo</button></div>';
  }
  h += '<h1 class="h2 mb-0">' + (r.name ? esc(r.name) + ', conocé tu perfil' : 'Conocé tu perfil') + '</h1>' +
    tarjetaPerfil(r) +
    '<button class="btn btn-primary btn-lg" id="btn-guardar">Guardar mi resultado</button>' +
    '<button class="btn btn-outline-primary btn-lg" id="btn-compartir">Compartir</button>' +
    '<h2 class="h3 pt-2 mb-0">' + (mejor < 0.35 ? 'Algunas ideas para explorar' : 'Lo más compatible') + '</h2>';

  // Las 3 carreras recomendadas (sin caja alrededor del nombre y el porcentaje)
  ranking.top.forEach(x => {
    const motivos = reasons(r, x.c).slice(0, 2);
    h += '<article class="card tarjeta-carrera"><div class="card-body p-4 d-grid gap-3">' +
      '<div class="d-flex justify-content-between align-items-start gap-3"><h3 class="h4 mb-0">' + esc(x.c.n) + '</h3><span class="pct">' + x.pct + '%</span></div>' +
      '<ul class="list-unstyled mb-0 d-grid gap-1">' +
        '<li><i class="bi bi-clock me-2"></i>' + esc(x.c.y) + '</li>' +
        '<li><i class="bi bi-briefcase me-2"></i>Salida laboral ' + NIVEL[x.c.sa] + ' (estimada)</li>' +
        '<li><i class="bi bi-geo-alt me-2"></i>Instituciones: muy pronto</li></ul>' +
      (motivos.length ? '<div class="d-flex flex-wrap gap-2">' + motivos.map(m => '<span class="badge etiqueta">' + esc(m) + '</span>').join('') + '</div>' : '') +
      '<button class="btn btn-outline-primary" data-accion="carrera:' + x.c.id + '">Saber más</button>' +
    '</div></article>';
  });

  if (p.filtros.length) {
    h += '<div><h2 class="h5">Filtros para las instituciones</h2><div class="d-flex flex-wrap gap-2">' + p.filtros.map(f => '<span class="badge etiqueta etiqueta-p">' + esc(f) + '</span>').join('') + '</div></div>';
  }
  h += '<div><h2 class="h5">Otras opciones cerca de tu perfil</h2><ul class="mb-0">' + ranking.others.map(x => '<li><b class="fw-medium">' + esc(x.c.n) + '</b> · ' + x.pct + '% · ' + esc(x.c.y) + '</li>').join('') + '</ul></div>' +
    itemAcordeonSimple('Cómo se calcula este resultado',
      '<ul class="mb-0"><li>Comparamos tus intereses (55%), tus habilidades (25%) y cómo te imaginás trabajando (20%) con el perfil de cada carrera del catálogo de ejemplo.</li>' +
      '<li>Si elegiste "Que me apasione", los intereses pesan más (65%).</li>' +
      '<li>La duración, la cursada a distancia, si querés trabajar mientras estudiás y tus prioridades suman o restan unos pocos puntos.</li>' +
      '<li>Tus hobbies suman un poco de interés en esa área.</li>' +
      '<li>Mostramos las 3 con más afinidad, con no más de 2 de la misma familia.</li>' +
      '<li>La afinidad es una estimación del prototipo, no un diagnóstico.</li></ul>') +
    '<div class="d-flex justify-content-between align-items-center"><button class="btn btn-link ps-0" id="btn-atras"><i class="bi bi-arrow-left"></i> Atrás</button><button class="btn btn-outline-primary" id="btn-de-nuevo">Hacer el test de nuevo</button></div>' +
    '</div>';
  app.innerHTML = h;

  const retomar = $('#btn-retomar');
  if (retomar) retomar.onclick = () => { estado.anticipado = 0; ir('pregunta', { n: estado.retomar }); };
  $('#btn-guardar').onclick = guardarResultado;
  $('#btn-compartir').onclick = () => compartir(r, ranking);
  $('#btn-atras').onclick = volver;
  $('#btn-de-nuevo').onclick = empezarTest;
}
function itemAcordeonSimple(titulo, contenido) {
  return '<div class="accordion"><div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#como-se-calcula">' + titulo + '</button></h2>' +
    '<div id="como-se-calcula" class="accordion-collapse collapse"><div class="accordion-body">' + contenido + '</div></div></div></div>';
}

// ============================================================
//  EVENTOS GENERALES (un solo "escuchador" para todos los botones data-accion)
// ============================================================
document.addEventListener('click', e => {
  const el = e.target.closest('[data-accion]');
  if (el) {
    e.preventDefault();
    const [accion, valor] = el.dataset.accion.split(':');
    if (accion === 'empezar') empezarTest();
    else if (accion === 'carrera') ir('carrera', { carrera: valor, desde: estado.pantalla });
    else if (accion === 'pestana') irAPestana(valor);
    else if (accion === 'pronto') aviso('Muy pronto');
    return;
  }
  const pestana = e.target.closest('[data-pestana]');
  if (pestana) irAPestana(pestana.dataset.pestana);
});
$('#btn-logo').onclick = () => irAPestana('inicio');
$('#btn-letra').onclick = e => {
  const grande = document.documentElement.classList.toggle('letra-grande');
  e.currentTarget.setAttribute('aria-pressed', grande);
};

// Arranca en la pantalla de inicio
dibujar();
