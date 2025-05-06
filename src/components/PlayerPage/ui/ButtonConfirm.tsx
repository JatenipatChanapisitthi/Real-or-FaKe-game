import { usePlayer } from "@/components/PlayerPage/contexts/PlayerContext";
import { GrPowerReset } from "react-icons/gr";



const ButtonConfirm = () => {
  const {
    isConfirmReset,
    setWhoDiff,
    setViewedWord,
    setCountToStart,
    setSelectedName,
    setIsConfirmReset,
    setIsGoToStart,
    setIsShowWord,
    setStartAndRandomWord,
  } = usePlayer();

  const handleResetClick = () => {
    setStartAndRandomWord();            
    setIsShowWord(false);   
    setSelectedName(null);
    setViewedWord([]);    
    setWhoDiff(null);     
    setCountToStart(1);          
    setIsGoToStart(false);
    setIsConfirmReset(!isConfirmReset)
  };
  return (
      <button
        onClick={handleResetClick}
        className="cursor-pointer w-30 h-10  rounded-sm text-white bg-red-500 hover:bg-red-300"
      >
        <div className="flex items-center justify-center gap-1">
          <GrPowerReset />
          <p>Confirm</p>
        </div>
      </button>
  )
}

export default ButtonConfirm
