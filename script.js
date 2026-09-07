document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ---------- Request CV ----------
  const downloadCVBtn = document.getElementById("downloadCV");
  if (downloadCVBtn) {
    downloadCVBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Maaf, CV belum dilampirkan di laman ini. Silakan meminta CV melalui email. Terima kasih.");
    });
  }

  // ---------- Date & time ----------
  const dateEl = document.getElementById("current-date");
  const timeEl = document.getElementById("current-time");

  function updateDateTime() {
    const now = new Date();
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    }
    if (timeEl) {
      timeEl.textContent = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
    }
  }
  updateDateTime();
  window.setInterval(updateDateTime, 1000);

  // ---------- Scroll progress + back to top ----------
  const progressBar = document.querySelector("#scrollProgress span");
  const backToTop = document.getElementById("backToTop");

  function updateScrollUI() {
    const doc = document.documentElement;
    const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    const progress = Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100));

    if (progressBar) progressBar.style.width = progress + "%";
    if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 450);
  }

  let scrollTicking = false;
  window.addEventListener("scroll", () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      updateScrollUI();
      scrollTicking = false;
    });
  }, { passive: true });

  updateScrollUI();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---------- Skill animation ----------
  const skillBars = document.querySelectorAll(".skill-track span");
  if (skillBars.length) {
    const revealSkills = () => skillBars.forEach((bar) => bar.classList.add("is-visible"));

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        if (entries.some(entry => entry.isIntersecting)) {
          revealSkills();
          obs.disconnect();
        }
      }, { threshold: 0.15 });
      const target = document.querySelector(".skills-grid") || skillBars[0];
      observer.observe(target);
    } else {
      revealSkills();
    }
  }

  // ---------- Testimonial carousel ----------
  const carousel = document.querySelector("#carouselTestimoni");
  if (carousel && typeof bootstrap !== "undefined") {
    const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carousel, {
      interval: false,
      ride: false,
      touch: true,
      wrap: true
    });

    let autoSlideInterval = null;
    let touchStartX = 0;
    let touchEndX = 0;

    const start = () => {
      clearInterval(autoSlideInterval);
      autoSlideInterval = window.setInterval(() => bsCarousel.next(), 4500);
    };
    const stop = () => clearInterval(autoSlideInterval);

    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", start);

    carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchEndX = touchStartX;
      stop();
    }, { passive: true });

    carousel.addEventListener("touchmove", (e) => {
      touchEndX = e.changedTouches[0].clientX;
    }, { passive: true });

    carousel.addEventListener("touchend", () => {
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? bsCarousel.next() : bsCarousel.prev();
      }
      start();
    }, { passive: true });

    start();
  }

  // ---------- Experience modal ----------
  const experienceItems = document.querySelectorAll(".experience-item");
  const modalElement = document.getElementById("experienceModal");

  if (experienceItems.length && modalElement && typeof bootstrap !== "undefined") {
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement, {
      backdrop: true,
      keyboard: true,
      focus: true
    });

    const title = document.getElementById("experienceModalTitle");
    const period = document.getElementById("experienceModalPeriod");
    const description = document.getElementById("experienceModalDescription");

    experienceItems.forEach((item) => {
      item.addEventListener("click", () => {
        experienceItems.forEach(el => el.classList.remove("is-active"));
        item.classList.add("is-active");

        if (title) title.textContent = item.dataset.title || "Pengalaman Kerja";
        if (period) period.textContent = item.dataset.period ? "Periode: " + item.dataset.period : "";
        if (description) description.textContent =
          item.dataset.description || "Deskripsi pengalaman belum tersedia.";

        modal.show();
      });
    });

    // Keep the selected item highlighted while the modal is open,
    // then restore the original list state when it closes.
    modalElement.addEventListener("hidden.bs.modal", () => {
      experienceItems.forEach(el => el.classList.remove("is-active"));
    });
  }

  // ---------- Current year ----------
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
