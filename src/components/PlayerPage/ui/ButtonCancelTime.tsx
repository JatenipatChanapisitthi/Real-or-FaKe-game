import { usePlayer } from "@/components/PlayerPage/contexts/PlayerContext";
import { RxCross2 } from "react-icons/rx";




const ButtonCancelTime = () => {
  const { setIsTimeStart, isTimeUp } = usePlayer();
  const handleCloseTime = () =>{
    setIsTimeStart(false) 
  }
  return (
      <button
        onClick={handleCloseTime}
        className={`cursor-pointer w-30 h-10  rounded-sm text-white bg-black hover:bg-gray-600 ${isTimeUp ? "pointer-events-none opacity-50" : ""}`}
      >
        <div className="flex items-center justify-center gap-1">
          <RxCross2 className="text-xl" />
          <p>Cancel</p>
        </div>
      </button>
  )
}

export default ButtonCancelTime
