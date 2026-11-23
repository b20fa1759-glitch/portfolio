/* =========================================================
   BUBBLE PORTFOLIO — script.js
   Plain JavaScript, no libraries.

   Sections of this file:
     1. CONFIG        ← all your text lives here, edit this part
     2. Intro text
     3. Creating the bubbles
     4. Physics loop (springs, collisions, walls)
     5. Dragging and throwing
     6. Panels (About / Skills / Projects / Contact)
     7. Sound, theme, easter egg
   ========================================================= */


/* ---------- 1. CONFIG: change everything here ---------- */
const CONFIG = {
  hello: "Сайн байна уу? Миний нэрийг",
  name: "Бат-Амгалан Тэмүгэ",
  nameAfter: "гэдэг.",                   // small word after the name
  role: "Мэдээллийн систем",
  tagline: "Би компьютерийн чиглэлээр хөгжүүлэлт, бүтээл, сурталчилгаа хийх дуртай.",
  photo: "images/me.jpg",

  about: {
    hello: "Миний нэрийг Тэмүгэ гэдэг.",
    bio: [
      "Би 1-р сургуулийг төгссөн. Зар сурталчилгаа, мэдээлэл болон нээлтийн үйл ажиллагааны постер хийх дуртай учраас график дизайнаар ажиллах дуртай.",
      "Мөн спортоор хичээллэх, кино үзэх, байгальд гарах дуртай."
    ],
    // the text that spins around the photo
    ringText: "ТЭМҮГЭ • МЭДЭЭЛЛИЙН СИСТЕМ • УЛААНБААТАР • ",
    hobbies: [
      { icon: "🎨", name: "График дизайн", note: "Постер, зар сурталчилгаа" },
      { icon: "⚽", name: "Спорт",          note: "Хөдөлгөөнтэй байх" },
      { icon: "🎬", name: "Кино үзэх",      note: "Шинэ кино бүр" },
      { icon: "🏔️", name: "Байгальд гарах", note: "Цэвэр агаар, аялал" }
    ],
    // oldest first (left → right on the timeline)
    education: [
      {
        years: "2017 – 2020",
        school: "1-р сургууль",
        detail: "Төгссөн",
        image: "images/school.jpg"
      },
      {
        years: "",                         // empty = no years shown
        school: "Санхүү Эдийн Засгийн Их Сургууль",
        detail: "Мэдээллийн систем · Төгссөн",
        image: "images/ufe.jpg"
      }
    ]
  },

  // level = 0–100. "short" = shorter name for the small bubbles on the home screen.
  // The 9 highest skills float as small bubbles.
  skills: [
    { group: "Фронтенд", items: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "React", level: 70 },
      { name: "Next.js", level: 55 }
    ]},
    { group: "Дизайн", items: [
      { name: "График дизайн", short: "Дизайн", level: 90 },
      { name: "Figma", level: 60 }
    ]},
    { group: "Програмчлалын хэл", items: [
      { name: "Java", level: 70 },
      { name: "Python", level: 65 },
      { name: "C++", level: 55 }
    ]},
    { group: "Өгөгдлийн сан ба бэкенд", items: [
      { name: "SQL", level: 75 },
      { name: "SQL Server Management Studio", short: "SSMS", level: 70 },
      { name: "Supabase", level: 70 },
      { name: "Node.js", level: 55 }
    ]},
    { group: "Хэрэгсэл ба программ", items: [
      { name: "Visual Studio Code", short: "VS Code", level: 85 },
      { name: "Visual Studio", level: 70 },
      { name: "Git & GitHub", level: 80 },
      { name: "Vercel", level: 75 },
      { name: "Enterprise Architect", short: "EA", level: 65 },
      { name: "Power BI", level: 70 },
      { name: "Wireshark", level: 60 }
    ]}
  ],

  // demo = a TEST account so the teacher can log in. This text is public — never a personal password.
  // full = a big picture to open when there is no live site (used for Power BI).
  projects: [
    {
      title: "ISM Дижитал музей",
      description: "Мэдээллийн Системийн Менежментийн тэнхимийн түүх, багш нар, арга хэмжээ, оюутнуудын бүтээлийг нэг дор үзүүлдэг цахим музей. Онцлог нь «Цаг хугацааны машин» — түүхэн үйл явдал, бүтээлүүдийг нэг цагийн шугам дээр он сонгон аялж үзнэ.",
      image: "images/museum.svg",
      tags: ["React", "JavaScript", "Supabase", "Vercel"],
      live: "https://ism-digital-museum-9vas.vercel.app",
      code: "https://github.com/b20fa1759-glitch/ism-digital-museum"
      // demo: { login: "...", password: "..." }      ← add a test account here
    },
    {
      title: "FoodGo — Онлайн хоол хүргэлт",
      description: "Улаанбаатарын ресторануудын цэсийг үзэж, хоолоо нэр, ангилал, үнээр хайж шүүн захиалдаг вэб систем. Хэрэглэгч бүртгүүлж нэвтэрнэ, админ хоолны цэс, зураг, захиалгаа удирдана. Бүх хүснэгтэд Row Level Security тохируулсан.",
      image: "images/foodgo.jpg",
      tags: ["React", "JavaScript", "Supabase", "SQL"],
      live: "https://food-delivery-ashen-tau.vercel.app",
      code: "https://github.com/b20fa1759-glitch/food-delivery"
      // demo: { login: "...", password: "..." }      ← add a test account here
    },
    {
      title: "Contoso Sales — Power BI дашбоард",
      description: "Contoso компанийн борлуулалтыг тив, бүтээгдэхүүний ангиллаар шүүж харуулдаг тайлан. Нийт болон онлайн борлуулалт, буцаалтын хувь, ашгийн маржин, онлайн эзлэх хувь, жилийн өсөлт (YoY), YTD, өмнөх жил, 3 сарын гулсах дүнг DAX хэмжүүрээр тооцсон.",
      image: "images/powerbi.jpg",
      tags: ["Power BI", "DAX", "SQL"],
      live: "",
      code: "",
      full: "images/powerbi-full.jpg"
    }
  ],

  contact: {
    email: "B20FA1759@ufenu.edu.mn",
    links: [
      { label: "GitHub", url: "https://github.com/b20fa1759-glitch" }
    ]
  }
};


