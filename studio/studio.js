/* ===========================================================================
   AURORA STUDIO

   The editing UI. It talks to studio/server.js, which is the only thing
   allowed to write files and run git.

   The model here is deliberately simple: an edition is loaded into a plain
   object, every field on screen edits that object, and Save turns the object
   back into an edition file. The same parser the website uses does the
   reading, so what you see here is exactly what the site will see.
   =========================================================================== */

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const OCCASIONS_UI = {
  "girlfriend-day": { name: "Girlfriend Day", month: 8, day: 1 },
  "anniversary":    { name: "Our Anniversary", month: 4, day: 13 },
  "valentines":     { name: "Valentine's Day", month: 2, day: 14 },
  "birthday":       { name: "Her Birthday", month: 12, day: 22 }
};
const SCENES = ["hero", "memories", "constellation", "letter", "finale"];

let editions = [];      // everything on disk
let musicFiles = [];
let cur = null;         // the edition being edited
let dirty = false;

const pad = n => String(n).padStart(2, "0");

function toast(msg, kind) {
  const t = $("#toast");
  t.textContent = msg;
  t.className = "toast" + (kind ? " " + kind : "");
  t.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { t.hidden = true; }, 2800);
}

async function api(path, opts) {
  const r = await fetch(path, opts);
  if (!r.ok && r.status >= 500) throw new Error("The studio server stopped. Restart Edit Website.bat.");
  return r.json();
}

function markDirty() {
  dirty = true;
  $("#saveBtn").textContent = "Save •";
}
function markClean() {
  dirty = false;
  $("#saveBtn").textContent = "Save";
}

window.addEventListener("beforeunload", e => {
  if (dirty) { e.preventDefault(); e.returnValue = ""; }
});

/* ---------------- loading ---------------- */

async function boot() {
  try {
    const hello = await api("/api/hello");
    $("#branch").textContent = hello.hasRemote
      ? "on " + hello.branch + " · connected to GitHub"
      : "on " + hello.branch + " · no GitHub remote yet";
  } catch (err) {
    $("#branch").textContent = "server not responding";
  }
  await reload();
}

async function reload(keepId) {
  const data = await api("/api/editions");
  musicFiles = data.music || [];

  // Read every edition through the site's own parser.
  EDITIONS.length = 0;
  EDITION_PROBLEMS.length = 0;
  editions = data.editions.map(row => {
    const before = EDITIONS.length;
    let parsed = null, broken = row.missing;
    if (!row.missing) {
      try {
        /* Run the file the same way the browser does, with our own addEdition
           passed in. Letting JavaScript read the template literal itself means
           escaped characters - a \` backtick in her text, say - come through
           correctly, which picking the text out with a regex would not do. */
        new Function("addEdition", row.text)(text => addEdition(text, row.file));
        parsed = EDITIONS[before] || null;
        if (!parsed) broken = true;
      } catch (e) { broken = true; }
    }
    return { file: row.file, id: row.id, broken, parsed, raw: row.text };
  });

  renderList();
  if (keepId) {
    const found = editions.find(e => e.id === keepId);
    if (found) return openEdition(found);
  }
  if (!cur) { $("#editor").hidden = true; $("#emptyState").hidden = false; }
}

function liveId() {
  const today = new Date(); today.setHours(23, 59, 59, 999);
  const arrived = editions.filter(e => e.parsed && e.parsed.date <= today)
                          .sort((a, b) => b.parsed.date - a.parsed.date);
  return arrived.length ? arrived[0].id : null;
}

