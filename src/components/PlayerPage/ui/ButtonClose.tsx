import { usePlayer } from "@/components/PlayerPage/contexts/PlayerContext";
import { RxCross2 } from "react-icons/rx";

const ButtonClose = () => {
  const {nameList, viewedWord, countToStart, isShowWord, selectedName, wordMap, setSelectedName, setIsShowWord, setViewedWord, setCountToStart, setIsGoToStart} = usePlayer();
  const handleViewWordClick = (name?: string) => {
    if (name) {
      setSelectedName(name);
      setIsShowWord(true);
      setViewedWord((prev) => (prev.includes(name) ? prev : [...prev, name]));
      setCountToStart((prev) => prev + 1);
      
    } else {
      setIsShowWord(false);
      setSelectedName(null);
    }
  }
  return (
      <button
        onClick={() => handleViewWordClick()}
        className="cursor-pointer w-30 h-10  rounded-sm text-white bg-red-500 "
      >
        <div className="flex items-center justify-center gap-1">
          <RxCross2 className="text-xl" />
          <p>Close</p>
        </div>
      </button>
  )
}

export default ButtonClose
