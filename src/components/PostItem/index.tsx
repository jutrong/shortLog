import './PostItem.css';

const PostItem = ({ post }: any) => {
  return (
    <div className="post-container text-black px-20 py-14 cursor-pointer sm:px-0 ">
      <p className="post-title font-bold text-3xl transition ease-in-out duration-300  sm:text-2xl">{post.title}</p>
      <p className="mt-4 opacity-60 sm:text-sm">{post.subTitle}</p>
      <p className="mt-2 text-sm text-gray-500 sm:text-xs">{post.date}</p>
    </div>
  )
}

export default PostItem;