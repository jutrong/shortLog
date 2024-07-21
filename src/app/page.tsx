import Header from "@/components/Header";
import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <main className="w-screen h-full">
      <Header />
    </main >
  );
}
