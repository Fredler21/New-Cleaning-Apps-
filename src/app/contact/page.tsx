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
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Contact</h1>
        <p className="mt-3 text-slate-300">Ask for brand collaborations, custom hack roundups, or content licensing.</p>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.05fr]">
          <form onSubmit={onSubmit} className="grid gap-4 rounded-premium border border-white/10 bg-white/5 p-6">
            <Input name="name" type="text" placeholder="Name" required aria-label="Name" />
            <Input name="email" type="email" placeholder="Email" required aria-label="Email" />
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Message"
              aria-label="Message"
              className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-300 focus:border-premium-teal focus:outline-none focus:ring-2 focus:ring-premium-teal/50"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send message"}
            </Button>
            {status ? <p className="text-sm text-slate-200" role="status">{status}</p> : null}
          </form>

          <aside className="overflow-hidden rounded-premium border border-white/10 bg-white/5 shadow-glass">
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
