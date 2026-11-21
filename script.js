const stage = document.querySelector("[data-stage]");
const track = document.querySelector("[data-track]");
const progressText = document.querySelector("[data-progress-text]");
const progressBar = document.querySelector("[data-progress-bar]");
const desktopQuery = window.matchMedia("(min-width: 901px)");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let targetX = 0;
let currentX = 0;
let frame = 0;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  return maxScroll > 0 ? clamp(window.scrollY / maxScroll, 0, 1) : 0;
};

const updateLayout = (instant = false) => {
  const progress = getProgress();
  progressText.textContent = `(${Math.round(progress * 100)}%)`;
  progressBar.style.width = `${progress * 100}%`;

  if (!desktopQuery.matches) {
    track.style.transform = "";
    return;
  }

  const stageScrollMax = Math.max(1, stage.offsetHeight - window.innerHeight);
  const trackTravel = Math.max(0, track.scrollWidth - window.innerWidth);
  const stagedProgress = clamp(window.scrollY / stageScrollMax, 0, 1);
  targetX = stagedProgress * trackTravel;

  if (instant || reduceMotion) currentX = targetX;
};

const animateTrack = () => {
  if (desktopQuery.matches && !reduceMotion) {
    currentX += (targetX - currentX) * 0.12;
    if (Math.abs(targetX - currentX) < 0.1) currentX = targetX;
    track.style.transform = `translate3d(${-currentX}px, 0, 0)`;
  }
  frame = requestAnimationFrame(animateTrack);
};

window.addEventListener("scroll", () => updateLayout(false), { passive: true });
window.addEventListener("resize", () => updateLayout(true));
updateLayout(true);
animateTrack();

const scrollToProgress = (progress) => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  window.scrollTo({ top: maxScroll * progress, behavior: reduceMotion ? "auto" : "smooth" });
};

document.querySelector("[data-home]").addEventListener("click", (event) => {
  event.preventDefault();
  scrollToProgress(0);
});

document.querySelectorAll("[data-jump]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToProgress(link.dataset.jump === "contact" ? 1 : 0.55);
  });
});

document.querySelector("[data-enter-work]").addEventListener("click", () => scrollToProgress(0.18));

window.addEventListener("beforeunload", () => cancelAnimationFrame(frame));
