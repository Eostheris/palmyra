"use client";
import React, { useEffect, useMemo, useState } from "react";
import type { DepartmentConfig, Answers } from "@/lib/types";
import Question from "@/components/Question";
import ArrowButton from "@/components/ArrowButton";
import ProgressDots from "@/components/ProgressDots";
import { fetchDiscordUser } from "@/lib/getDiscordUser";
import Image from "next/image";

interface Props {
  dept: DepartmentConfig;
  logoUrl?: string; // optional site logo path
}

export default function Wizard({ dept, logoUrl }: Props) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [discordId, setDiscordId] = useState<string | null>(null);

  useEffect(() => {
    fetchDiscordUser().then((u) => setDiscordId(u?.id ?? null));
  }, []);

  const q = dept.questions[idx];

  const isValid = useMemo(() => {
    if (!q) return false;
    const v = answers[q.id];
    if (!q.required) return true;
    if (q.type === "yesNo") return typeof v === "boolean";
    if (q.type === "multiSelect") return Array.isArray(v) && v.length > 0;
    return v !== undefined && v !== null && `${v}`.trim() !== "";
  }, [q, answers]);

  const next = () => {
    if (!isValid) return;
    setIdx((i) => Math.min(i + 1, dept.questions.length - 1));
  };

  const back = () => setIdx((i) => Math.max(i - 1, 0));

  const onChange = (val: unknown) => setAnswers((prev) => ({ ...prev, [q.id]: val }));

  async function onSubmit() {
    setError(null);
    if (!discordId) {
      setError("You must be logged in with Discord to submit.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: dept.slug, discordId, answers }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `Submit failed (${res.status}).`);
      }
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || "Unknown error.");
    } finally {
      setSubmitting(false);
    }
  }

  // Theming
  const style: React.CSSProperties = {
    // background can be your site background; using gradient for demo
    background: `linear-gradient(180deg, ${dept.theme.primary} 0%, ${dept.theme.accent} 100%)`,
    color: dept.theme.foreground,
  };

  if (success) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center" style={style}>
        {logoUrl ? (
          <Image src={logoUrl} alt="Logo" width={64} height={64} className="opacity-90" />
        ) : null}
        <h1 className="text-3xl font-bold">Application submitted successfully!</h1>
        <p className="text-lg">Thanks for your interest. Your responses have been sent to the department for review.</p>
        <p className="text-sm opacity-80">You should receive a response within 24-48 hours.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4" style={style}>
      <div className="w-full max-w-2xl rounded-3xl bg-white/10 p-6 backdrop-blur-md" style={{ color: dept.theme.foreground }}>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <Image src={logoUrl} alt="Logo" width={40} height={40} />
            ) : null}
            <div>
              <h2 className="text-xl font-bold">{dept.name} Application</h2>
              <p className="text-sm opacity-80">Question {idx + 1} of {dept.questions.length}</p>
            </div>
          </div>
          <ProgressDots total={dept.questions.length} current={idx} accent={dept.theme.accent} />
        </div>

        {/* Question card */}
        <div className="rounded-2xl bg-white/5 p-5">
          <Question q={q} value={answers[q.id]} onChange={onChange} />
        </div>

        {error ? (
          <p className="mt-4 rounded-xl bg-red-500/20 px-4 py-2 text-sm" role="alert">{error}</p>
        ) : null}

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={back}
            disabled={idx === 0}
            className="rounded-2xl px-5 py-3 font-medium opacity-90 ring-1 ring-inset disabled:opacity-30"
            style={{ borderColor: dept.theme.accent, color: dept.theme.foreground }}
          >
            Back
          </button>

          {idx < dept.questions.length - 1 ? (
            <ArrowButton
              onClick={next}
              disabled={!isValid}
              style={{ backgroundColor: dept.theme.accent, color: dept.theme.primary }}
            />
          ) : (
            <ArrowButton
              label={submitting ? "Submitting..." : "Submit"}
              onClick={onSubmit}
              disabled={!isValid || submitting}
              style={{ backgroundColor: dept.theme.accent, color: dept.theme.primary }}
            />
          )}
        </div>

        <div className="mt-6 text-right text-xs opacity-70">
          {discordId ? (
            <span>Logged in as Discord ID: {discordId}</span>
          ) : (
            <span>Login with Discord required</span>
          )}
        </div>
      </div>
    </div>
  );
}