function renderList() {
  const live = liveId();
  const box = $("#list");
  box.innerHTML = "";
  const sorted = editions.slice().sort((a, b) => (b.parsed ? +b.parsed.date : 0) - (a.parsed ? +a.parsed.date : 0));
  sorted.forEach(e => {
    const d = document.createElement("div");
    d.className = "item" + (cur && cur.id === e.id ? " on" : "");
    const p = e.parsed;
    let pill = "";
    if (e.broken) pill = '<span class="pill err">needs fixing</span>';
    else if (e.id === live) pill = '<span class="pill live">showing now</span>';
    else if (p && p.date > new Date()) pill = '<span class="pill soon">upcoming</span>';
    d.innerHTML = "<b>" + (p ? p.occasionName : e.id) + pill + "</b><span>" +
      (p ? p.date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) +
           " · " + p.memories.length + " memories"
         : "could not be read") + "</span>";
    d.onclick = () => openEdition(e);
    box.appendChild(d);
  });
}

/* ---------------- opening one ---------------- */

function openEdition(entry) {
  if (dirty && !confirm("You have unsaved changes. Leave them?")) return;

  if (entry.broken) {
    toast("That file could not be read. Open it in VS Code — usually a stray ` backtick.", "bad");
    return;
  }
  const p = entry.parsed;
  cur = {
    id: entry.id,
    isNew: false,
    occasion: p.occasion,
    year: p.year,
    loader: p.loader, dedication: p.dedication, title: p.title,
    subtitle: p.subtitle, button: p.button, music: p.music,
    scenes: p.scenes ? p.scenes.slice() : SCENES.slice(),
    memories: p.memories.map(m => ({ photo: m.photo, title: m.title, text: m.text, w: m.w, h: m.h })),
    stars: p.constellation.map(c => ({ anchor: c.anchor, title: c.title, text: c.text })),
    sky: p.sky ? Object.assign({}, p.sky) : null,
    letter: p.letter,
    seq: (p.finale.sequence || []).slice(),
    finaleMsg: p.finale.message || "",
    signoff: p.finale.signoff || ""
  };
  markClean();
  showEditor();
}

function newEdition() {
  if (dirty && !confirm("You have unsaved changes. Leave them?")) return;
  const year = new Date().getFullYear() + 1;
  cur = {
    id: year + "-valentines", isNew: true, occasion: "valentines", year: year,
    loader: "Gathering our favorite memories... ❤️",
    dedication: "", title: "My Pori ❤️",
    subtitle: "An Interactive Story for Umme Arefin Akhand Momo",
    button: "✨ Take My Hand", music: "",
    scenes: SCENES.slice(), memories: [], stars: [], sky: null,
    letter: "", seq: ["Umme", "Umme Arefin", "Umme Arefin Akhand", "Umme Arefin Akhand Momo", "❤️ My Pori ❤️"],
    finaleMsg: "", signoff: "Made with love by Dhrubo for his Momo"
  };
  markDirty();
  showEditor();
  renderList();
}

function currentId() { return cur.year + "-" + cur.occasion; }

function showEditor() {
  $("#emptyState").hidden = true;
  $("#editor").hidden = false;

  $("#f_occasion").value = cur.occasion;
  $("#f_year").value = cur.year;
  $("#f_loader").value = cur.loader || "";
  $("#f_dedication").value = cur.dedication || "";
  $("#f_title").value = cur.title || "";
  $("#f_subtitle").value = cur.subtitle || "";
  $("#f_button").value = cur.button || "";
  $("#f_letter").value = cur.letter || "";
  $("#f_finaleMsg").value = cur.finaleMsg || "";
  $("#f_signoff").value = cur.signoff || "";

  $("#f_hasSky").checked = !!cur.sky;
  const sky = cur.sky || { year: cur.year, month: OCCASIONS_UI[cur.occasion].month,
                           day: OCCASIONS_UI[cur.occasion].day, hour: 21, place: "Dhaka" };
  $("#f_skyDate").value = sky.year + "-" + pad(sky.month) + "-" + pad(sky.day);
  $("#f_skyTime").value = pad(Math.floor(sky.hour)) + ":" + pad(Math.round((sky.hour % 1) * 60));
  $("#f_skyPlace").value = sky.place || "Dhaka";

  renderMusic();
  renderScenes();
  renderMemories();
  renderStars();
  renderSeq();
  refreshHeader();
  updateSky();
  loadPhotoList();
  renderList();
}

