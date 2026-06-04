import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ChevronLeft, Copy, Check, RotateCcw } from "lucide-react";
import {
  INTAKE_STEPS,
  INTAKE_STEPS as STEPS,
  buildSummaryText,
  loadIntakeState,
  saveIntakeState,
  clearIntakeState,
  type IntakeAnswers,
} from "@/lib/intakeScript";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

const WEB3FORMS_KEY = "e3f95161-8759-43a2-90a6-707479beed4b";

function submitIntake(answers: IntakeAnswers): void {
  const summary = buildSummaryText(answers);
  const name = answers.name || "Unknown";
  const org = answers.org || "Unknown org";
  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `MASReady Intake — ${name} / ${org}`,
      from_name: "MASReady Intake Bot",
      email: "noreply@masready.com.au",
      message: summary,
      botcheck: "",
    }),
  }).catch(() => {});
}

const TOTAL_QUESTIONS = STEPS.filter(
  (s) => s.type !== "welcome" && s.type !== "summary"
).length;

function ProgressDots({ current }: { current: number }) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
        <span
          key={i}
          className={`block rounded-full transition-all duration-300 ${
            i < current
              ? "w-2 h-2 bg-primary"
              : i === current
              ? "w-2.5 h-2.5 bg-primary"
              : "w-1.5 h-1.5 bg-border"
          }`}
        />
      ))}
    </div>
  );
}

function BotBubble({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 mb-4">
      <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
        <MessageCircle className="w-3 h-3 text-primary-foreground" />
      </span>
      <p className="text-sm leading-relaxed text-foreground" style={serif}>
        {text}
      </p>
    </div>
  );
}

function ChipButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm border transition-colors duration-150 ${
        selected
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background text-foreground border-border hover:border-primary hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
}

function SummaryCard({
  answers,
  onReset,
}: {
  answers: IntakeAnswers;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const text = buildSummaryText(answers);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const rows: { label: string; value: string }[] = [
    { label: "Name", value: answers.name || "—" },
    { label: "Organisation", value: answers.org || "—" },
    { label: "Industry", value: answers.industry || "—" },
    { label: "Platform", value: answers.platform || "—" },
    { label: "Scale", value: answers.scale || "—" },
    {
      label: "Focus areas",
      value: answers.focusAreas?.length
        ? answers.focusAreas.join(", ")
        : "—",
    },
    { label: "Pain point", value: answers.painPoint?.trim() || "Not specified" },
    { label: "Timeline", value: answers.timeline || "—" },
  ];

  return (
    <div className="space-y-4">
      <BotBubble text="All done! Here's your requirements summary." />

      <div className="border border-border bg-card text-sm divide-y divide-border">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex gap-2 px-3 py-2">
            <span className="text-muted-foreground w-24 flex-shrink-0 text-xs pt-0.5">
              {label}
            </span>
            <span className="text-foreground leading-snug">{value}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" /> Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" /> Copy Summary
          </>
        )}
      </button>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        Want to talk through this?{" "}
        <a
          href="mailto:aniruddh@assetize.com.au"
          className="text-primary underline underline-offset-2 hover:no-underline"
        >
          aniruddh@assetize.com.au
        </a>
      </p>

      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
      >
        <RotateCcw className="w-3 h-3" /> Start over
      </button>
    </div>
  );
}

