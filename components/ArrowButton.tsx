import React from "react";

interface ArrowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export default function ArrowButton({ label = "Next", ...props }: ArrowButtonProps) {
  return (
    <button
      {...props}
      className={`group inline-flex items-center gap-3 rounded-2xl px-6 py-3 font-medium shadow-md transition-transform disabled:opacity-50 disabled:cursor-not-allowed ${
        props.className ?? ""
      }`}
    >
      <span>{label}</span>
      <svg
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-5 w-5 transition-transform group-hover:translate-x-1"
        fill="currentColor"
      >
        <path d="M13.172 12 8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
      </svg>
    </button>
  );
}
