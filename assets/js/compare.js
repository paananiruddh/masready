/* MASReady — Compare/poll page localStorage voting */
(function () {
  "use strict";

  var VOTE_KEY = "masready_vote";
  var COUNTS_KEY = "masready_vote_counts";

  function getCounts() {
    try {
      return JSON.parse(localStorage.getItem(COUNTS_KEY)) || { design1: 0, design2: 0, design3: 0 };
    } catch (e) {
      return { design1: 0, design2: 0, design3: 0 };
    }
  }

  function getVote() {
    return localStorage.getItem(VOTE_KEY) || null;
  }

  function saveVote(design) {
    var counts = getCounts();
    var prev = getVote();
    if (prev && prev !== design) {
      if (counts[prev] > 0) counts[prev]--;
    }
    if (prev !== design) counts[design] = (counts[design] || 0) + 1;
    localStorage.setItem(VOTE_KEY, design);
    localStorage.setItem(COUNTS_KEY, JSON.stringify(counts));
  }

  function clearVote() {
    var counts = getCounts();
    var prev = getVote();
    if (prev && counts[prev] > 0) counts[prev]--;
    localStorage.removeItem(VOTE_KEY);
    localStorage.setItem(COUNTS_KEY, JSON.stringify(counts));
  }

  function updateUI() {
    var vote = getVote();
    var counts = getCounts();
    ["design1", "design2", "design3"].forEach(function (d) {
      var countEl = document.getElementById("vote-count-" + d);
      var btn = document.getElementById("vote-btn-" + d);
      var card = document.getElementById("vote-card-" + d);
      if (countEl) countEl.textContent = counts[d] + " vote" + (counts[d] === 1 ? "" : "s");
      if (btn) {
        btn.disabled = vote === d;
        btn.textContent = vote === d ? "\u2714 You voted for this" : "Vote for this design";
      }
      if (card) card.classList.toggle("voted", vote === d);
    });
    var msg = document.getElementById("vote-message");
    if (msg) {
      if (vote) {
        msg.textContent = "You voted for " + vote.replace("design", "Design ") + ". ";
        msg.style.display = "";
        var reset = document.getElementById("vote-reset");
        if (reset) reset.style.display = "";
      } else {
        msg.style.display = "none";
        var reset2 = document.getElementById("vote-reset");
        if (reset2) reset2.style.display = "none";
      }
    }
  }

  window.__compareVote = function (design) {
    saveVote(design);
    updateUI();
  };

  window.__compareReset = function () {
    clearVote();
    updateUI();
  };

  document.addEventListener("DOMContentLoaded", function () {
    updateUI();
    ["design1", "design2", "design3"].forEach(function (d) {
      var btn = document.getElementById("vote-btn-" + d);
      if (btn) {
        btn.addEventListener("click", function () { window.__compareVote(d); });
      }
    });
    var reset = document.getElementById("vote-reset");
    if (reset) reset.addEventListener("click", window.__compareReset);
  });
})();
