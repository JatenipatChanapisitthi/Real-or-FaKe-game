import { useVote } from '@/components/VotePage/contexts/VoteContext'
import ButtonPlayAgain from '@/components/VotePage/ui/ButtonPlayAgain'
import ButtonHome from '@/components/VotePage/ui/ButtonHome'
import Loading from '@/components/VotePage/VoteComponent/LoadingScreen'
import ButtonAddPlayer from '../../ui/ButtonAddPlayer'
import { useEffect } from 'react'

import { RiSpyFill } from "react-icons/ri";

const ShowScorePopUp = () => {
    const {score, maxName, voteData, vote, nameList} = useVote();
    useEffect(() => {
      if (score) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
  
      return () => {
        document.body.style.overflow = "";
      };
    }, [score]);

    if (!voteData) {
      return <Loading /> 
    }
  
    const isSpyWin = maxName !== voteData.whoDiff;
  return (
    <div>
      {score && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="bg-white w-80 md:w-100 h-110 p-6 rounded-md border-2 flex flex-col items-center gap-3">
            <div className="flex flex-col items-center gap-6">
              <h1 className="text-3xl font-bold text-center">Vote Result</h1>

              <div className="flex flex-col items-center gap-2">
                <div
                  className={`text-xl font-semibold ${
                    isSpyWin ? "text-green-600" : "text-red-600"
                  } flex items-center justify-center gap-2`}
                >
                  <RiSpyFill size={24} />
                  {isSpyWin ? "Spy Wins!" : "Spy Loses!"}
                </div>

                <p>
                  <strong>{maxName}</strong> was voted out!!
                </p>
                <div className="flex items-center gap-1">
                  <RiSpyFill />
                  <p>
                    Spy is <strong>{voteData?.whoDiff}</strong>
                  </p>
                </div>
                <p>
                  Vote Score: <strong>{vote[maxName]}</strong>
                </p>
                <p>
                  Word difference is <strong>{voteData?.wordDiff}</strong>
                </p>
                <p>
                  Word normal is <strong>{voteData?.wordNormal}</strong>
                </p>
              </div>

              <ButtonPlayAgain />
              <div className="flex gap-4 ">
                <ButtonAddPlayer />
                <ButtonHome />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowScorePopUp
