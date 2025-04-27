import { usePlayer } from "@/components/PlayerPage/contexts/PlayerContext";
import { useEffect } from "react";
import ButtonClose from '../ui/ButtonClose';
import ButtonReset from "../ui/ButtonReset";
import ButtonStart from "../ui/ButtonStart";
import ButtonCancel from "../ui/ButtonCancel";
import ButtonConfirm from "../ui/ButtonConfirm";

const PlayerCard = () => {
  const {
    nameList,
    isConfirmReset,
    viewedWord,
    countToStart,
    isShowWord,
    selectedName,
    wordMap,
    wordDiff,
    wordNormal,
    setSelectedName,
    setIsShowWord,
    setViewedWord,
    setCountToStart,
    setIsGoToStart,
    setStartAndRandomWord
  } = usePlayer();
  
    
    useEffect(() => {
      setStartAndRandomWord();
    }, []);

  useEffect(() => {
    if (isConfirmReset || isShowWord) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isConfirmReset, isShowWord]);

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
    <div className="relative bg-white  border border-gray-200 gap-2 flex flex-col w-90 md:w-120 items-center justify-center p-20 rounded-sm">
      <div className="flex flex-col items-center justify-center">
        <a href="/" className="absolute bottom-2 text-sm text-black/80">
          Back To Home
        </a>
        <h1 className="text-2xl font-bold">Players Words:</h1>
        <h2>{nameList.length} Players</h2>
        <ul className="m-4 flex flex-col gap-2 ">
          {nameList.map((name: string, idx: number) => (
            <li
              onClick={() => {
                if (viewedWord.includes(name)) return;
                handleViewWordClick(name);
                if (countToStart === nameList.length) {
                  setIsGoToStart(true);
                }
              }}
              key={idx}
              className={`bg-[#F9FAFB] p-4 border border-black/10 rounded-sm w-80 md:w-90 cursor-pointer${
                viewedWord.includes(name)
                  ? "pointer-events-none opacity-50 border-0"
                  : ""
              }`}
            >
              <div className="flex justify-center">{name.toLowerCase()}</div>
            </li>
          ))}
        </ul>

        {isShowWord && selectedName && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div className="bg-white w-80 md:w-100 h-100 p-6 rounded-md border-2 flex flex-col items-center justify-around ">
              <p className="text-xl">
                Player: <strong>{selectedName}</strong>
              </p>
              <p className="mt-2 text-2xl">
                Your Word: <strong>{wordMap[selectedName]}</strong>
              </p>
              <ButtonClose />
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-4">
        <ButtonReset />
        <ButtonStart />
      </div>

      {isConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="bg-white w-80 md:w-100 h-100 p-6 rounded-md border-2 flex flex-col items-center justify-between gap-3">
            <h1 className="text-2xl font-bold">Do You Want To Reset</h1>
            <div className="flex flex-col gap-4 text-xl">
              <p>
                Difference Word: <strong>{wordDiff}</strong>
              </p>
              <p>
                Normal Word: <strong>{wordNormal}</strong>
              </p>
            </div>

            <div className="flex gap-4">
              <ButtonCancel />

              <ButtonConfirm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerCard
