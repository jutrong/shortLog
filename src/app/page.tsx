import PostList from "@/components/PostList";
import Tags from "@/components/Tags";
import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  const koPosts = getSortedPostsData('ko');
  const jpPosts = getSortedPostsData('jp');
  const allPosts = [...koPosts, ...jpPosts];
  const tags = allPosts.map((post) => post.tags).flat();


  return (
    <main className="w-[50%]  h-full flex flex-col justify-center py-10 text-black font-Seo lg:w-[100%] sm:w-[100%]">
      <Tags tags={tags} />
      <PostList koPosts={koPosts} />
    </main >
  );
}
