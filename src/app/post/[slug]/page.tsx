import { getPostData } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote";
import { sources } from "next/dist/compiled/webpack/webpack";


const DetailPost = async ({ params }: any) => {
  const postData = await getPostData(params.slug);

  return (
    <div>
      <p>
        {postData.blogPost.content}
      </p>
      <div>
      </div>
    </div>
  );
}
export default DetailPost;