function refreshHeader() {
  const o = OCCASIONS_UI[cur.occasion];
  const d = new Date(cur.year, o.month - 1, o.day);
  $("#edTitle").textContent = o.name + " " + cur.year;
  $("#edMeta").textContent = d.toLocaleDateString("en-GB",
      { weekday: "long", day: "numeric", month: "long", year: "numeric" }) +
      " · editions/" + currentId() + ".js";
  $("#dateHint").textContent = "This edition takes over the website on " +
      d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) + ".";
  $("#previewBtn").href = "/index.html?preview=" + currentId();
  $("#folderHint").textContent = "Photos are saved into assets/editions/" + currentId() + "/";
}

/* ---------------- fields ---------------- */

function bind(id, key, transform) {
  $(id).addEventListener("input", () => {
    cur[key] = transform ? transform($(id).value) : $(id).value;
    markDirty();
    if (id === "#f_year" || id === "#f_occasion") { refreshHeader(); updateSky(); loadPhotoList(); }
  });
}
bind("#f_loader", "loader"); bind("#f_dedication", "dedication");
bind("#f_title", "title"); bind("#f_subtitle", "subtitle");
bind("#f_button", "button"); bind("#f_letter", "letter");
bind("#f_finaleMsg", "finaleMsg"); bind("#f_signoff", "signoff");
bind("#f_year", "year", v => +v || new Date().getFullYear());

$("#f_occasion").addEventListener("change", () => {
  cur.occasion = $("#f_occasion").value;
  const o = OCCASIONS_UI[cur.occasion];
  $("#f_skyDate").value = cur.year + "-" + pad(o.month) + "-" + pad(o.day);
  markDirty(); refreshHeader(); updateSky(); loadPhotoList(); renderList();
});

function renderScenes() {
  const box = $("#f_scenes");
  box.innerHTML = "";
  SCENES.forEach(s => {
    const id = "scene_" + s;
    const lab = document.createElement("label");
    lab.innerHTML = '<input type="checkbox" id="' + id + '"> ' + s;
    box.appendChild(lab);
    const cb = lab.querySelector("input");
    cb.checked = cur.scenes.indexOf(s) !== -1;
    cb.onchange = () => {
      cur.scenes = SCENES.filter(x =>
        x === s ? cb.checked : cur.scenes.indexOf(x) !== -1);
      markDirty();
    };
  });
}

function renderMusic() {
  const sel = $("#f_music");
  sel.innerHTML = '<option value="">— no music —</option>';
  musicFiles.forEach(f => {
    const o = document.createElement("option");
    o.value = "assets/music/" + f;
    o.textContent = f;
    sel.appendChild(o);
  });
  if (cur.music && musicFiles.indexOf(cur.music.split("/").pop()) === -1) {
    const o = document.createElement("option");
    o.value = cur.music; o.textContent = cur.music + " (missing)";
    sel.appendChild(o);
  }
  sel.value = cur.music || "";
  updateMusicPreview();
}
$("#f_music").addEventListener("change", () => {
  cur.music = $("#f_music").value; markDirty(); updateMusicPreview();
});
function updateMusicPreview() {
  const a = $("#musicPreview");
  if (cur.music) { a.src = "/" + cur.music; a.hidden = false; }
  else { a.removeAttribute("src"); a.hidden = true; }
}

$("#musicUploadBtn").onclick = () => $("#musicFile").click();
$("#musicFile").onchange = async e => {
  const f = e.target.files[0];
  if (!f) return;
  toast("Saving " + f.name + "…");
  const r = await api("/api/upload?kind=music&name=" + encodeURIComponent(f.name),
    { method: "POST", body: f });
  if (r.ok) {
    if (musicFiles.indexOf(f.name) === -1) musicFiles.push(f.name);
    cur.music = r.path; markDirty(); renderMusic();
    toast("Music added", "good");
  } else toast(r.error || "Could not save that file", "bad");
  e.target.value = "";
};

