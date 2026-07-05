import DocPage from "@/components/DocPage";
import { getDoc } from "@/lib/docs";

export default function HomePage() {
  return <DocPage doc={getDoc("start-here")} />;
}
