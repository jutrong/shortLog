import Image from 'next/image';
import { getPostData } from "@/lib/posts";
import Link from 'next/link';
import Markdown from '@/components/Markdown';
import Giscus from '@/lib/Giscus';
import TOC from '@/components/Toc';
import './post.css'
import Head from 'next/head';
import { getMetadata } from '@/components/getMetaData';
import ToggleSwitch from '@/components/toggle';
import Switch from '@/components/toggle';
import { useState } from 'react';
import ClientDetailPost from '@/components/ClientDetailPost';

export async function generateMetadata({ params }: { params: { id: string, slug: string } }) {
  // 예시로 게시물 ID를 기반으로 게시물 데이터를 가져옵니다.
  const post = await getPostData(params.slug, 'ko');

  // 게시물 데이터가 존재하지 않으면 기본 메타데이터를 반환
  if (!post) {
    return getMetadata();
  }

  // 게시물 데이터를 기반으로 동적 메타데이터 생성
  return getMetadata({
    title: post.blogPost.title,
    description: post.blogPost.subTitle,
    ogImage: '/images/png/Kkobi.JPG',
    asPath: `/posts/${post.blogPost.title}`,
  });
}

const DetailPost = async ({ params }: { params: { slug: string } }) => {
  const koPostData = await getPostData(params.slug, 'ko');
  const jpPostData = await getPostData(params.slug, 'jp');
  const postData = koPostData || jpPostData;

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
      <ClientDetailPost koPostData={koPostData} jpPostData={jpPostData} />
    </>
  );
}
export default DetailPost;
