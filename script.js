const stage = document.querySelector("[data-stage]");
const track = document.querySelector("[data-track]");
const progressText = document.querySelector("[data-progress-text]");
const progressBar = document.querySelector("[data-progress-bar]");
const dialog = document.querySelector(".project-dialog");
const dialogClose = document.querySelector(".dialog-close");
const desktopQuery = window.matchMedia("(min-width: 901px)");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const projects = {
  "01": {
    title: "风物",
    year: "2026",
    services: "电商视觉 / 视觉设计师",
    description:
      "A speculative visual world exploring artificial life, mineral matter and the emotion of unfamiliar landscapes.",
  },
  "02": {
    title: "册印",
    year: "2026",
    services: "包装&画册 / 平面设计师",
    description:
      "A study in tactile materials and precision-formed objects, built as a moving image system for a future product language.",
  },
  "03": {
    title: "标识",
    year: "2025",
    services: "品牌设计 / 品牌设计师",
    description:
      "A generative identity concept that translates data, atmosphere and architectural rhythm into one flexible visual signal.",
  },
  "04": {
    title: "界面",
    year: "2025",
    services: "UI交互 / UI设计师",
    description:
      "A moving image concept about an artificial ecosystem where stone, light and organic matter slowly learn to coexist.",
  },
  "05": {
    title: "余迹",
    year: "2024",
    services: "多元设计 / 创意设计师",
    description:
      "An image series that treats chrome as a memory material, bending fragments of warmth, desire and machine-made form.",
  },
};

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

const openProject = (key) => {
  const project = projects[key];
  const card = document.querySelector(`[data-project="${key}"]`);
  if (!project || !card) return;

  dialog.querySelector("[data-dialog-title]").textContent = project.title;
  dialog.querySelector("[data-dialog-year]").textContent = project.year;
  dialog.querySelector("[data-dialog-services]").textContent = project.services;
  dialog.querySelector("[data-dialog-description]").textContent = project.description;
  dialog.querySelector("[data-dialog-image]").src = card.querySelector("img").src;
  dialog.querySelector("[data-dialog-image]").alt = project.title;
  dialog.showModal();
  document.body.classList.add("dialog-open");
};

document.querySelectorAll("[data-project]").forEach((card) => {
  card.querySelector(".project-link").addEventListener("click", (event) => {
    event.preventDefault();
    openProject(card.dataset.project);
  });
});

dialogClose.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));

window.addEventListener("beforeunload", () => cancelAnimationFrame(frame));
