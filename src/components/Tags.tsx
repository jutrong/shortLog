const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="w-full py-10 px-4 bg-primary mt-10 rounded-xl opacity-100">
      <div className="w-full h-full flex justify-center itesm-center  flex-wrap overflow-auto ">
        {tags.map((tag, index) => (
          <span key={index} className=" px-5 py-1 border font-bold border-white text-white rounded-full my-2 mx-3 cursor-pointer">
            {tag}
          </span>
        ))
        }
      </div>
    </div>
  )
}

export default Tags;