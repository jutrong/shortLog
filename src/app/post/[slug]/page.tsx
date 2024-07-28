import { getPostData } from "@/lib/posts";


const DetailPost = async ({ params }: any) => {
  const postData = await getPostData(params.slug);

  return (
    <div>
      <p>
        {postData.blogPost.content}
      </p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
}
export default DetailPost;
