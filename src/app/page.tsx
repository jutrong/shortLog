import PostList from "@/components/PostList";
import Tags from "@/components/Tags";
import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  const posts = getSortedPostsData();
  const tags = posts.map((post) => post.tags).flat();


  return (
    <main className="w-[50%]  h-full flex flex-col justify-center py-10 text-black font-Seo lg:w-[100%] sm:w-[100%]">
      <Tags tags={tags} />
      <PostList posts={posts} />
    </main >
  );
}