/* ---------------- memories ---------------- */

async function loadPhotoList() {
  try {
    const r = await api("/api/photos?id=" + encodeURIComponent(currentId()));
    cur._onDisk = (r.photos || []).map(p => p.name);
  } catch (e) { cur._onDisk = []; }
  renderMemories();
}

function renderMemories() {
  const box = $("#memories");
  box.innerHTML = "";
  if (!cur.memories.length) {
    box.innerHTML = '<p class="hint">No memories yet. Drag some photos in above.</p>';
    return;
  }
  cur.memories.forEach((m, i) => {
    const d = document.createElement("div");
    d.className = "mem";
    const onDisk = !cur._onDisk || cur._onDisk.indexOf(m.photo) !== -1;
    const src = "/assets/editions/" + currentId() + "/" + m.photo;
    d.innerHTML =
      (m.photo && onDisk
        ? '<img src="' + src + '" alt="">'
        : '<div class="noimg">' + (m.photo ? m.photo + "<br>not in the folder yet" : "no photo") + "</div>") +
      '<div class="memBody">' +
        '<div class="memTop">' +
          '<span class="file">' + (m.photo || "—") +
            (m.w ? "  ·  " + m.w + "×" + m.h : "") + "</span>" +
          '<button class="iconBtn" data-up="' + i + '" title="Move up">↑</button>' +
          '<button class="iconBtn" data-down="' + i + '" title="Move down">↓</button>' +
          '<button class="iconBtn rm" data-rm="' + i + '" title="Remove">✕</button>' +
        "</div>" +
        '<input data-title="' + i + '" placeholder="Title of this memory">' +
        '<textarea data-text="' + i + '" rows="4" placeholder="The story…"></textarea>' +
      "</div>";
    box.appendChild(d);
    d.querySelector("[data-title]").value = m.title || "";
    d.querySelector("[data-text]").value = m.text || "";
  });

  box.querySelectorAll("[data-title]").forEach(el =>
    el.oninput = () => { cur.memories[+el.dataset.title].title = el.value; markDirty(); });
  box.querySelectorAll("[data-text]").forEach(el =>
    el.oninput = () => { cur.memories[+el.dataset.text].text = el.value; markDirty(); });
  box.querySelectorAll("[data-rm]").forEach(el =>
    el.onclick = () => {
      const i = +el.dataset.rm;
      if (!confirm("Remove “" + (cur.memories[i].title || cur.memories[i].photo) + "” from this edition?\n\nThe photo file stays in the folder.")) return;
      cur.memories.splice(i, 1); markDirty(); renderMemories();
    });
  box.querySelectorAll("[data-up]").forEach(el =>
    el.onclick = () => { const i = +el.dataset.up; if (i > 0) swap(i, i - 1); });
  box.querySelectorAll("[data-down]").forEach(el =>
    el.onclick = () => { const i = +el.dataset.down; if (i < cur.memories.length - 1) swap(i, i + 1); });
}
function swap(a, b) {
  const t = cur.memories[a]; cur.memories[a] = cur.memories[b]; cur.memories[b] = t;
  markDirty(); renderMemories();
}

$("#addBlank").onclick = () => {
  cur.memories.push({ photo: "", title: "", text: "", w: null, h: null });
  markDirty(); renderMemories();
};

/* photos: read the size in the browser, then send the file to the server */
$("#drop").onclick = () => $("#photoFiles").click();
$("#drop").ondragover = e => { e.preventDefault(); $("#drop").classList.add("over"); };
$("#drop").ondragleave = () => $("#drop").classList.remove("over");
$("#drop").ondrop = e => {
  e.preventDefault(); $("#drop").classList.remove("over");
  addPhotos(e.dataTransfer.files);
};
$("#photoFiles").onchange = e => { addPhotos(e.target.files); e.target.value = ""; };

