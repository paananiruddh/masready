/* MASReady — contact form (Formspree) */
(function () {
  "use strict";

  // 1. Create a free form at https://formspree.io/
  // 2. Replace YOUR_FORM_ID below with the ID from your Formspree dashboard (e.g. "xyzabc12")
  var FORMSPREE_ID = "YOUR_FORM_ID";
  var ENDPOINT = "https://formspree.io/f/" + FORMSPREE_ID;

  var form = document.getElementById("contact-form");
  var feedback = document.getElementById("form-feedback");
  var submitBtn = document.getElementById("form-submit");

  if (!form || !feedback || !submitBtn) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Honeypot: humans leave this blank
    var honeypot = form.querySelector('[name="website"]');
    if (honeypot && honeypot.value) return;

    var name    = (form.querySelector('[name="name"]').value    || "").trim();
    var company = (form.querySelector('[name="company"]').value || "").trim();
    var email   = (form.querySelector('[name="email"]').value   || "").trim();
    var phone   = (form.querySelector('[name="phone"]').value   || "").trim();
    var message = (form.querySelector('[name="message"]').value || "").trim();

    // Client-side validation
    if (!name)    { showError("Please enter your name.");               return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    showError("Please enter a valid email address.");   return; }
    if (!message) { showError("Please enter a message.");               return; }

    if (FORMSPREE_ID === "YOUR_FORM_ID") {
      showError("Contact form not yet configured. Please email us directly at hello@masready.com.au.");
      return;
    }

    clearFeedback();
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending\u2026";

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        company: company,
        email: email,
        phone: phone,
        message: message,
        _subject: "New MASReady enquiry from " + name + (company ? " / " + company : ""),
      }),
    })
      .then(function (r) {
        return r.json().then(function (d) { return { status: r.status, data: d }; });
      })
      .then(function (result) {
        if (result.status === 200 && result.data.ok) {
          showSuccess("Thanks! We\u2019ll be in touch shortly.");
          form.reset();
        } else {
          var msg = (result.data.errors || []).map(function (e) { return e.message; }).join(" ") ||
                    "Something went wrong. Please try again or email us directly.";
          showError(msg);
        }
      })
      .catch(function () {
        showError("Network error. Please try again or email us at hello@masready.com.au.");
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
