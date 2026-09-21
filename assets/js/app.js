/* ============================================================
   OSCAR BLXCK — interacciones
   Vanilla JS, sin dependencias.
   ============================================================ */
(function () {
  'use strict';

  var WA = '573160403424';
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ============================================================
     IDIOMA
     ============================================================ */
  var LS_KEY = 'ob_lang';
  var lang = 'es';
  function t(key) {
    var d = window.I18N[lang] || window.I18N.es;
    return (key in d) ? d[key] : ((window.I18N.es[key]) || key);
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.title = t('meta.title');
    var md = $('meta[name="description"]'); if (md) md.setAttribute('content', t('meta.desc'));

    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-ph]').forEach(function (el) { el.placeholder = t(el.dataset.i18nPh); });
    $$('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });

    $$('.langsw').forEach(function (sw) {
      $$('button', sw).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    });

    renderPieces();
    renderDesigns();
    renderMerch();
    renderFaq();
    renderSheetOpts();
    refreshSheet();
    applyFilter(curFilter, true);
  }

  function setLang(code, remember) {
    lang = code;
    if (remember) { try { localStorage.setItem(LS_KEY, code); } catch (e) {} }
    applyLang();
  }

  /* ---- puerta de idioma al abrir ---- */
  var gate = $('#langgate');
  function buildLangUI() {
    $('#langbtns').innerHTML = window.LANGS.map(function (l) {
      return '<button class="langbtn" type="button" data-lang="' + l.code + '">' +
             esc(l.label) + ' <b>' + esc(l.short) + '</b></button>';
    }).join('');
    var sw = window.LANGS.map(function (l) {
      return '<button type="button" data-lang="' + l.code + '" aria-pressed="false">' + esc(l.short) + '</button>';
    }).join('');
    $('#langsw').innerHTML = sw;
    $('#langswM').innerHTML = sw;

    $$('[data-lang]').forEach(function (b) {
      b.addEventListener('click', function () {
        setLang(b.dataset.lang, true);
        closeGate();
      });
    });
  }
  function openGate()  { gate.classList.add('open'); document.body.classList.add('locked'); }
  function closeGate() { gate.classList.remove('open'); document.body.classList.remove('locked'); }

  /* ============================================================
     RENDER: PORTAFOLIO
     ============================================================ */
  var ICO_HEART = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.6-7-9.6A3.9 3.9 0 0 1 12 7.8 3.9 3.9 0 0 1 19 10.4c0 5-7 9.6-7 9.6Z"/></svg>';
  var ICO_EXPAND = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4h6M4 4v6M20 20h-6M20 20v-6M4 4l6 6M20 20l-6-6"/></svg>';
  var ICO_WA = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3 20.5l1.8-5.2A8.4 8.4 0 1 1 21 11.5Z"/></svg>';

  function renderPieces() {
    $('#grid').innerHTML = window.PIECES.map(function (p, i) {
      return '' +
      '<button class="piece" type="button" data-i="' + i + '" data-style="' + p.style + '">' +
        '<span class="tag">' + esc(t('style.' + p.style)) + '</span>' +
        '<span class="icobtn fav" role="button" tabindex="0" aria-label="' + esc(t('pf.save')) + '" data-fav>' + ICO_HEART + '</span>' +
        '<span class="shot"><img src="' + p.img + '" alt="' + esc(p.t[lang] || p.t.es) + '" loading="lazy"></span>' +
        '<span class="zoom">' + esc(t('pf.view')) + ICO_EXPAND + '</span>' +
        '<span class="piece-meta" style="display:block">' +
          '<span class="lbl" style="font-size:12px;display:block">' + esc(p.t[lang] || p.t.es) + '</span>' +
          '<span class="small" style="margin-top:6px;display:block">' + esc(t('style.' + p.style)) + ' · ' + esc(p.z[lang] || p.z.es) + '</span>' +
        '</span>' +
      '</button>';
    }).join('');
    wirePieces();
  }

  /* ============================================================
     RENDER: DISEÑOS DISPONIBLES
     ============================================================ */
  function renderDesigns() {
    var cards = window.DESIGNS.map(function (d) {
      var msg = (lang === 'en')
        ? 'Hi Oscar. I am interested in the available design "' + (d.t.en) + '". Is it still free?'
        : 'Hola Oscar. Me interesa el diseño disponible "' + (d.t.es) + '". ¿Sigue libre?';
      return '' +
      '<article class="stile">' +
        '<div class="shot" style="height:300px"><img src="' + d.img + '" alt="' + esc(d.t[lang] || d.t.es) + '" loading="lazy"></div>' +
        '<div class="stile-head" style="padding:16px;gap:12px">' +
          '<div class="stile-row"><span class="lbl" style="font-size:12px">' + esc(d.t[lang] || d.t.es) + '</span>' +
            '<span class="mprice">' + esc(d.price) + '</span></div>' +
          '<span class="small">' + esc(d.d[lang] || d.d.es) + '</span>' +
          '<a class="btn btn-sm" style="justify-content:center;margin-top:4px" target="_blank" rel="noopener" ' +
             'href="https://wa.me/' + WA + '?text=' + encodeURIComponent(msg) + '">' + esc(t('des.ask')) + '</a>' +
        '</div>' +
      '</article>';
    }).join('');

    var more = '' +
      '<article class="stile" style="border-style:dashed;display:flex;align-items:center;justify-content:center;min-height:300px">' +
        '<div style="padding:30px;text-align:center;display:flex;flex-direction:column;gap:14px;align-items:center">' +
          '<span class="lbl" style="font-size:13px">' + esc(t('des.more')) + '</span>' +
          '<p class="small" style="max-width:180px">' + esc(t('des.moreNote')) + '</p>' +
          '<button class="btn btn-sm" type="button" data-open-sheet>' + esc(t('des.moreCta')) + '</button>' +
        '</div>' +
      '</article>';

    $('#rail').innerHTML = cards + more;
    wireSheetOpeners();
    railState();
  }

  /* ============================================================
     RENDER: MERCH
     ============================================================ */
  function renderMerch() {
    $('#merchGrid').innerHTML = window.MERCH.map(function (m, i) {
      return '' +
      '<article class="mcard" data-merch="' + i + '">' +
        '<div class="shot"><img src="' + m.img + '" alt="' + esc(m.t[lang] || m.t.es) + '" loading="lazy"></div>' +
        '<div class="mcard-body">' +
          '<div class="mrow"><h3 class="lbl" style="font-size:12px">' + esc(m.t[lang] || m.t.es) + '</h3>' +
            '<span class="mprice">' + esc(m.price) + '</span></div>' +

          '<div style="display:flex;flex-direction:column;gap:7px">' +
            '<span class="eyebrow" style="font-size:9.5px">' + esc(t('merch.size')) + '</span>' +
            '<div class="sizes">' + m.sizes.map(function (s, k) {
              return '<button class="size" type="button" data-size="' + esc(s) + '" aria-pressed="' + (k === 0 ? 'true' : 'false') + '">' + esc(s) + '</button>';
            }).join('') + '</div>' +
          '</div>' +

          '<div style="display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-top:auto">' +
            '<div style="display:flex;flex-direction:column;gap:7px">' +
              '<span class="eyebrow" style="font-size:9.5px">' + esc(t('merch.qty')) + '</span>' +
              '<div class="qty">' +
                '<button type="button" data-q="-1" aria-label="-">&minus;</button>' +
                '<output data-qty>1</output>' +
                '<button type="button" data-q="1" aria-label="+">+</button>' +
              '</div>' +
            '</div>' +
            '<button class="btn btn-y btn-sm" type="button" data-order>' + ICO_WA + esc(t('merch.order')) + '</button>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
    wireMerch();
  }

  function wireMerch() {
    $$('[data-merch]').forEach(function (card) {
      var i = +card.dataset.merch, m = window.MERCH[i];

      $$('.size', card).forEach(function (b) {
        b.addEventListener('click', function () {
          $$('.size', card).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
        });
      });

      var out = $('[data-qty]', card);
      $$('[data-q]', card).forEach(function (b) {
        b.addEventListener('click', function () {
          var v = Math.max(1, Math.min(20, (+out.textContent || 1) + (+b.dataset.q)));
          out.textContent = v;
        });
      });

      $('[data-order]', card).addEventListener('click', function () {
        var size = ($('.size[aria-pressed="true"]', card) || {}).textContent || m.sizes[0];
        var qty = out.textContent;
        var msg = (lang === 'en')
          ? 'Hi Oscar. I want to order merch: ' + m.t.en + ', size ' + size + ', quantity ' + qty + '. How do we proceed?'
          : 'Hola Oscar. Quiero pedir merch: ' + m.t.es + ', talla ' + size + ', cantidad ' + qty + '. ¿Cómo hacemos?';
        window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank');
      });
    });
  }

  /* ============================================================
     RENDER: PREGUNTAS
     ============================================================ */
  function renderFaq() {
    $('#acc').innerHTML = window.FAQ.map(function (k, i) {
      return '' +
      '<div class="acc-item' + (i === 0 ? ' open' : '') + '">' +
        '<button class="acc-btn" type="button" aria-expanded="' + (i === 0) + '">' +
          '<h3 class="lbl" style="font-size:14px">' + esc(t('faq.' + k)) + '</h3><span class="acc-ico"></span>' +
        '</button>' +
        '<div class="acc-panel"><div class="in"><p class="body">' + esc(t('faq.a' + k.slice(1))) + '</p></div></div>' +
      '</div>';
    }).join('');
    wireAcc();
  }

  function wireAcc() {
    $$('.acc-item').forEach(function (item) {
      var btn = $('.acc-btn', item), panel = $('.acc-panel', item);
      function setOpen(on) {
        item.classList.toggle('open', on);
        btn.setAttribute('aria-expanded', String(on));
        panel.style.maxHeight = on ? panel.scrollHeight + 'px' : '0px';
      }
      setOpen(item.classList.contains('open'));
      btn.addEventListener('click', function () {
        var willOpen = !item.classList.contains('open');
        $$('.acc-item').forEach(function (o) {
          if (o !== item) {
            o.classList.remove('open');
            $('.acc-btn', o).setAttribute('aria-expanded', 'false');
            $('.acc-panel', o).style.maxHeight = '0px';
          }
        });
        setOpen(willOpen);
      });
    });
  }

  /* ============================================================
     FILTRO
     ============================================================ */
  var curFilter = 'all';
  function applyFilter(f, silent) {
    curFilter = f;
    var pieces = $$('.piece'), shown = 0;
    pieces.forEach(function (p) {
      var hit = (f === 'all' || p.dataset.style === f);
      p.classList.toggle('hide', !hit);
      if (hit) shown++;
    });
    $$('.chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.filter === f)); });
    $('#tally').textContent = (f === 'all')
      ? shown + ' ' + t('pf.pieces')
      : shown + ' ' + (shown === 1 ? t('pf.piece') : t('pf.pieces')) + ' ' + t('pf.in') + ' ' + t('style.' + f).toLowerCase();
    $('#empty').hidden = shown !== 0;
    if (!silent) { /* nada extra */ }
  }
  $$('.chip').forEach(function (c) {
    c.addEventListener('click', function () { applyFilter(c.dataset.filter); });
  });
  $$('[data-filter="all"]', $('#empty')).forEach(function (b) {
    b.addEventListener('click', function () { applyFilter('all'); });
  });

  /* ---- saltos con filtro ---- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-jump]') : null;
    if (!el) return;
    e.preventDefault();
    closeMega(); closeDrawer();
    applyFilter(el.dataset.jump);
    var y = $('#portafolio').getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });

  /* ============================================================
     FAVORITOS
     ============================================================ */
  var favs = 0;
  function toggleFav(el) {
    el.classList.toggle('on');
    favs += el.classList.contains('on') ? 1 : -1;
    $('#favCount').textContent = favs;
    $('#favCount').classList.toggle('show', favs > 0);
    toast(el.classList.contains('on') ? t('toast.saved') : t('toast.removed'));
  }
  $('#favBtn').addEventListener('click', function () {
    toast(favs ? favs + ' ' + t('toast.savedCount') : t('toast.savedNone'));
  });

  /* ============================================================
     LIGHTBOX
     ============================================================ */
  var lb = $('#lb'), visible = [], cur = 0;

  function fill(i) {
    var idx = visible[i]; if (idx === undefined) return;
    var p = window.PIECES[idx];
    cur = i;
    $('#lbImg').src = p.img;
    $('#lbImg').alt = p.t[lang] || p.t.es;
    $('#lbTitle').textContent    = p.t[lang] || p.t.es;
    $('#lbStyle').textContent    = t('style.' + p.style);
    $('#lbZone').textContent     = p.z[lang] || p.z.es;
    $('#lbSessions').textContent = p.s[lang] || p.s.es;
    $('#lbTime').textContent     = p.h;
    $('#lbIndex').textContent    = String(i + 1).padStart(2, '0') + ' / ' + String(visible.length).padStart(2, '0');
    $('#lbCta').dataset.msg = (lang === 'en')
      ? 'Hi Oscar. I saw "' + p.t.en + '" in your portfolio and I want something along those lines — ' +
        t('style.' + p.style).toLowerCase() + ', on the ' + (p.z.en || '').toLowerCase() + '. Could you tell me price and availability?'
      : 'Hola Oscar. Vi "' + p.t.es + '" en tu portafolio y quiero algo en esa línea — ' +
        t('style.' + p.style).toLowerCase() + ', en ' + (p.z.es || '').toLowerCase() + '. ¿Me cuentas precio y disponibilidad?';
  }
  function openLb(btn) {
    visible = $$('.piece').filter(function (x) { return !x.classList.contains('hide'); })
                          .map(function (x) { return +x.dataset.i; });
    fill(visible.indexOf(+btn.dataset.i));
    lb.hidden = false;
    requestAnimationFrame(function () { lb.classList.add('open'); });
    document.body.classList.add('locked');
    $('#lbClose').focus();
  }
  function closeLb() {
    lb.classList.remove('open');
    document.body.classList.remove('locked');
    setTimeout(function () { lb.hidden = true; }, 360);
  }
  function step(d) { if (visible.length) fill((cur + d + visible.length) % visible.length); }

  function wirePieces() {
    $$('.piece').forEach(function (p) {
      p.addEventListener('click', function () { openLb(p); });
    });
    $$('[data-fav]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.stopPropagation(); toggleFav(el); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); toggleFav(el); }
      });
    });
  }
  $('#lbClose').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', function () { step(-1); });
  $('#lbNext').addEventListener('click', function () { step(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  $('#lbCta').addEventListener('click', function () {
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(this.dataset.msg || ''), '_blank');
  });

  /* ============================================================
     COTIZADOR
     ============================================================ */
  var sel = { style: '', zone: '', size: '', refs: 0 };

  function renderSheetOpts() {
    $('#optStyle').innerHTML = window.STYLES.map(function (s) {
      return '<button class="opt" type="button" data-v="' + s.key + '" aria-pressed="' +
             (sel.style === s.key) + '">' + esc(t('style.' + s.key)) + '</button>';
    }).join('');
    $('#optZone').innerHTML = window.ZONES.map(function (z) {
      return '<button class="opt" type="button" data-v="' + z + '" aria-pressed="' +
             (sel.zone === z) + '">' + esc(t('zone.' + z)) + '</button>';
    }).join('');
    wireOpts('#optStyle', 'style');
    wireOpts('#optZone', 'zone');
  }
  function wireOpts(id, key) {
    $$('.opt', $(id)).forEach(function (o) {
      o.addEventListener('click', function () {
        var was = o.getAttribute('aria-pressed') === 'true';
        $$('.opt', $(id)).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        o.setAttribute('aria-pressed', String(!was));
        sel[key] = was ? '' : o.dataset.v;
        refreshSheet();
      });
    });
  }

  function buildMsg() {
    if (!sel.style && !sel.zone && !sel.size) return '';
    var parts = [];
    if (lang === 'en') {
      var s = 'Hi Oscar. I want to get a tattoo';
      if (sel.style) s += ' in ' + t('style.' + sel.style).toLowerCase();
      if (sel.zone)  s += ', on the ' + t('zone.' + sel.zone).toLowerCase();
      if (sel.size)  s += ', about ' + sel.size;
      s += '.';
      parts.push(s);
      if (sel.refs) parts.push('I have ' + sel.refs + ' reference image' + (sel.refs > 1 ? 's' : '') + ' to send you.');
      parts.push('Could you give me a quote?');
    } else {
      var e = 'Hola Oscar. Quiero hacerme un tatuaje';
      if (sel.style) e += ' de ' + t('style.' + sel.style).toLowerCase();
      if (sel.zone)  e += ', en ' + t('zone.' + sel.zone).toLowerCase();
      if (sel.size)  e += ', de aproximadamente ' + sel.size;
      e += '.';
      parts.push(e);
      if (sel.refs) parts.push('Tengo ' + sel.refs + ' referencia' + (sel.refs > 1 ? 's' : '') + ' para enviarte.');
      parts.push('¿Me ayudas con la cotización?');
    }
    return parts.join('\n');
  }
  function refreshSheet() {
    var m = buildMsg(), pv = $('#preview');
    pv.textContent = m || t('sheet.empty');
    $('#sheetSend').href = 'https://wa.me/' + WA + (m ? '?text=' + encodeURIComponent(m) : '');
  }

  $('#sizeInp').addEventListener('input', function () {
    sel.size = this.value.trim();
    refreshSheet();
  });
  $('#refsInp').addEventListener('change', function () {
    sel.refs = this.files ? this.files.length : 0;
    $('#refsOut').textContent = sel.refs
      ? sel.refs + ' ' + t('sheet.selected')
      : t('sheet.refsNone');
    refreshSheet();
  });

  var sheet = $('#sheet'), fab = $('#fab');
  function openSheet()  { sheet.classList.add('open');    fab.classList.add('gone'); }
  function closeSheet() { sheet.classList.remove('open'); fab.classList.remove('gone'); }
  function wireSheetOpeners() {
    $$('[data-open-sheet]').forEach(function (b) {
      if (b.dataset.wired) return;
      b.dataset.wired = '1';
      b.addEventListener('click', function () { closeDrawer(); openSheet(); });
    });
  }
  $('#sheetClose').addEventListener('click', closeSheet);

  /* ============================================================
     MEGA / DRAWER / SCROLL / VARIOS
     ============================================================ */
  var megaBtn = $('#megaBtn'), mega = $('#mega');
  function openMega()  { mega.classList.add('open');    megaBtn.setAttribute('aria-expanded', 'true'); }
  function closeMega() { mega.classList.remove('open'); megaBtn.setAttribute('aria-expanded', 'false'); }
  megaBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    mega.classList.contains('open') ? closeMega() : openMega();
  });
  document.addEventListener('click', function (e) {
    if (!mega.contains(e.target) && !megaBtn.contains(e.target)) closeMega();
  });

  var drawer = $('#drawer'), drawerBtn = $('#drawerBtn');
  function openDrawer()  { drawer.classList.add('open');    drawerBtn.setAttribute('aria-expanded', 'true');  document.body.classList.add('locked'); }
  function closeDrawer() { drawer.classList.remove('open'); drawerBtn.setAttribute('aria-expanded', 'false'); document.body.classList.remove('locked'); }
  drawerBtn.addEventListener('click', openDrawer);
  $$('[data-close-drawer]').forEach(function (b) { b.addEventListener('click', closeDrawer); });

  var bar = $('#progress'), hdr = $('#hdr'), totop = $('#totop');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    hdr.classList.toggle('stuck', y > 40);
    totop.classList.toggle('show', y > 900);
    if (y > 140) closeMega();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  totop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  var rail = $('#rail'), rprev = $('#railPrev'), rnext = $('#railNext');
  function railState() {
    rprev.disabled = rail.scrollLeft < 8;
    rnext.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
  }
  rprev.addEventListener('click', function () { rail.scrollBy({ left: -rail.clientWidth * 0.7, behavior: 'smooth' }); });
  rnext.addEventListener('click', function () { rail.scrollBy({ left:  rail.clientWidth * 0.7, behavior: 'smooth' }); });
  rail.addEventListener('scroll', railState, { passive: true });

  var toastBox = $('#toasts');
  function toast(msg) {
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7"/></svg><span></span>';
    $('span', el).textContent = msg;
    toastBox.appendChild(el);
    setTimeout(function () { el.classList.add('out'); setTimeout(function () { el.remove(); }, 320); }, 2400);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeLb(); closeSheet(); closeDrawer(); closeMega(); closeGate(); }
    if (!lb.hidden && lb.classList.contains('open')) {
      if (e.key === 'ArrowLeft')  step(-1);
      if (e.key === 'ArrowRight') step(1);
    }
  });

  /* ============================================================
     ARRANQUE
     ============================================================ */
  buildLangUI();

  var saved = null;
  try { saved = localStorage.getItem(LS_KEY); } catch (e) {}
  if (saved && window.I18N[saved]) {
    setLang(saved, false);
  } else {
    var nav = (navigator.language || 'es').slice(0, 2);
    setLang(window.I18N[nav] ? nav : 'es', false);
    openGate();
  }

  wireSheetOpeners();
  onScroll();
  railState();

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.06 });
    $$('.rev').forEach(function (el) { io.observe(el); });
  } else {
    $$('.rev').forEach(function (el) { el.classList.add('in'); });
  }
})();
