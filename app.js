/* DealsBot Mini App – polished UI mirroring AutoDealsBot layout (own brand). */
const tg = window.Telegram && Telegram.WebApp;
if (tg) {
  tg.ready(); tg.expand();
  try { tg.setHeaderColor("secondary_bg_color"); tg.setBackgroundColor("bg_color"); } catch (_) {}
  const p = tg.themeParams || {};
  const root = document.documentElement.style;
  if (p.bg_color) root.setProperty("--bg", p.bg_color);
  if (p.secondary_bg_color) root.setProperty("--bg2", p.secondary_bg_color);
  if (p.section_bg_color || p.secondary_bg_color) root.setProperty("--card", p.section_bg_color || p.secondary_bg_color);
  if (p.text_color) root.setProperty("--tx", p.text_color);
  if (p.hint_color) root.setProperty("--hint", p.hint_color);
  if (p.link_color) root.setProperty("--link", p.link_color);
  if (p.button_color) root.setProperty("--btn", p.button_color);
  if (p.button_text_color) root.setProperty("--btntx", p.button_text_color);
  if (p.section_separator_color) root.setProperty("--sep", p.section_separator_color);
}
const D = window.DB_DEFAULTS;
const clone = o => JSON.parse(JSON.stringify(o));
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const eur = x => x == null || x === "" ? "—" : Number(x).toFixed(2).replace(".", ",") + "€";
const DAYL = {def:"Def",mon:"Lun",tue:"Mar",wed:"Mer",thu:"Gio",fri:"Ven",sat:"Sab",sun:"Dom"};
const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  publish: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
  explore: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 6.5L7 17l2.5-6.5L16 8z"/></svg>',
  posts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m9 6 6 6-6 6"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m15 6-6 6 6 6"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h7l-1 8 10-14h-7l1-6z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16l-6 8v5l-4 2v-7L4 5z"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-2.6-6.2"/><path d="M21 3v6h-6"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
  factory: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 21h20V10l-6 4V10l-6 4V5H2v16z"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12 12 4H4v8l8 8 8-8z"/><circle cx="8" cy="8" r="1.5"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>',
  kb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12"/></svg>',
  img: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="m21 16-5-5-4 4-2-2-5 5"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.2"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.2-1.2"/></svg>',
  sliders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M2 14h4M10 8h4M18 16h4"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m5 13 4 4L19 7"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6.2 5.5 5.5 0 0 1 21.5 12C19 16.4 12 21 12 21z"/></svg>',
  rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 19c2-1 4.5-1.5 6.5-3.5 4-4 5-10 5-10s-6 1-10 5C4.5 12.5 4 15 3 17l2 2z"/><path d="M12 8 9.5 5.5M15 15l2.5 2.5M5 15l-2 4 4-2"/></svg>',
  store: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10 6 4h12l2 6"/><path d="M4 10v10h16V10"/><path d="M9 20v-6h6v6"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 1 1 18 0z"/></svg>',
};
document.querySelectorAll("#tabs [data-i]").forEach(el => { el.innerHTML = ICONS[el.dataset.i] || ""; });

