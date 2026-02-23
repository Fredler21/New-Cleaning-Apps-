"use client";

import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

function AccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl transition-colors"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium sm:px-6 sm:text-base"
        style={{ color: "var(--text)" }}
        aria-expanded={open}
      >
        <span>{item.question}</span>

        {/* Arrow icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
          style={{ color: "var(--accent)" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Collapsible answer panel */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? "500px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <p
          className="px-5 pb-5 text-sm leading-7 sm:px-6 sm:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <AccordionItem key={i} item={item} />
      ))}
    </div>
  );
}
