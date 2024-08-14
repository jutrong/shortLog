import Image from 'next/image';
import { getPostData } from "@/lib/posts";
import ReactMarkDown from 'react-markdown';
import rehypePrism from 'rehype-prism-plus';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const DetailPost = async ({ params }: any) => {
  const postData = await getPostData(params.slug);

  return (
    <div className="w-full flex flex-col items-center text-black">
      <div className="my-10 ">
        <div className='mb-8 cursor-pointer'>
          <Link href="/">
            <Image
              src="/arrow-left.svg"
              alt="back"
              width={30}
              height={30}
            />
          </Link>
        </div>
        <h1 className="text-[40px] font-bold">{postData.blogPost.title}</h1>
        <div className="ml-2 mt-2 flex items-center gap-5">
          <p className="opacity-80 ">{postData.blogPost.date}</p>
          {postData.blogPost.tags.map((tag: string[], index: number) => {
            return <p key={index} className="text-[14px] font-[500]">{tag}</p>
          })}
        </div>
      </div>
      <div className="w-[60%] h-[1px] bg-primary opacity-20" />
      <div className="w-full  mt-20 ">
        <ReactMarkDown rehypePlugins={[rehypePrism]} className="prose prose-zinc max-w-none ">{postData.blogPost.content}</ReactMarkDown>
      </div>
    </div >
  );
}
export default DetailPost;