function b64(s){ s=s.replace(/-/g,"+").replace(/_/g,"/"); while(s.length%4) s+="="; return Uint8Array.from(atob(s), c=>c.charCodeAt(0)); }
async function loadSnap(){
  const h = location.hash;
  try {
    let m = /[#&]z=([^&]+)/.exec(h);
    if (m) {
      const ds = new DecompressionStream("deflate-raw");
      const buf = await new Response(new Blob([b64(m[1])]).stream().pipeThrough(ds)).arrayBuffer();
      return JSON.parse(new TextDecoder().decode(buf));
    }
    m = /[#&]s=([^&]+)/.exec(h);
    if (m) return JSON.parse(new TextDecoder().decode(b64(m[1])));
  } catch (e) { console.warn(e); }
  const demo = {
    v:1, bot:"DealsBot", mode:"prova", paused:false, cid:"_default", chs:[], p:{}, next:"05/11 01:04",
    posted:[[ "B01M01K39E","Skechers Graceful",30.99, Math.floor(Date.now()/1000)-3600 ]],
    drafts:[], n_posted24:12,
    explore:[
      ["B01M01K39E","Puma Cassia 2.0 Scarpe da ginnastica Donna",42.00,69.95,40,"normal",4.3,"https://m.media-amazon.com/images/I/71nF8uE8nOL._AC_UL160_.jpg"],
      ["B0TEST0002","Tommy Hilfiger Felpa con Cappuccio Uomo",48.89,99.90,51,"coupon",4.5,"https://m.media-amazon.com/images/I/71Q1zqS3QJL._AC_UL160_.jpg"],
      ["B0TEST0003","JBL Tune Flex Auricolari True Wireless",45.69,99.99,54,"error",4.4,"https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_UL160_.jpg"],
      ["B0TEST0004","New Era Cappellino 9FORTY",16.99,25.99,35,"normal",4.6,"https://m.media-amazon.com/images/I/61bX2hQ3pFL._AC_UL160_.jpg"],
      ["B0TEST0005","Collana in Argento 925",12.68,16.90,25,"warehouse",4.2,"https://m.media-amazon.com/images/I/61pA6My6BCL._AC_UL160_.jpg"],
    ],
    demo:true
  };
  if (tg && tg.initData) { demo.explore = []; demo.posted = []; demo.n_posted24 = 0; }
  return demo;
}
function unpackSlots(p){
  if (!p.slots) return;
  for (const d in p.slots)
    if (typeof p.slots[d] === "string")
      p.slots[d] = (p.slots[d].match(/.{4}/g) || []).map(x => x.slice(0,2) + ":" + x.slice(2));
}
function merged(diff){ const p = clone(D.DEFAULT); Object.assign(p, clone(diff||{})); unpackSlots(p); if (!p.slots) p.slots = {def:[]}; return p; }
function packSlots(slots){ const z = {}; for (const d in slots) z[d] = (slots[d]||[]).map(s => String(s).replace(":","")).join(""); return z; }
function changes(){
  const out = {};
  for (const k in P) if (JSON.stringify(P[k]) !== JSON.stringify(P0[k])) out[k] = (k === "slots" ? packSlots(P[k]) : P[k]);
  return out;
}

let S, P0, P, mode, paused, tab = "home", screen = "home", day = "def", fmtKey = "lightning", tagKey = "reviews";
let exploreTab = "possible", action = null, editKey = null;

function dirty(){
  const n = Object.keys(changes()).length + (mode !== S.mode) + (paused !== !!S.paused) + (action ? 1 : 0);
  $("#savebar").hidden = !n;
  $("#dirty").textContent = action ? "Azione pronta da inviare" : (n + " modifiche da salvare");
}
function chName(){ return (S.chs.find(c => c[0] === S.cid) || [S.cid, P.name || "Profilo prova"])[1]; }
function chHandle(){ const id = S.cid; return id.startsWith("@") ? id : (id === "_default" ? "@dealsbot" : id.slice(0,12) + "…"); }
function setupPct(){
  let s = 0;
  if (S.cid !== "_default") s += 25;
  if ((P.tags_aff||{}).it) s += 25;
  if ((P.categories||[]).length) s += 25;
  if (((P.slots||{}).def||[]).length) s += 25;
  return s;
}
function slotsOf(d){ return P.slots[d] || (d === "def" ? [] : null); }
function todaySlots(){
  const keys = ["sun","mon","tue","wed","thu","fri","sat"];
  return slotsOf(keys[new Date().getDay()]) || P.slots.def || [];
}
function nextSlotLabel(){ return S.next || "—"; }
function activeTypes(){ return D.DEAL_TYPES.filter(t => P.deal_types[t]).join(", "); }
function filterSummary(){
  const mx = P.max_price == null ? "∞" : ("€" + P.max_price);
  return `€${P.min_price} - €${mx} · ${P.min_discount}% - ${P.max_discount}%`;
}
function catSummary(){
  const c = P.categories || [];
  if (!c.length) return "Nessuna";
  if (c.length <= 2) return c.join(", ");
  return c.slice(0,2).join(", ") + " +" + (c.length - 2);
}

const row = (ico, color, title, sub, data, right) =>
  `<button type="button" class="row" ${data||""}>
    <span class="ico ${color}">${ICONS[ico]}</span>
    <span class="body"><b>${title}</b>${sub != null && sub !== "" ? `<span class="sub">${sub}</span>` : ""}</span>
    ${right || `<span class="chev">${ICONS.chev}</span>`}
  </button>`;
const sw = (id, on) => `<label class="sw"><input type="checkbox" data-sw="${id}" ${on?"checked":""}><span></span></label>`;

function topbar(){
  const el = $("#topbar");
  if (screen === "home" || (screen === "settings" && tab === "settings" && !editKey && screen === "settings")) {
    /* home handled in view; settings root has special header */
  }
  if (tab === "home" && screen === "home") {
    el.innerHTML = `<div class="brand"><img class="logo" src="logo.svg" alt=""><div><h1>${esc(S.bot)}</h1><div class="sub">pannello offerte</div></div></div>
      <div class="ch"><b>${esc(chName())}</b><span>${esc(chHandle())}</span></div>`;
    return;
  }
  if (tab === "settings" && screen === "settings" && !editKey) {
    el.innerHTML = `<div class="brand"><img class="logo" src="logo.svg" alt=""><div><h1>${esc(S.bot)}</h1><div class="sub">Impostazioni</div></div></div>
      <div class="ch"><b>${esc(chName())}</b><span>${esc(chHandle())}</span></div>`;
    return;
  }
  const titles = {
    auto: "🇮🇹 Amazon · Autoposting IT",
    stores: "Store",
    slots: "Orari",
    types: "Tipi di offerta",
    filters: "Filtri",
    cats: "Categorie",
    sellers: "Venditori",
    manufacturers: "Produttori",
    general: "Impostazioni generali",
    formats: "Formati",
    tags: "Tag",
    keyboard: "Tastiera",
    media: "Media",
    affiliate: "Tag affiliati",
    publish: "Pubblica",
    explore: "Esplora",
    posts: "Post",
  };
  const backTo = {
    auto:"home", stores:"auto", slots:"auto", types:"auto", filters:"auto", cats:"auto", sellers:"auto", manufacturers:"auto",
    general:"settings", formats:"settings", tags:"settings", keyboard:"settings", media:"settings", affiliate:"settings",
  };
  const t = titles[screen] || S.bot;
  const b = backTo[screen];
  el.innerHTML = `<div class="left">${b ? `<button type="button" class="back" data-nav="${b}">${ICONS.back} Indietro</button>` : `<div class="brand"><img class="logo" src="logo.svg" alt=""><div><h1>${esc(S.bot)}</h1></div></div>`}</div>
    <div class="ch"><b>${esc(chName())}</b><span>${esc(chHandle())}</span></div>`;
  // page title sits in the view for detail screens
  el.dataset.title = t;
}

const V = {
  home(){
    const sp = setupPct(), slots = todaySlots(), next = (slots[0] || "—");
    const circ = 2 * Math.PI * 22, off = circ * (1 - sp/100);
    return `<div class="sheet">
      <div class="card pad0 grad-blue" style="margin-bottom:10px">
        <div class="banner">
          <div class="big">${(S.explore||[]).length} post in coda</div>
          <div class="gauge">
            <svg width="56" height="56" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="5"/>
              <circle cx="28" cy="28" r="22" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"
                stroke-dasharray="${circ}" stroke-dashoffset="${off}"/>
            </svg>
            <span>${sp}%</span>
          </div>
        </div>
      </div>
      <div class="act-row">
        <button type="button" class="btn orange" data-nav="auto"><span>⚡ Autoposting</span><span>${ICONS.chev}</span></button>
        <button type="button" class="btn muted" data-tab="settings"><span>⚙️ Impostazioni</span><span>${ICONS.chev}</span></button>
      </div>
      <div class="grid2">
        <div class="card hero grad-blue" style="margin:0">
          <span class="badge">v1</span>
          <div>
            <div style="font-size:26px;margin-bottom:6px;line-height:1">🚀</div>
            <h3>Pubblica in automatico</h3>
            <p>Offerte Amazon sul canale, senza intervento.</p>
          </div>
          <button type="button" class="btn" data-nav="auto">Gestisci</button>
        </div>
        <div class="card hero grad-purple" style="margin:0">
          <span class="badge">Gratis</span>
          <div>
            <div style="font-size:22px;margin-bottom:4px">✨</div>
            <h3>Mini-app gratuita</h3>
            <p>Pannello completo, senza costi né abbonamento.</p>
          </div>
          <button type="button" class="btn" data-tab="explore">Esplora</button>
        </div>
      </div>
      <div class="sec">Panoramica</div>
      <div class="list">
        ${row("cal","i-blue","Programmati", null, "", `<span class="val">${slots.length}</span>`)}
        ${row("check","i-green","Pubblicati", "ultime 24 ore", "", `<span class="val">${S.n_posted24??0}</span>`)}
        ${row("bolt","i-orange","Autoposting", null, "", `<span class="val">${P.enabled && !paused ? "1 attivo" : "spento"}</span>`)}
        ${row("chat","i-cyan","Modalità", null, "", `<span class="pill ${mode==="live"?"live":"prova"}">${mode==="live"?"LIVE":"PROVA"}</span>`)}
        ${row("tag","i-purple","Aggiornamento prezzi", P.update_prices ? "attivo" : "disattivo", "", `<span class="val">${P.update_prices?"ON":"OFF"}</span>`)}
        ${row("heart","i-purple","Il mio piano", null, "", `<span class="pill plan">Gratis ✨</span>`)}
      </div>
      <div class="sec">Orari di oggi</div>
      <div class="card"><div class="sched">${slots.slice(0,8).map(s=>`<span class="slot-pill">${s}</span>`).join("")}${slots.length>8?`<span class="slot-pill">+${slots.length-8}</span>`:""}</div>
        <div class="hint" style="margin:10px 0 0">Prossimo: <b>${esc(nextSlotLabel())}</b></div></div>
      ${inTG() && !canSendData() ? `<div class="card" style="border:1px solid rgba(245,158,11,.35)"><b>ℹ️ Aperta dal menu</b><div class="hint" style="margin:6px 0 0">Le azioni vengono inviate con un link al bot. Per un invio garantito usa il pulsante <b>📱 Mini-app</b> della tastiera sotto la chat (scrivi /start se non lo vedi).</div></div>` : ""}
      ${S.demo ? (inTG()
        ? `<div class="card" style="text-align:center"><b>Dati non caricati</b><div class="hint" style="margin:6px 0 10px">Il bot non ha ancora inviato lo stato attuale.</div><button type="button" class="btn primary" data-sync>🔄 Carica dati</button></div>`
        : `<div class="warn">Anteprima locale · dati di esempio (nessuno snapshot nel link).</div>`) : ""}
    </div>`;
  },
  auto(){
    return `<div class="sheet">
      <h2 style="margin:0 0 4px;font-size:22px;letter-spacing:-.02em">🇮🇹 Amazon · Autoposting IT</h2>
      <div class="hint" style="margin-bottom:12px">${(S.explore||[]).length}+ prodotti disponibili</div>
      <div class="list">
        <div class="row">
          <span class="body"><b>Abilita Autoposting</b><span class="sub">Prossimo post: ${esc(nextSlotLabel())} (noisy)</span></span>
          <span class="right">${sw("enabled", !!P.enabled)}</span>
        </div>
      </div>
      <div class="sec">Orari</div>
      <div class="list">
        ${row("clock","i-blue","Orari", `${(P.slots.def||[]).length} slot configurati`, `data-nav="slots"`)}
      </div>
      <div class="sec">Filtri</div>
      <div class="list">
        ${row("bolt","i-orange","Tipi di offerta", esc(activeTypes()), `data-nav="types"`)}
        ${row("filter","i-purple","Filtri", esc(filterSummary()), `data-nav="filters"`)}
        ${row("grid","i-green","Categorie", esc(catSummary()), `data-nav="cats"`)}
      </div>
      <div class="sec">Rotazione e venditori</div>
      <div class="list">
        ${row("refresh","i-purple","Rotazione categorie", P.category_rotation ? "Attiva" : "Disattivata", `data-nav="cats"`)}
        ${row("user","i-pink","Venditori", `${P.sellers_mode}: ${(P.sellers||[]).length} elementi`, `data-nav="sellers"`)}
        ${row("factory","i-slate","Produttori", P.manufacturers_filter ? `${(P.manufacturers||[]).length} elementi` : "Disattivato", `data-nav="manufacturers"`)}
      </div>
      <div class="sec">Store</div>
      <div class="list">
        ${row("store","i-indigo","Store attivi", "Amazon IT", `data-nav="stores"`)}
      </div>
      <div class="list" style="margin-top:12px">
        <div class="row">
          <span class="body"><b>Autoposting globale</b><span class="sub">${paused?"In pausa":"Attivo"}</span></span>
          <span class="right">${sw("_paused", !paused)}</span>
        </div>
        <div class="row">
          <span class="body"><b>Ruota marca</b><span class="sub">Evita due prodotti della stessa marca di fila</span></span>
          <span class="right">${sw("rotate_brand", !!P.rotate_brand)}</span>
        </div>
      </div>
    </div>`;
  },
  stores(){
    return `<div class="sheet">
      <h2 style="margin:0 0 2px;font-size:22px">Store</h2>
      <div class="hint" style="margin-bottom:12px">1 store attivo</div>
      <div class="list">
        <div class="row" style="align-items:flex-start">
          <span style="font-size:22px;line-height:34px">🇮🇹</span>
          <span class="body" style="padding-top:6px"><b>Amazon IT</b><span class="sub">Amazon IT</span>
            <div style="margin-top:12px">
              <div class="field" style="padding:0;border:0">
                <label>Obiettivo giornaliero</label>
                <div style="display:flex;align-items:center;gap:8px">
                  <button type="button" class="btn ghost sm" data-step="per_slot:-1">−</button>
                  <input type="number" data-num="per_slot" value="${P.per_slot}" style="text-align:center;width:64px;background:var(--bg2);border:1px solid var(--sep);border-radius:10px;padding:8px">
                  <button type="button" class="btn ghost sm" data-step="per_slot:1">+</button>
                </div>
              </div>
              <div class="row" style="padding:10px 0 0;border:0">
                <span class="body"><b>No consecutivi</b><span class="sub">Ruota marca</span></span>
                ${sw("rotate_brand", !!P.rotate_brand)}
              </div>
            </div>
          </span>
          <span class="right">${sw("enabled", !!P.enabled)}</span>
        </div>
        ${[["🇺🇸","Amazon COM"],["🇬🇧","Amazon CO.UK"],["🇩🇪","Amazon DE"],["🇫🇷","Amazon FR"],["🇪🇸","Amazon ES"],["🇨🇳","AliExpress IT"]].map(([f,n])=>`
          <div class="row"><span style="font-size:20px">${f}</span><span class="body"><b>${n}</b><span class="sub">${n}</span></span>
          <span class="right"><label class="sw"><input type="checkbox" disabled><span></span></label></span></div>`).join("")}
      </div>
      <div class="hint">Solo Amazon IT è attivo in questa versione gratuita.</div>
    </div>`;
  },
  slots(){
    const sl = slotsOf(day), own = sl !== null, list = own ? sl : (P.slots.def || []);
    return `<div class="sheet">
      <h2 style="margin:0 0 8px;font-size:22px">Orari</h2>
      <div class="legend"><span><i class="dot noisy"></i>Noisy</span><span><i class="dot silent"></i>Silent</span>
        <span style="margin-left:auto">±${P.jitter_min||0} min · Europe/Rome</span></div>
      <div class="chips" style="margin-bottom:10px">
        ${D.DAYS.map(d => {
          const n = (d==="def" ? (P.slots.def||[]).length : (P.slots[d] ? P.slots[d].length : null));
          return `<button type="button" class="chip ${d===day?"on":""}" data-day="${d}">${DAYL[d]}<small>${n==null?"–":n}</small></button>`;
        }).join("")}
      </div>
      <div class="list" style="margin-bottom:10px">
        <div class="row"><span class="body"><b>Modalità</b><span class="sub">${P.schedule_mode==="interval"?"Intervallo fisso":"Slot orari (noisy)"}</span></span>
          <span class="right"><button type="button" class="btn soft sm" data-smode="${P.schedule_mode==="interval"?"slots":"interval"}">${P.schedule_mode==="interval"?"→ Slot":"→ Intervallo"}</button></span></div>
        ${P.schedule_mode==="interval"?`<div class="field"><label>Ogni quanti minuti</label><input type="number" data-num="interval_min" value="${P.interval_min}"></div>`:""}
        <div class="field"><label>Rumore ± minuti</label><input type="number" data-num="jitter_min" value="${P.jitter_min}"></div>
      </div>
      <div class="card pad0">
        ${list.length ? list.map((s,i)=>`<div class="slot-row"><span class="t">${s}</span><span class="badge noisy">Noisy</span>${own?`<button type="button" class="xbtn" data-rm="${i}">×</button>`:""}</div>`).join("") : `<div class="empty">${own?"Nessuno slot":"Usa gli slot Def"}</div>`}
        <div class="toolbar">
          <input type="text" id="newslot" placeholder="HH:MM" maxlength="5">
          <button type="button" class="btn ghost sm" data-act="add">Aggiungi</button>
          <input type="number" id="gen" placeholder="N" min="1" max="300">
          <button type="button" class="btn ghost sm" data-act="gen">Genera</button>
          <button type="button" class="btn ghost sm" data-act="copy">Copia su tutti</button>
          <button type="button" class="btn ghost sm" data-act="clear">Svuota</button>
        </div>
      </div>
    </div>`;
  },
  types(){
    return `<div class="sheet"><h2 style="margin:0 0 12px;font-size:22px">Tipi di offerta</h2>
      <div class="list">${D.DEAL_TYPES.map(t=>`<div class="row"><span class="body"><b>${t}</b><span class="sub">${t==="nodiscount"?"Disattivato di default":"Template dedicato"}</span></span>
        <span class="right">${sw("dt:"+t, !!P.deal_types[t])}</span></div>`).join("")}</div></div>`;
  },
  filters(){
    const fields = [
      ["min_price","Prezzo minimo €"],["max_price","Prezzo massimo € (vuoto = ∞)"],
      ["min_discount","Sconto minimo %"],["max_discount","Sconto massimo %"],
      ["min_rating","Valutazione minima"],["min_reviews","Recensioni minime"],
      ["error_pct","Soglia 'Errore o affare?' %"],["cooldown_days","Pausa stesso prodotto (giorni)"]
    ];
    return `<div class="sheet"><h2 style="margin:0 0 12px;font-size:22px">Filtri</h2>
      <div class="list">${fields.map(([k,l])=>`<div class="field"><label>${l}</label><input type="number" step="any" data-num="${k}" value="${P[k]??""}" placeholder="—"></div>`).join("")}
        <div class="row"><span class="body"><b>Solo marche note</b><span class="sub">Orologi, smartwatch e gioielli</span></span>${sw("brand_guard", P.brand_guard!==false)}</div>
        <div class="field"><label>Marche extra ammesse (virgola)</label><input type="text" data-list="brand_allow" value="${esc((P.brand_allow||[]).join(", "))}"></div>
        <div class="field"><label>Blacklist parole</label><input type="text" data-list="blacklist" value="${esc((P.blacklist||[]).join(", "))}"></div>
        <div class="field"><label>Parole chiave extra</label><input type="text" data-list="keywords" value="${esc((P.keywords||[]).join(", "))}"></div>
      </div></div>`;
  },
  cats(){
    return `<div class="sheet"><h2 style="margin:0 0 4px;font-size:22px">Categorie</h2>
      <div class="hint">${P.categories.length} attive · Orologi/Gioielli pesano ~1% (mix canale)</div>
      <div class="list" style="margin-bottom:12px"><div class="row"><span class="body"><b>Rotazione categorie</b></span>${sw("category_rotation",!!P.category_rotation)}</div></div>
      <div class="chips" style="flex-wrap:wrap;overflow:visible">${D.CATEGORIES.map(c=>`<button type="button" class="chip ${P.categories.includes(c)?"on":""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("")}</div>
    </div>`;
  },
  sellers(){
    return `<div class="sheet"><h2 style="margin:0 0 12px;font-size:22px">Venditori</h2>
      <div class="list">
        <div class="row"><span class="body"><b>Modalità</b></span>
          <span class="right"><button type="button" class="btn soft sm" data-sm="${P.sellers_mode==="whitelist"?"blacklist":"whitelist"}">${P.sellers_mode}</button></span></div>
        <div class="field"><label>Elenco (virgola) · vuoto = nessun filtro</label><input type="text" data-list="sellers" value="${esc((P.sellers||[]).join(", "))}"></div>
      </div></div>`;
  },
  manufacturers(){
    return `<div class="sheet"><h2 style="margin:0 0 12px;font-size:22px">Produttori</h2>
      <div class="list">
        <div class="row"><span class="body"><b>Filtro attivo</b></span>${sw("manufacturers_filter",!!P.manufacturers_filter)}</div>
        <div class="field"><label>Elenco (virgola)</label><input type="text" data-list="manufacturers" value="${esc((P.manufacturers||[]).join(", "))}"></div>
      </div></div>`;
  },
  settings(){
    return `<div class="sheet">
      <div class="sec" style="margin-top:0">Impostazioni</div>
      <div class="list">
        ${row("sliders","i-slate","Impostazioni generali","Ricorda post, prezzi, notifiche",`data-nav="general"`)}
        ${row("bolt","i-orange","Autoposting","Amazon IT · "+(P.enabled?"attivo":"spento"),`data-nav="auto"`)}
      </div>
      <div class="sec">Aspetto del post</div>
      <div class="list">
        ${row("doc","i-orange","Formati",`${Object.keys(D.TEMPLATES).length} template`, `data-nav="formats"`)}
        ${row("tag","i-blue","Tag",`${Object.keys(D.TAGS).length} elementi`, `data-nav="tags"`)}
        ${row("kb","i-green","Tastiera","Pulsanti inline sotto i post", `data-nav="keyboard"`)}
        ${row("img","i-purple","Media", P.card ? "Card grafica" : "Foto allegata", `data-nav="media"`)}
      </div>
      <div class="sec">Configurazione base</div>
      <div class="list">
        ${row("link","i-blue","Tag affiliati", esc((P.tags_aff||{}).it || "non impostato"), `data-nav="affiliate"`)}
        ${row("store","i-indigo","Store", "Amazon IT", `data-nav="stores"`)}
      </div>
      <div class="sec">Stato</div>
      <div class="list">
        <div class="row"><span class="ico i-green">${ICONS.check}</span><span class="body"><b>Modalità</b><span class="sub">${mode==="live"?"Pubblica sul canale":"Solo anteprime private"}</span></span>
          <span class="right"><button type="button" class="btn soft sm" data-mode="${mode==="live"?"prova":"live"}">${mode}</button></span></div>
        <div class="row"><span class="ico i-cyan">${ICONS.heart}</span><span class="body"><b>Il mio piano</b></span><span class="pill plan">Gratis ✨</span></div>
      </div>
    </div>`;
  },
  general(){
    const items = [
      ["remember_posts","Ricorda dati post","Salva ASIN/prezzo per aggiornamenti"],
      ["update_prices","Aggiorna prezzi","Ricontrolla i post recenti"],
      ["expired_tag","Tag Offerta Terminata","Modifica il post quando scade"],
      ["notify_lowest","Notifica minimo storico","Avvisa in privato"],
      ["rotate_brand","Ruota marca","Evita due marche uguali di fila"],
      ["card","Card grafica","Altrimenti foto Amazon allegata"],
    ];
    return `<div class="sheet"><h2 style="margin:0 0 12px;font-size:22px">Impostazioni generali</h2>
      <div class="list">${items.map(([k,t,s])=>`<div class="row"><span class="body"><b>${t}</b><span class="sub">${s}</span></span>${sw(k,!!P[k])}</div>`).join("")}</div></div>`;
  },
  formats(){
    const tpl = (P.templates||{})[fmtKey] ?? D.TEMPLATES[fmtKey];
    return `<div class="sheet"><h2 style="margin:0 0 12px;font-size:22px">Formati</h2>
      <div class="chips">${Object.keys(D.TEMPLATES).map(k=>`<button type="button" class="chip ${k===fmtKey?"on":""}" data-fmt="${k}">${k}${(P.templates||{})[k]?" ✎":""}</button>`).join("")}</div>
      <div class="list" style="margin-top:10px"><div class="field"><label>${fmtKey}</label><textarea data-tpl="${fmtKey}">${esc(tpl)}</textarea>
        <div class="btns" style="margin-top:8px"><button type="button" class="btn ghost sm" data-reset="templates:${fmtKey}">↺ Predefinito</button></div></div></div></div>`;
  },
  tags(){
    const v = (P.tags||{})[tagKey] ?? D.TAGS[tagKey];
    return `<div class="sheet"><h2 style="margin:0 0 12px;font-size:22px">Tag</h2>
      <div class="chips" style="flex-wrap:wrap;overflow:visible">${Object.keys(D.TAGS).map(k=>`<button type="button" class="chip ${k===tagKey?"on":""}" data-tagk="${k}">${k}${(P.tags||{})[k]?" ✎":""}</button>`).join("")}</div>
      <div class="list" style="margin-top:10px"><div class="field"><label>${tagKey}</label><input type="text" data-tag="${tagKey}" value="${esc(v)}">
        <div class="btns" style="margin-top:8px"><button type="button" class="btn ghost sm" data-reset="tags:${tagKey}">↺ Predefinito</button></div></div></div></div>`;
  },
  keyboard(){
    return `<div class="sheet"><h2 style="margin:0 0 12px;font-size:22px">Tastiera</h2>
      <div class="list"><div class="field"><label>Testo del pulsante</label><input type="text" id="kbtext" value="${esc(P.keyboard[0][0].text)}"></div>
        <div class="field"><label>URL</label><input type="text" value="{link}" disabled><div class="hint" style="margin:6px 0 0">Punta al link affiliato del prodotto.</div></div></div></div>`;
  },
  media(){
    return `<div class="sheet"><h2 style="margin:0 0 12px;font-size:22px">Media</h2>
      <div class="list">
        <div class="row"><span class="body"><b>Foto allegata</b><span class="sub">Immagine prodotto Amazon</span></span>
          <span class="right"><input type="radio" name="media" data-card="0" ${!P.card?"checked":""}></span></div>
        <div class="row"><span class="body"><b>Card grafica</b><span class="sub">Generata dal bot (opzionale)</span></span>
          <span class="right"><input type="radio" name="media" data-card="1" ${P.card?"checked":""}></span></div>
        ${P.card?`<div class="field"><label>Filigrana</label><input type="text" id="wm" value="${esc(P.watermark||"")}"></div>`:""}
      </div></div>`;
  },
  affiliate(){
    return `<div class="sheet"><h2 style="margin:0 0 12px;font-size:22px">Tag affiliati</h2>
      <div class="list"><div class="field"><label>🇮🇹 Amazon IT</label><input type="text" id="aff" value="${esc((P.tags_aff||{}).it||"")}" placeholder="nome-21"></div></div>
      <div class="hint">Altri marketplace verranno aggiunti più avanti.</div></div>`;
  },
  publish(){
    return `<div class="sheet"><h2 style="margin:0 0 12px;font-size:22px">Pubblica</h2>
      <div class="list"><div class="field"><label>Link Amazon</label><input type="url" id="url" placeholder="https://www.amazon.it/dp/…"></div></div>
      <div class="btns" style="margin-top:12px"><button type="button" class="btn primary block" data-act="posturl">🚀 Pubblica ora</button></div>
      <div class="hint">${mode==="live"?"Verrà pubblicato sul canale.":"Modalità prova: anteprima solo in privato."}</div></div>`;
  },
  explore(){
    const items = S.explore || [];
    return `<div class="sheet">
      <div class="seg" style="margin-bottom:12px">
        <button type="button" class="${exploreTab==="possible"?"on":""}" data-etab="possible">Possibili post</button>
        <button type="button" class="${exploreTab==="search"?"on":""}" data-etab="search">Ricerca</button>
        <button type="button" class="${exploreTab==="errors"?"on":""}" data-etab="errors">Errori prezzo</button>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <span class="sec" style="margin:0">Esplora</span>
        <span class="hint" style="margin:0">${items.length}+ prodotti disponibili</span>
      </div>
      <div class="card pad0">
        ${items.length ? items.filter(e => exploreTab!=="errors" || e[5]==="error").map(e => {
          const thumb = e[7]
            ? `<img class="thumb" src="${esc(e[7])}" alt="" loading="eager" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><div class="thumb" style="display:none;place-items:center;background:var(--bg2);color:var(--hint);font-size:20px">📦</div>`
            : `<div class="thumb" style="display:grid;place-items:center;background:var(--bg2);color:var(--hint);font-size:22px">📦</div>`;
          return `<div class="prod">${thumb}<div class="info">
            <div class="title">${esc(e[1])}</div>
            <div class="prices"><span class="now">${eur(e[2])}</span><span class="old">${eur(e[3])}</span><span class="badge disc">-${e[4]}%</span></div>
            <div class="meta"><span class="badge type">${esc(e[5]||"normal")}</span>${e[6]!=null?`<span class="hint" style="margin:0">★ ${e[6]}</span>`:""}</div>
            <div class="actions">
              <button type="button" class="btn blue" data-now="${e[0]}">Pubblica ora</button>
              <button type="button" class="btn ghost" data-auto="${e[0]}">Autopost</button>
              <button type="button" class="btn ghost" data-sch="${e[0]}">Programma</button>
            </div>
          </div></div>`;
        }).join("") : `<div class="empty">Nessuna offerta in coda.</div>`}
      </div>
    </div>`;
  },
  posts(){
    const L = (a, empty) => a && a.length ? a.map(x => `<div class="row"><span class="body"><b>${esc(x[1])}</b><span class="sub">${eur(x[2])} · ${new Date(x[3]*1000).toLocaleString("it-IT")}</span></span></div>`).join("") : `<div class="empty">${empty}</div>`;
    return `<div class="sheet">
      <div class="sec" style="margin-top:0">Pubblicati</div><div class="list">${L(S.posted,"Nessun post.")}</div>
      <div class="sec">Programmati</div><div class="list"><div class="row"><span class="body"><b>Prossimo slot</b><span class="sub">${esc(nextSlotLabel())} · ${(S.explore||[]).length} in coda</span></span></div></div>
      <div class="sec">Bozze / anteprime</div><div class="list">${L(S.drafts,"Nessuna bozza.")}</div>
    </div>`;
  },
};

function render(){
  topbar();
  const map = {home:"home", publish:"publish", explore:"explore", posts:"posts", settings:"settings"};
  if (["home","publish","explore","posts"].includes(tab) && ["home","publish","explore","posts"].includes(screen) === false && !["auto","stores","slots","types","filters","cats","sellers","manufacturers"].includes(screen)) {
    // keep nested screens when coming from settings/auto
  }
  if (map[tab] && (screen === "home" || screen === tab || (tab==="settings" && ["settings","general","formats","tags","keyboard","media","affiliate","auto","stores","slots","types","filters","cats","sellers","manufacturers"].includes(screen)))) {
    // ok
  }
  if (!V[screen]) screen = map[tab] || "home";
  $("#view").innerHTML = V[screen]();
  document.querySelectorAll("#tabs button").forEach(b => b.classList.toggle("on", b.dataset.t === tab));
  dirty();
  window.scrollTo(0,0);
}

function go(s, t){
  screen = s;
  if (t) tab = t;
  else if (["home","publish","explore","posts","settings"].includes(s)) tab = s;
  else if (["auto","stores","slots","types","filters","cats","sellers","manufacturers"].includes(s)) tab = (s==="auto"||["stores","slots","types","filters","cats","sellers","manufacturers"].includes(s)) && document.querySelector("#tabs .on")?.dataset.t === "settings" ? "settings" : "home";
  render();
}

document.addEventListener("click", e => {
  const t = e.target.closest("[data-t],[data-tab],[data-nav],[data-day],[data-rm],[data-act],[data-smode],[data-sm],[data-mode],[data-fmt],[data-tagk],[data-reset],[data-card],[data-now],[data-sch],[data-auto],[data-cont],[data-sync],[data-etab],[data-cat],[data-step]");
  if (!t) return;
  const ds = t.dataset;
  if (ds.t) { tab = ds.t; screen = ds.t; return render(); }
  if (ds.tab) { tab = ds.tab; screen = ds.tab; return render(); }
  if (ds.nav) { return go(ds.nav); }
  if (ds.day) { day = ds.day; return render(); }
  if (ds.rm !== undefined) { P.slots[day] = (P.slots[day]||[]).filter((_,i)=>i!=ds.rm); return render(); }
  if (ds.smode) { P.schedule_mode = ds.smode; return render(); }
  if (ds.sm) { P.sellers_mode = ds.sm; return render(); }
  if (ds.mode) { mode = ds.mode; return render(); }
  if (ds.fmt) { fmtKey = ds.fmt; return render(); }
  if (ds.tagk) { tagKey = ds.tagk; return render(); }
  if (ds.etab) { exploreTab = ds.etab; return render(); }
  if (ds.cat) {
    const c = ds.cat;
    P.categories = P.categories.includes(c) ? P.categories.filter(x=>x!==c) : [...P.categories, c];
    return render();
  }
  if (ds.card !== undefined) { P.card = ds.card === "1"; return render(); }
  if (ds.reset) {
    const [st,k] = ds.reset.split(":");
    P[st] = {...(P[st]||{})}; delete P[st][k];
    return render();
  }
  if (ds.step) {
    const [k, d] = ds.step.split(":");
    P[k] = Math.max(1, Math.min(5, (P[k]||1) + Number(d)));
    return render();
  }
  if (ds.now) { action = {act:"post_now", asin:ds.now}; return send(); }
  if (ds.sch) { action = {act:"schedule", asin:ds.sch}; return send(); }
  if (ds.auto) { action = {act:"autopost", asin:ds.auto}; return send(); }
  if (ds.cont !== undefined) return sendNextPart();
  if (ds.sync !== undefined) return openStart("sync");
  if (ds.act) {
    const cur = slotsOf(day) ?? [...(P.slots.def||[])];
    if (ds.act === "add") {
      const v = $("#newslot").value.trim();
      if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(v)) return alert("Formato HH:MM");
      P.slots[day] = [...new Set([...cur, v])].sort();
    }
    if (ds.act === "gen") {
      const n = +$("#gen").value;
      if (!(n>0 && n<=300)) return alert("N tra 1 e 300");
      const step = 1440/n, j = P.jitter_min||3, out = [];
      for (let i=0;i<n;i++){
        let m = Math.round(step*i + step/2 + (Math.random()*2-1)*j);
        m = Math.max(0, Math.min(1439, m));
        out.push(String(m/60|0).padStart(2,"0")+":"+String(m%60).padStart(2,"0"));
      }
      P.slots[day] = [...new Set(out)].sort();
    }
    if (ds.act === "copy") P.slots = { def: [...cur] };
    if (ds.act === "clear") P.slots[day] = [];
    if (ds.act === "posturl") {
      const u = $("#url").value.trim();
      if (!/amazon\.|amzn\.|a\.co\//.test(u)) return alert("Link Amazon non valido");
      action = {act:"post_url", url:u}; return send();
    }
    return render();
  }
});

document.addEventListener("change", e => {
  const t = e.target, ds = t.dataset;
  if (ds.sw) {
    if (ds.sw === "_paused") paused = !t.checked;
    else if (ds.sw.startsWith("dt:")) P.deal_types[ds.sw.slice(3)] = t.checked;
    else P[ds.sw] = t.checked;
    return render();
  }
  if (ds.num) { P[ds.num] = t.value === "" ? null : +t.value; return dirty(); }
  if (ds.list) { P[ds.list] = t.value.split(",").map(x=>x.trim()).filter(Boolean); return dirty(); }
  if (ds.tpl) {
    P.templates = {...(P.templates||{}), [ds.tpl]: t.value};
    if (t.value === D.TEMPLATES[ds.tpl]) delete P.templates[ds.tpl];
    return dirty();
  }
  if (ds.tag) {
    P.tags = {...(P.tags||{}), [ds.tag]: t.value};
    if (t.value === D.TAGS[ds.tag]) delete P.tags[ds.tag];
    return dirty();
  }
  if (ds.card !== undefined) { P.card = t.value === "1" || t.dataset.card === "1"; return render(); }
  if (t.id === "kbtext") { P.keyboard = [[{text: t.value || "Acquista ora 📱", url:"{link}"}]]; return dirty(); }
  if (t.id === "wm") { P.watermark = t.value; return dirty(); }
  if (t.id === "aff") { P.tags_aff = {...(P.tags_aff||{}), it: t.value.trim()}; return dirty(); }
});

function payload(){
  const o = { cid:S.cid, p:changes(), ...(action||{}) };
  if (mode !== S.mode) o.mode = mode;
  if (paused !== !!S.paused) o.paused = paused;
  if (tg && tg.initData) o.init = tg.initData;
  return o;
}
// ---- Invio: sendData (pulsante tastiera /pannello) oppure link /start (pulsante menu, inline, ecc.) ----
const BOT_FALLBACK = "GeraldoDealsBot";
const CHUNK = 52;
const inTG = () => !!(tg && tg.initData);
const canSendData = () => inTG() && tg.initDataUnsafe && !tg.initDataUnsafe.query_id && typeof tg.sendData === "function";
function b64u(bytes){ let s = ""; bytes.forEach(b => s += String.fromCharCode(b)); return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""); }
async function deflate(bytes){
  if (typeof CompressionStream === "undefined") return null;
  const cs = new CompressionStream("deflate-raw");
  return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(cs)).arrayBuffer());
}
async function blob(obj){
  const raw = new TextEncoder().encode(JSON.stringify(obj));
  const a = "0" + b64u(raw); const z = await deflate(raw);
  const b = z ? "1" + b64u(z) : null;
  return b && b.length < a.length ? b : a;
}
function botName(){ return (S && S.u) || BOT_FALLBACK; }
let linkNoticeShown = false;
function openStart(code){
  const url = `https://t.me/${botName()}?start=${code}`;
  if (tg && tg.openTelegramLink) tg.openTelegramLink(url); else window.open(url, "_blank");
  if (code !== "sync" && !linkNoticeShown) {
    linkNoticeShown = true;
    setTimeout(() => toast("📨 Inviato al bot via link. Se in chat non arriva la conferma, chiudi e apri la Mini-app dal pulsante «📱 Mini-app» sotto la chat (tastiera): da lì funziona sempre."), 400);
  }
}
function store(k, v){ try { localStorage.setItem(k, v); } catch(_){} try { tg && tg.CloudStorage && tg.CloudStorage.setItem(k, v); } catch(_){} }
function unstore(k){ try { localStorage.removeItem(k); } catch(_){} try { tg && tg.CloudStorage && tg.CloudStorage.removeItem(k); } catch(_){} }
function loadPending(){
  return new Promise(res => {
    let v = null; try { v = localStorage.getItem("db_pend"); } catch(_){}
    if (v) return res(v);
    if (tg && tg.CloudStorage) { try { tg.CloudStorage.getItem("db_pend", (e, val) => res(e ? null : val)); } catch(_) { res(null); } }
    else res(null);
  });
}
let pending = null; // {codes:[...], i:n}
function showPending(){
  const old = document.getElementById("pendbar"); if (old) old.remove();
  if (!pending || pending.i >= pending.codes.length) return;
  document.body.insertAdjacentHTML("beforeend", `<div id="pendbar" class="savebar" style="bottom:calc(var(--dock-h) + var(--safe-b) + 60px)">
    <span>Invio impostazioni: parte ${pending.i + 1}/${pending.codes.length}</span>
    <button type="button" class="btn primary sm" data-cont>Invia ▶️</button></div>`);
}
function sendNextPart(){
  if (!pending) return;
  const code = pending.codes[pending.i++];
  if (pending.i >= pending.codes.length) { unstore("db_pend"); }
  else store("db_pend", JSON.stringify(pending));
  openStart(code);
  if (pending.i >= pending.codes.length) {
    pending = null; P0 = clone(P); S.mode = mode; S.paused = paused;
    toast("✅ Inviato al bot: controlla la chat per la conferma.");
  }
  showPending(); dirty();
}
function toast(t){
  if (tg && tg.showAlert) { try { return tg.showAlert(t); } catch(_){} }
  const el = document.createElement("div"); el.className = "savebar"; el.style.bottom = "140px"; el.textContent = t;
  document.body.appendChild(el); setTimeout(() => el.remove(), 2500);
}
async function sendViaLink(){
  if (!S.k) { toast("Dati non aggiornati: tocca «Carica dati» o scrivi /start al bot."); return openStart("sync"); }
  const pre = "x" + S.k;
  if (action) {
    const a = action; action = null; dirty();
    if (a.act === "post_now") return openStart(pre + "p" + a.asin);
    if (a.act === "autopost") return openStart(pre + "a" + a.asin);
    if (a.act === "schedule") return openStart(pre + "g" + a.asin);
    if (a.act === "post_url") {
      const m = /(?:\/dp\/|\/gp\/product\/|\/gp\/aw\/d\/)([A-Z0-9]{10})/.exec(a.url) || /^([A-Z0-9]{10})$/.exec(a.url.trim());
      if (m) return openStart(pre + "p" + m[1]);
      const sh = /amzn\.(?:to|eu)\/([A-Za-z0-9]{3,40})/.exec(a.url);
      if (sh) return openStart(pre + "u" + sh[1]);
      return toast("Link non riconosciuto: usa un link amazon.it/dp/… o amzn.to/…");
    }
    return;
  }
  const o = payload(); delete o.init;
  const data = await blob(o);
  const parts = []; for (let i = 0; i < data.length; i += CHUNK) parts.push(data.slice(i, i + CHUNK));
  if (parts.length > 30) return toast("Troppe modifiche insieme (testi lunghi): salva in più volte o usa /pannello.");
  const seq = Math.random().toString(36).slice(2, 4).padEnd(2, "0");
  const n = parts.length.toString(36);
  pending = { codes: parts.map((p, i) => pre + "c" + seq + i.toString(36) + n + p), i: 0 };
  sendNextPart();
}
function send(){
  let s = JSON.stringify(payload());
  if (canSendData()) {
    if (new TextEncoder().encode(s).length > 4096) {
      const o = payload(); delete o.init; s = JSON.stringify(o);
      if (new TextEncoder().encode(s).length > 4096) return sendViaLink();
    }
    return tg.sendData(s);
  }
  if (inTG()) return sendViaLink();
  console.log("sendData", s);
  const old = document.getElementById("dbg"); if (old) old.remove();
  document.body.insertAdjacentHTML("beforeend", `<pre id="dbg" class="card" style="white-space:pre-wrap;font-size:11px;max-width:480px;margin:12px auto">sendData → ${esc(s)}</pre>`);
  action = null; dirty();
}
$("#save").onclick = send;
document.querySelectorAll("#tabs button").forEach(b => b.onclick = () => { tab = b.dataset.t; screen = tab; render(); });

loadSnap().then(s => {
  const mt = /[#&]tab=(\w+)/.exec(location.hash);
  S = s; P0 = merged(S.p); P = merged(S.p); mode = S.mode; paused = !!S.paused;
  if (mt && V[mt[1]]) { tab = ["auto","slots","stores","types","filters","cats"].includes(mt[1]) ? "home" : (["general","formats","tags","keyboard","media","affiliate"].includes(mt[1]) ? "settings" : mt[1]); screen = mt[1]; }
  if (mt && mt[1] === "settings") { tab = "settings"; screen = "settings"; }
  if (mt && mt[1] === "auto") { tab = "home"; screen = "auto"; }
  if (mt && mt[1] === "slots") { tab = "home"; screen = "slots"; }
  if (mt && mt[1] === "explore") { tab = "explore"; screen = "explore"; }
  render();
  loadPending().then(v => { try { const p = v && JSON.parse(v); if (p && p.codes && p.i < p.codes.length && p.codes[0].slice(1,7) === S.k) { pending = p; showPending(); } } catch(_){} });
});
