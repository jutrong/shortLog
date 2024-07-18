import { LIST } from "@/constant/lists";

const Header = () => {
  return (
    <header className="relative w-full h-20 border border-b-black">
      <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border borde-black z-1 bg-white" />
      <div className="w-full h-full flex items-center">
        {
          LIST.map((item) => {
            return (
              <div key={item.id} className="w-full text-center">
                <p className="cursor-pointer">{item.title}</p>
              </div>
            )
          })
        }
      </div>
    </header>
  )
}

export default Header;