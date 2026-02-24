import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export function Hero() {
  return (
    <section className="relative min-h-[520px] overflow-hidden sm:min-h-[600px] lg:min-h-[680px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/graphics/hero-premium-kitchen.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          aria-hidden="true"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-premium-navy/70 via-premium-navy/80 to-premium-navy" />
        <div className="absolute inset-0 bg-gradient-to-r from-premium-navy/90 via-transparent to-transparent" />
      </div>

      <Container>
        <div className="relative flex min-h-[520px] flex-col justify-center sm:min-h-[600px] lg:min-h-[680px]">
          <div className="max-w-2xl">
            {/* Premium label */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-premium-teal/30 bg-premium-teal/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-premium-teal animate-pulse" />
              <span className="text-xs font-medium tracking-wide text-premium-teal uppercase">Trusted by thousands</span>
            </div>

            <h1 className="font-display text-[2.25rem] leading-[1.1] tracking-tight text-white sm:text-[3rem] lg:text-[3.75rem]">
              Smarter Cleaning
              <br />
              <span className="bg-gradient-to-r from-premium-teal to-premium-emerald bg-clip-text text-transparent">
                Starts Here.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
              Tested cleaning hacks using everyday ingredients — no guesswork, no gimmicks. Professional results in minutes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/posts">
                <Button size="lg">
                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  View Hacks
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="secondary" size="lg">
                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Save for Later
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex items-center gap-6 border-t border-white/10 pt-6">
              <div className="text-center">
                <p className="text-xl font-bold text-white">200+</p>
                <p className="text-xs text-slate-400">Tested Hacks</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <p className="text-xl font-bold text-white">50K+</p>
                <p className="text-xs text-slate-400">Monthly Readers</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <p className="text-xl font-bold text-white">4.9★</p>
                <p className="text-xs text-slate-400">User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