async function addPhotos(fileList) {
  const files = [...fileList].filter(f => /^image\//.test(f.type));
  if (!files.length) return;
  toast("Saving " + files.length + " photo" + (files.length > 1 ? "s" : "") + "…");

  // Keep the order they were dropped in: reserve each slot first.
  const start = cur.memories.length;
  files.forEach((f, i) => {
    cur.memories[start + i] = { photo: f.name, title: "", text: "", w: null, h: null };
  });
  renderMemories();

  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const size = await readSize(f);
    cur.memories[start + i].w = size.w;
    cur.memories[start + i].h = size.h;
    const r = await api("/api/upload?kind=photo&id=" + encodeURIComponent(currentId()) +
                        "&name=" + encodeURIComponent(f.name), { method: "POST", body: f });
    if (!r.ok) toast("Could not save " + f.name, "bad");
  }
  markDirty();
  await loadPhotoList();
  toast("Photos added", "good");
}

function readSize(file) {
  return new Promise(resolve => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { resolve({ w: img.naturalWidth, h: img.naturalHeight }); URL.revokeObjectURL(url); };
    img.onerror = () => resolve({ w: null, h: null });
    img.src = url;
  });
}

/* ---------------- sky ---------------- */

$("#f_hasSky").onchange = () => { markDirty(); updateSky(); };
["#f_skyDate", "#f_skyTime", "#f_skyPlace"].forEach(id =>
  $(id).addEventListener("change", () => { markDirty(); updateSky(); }));

function skyFromFields() {
  if (!$("#f_hasSky").checked || !$("#f_skyDate").value) return null;
  const [y, m, d] = $("#f_skyDate").value.split("-").map(Number);
  const [hh, mm] = ($("#f_skyTime").value || "21:00").split(":").map(Number);
  return { year: y, month: m, day: d, hour: hh + mm / 60, place: $("#f_skyPlace").value };
}

function updateSky() {
  const on = $("#f_hasSky").checked;
  $("#skyFields").style.opacity = on ? 1 : .4;
  $("#skyFields").style.pointerEvents = on ? "auto" : "none";
  $("#starCard").style.opacity = on ? 1 : .4;
  $("#starCard").style.pointerEvents = on ? "auto" : "none";

  cur.sky = skyFromFields();
  if (!cur.sky) { $("#skyInfo").innerHTML = "The constellation scene is left out."; return; }

  const s = computeSky(cur.sky);
  const sun = sunAltitude(cur.sky);
  let html = "<b>" + s.meta.starCount + " stars</b> were above " + s.meta.place +
             " on " + s.meta.when + ", in " + s.meta.constellations + " constellations.";
  if (sun > 0) {
    html += '<br><span class="w">The sun was still ' + sun.toFixed(0) +
      "° up then — this would be a daylight sky. Try 9:00 PM.</span>";
  } else if (sun > -12) {
    html += '<br><span class="w">Twilight. Only the brightest stars would show.</span>';
  } else {
    html += '<br><span class="g">Properly dark — this is the sky she could have seen.</span>';
  }
  $("#skyInfo").innerHTML = html;
  renderStars();
}