/* ---------- 2. Fill in the intro text ---------- */
document.getElementById("hello").textContent = CONFIG.hello;
// each word gets its own <span> that never breaks (so "Бат-Амгалан" is never cut at the hyphen)
document.getElementById("name").innerHTML =
  CONFIG.name.split(" ").map(word => `<span class="word">${esc(word)}</span>`).join(" ") +
  ` <span class="name-after">${esc(CONFIG.nameAfter)}</span>`;
document.getElementById("role").textContent = CONFIG.role;
document.getElementById("tagline").textContent = CONFIG.tagline;
document.title = CONFIG.name + " — Портфолио";


/* ---------- 3. Create the bubbles ---------- */
const stage = document.getElementById("stage");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// size = radius as a fraction of the stage's smaller side
const SECTIONS = [
  { id: "about",    label: "Миний тухай", sub: "намтар",       size: 0.125 },
  { id: "skills",   label: "Ур чадвар",   sub: "технологи",    size: 0.12 },
  { id: "projects", label: "Бүтээлүүд",   sub: "миний ажлууд", size: 0.14 },
  { id: "contact",  label: "Холбогдох",   sub: "",             size: 0.115 }
];

const bodies = [];   // every bubble in the physics world

// one helper that makes a <button> bubble and its physics data
function addBubble({ type, id, html, size, mass }) {
  const el = document.createElement("button");
  el.className = "bubble " + type + (id ? " " + id : "");
  el.innerHTML = html;
  stage.appendChild(el);

  const body = {
    el, type, id,
    size,                 // relative size (turned into pixels in resize())
    r: 0,                 // radius in pixels
    mass,
    x: 0, y: 0,           // position = center of the circle
    vx: 0, vy: 0,         // velocity
    phase: Math.random() * Math.PI * 2,  // for the gentle floating wobble
    dragging: false
  };
  bodies.push(body);
  return body;
}

