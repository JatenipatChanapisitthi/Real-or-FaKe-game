import React from 'react'
import { useVote } from '@/components/VotePage/contexts/VoteContext'
import Loading from '@/components/VotePage/VoteComponent/LoadingScreen'
import Timer from '@/components/VotePage/VoteComponent/Timer'

const ShowEqualPopup = () => {
    const { voteData, isAllEqual, handleTimeUp } = useVote();

    if (!voteData) {
        return <Loading /> // Show loading screen while data is being fetched
      }

  return (
    <div>
      {isAllEqual && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="bg-white w-80 md:w-100 h-100 p-6 rounded-md border-2 flex flex-col items-center gap-3">
            <div className="flex flex-col items-center gap-14">
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl">Tie vote</h1>
                <p>No one was eliminated</p>
              </div>
              <Timer
                inputMinute={voteData.inputMinute}
                inputSecond={voteData.inputSecond}
                onTimeUp={handleTimeUp}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowEqualPopup
