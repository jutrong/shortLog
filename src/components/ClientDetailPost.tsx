'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Markdown from '@/components/Markdown';
import Giscus from '@/lib/Giscus';
import TOC from '@/components/Toc';
import Switch from '@/components/toggle';

interface ClientDetailPostProps {
  koPostData: any;
  jpPostData: any;
}

const ClientDetailPost: React.FC<ClientDetailPostProps> = ({ koPostData, jpPostData }) => {
  const [language, setLanguage] = useState<'ko' | 'jp'>('ko');

  const postData = language === 'ko' ? koPostData : jpPostData;

  const handleLanguageChange = (newLanguage: 'ko' | 'jp') => {
    setLanguage(newLanguage);
  };

  return (
    <div className="w-[50%] flex flex-col items-center text-black mb-20 sm:w-[100%] lg:w-[100%] sm:px-3">
      <div className="w-[80%] my-10 font-Seo sm:mx-4 ">
        <div className='mb-8 cursor-pointer flex items-center justify-between '>
          <Link href="/">
            <Image
              src="/arrow-left.svg"
              alt="back"
              width={30}
              height={30}
            />
          </Link>
          <Switch onLanguageChange={handleLanguageChange} />
        </div>
        <h1 className="text-[40px] font-bold pt-4 sm:text-[26px]">{postData.blogPost.title}</h1>
        <div className="ml-2 mt-2 flex items-center gap-5">
          <p className="opacity-80 sm:text-[12px]">{postData.blogPost.date}</p>
          {postData?.blogPost?.tags.map((tag: string, index: number) => (
            <p key={index} className="text-[14px] font-[500] sm:text-[12px]">{tag}</p>
          ))}
        </div>
      </div>
      <div className=" h-[1px] bg-primary opacity-20 " />
      <div className="w-[80%] lg:w-[90%] sm:w-[100%] mt-20 mb-32 font-Gowun leading-10 tracking-wide relative flex flex-col items-center justify-center">
        <div style={{ position: 'absolute', left: '100%' }}>
          <aside className='toc_aside'>
            <TOC />
          </aside>
        </div>
        <Markdown content={postData.blogPost.content}></Markdown>
      </div>
      <div className='w-full'>
        <Giscus />
      </div>
    </div>
  );
}

export default ClientDetailPost;
