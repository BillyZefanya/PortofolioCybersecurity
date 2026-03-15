/* ======================================================
   main.js — Billy Zefanya Cybersecurity Portfolio
   ====================================================== */

// ===== CUSTOM CURSOR =====
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let dotX = 0, dotY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  dotX += (mouseX - dotX) * 0.15;
  dotY += (mouseY - dotY) * 0.15;
  cursorDot.style.left = dotX + 'px';
  cursorDot.style.top = dotY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect on interactive elements
document.querySelectorAll('a, button, .team-card, .finding-card, .contact-card, .tab-btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursorDot.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorDot.classList.remove('hover'));
});

// ===== TERMINAL TYPING ANIMATION =====
function typeText(element, text, speed = 60) {
  return new Promise(resolve => {
    let i = 0;
    const interval = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

async function runTerminalSequence() {
  await new Promise(r => setTimeout(r, 800));
  const line1 = document.getElementById('typedLine1');
  await typeText(line1, 'whoami', 80);
  line1.innerHTML += '<span class="t-cursor"></span>';

  await new Promise(r => setTimeout(r, 600));
  line1.innerHTML = '<span class="t-cmd">whoami</span>';

  await new Promise(r => setTimeout(r, 400));
  document.getElementById('tLine2').classList.remove('hidden');

  await new Promise(r => setTimeout(r, 1000));
  document.getElementById('tOutput').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', runTerminalSequence);

// ===== TEAM SELECTION FROM HERO =====
function selectTeam(team) {
  // Scroll to projects section
  const projectsSection = document.getElementById('projects');
  projectsSection.scrollIntoView({ behavior: 'smooth' });

  // Switch tab after scroll
  setTimeout(() => switchTab(team), 800);
}

// ===== PROJECT TAB SWITCHING =====
function switchTab(team) {
  const redContent = document.getElementById('redContent');
  const blueContent = document.getElementById('blueContent');
  const tabRed = document.getElementById('tabRed');
  const tabBlue = document.getElementById('tabBlue');

  if (team === 'red') {
    redContent.classList.remove('hidden');
    blueContent.classList.add('hidden');
    tabRed.classList.add('active-red');
    tabRed.classList.remove('active-blue');
    tabBlue.classList.remove('active-red', 'active-blue');
  } else {
    blueContent.classList.remove('hidden');
    redContent.classList.add('hidden');
    tabBlue.classList.add('active-blue');
    tabBlue.classList.remove('active-red');
    tabRed.classList.remove('active-red', 'active-blue');
  }
}

// ===== NAVIGATION SCROLL HANDLING =====
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveNavLink() {
  const sections = ['home', 'about', 'projects', 'contact'];
  const scrollPos = window.scrollY + 100;

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[data-section="${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('data-section');
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Add reveal styles dynamically
const revealStyle = document.createElement('style');
revealStyle.textContent = `
  .reveal-target {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  .reveal-target.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-delay-1 { transition-delay: 0.1s !important; }
  .reveal-delay-2 { transition-delay: 0.2s !important; }
  .reveal-delay-3 { transition-delay: 0.3s !important; }
  .reveal-delay-4 { transition-delay: 0.4s !important; }
`;
document.head.appendChild(revealStyle);

// Apply reveal to elements
function applyScrollReveal() {
  const targets = [
    '.about-grid',
    '.info-block',
    '.skills-block',
    '.project-header-card',
    '.finding-card',
    '.timeline-item',
    '.summary-card',
    '.contact-card',
    '.availability-banner',
    '.timeline-section',
    '.project-tabs'
  ];

  targets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal-target');
      if (i === 1) el.classList.add('reveal-delay-1');
      if (i === 2) el.classList.add('reveal-delay-2');
      if (i === 3) el.classList.add('reveal-delay-3');
      if (i >= 4) el.classList.add('reveal-delay-4');
      revealObserver.observe(el);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(applyScrollReveal, 100);
});

// ===== GLITCH EFFECT ON HERO NAME =====
const heroName = document.querySelector('.hero-name');
if (heroName) {
  setInterval(() => {
    heroName.style.textShadow = `${Math.random() * 4 - 2}px 0 ${getComputedStyle(document.documentElement).getPropertyValue('--cyan')}`;
    setTimeout(() => {
      heroName.style.textShadow = 'none';
    }, 80);
  }, 3000);
}

// ===== STATS COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

// Observe summary numbers for counter animation
const summaryNums = document.querySelectorAll('.summary-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const val = parseInt(el.textContent);
      if (!isNaN(val) && val > 9) {
        animateCounter(el, val);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

summaryNums.forEach(el => counterObserver.observe(el));

// ===== MATRIX RAIN EFFECT (subtle, in hero background) =====
function createMatrixRain() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.03;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*<>/\\|{}[]';
  const fontSize = 12;
  const cols = Math.floor(canvas.width / fontSize);
  const drops = Array(cols).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(5, 10, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00c8ff';
    ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    });
  }

  setInterval(draw, 60);

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

createMatrixRain();

// ===== KEYBOARD SHORTCUT EASTER EGG =====
let konamiCode = '';
const konamiTarget = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRight';
document.addEventListener('keydown', (e) => {
  konamiCode += e.key;
  if (konamiCode.length > konamiTarget.length) {
    konamiCode = konamiCode.slice(-konamiTarget.length);
  }
  if (konamiCode === konamiTarget) {
    document.body.style.filter = 'hue-rotate(180deg)';
    setTimeout(() => document.body.style.filter = '', 2000);
    konamiCode = '';
  }
});

// ===== LOADING STATE FOR IMAGES =====
document.querySelectorAll('.evidence-img').forEach(img => {
  img.addEventListener('load', () => {
    img.style.opacity = '1';
  });
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.4s ease';
  if (img.complete) img.style.opacity = '1';
});

console.log('%c[SYSTEM] Portfolio loaded. Operator: Billy Zefanya', 'color: #00c8ff; font-family: monospace; font-size: 14px;');
console.log('%c[INFO] Penetration Testing | Incident Analysis', 'color: #7a9db5; font-family: monospace;');
