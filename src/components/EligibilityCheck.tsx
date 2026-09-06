"use client";

import { useId, useState } from "react";
import { conference } from "@/lib/conference";

type Answer = "yes" | "no" | "unsure";

type QuestionStep = {
  id: "student" | "homeschool" | "homeschoolRecognized" | "schoolRecognized";
  prompt: string;
  options: readonly Answer[];
};

type ResultStep = {
  id: "result";
  tone: "good" | "caution" | "block";
  text: string;
};

type Step = QuestionStep | ResultStep;

const STUDENT: QuestionStep = {
  id: "student",
  prompt: "Are you currently a high school student?",
  options: ["yes", "no"],
};

const HOMESCHOOL: QuestionStep = {
  id: "homeschool",
  prompt: "No worries, are you homeschooled instead?",
  options: ["yes", "no"],
};

// Sourced from the existing callout on the Integrity page: "If you're
// homeschooled and your country recognizes homeschooling, you're covered."
const HOMESCHOOL_RECOGNIZED: QuestionStep = {
  id: "homeschoolRecognized",
  prompt: "Does your country recognize homeschooling as a legitimate form of education?",
  options: ["yes", "no", "unsure"],
};

const SCHOOL_RECOGNIZED: QuestionStep = {
  id: "schoolRecognized",
  prompt: conference.eligibility.schoolRecognitionNote,
  options: ["yes", "no", "unsure"],
};

const ANSWER_LABEL: Record<Answer, string> = {
  yes: "Yes",
  no: "No",
  unsure: "Not sure",
};

const RESULT_STYLES = {
  good: "border-[var(--color-accent)]",
  caution: "border-[var(--color-gold)]",
  block: "border-[var(--color-border)]",
} as const;

const RESULT_GLYPH = { good: "✓", caution: "!", block: "×" } as const;

// Only checks facts that actually appear on the site already — the student
// question and school-recognition question from lib/conference.ts, and the
// homeschool-recognition nuance from the Integrity page's own callout.
// Nothing invented, no age or grade cutoff. Answers live in component state
// only: nothing is sent or stored anywhere.
export function EligibilityCheck() {
  const [history, setHistory] = useState<
    { step: QuestionStep; answer: Answer }[]
  >([]);
  const [current, setCurrent] = useState<Step>(STUDENT);
  const groupId = useId();

  function answer(step: QuestionStep, value: Answer) {
    setHistory((prev) => [...prev, { step, answer: value }]);
    setCurrent(next(step, value));
  }

  function next(step: QuestionStep, value: Answer): Step {
    switch (step.id) {
      case "student":
        return value === "yes" ? SCHOOL_RECOGNIZED : HOMESCHOOL;
      case "homeschool":
        return value === "yes"
          ? HOMESCHOOL_RECOGNIZED
          : {
              id: "result",
              tone: "block",
              text: "This conference is for current high school students, including homeschoolers. If that's not you yet, bookmark this page for when it is.",
            };
      case "homeschoolRecognized":
        if (value === "yes") return SCHOOL_RECOGNIZED;
        if (value === "unsure")
          return {
            id: "result",
            tone: "caution",
            text: "Worth checking before you invest time in a paper: look up whether your country's Ministry of Education (or equivalent) formally recognizes homeschooling as an education path.",
          };
        return {
          id: "result",
          tone: "block",
          text: "This is a hard requirement: inCABS follows how your own country defines a legitimate school, and for homeschool students that has to include homeschooling.",
        };
      case "schoolRecognized":
        if (value === "yes")
          return {
            id: "result",
            tone: "good",
            text: `You're eligible to submit. ${conference.eligibility.geographicRestriction}`,
          };
        if (value === "unsure")
          return {
            id: "result",
            tone: "caution",
            text: "This is rarely an issue in practice. Check with a school administrator or counselor if you want to confirm before you submit.",
          };
        return {
          id: "result",
          tone: "block",
          text: "Recognized-school status is required. Talk to a school administrator about your school's official recognition before submitting.",
        };
    }
  }

  function goBack() {
    if (history.length === 0) return;
    const prevHistory = history.slice(0, -1);
    setHistory(prevHistory);
    setCurrent(
      prevHistory.length === 0
        ? STUDENT
        : next(
            prevHistory[prevHistory.length - 1].step,
            prevHistory[prevHistory.length - 1].answer
          )
    );
  }

  function startOver() {
    setHistory([]);
    setCurrent(STUDENT);
  }

  return (
    <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper-raised)] p-5 sm:p-6">
      <h2 className="mb-1.5 text-xl font-extrabold tracking-tight">
        Am I eligible?
      </h2>
      <p className="mb-4 max-w-2xl text-sm text-[var(--color-ink-muted)]">
        A few quick questions. Nothing here is recorded or sent anywhere.
      </p>

      {history.length > 0 && (
        <ul className="mb-4 flex flex-wrap gap-1.5">
          {history.map(({ step, answer: a }, i) => (
            <li
              key={i}
              className="rounded border border-[var(--color-border)] bg-[var(--color-paper)] px-2 py-1 text-xs text-[var(--color-ink-muted)]"
            >
              {step.prompt.length > 40 ? `${step.prompt.slice(0, 37)}…` : step.prompt}{" "}
              <span className="font-semibold text-[var(--color-ink)]">
                {ANSWER_LABEL[a]}
              </span>
            </li>
          ))}
        </ul>
      )}

      {current.id !== "result" ? (
        <fieldset key={current.id}>
          <legend className="mb-3 text-base font-semibold text-[var(--color-ink)]">
            {current.prompt}
          </legend>
          <div className="flex flex-wrap gap-2.5" role="radiogroup">
            {current.options.map((option) => (
              <label key={option} className="cursor-pointer">
                <input
                  type="radio"
                  name={`${groupId}-${current.id}`}
                  value={option}
                  className="peer sr-only"
                  onChange={() => answer(current, option)}
                />
                <span className="inline-flex items-center rounded-md border-2 border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-2.5 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-brand)] peer-checked:border-[var(--color-brand)] peer-checked:bg-[var(--color-brand)] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-focus)]">
                  {ANSWER_LABEL[option]}
                </span>
              </label>
            ))}
          </div>
          {history.length > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="mt-4 text-sm font-semibold text-[var(--color-brand)] underline underline-offset-2"
            >
              ← Back
            </button>
          )}
        </fieldset>
      ) : (
        <div
          role="status"
          className={`flex items-start gap-3 rounded-md border-2 bg-[var(--color-paper)] p-4 ${RESULT_STYLES[current.tone]}`}
        >
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 border-current text-sm font-bold"
          >
            {RESULT_GLYPH[current.tone]}
          </span>
          <div>
            <p className="text-sm font-medium text-[var(--color-ink)]">{current.text}</p>
            <button
              type="button"
              onClick={startOver}
              className="mt-3 text-sm font-semibold text-[var(--color-brand)] underline underline-offset-2"
            >
              Start over
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
