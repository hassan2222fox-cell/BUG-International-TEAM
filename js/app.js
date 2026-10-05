// ---------- Seed accounts: salted PBKDF2-SHA256 hashes only (no plaintext) ----------
const USERS = {
  admin:
    "df23f7e47cfdbe4620c8dfc4616ecca8:6f99a7a87c24882dc7ba4fc1de4426a27147e0390f205392ec15065043a66eee",
  user: "e9ee292cb2caaf78d3e76df81ac3ce34:cc10c1496f4c05a52b6f7b620d321958b155700590f4d1e7c83dc83a0d2d53ea",
  "ibrahim gouda":
    "aa366eeffb2bbc8e80f12fa3d02e1856:c6b402be0a93124f6f001f660d778556bee685193f14f32670d6d3d174b69e2a",
  "ziad tarik":
    "f70106ee0af05d3f27b893ee904be94f:b9ddcea0f87f01bd701ab3de0f3ab67b72d1842640f48424085b10e9f9c20c75",
  "ibrahim taha":
    "a838dd1a047d1e2ff37a0d2ed1b511ab:241340c629d8df5cec7942dcbdbbb665a121aaf1cf8331a563c12d1ddfce2c45",
  belal:
    "d759492a6788f2ac60892b7af92d166a:7b04929c0032b40854c6a85a91fb39d68afe55ab0100a6db257715738bc86d1d",
  "ahmed elsayed":
    "01d4f336bce912f11b0917de36379c69:1db07550bd32f376d96544314eefb0f96641606dfec571a88cdb3b40a48b5bea",
};
const DUMMY = USERS.admin;
const $ = (s) => document.querySelector(s),
  h = (x) =>
    String(x).replace(
      /[&<>"']/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
    );
const hex = (b) => [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
const unhex = (s) => new Uint8Array(s.match(/../g).map((x) => parseInt(x, 16)));
async function verify(pw, rec) {
  const [s, hh] = rec.split(":");
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, [
    "deriveBits",
  ]);
  const d = hex(
    await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt: unhex(s), iterations: 100000, hash: "SHA-256" },
      k,
      256,
    ),
  );
  let r = 0;
  for (let i = 0; i < hh.length; i++) r |= d.charCodeAt(i) ^ hh.charCodeAt(i);
  return r === 0 && d.length === hh.length;
}
// storage (guarded)
const ls = {
  get(k, d) {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? d;
    } catch {
      return d;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {}
  },
};
// ---------- Chrome / glass 3D icons ----------
document.body.insertAdjacentHTML(
  "afterbegin",
  '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="chr" gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22"><stop offset="0" stop-color="#f7fbff"/><stop offset=".28" stop-color="#9dbdf0"/><stop offset=".5" stop-color="#2c4a86"/><stop offset=".72" stop-color="#d4e6ff"/><stop offset="1" stop-color="#4f7cc4"/></linearGradient></defs></svg>',
);
const P = {
  book: '<path d="M4 5h6a2 2 0 012 2v12a2 2 0 00-2-2H4zM20 5h-6a2 2 0 00-2 2v12a2 2 0 012-2h6z"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5M22 9v6"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/><circle cx="12" cy="15.5" r="1.2"/>',
  chip: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9.5 3v4M14.5 3v4M9.5 17v4M14.5 17v4M3 9.5h4M3 14.5h4M17 9.5h4M17 14.5h4"/><circle cx="12" cy="12" r="1.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  helmet:
    '<path d="M12 20s-7.5-4.6-7.5-10.3A4.2 4.2 0 0112 7.5a4.2 4.2 0 017.5 2.2C19.5 15.400 12 20 12 20z"/><path d="M7 12h2.500l1.500-3 2.500 5 1.500-2H17"/>',
  database:
    '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
  code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  shield: '<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  gear: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="6.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  laptop: '<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
  sigma: '<path d="M18 5H6l6 7-6 7h12"/>',
  puzzle:
    '<path d="M10 4a2 2 0 014 0v2h4v4h-2a2 2 0 000 4h2v4h-4v-2a2 2 0 00-4 0v2H6v-4h2a2 2 0 000-4H6V6h4z"/>',
  image:
    '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M3 17l5-5 4 4 3-3 6 6"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>',
  audio:
    '<path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
  pdf: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 14h6M9 17h6"/>',
};
const ico = (k) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g stroke="url(#chr)" stroke-width="2.6">${P[k]}</g><g stroke="#fff" stroke-width=".7" opacity=".8">${P[k]}</g></svg>`;
// ---------- Catalog (add subjects here) ----------
const SUBJECTS = (window.SUBJECTS || []).map((s) => ({ ...s, icon: ico(s.icon) }));
const SECTIONS = (window.SECTIONS || []).map((s) => ({ ...s, icon: ico(s.icon) }));
const TYPES = {
  image: ["Images", ico("image")],
  video: ["Videos", ico("video")],
  audio: ["Audio", ico("audio")],
  pdf: ["PDF", ico("pdf")],
};
const MATS = window.MATERIALS || [];
const subj = (id) => SUBJECTS.find((s) => s.id === id) || SECTIONS.find((s) => s.id === id),
  mat = (id) => MATS.find((m) => m.id === id);
// ---------- Session ----------
let me = null;
const key = (k) => `bug:${me}:${k}`;
const hist = () => ls.get(key("h"), []),
  favs = () => ls.get(key("f"), []);
let taskF = "all";
const tasks = () => ls.get(key("t"), []),
  avatar = () => ls.get(key("av"), null);
function paintAv() {
  const a = avatar();
  [$("#av"), $("#av2")].forEach((el) => {
    if (!el) return;
    el.style.backgroundImage = a ? `url(${a})` : "";
    el.textContent = a ? "" : me[0].toUpperCase();
  });
}
// ---------- Login ----------
let fails = ls.get("bug:fails", { n: 0, until: 0 });
$("#lc").addEventListener("submit", async (e) => {
  e.preventDefault();
  const err = $("#err"),
    b = $("#lb");
  if (!window.SUBJECTS) {
    err.textContent = "Data files not found. Make sure the js/data folder is next to app.js.";
    return;
  }
  if (Date.now() < fails.until) {
    err.textContent = `Too many attempts. Try again in ${Math.ceil((fails.until - Date.now()) / 1000)}s.`;
    return;
  }
  const u = $("#u").value.trim().toLowerCase().slice(0, 40),
    p = $("#p").value;
  if (!u || !p) {
    err.textContent = "Enter your username and password.";
    return;
  }
  if (!(window.crypto && crypto.subtle)) {
    err.textContent =
      "Open the project via http://localhost (python -m http.server), not a LAN address.";
    return;
  }
  b.disabled = true;
  b.innerHTML = '<span class="load"></span>';
  const rec = Object.hasOwn(USERS, u) ? USERS[u] : DUMMY;
  const ok = (await verify(p, rec)) && Object.hasOwn(USERS, u);
  b.disabled = false;
  b.textContent = "Log in";
  if (!ok) {
    fails.n++;
    if (fails.n >= 5) {
      fails = { n: 0, until: Date.now() + 30000 };
    }
    ls.set("bug:fails", fails);
    err.textContent = "Invalid username or password.";
    const c = $("#lc");
    c.classList.remove("shake");
    void c.offsetWidth;
    c.classList.add("shake");
    $("#p").value = "";
    return;
  }
  fails = { n: 0, until: 0 };
  ls.set("bug:fails", fails);
  err.textContent = "";
  try {
    sessionStorage.setItem(
      "bug:sess",
      JSON.stringify({ u, t: crypto.randomUUID(), at: Date.now() }),
    );
  } catch {}
  me = u;
  $("#wel").style.display = "grid";
  $("#login").style.display = "none";
  setTimeout(() => {
    $("#wel").style.display = "none";
    boot();
  }, 2200);
});
function logout() {
  try {
    sessionStorage.removeItem("bug:sess");
  } catch {}
  me = null;
  location.hash = "";
  $("#app").style.display = "none";
  $("#login").style.display = "grid";
  $("#p").value = "";
  $("#u").value = "";
}
$("#lo").onclick = logout;
// ---------- Layout ----------
const NAV = [
  ["home", "🏠", "Home"],
  ["subjects", "📚", "Subjects"],
  ["sections", "🧪", "Sections"],
  ["tasks", "✅", "Tasks"],
  ["history", "🕘", "History"],
  ["favorites", "⭐", "Favorites"],
  ["search", "🔍", "Search"],
  ["settings", "⚙️", "Settings"],
  ["logout", "🚪", "Logout"],
];
function boot() {
  $("#app").style.display = "block";
  $("#uname").textContent = me;
  paintAv();
  $("#av").onclick = () => go("settings");
  $("#side").innerHTML = NAV.map(
    ([id, i, l]) => `<button data-go="${id}"><span>${i}</span><span>${l}</span></button>`,
  ).join("");
  $("#side").onclick = (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    $("#side").classList.remove("open");
    b.dataset.go === "logout" ? logout() : go(b.dataset.go);
  };
  go(location.hash.slice(1) || "home");
}
$("#burger").onclick = () => {
  if (innerWidth <= 800) $("#side").classList.toggle("open");
  else {
    $("#side").classList.toggle("mini");
    $("#main").classList.toggle("mini");
  }
};
function go(v) {
  location.hash = v;
  render(v);
}
addEventListener("hashchange", () => me && render(location.hash.slice(1)));
// ---------- Reusable components ----------
const subjectCard = (s) =>
  `<button class="card glass" data-go="s:${s.id}"><div class="ic">${s.icon}</div><h3>${h(s.name)}</h3><p>${h(s.desc)}</p><span class="n mono">${MATS.filter((m) => m.sid === s.id).length} materials</span></button>`;
const catCard = (s, t) =>
  `<button class="card glass" data-go="c:${s}:${t}"><div class="ic">${TYPES[t][1]}</div><h3>${TYPES[t][0]}</h3><span class="n mono">${MATS.filter((m) => m.sid === s && m.type === t).length} items</span></button>`;
const isFav = (id) => favs().includes(id);
const matCard = (m) =>
  `<article class="mat glass"><h4>${h(m.title)}</h4><div class="meta"><span class="tag">${m.type.toUpperCase()}</span>${m.date ? `<span>${h(m.date)}</span>` : ""}</div>${m.desc ? `<p style="margin:0;color:var(--m);font-size:13px">${h(m.desc)}</p>` : ""}<div class="act"><button class="btn" data-open="${m.id}">Open</button><button class="ghost" data-dl="${m.id}" aria-label="Download">⬇</button><button class="ghost fav ${isFav(m.id) ? "on" : ""}" data-fav="${m.id}" aria-label="Favorite">★</button></div></article>`;
const rowCard = (m, extra, btn) =>
  `<div class="row glass"><div><b>${h(m.title)}</b><div class="meta"><span>${h(subj(m.sid).name)}</span><span class="tag">${m.type.toUpperCase()}</span>${extra || ""}</div></div><div class="act" style="margin:0;padding:0"><button class="btn" data-open="${m.id}">Open</button>${btn || ""}</div></div>`;
const head = (t, s) => `<h2>${t}</h2><p class="sub">${s || ""}</p>`;
function render(v) {
  v = v || "home";
  const m = $("#main");
  [...document.querySelectorAll("aside button")].forEach((b) =>
    b.classList.toggle("on", v.startsWith(b.dataset.go)),
  );
  let o = "";
  const [k, a, b] = v.split(":");
  if (k === "home")
    o = `<section class="hero glass"><h1 class="mono">Welcome to <span style="color:var(--g)">BUG</span></h1><p class="sub" style="margin:0">Your University Knowledge &amp; Learning Platform</p></section>${head("Subjects", "Pick a subject to open its books, lectures and media.")}${flowHTML()}`;
  else if (k === "subjects")
    o = head("Subjects", `${SUBJECTS.length} subjects available`) + `${flowHTML()}`;
  else if (k === "sections")
    o =
      head("Sections", `${SECTIONS.length} sections available`) +
      `<div class="grid">${SECTIONS.map(subjectCard).join("")}</div>`;
  else if (k === "s") {
    const s = subj(a),
      isSec = SECTIONS.includes(s);
    o = `<button class="crumb" data-go="${isSec ? "sections" : "subjects"}">← ${isSec ? "Sections" : "Subjects"}</button>${head(s.name, s.desc)}<div class="grid">${Object.keys(
      TYPES,
    )
      .map((t) => catCard(a, t))
      .join("")}</div>`;
  } else if (k === "c") {
    const s = subj(a),
      L = MATS.filter((x) => x.sid === a && x.type === b);
    o =
      `<button class="crumb" data-go="s:${a}">← ${h(s.name)}</button>${head(`${s.name} · ${TYPES[b][0]}`)}` +
      (L.length
        ? `<div class="list">${L.map(matCard).join("")}</div>`
        : `<div class="empty glass">Nothing here yet.<br><span class="mono">Add files in js/data/${SECTIONS.includes(s) ? "sections" : h(a)}.js</span></div>`);
  } else if (k === "history") {
    const H = hist();
    o =
      head("History", "Only you can see this list.") +
      (H.length
        ? `<button class="ghost" data-clear style="margin-bottom:14px">Clear history</button>` +
          H.map((x) =>
            mat(x.id)
              ? rowCard(mat(x.id), `<span class="mono">${new Date(x.at).toLocaleString()}</span>`)
              : "",
          ).join("")
        : '<div class="empty glass">Nothing here yet. Open a material and it will appear here.</div>');
  } else if (k === "favorites") {
    const F = favs();
    o =
      head("Favorites") +
      (F.length
        ? F.map((id) =>
            mat(id)
              ? rowCard(
                  mat(id),
                  "",
                  `<button class="ghost fav on" data-fav="${id}">Remove</button>`,
                )
              : "",
          ).join("")
        : '<div class="empty glass">No favorites yet. Select ★ on any material to save it.</div>');
  } else if (k === "search") {
    o = head("Search") + `<div id="res"></div>`;
    m.innerHTML = o;
    m.dataset.v = v;
    const q = $("#q").value;
    $("#q").focus();
    return doSearch(q);
  } else if (k === "tasks") {
    const T = tasks(),
      V = T.filter((x) => taskF === "all" || (x.sid || "") === taskF),
      open = V.filter((x) => !x.done).length,
      cnt = (sid) => T.filter((x) => !x.done && (x.sid || "") === sid).length,
      P = [
        ["all", "All", T.filter((x) => !x.done).length],
        ...SUBJECTS.map((s) => [s.id, s.name, cnt(s.id)]),
        ["", "General", cnt("")],
      ];
    o =
      head("Tasks", `${open} open · ${V.length - open} done`) +
      `<div class="pills">${P.map(([id, n, c]) => `<button class="ghost pill ${taskF === id ? "on" : ""}" data-tf="${h(id)}">${h(n)}${c ? ` · ${c}` : ""}</button>`).join("")}</div><form id="tf" class="glass" autocomplete="off" style="display:flex;gap:10px;padding:14px;margin-bottom:16px;flex-wrap:wrap"><input id="tt" maxlength="120" placeholder="New task…" aria-label="New task" style="flex:1;min-width:200px"><select id="ts" aria-label="Subject"><option value="">General</option>${SUBJECTS.map((s) => `<option value="${s.id}" ${taskF === s.id ? "selected" : ""}>${h(s.name)}</option>`).join("")}</select><input id="td" type="date" aria-label="Due date" style="width:auto"><button class="btn">Add</button></form>` +
      (V.length
        ? (V.some((x) => x.done)
            ? `<button class="ghost" data-tclr style="margin-bottom:14px">Clear completed</button>`
            : "") +
          [...V]
            .sort((x, y) => x.done - y.done || y.at - x.at)
            .map(
              (x) =>
                `<div class="row glass"><div style="display:flex;gap:12px;align-items:center"><button class="ghost tk ${x.done ? "on" : ""}" data-ttog="${x.id}" aria-label="Toggle done">✓</button><div><b style="${x.done ? "text-decoration:line-through;opacity:.55" : ""}">${h(x.text)}</b>${(x.sid && subj(x.sid)) || x.due ? `<div class="meta">${x.sid && subj(x.sid) ? `<span class="tag">${h(subj(x.sid).name)}</span>` : ""}${x.due ? `<span class="mono">Due ${h(x.due)}</span>` : ""}</div>` : ""}</div></div><button class="ghost" data-tdel="${x.id}" aria-label="Delete">✕</button></div>`,
            )
            .join("")
        : '<div class="empty glass">No tasks here yet. Add one above.</div>');
  } else if (k === "settings")
    o =
      head("Settings") +
      `<div class="glass" style="padding:22px;max-width:480px"><div class="pf"><div class="av big" id="av2"></div><div><b>Profile photo</b><div class="act" style="padding:8px 0 0"><button class="btn" data-pic>Upload</button>${avatar() ? '<button class="ghost" data-picrm>Remove</button>' : ""}</div></div></div><input type="file" id="pic" accept="image/*" hidden><p><b>Account</b></p><p class="mono" style="color:var(--m)">username: ${h(me)}<br>session: active (cleared on logout)<br>history: ${hist().length} · favorites: ${favs().length} · tasks: ${tasks().length}</p></div>`;
  m.innerHTML = o;
  m.dataset.v = v;
  scrollTo(0, 0);
  initFlow();
  glitchAll();
  paintAv();
}
function doSearch(q) {
  q = q.trim().toLowerCase();
  if (!q) {
    $("#res").innerHTML =
      '<div class="empty glass">Type to search subjects, books, lectures and media.</div>';
    return;
  }
  const ss = [...SUBJECTS, ...SECTIONS].filter((s) => (s.name + s.desc).toLowerCase().includes(q)),
    ms = MATS.filter((x) =>
      (x.title + " " + x.type + " " + subj(x.sid).name).toLowerCase().includes(q),
    ).slice(0, 40);
  $("#res").innerHTML =
    (ss.length
      ? `<div class="grid" style="margin-bottom:20px">${ss.map(subjectCard).join("")}</div>`
      : "") + ms.map((x) => rowCard(x)).join("") ||
    `<div class="empty glass">No results for “${h(q)}”.</div>`;
}
$("#q").addEventListener("input", () => {
  if (!(location.hash.slice(1) || "").startsWith("search")) go("search");
  else doSearch($("#q").value);
});
// ---------- Actions ----------
document.addEventListener("click", (e) => {
  const t = e.target.closest(
    "[data-go],[data-open],[data-fav],[data-dl],[data-clear],[data-pic],[data-picrm],[data-ttog],[data-tdel],[data-tclr],[data-tf]",
  );
  if (!t || !me) return;
  if (t.dataset.go && !t.closest("aside")) go(t.dataset.go);
  if (t.dataset.open) openMat(t.dataset.open);
  if (t.dataset.fav) {
    let f = favs();
    f = f.includes(t.dataset.fav) ? f.filter((x) => x !== t.dataset.fav) : [...f, t.dataset.fav];
    ls.set(key("f"), f);
    render(location.hash.slice(1));
  }
  if (t.dataset.clear) {
    ls.set(key("h"), []);
    render("history");
  }
  if ("pic" in t.dataset) $("#pic").click();
  if ("picrm" in t.dataset) {
    try {
      localStorage.removeItem(key("av"));
    } catch {}
    render("settings");
  }
  if (t.dataset.ttog) {
    ls.set(
      key("t"),
      tasks().map((x) => (x.id === t.dataset.ttog ? { ...x, done: !x.done } : x)),
    );
    render("tasks");
  }
  if (t.dataset.tdel) {
    ls.set(
      key("t"),
      tasks().filter((x) => x.id !== t.dataset.tdel),
    );
    render("tasks");
  }
  if ("tclr" in t.dataset) {
    ls.set(
      key("t"),
      tasks().filter((x) => !(x.done && (taskF === "all" || (x.sid || "") === taskF))),
    );
    render("tasks");
  }
  if ("tf" in t.dataset) {
    taskF = t.dataset.tf;
    render("tasks");
  }
  if (t.dataset.dl) {
    const m = mat(t.dataset.dl),
      a = document.createElement("a");
    a.href = fileURL(m.file);
    a.download = m.file.split("/").pop();
    a.click();
  }
});
$("#modal").addEventListener("click", (e) => {
  if (e.target.id === "modal" || e.target.dataset.x !== undefined) closeM();
});
addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeM();
});
function closeM() {
  $("#modal").style.display = "none";
  $("#mb").innerHTML = "";
}
const fileURL = (f) => encodeURI(f);
const isLocalFile = () => location.protocol === "file:";
const mediaFail = (m, why) =>
  `<div class="mfail"><div class="ic" style="width:100%;height:120px">${ico(m.type)}</div><h4>${why}</h4><p class="mono">${h(m.file)}</p><div class="act"><a class="btn" href="${fileURL(m.file)}" target="_blank" rel="noopener">Open in new tab</a><a class="ghost" href="${fileURL(m.file)}" download>⬇ Download</a></div></div>`;
async function fileExists(url) {
  try {
    const r = await fetch(url, { method: "HEAD", cache: "no-store" });
    return r.ok;
  } catch (e) {
    return false;
  }
}
async function openMat(id) {
  const m = mat(id);
  if (!m) return;
  const H = hist().filter((x) => x.id !== id);
  ls.set(key("h"), [{ id, at: Date.now() }, ...H].slice(0, 100));
  const u = h(fileURL(m.file));
  const head = `<div class="row" style="padding:0 0 12px;margin:0"><b>${h(m.title)}</b><button class="ghost" data-x aria-label="Close">✕</button></div>`;
  $("#mb").innerHTML = head + `<div class="mfail"><span class="load"></span></div>`;
  $("#modal").style.display = "grid";
  glitchAll();
  let body = "";
  if (isLocalFile()) {
    body = mediaFail(
      m,
      "Run the project through a local server (double-click start.bat / start.sh) so files can open.",
    );
  } else if (!(await fileExists(fileURL(m.file)))) {
    body = mediaFail(m, "File not found. Check the path in js/data/ and the file name in media/.");
  } else if (m.type === "pdf") {
    const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    body = mobile
      ? mediaFail(m, "PDF preview is not supported on this device. Use the buttons below.")
      : `<object data="${u}#toolbar=1&navpanes=0" type="application/pdf" class="pdfv" aria-label="${h(m.title)}">${mediaFail(m, "Your browser can't preview this PDF.")}</object>`;
  } else if (m.type === "audio")
    body = `<div class="ic" style="width:100%;height:120px">${ico("audio")}</div><audio controls preload="metadata" src="${u}"></audio>`;
  else if (m.type === "video") body = `<video controls playsinline preload="metadata" src="${u}"></video>`;
  else body = `<img src="${u}" alt="${h(m.title)}">`;
  if (!$("#mb") || $("#modal").style.display === "none") return;
  $("#mb").innerHTML = head + body;
  const el = $("#mb").querySelector("audio,video,img");
  if (el) el.onerror = () => ($("#mb").innerHTML = head + mediaFail(m, "This file couldn't be loaded."));
}
// startup check: logs any registered file that is missing
async function checkMaterials() {
  if (isLocalFile()) return;
  for (const m of MATS) if (!(await fileExists(fileURL(m.file)))) console.warn("[BUG] missing file:", m.file);
}
addEventListener("load", checkMaterials);
// ---------- 3D carousel (coverflow) ----------
let flowCur = 0;
const flowHTML = () =>
  `<div class="flowwrap"><div class="cnt mono" id="fcnt"></div><div class="flow" id="flow" tabindex="0" role="group" aria-roledescription="carousel" aria-label="Subjects">${SUBJECTS.map((s, i) => `<button class="fcard" data-i="${i}" aria-label="${h(s.name)}"><span class="fn">${String(i + 1).padStart(2, "0")}</span><div class="fi">${s.icon}</div><h3>${h(s.name)}</h3><p>${h(s.desc)}</p><span class="n mono">${MATS.filter((m) => m.sid === s.id).length} materials</span></button>`).join("")}</div><div class="flownav"><button class="ghost" data-fl="-1" aria-label="Previous">←</button><button class="ghost" data-fl="1" aria-label="Next">→</button></div></div>`;
function initFlow() {
  const f = $("#flow");
  if (!f) return;
  const cards = [...f.children],
    N = cards.length;
  const lay = () => {
    if (!$("#flow")) return;
    const step = Math.min(250, f.clientWidth * 0.3);
    flowCur = Math.max(0, Math.min(N - 1, flowCur));
    cards.forEach((c, i) => {
      const d = i - flowCur,
        x = Math.abs(d);
      c.classList.toggle("on", !d);
      c.tabIndex = d ? -1 : 0;
      c.style.transform = `translate(-50%,-50%) translateX(${d * step}px) translateZ(${-x * 140}px) rotateY(${Math.max(-60, Math.min(60, -d * 38))}deg)`;
      c.style.opacity = x > 3 ? 0 : 1 - x * 0.22;
      c.style.filter = `brightness(${1 - x * 0.2})`;
      c.style.zIndex = N - x;
      c.style.pointerEvents = x > 3 ? "none" : "auto";
    });
    $("#fcnt").innerHTML =
      `${String(flowCur + 1).padStart(2, "0")}<small>/${String(N).padStart(2, "0")}</small>`;
  };
  const mv = (n) => {
    flowCur += n;
    lay();
  };
  lay();
  let sx = null,
    moved = false,
    lock = 0;
  f.addEventListener("pointerdown", (e) => {
    sx = e.clientX;
    moved = false;
  });
  if (initFlow.up) removeEventListener("pointerup", initFlow.up);
  initFlow.up = (e) => {
    if (sx === null) return;
    const dx = e.clientX - sx;
    sx = null;
    if (Math.abs(dx) > 40) {
      moved = true;
      mv(dx < 0 ? 1 : -1);
    }
  };
  addEventListener("pointerup", initFlow.up);
  if (initFlow.rs) removeEventListener("resize", initFlow.rs);
  initFlow.rs = lay;
  addEventListener("resize", lay);
  f.addEventListener("click", (e) => {
    if (moved) {
      moved = false;
      return;
    }
    const c = e.target.closest(".fcard");
    if (!c) return;
    const i = +c.dataset.i;
    if (i === flowCur) go("s:" + SUBJECTS[i].id);
    else {
      flowCur = i;
      lay();
    }
  });
  f.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") mv(1);
    else if (e.key === "ArrowLeft") mv(-1);
  });
  f.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 20) {
        e.preventDefault();
        if (Date.now() < lock) return;
        lock = Date.now() + 350;
        mv(e.deltaX > 0 ? 1 : -1);
      }
    },
    { passive: false },
  );
  document.querySelectorAll("[data-fl]").forEach((b) => (b.onclick = () => mv(+b.dataset.fl)));
}
// ---------- Profile photo & tasks form ----------
document.addEventListener("change", (e) => {
  if (e.target.id !== "pic" || !me) return;
  const f = e.target.files[0];
  if (!f) return;
  const img = new Image(),
    u = URL.createObjectURL(f);
  img.onload = () => {
    const S = 256,
      c = document.createElement("canvas");
    c.width = c.height = S;
    const s = Math.min(img.width, img.height);
    c.getContext("2d").drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, S, S);
    ls.set(key("av"), c.toDataURL("image/jpeg", 0.85));
    URL.revokeObjectURL(u);
    render("settings");
  };
  img.onerror = () => URL.revokeObjectURL(u);
  img.src = u;
});
document.addEventListener("submit", (e) => {
  if (e.target.id !== "tf" || !me) return;
  e.preventDefault();
  const t = $("#tt").value.trim();
  if (!t) return;
  ls.set(key("t"), [
    ...tasks(),
    {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      text: t.slice(0, 120),
      sid: $("#ts").value,
      due: $("#td").value,
      done: false,
      at: Date.now(),
    },
  ]);
  render("tasks");
  $("#tt").focus();
});
// ---------- Glitch effect on headings & card names ----------
function glitchAll() {
  document.querySelectorAll("#main h1,#main h2,#main h3,#main h4,#modal b").forEach((el) => {
    if (el.dataset.t) return;
    el.classList.add("glitch");
    el.dataset.t = el.textContent;
  });
}
// ---------- Roaming bug on the login screen ----------
(function () {
  const bug = $("#bug"),
    lg = $("#login");
  if (!bug || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  let x = innerWidth * 0.1,
    y = innerHeight * 0.2,
    a = 0,
    tx = x,
    ty = y,
    pause = 0,
    last = performance.now(),
    t = 0;
  const pick = () => {
    tx = 30 + Math.random() * (lg.clientWidth - 60);
    ty = 30 + Math.random() * (lg.clientHeight - 60);
  };
  pick();
  (function loop(now) {
    requestAnimationFrame(loop);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (lg.style.display === "none") return;
    t += dt;
    if (pause > 0) {
      pause -= dt;
    } else {
      const want = Math.atan2(ty - y, tx - x);
      let d = want - a;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      a += Math.max(-4 * dt, Math.min(4 * dt, d));
      const v = 110;
      x += Math.cos(a) * v * dt;
      y += Math.sin(a) * v * dt;
      if (Math.hypot(tx - x, ty - y) < 24) {
        pick();
        if (Math.random() < 0.3) pause = 0.5 + Math.random() * 1.2;
      }
    }
    const w = Math.sin(t * 16) * 0.12;
    bug.style.transform = `translate(${x - 17}px,${y - 17}px) rotate(${a + Math.PI / 2 + w}rad)`;
  })(last);
})();
// ---------- Restore session / route guard ----------
try {
  const s = JSON.parse(sessionStorage.getItem("bug:sess"));
  if (s && Object.hasOwn(USERS, s.u)) {
    me = s.u;
    $("#login").style.display = "none";
    boot();
  }
} catch {}
