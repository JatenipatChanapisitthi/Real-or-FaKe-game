import { usePlayer } from "@/components/PlayerPage/contexts/PlayerContext";
import { RxCross2 } from "react-icons/rx";

const ButtonCancel = () => {
  const { isConfirmReset, setIsConfirmReset } = usePlayer();
  const handleConfirmReset = () =>{
    setIsConfirmReset(!isConfirmReset);
  }
  return (
      <button
        onClick={handleConfirmReset}
        className="cursor-pointer w-30 h-10  rounded-sm text-white bg-black hover:bg-gray-600"
      >
        <div className="flex items-center justify-center gap-1">
          <RxCross2 className="text-xl" />
          <p>Cancel</p>
        </div>
      </button>
  )
}

export default ButtonCancel
