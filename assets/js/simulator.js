/* MASReady — Animated scenario simulator (plain JS, no external deps) */
(function () {
  "use strict";

  var STAGES = [
    "Customer Context",
    "Evidence Intake",
    "Environment Fingerprint",
    "Skill Match",
    "Scenario Analysis",
    "Trust Boundary",
    "Review-ready Output"
  ];

  var SKILL_DOMAINS = [
    "Automation Scripts",
    "Relationships",
    "Workflow",
    "Escalation",
    "Integration Framework",
    "Patch Impact",
    "License Planning",
    "Mobilisation"
  ];

  var TRUST_CHECKS = [
    "No SQL execution",
    "No Maximo mutation",
    "No Jira mutation",
    "No Azure DevOps mutation",
    "Review-only output",
    "Demo fixture data only"
  ];

  var currentScenario = null;
  var currentStage = 0;
  var stageTimer = null;
  var eventTimer = null;
  var eventLines = [];

  function getScenarioEvents(scenario, stageIndex) {
    var id = scenario.id;
    var events = [
      // Stage 0 — Customer Context
      [
        "loading scenario: " + scenario.id,
        "version: " + scenario.version,
        "industry: " + scenario.industry,
        "data_mode: " + scenario.dataMode,
        "integration: " + scenario.integration,
        "context loaded \u2714"
      ],
      // Stage 1 — Evidence Intake
      id === "mas9-power"
        ? ["reading requirements.json", "connecting Jira read-only", "loading 23 fixture files", "scanning evidence...", "evidence validated \u2714"]
        : id === "legacy-upgrade"
        ? ["reading legacy_config.json", "loading upgrade baseline", "EOS flag detected \u26a0", "loading 18 fixture files", "evidence validated \u2714"]
        : ["reading mobilisation_brief.json", "connecting ADO read-only", "loading site checklist", "loading 15 fixture files", "evidence validated \u2714"],
      // Stage 2 — Environment Fingerprint
      [
        "scanning Maximo objects...",
        "cataloguing customisations...",
        "customisations found: " + (scenario.metrics.customisations || 22),
        "version detection complete",
        "fingerprint captured \u2714"
      ],
      // Stage 3 — Skill Match
      SKILL_DOMAINS.map(function (d) { return "matching: " + d + " \u2714"; }),
      // Stage 4 — Scenario Analysis
      id === "mas9-power"
        ? [
            "patch impacts found: " + scenario.metrics.impactedItems,
            "severity: 0 critical \u00b7 2 high \u00b7 3 medium \u00b7 2 low",
            "AppPoints: " + scenario.metrics.appPointsUsed + "/" + scenario.metrics.appPointsEntitled + " (" + scenario.metrics.utilisation + "%)",
            "skill coverage: 82%",
            "analysis complete \u2714"
          ]
        : id === "legacy-upgrade"
        ? [
            "impacted objects: " + scenario.metrics.impactedItems,
            "high risk items: " + scenario.metrics.high,
            "EOS active — action required \u26a0",
            "upgrade readiness: " + scenario.metrics.readinessScore + "/100",
            "analysis complete \u2714"
          ]
        : [
            "onboarding modules: " + scenario.metrics.onboardingModules,
            "validation checks: " + scenario.metrics.validationChecks,
            "blocked assumptions: " + scenario.metrics.blockedAssumptions,
            "readiness: " + scenario.metrics.readinessScore + "/100",
            "analysis complete \u2714"
          ],
      // Stage 5 — Trust Boundary
      TRUST_CHECKS.map(function (c) { return c + " \u2714"; }),
      // Stage 6 — Output
      ["generating review package...", "output ready \u2714"]
    ];
    return events[stageIndex] || [];
  }

  function init() {
    var container = document.getElementById("simulator-container");
    if (!container) return;

    if (typeof MASREADY_SCENARIOS === "undefined") {
      container.innerHTML = "<p>scenarios.js not loaded</p>";
      return;
    }

    renderScenarioSelect(container);
  }

  function renderScenarioSelect(container) {
    var html = '<div class="sim-panel">';
    html += '<div class="sim-header"><span class="sim-pulse"></span> SELECT SIMULATION SCENARIO</div>';
    html += '<div class="sim-scenarios">';
    MASREADY_SCENARIOS.forEach(function (s) {
      html += '<div class="sim-scenario-card" data-id="' + s.id + '" onclick="window.__simSelectScenario(\'' + s.id + '\')">';
      html += '<div class="sim-scenario-title">' + s.title + '</div>';
      html += '<div class="sim-scenario-sub">' + s.demoName + ' &mdash; ' + s.version + '</div>';
      html += '</div>';
    });
    html += '</div>';
    html += '<div class="sim-footer">';
    html += '<span class="sim-label">Static guided simulation &mdash; no real customer systems connected.</span>';
    html += '<button id="sim-run-btn" class="sim-btn" disabled onclick="window.__simRun()">&#9654; RUN_SIMULATION</button>';
    html += '</div></div>';
    container.innerHTML = html;
  }

  window.__simSelectScenario = function (id) {
    currentScenario = MASREADY_SCENARIOS.find(function (s) { return s.id === id; });
    document.querySelectorAll(".sim-scenario-card").forEach(function (el) {
      el.classList.toggle("selected", el.dataset.id === id);
    });
    var btn = document.getElementById("sim-run-btn");
    if (btn) btn.disabled = false;
  };

  window.__simRun = function () {
    if (!currentScenario) return;
    currentStage = 0;
    eventLines = [];
    renderSimulator();
    runStage(0);
  };

  function renderSimulator() {
    var container = document.getElementById("simulator-container");
    var html = '<div class="sim-panel sim-running">';

    // Progress rail
    html += '<div class="sim-rail">';
    STAGES.forEach(function (s, i) {
      html += '<div class="sim-stage-pill" id="sim-pill-' + i + '">';
      html += '<span>' + (i + 1) + '</span> ' + s;
      html += '</div>';
    });
    html += '</div>';

    // Two-column layout
    html += '<div class="sim-body">';
    html += '<div class="sim-left">';
    html += '<div class="sim-stage-title" id="sim-stage-title"></div>';
    html += '<div class="sim-metrics" id="sim-metrics"></div>';
    html += '</div>';
    html += '<div class="sim-right">';
    html += '<div class="sim-log-header">&#9656; SYSTEM_LOG</div>';
    html += '<div class="sim-log" id="sim-log"></div>';
    html += '</div>';
    html += '</div>';

    // Score (hidden until stage 6)
    html += '<div class="sim-score-wrap" id="sim-score-wrap" style="display:none">';
    html += '<div class="sim-score-label">READINESS SCORE</div>';
    html += '<div class="sim-score-bar"><div class="sim-score-fill" id="sim-score-fill" style="width:0%"></div></div>';
    html += '<div class="sim-score-num"><span id="sim-score-num">0</span> / 100</div>';
    html += '<div class="sim-results" id="sim-results"></div>';
    html += '<div class="sim-actions">';
    html += '<button class="sim-btn" onclick="window.__simReset()">&#8635; Run another</button>';
    html += '<a class="sim-btn sim-btn-outline" href="trust.html">View Trust Model</a>';
    html += '<a class="sim-btn sim-btn-outline" href="contact.html">Request walkthrough</a>';
    html += '</div></div>';

    html += '<div class="sim-footer"><span class="sim-label">Static guided simulation &mdash; no real customer systems connected.</span></div>';
    html += '</div>';
    container.innerHTML = html;
  }

  function runStage(index) {
    if (index >= STAGES.length) return;
    currentStage = index;

    // Update pills
    document.querySelectorAll(".sim-stage-pill").forEach(function (p, i) {
      p.className = "sim-stage-pill" + (i < index ? " done" : i === index ? " active" : "");
    });

    // Stage title
    var title = document.getElementById("sim-stage-title");
    if (title) title.textContent = "Stage " + (index + 1) + ": " + STAGES[index];

    // Stream events
    var lines = getScenarioEvents(currentScenario, index);
    var log = document.getElementById("sim-log");
    var lineIndex = 0;
    if (eventTimer) clearInterval(eventTimer);

    eventTimer = setInterval(function () {
      if (lineIndex >= lines.length) {
        clearInterval(eventTimer);
        if (index === STAGES.length - 1) {
          showOutput();
        } else {
          stageTimer = setTimeout(function () { runStage(index + 1); }, 400);
        }
        return;
      }
      var line = document.createElement("div");
      line.className = "sim-log-line";
      line.textContent = lines[lineIndex];
      if (log) {
        log.appendChild(line);
        log.scrollTop = log.scrollHeight;
      }
      lineIndex++;
    }, 320);
  }

  function showOutput() {
    var wrap = document.getElementById("sim-score-wrap");
    if (wrap) wrap.style.display = "block";

    var score = currentScenario.metrics.readinessScore || 80;
    var fill = document.getElementById("sim-score-fill");
    var num = document.getElementById("sim-score-num");
    var current = 0;
    var interval = setInterval(function () {
      current = Math.min(current + 2, score);
      if (fill) fill.style.width = current + "%";
      if (num) num.textContent = current;
      if (current >= score) clearInterval(interval);
    }, 30);

    var results = document.getElementById("sim-results");
    if (results && currentScenario.results) {
      currentScenario.results.forEach(function (r) {
        var el = document.createElement("div");
        el.className = "sim-result-item";
        el.textContent = "\u2714 " + r;
        results.appendChild(el);
      });
    }
  }

  window.__simReset = function () {
    currentScenario = null;
    currentStage = 0;
    if (stageTimer) clearTimeout(stageTimer);
    if (eventTimer) clearInterval(eventTimer);
    var container = document.getElementById("simulator-container");
    if (container) renderScenarioSelect(container);
  };

  document.addEventListener("DOMContentLoaded", init);
})();
