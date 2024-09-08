const Tags = ({ tags }: { tags: string[] }) => {
  const uniqueTags = Array.from(new Set(tags));

  return (
    <div className="w-full py-10 px-4  mt-10 rounded-xl opacity-100">
      <div className="w-full h-full flex justify-center itesm-center  flex-wrap overflow-auto ">
        {uniqueTags.map((tag, index) => (
          <span key={index} className=" px-5 py-1 border-[0.1px]  border-gray-500 text-black rounded-full my-2 mx-3 cursor-pointer text-xs tracking-wide hover:border-primary duration-300">
            {tag}
          </span>
        ))
        }
      </div>
    </div>
  )
}

export default Tags;