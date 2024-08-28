import PostList from "@/components/PostList";
import Tags from "@/components/Tags";
import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  const posts = getSortedPostsData();
  const tags = posts.map((post) => post.tags).flat();


  return (
    <main className="w-full h-full flex flex-col justify-center py-10 text-black font-Seo">
      <Tags tags={tags} />
      <PostList posts={posts} />
    </main >
  );
}
