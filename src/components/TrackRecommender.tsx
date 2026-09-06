"use client";

import { useState, type SubmitEvent } from "react";
import {
  recommendTracks,
  type TrackRecommendation,
} from "@/lib/trackRecommender";

const CLOSE_RUNNER_UP_RATIO = 0.6;

export function TrackRecommender() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<TrackRecommendation[] | null>(null);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setResults(recommendTracks(input));
  }

  const top = results && results.length > 0 ? results[0] : null;
  const runnerUp =
    top && top.score > 0 && results && results[1] && results[1].score >= top.score * CLOSE_RUNNER_UP_RATIO
      ? results[1]
      : null;
  const hasNoSignal = results !== null && (!top || top.score === 0);

  return (
    <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper-raised)] p-5 sm:p-6">
      <h2 className="mb-1.5 text-xl font-extrabold tracking-tight">
        Find your track
      </h2>
      <p className="mb-4 max-w-2xl text-sm text-[var(--color-ink-muted)]">
        Describe your idea in a sentence or two and we&apos;ll point you at
        the closest track. It runs entirely in your browser, so nothing you
        type is sent or stored anywhere.
      </p>

      <form onSubmit={handleSubmit} className="mb-5">
        <label htmlFor="track-idea" className="sr-only">
          Describe your research idea
        </label>
        <textarea
          id="track-idea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          placeholder="e.g. An app that uses a phone camera to screen for skin conditions and flag ones that should see a doctor."
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] p-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)]"
        />
        <button
          type="submit"
          disabled={input.trim().length === 0}
          className="mt-3 rounded-md bg-[var(--color-gold)] px-5 py-2.5 text-sm font-bold text-[var(--color-ink)] hover:bg-[#ff8a3d] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Find my track
        </button>
      </form>

      <div aria-live="polite">
        {top && top.score > 0 && (
          <div className="rounded-lg border-2 border-[var(--color-accent)] bg-[var(--color-paper)] p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--color-accent)]">
              Best match
            </p>
            <p className="mb-1 text-xs font-bold text-[var(--color-brand)]">
              TRACK {top.track.id}
            </p>
            <h3 className="mb-2 text-lg font-bold tracking-tight text-balance">
              {top.track.title}
            </h3>

            {top.matchedTopics.length > 0 && (
              <>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
                  Because your idea touches on
                </p>
                <ul className="mb-3 flex flex-wrap gap-2">
                  {top.matchedTopics.map((topic) => (
                    <li
                      key={topic}
                      className="rounded border border-[var(--color-border)] px-2.5 py-1 text-xs font-medium text-[var(--color-ink-muted)]"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <a
              href={`#${top.track.id}`}
              className="text-sm font-semibold text-[var(--color-gold-ink)] underline underline-offset-2"
            >
              Jump to full track details →
            </a>

            {runnerUp && (
              <p className="mt-3 border-t border-[var(--color-border)] pt-3 text-sm text-[var(--color-ink-muted)]">
                Close call, though{" "}
                <a
                  href={`#${runnerUp.track.id}`}
                  className="font-semibold text-[var(--color-brand)] underline underline-offset-2"
                >
                  Track {runnerUp.track.id}, {runnerUp.track.title}
                </a>{" "}
                is also worth a look.
              </p>
            )}
          </div>
        )}

        {hasNoSignal && (
          <p className="rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] p-4 text-sm text-[var(--color-ink-muted)]">
            Not enough to go on yet. Try adding a bit more detail (two or
            three sentences works well), or just read all four tracks below.
            Reviewers judge substance, not the label.
          </p>
        )}
      </div>
    </section>
  );
}