// center photo bubble (heavy, so it stays in the middle)
const photo = addBubble({
  type: "photo",
  html: `<img src="${CONFIG.photo}" alt="Photo of ${esc(CONFIG.name)}">`,
  size: 0.19,
  mass: 12
});
photo.el.setAttribute("aria-label", "Миний зураг — давхар дараарай");

// the 4 section bubbles
SECTIONS.forEach(s => {
  const b = addBubble({
    type: "section", id: s.id,
    html: `<span class="label">${s.label}${s.sub ? `<small>${s.sub}</small>` : ""}</span>`,   // sub-text is optional
    size: s.size,
    mass: 3
  });
  b.el.setAttribute("aria-label", "Нээх: " + s.label);
});

// all skills in one flat list: [{ name, level, group }, ...]
const ALL_SKILLS = CONFIG.skills.flatMap(g => g.items.map(s => ({ ...s, group: g.group })));

// small skill bubbles: the 9 strongest skills.
// The colored "liquid" inside each bubble is as high as the skill level.
[...ALL_SKILLS].sort((a, b) => b.level - a.level).slice(0, 9).forEach(skill => {
  const b = addBubble({
    type: "mini",
    html: `<span class="label">${esc(skill.short || skill.name)}<small>${skill.level}%</small></span>`,
    size: 0.045 + Math.min((skill.short || skill.name).length, 10) * 0.0032,   // longer word = bigger bubble
    mass: 1
  });
  b.skill = skill;                                 // remember which skill this bubble is
  b.el.style.setProperty("--level", skill.level + "%");
  b.el.setAttribute("aria-label", `${skill.name}, ${skill.level}% — дэлгэрэнгүй`);
});


/* ---------- 4. Physics ---------- */
let W = 0, H = 0;        // stage width / height in pixels

// recalculate pixel sizes when the window changes size
function resize() {
  const oldW = W, oldH = H;
  const rect = stage.getBoundingClientRect();
  W = rect.width;
  H = rect.height;
  const base = Math.min(W, H);

  bodies.forEach(b => {
    b.r = Math.max(b.type === "mini" ? 30 : 40, b.size * base);
    b.el.style.width = b.el.style.height = b.r * 2 + "px";

    // font size grows with the bubble
    if (b.type === "section") b.el.style.fontSize = b.r * 0.27 + "px";
    if (b.type === "mini") {
      const len = (b.skill.short || b.skill.name).length;
      b.el.style.fontSize = Math.max(10, Math.min(b.r * 0.42, (b.r * 2.6) / len)) + "px";
    }

    // keep bubbles in the same relative spot after a resize
    if (oldW) { b.x *= W / oldW; b.y *= H / oldH; }
  });
}

// put the bubbles somewhere random at the start, then let them fly in
function scatter() {
  bodies.forEach((b, i) => {
    if (b === photo) { b.x = W / 2; b.y = H / 2; return; }
    const angle = (i / bodies.length) * Math.PI * 2;
    const dist = Math.max(W, H) * (reduceMotion ? 0.3 : 0.65);
    b.x = W / 2 + Math.cos(angle) * dist;
    b.y = H / 2 + Math.sin(angle) * dist;
  });
}

const SPRING = 0.0016;      // how strongly bubbles are pulled toward the center
const FRICTION = 0.955;     // 1 = no friction, smaller = slows down faster
const BOUNCE = 0.75;        // how much speed is kept after hitting something
const MAX_SPEED = 45;

