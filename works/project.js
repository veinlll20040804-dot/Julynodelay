const projects = {
  fengwu: {
    index: "01",
    title: "风物",
    english: "FENGWU / E-COMMERCE VISUAL",
    category: "电商视觉",
    role: "视觉设计师",
    year: "2026",
    cover: "../../assets/project-bloom.svg",
    intro:
      "以地域风物为灵感，将自然肌理、人物叙事与商业影像结合，建立兼具温度与识别度的电商视觉系统。",
    noteTitle: "让地域风物成为<br>可感知的商业视觉",
    note:
      "从产品卖点到情绪氛围，项目围绕主视觉、页面延展与传播物料建立统一的视觉语言。每一次构图与材质选择，都服务于更清晰的商品表达。",
    tags: ["视觉策略", "主视觉", "页面延展", "传播物料"],
    gallery: [
      { src: "../../assets/fengwu/detail-01-mouse.jpg", label: "机械鼠标" },
      { src: "../../assets/fengwu/detail-02-hair-oil.jpg", label: "护发精油" },
      { src: "../../assets/fengwu/detail-03-headset.jpg", label: "无线耳机" },
      { src: "../../assets/fengwu/detail-04-skin-care.jpg", label: "护肤精华" },
      { src: "../../assets/fengwu/detail-05-drone.jpg", label: "航拍无人机" },
      { src: "../../assets/fengwu/detail-06-perfume.jpg", label: "少女香水" },
      { src: "../../assets/fengwu/detail-07-body-wash.jpg", label: "香氛沐浴露" },
      { src: "../../assets/fengwu/detail-08-shampoo.jpg", label: "洗护产品" },
    ],
  },
  ceyin: {
    index: "02",
    title: "册印",
    english: "CEYIN / PACKAGING & EDITORIAL",
    category: "包装&画册",
    role: "平面设计师",
    year: "2026",
    cover: "../../assets/project-soft.svg",
    intro:
      "围绕纸品、装帧与品牌内容，构建从封面到内页统一的编辑语言，让触感与信息层级共同形成品牌记忆。",
    noteTitle: "让翻阅成为<br>一次完整的品牌体验",
    note:
      "以纸张、留白、字体和图像节奏为核心，梳理内容结构，并将视觉规范延展到包装、画册与线下应用。",
    tags: ["装帧设计", "包装设计", "编辑系统", "印刷物料"],
  },
  biaoshi: {
    index: "03",
    title: "标识",
    english: "BIAOSHI / BRAND IDENTITY",
    category: "品牌设计",
    role: "品牌设计师",
    year: "2025",
    cover: "../../assets/project-signal.svg",
    intro:
      "从品牌核心与差异价值出发，建立标志、字体、色彩和应用规范，让品牌拥有清晰、稳定的识别系统。",
    noteTitle: "从一个符号<br>延伸为完整的品牌秩序",
    note:
      "设计不止停留在标志本身，而是将识别逻辑落实到版式、终端、空间与数字界面，保证品牌在不同场景中保持一致。",
    tags: ["品牌策略", "标志系统", "视觉规范", "应用设计"],
  },
  jiemian: {
    index: "04",
    title: "界面",
    english: "JIEMIAN / UI & INTERACTION",
    category: "UI交互",
    role: "UI设计师",
    year: "2025",
    cover: "../../assets/project-eden.svg",
    intro:
      "以信息层级与交互体验为核心，将品牌视觉落实到页面结构、组件系统和动效细节，形成清晰流畅的数字体验。",
    noteTitle: "让视觉表达与使用逻辑<br>同时成立",
    note:
      "通过用户路径、内容优先级和响应式布局梳理产品体验，并以统一组件和动效规则支持后续扩展。",
    tags: ["信息架构", "界面设计", "组件系统", "交互动效"],
  },
  yuji: {
    index: "05",
    title: "余迹",
    english: "YUJI / MULTIDISCIPLINARY DESIGN",
    category: "多元设计",
    role: "创意设计师",
    year: "2024",
    cover: "../../assets/project-chrome.svg",
    intro:
      "围绕时间、痕迹与视觉记忆展开的跨媒介实验，连接图形、空间与动态表达，探索品牌视觉的更多可能。",
    noteTitle: "让不同媒介留下<br>同一种视觉余温",
    note:
      "项目以实验性图像为起点，逐步延展到海报、动态影像与空间传播，在不同载体之间保持统一的情绪和识别度。",
    tags: ["概念设计", "视觉实验", "动态影像", "跨媒介延展"],
  },
};