function renderStars() {
  const box = $("#stars");
  box.innerHTML = "";
  const up = cur.sky ? computeSky(cur.sky).stars.slice().sort((a, b) => a.mag - b.mag) : [];

  cur.stars.forEach((st, i) => {
    const row = document.createElement("div");
    row.className = "starRow";
    const sel = document.createElement("select");
    up.forEach(s => {
      const o = document.createElement("option");
      o.value = s.id;
      o.textContent = s.name + "  (mag " + s.mag + ")";
      sel.appendChild(o);
    });
    if (!up.some(s => s.id === st.anchor)) {
      const o = document.createElement("option");
      o.value = st.anchor;
      o.textContent = st.anchor + " — was not in the sky that night";
      sel.appendChild(o);
    }
    sel.value = st.anchor;
    sel.onchange = () => { st.anchor = sel.value; markDirty(); };

    const t = document.createElement("input");
    t.placeholder = "Which memory"; t.value = st.title || "";
    t.oninput = () => { st.title = t.value; markDirty(); };

    const x = document.createElement("input");
    x.placeholder = "One line about it"; x.value = st.text || "";
    x.oninput = () => { st.text = x.value; markDirty(); };

    const rm = document.createElement("button");
    rm.className = "iconBtn rm"; rm.textContent = "✕";
    rm.onclick = () => { cur.stars.splice(i, 1); markDirty(); renderStars(); };

    row.append(sel, t, x, rm);
    box.appendChild(row);
  });
  if (!cur.stars.length) box.innerHTML = '<p class="hint">No stars yet.</p>';
}

$("#addStar").onclick = () => {
  const up = cur.sky ? computeSky(cur.sky).stars.slice().sort((a, b) => a.mag - b.mag) : [];
  cur.stars.push({ anchor: up.length ? up[0].id : "sirius", title: "", text: "" });
  markDirty(); renderStars();
};

/* ---------------- the ending ---------------- */

function renderSeq() {
  const box = $("#seq");
  box.innerHTML = "";
  cur.seq.forEach((step, i) => {
    const row = document.createElement("div");
    row.className = "seqRow";
    const inp = document.createElement("input");
    inp.value = step;
    inp.oninput = () => { cur.seq[i] = inp.value; markDirty(); };
    const rm = document.createElement("button");
    rm.className = "iconBtn rm"; rm.textContent = "✕";
    rm.onclick = () => { cur.seq.splice(i, 1); markDirty(); renderSeq(); };
    row.append(inp, rm);
    box.appendChild(row);
  });
}
$("#addSeq").onclick = () => { cur.seq.push(""); markDirty(); renderSeq(); };

/* ---------------- tabs ---------------- */

$$(".tab").forEach(t => t.onclick = () => {
  $$(".tab").forEach(x => x.classList.toggle("on", x === t));
  $$(".pane").forEach(p => p.classList.toggle("on", p.dataset.pane === t.dataset.tab));
});

/* ---------------- writing the file ---------------- */

/* A backtick would end the text early and break the file. Escaping it as \`
   is exactly what a template literal expects, and the parser gets a normal
   backtick back - so you can type whatever you like and it still works. */
