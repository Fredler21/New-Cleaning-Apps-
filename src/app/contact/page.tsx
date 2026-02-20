"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || "")
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = (await response.json()) as { message?: string; error?: string };
    setLoading(false);

    if (!response.ok) {
      setStatus(result.error ?? "Unable to send your message.");
      return;
    }

    event.currentTarget.reset();
    setStatus(result.message ?? "Message sent.");
  };

  return (
    <Container>
      <section className="py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text)" }}>Get in Touch</h1>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>Ask about brand collaborations, custom hack roundups, or content licensing.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          <form onSubmit={onSubmit} className="grid gap-4 rounded-xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
            <Input name="name" type="text" placeholder="Name" required aria-label="Name" />
            <Input name="email" type="email" placeholder="Email" required aria-label="Email" />
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Message"
              aria-label="Message"
              className="w-full rounded-xl px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text)" }}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
            {status ? (
              <p className="rounded-lg bg-teal-50 px-3 py-2 text-sm text-teal-700 dark:bg-teal-500/10 dark:text-teal-400" role="status">{status}</p>
            ) : null}
          </form>

          <aside className="overflow-hidden rounded-xl" style={{ border: "1px solid var(--border)" }}>
            <Image
              src="/graphics/hero-premium-bathroom.jpg"
              alt="Premium bathroom visual"
              width={1200}
              height={800}
              className="h-full min-h-[250px] w-full object-cover"
            />
          </aside>
        </div>
      </section>
    </Container>
  );
}
