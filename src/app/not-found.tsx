import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container>
      <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-semibold text-white">404</h1>
        <p className="mt-2 text-slate-300">This page could not be found.</p>
        <Link href="/" className="mt-5 rounded-full bg-premium-teal px-5 py-3 text-sm font-medium text-white">
          Back home
        </Link>
      </section>
    </Container>
  );
}
