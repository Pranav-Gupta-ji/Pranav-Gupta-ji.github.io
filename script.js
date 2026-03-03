// Typing Animation
const roles = [
  "Data Scientist",
  "ML Engineer",
  "AI Enthusiast",
  "Python Developer"
];

let roleIndex = 0;
let charIndex = 0;
const typing = document.getElementById("typing");

function type() {
  if (charIndex < roles[roleIndex].length) {
    typing.textContent += roles[roleIndex][charIndex++];
    setTimeout(type, 80);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typing.textContent = roles[roleIndex].substring(0, --charIndex);
    setTimeout(erase, 40);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 200);
  }
}

document.addEventListener("DOMContentLoaded", type);

// Hero Image Slideshow
const images = ["images/hero1.jpg", "images/hero2.jpg", "images/hero3.jpg"];
let imgIndex = 0;
const heroImage = document.getElementById("hero-image");

setInterval(() => {
  imgIndex = (imgIndex + 1) % images.length;
  heroImage.src = images[imgIndex];
}, 3000);

// Dark Mode Toggle
const toggle = document.getElementById("theme-toggle");
toggle.onclick = () => {
  document.body.classList.toggle("light-mode");
};

// Project Filter
function filterProjects(category) {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach(card => {
    card.style.display =
      category === "all" || card.classList.contains(category)
        ? "block"
        : "none";
  });
}

// GitHub Redirect
function openGitHub(url) {
  window.open(url, "_blank");
}


// Add this to your script.js file
const themeToggle = document.getElementById('theme-toggle');

function setTheme(isDark) {
  if (isDark) {
    document.body.classList.remove('light-mode');
    document.documentElement.style.setProperty('--bg-primary', 'var(--bg-dark)');
    document.documentElement.style.setProperty('--bg-card', 'var(--bg-card)');
    document.documentElement.style.setProperty('--text-primary', 'var(--text-primary)');
    document.documentElement.style.setProperty('--text-secondary', 'var(--text-secondary)');
  } else {
    document.body.classList.add('light-mode');
    document.documentElement.style.setProperty('--bg-primary', 'var(--bg-light)');
    document.documentElement.style.setProperty('--bg-card', 'var(--bg-card-light)');
    document.documentElement.style.setProperty('--text-primary', 'var(--text-light)');
    document.documentElement.style.setProperty('--text-secondary', 'var(--text-secondary-light)');
  }
  
  // Save preference
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Check saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  setTheme(false);
  themeToggle.checked = false;
} else {
  setTheme(true);
  themeToggle.checked = true;
}

themeToggle.addEventListener('change', (e) => {
  setTheme(e.target.checked);
});

document.addEventListener("DOMContentLoaded", function () {

  const calendar = document.getElementById("github-calendar");
  const totalCount = document.getElementById("total-count");

  if (!calendar) return;

  fetch("https://github-contributions-api.jogruber.de/v4/Pranav-Gupta-ji")
    .then(response => response.json())
    .then(data => {

      let total = 0;

      data.contributions.forEach(week => {
        week.days.forEach(day => {

          total += day.count;

          const square = document.createElement("div");
          square.classList.add("day");

          if (day.count > 0 && day.count < 3) {
            square.classList.add("level-1");
          } else if (day.count >= 3 && day.count < 6) {
            square.classList.add("level-2");
          } else if (day.count >= 6 && day.count < 10) {
            square.classList.add("level-3");
          } else if (day.count >= 10) {
            square.classList.add("level-4");
          }

          square.title = `${day.date} - ${day.count} contributions`;

          calendar.appendChild(square);
        });
      });

      totalCount.innerText = total;

    })
    .catch(() => {
      totalCount.innerText = "Unable to load";
    });

});