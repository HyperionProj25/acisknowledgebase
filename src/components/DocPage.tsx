import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { Doc, DocStatus } from "@/lib/docs";
import Fact from "@/components/mdx/Fact";
import TodoContent from "@/components/mdx/TodoContent";

const mdxOptions = {
  mdxOptions: { remarkPlugins: [remarkGfm] },
};

const STATUS_STYLES: Record<DocStatus, string> = {
  stub: "bg-warning/10 text-warning border-warning/30",
  draft: "bg-brand-gold/10 text-brand-gold border-brand-gold/30",
  reviewed: "bg-success/10 text-success border-success/30",
};

export default function DocPage({ doc }: { doc: Doc }) {
  const fm = doc.frontmatter;
  const statusStyle = STATUS_STYLES[fm.status] ?? STATUS_STYLES.stub;

  // Fact needs the page audience so outbound pages get outbound labels and
  // fail the build on internal-only facts.
  const mdxComponents = {
    TodoContent,
    Fact: (props: { k: string }) => <Fact {...props} audience={fm.audience} />,
  };

  return (
    <article className="max-w-[860px] mx-auto px-4 sm:px-6 py-14">
      <header className="mb-10 pb-6 border-b border-surface-border">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {fm.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-white/40">
          <span
            className={`px-2 py-0.5 rounded-full border uppercase tracking-wider ${statusStyle}`}
          >
            {fm.status}
          </span>
          <span>Owner: {fm.owner}</span>
          <span>Last reviewed: {fm.last_reviewed}</span>
          <span>Audience: {fm.audience}</span>
        </div>
      </header>
      <div className="doc-prose">
        <MDXRemote
          source={doc.body}
          components={mdxComponents}
          options={mdxOptions}
        />
      </div>
    </article>
  );
}
