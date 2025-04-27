import { usePlayer } from "@/components/PlayerPage/contexts/PlayerContext";
import { FaPlay } from "react-icons/fa";





const ButtonStart = () => {
  const { isGoToStart, setIsTimeStart } = usePlayer();
  const handleOnStart = () =>{
    setIsTimeStart(true)
  }
  return (
        <button
            className={`justify-center items-center gap-2 cursor-pointer ${
            isGoToStart
            ? "text-white bg-green-500 hover:bg-green-300"
            : "pointer-events-none opacity-50 border border-gray-300 "
            }  p-3 w-30 rounded-sm flex `}
            onClick={handleOnStart}
        >
            <FaPlay />
            <p className="text-sm">START</p>
        </button>
  )
}

export default ButtonStart
