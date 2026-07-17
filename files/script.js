const badgeData = [
  {
    name: "AWS Academy Cloud Architecting",
    issuer: "Amazon Web Services",
    year: "Aug 2025",
    type: "badge",
    img: "aws-academy-graduate-cloud-architecting-training-ba.png",
    link: "https://www.credly.com/badges/040256b5-1f1d-4f33-a73f-d2669eb37a00/public_url"
  },
  {
    name: "AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services",
    year: "May 2025",
    type: "badge",
    img: "aws-academy-graduate-cloud-foundations-training-bad.png",
    link: "https://www.credly.com/badges/c384d5ad-62c9-4cc9-8f6d-2a51adc96ac9/public_url"
  },
  {
    name: "AWS Academy Generative AI Foundations",
    issuer: "Amazon Web Services",
    year: "Dec 2025",
    type: "badge",
    img: "aws-academy-graduate-generative-ai-foundations-trai (1).png",
    link: "https://www.credly.com/badges/2eabf2e0-da27-454d-9a21-7bd36c8af880/public_url"
  },
  {
    name: "AWS Educate: Intro to Generative AI",
    issuer: "Amazon Web Services",
    year: "Mar 2026",
    type: "badge",
    img: "aws-educate-introduction-to-generative-ai-training-.png",
    link: "https://www.credly.com/badges/6883a841-6f8b-4cda-8954-3633c6b85b63/public_url"
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    year: "2024",
    type: "badge",
    img: "introduction-to-cybersecurity.png",
    link: "https://www.credly.com/badges/92339633-7ffc-4b39-8279-e8eb8ffc944a/public_url"
  },
  {
    name: "Introduction to Internet of Things",
    issuer: "Cisco Networking Academy",
    year: "2024",
    type: "badge",
    img: "introduction-to-iot.png",
    link: "https://www.credly.com/badges/1bffccd3-847e-4ca6-b93a-823611de941e/public_url"
  }
];

const certData = [
  {
    name: "AWS Certified AI Practitioner",
    issuer: "AWS Training & Certification",
    year: "Apr 2026",
    type: "cert",
    img: "AWS Certified AI Practitioner_page-0001.jpg",
    pdf: "AWS Certified AI Practitioner.pdf"
  },
  {
    name: "Microsoft Excel",
    issuer: "Microsoft",
    year: "2026",
    type: "cert",
    img: "Microsoft Excel_page-0001.jpg",
    pdf: "Microsoft Excel.pdf"
  }
];

/* ---------- Student org / leadership roles ----------
   Add one entry per role and the "Student org leadership roles" stat
   on the About section will count itself automatically, same as
   the badges/certificates count below. */
const leadershipData = [
  { role: "Officer", org: "Student Organization", year: "" },
  { role: "Officer", org: "Student Organization", year: "" }
];

function renderCards(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  data.forEach(function(b) {
    const card = document.createElement("div");
    card.className = "cert-card";

    const img = document.createElement("img");
    img.className = "cert-badge-img";
    img.src = "files/" + b.img;
    img.alt = b.name + " preview";

    let media = img;
    const href = b.pdf ? "files/" + b.pdf : (b.link || "");

    if (href) {
      const link = document.createElement("a");
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener";
      link.className = "cert-link";
      link.title = b.pdf ? "View certificate PDF" : "View verified badge on Credly";
      link.appendChild(img);
      media = link;
    }

    const info = document.createElement("div");
    info.className = "cert-info";
    info.innerHTML =
      '<div class="cert-name">' + b.name + '</div>' +
      '<div class="cert-issuer">' + b.issuer + '</div>' +
      '<div class="cert-year">' + b.year + '</div>' +
      '<span class="cert-pill ' + (b.type === "cert" ? "pill-cert" : "pill-badge") + '">' +
        (b.type === "cert" ? "Certification" : "Training Badge") +
      '</span>' +
      (href ? '<a class="cert-verify" href="' + href + '" target="_blank" rel="noopener">' +
        (b.pdf ? "View certificate ↗" : "Verify on Credly ↗") + '</a>' : '');

    card.appendChild(media);
    card.appendChild(info);
    container.appendChild(card);
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        links.forEach(function(link) {
          link.style.color = "";
        });
        const active = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
        if (active) active.style.color = "var(--text)";
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(function(s) {
    observer.observe(s);
  });
}

/* ---------- Theme toggle ---------- */
function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const stored = localStorage.getItem("portfolio-theme");
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  const initial = stored || (prefersLight ? "light" : "dark");

  if (initial === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  }

  toggle.addEventListener("click", function() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("portfolio-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("portfolio-theme", "light");
    }
  });
}

/* ---------- Copy email buttons ---------- */
function initCopyEmail() {
  document.querySelectorAll(".copy-email-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      const email = btn.getAttribute("data-email");
      const done = function() {
        const original = btn.textContent;
        btn.textContent = "✓";
        btn.classList.add("copied");
        btn.title = "Copied!";
        setTimeout(function() {
          btn.textContent = original;
          btn.classList.remove("copied");
          btn.title = "Copy email";
        }, 1800);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done).catch(function() {
          fallbackCopy(email, done);
        });
      } else {
        fallbackCopy(email, done);
      }
    });
  });
}

function fallbackCopy(text, cb) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); } catch (e) {}
  document.body.removeChild(ta);
  if (cb) cb();
}

/* ---------- Lightbox ---------- */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  if (!lightbox || !lightboxImg) return;

  function open(src, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = caption || "";
    lightboxCaption.textContent = caption || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lightboxImg.src = "";
  }

  document.querySelectorAll("[data-lightbox]").forEach(function(el) {
    el.addEventListener("click", function(e) {
      e.preventDefault();
      const img = el.querySelector("img");
      const src = el.getAttribute("href") || (img ? img.src : "");
      const caption = el.getAttribute("data-caption") || (img ? img.alt : "");
      open(src, caption);
    });
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", function(e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") close();
  });
}

/* ---------- Back to top ---------- */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", function() {
    if (window.scrollY > 480) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(function(el) { observer.observe(el); });
}

/* ---------- Auto-counting About stats ---------- */
function initStatCounters() {
  const projectsEl = document.getElementById("stat-projects");
  const badgesEl = document.getElementById("stat-badges");
  const leadershipEl = document.getElementById("stat-leadership");

  if (projectsEl) {
    projectsEl.dataset.target = document.querySelectorAll(".project-card").length;
  }
  if (badgesEl) {
    badgesEl.dataset.target = badgeData.length + certData.length;
  }
  if (leadershipEl) {
    leadershipEl.dataset.target = leadershipData.length;
  }

  const counters = document.querySelectorAll(".stat-number[data-target]");
  if (!counters.length) return;

  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function(el) { observer.observe(el); });
}

document.addEventListener("DOMContentLoaded", function() {
  renderCards(badgeData, "badges-container");
  renderCards(certData, "certs-container");
  initScrollSpy();
  initThemeToggle();
  initCopyEmail();
  initLightbox();
  initBackToTop();
  initScrollReveal();
  initStatCounters();
});