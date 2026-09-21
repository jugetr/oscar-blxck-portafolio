/* ============================================================
   OSCAR BLXCK — contenido
   Aquí se edita el portafolio, los diseños y el merch.
   Para reemplazar una foto: cambia solo el valor de "img".
   ============================================================ */

/* ---- los 4 estilos: el mismo orden manda en el nav, en
        "explora el trabajo", en los filtros y en el cotizador ---- */
window.STYLES = [
  { key: 'blackwork', n: '01', img: 'assets/img/est-blackwork.jpg' },
  { key: 'neo',       n: '02', img: 'assets/img/est-neo.jpg' },
  { key: 'minimal',   n: '03', img: 'assets/img/est-flash.jpg' },
  { key: 'shadow',    n: '04', img: 'assets/img/est-real.jpg' },
];

/* ---- portafolio ---- */
window.PIECES = [
  { img: 'assets/img/p1.jpg', style: 'blackwork',
    t: { es: 'Manga en curso',      en: 'Sleeve in progress' },
    z: { es: 'Brazo completo',      en: 'Full arm' },
    s: { es: '3 sesiones',          en: '3 sessions' }, h: '18 h' },

  { img: 'assets/img/est-neo.jpg', style: 'neo',
    t: { es: 'Cobertura a color',   en: 'Colour cover-up' },
    z: { es: 'Brazo',               en: 'Upper arm' },
    s: { es: '4 sesiones',          en: '4 sessions' }, h: '22 h' },

  { img: 'assets/img/est-fine.jpg', style: 'minimal',
    t: { es: 'Botánica',            en: 'Botanical' },
    z: { es: 'Antebrazo',           en: 'Forearm' },
    s: { es: '1 sesión',            en: '1 session' }, h: '3 h' },

  { img: 'assets/img/p4.jpg', style: 'shadow',
    t: { es: 'Composición',         en: 'Composition' },
    z: { es: 'Antebrazo',           en: 'Forearm' },
    s: { es: '2 sesiones',          en: '2 sessions' }, h: '10 h' },

  { img: 'assets/img/p2.jpg', style: 'blackwork',
    t: { es: 'Mano negra',          en: 'Blacked-out hand' },
    z: { es: 'Mano',                en: 'Hand' },
    s: { es: '1 sesión',            en: '1 session' }, h: '4 h' },

  { img: 'assets/img/est-flash.jpg', style: 'minimal',
    t: { es: 'Montañas',            en: 'Mountains' },
    z: { es: 'Antebrazo',           en: 'Forearm' },
    s: { es: '1 sesión',            en: '1 session' }, h: '2 h' },

  { img: 'assets/img/p5.jpg', style: 'shadow',
    t: { es: 'Pieza de brazo',      en: 'Arm piece' },
    z: { es: 'Brazo',               en: 'Upper arm' },
    s: { es: '3 sesiones',          en: '3 sessions' }, h: '15 h' },

  { img: 'assets/img/p3.jpg', style: 'blackwork',
    t: { es: 'Ornamental',          en: 'Ornamental' },
    z: { es: 'Antebrazo',           en: 'Forearm' },
    s: { es: '2 sesiones',          en: '2 sessions' }, h: '9 h' },

  { img: 'assets/img/est-blackwork.jpg', style: 'neo',
    t: { es: 'Pieza a color',       en: 'Colour piece' },
    z: { es: 'Brazo',               en: 'Upper arm' },
    s: { es: '2 sesiones',          en: '2 sessions' }, h: '11 h' },

  { img: 'assets/img/est-real.jpg', style: 'shadow',
    t: { es: 'Espalda',             en: 'Back piece' },
    z: { es: 'Espalda',             en: 'Back' },
    s: { es: '4 sesiones',          en: '4 sessions' }, h: '20 h' },

  { img: 'assets/img/p6.jpg', style: 'minimal',
    t: { es: 'Muñeca',              en: 'Wrist' },
    z: { es: 'Muñeca',              en: 'Wrist' },
    s: { es: '1 sesión',            en: '1 session' }, h: '2 h' },
];

/* ---- diseños disponibles (flash) ---- */
window.DESIGNS = [
  { img: 'assets/img/est-flash.jpg',
    t: { es: 'Montañas',   en: 'Mountains' },
    d: { es: '8 cm · antebrazo o tobillo', en: '8 cm · forearm or ankle' }, price: '[PRECIO]' },
  { img: 'assets/img/p2.jpg',
    t: { es: 'Ornamental', en: 'Ornamental' },
    d: { es: '10 cm · mano o cuello',      en: '10 cm · hand or neck' },   price: '[PRECIO]' },
  { img: 'assets/img/est-fine.jpg',
    t: { es: 'Botánica',   en: 'Botanical' },
    d: { es: '12 cm · antebrazo',          en: '12 cm · forearm' },        price: '[PRECIO]' },
  { img: 'assets/img/p6.jpg',
    t: { es: 'Muñeca',     en: 'Wrist' },
    d: { es: '6 cm · muñeca',              en: '6 cm · wrist' },           price: '[PRECIO]' },
  { img: 'assets/img/p4.jpg',
    t: { es: 'Composición', en: 'Composition' },
    d: { es: '14 cm · antebrazo',          en: '14 cm · forearm' },        price: '[PRECIO]' },
  { img: 'assets/img/p3.jpg',
    t: { es: 'Serpiente',  en: 'Snake' },
    d: { es: '16 cm · antebrazo',          en: '16 cm · forearm' },        price: '[PRECIO]' },
];

/* ---- merch ---- */
window.MERCH = [
  { img: 'assets/img/merch-tee.jpg',
    t: { es: 'Camiseta Blackwork', en: 'Blackwork tee' },
    price: '[PRECIO]', sizes: ['S', 'M', 'L', 'XL'] },
  { img: 'assets/img/merch-hoodie.jpg',
    t: { es: 'Hoodie Oscar Blxck', en: 'Oscar Blxck hoodie' },
    price: '[PRECIO]', sizes: ['S', 'M', 'L', 'XL'] },
  { img: 'assets/img/merch-tee2.jpg',
    t: { es: 'Camiseta Oni', en: 'Oni tee' },
    price: '[PRECIO]', sizes: ['S', 'M', 'L', 'XL'] },
  { img: 'assets/img/merch-cap.jpg',
    t: { es: 'Gorra bordada', en: 'Embroidered cap' },
    price: '[PRECIO]', sizes: ['Única', 'Ajustable'] },
];

/* ---- preguntas frecuentes (el texto vive en i18n.js) ---- */
window.FAQ = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];

/* ---- zonas del cuerpo para el cotizador ---- */
window.ZONES = ['forearm', 'arm', 'calf', 'thigh', 'back', 'ribs', 'hand', 'neck', 'cover', 'other'];
