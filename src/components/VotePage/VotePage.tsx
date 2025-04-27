'use client'
import { useState, useEffect, useMemo } from 'react'
import ButtonHome from '@/components/VotePage/ui/ButtonHome'
import Loading from '@/components/VotePage/VoteComponent/LoadingScreen'
import ButtonPlayAgain from '@/components/VotePage/ui/ButtonPlayAgain'
import Link from 'next/link'
import Timer from '@/components/VotePage/VoteComponent/Timer'

export default function VotePage() {
  const [score, setScore] = useState(false);
  const [vote, setVote] = useState<{[name: string]: number}>({});
  const [maxName, setMaxName] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAllEqual, setIsAllEqual] = useState(false);
  const [voteData, setVoteData] = useState<{
    nameList: string[],
    whoDiff: string,
    wordDiff: string,
    wordNormal: string
    inputMinute: number;
    inputSecond: number;
  } | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("voteData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setVoteData(parsedData);

      // Initialize votes for all players to 0
      const initialVotes = parsedData.nameList.reduce((acc: { [key: string]: number }, name: string) => {
        acc[name] = 0;
        return acc;
      }, {});
      setVote(initialVotes);
    }
  }, []);

  const nameList = useMemo(() => {
    return voteData?.nameList ?? [];
  }, [voteData]);
  
  const handleVote = (name: string) => {
    // Vote for the selected player and immediately check if voting is complete
    setVote(prev => {
      const updated = {...prev, [name]: (prev[name] || 0) + 1};
      
      // Check if this was the last vote
      if (currentIndex >= nameList.length - 1) {
        // Process the votes with the updated vote counts
        processVoteResults(updated);
      }
      
      return updated;
    });
  }


  const processVoteResults = (voteResults: {[name: string]: number}) => {
    // Find the maximum vote count
    const voteValues = Object.values(voteResults);
    const maxVoteCount = Math.max(...voteValues);
    
    // Find all players with the maximum vote count
    const maxVoters = Object.keys(voteResults).filter(name => voteResults[name] === maxVoteCount);
    
    console.log("Max Vote Count:", maxVoteCount);
    console.log("Max Voters:", maxVoters);
    console.log("Vote Results:", voteResults);

    // Check if there's a clear winner
    if (maxVoters.length === 1) {
      // Clear winner - only one player has the highest votes
      setMaxName(maxVoters[0]);
      setScore(true);
    } else {
      // Multiple players tied for highest vote
      setIsAllEqual(true);
    }
  }

  const handlePlayerClick = (name: string) => {
    // Vote for the selected player
    handleVote(name);
    
    // Move to the next player's turn
    if (currentIndex < nameList.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }
  const handleTimeUp = () => {
    setIsAllEqual(false); // ปิด popup
    setVote({}); // รีเซ็ตคะแนนโหวต
    setCurrentIndex(0); // กลับไปเริ่มใหม่
  };

  if (!voteData) {
    return <Loading />; // Show loading screen while data is being fetched
  }
  console.log(voteData.inputMinute)
  console.log(voteData.inputSecond)

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Vote Page</h1>
      <h2>{nameList.length} Players</h2>
      <h1>turn "{nameList[currentIndex]}" vote</h1>
      <ul className="m-4 flex flex-col gap-2">
        {nameList.map(
          (name: string, idx: number) =>
            name !== nameList[currentIndex] && (
              <li
                onClick={() => handlePlayerClick(name)}
                key={idx}
                className={`bg-[#F9FAFB] p-4 border border-black/10 rounded-sm w-80 md:w-90 cursor-pointer`}
              >
                <div className="flex justify-center">{name.toLowerCase()}</div>
              </li>
            )
        )}
      </ul>

      {score && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="bg-white w-80 md:w-100 h-100 p-6 rounded-md border-2 flex flex-col items-center gap-3">
            <div className="flex flex-col items-center gap-3">
              <h1 className="text-2xl font-bold text-center">Score Vote</h1>
              <p>"{maxName}" was voted out!!</p>
              <p>Vote Score: {vote[maxName]}</p>

              {maxName !== voteData.whoDiff ? (
                <p className="text-green-500">Spy wins!</p>
              ) : (
                <p className="text-red-500">Spy loses!</p>
              )}

              <p>Spy is "{voteData.whoDiff}"</p>
              <p>Word difference is "{voteData.wordDiff}"</p>
              <p>Word normal is "{voteData.wordNormal}"</p>

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
      )}

      {isAllEqual && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="bg-white w-80 md:w-100 h-100 p-6 rounded-md border-2 flex flex-col items-center gap-3">
            <div className="flex flex-col items-center gap-14">
              <h1>Tie vote - No one was eliminated</h1>
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