const order = ["fengwu", "ceyin", "biaoshi", "jiemian", "yuji"];
const key = document.body.dataset.project;
const project = projects[key] || projects.fengwu;
const currentIndex = order.indexOf(projects[key] ? key : "fengwu");
const nextKey = order[(currentIndex + 1) % order.length];
const nextProject = projects[nextKey];

const text = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
};

const html = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = value;
};

document.title = `${project.title}｜云霞视觉设计`;
text("[data-project-counter]", `${project.index} / 05`);
text("[data-hero-index]", project.index);
text("[data-hero-category]", project.category);
text("[data-hero-title]", project.title);
text("[data-hero-english]", project.english);
text("[data-project-year]", project.year);
text("[data-project-role]", project.role);
text("[data-project-category]", project.category);
text("[data-hero-intro]", project.intro);
html("[data-note-title]", project.noteTitle);
text("[data-note-copy]", project.note);
text("[data-next-title]", nextProject.title);

const cover = document.querySelector("[data-cover-image]");
cover.src = project.cover;
cover.alt = `${project.title}项目主视觉`;

const tags = document.querySelector("[data-project-tags]");
tags.innerHTML = project.tags.map((tag) => `<li>${tag}</li>`).join("");
const noteTags = document.querySelector("[data-note-tags]");
noteTags.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");

const galleryItems = project.gallery
  ? project.gallery.map((item, index) => ({
      ...item,
      type: "image",
      ratio: "1 / 3",
      position: "50% 0%",
      index: String(index + 1).padStart(2, "0"),
    }))
  : [
      { type: "image", ratio: "4 / 5", position: "50% 35%", index: "A", label: "主视觉" },
      { type: "type", ratio: "4 / 5", index: "B", label: "视觉方向", title: project.noteTitle },
      { type: "image", ratio: "1 / 1", position: "35% 55%", index: "C", label: "视觉细节" },
      { type: "image", ratio: "3 / 2", position: "65% 42%", index: "D", label: "场景延展" },
      { type: "quote", ratio: "3 / 4", index: "E", label: "设计表达", title: project.intro },
      { type: "image", ratio: "3 / 4", position: "50% 70%", index: "F", label: "应用表现" },
    ];

const gallery = document.querySelector("[data-project-gallery]");
gallery.classList.toggle("project-gallery--grid", Boolean(project.gallery));
gallery.innerHTML = galleryItems
  .map((item) => {
    if (item.type === "type") {
      return `
        <article class="gallery-card gallery-card--type" style="--ratio:${item.ratio}">
          <div class="gallery-card__head"><span>${item.index}</span><span>${item.label}</span></div>
          <h3>${item.title}</h3>
          <span class="gallery-card__mark">${project.index}</span>
          <div class="gallery-card__foot"><span>${project.english}</span><span>${project.year}</span></div>
        </article>`;
    }
    if (item.type === "quote") {
      return `
        <article class="gallery-card gallery-card--quote" style="--ratio:${item.ratio}">
          <div class="gallery-card__head"><span>${item.index}</span><span>${item.label}</span></div>
          <blockquote>${item.title}</blockquote>
          <div class="gallery-card__foot"><span>${project.role}</span><span>${project.year}</span></div>
        </article>`;
    }
    return `
      <figure class="gallery-card gallery-card--image" style="--ratio:${item.ratio};--position:${item.position}">
        <img src="${item.src || project.cover}" alt="${project.title} · ${item.label}" decoding="async" />
        <figcaption><span>${item.index}</span><span>${item.label}</span></figcaption>
      </figure>`;
  })
  .join("");

const nextLink = document.querySelector("[data-next-link]");
nextLink.href = `../${nextKey}/`;
nextLink.setAttribute("data-cursor-label", `查看${nextProject.title}`);

const progress = document.querySelector("[data-project-progress]");
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
};
addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
requestAnimationFrame(() => document.querySelector(".project-hero")?.classList.add("is-visible"));
