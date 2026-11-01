/* ==========================================================================
   Nistha Diwedi, portfolio
   Small vanilla JS layer: theme, mobile nav, scroll reveal, active links.
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;
  var STORAGE_KEY = "nd-theme";
  var themeBtn = document.getElementById("theme-toggle");
  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("nav-toggle");
  var year = document.getElementById("year");

  /* ----------------------------- theme ----------------------------- */

  function storedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      return null;
    }
  }

  function systemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeBtn) {
      themeBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
      themeBtn.setAttribute("title", theme === "dark" ? "Light theme" : "Dark theme");
    }
  }

  applyTheme(storedTheme() || systemTheme());

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (err) {
        /* storage can be blocked, the theme still applies for this visit */
      }
    });
  }

  /* ---------------------------- mobile nav -------------------------- */

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") closeNav();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) closeNav();
    });
  }

  /* --------------------------- scroll reveal ------------------------ */

  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("in");
    });
  }

  /* ------------------------- active nav link ------------------------ */

  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  var sections = links
    .map(function (link) {
      var id = link.getAttribute("href");
      return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  function setActive() {
    var offset = window.scrollY + 120;
    var current = null;

    sections.forEach(function (section) {
      if (section.offsetTop <= offset) current = section;
    });

    var doc = document.documentElement;
    var atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 8;
    if (atBottom && sections.length) current = sections[sections.length - 1];

    links.forEach(function (link) {
      var isActive = current && link.getAttribute("href") === "#" + current.id;
      link.classList.toggle("active", Boolean(isActive));
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if (sections.length) {
    var ticking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          setActive();
          ticking = false;
        });
      },
      { passive: true }
    );
    setActive();
  }

  /* ------------------------------ footer ---------------------------- */

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
