/* MASReady — shared site utilities */
(function () {
  "use strict";

  // Mobile nav toggle
  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector("[data-mobile-toggle]");
    var nav = document.querySelector(".nav-links");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      // Close menu when a nav link is clicked
      nav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    // Mark active nav links
    var links = document.querySelectorAll(".nav-links a");
    var path = window.location.pathname.replace(/\/$/, "") || "/";
    links.forEach(function (a) {
      var href = a.getAttribute("href").replace(/\/$/, "") || "/";
      if (path.endsWith(href)) a.classList.add("active");
    });
  });
})();
