import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoc } from "@/lib/content";
import { compileDocToComponent } from "@/lib/content-page";

export default async function ExamplePage() {
  const doc = getDoc("example", ["calvino"]);
  if (!doc) notFound();

  const MDXContent = await compileDocToComponent(doc.content);

  return (
    <main className="min-h-screen w-full bg-white font-mono text-black">
      <div className="mx-auto max-w-3xl px-1 py-10 md:px-1">
        <video
          className="mb-10 w-full border border-black"
          src="/theaters-cross.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <header className="mb-12 border-b border-black pb-6">
          <div className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            theatrum / stage / example
          </div>
          <h1 className="mt-2 text-2xl font-normal tracking-tight">
            {String(doc.metadata.title)}
          </h1>
          {doc.metadata.description && (
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
              {String(doc.metadata.description)}
            </p>
          )}
        </header>

        <article
          className="
            text-[15px] leading-relaxed
            [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:border-black [&_h2]:pb-2
            [&_h2]:text-xs [&_h2]:uppercase [&_h2]:tracking-[0.25em]
            [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-[13px] [&_h3]:uppercase [&_h3]:tracking-[0.2em]
            [&_p]:my-4
            [&_em]:italic
            [&_strong]:font-semibold
            [&_ul]:my-4 [&_ul]:list-none [&_ul]:space-y-2 [&_ul]:pl-0
            [&_li]:relative [&_li]:pl-5
            [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:content-['—']
            [&_img]:my-6 [&_img]:w-full [&_img]:border [&_img]:border-black
            [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70
          "
        >
          <MDXContent />
        </article>

        <div className="mt-16 border-t border-black pt-4">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.2em] underline underline-offset-4 hover:opacity-70"
          >
            ← back to the gates
          </Link>
        </div>
      </div>
    </main>
  );
}
