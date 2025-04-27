import { usePlayer } from "@/components/PlayerPage/contexts/PlayerContext";
import { GrPowerReset } from "react-icons/gr";


const ButtonReset = () => {
  const { isConfirmReset, setIsConfirmReset } = usePlayer();
  const handleConfirmReset = () =>{
    setIsConfirmReset(!isConfirmReset);
  }

  return (
      <button
        className={`justify-center items-center gap-2 cursor-pointer text-white bg-red-500 hover:bg-red-300 p-3 w-30 rounded-sm flex `}
        onClick={handleConfirmReset}
      >
        <GrPowerReset />
        <p className="text-sm">RESET</p>
      </button>
  )
}

export default ButtonReset
