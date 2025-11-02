/* ======== E-PORTFOLIO DYNAMIQUE ======== */

// === Effet machine à écrire en boucle sur le titre ===
document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector("header h1");
  const text = title.textContent;
  title.textContent = "";
  let i = 0;
  let deleting = false;

  function typeWriter() {
    if (!deleting && i < text.length) {
      // On écrit les lettres une à une
      title.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 150);
    } else if (!deleting && i === text.length) {
      // Pause quand le mot est complet
      deleting = true;
      setTimeout(typeWriter, 1200);
    } else if (deleting && i > 0) {
      // On efface progressivement
      title.textContent = text.substring(0, i - 1);
      i--;
      setTimeout(typeWriter, 80);
    } else if (deleting && i === 0) {
      // Repart de zéro
      deleting = false;
      setTimeout(typeWriter, 300);
    }
  }

  typeWriter();
});

// === Apparition fluide des sections au scroll ===
const sections = document.querySelectorAll("section");

function revealSections() {
  const trigger = window.innerHeight * 0.85;
  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top < trigger) {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }
  });
}

window.addEventListener("scroll", revealSections);

// Initialise les styles de départ
sections.forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(40px)";
  section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
});

// === Bouton "Retour en haut" ===
const topBtn = document.createElement("button");
topBtn.textContent = "↑";
topBtn.id = "backToTop";
document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.bottom = "30px";
topBtn.style.right = "30px";
topBtn.style.padding = "10px 15px";
topBtn.style.background = "#58a6ff";
topBtn.style.border = "none";
topBtn.style.borderRadius = "10px";
topBtn.style.color = "#fff";
topBtn.style.fontSize = "20px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.transition = "opacity 0.3s ease";

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    topBtn.style.display = "block";
    topBtn.style.opacity = "1";
  } else {
    topBtn.style.opacity = "0";
    setTimeout(() => (topBtn.style.display = "none"), 300);
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// === Effet sur les liens ===
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("mouseover", () => {
    link.style.textShadow = "0 0 10px #58a6ff";
  });
  link.addEventListener("mouseleave", () => {
    link.style.textShadow = "none";
  });
});

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