function step(time) {
  const cx = W / 2, cy = H / 2;

  // a) forces: spring to center + gentle wobble, then move
  for (const b of bodies) {
    if (b.dragging) continue;          // the mouse controls a dragged bubble

    const k = b === photo ? 0.03 : SPRING;
    b.vx += (cx - b.x) * k;
    b.vy += (cy - b.y) * k;

    if (!reduceMotion) {
      b.vx += Math.cos(time / 1400 + b.phase) * 0.03;
      b.vy += Math.sin(time / 1700 + b.phase) * 0.03;
    }

    b.vx *= b === photo ? 0.85 : FRICTION;
    b.vy *= b === photo ? 0.85 : FRICTION;

    // speed limit
    const speed = Math.hypot(b.vx, b.vy);
    if (speed > MAX_SPEED) { b.vx *= MAX_SPEED / speed; b.vy *= MAX_SPEED / speed; }

    b.x += b.vx;
    b.y += b.vy;
  }

  // b) collisions between every pair of bubbles (run twice = more stable)
  for (let pass = 0; pass < 2; pass++) {
    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        collide(bodies[i], bodies[j]);
      }
    }
  }

  // c) walls: keep bubbles inside the stage and bounce them back
  for (const b of bodies) {
    if (b.x < b.r)     { b.x = b.r;     b.vx =  Math.abs(b.vx) * BOUNCE; }
    if (b.x > W - b.r) { b.x = W - b.r; b.vx = -Math.abs(b.vx) * BOUNCE; }
    if (b.y < b.r)     { b.y = b.r;     b.vy =  Math.abs(b.vy) * BOUNCE; }
    if (b.y > H - b.r) { b.y = H - b.r; b.vy = -Math.abs(b.vy) * BOUNCE; }
  }

  // d) draw: move each <button> to its new position
  for (const b of bodies) {
    b.el.style.transform = `translate(${b.x - b.r}px, ${b.y - b.r}px)`;
  }

  // e) the skill info bubble follows its skill bubble around
  if (popFor) placeSkillPop();

  requestAnimationFrame(step);
}

// two circles overlap when the distance between centers < sum of radii
function collide(a, b) {
  const gap = 4;
  let dx = b.x - a.x;
  let dy = b.y - a.y;
  let dist = Math.hypot(dx, dy) || 0.01;
  const minDist = a.r + b.r + gap;
  if (dist >= minDist) return;

  // normal = direction from a to b (length 1)
  const nx = dx / dist, ny = dy / dist;

  // inverse mass: heavy = moves less. A dragged bubble acts like a wall (0).
  const ia = a.dragging ? 0 : 1 / a.mass;
  const ib = b.dragging ? 0 : 1 / b.mass;
  const total = ia + ib;
  if (total === 0) return;

  // 1) push them apart so they no longer overlap
  const overlap = minDist - dist;
  a.x -= nx * overlap * (ia / total);
  a.y -= ny * overlap * (ia / total);
  b.x += nx * overlap * (ib / total);
  b.y += ny * overlap * (ib / total);

  // 2) bounce: change velocities along the normal (simple elastic collision)
  const relVel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
  if (relVel > 0) return;                     // already moving apart
  const impulse = (-(1 + BOUNCE) * relVel) / total;
  a.vx -= impulse * ia * nx;  a.vy -= impulse * ia * ny;
  b.vx += impulse * ib * nx;  b.vy += impulse * ib * ny;

  // hard hits make a little sound
  if (-relVel > 9) bonk(Math.min(a.r, b.r), -relVel);
}


/* ---------- 5. Dragging and throwing ---------- */
let held = null;       // the bubble being dragged
let grab = {};         // where we grabbed it + recent pointer positions

