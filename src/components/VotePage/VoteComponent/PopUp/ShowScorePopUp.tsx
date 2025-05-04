import React from 'react'
import ButtonPlayAgain from '@/components/VotePage/ui/ButtonPlayAgain'
import Link from 'next/link'
import ButtonHome from '@/components/VotePage/ui/ButtonHome'
import Loading from '@/components/VotePage/VoteComponent/LoadingScreen'
import { useVote } from '@/components/VotePage/contexts/VoteContext'

const ShowScorePopUp = () => {
    const {score, maxName, voteData, vote, nameList} = useVote();

  if (!voteData) {
    return <Loading /> // Show loading screen while data is being fetched
  }
  
  return (
    <div>
      {score && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="bg-white w-80 md:w-100 h-100 p-6 rounded-md border-2 flex flex-col items-center gap-3">
            <div className="flex flex-col items-center gap-3">
              <h1 className="text-2xl font-bold text-center">Score Vote</h1>
              {maxName !== voteData.whoDiff ? (
                <p className="text-green-500 text-xl">Spy wins!</p>
              ) : (
                <p className="text-red-500 text-xl">Spy loses!</p>
              )}
              <p>"{maxName}" was voted out!!</p>
              <p>Vote Score: {vote[maxName]}</p>
              <p>Spy is "{voteData?.whoDiff}"</p>
              <p>Word difference is "{voteData?.wordDiff}"</p>
              <p>Word normal is "{voteData?.wordNormal}"</p>

              <div className="flex gap-4 m-4">
                <Link
                  href={{
                    pathname: "/player",
                    query: { names: JSON.stringify(nameList) },
                  }}
                  passHref
                >
                  <ButtonPlayAgain />
                </Link>
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
