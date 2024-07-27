import './PostItem.css';

const PostItem = ({ post }: any) => {
  return (
    <div className="post-container text-black px-20 py-14  cursor-pointer ">
      <p className="post-title font-bold text-3xl transition ease-in-out duration-300">{post.title}</p>
      <p className="mt-4 opacity-60">토스증권에서는 이미 다양한 데이터들에 대해 CDC 기술을 도입하고 있습니다. Data Analyst 분들이 사용하는 분석계 데이터, ML Engineer 분들이 학습용 데이터, 토스 앱에서 사용되는 서비스용 데이터 등 다양한 분야에서 CDC를 도입하여 실시간으로 데이터를 제공하고 있었습니다. </p>
      <p className="mt-2 text-sm text-gray-500">{post.date}</p>
    </div>
  )
}

export default PostItem;