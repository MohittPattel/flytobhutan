const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.querySelector(".explore-menu")?.classList.remove("is-open");
  });
});

const exploreMenu = document.querySelector(".explore-menu");
const exploreTrigger = document.getElementById("startExploring");

exploreTrigger?.addEventListener("click", () => {
  const open = exploreMenu.classList.toggle("is-open");
  exploreTrigger.setAttribute("aria-expanded", String(open));
});

document.addEventListener("click", (event) => {
  if (exploreMenu && !exploreMenu.contains(event.target)) {
    exploreMenu.classList.remove("is-open");
    exploreTrigger?.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    exploreMenu?.classList.remove("is-open");
    exploreTrigger?.setAttribute("aria-expanded", "false");
  }
});

const form = document.getElementById("tripForm");
const result = document.getElementById("planResult");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const style = document.getElementById("style").value;
  const region = document.getElementById("region").value;
  const days = document.getElementById("days").value;
  const month = document.getElementById("month").value;

  let tip = "Start with Paro, Thimphu and Punakha for a classic first journey.";
  if (style.includes("Nature"))
    tip =
      "Add Phobjikha or a wildlife-focused experience and leave time for slower valley travel.";
  if (style.includes("Trekking"))
    tip =
      "Prioritize trail conditions, acclimatization and a qualified guide when building your route.";
  if (style.includes("Wellness"))
    tip =
      "Blend monastery visits, quiet valleys, traditional hot-stone experiences and restorative stays.";
  if (style.includes("Food"))
    tip =
      "Add a local meal, market visit or cooking experience to make the itinerary more personal.";

  result.innerHTML = `
    <strong>Your starting idea</strong><br>
    ${style} • ${region} • ${days} • ${month}<br><br>
    ${tip}
  `;
  result.classList.add("show");
});

const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav-links a")];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.remove("active"));
      const active = links.find(
        (link) => link.getAttribute("href") === `#${entry.target.id}`,
      );
      active?.classList.add("active");
    });
  },
  { rootMargin: "-30% 0px -60% 0px" },
);

sections.forEach((section) => observer.observe(section));

const backToTop = document.getElementById("backToTop");

const updateBackToTop = () => {
  backToTop?.classList.toggle("is-visible", window.scrollY > 400);
};

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("himalayanPopup");
  const closeButton = document.getElementById("himalayanClose");
  const overlay = document.querySelector(".himalayan-overlay");
  const startExploring = document.getElementById("startExploring");
  const exploreMenu = document.querySelector(".explore-menu");
  const himalayanOption = document.getElementById("himalayanOption");

  if (!popup) return;

  const hasSeenPopup = () => {
    try {
      return sessionStorage.getItem("himalayanPopupSeen") === "true";
    } catch {
      return false;
    }
  };

  const markPopupAsSeen = () => {
    try {
      sessionStorage.setItem("himalayanPopupSeen", "true");
    } catch {
      // Continue showing the popup when storage is unavailable.
    }
  };

  function openHimalayanPopup() {
    if (hasSeenPopup()) return;

    popup.classList.add("active");
    popup.setAttribute("aria-hidden", "false");
    document.body.classList.add("himalayan-popup-open");
    markPopupAsSeen();

    setTimeout(function () {
      closeButton.focus();
    }, 300);
  }

  function closeHimalayanPopup() {
    popup.classList.remove("active");
    popup.setAttribute("aria-hidden", "true");
    document.body.classList.remove("himalayan-popup-open");
  }

  closeButton.addEventListener("click", function () {
    closeHimalayanPopup();
    exploreMenu?.classList.add("is-open");
    startExploring?.setAttribute("aria-expanded", "true");
    startExploring?.classList.add("is-highlighted");

    setTimeout(function () {
      himalayanOption?.focus();
    }, 200);

    setTimeout(function () {
      startExploring?.classList.remove("is-highlighted");
    }, 900);
  });
  overlay.addEventListener("click", closeHimalayanPopup);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && popup.classList.contains("active")) {
      closeHimalayanPopup();
    }
  });

  setTimeout(function () {
    openHimalayanPopup();
  }, 1200);
});
