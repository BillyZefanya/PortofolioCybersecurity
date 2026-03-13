/* ============================================================
   BILLY ZEFANYA — CYBERSECURITY PORTFOLIO  |  main.js
============================================================ */

/* ─── CURSOR ─── */
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursor-trail');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    trail.style.left = e.clientX + 'px';
    trail.style.top  = e.clientY + 'px';
  }, 80);
});

/* ─── MATRIX RAIN ─── */
const canvas = document.getElementById('matrix-canvas');
const ctx    = canvas.getContext('2d');
function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const CHARS = '01アイウエオカキクケコサシスセソ<>{}[]|/\\#@$%';
let drops = [];
function initDrops() {
  drops = Array(Math.floor(canvas.width / 20)).fill(1);
}
initDrops();
window.addEventListener('resize', initDrops);
function drawMatrix() {
  ctx.fillStyle = 'rgba(3,10,15,.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00e5ff';
  ctx.font = '14px "Share Tech Mono"';
  drops.forEach((y, i) => {
    ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * 20, y * 20);
    if (y * 20 > canvas.height && Math.random() > .975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawMatrix, 50);

/* ─── SKILL BARS ─── */
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting)
      e.target.querySelectorAll('.skill-fill').forEach(b => b.style.width = b.dataset.pct + '%');
  });
}, { threshold: .3 });
document.querySelectorAll('.skill-cat').forEach(el => skillObs.observe(el));

/* ─── TIMELINE ─── */
const tlObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.transition = 'opacity .5s ease, transform .5s ease';
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateX(0)';
    }
  });
}, { threshold: .2 });
document.querySelectorAll('.tl-item').forEach(el => tlObs.observe(el));

/* ─── MODAL ─── */
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) closeModal(m.id); });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape')
    document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
});

/* ─── SHARED: toggle contain/cover + drag-to-pan ─── */
function initSlot(wrap, img, toggleBtn) {
  let isCover = false;

  /* Toggle contain ↔ cover */
  if (toggleBtn) {
    toggleBtn.textContent = '⊡ CONTAIN';
    toggleBtn.addEventListener('click', e => {
      e.stopPropagation();
      isCover = !isCover;
      img.classList.toggle('cover-mode', isCover);
      toggleBtn.textContent = isCover ? '⊞ COVER' : '⊡ CONTAIN';
    });
  }

  /* Drag-to-pan */
  let dragging = false, startX, startY, scrollLeft, scrollTop;
  wrap.addEventListener('mousedown', e => {
    dragging   = true;
    startX     = e.pageX - wrap.offsetLeft;
    startY     = e.pageY - wrap.offsetTop;
    scrollLeft = wrap.scrollLeft;
    scrollTop  = wrap.scrollTop;
    wrap.style.cursor = 'grabbing';
  });
  window.addEventListener('mouseup', () => {
    dragging = false;
    wrap.style.cursor = 'grab';
  });
  wrap.addEventListener('mousemove', e => {
    if (!dragging) return;
    e.preventDefault();
    wrap.scrollLeft = scrollLeft - (e.pageX - wrap.offsetLeft - startX);
    wrap.scrollTop  = scrollTop  - (e.pageY - wrap.offsetTop  - startY);
  });
}

/* ─── PROFILE PHOTO (hero) ─── */
function initProfilePhoto() {
  const wrap      = document.querySelector('.photo-slot-wrap');
  const img       = wrap ? wrap.querySelector('img') : null;
  const toggleBtn = document.querySelector('.photo-toggle-btn');
  const ph        = document.querySelector('.photo-ph');

  if (!wrap || !img) return;

  function checkSrc() {
    const hasSrc = img.src && img.src !== window.location.href
                   && !img.src.endsWith('/') && img.naturalWidth > 0;
    img.style.display  = hasSrc ? 'block' : 'none';
    if (ph) ph.style.display = hasSrc ? 'none' : 'flex';
  }
  img.addEventListener('load',  checkSrc);
  img.addEventListener('error', () => {
    img.style.display = 'none';
    if (ph) ph.style.display = 'flex';
  });
  checkSrc();

  initSlot(wrap, img, toggleBtn);
}

/* ─── FINDING IMAGE SLOTS (modal) ─── */
function initImageSlots() {
  document.querySelectorAll('.modal-img-slot').forEach(slot => {
    const img       = slot.querySelector('img');
    const ph        = slot.querySelector('.slot-ph');
    const toggleBtn = slot.querySelector('.img-toggle-btn');
    const wrap      = slot.querySelector('.slot-img-wrap');
    if (!img || !wrap) return;

    function checkSrc() {
      const hasSrc = img.src && img.src !== window.location.href
                     && !img.src.endsWith('/') && img.naturalWidth > 0;
      img.style.display  = hasSrc ? 'block' : 'none';
      if (ph) ph.style.display = hasSrc ? 'none' : 'flex';
    }
    img.addEventListener('load',  checkSrc);
    img.addEventListener('error', () => {
      img.style.display = 'none';
      if (ph) ph.style.display = 'flex';
    });
    checkSrc();

    initSlot(wrap, img, toggleBtn);
  });
}

/* ─── ABOUT CYBER IMG ─── */
function initCyberImg() {
  const img = document.getElementById('cyber-img');
  const ph  = img ? img.nextElementSibling : null;
  if (!img) return;
  function check() {
    const ok = img.src && img.src !== window.location.href
               && !img.src.endsWith('/') && img.naturalWidth > 0;
    img.style.display = ok ? 'block' : 'none';
    if (ph) ph.style.display = ok ? 'none' : 'flex';
  }
  img.addEventListener('load',  check);
  img.addEventListener('error', () => { img.style.display = 'none'; if (ph) ph.style.display = 'flex'; });
  check();
}

document.addEventListener('DOMContentLoaded', () => {
  initProfilePhoto();
  initImageSlots();
  initCyberImg();
});