function safeText(s) {
  return String(s == null ? "" : s).replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function buildFile() {
  const o = OCCASIONS_UI[cur.occasion];
  const L = [];
  L.push("/* ---------------------------------------------------------------------");
  L.push("   " + o.name + " " + cur.year);
  L.push("");
  L.push("   Written by Aurora Studio. You can edit this by hand if you like -");
  L.push("   only the addEdition line below and the last line are code.");
  L.push("   --------------------------------------------------------------------- */");
  L.push("");
  L.push("addEdition(`");
  L.push("");
  L.push("occasion: " + cur.occasion);
  L.push("date: " + cur.year + "-" + pad(o.month) + "-" + pad(o.day));
  L.push("title: " + safeText(cur.title));
  if (cur.dedication) L.push("dedication: " + safeText(cur.dedication));
  if (cur.subtitle) L.push("subtitle: " + safeText(cur.subtitle));
  if (cur.button) L.push("button: " + safeText(cur.button));
  if (cur.loader) L.push("loader: " + safeText(cur.loader));
  if (cur.music) L.push("music: " + cur.music);
  if (cur.scenes.length && cur.scenes.length < SCENES.length)
    L.push("scenes: " + cur.scenes.join(", "));

  if (cur.sky) {
    L.push("");
    L.push("sky: " + cur.sky.year + "-" + pad(cur.sky.month) + "-" + pad(cur.sky.day) +
           " " + pad(Math.floor(cur.sky.hour)) + ":" + pad(Math.round((cur.sky.hour % 1) * 60)));
    L.push("sky-place: " + cur.sky.place);
  }
  L.push("");

  cur.memories.forEach(m => {
    L.push("--- memory ---");
    L.push("photo: " + m.photo);
    L.push("title: " + safeText(m.title));
    if (m.w && m.h) { L.push("width: " + m.w); L.push("height: " + m.h); }
    L.push(safeText(m.text));
    L.push("");
  });

  cur.stars.forEach(s => {
    L.push("--- star ---");
    L.push("anchor: " + s.anchor);
    L.push("title: " + safeText(s.title));
    L.push(safeText(s.text));
    L.push("");
  });

  if (cur.letter && cur.letter.trim()) {
    L.push("--- letter ---");
    L.push(safeText(cur.letter.trim()));
    L.push("");
  }

  const seq = cur.seq.filter(s => s.trim());
  if (seq.length || cur.finaleMsg.trim()) {
    L.push("--- finale ---");
    if (seq.length) L.push("name: " + safeText(seq.join(" | ")));
    if (cur.signoff) L.push("signoff: " + safeText(cur.signoff));
    L.push(safeText(cur.finaleMsg.trim()));
    L.push("");
  }

  L.push("`);");
  L.push("");
  return L.join("\n");
}

$("#saveBtn").onclick = async () => {
  const id = currentId();
  const clash = editions.find(e => e.id === id && cur.isNew);
  if (clash && !confirm("There is already an edition for " + id + ". Overwrite it?")) return;

  const r = await api("/api/save", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id, text: buildFile() })
  });
  if (!r.ok) return toast(r.error || "Could not save", "bad");

  markClean();
  cur.isNew = false;
  cur.id = id;
  await reload(id);
  toast("Saved to " + r.file, "good");
};

$("#deleteBtn").onclick = async () => {
  if (!confirm("Delete this whole edition?\n\nThe photos stay in their folder — only the edition file goes.")) return;
  const r = await api("/api/delete", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: cur.id })
  });
  if (!r.ok) return toast(r.error || "Could not delete", "bad");
  cur = null; markClean();
  $("#editor").hidden = true; $("#emptyState").hidden = false;
  await reload();
  toast("Deleted", "good");
};

$("#newBtn").onclick = newEdition;

/* ---------------- publishing ---------------- */

$("#publishBtn").onclick = async () => {
  if (dirty && !confirm("You have unsaved changes that will not be published. Continue?")) return;
  const r = await api("/api/changes");
  const list = r.changes || [];
  $("#changeCount").textContent = list.length
    ? list.length + (list.length === 1 ? " file has changed" : " files have changed")
    : "Nothing has changed since the last publish.";
  $("#changeList").textContent = list.join("\n") || "—";
  $("#publishResult").innerHTML = "";
  $("#doPublish").disabled = !list.length;
  $("#publishModal").hidden = false;
};
$("#cancelPublish").onclick = () => { $("#publishModal").hidden = true; };
$("#publishModal").onclick = e => { if (e.target.id === "publishModal") $("#publishModal").hidden = true; };

$("#doPublish").onclick = async () => {
  $("#doPublish").disabled = true;
  $("#publishResult").textContent = "Publishing…";
  const r = await api("/api/publish", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: $("#commitMsg").value })
  });
  if (r.nothing) $("#publishResult").innerHTML = '<span class="w">Nothing to publish.</span>';
  else if (!r.ok) $("#publishResult").innerHTML = '<span class="b">' + (r.error || "Failed") + "</span>";
  else if (r.pushed) {
    $("#publishResult").innerHTML = '<span class="g">Published. It is live on GitHub.</span>';
    setTimeout(() => { $("#publishModal").hidden = true; }, 1800);
  } else {
    $("#publishResult").innerHTML = '<span class="w">' + (r.note || "Committed but not uploaded.") + "</span>";
  }
  $("#doPublish").disabled = false;
};

boot();
