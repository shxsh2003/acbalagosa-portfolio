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

document.addEventListener("DOMContentLoaded", function() {
  renderCards(badgeData, "badges-container");
  renderCards(certData, "certs-container");
  initScrollSpy();
});