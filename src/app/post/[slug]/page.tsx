import Image from 'next/image';
import { getPostData } from "@/lib/posts";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Markdown from '@/components/Markdown';
import Giscus from '@/lib/Giscus';

const DetailPost = async ({ params }: any) => {
  const postData = await getPostData(params.slug);
  return (
    <div className="w-full flex flex-col items-center text-black mb-20">
      <div className="my-10 font-Seo">
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
        <h1 className="text-[40px] font-bold pt-4">{postData.blogPost.title}</h1>
        <div className="ml-2 mt-2 flex items-center gap-5">
          <p className="opacity-80 ">{postData.blogPost.date}</p>
          {postData.blogPost.tags.map((tag: string[], index: number) => {
            return <p key={index} className="text-[14px] font-[500]">{tag}</p>
          })}
        </div>
      </div>
      <div className="w-[60%] h-[1px] bg-primary opacity-20" />
      <div className="w-full  mt-20 font-Gowun leading-10 tracking-wide">
        <Markdown content={postData.blogPost.content}></Markdown>
      </div>
      <div className='w-full'>
        <Giscus />
      </div>
    </div >
  );
}
export default DetailPost;
