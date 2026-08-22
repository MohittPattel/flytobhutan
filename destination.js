const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop?.classList.toggle("show", window.scrollY > 400);
}, { passive: true });
backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
