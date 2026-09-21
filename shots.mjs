import { chromium } from 'playwright-core';
import path from 'node:path';
import fs from 'node:fs';

const out = 'previews';
fs.mkdirSync(out, { recursive: true });
const URL = 'http://localhost:5173';

const browser = await chromium.launch({ channel: 'chrome' });
const errors = [];
const notes = [];

async function page(w, h, opts = {}) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h }, deviceScaleFactor: opts.dpr ?? 2,
    isMobile: opts.mobile ?? false, hasTouch: opts.mobile ?? false,
    locale: opts.locale ?? 'es-CO',
  });
  const p = await ctx.newPage();
  p.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  p.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
  await p.goto(URL, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  await p.waitForTimeout(400);
  return { ctx, p };
}
const reveal = p => p.evaluate(() => document.querySelectorAll('.rev').forEach(e => e.classList.add('in')));
const pickEs = p => p.evaluate(() => document.querySelector('#langbtns [data-lang="es"]').click());

/* ---------- 1. puerta de idioma ---------- */
{
  const { ctx, p } = await page(1440, 900);
  await p.waitForTimeout(600);
  const open = await p.evaluate(() => document.getElementById('langgate').classList.contains('open'));
  notes.push('puerta de idioma visible al abrir: ' + open);
  await p.screenshot({ path: `${out}/01-idioma.png` });
  await ctx.close();
}

/* ---------- 2. hero + pagina completa (ES) ---------- */
{
  const { ctx, p } = await page(1440, 900);
  await pickEs(p); await p.waitForTimeout(500);
  await p.screenshot({ path: `${out}/02-hero.png` });
  await reveal(p); await p.waitForTimeout(700);
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  notes.push('altura de la pagina: ' + h + ' px');
  await p.screenshot({ path: `${out}/03-completo.png`, fullPage: true });
  await ctx.close();

  const ctx1 = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const p1 = await ctx1.newPage();
  await p1.goto(URL, { waitUntil: 'networkidle' });
  await p1.evaluate(() => document.fonts.ready);
  await p1.evaluate(() => document.querySelector('#langbtns [data-lang="es"]').click());
  await p1.evaluate(() => document.querySelectorAll('.rev').forEach(e => e.classList.add('in')));
  await p1.waitForTimeout(800);
  await p1.screenshot({ path: `${out}/03-completo-1x.png`, fullPage: true });
  await ctx1.close();
}

/* ---------- 3. mega dropdown de portafolio ---------- */
{
  const { ctx, p } = await page(1440, 900);
  await pickEs(p);
  await p.click('#megaBtn');
  await p.waitForTimeout(800);
  const mh = await p.evaluate(() => document.getElementById('mega').getBoundingClientRect().height);
  notes.push('alto del mega dropdown: ' + Math.round(mh) + ' px');
  await p.screenshot({ path: `${out}/04-mega-portafolio.png` });
  await ctx.close();
}

/* ---------- 4. filtro ---------- */
{
  const { ctx, p } = await page(1440, 1000);
  await pickEs(p); await reveal(p);
  await p.click('[data-filter="minimal"]');
  await p.waitForTimeout(500);
  await p.locator('#portafolio').scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  const n = await p.evaluate(() => document.querySelectorAll('.piece:not(.hide)').length);
  const tally = await p.evaluate(() => document.getElementById('tally').textContent);
  notes.push('filtro minimalista -> ' + n + ' piezas · contador: "' + tally + '"');
  await p.screenshot({ path: `${out}/05-filtro.png` });
  await ctx.close();
}

/* ---------- 5. lightbox ---------- */
{
  const { ctx, p } = await page(1440, 900);
  await pickEs(p); await reveal(p);
  await p.locator('.piece').first().click();
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${out}/06-lightbox.png` });
  await ctx.close();
}

/* ---------- 6. cotizador completo ---------- */
{
  const { ctx, p } = await page(1440, 980);
  await pickEs(p);
  await p.click('#fab');
  await p.click('#optStyle .opt[data-v="blackwork"]');
  await p.click('#optZone .opt[data-v="ribs"]');
  await p.fill('#sizeInp', '18 cm de alto');
  await p.waitForTimeout(500);
  const msg = await p.evaluate(() => document.getElementById('preview').textContent);
  notes.push('mensaje del cotizador:\n  ' + msg.replace(/\n/g, '\n  '));
  await p.screenshot({ path: `${out}/07-cotizador.png` });
  await ctx.close();
}

/* ---------- 7. merch ---------- */
{
  const { ctx, p } = await page(1440, 1000);
  await pickEs(p); await reveal(p);
  await p.locator('#merch').scrollIntoViewIfNeeded();
  await p.locator('.mcard').first().locator('.size[data-size="L"]').click();
  await p.locator('.mcard').first().locator('[data-q="1"]').click();
  await p.waitForTimeout(400);
  const q = await p.evaluate(() => document.querySelector('.mcard [data-qty]').textContent);
  notes.push('merch: talla L seleccionada, cantidad ' + q);
  await p.screenshot({ path: `${out}/08-merch.png` });
  await ctx.close();
}

/* ---------- 8. preguntas ---------- */
{
  const { ctx, p } = await page(1440, 1000);
  await pickEs(p); await reveal(p);
  await p.locator('#preguntas').scrollIntoViewIfNeeded();
  await p.locator('.acc-btn').nth(5).click();
  await p.waitForTimeout(700);
  await p.locator('#preguntas').scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${out}/09-preguntas.png` });
  await ctx.close();
}

/* ---------- 9. contacto ---------- */
{
  const { ctx, p } = await page(1440, 900);
  await pickEs(p); await reveal(p);
  await p.locator('#contacto').scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${out}/10-contacto.png` });
  await ctx.close();
}

/* ---------- 10. sobre mi ---------- */
{
  const { ctx, p } = await page(1440, 900);
  await pickEs(p); await reveal(p);
  await p.locator('#sobre').scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${out}/11-sobre-mi.png` });
  await ctx.close();
}

/* ---------- 11. version en ingles ---------- */
{
  const { ctx, p } = await page(1440, 900);
  await p.evaluate(() => document.querySelector('#langbtns [data-lang="en"]').click());
  await reveal(p); await p.waitForTimeout(600);
  const faq = await p.evaluate(() => document.querySelector('.acc-btn h3').textContent);
  notes.push('ingles activo, primera pregunta: "' + faq + '"');
  await p.locator('#preguntas').scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${out}/12-english.png` });
  await ctx.close();
}

/* ---------- 12. movil ---------- */
{
  const { ctx, p } = await page(390, 844, { mobile: true });
  await pickEs(p); await p.waitForTimeout(500);
  await p.screenshot({ path: `${out}/13-movil-hero.png` });
  await reveal(p); await p.waitForTimeout(600);
  await p.screenshot({ path: `${out}/14-movil-completo.png`, fullPage: true });
  await p.evaluate(() => { window.scrollTo(0, 0); document.getElementById('drawerBtn').click(); });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${out}/15-movil-menu.png` });
  await ctx.close();
}

await browser.close();

console.log('--- comprobaciones ---');
notes.forEach(n => console.log('• ' + n));
console.log('\n--- errores de consola ---');
console.log(errors.length ? errors.join('\n') : 'ninguno');
