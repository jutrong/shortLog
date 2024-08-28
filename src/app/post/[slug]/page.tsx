import Image from 'next/image';
import { getPostData } from "@/lib/posts";
import Link from 'next/link';
import Markdown from '@/components/Markdown';
import Giscus from '@/lib/Giscus';
import TOC from '@/components/Toc';
import './post.css'
import Head from 'next/head';

const DetailPost = async ({ params }: any) => {
  const postData = await getPostData(params.slug);
  return (
    <>
      <Head>
        <title>{`JULOG ${postData.blogPost.title}`}</title>
        <meta name="description" content={postData.blogPost.subTitle} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={`JULOG ${postData.blogPost.title}`} />
        <meta property="og:description" content={postData.blogPost.subTitle} />
        <meta property="og:image" content='/images/png/Kkobi.JPG' />
        <meta property="og:url" content={`https://julog.site}`} />
        <meta property="og:type" content="article" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:title" content={`JULOG ${postData.blogPost.title}`} />

        <meta property="og:description" content={postData.blogPost.subTitle} />
        <meta property="og:image" content='/images/png/Kkobi.JPG' />
      </Head>

      <div className="w-full flex flex-col items-start  text-black mb-20 ">
        <div className=" my-10 font-Seo ">
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
        <div className=" h-[1px] bg-primary opacity-20 " />
        <div className="w-[85%]  mt-20 mb-32 font-Gowun leading-10 tracking-wide relative flex flex-col items-start ">
          <div style={{ position: 'absolute', left: '100%' }}>
            <aside className='toc_aside'>
              <TOC />
            </aside>
          </div>
          <Markdown content={postData.blogPost.content}></Markdown>
        </div >
        <div className='w-full'>
          <Giscus />
        </div>
      </div >
    </>
  );
}
export default DetailPost;
