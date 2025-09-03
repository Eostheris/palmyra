"use client";
import React from "react";
import type { Question } from "@/lib/types";

interface Props {
  q: Question;
  value: unknown;
  onChange: (val: unknown) => void;
}

export default function Question({ q, value, onChange }: Props) {
  const commonLabel = (
    <label className="mb-2 block text-lg font-semibold">
      {q.label} {q.required ? <span className="opacity-70">(required)</span> : null}
    </label>
  );

  const help = q.helpText ? (
    <p className="mb-3 text-sm opacity-80">{q.helpText}</p>
  ) : null;

  switch (q.type) {
    case "shortText": {
      const v = (value as string) ?? "";
      return (
        <div>
          {commonLabel}
          {help}
          <input
            type="text"
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-base outline-none focus:border-white/40 focus:bg-white/20 transition-colors"
            placeholder={(q as any).placeholder ?? ""}
            maxLength={(q as any).maxLength}
            value={v}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
    }
    case "longText": {
      const v = (value as string) ?? "";
      return (
        <div>
          {commonLabel}
          {help}
          <textarea
            className="min-h-[140px] w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-base outline-none focus:border-white/40 focus:bg-white/20 transition-colors resize-none"
            placeholder={(q as any).placeholder ?? ""}
            maxLength={(q as any).maxLength}
            value={v}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
    }
    case "select": {
      const opts = (q as any).options as string[];
      const v = (value as string) ?? "";
      return (
        <div>
          {commonLabel}
          {help}
          <select
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-base outline-none focus:border-white/40 focus:bg-white/20 transition-colors"
            value={v}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="" disabled>
              Select an option
            </option>
            {opts.map((o) => (
              <option key={o} value={o} className="bg-gray-800 text-white">
                {o}
              </option>
            ))}
          </select>
        </div>
      );
    }
    case "multiSelect": {
      const opts = (q as any).options as string[];
      const v = (Array.isArray(value) ? (value as string[]) : []) ?? [];
      const toggle = (o: string) => {
        const next = v.includes(o) ? v.filter((x) => x !== o) : [...v, o];
        const max = (q as any).maxChoices as number | undefined;
        if (max && next.length > max) return; // ignore over-select
        onChange(next);
      };
      return (
        <div>
          {commonLabel}
          {help}
          <div className="flex flex-wrap gap-2">
            {opts.map((o) => (
              <button
                type="button"
                key={o}
                onClick={() => toggle(o)}
                className={`rounded-full border border-white/20 px-4 py-2 text-sm transition-all ${
                  v.includes(o) 
                    ? "bg-white/20 border-white/40 opacity-100" 
                    : "bg-white/5 border-white/20 opacity-60 hover:opacity-80"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      );
    }
    case "yesNo": {
      const v = typeof value === "boolean" ? (value as boolean) : undefined;
      return (
        <div>
          {commonLabel}
          {help}
          <div className="flex gap-3">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={q.id}
                checked={v === true}
                onChange={() => onChange(true)}
                className="text-current"
              />
              <span>Yes</span>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={q.id}
                checked={v === false}
                onChange={() => onChange(false)}
                className="text-current"
              />
              <span>No</span>
            </label>
          </div>
        </div>
      );
    }
    case "number": {
      const v = typeof value === "number" ? (value as number) : (value ? Number(value) : "");
      const { min, max, step } = q as any;
      return (
        <div>
          {commonLabel}
          {help}
          <input
            type="number"
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-base outline-none focus:border-white/40 focus:bg-white/20 transition-colors"
            min={min}
            max={max}
            step={step ?? 1}
            value={v}
            onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
      );
    }
    case "date": {
      const v = (value as string) ?? "";
      const { min, max } = q as any;
      return (
        <div>
          {commonLabel}
          {help}
          <input
            type="date"
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-base outline-none focus:border-white/40 focus:bg-white/20 transition-colors"
            min={min}
            max={max}
            value={v}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
    }
    default:
      return <p>Unsupported question type.</p>;
  }
}
