import PostItem from "@/components/PostItem";
import TabMenu from "@/components/TabMenu";
import Switch from "@/components/toggle";
import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";

export interface Post {
  id: string;
  title: any;
  subTitle: any;
  tabMenu: any;
  date: any;
  tags: any;
  content: string;
}

interface PostListProps {
  allPosts: Post[];
}
// TODO : tabmenu
const PostList = ({ allPosts }: PostListProps) => {


  return (
    <>
      {/* <Switch onLanguageChange={handleLanguageChange} /> */}
      <TabMenu allPosts={allPosts} />
      {
        allPosts.map((post, index) => (
          <Link href={`/post/${post.id}`} key={post.id}>
            <PostItem key={post.date + index} post={post} />
          </Link>
        ))
      }
    </>
  )
}

export default PostList;