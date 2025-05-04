import React from 'react'
import { useVote } from '@/components/VotePage/contexts/VoteContext'

const ShowNextPlayerPopUp = () => {
    const { nameList, currentIndex, playerVoteDone, setIsPlayerVoteDone } =
      useVote();
    const showNextPlayer = () => {
        return nameList[currentIndex] == undefined
        ? "Voting Finished!"
        : `Next vote is ${nameList[currentIndex]}`;
    };
  return (
    <div>
      
        {playerVoteDone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div className="bg-white w-80 md:w-100 h-100 p-6 rounded-md border-2 flex flex-col justify-center items-center gap-2">
              <div className="flex flex-col items-center gap-14">
                <h1 className="text-2xl font-bold">You Vote Success</h1>
                <h1 className="text-xl">{showNextPlayer()}</h1>
                <button
                  onClick={() => setIsPlayerVoteDone(false)}
                  className="cursor-pointer w-30 h-10 rounded-sm text-white bg-green-500 hover:bg-green-600"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  )
}

export default ShowNextPlayerPopUp
