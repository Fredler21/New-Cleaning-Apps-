import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 py-10">
      <Container>
        <div className="flex flex-col gap-4 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} CleaningHax Premium. Smart cleaning, premium results.</p>
          <nav aria-label="Footer links" className="flex items-center gap-4">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/posts" className="hover:text-white">Posts</Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
