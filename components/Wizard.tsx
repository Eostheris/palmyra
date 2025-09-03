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

  // Department/Business specific styling
  const getDepartmentStyling = (slug: string) => {
    const styles = {
      lspd: {
        backgroundImage: "/lspdvectorizeai.png",
        primaryColor: "#1E3A8A",
        accentColor: "#60A5FA",
        overlayColor: "rgba(30, 58, 138, 0.85)"
      },
      lscso: {
        backgroundImage: "/lsco_badge2.png", 
        primaryColor: "#059669",
        accentColor: "#34D399",
        overlayColor: "rgba(5, 150, 105, 0.85)"
      },
      ems: {
        backgroundImage: "/SAFR.png",
        primaryColor: "#DC2626",
        accentColor: "#FCA5A5", 
        overlayColor: "rgba(220, 38, 38, 0.85)"
      },
      fire: {
        backgroundImage: "/SAFR.png",
        primaryColor: "#B91C1C",
        accentColor: "#FEF08A",
        overlayColor: "rgba(185, 28, 28, 0.85)"
      },
      doj: {
        backgroundImage: "/doj2.png",
        primaryColor: "#7C2D12", 
        accentColor: "#FED7AA",
        overlayColor: "rgba(124, 45, 18, 0.85)"
      },
      autoexotic: {
        backgroundImage: "/autoexoticcshall.png",
        primaryColor: "#1E40AF",
        accentColor: "#60A5FA",
        overlayColor: "rgba(30, 64, 175, 0.85)"
      },
      "vanilla-unicorn": {
        backgroundImage: "/unicornclubload.png",
        primaryColor: "#EC4899",
        accentColor: "#F472B6", 
        overlayColor: "rgba(236, 72, 153, 0.85)"
      }
    };
    
    return styles[slug as keyof typeof styles] || {
      backgroundImage: "/palmyrawide.png",
      primaryColor: "#1E3A8A",
      accentColor: "#60A5FA", 
      overlayColor: "rgba(30, 58, 138, 0.85)"
    };
  };

  const styling = getDepartmentStyling(dept.slug);

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
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "Unknown error.";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div 
        className="min-h-screen relative flex flex-col items-center justify-center gap-6 text-center"
        style={{
          backgroundImage: `url('${styling.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        {/* Background overlay with department colors */}
        <div 
          className="absolute inset-0 backdrop-blur-sm"
          style={{ backgroundColor: styling.overlayColor }}
        ></div>
        
        {/* Success content */}
        <div className="relative z-10 max-w-2xl mx-auto p-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            {logoUrl ? (
              <Image src={logoUrl} alt="Logo" width={80} height={80} className="mx-auto mb-6 opacity-90" />
            ) : null}
            <h1 
              className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent"
              style={{ 
                background: `linear-gradient(to right, ${styling.accentColor}, white)`
              }}
            >
              Application Submitted Successfully!
            </h1>
            <p className="text-xl text-white/90 mb-4">
              Thanks for your interest in joining {dept.name}. Your application has been sent for review.
            </p>
            <p className="text-white/70">
              You should receive a response within 24-48 hours.
            </p>
            <div 
              className="mt-6 p-4 rounded-xl border border-green-400/30"
              style={{ backgroundColor: `${styling.primaryColor}40` }}
            >
              <p className="text-green-200 font-medium">✅ Application received and processed</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center px-4"
      style={{
        backgroundImage: `url('${styling.backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Background overlay with department colors */}
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: styling.overlayColor }}
      ></div>
      
      <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-white/10 p-6 backdrop-blur-md border border-white/20" style={{ color: dept.theme.foreground }}>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <Image src={logoUrl} alt="Logo" width={40} height={40} />
            ) : null}
            <div>
              <h2 
                className="text-xl font-bold bg-clip-text text-transparent"
                style={{ 
                  background: `linear-gradient(to right, ${styling.accentColor}, white)`
                }}
              >
                {dept.name} Application
              </h2>
              <p className="text-sm opacity-80">Question {idx + 1} of {dept.questions.length}</p>
            </div>
          </div>
          <ProgressDots total={dept.questions.length} current={idx} accent={dept.theme.accent} />
        </div>

        {/* Question card */}
        <div 
          className="rounded-2xl p-5 border"
          style={{ 
            backgroundColor: `${styling.primaryColor}20`,
            borderColor: `${styling.accentColor}60`
          }}
        >
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