bodies.forEach(b => {
  b.el.addEventListener("pointerdown", e => {
    held = b;
    b.dragging = true;
    b.el.classList.add("dragging");
    b.el.setPointerCapture(e.pointerId);
    const p = pointer(e);
    grab = { dx: p.x - b.x, dy: p.y - b.y, startX: p.x, startY: p.y, moved: 0, history: [{ ...p, t: e.timeStamp }] };
  });

  b.el.addEventListener("pointermove", e => {
    if (held !== b) return;
    const p = pointer(e);
    b.x = p.x - grab.dx;
    b.y = p.y - grab.dy;
    grab.moved = Math.max(grab.moved, Math.hypot(p.x - grab.startX, p.y - grab.startY));
    grab.history.push({ ...p, t: e.timeStamp });
    if (grab.history.length > 5) grab.history.shift();
  });

  b.el.addEventListener("pointerup", e => release(b, e));
  b.el.addEventListener("pointercancel", e => release(b, e));

  // "click" also fires for keyboard Enter/Space, so keyboard users can open sections too
  b.el.addEventListener("click", () => {
    if (b.wasDragged) { b.wasDragged = false; return; }   // a throw is not a click
    onBubbleClick(b);
  });
});

function release(b, e) {
  if (held !== b) return;
  held = null;
  b.dragging = false;
  b.el.classList.remove("dragging");

  // throw speed = how far the pointer moved over the last few events
  const h = grab.history;
  const first = h[0], last = h[h.length - 1];
  const frames = Math.max((last.t - first.t) / 16.7, 1);
  b.vx = (last.x - first.x) / frames;
  b.vy = (last.y - first.y) / frames;

  b.wasDragged = grab.moved > 6;      // moved less than 6px = it was a click
}

