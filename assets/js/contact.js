/* MASReady — contact form submission */
(function () {
  "use strict";

  // In production (GitHub Pages), set window.MASREADY_API_BASE to your deployed API URL.
  // e.g. <script>window.MASREADY_API_BASE = 'https://your-api.replit.app/api';</script>
  // When served from the same origin as the API (Replit preview), leave unset — /api works.
  var API_BASE = (window.MASREADY_API_BASE || "/api").replace(/\/$/, "");

  var form = document.getElementById("contact-form");
  var feedback = document.getElementById("form-feedback");
  var submitBtn = document.getElementById("form-submit");

  if (!form || !feedback || !submitBtn) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Honeypot check
    var honeypot = form.querySelector('[name="website"]');
    if (honeypot && honeypot.value) return;

    var name = (form.querySelector('[name="name"]').value || "").trim();
    var company = (form.querySelector('[name="company"]').value || "").trim();
    var email = (form.querySelector('[name="email"]').value || "").trim();
    var phone = (form.querySelector('[name="phone"]').value || "").trim();
    var message = (form.querySelector('[name="message"]').value || "").trim();

    // Basic client-side validation
    if (!name) { showError("Please enter your name."); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError("Please enter a valid email address."); return; }
    if (!message) { showError("Please enter a message."); return; }

    clearFeedback();
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending\u2026";

    fetch(API_BASE + "/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, company: company, email: email, phone: phone, message: message, website: "" }),
    })
      .then(function (r) {
        return r.json().then(function (d) { return { ok: r.ok, data: d }; });
      })
      .then(function (result) {
        if (result.ok && result.data.ok) {
          showSuccess(result.data.message || "Thanks! We\u2019ll be in touch shortly.");
          form.reset();
        } else {
          showError(result.data.error || "Something went wrong. Please try again.");
        }
      })
      .catch(function () {
        showError("Network error. Please try again or email us directly at hello@masready.com.au.");
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send message";
      });
  });

  function clearFeedback() {
    feedback.className = "form-feedback";
    feedback.textContent = "";
  }

  function showSuccess(msg) {
    feedback.className = "form-feedback success";
    feedback.textContent = msg;
    feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function showError(msg) {
    feedback.className = "form-feedback error";
    feedback.textContent = msg;
    feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
})();
