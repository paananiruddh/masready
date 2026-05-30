/* MASReady — shared site utilities */
(function () {
  "use strict";

  // Mobile nav toggle
  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".mobile-menu-toggle");
    var nav = document.querySelector(".nav-links");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        nav.classList.toggle("open");
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
