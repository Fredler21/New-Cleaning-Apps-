import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container>
      <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <span className="text-4xl font-bold text-teal-600">404</span>
        </div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Page Not Found</h1>
        <p className="mt-2 max-w-sm" style={{ color: "var(--text-secondary)" }}>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md active:scale-[0.97]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back Home
        </Link>
      </section>
    </Container>
  );
}
