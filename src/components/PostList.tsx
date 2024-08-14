'use client';

import PostItem from "@/components/PostItem";
import TabMenu from "@/components/TabMenu";
import Link from "next/link";
import { useState } from "react";

interface PostListProps {
  posts: {
    id: string;
    title: string;
    subTitle: string;
    tags: string[];
    tabMenu: string;
    date: string;
  }[];
}

const PostList = ({ posts }: PostListProps) => {
  const [activeTab, setActiveTab] = useState('전체');
  const filteredPosts = posts.filter((post) => activeTab === '전체' || post.tabMenu === activeTab);

  const selectTab = (tabName: string) => {
    setActiveTab(tabName);
  };


  return (
    <>
      <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      {
        filteredPosts.map((post) => (
          <Link href={`/post/${post.id}`}>
            <PostItem key={post.id} post={post} />
          </Link>
        ))
      }
    </>
  )
}

export default PostList;