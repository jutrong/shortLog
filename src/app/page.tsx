import Header from "@/components/Header";
import PostItem from "@/components/PostItem";
import TabMenu from "@/components/TabMenu";
import Tags from "@/components/Tags";
import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <main className="w-full h-full flex justify-center py-10">
      <div className="w-[1000px]">
        <Header />
        <Tags />
        <TabMenu />
        {posts.map((post) => (
          <Link href={`/post/${post.id}`}>
            <PostItem key={post.id} post={post} />
          </Link>
        ))}
      </div>
    </main >
  );
}
