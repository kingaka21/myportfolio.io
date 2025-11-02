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
