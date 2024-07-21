import Header from "@/components/Header";
import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <main className="w-screen h-full">
      <Header />
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.title}</p>
            <p>{post.date}</p>
          </div>
        ))}
      </div>
    </main >
  );
}
