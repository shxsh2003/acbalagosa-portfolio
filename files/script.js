/* =============================================
   E-PORTFOLIO — Ansharlene Crystal Balagosa
   script.js
   ============================================= */

/* ── Badge / Certification Data ── */
const badgeData = [
  {
    name: "AWS Certified AI Practitioner",
    issuer: "AWS Training & Certification",
    year: "Apr 2026",
    type: "cert",
    img: "aws-certified-ai-practitioner.png"
  },
  {
    name: "AWS Academy Cloud Architecting",
    issuer: "Amazon Web Services",
    year: "Aug 2025",
    type: "badge",
    img: "aws-academy-graduate-cloud-architecting-training-ba.png"
  },
  {
    name: "AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services",
    year: "May 2025",
    type: "badge",
    img: "aws-academy-graduate-cloud-foundations-training-bad.png"
  },
  {
    name: "AWS Academy Generative AI Foundations",
    issuer: "Amazon Web Services",
    year: "Dec 2025",
    type: "badge",
    img: "aws-academy-graduate-generative-ai-foundations-trai (1).png"
  },
  {
    name: "AWS Educate: Intro to Generative AI",
    issuer: "Amazon Web Services",
    year: "Mar 2026",
    type: "badge",
    img: "aws-educate-introduction-to-generative-ai-training-.png"
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    year: "2024",
    type: "badge",
    img: "introduction-to-cybersecurity.png"
  },
  {
    name: "Introduction to Internet of Things",
    issuer: "Cisco Networking Academy",
    year: "2024",
    type: "badge",
    img: "introduction-to-iot.png"
  }
];

/* ── Render Certifications Grid ── */
function renderCerts() {
  const container = document.getElementById("certs-container");
  if (!container) return;

  badgeData.forEach(function(b) {
    const card = document.createElement("div");
    card.className = "cert-card";

    const img = document.createElement("img");
    img.className = "cert-badge-img";
    img.src = "files/" + b.img;
    img.alt = b.name + " badge";

    const info = document.createElement("div");
    info.className = "cert-info";
    info.innerHTML =
      '<div class="cert-name">'   + b.name   + '</div>' +
      '<div class="cert-issuer">' + b.issuer  + '</div>' +
      '<div class="cert-year">'   + b.year    + '</div>' +
      '<span class="cert-pill '   + (b.type === "cert" ? "pill-cert" : "pill-badge") + '">' +
        (b.type === "cert" ? "Certification" : "Training Badge") +
      '</span>';

    card.appendChild(img);
    card.appendChild(info);
    container.appendChild(card);
  });
}

/* ── Contact Form Submit Handler ── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector("button[type='submit']");
  const original = btn.textContent;

  btn.textContent = "Message sent ✓";
  btn.style.background = "#3d8c5f";
  btn.disabled = true;

  setTimeout(function() {
    btn.textContent = original;
    btn.style.background = "";
    btn.disabled = false;
    e.target.reset();
  }, 3000);
}

/* ── Active Nav Link Highlight on Scroll ── */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const links    = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        links.forEach(function(link) { link.style.color = ""; });
        const active = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
        if (active) active.style.color = "var(--text)";
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(function(s) { observer.observe(s); });
}

/* ── Init ── */
document.addEventListener("DOMContentLoaded", function() {
  renderCerts();
  initScrollSpy();
});