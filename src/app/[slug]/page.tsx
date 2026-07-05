import type { Metadata } from "next";
import DocPage from "@/components/DocPage";
import { getDoc, getDocSlugs } from "@/lib/docs";

// start-here renders at / instead of /start-here
const HOME_SLUG = "start-here";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDocSlugs()
    .filter((slug) => slug !== HOME_SLUG)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  return {
    title: `${doc.frontmatter.title} | ACIS Knowledge Base`,
    description: doc.frontmatter.summary,
  };
}

export default async function DocRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DocPage doc={getDoc(slug)} />;
}
