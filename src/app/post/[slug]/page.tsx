import { getPostData } from "@/lib/posts";
import ReactMarkDown from 'react-markdown';


const DetailPost = async ({ params }: any) => {
  const postData = await getPostData(params.slug);

  return (
    <div className="text-black">
      <div>
        <ReactMarkDown className="prose">{postData.blogPost.content}</ReactMarkDown>
      </div>
    </div>
  );
}
export default DetailPost;