// pointer position relative to the stage
function pointer(e) {
  const rect = stage.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function onBubbleClick(b) {
  boing(b);
  blop(b.r);
  if (b.type === "section") openPanel(b.id, b);
  if (b.type === "mini") {
    b.vx += (Math.random() - 0.5) * 10; b.vy -= 8;   // little hop
    popFor === b ? hideSkillPop() : showSkillPop(b);  // click again = close
  }
}


/* ---------- 5b. Skill info bubble (opens when a small skill bubble is clicked) ---------- */
const skillPop = document.createElement("div");
skillPop.className = "skill-pop";
skillPop.setAttribute("role", "status");
stage.appendChild(skillPop);
let popFor = null;   // the skill bubble the info is showing for

function showSkillPop(b) {
  const skill = b.skill;
  // find every project whose tags include this skill
  const usedIn = CONFIG.projects
    .filter(p => p.tags.some(t => t.toLowerCase() === skill.name.toLowerCase()))
    .map(p => p.title);

  skillPop.innerHTML = `
    <div class="pop-top"><b>${esc(skill.name)}</b><span class="pop-pct">${skill.level}%</span></div>
    <div class="pop-bar"><i style="width:${skill.level}%"></i></div>
    <span class="pop-group">${esc(skill.group)}</span>
    <p>${usedIn.length ? "Ашигласан: " + usedIn.map(esc).join(", ") : "Төсөлд хараахан тэмдэглээгүй"}</p>
    <button class="pop-link" data-pop-open="${usedIn.length ? "projects" : "skills"}">
      ${usedIn.length ? "Бүтээлүүдийг үзэх →" : "Бүх ур чадвар →"}
    </button>`;

  if (popFor) popFor.el.classList.remove("active");
  popFor = b;
  b.el.classList.add("active");
  skillPop.classList.remove("show");
  void skillPop.offsetWidth;          // restart the pop-in animation
  skillPop.classList.add("show");
  placeSkillPop();

  skillPop.querySelector(".pop-link").addEventListener("click", e => {
    const id = e.currentTarget.dataset.popOpen;
    const from = b;
    hideSkillPop();
    openPanel(id, from);
  });
}

function hideSkillPop() {
  if (popFor) popFor.el.classList.remove("active");
  popFor = null;
  skillPop.classList.remove("show");
}

// put the info bubble above its skill bubble (or below if there's no room)
function placeSkillPop() {
  const b = popFor;
  const w = skillPop.offsetWidth, h = skillPop.offsetHeight;
  const x = Math.min(Math.max(b.x, w / 2 + 8), W - w / 2 - 8);   // don't go past the edges
  const above = b.y - b.r - h - 14 > 0;
  const y = above ? b.y - b.r - 14 - h : b.y + b.r + 14;
  skillPop.style.transform = `translate(${x - w / 2}px, ${y}px)`;
  skillPop.classList.toggle("below", !above);
  // move the little tail so it still points at the bubble
  skillPop.style.setProperty("--tail", (b.x - (x - w / 2)) + "px");
}

// click anywhere else (or press Escape) = close the info bubble
document.addEventListener("pointerdown", e => {
  if (popFor && !skillPop.contains(e.target) && !popFor.el.contains(e.target)) hideSkillPop();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") hideSkillPop(); });

function boing(b) {
  b.el.classList.remove("boing");
  void b.el.offsetWidth;            // restart the CSS animation
  b.el.classList.add("boing");
}


/* ---------- 6. Panels ---------- */
const panel = document.getElementById("panel");
const panelContent = document.getElementById("panelContent");
const closeBtn = document.getElementById("closeBtn");
let lastFocus = null;

// each function returns the HTML for one section
const render = {
  about: () => {
    const a = CONFIG.about;
    return `
    <div class="about-grid">
      <!-- photo with spinning text ring -->
      <div class="about-photo">
        <svg class="ring" viewBox="0 0 200 200" aria-hidden="true">
          <defs><path id="ringPath" d="M100,100 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0"/></defs>
          <text><textPath href="#ringPath" textLength="535" lengthAdjust="spacing">${esc(a.ringText.length < 30 ? a.ringText.repeat(2) : a.ringText)}</textPath></text>
        </svg>
        <div class="photo-frame"><img src="images/me-portrait.jpg" alt="Photo of ${esc(CONFIG.name)}"></div>
        <span class="deco d1"></span><span class="deco d2"></span><span class="deco d3"></span>
        <span class="sticker">👋 Сайн уу!</span>
      </div>

      <div class="about-text">
        <h2>Миний тухай<span class="dot">.</span></h2>
        <p class="about-hello">${esc(a.hello)}</p>
        ${a.bio.map(p => `<p>${esc(p)}</p>`).join("")}
        <h3 class="hobby-title">Миний сонирхол</h3>
        <div class="hobbies">
          ${a.hobbies.map(h => `
            <div class="hobby">
              <span class="hobby-icon" aria-hidden="true">${h.icon}</span>
              <b>${esc(h.name)}</b>
              <span>${esc(h.note)}</span>
            </div>`).join("")}
        </div>
      </div>
    </div>

    <h3 class="edu-title">Боловсрол</h3>
    <ol class="timeline">
      ${a.education.map(e => `
        <li class="edu">
          <span class="edu-dot"></span>
          <article class="edu-card">
            ${e.image
              ? `<img src="${esc(e.image)}" alt="${esc(e.school)}" loading="lazy">`
              : `<div class="edu-badge">${esc(e.badge || "")}</div>`}
            <div class="edu-body">
              ${e.years ? `<span class="edu-years">${esc(e.years)}</span>` : ""}
              <h4>${esc(e.school)}</h4>
              <p>${esc(e.detail)}</p>
            </div>
          </article>
        </li>`).join("")}
    </ol>`;
  },

  skills: () => {
    const avg = Math.round(ALL_SKILLS.reduce((sum, s) => sum + s.level, 0) / ALL_SKILLS.length);
    const best = [...ALL_SKILLS].sort((a, b) => b.level - a.level)[0];
    return `
    <h2>Ур чадвар<span class="dot">.</span></h2>
    <div class="skill-summary">
      <div><b>${ALL_SKILLS.length}</b><span>технологи, программ</span></div>
      <div><b>${esc(best.short || best.name)}</b><span>хамгийн сайн</span></div>
      <div><b>${avg}%</b><span>дундаж түвшин</span></div>
    </div>
    ${CONFIG.skills.map(g => `
      <h3>${esc(g.group)}</h3>
      <div class="rings">
        ${g.items.map(s => `
          <div class="skill-ring" style="--level:${s.level}">
            <div class="ring-wrap">
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle class="track" cx="50" cy="50" r="42"/>
                <circle class="fill" cx="50" cy="50" r="42"/>
              </svg>
              <span class="pct" data-count="${s.level}">0%</span>
            </div>
            <b>${esc(s.name)}</b>
          </div>`).join("")}
      </div>`).join("")}`;
  },

  projects: () => `
    <h2>Бүтээлүүд<span class="dot">.</span></h2>
    <div class="project-list">
      ${CONFIG.projects.map((p, i) => `
        <article class="project">
          <a class="project-img" href="${esc(p.live || p.full || p.code || p.image)}" target="_blank" rel="noopener">
            <img src="${esc(p.image)}" alt="${esc(p.title)} — дэлгэцийн зураг" loading="lazy">
          </a>
          <div class="project-body">
            <span class="project-num">0${i + 1}</span>
            <h4>${esc(p.title)}</h4>
            <p>${esc(p.description)}</p>
            <div class="tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>
            ${p.demo ? `
              <div class="demo">
                <span class="demo-title">🔑 Туршилтын эрх — өөрөө нэвтэрч үзээрэй</span>
                <div class="demo-row"><span>Нэвтрэх нэр</span><code>${esc(p.demo.login)}</code><button class="copy" data-copy="${esc(p.demo.login)}">Хуулах</button></div>
                <div class="demo-row"><span>Нууц үг</span><code>${esc(p.demo.password)}</code><button class="copy" data-copy="${esc(p.demo.password)}">Хуулах</button></div>
              </div>` : ""}
            <div class="links">
              ${p.live ? `<a class="btn solid" href="${esc(p.live)}" target="_blank" rel="noopener">Сайт руу орох ↗</a>` : ""}
              ${p.code ? `<a class="btn" href="${esc(p.code)}" target="_blank" rel="noopener">GitHub ↗</a>` : ""}
              ${p.full ? `<a class="btn solid" href="${esc(p.full)}" target="_blank" rel="noopener">Тайланг томоор үзэх ↗</a>` : ""}
            </div>
          </div>
        </article>`).join("")}
    </div>`,

  contact: () => `
    <h2>Холбогдох<span class="dot">.</span></h2>
    <p>Дадлага, хамтын ажил, эсвэл асуулт байвал надад бичээрэй:</p>
    <a class="contact-big" href="mailto:${esc(CONFIG.contact.email)}">${esc(CONFIG.contact.email)}</a>
    <div class="contact-list">
      <button class="btn solid copy" data-copy="${esc(CONFIG.contact.email)}">Имэйл хуулах</button>
    </div>
    <div class="contact-list">
      ${CONFIG.contact.links.map(l => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}
    </div>`
};

function openPanel(id, fromBubble) {
  lastFocus = document.activeElement;

  // the panel's circle grows from the clicked bubble (or the screen center)
  if (fromBubble) {
    const rect = stage.getBoundingClientRect();
    panel.style.setProperty("--x", rect.left + fromBubble.x + "px");
    panel.style.setProperty("--y", rect.top + fromBubble.y + "px");
  } else {
    panel.style.setProperty("--x", "50%");
    panel.style.setProperty("--y", "50%");
  }

  panel.dataset.section = id;
  panelContent.innerHTML = render[id]();
  panel.hidden = false;
  panel.scrollTop = 0;
  void panel.offsetWidth;            // let the browser draw the closed state first
  panel.classList.add("open");
  document.body.style.overflow = "hidden";
  history.replaceState(null, "", "#" + id);
  closeBtn.focus({ preventScroll: true });

  if (id === "skills") animateSkills();
}

// skills: fill the rings and count the numbers up from 0
function animateSkills() {
  setTimeout(() => {
    panel.querySelectorAll(".skill-ring").forEach(el => el.classList.add("go"));
    panel.querySelectorAll(".pct").forEach(el => {
      const target = Number(el.dataset.count);
      const start = performance.now();
      const tick = now => {
        const t = Math.min((now - start) / 1000, 1);          // 0 → 1 over 1 second
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))) + "%";
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, reduceMotion ? 0 : 350);
}

function closePanel() {
  if (panel.hidden) return;
  panel.classList.remove("open");
  document.body.style.overflow = "";
  history.replaceState(null, "", location.pathname);
  setTimeout(() => { panel.hidden = true; }, reduceMotion ? 0 : 600);
  if (lastFocus) lastFocus.focus({ preventScroll: true });
}

closeBtn.addEventListener("click", closePanel);
document.addEventListener("keydown", e => { if (e.key === "Escape") closePanel(); });

// plain nav buttons open the same panels
document.querySelectorAll("[data-open]").forEach(btn => {
  btn.addEventListener("click", () => {
    const b = bodies.find(x => x.id === btn.dataset.open);
    blop(b.r);
    openPanel(btn.dataset.open, b);
  });
});

// any button with data-copy="..." copies that text (email, demo login, password)
panel.addEventListener("click", e => {
  const btn = e.target.closest("[data-copy]");
  if (!btn) return;
  navigator.clipboard?.writeText(btn.dataset.copy).then(() => {
    const old = btn.textContent;
    btn.textContent = "Хуулсан ✓";
    setTimeout(() => { btn.textContent = old; }, 1300);
  });
});

// escape text so it is always shown as text, never as HTML
function esc(str) {
  return String(str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}


/* ---------- 7a. Sound (made with the Web Audio API, no files) ---------- */
let soundOn = true;
let audio = null;
let lastBonk = 0;
const soundBtn = document.getElementById("soundBtn");

// "blop": a quick tone that slides down. Bigger bubble = lower sound.
function tone(freq, volume, length) {
  if (!soundOn) return;
  audio = audio || new (window.AudioContext || window.webkitAudioContext)();
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  const now = audio.currentTime;
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.exponentialRampToValueAtTime(freq / 2.5, now + length);
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + length);
  osc.connect(gain).connect(audio.destination);
  osc.start(now);
  osc.stop(now + length);
}
function blop(r) { tone(Math.max(180, 1100 - r * 6), 0.25, 0.14); }
function bonk(r, force) {
  if (!audio || performance.now() - lastBonk < 70) return;   // only after the first click, and not too often
  lastBonk = performance.now();
  tone(Math.max(220, 900 - r * 5), Math.min(force / 120, 0.12), 0.08);
}

soundBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  soundBtn.textContent = soundOn ? "🔊" : "🔇";
  soundBtn.setAttribute("aria-label", soundOn ? "Дуу унтраах" : "Дуу асаах");
});


/* ---------- 7b. Dark / light mode (remembered in localStorage) ---------- */
const themeBtn = document.getElementById("themeBtn");

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  themeBtn.setAttribute("aria-label", theme === "dark" ? "Цайвар горим" : "Харанхуй горим");
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

let savedTheme = null;
try { savedTheme = localStorage.getItem("theme"); } catch (e) {}
setTheme(savedTheme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

themeBtn.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});


/* ---------- 7c. Easter egg: double-click my photo = bubble explosion ---------- */
photo.el.addEventListener("dblclick", () => {
  bodies.forEach(b => {
    if (b === photo) return;
    const angle = Math.atan2(b.y - photo.y, b.x - photo.x);
    b.vx += Math.cos(angle) * 40;
    b.vy += Math.sin(angle) * 40;
  });
  tone(120, 0.35, 0.4);
  showToast("💥 Нууцыг оллоо!");
});

function showToast(text) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = text;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add("show"));
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 500); }, 2200);
}

console.log("%c🫧 Сайн уу! Миний зургийг давхар дараад үзээрэй.", "font-size:14px;font-weight:bold");


/* ---------- Start ---------- */
resize();
scatter();
window.addEventListener("resize", resize);

// open a section directly if the link has #projects, #contact, …
if (render[location.hash.slice(1)]) openPanel(location.hash.slice(1));

requestAnimationFrame(step);
