import './PostItem.css';

const PostItem = ({ post }: any) => {
  return (
    <div className="post-container text-black px-20 py-14  cursor-pointer ">
      <p className="post-title font-bold text-3xl transition ease-in-out duration-300">{post.title}</p>
      <p className="mt-4 opacity-60">{post.subTitle}</p>
      <p className="mt-2 text-sm text-gray-500">{post.date}</p>
    </div>
  )
}

export default PostItem;