const TAG_LIST = [
  'React',
  'TypeScript',
  'Network',
  'JavaScript',
  'Node.js',
  'Express',
  'MongoDB',
  'Python',
  'Django',
  'Flask',
  'Machine Learning',
  'Deep Learning',
  'Data Science',
  'Computer Vision',
  'Natural Language Processing',
  'Web Development',
  'Frontend',
  'Backend',
  'Fullstack',
]
const Tags = () => {

  return (
    <div className="w-full py-10 px-4 bg-primary mt-10 rounded-xl opacity-100">
      <div className="w-full h-full flex justify-center itesm-center  flex-wrap overflow-auto ">
        {TAG_LIST.map((tag, index) => (
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