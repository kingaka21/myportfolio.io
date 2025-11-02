/* ======== EFFETS DYNAMIQUES ======== */

// === 1. Fond animé de particules (effet cyber) ===
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.prepend(canvas);

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(88,166,255,0.8)';
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// === 2. Animation de survol sur les sections ===
document.querySelectorAll('section').forEach(section => {
  section.addEventListener('mousemove', e => {
    const x = (e.offsetX / section.offsetWidth - 0.5) * 10;
    const y = (e.offsetY / section.offsetHeight - 0.5) * 10;
    section.style.transform = `rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
  });
  section.addEventListener('mouseleave', () => {
    section.style.transform = 'rotateX(0) rotateY(0) scale(1)';
  });
});

// === 3. Curseur néon interactif ===
const cursor = document.createElement('div');
cursor.id = 'cursor';
document.body.appendChild(cursor);

cursor.style.position = 'fixed';
cursor.style.width = '12px';
cursor.style.height = '12px';
cursor.style.borderRadius = '50%';
cursor.style.background = '#58a6ff';
cursor.style.boxShadow = '0 0 20px #58a6ff';
cursor.style.pointerEvents = 'none';
cursor.style.transition = 'transform 0.1s ease';
cursor.style.zIndex = '9999';

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%, -50%) scale(2)');
  el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
});
