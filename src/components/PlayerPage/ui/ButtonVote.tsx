import { usePlayer } from "@/components/PlayerPage/contexts/PlayerContext";
import { useRouter } from "next/navigation";
import { FaVoteYea } from "react-icons/fa";


const ButtonVote= () => {
  const {nameList, whoDiff, wordDiff, wordNormal, inputMinute, inputSecond, isTimeUp} = usePlayer();
  const router = useRouter();
    const handleGotoVotePage = () => {  
      if (nameList.length > 0) {
        localStorage.setItem("voteData", JSON.stringify({
          nameList,
          whoDiff,
          wordDiff,
          wordNormal,
          inputMinute,
          inputSecond,
        }));
        router.push("/vote");
      }
    };
  return (
      <button
        className={`cursor-pointer w-30 h-10  rounded-sm text-white bg-black hover:bg-gray-600 ${isTimeUp ? "pointer-events-none opacity-50" : ""}`}
        onClick={handleGotoVotePage}
        >
        <div className="flex items-center justify-center gap-1">
          <FaVoteYea />
          <p>Vote</p>
        </div>
      </button>
  )
}

export default ButtonVote