export function ChatWidget() {
  const saved = loadIntakeState();
  const [isOpen, setIsOpen] = useState(saved?.isOpen ?? false);
  const [stepIndex, setStepIndex] = useState(saved?.stepIndex ?? 0);
  const [answers, setAnswers] = useState<IntakeAnswers>(saved?.answers ?? {});
  const [textValues, setTextValues] = useState<Record<string, string>>({});
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [textareaValue, setTextareaValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const step = STEPS[stepIndex];

  useEffect(() => {
    saveIntakeState({ stepIndex, answers, isOpen });
  }, [stepIndex, answers, isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [stepIndex, isOpen]);

  function advance(newAnswers: IntakeAnswers) {
    setAnswers(newAnswers);
    setTextValues({});
    setMultiSelect([]);
    setTextareaValue("");
    setStepIndex((i) => {
      const next = i + 1;
      if (STEPS[next]?.type === "summary") {
        submitIntake(newAnswers);
      }
      return next;
    });
  }

  function goBack() {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }

  function reset() {
    clearIntakeState();
    setStepIndex(0);
    setAnswers({});
    setTextValues({});
    setMultiSelect([]);
    setTextareaValue("");
  }

  const questionIndex = STEPS.slice(0, stepIndex).filter(
    (s) => s.type !== "welcome" && s.type !== "summary"
  ).length;

  function renderStep() {
    if (!step) return null;

    if (step.type === "welcome") {
      return (
        <motion.div key="welcome" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <BotBubble text={step.question} />
          <button
            onClick={() => advance(answers)}
            className="mt-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Let's go →
          </button>
        </motion.div>
      );
    }

    if (step.type === "text" && step.fields) {
      const allFilled = step.fields.every((f) => (textValues[f.key] || "").trim());
      return (
        <motion.div key={step.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <BotBubble text={step.question} />
          {step.fields.map((f) => (
            <input
              key={f.key}
              value={textValues[f.key] || ""}
              onChange={(e) =>
                setTextValues((v) => ({ ...v, [f.key]: e.target.value }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" && allFilled) {
                  advance({ ...answers, name: textValues["name"]?.trim(), org: textValues["org"]?.trim() });
                }
              }}
              placeholder={f.placeholder}
              className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          ))}
          <button
            disabled={!allFilled}
            onClick={() =>
              advance({ ...answers, name: textValues["name"]?.trim(), org: textValues["org"]?.trim() })
            }
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </motion.div>
      );
    }

    if (step.type === "chips" && step.options) {
      return (
        <motion.div key={step.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <BotBubble text={step.question} />
          <div className="flex flex-wrap gap-2">
            {step.options.map((opt) => {
              const current =
                step.id === "industry"
                  ? answers.industry
                  : step.id === "platform"
                  ? answers.platform
                  : step.id === "scale"
                  ? answers.scale
                  : answers.timeline;
              return (
                <ChipButton
                  key={opt}
                  label={opt}
                  selected={current === opt}
                  onClick={() => {
                    const updated = {
                      ...answers,
                      ...(step.id === "industry" && { industry: opt }),
                      ...(step.id === "platform" && { platform: opt }),
                      ...(step.id === "scale" && { scale: opt }),
                      ...(step.id === "timeline" && { timeline: opt }),
                    };
                    advance(updated);
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      );
    }

    if (step.type === "multi-chips" && step.options) {
      return (
        <motion.div key={step.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <BotBubble text={step.question} />
          <div className="flex flex-wrap gap-2">
            {step.options.map((opt) => (
              <ChipButton
                key={opt}
                label={opt}
                selected={multiSelect.includes(opt)}
                onClick={() =>
                  setMultiSelect((prev) =>
                    prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
                  )
                }
              />
            ))}
          </div>
          <button
            disabled={multiSelect.length === 0}
            onClick={() => advance({ ...answers, focusAreas: multiSelect })}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </motion.div>
      );
    }

    if (step.type === "textarea") {
      return (
        <motion.div key={step.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <BotBubble text={step.question} />
          <textarea
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            rows={3}
            placeholder="Optional — skip if you'd prefer to discuss"
            className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => advance({ ...answers, painPoint: textareaValue.trim() || undefined })}
              className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {textareaValue.trim() ? "Continue" : "Skip"}
            </button>
          </div>
        </motion.div>
      );
    }

    if (step.type === "summary") {
      return (
        <motion.div key="summary" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <SummaryCard answers={answers} onReset={reset} />
        </motion.div>
      );
    }

    return null;
  }

  const showBack = stepIndex > 0 && step?.type !== "summary";
  const isQuestion = step?.type !== "welcome" && step?.type !== "summary";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-80 bg-background border border-border shadow-xl flex flex-col"
            style={{ maxHeight: "520px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold text-foreground tracking-wide uppercase">
                  MASReady Assistant
                </span>
              </div>
              {isQuestion && (
                <ProgressDots current={questionIndex} />
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 min-h-0"
            >
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>
            </div>

            {/* Back nav */}
            {showBack && (
              <div className="flex-shrink-0 border-t border-border px-4 py-2">
                <button
                  onClick={goBack}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-3 h-3" /> Back
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        aria-label={isOpen ? "Close intake assistant" : "Open intake assistant"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
