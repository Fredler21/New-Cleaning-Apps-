import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-premium-gold/40 bg-premium-gold/10 px-3 py-1 text-xs text-premium-gold">
              Luxury Clean Playbook
            </p>
            <h1 className="font-display text-[2rem] leading-tight text-white sm:text-[2.25rem] lg:text-[3.25rem]">
              Premium Cleaning Hacks That Make Every Room Feel Designer-Fresh
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-200 sm:text-lg">
              Explore professional-level hacks inspired by your Instagram favorites—Dawn, vinegar, baking soda, Listerine, deep-clean routines, and budget-smart wins.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/posts"><Button>Explore Posts</Button></Link>
              <Link href="/categories"><Button variant="secondary">Browse Categories</Button></Link>
            </div>
          </div>
          <div className="relative rounded-[1.1rem] border border-white/15 bg-white/5 p-2 shadow-premium">
            <Image
              src="/graphics/hero-premium-kitchen.jpg"
              alt="Premium modern kitchen"
              width={960}
              height={720}
              priority
              className="h-[340px] w-full rounded-[0.9rem] object-cover sm:h-[420px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
