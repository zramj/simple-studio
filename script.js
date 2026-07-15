const header = document.querySelector("[data-header]");
const faqButtons = document.querySelectorAll(".faq-question");
const internalLinks = document.querySelectorAll('a[href^="#"]');
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateHeaderShadow() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeFaq(button) {
  const answer = button.nextElementSibling;
  button.setAttribute("aria-expanded", "false");
  if (answer) {
    answer.style.maxHeight = null;
  }
}

function openFaq(button) {
  const answer = button.nextElementSibling;
  button.setAttribute("aria-expanded", "true");
  if (answer) {
    answer.style.maxHeight = `${answer.scrollHeight}px`;
  }
}

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    faqButtons.forEach((item) => {
      if (item !== button) {
        closeFaq(item);
      }
    });

    if (isExpanded) {
      closeFaq(button);
    } else {
      openFaq(button);
    }
  });
});

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  });
});

window.addEventListener("scroll", updateHeaderShadow, { passive: true });
window.addEventListener("resize", () => {
  faqButtons.forEach((button) => {
    if (button.getAttribute("aria-expanded") === "true") {
      openFaq(button);
    }
  });
});

updateHeaderShadow();
