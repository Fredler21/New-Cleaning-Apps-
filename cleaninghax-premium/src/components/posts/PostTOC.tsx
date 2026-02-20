import { titleToId } from "@/lib/format";
import type { PostStep } from "@/types/post";

type PostTOCProps = {
  steps: PostStep[];
};

export function PostTOC({ steps }: PostTOCProps) {
  return (
    <aside className="rounded-premium border border-white/10 bg-white/5 p-5">
      <h2 className="mb-3 text-base font-semibold text-white">Table of contents</h2>
      <ol className="space-y-2 text-sm text-slate-300">
        <li><a href="#supplies" className="hover:text-white">What you&apos;ll need</a></li>
        <li><a href="#steps" className="hover:text-white">Steps</a></li>
        <li><a href="#pro-tips" className="hover:text-white">Pro tips</a></li>
        <li><a href="#safety" className="hover:text-white">Safety notes</a></li>
        {steps.slice(0, 6).map((step) => (
          <li key={step.title}><a href={`#${titleToId(step.title)}`} className="hover:text-white">{step.title}</a></li>
        ))}
      </ol>
    </aside>
  );
}
