const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
const themeLabel = themeToggle.querySelector(".theme-label");
const themeIcon = themeToggle.querySelector(".theme-icon");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  themeLabel.textContent = isDark ? "Dark mode" : "Light mode";
  themeIcon.textContent = isDark ? "◐" : "◑";
  localStorage.setItem("rabbidlabs-theme", theme);
}

const savedTheme = localStorage.getItem("rabbidlabs-theme");
const preferredTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
applyTheme(preferredTheme);

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  applyTheme(next);
});

window.addEventListener("scroll", () => {
  document.body.classList.toggle("scrolled", window.scrollY > 8);
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    target.classList.remove("highlight");
    void target.offsetWidth;
    target.classList.add("highlight");
    target.addEventListener("animationend", () => target.classList.remove("highlight"), { once: true });
  });
});
