"use client";

import Link from "next/link";
import { useState } from "react";

type Node = {
  id: string;
  symbol: string;
  label: string;
  body?: string;
  children?: Node[];
  href?: string; // if set, the node is a leaf that navigates away
};

const TREE: Node = {
  id: "sol",
  symbol: "☉",
  label: "Sol — the term paper as apex predator",
  body: `For decades the scaffolded academic essay was an ideal piece of pedagogical engineering. It carried three functions on a single artifact: the best vehicle most departments had for teaching students how to think within a discipline, the best instrument they had for assessing whether the student had learned, and a close match to the form of academic communication the professor was already producing in their own research. The threat of LLM-assisted writing is not that any one of those three functions is destroyed; it is that the alignment between them is. Once the student's paper is no longer a reliable instrument of the faculty member's assessment, the whole stack must be re-engineered.`,
  children: [
    {
      id: "saturn",
      symbol: "♄",
      label: "Saturn — AI-resistant assignments",
      body: `For courses not positioned to adopt the full system-building sequence, the Bok Center helps design AI-resistant assignments. These are the appropriate response for many courses, and often function as the bridge to the system-building work.`,
      children: [
        {
          id: "earth",
          symbol: "♁",
          label: "Oral exams & in-class writing",
          body: `Oral assessments, in-class writing, multi-step assignments with required in-person touch points, and take-home work grounded in fresh, local, or experiential data the student could only have produced through course participation. Things that disincentivize cheating, but that are also rich, robust opportunities for students to deepen their ideas about course material in rigorous ways. Assessment under these conditions returns the oral defense to its older role — students submit not only finished work but a record of process, and they defend that record in conversation with the instructor.`,
        },
        {
          id: "venus",
          symbol: "♀",
          label: "Multimodal academic communication / \"remediation\"",
          body: `A long-running Bok–Expos partnership: students take an academic paper and translate it into a different medium — podcast, conference presentation, social media campaign, explainer video. The substantive case is pedagogical, not engagement-based. Explaining an academic argument to an audience that is not already an expert requires the student to internalize the material more thoroughly than the original paper did, because the things one can take for granted with a specialist audience cannot be taken for granted with a general one. The student has to know what they know more clearly.`,
        },
      ],
    },
    {
      id: "mercurius",
      symbol: "☿",
      label: "Mercurius — AI-native assignments",
      body: `In several Bok-supported courses, AI is not making students do less. It is making them do dramatically more. A semester that previously ended in a single essay on a single text now ends in a system of AI agents that translates, interprets, or generates multiple texts.`,
      children: [
        {
          id: "jupiter",
          symbol: "♃",
          label: "From essay to systems argument",
          body: `The shape recurring across these sequences: multi-step and scaffolded; frequent feedback at every stage; and a complex final project that is itself a multi-agent AI system. Students do not write one paper at the end. They build, test, and document a working system whose components correspond to the intellectual moves of the discipline. Two AI techniques in particular map directly onto disciplinary moves the curriculum was already trying to teach.`,
          children: [
            {
              id: "mars",
              symbol: "♂",
              label: "Context engineering — the new lit review",
              body: `Context engineering — assembling and indexing every passage that needs to be present in the AI's working memory for a task — is a much more demanding version of what the lit review was supposed to do. Coming up with a systematic and well-indexed array of texts for any discipline is a marvelous learning opportunity, and probably involves more breadth than any of the steps typically put at the front end of an essay-writing assignment.`,
            },
            {
              id: "luna",
              symbol: "☽",
              label: "Multi-agent design — articulating the moves",
              body: `Multi-agent system design requires students to decompose a complex intellectual task into distinct sub-tasks at a level of precision an agent can act on. They must articulate explicitly what it means to construct an argument, translate a text, or write in the voice of an author they are studying. This articulation is most of the learning. It matters more for assessment, because it lets a faculty member see, in a form that is not vibes-based, what a student thinks the thought processes of a discipline actually are.`,
            },
            {
              id: "example",
              symbol: "⟶",
              label: "Example",
              href: "/example",
            },
          ],
        },
      ],
    },
  ],
};

export default function Home() {
  const [open, setOpen] = useState<Set<string>>(new Set(["sol"]));

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <main className="min-h-screen w-full bg-white font-mono text-black">
      <div className="mx-auto max-w-5xl px-3 py-10 md:px-6">
        <video
          className="mb-10 w-full border border-black"
          src="/theater-spin.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <header className="mb-16 border-b border-black pb-6">
          <div className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            theatrum / stage
          </div>
          <h1 className="mt-2 text-2xl font-normal tracking-tight">
            Rethinking the writing curriculum in the AI era
          </h1>
          <p className="mt-2 text-xs text-neutral-500">
            click a gate to unfold its branch
          </p>
        </header>

        <NodeView node={TREE} open={open} toggle={toggle} depth={0} />

        <footer className="mt-24 border-t border-black pt-4 text-[10px] uppercase tracking-[0.25em] text-neutral-500">
          curated from theatrum · 2026-04-08
        </footer>
      </div>
    </main>
  );
}

function NodeView({
  node,
  open,
  toggle,
  depth,
}: {
  node: Node;
  open: Set<string>;
  toggle: (id: string) => void;
  depth: number;
}) {
  const isOpen = open.has(node.id);
  const isLink = !!node.href;

  const Glyph = (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-black bg-white text-2xl leading-none">
      {node.symbol}
    </span>
  );

  return (
    <div className="relative">
      {/* Node header: glyph + label, click to toggle (or link) */}
      <div className="flex items-center gap-4">
        {isLink ? (
          <Link
            href={node.href!}
            className="group flex items-center gap-4 hover:opacity-70"
          >
            {Glyph}
            <span className="text-sm uppercase tracking-[0.2em] underline-offset-4 group-hover:underline">
              {node.label}
            </span>
          </Link>
        ) : (
          <button
            onClick={() => toggle(node.id)}
            aria-expanded={isOpen}
            className="flex items-center gap-4 text-left hover:opacity-70"
          >
            {Glyph}
            <span className="text-sm uppercase tracking-[0.2em]">
              {node.label}
            </span>
            <span className="text-xs text-neutral-400">
              [{isOpen ? "−" : "+"}]
            </span>
          </button>
        )}
      </div>

      {/* Body + children appear when open */}
      {isOpen && !isLink && (
        <div className="relative mt-4 pl-6">
          {/* vertical blueprint line on the left */}
          <div className="absolute bottom-0 left-[23px] top-0 w-px bg-black" />

          {node.body && (
            <div className="relative ml-6 mb-8 max-w-2xl">
              {/* horizontal tick into the body */}
              <div className="absolute left-[-24px] top-3 h-px w-6 bg-black" />
              <p className="text-[13px] leading-relaxed text-black">
                {node.body}
              </p>
            </div>
          )}

          {node.children && node.children.length > 0 && (
            <div className="ml-6 space-y-10">
              {node.children.map((child) => (
                <div key={child.id} className="relative">
                  {/* horizontal tick into the child glyph */}
                  <div className="absolute left-[-24px] top-6 h-px w-6 bg-black" />
                  <NodeView
                    node={child}
                    open={open}
                    toggle={toggle}
                    depth={depth + 1}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
