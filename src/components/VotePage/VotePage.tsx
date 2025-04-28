'use client'
import ButtonHome from '@/components/VotePage/ui/ButtonHome'
import { useState, useEffect, useMemo } from 'react'
import Loading from '@/components/VotePage/VoteComponent/LoadingScreen'
import ButtonPlayAgain from '@/components/VotePage/ui/ButtonPlayAgain'
import Link from 'next/link'

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

  if (!voteData) {
    return <Loading />; // Show loading screen while data is being fetched
  }

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
            <div className="flex flex-col items-center gap-3">
              <h1>Tie vote - No one was eliminated</h1>
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
    </div>
  );
}

// 'use client'

// import { useState, useEffect, useMemo } from 'react'
// import ButtonHome from '@/components/VotePage/ui/ButtonHome'
// import Loading from '@/components/VotePage/VoteComponent/LoadingScreen'
// import ButtonPlayAgain from '@/components/VotePage/ui/ButtonPlayAgain'
// import Timer from '../PlayerPage/PlayerComponent/Timer'
// import Link from 'next/link'

// export default function VotePage() {
//   const [score , setScore ] = useState(false);
//   const [vote , setVote] = useState<{[name : string] : number}> ({})
//   const [maxName , setMaxName ] = useState<string> ("")
//   const [currentIndex , setCurrentIndex] = useState(0);
//   const [countToVote, setCountToVote] = useState(1);
//   const [isAllEqual, setIsAllEqual] = useState(false);
//   const [voteData, setVoteData] = useState<{
//     nameList: string[],
//     whoDiff: string,
//     wordDiff: string,
//     wordNormal: string
//   } | null>(null);

//   useEffect(() => {
//       const storedData = localStorage.getItem("voteData");
//       if (storedData) {
//         const parsedData = JSON.parse(storedData);
//         setVoteData(parsedData);

//         // ตั้งค่า vote ให้ทุกคนเป็น 0 เมื่อข้อมูลถูกโหลดเสร็จ
//         const initialVotes = parsedData.nameList.reduce((acc: { [key: string]: number }, name: string) => {
//           acc[name] = 0; // กำหนดคะแนนเริ่มต้นเป็น 0
//           return acc;
//         }, {});
//         setVote(initialVotes);
//       }
//     }, []);

//     const nameList = useMemo(() => {
//       return voteData?.nameList ?? [];
//     }, [voteData]);
  


//    const handleVote = (name : string) => {
//     setVote(prev => {
//       const updated = {...prev , [name]: (prev[name] || 0) +1}
//       const max = Object.entries(updated).reduce((a,b) =>
//         b[1] > a[1] ? b : a
//       )
//       setMaxName(max[0])
//       return updated
//     })
//     setCountToVote((prev) => prev+1)
//   }

//   const handleVoteClick = () => {
//     if (countToVote === nameList.length) {
//       // กรองค่าคะแนนที่ไม่ใช่ 0
//       const voteValues = Object.values(vote).filter(voteCount => voteCount > 0);
  
//       // หาคะแนนสูงสุด
//       const maxVoteCount = Math.max(...voteValues);
  
//       // หาผู้ที่มีคะแนนสูงสุด
//       const maxVoters = Object.values(vote).filter(voteCount => voteCount === maxVoteCount);
  
//       // ตรวจสอบว่า คะแนนทุกคนเท่ากันหรือไม่
//       const allScoresEqual = voteValues.every(voteCount => voteCount === voteValues[0]);
  
//       // ถ้ามีผู้ที่มีคะแนนสูงสุดมากกว่าหนึ่งคน หรือคะแนนเท่ากันทุกคน
//       if (maxVoters.length > 1 || allScoresEqual) {
//         setIsAllEqual(true);  // ถ้ามีคนคะแนนสูงสุดซ้ำ หรือคะแนนเท่ากันทุกคน
//       } else {
//         setIsAllEqual(false);  // ถ้ามีแค่คนเดียวที่มีคะแนนสูงสุด
//       }
  
//       setScore(true);  // แสดงผลคะแนน
//     }
//   }

//   if (!voteData) {
//       return <Loading />; // ถ้าข้อมูลยังโหลดไม่เสร็จ
//     }

 
//   console.log(voteData.whoDiff)
//   console.log(vote)
//   console.log(vote[voteData.whoDiff])
//   console.log(isAllEqual)

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <h1 className="text-2xl font-bold">Vote Page</h1>
//       <h2>{nameList.length} Players</h2>
//       <h1>turn "{nameList[currentIndex]}" vote</h1>
//       <ul className="m-4 flex flex-col gap-2 ">
//         {nameList.map(
//           (name: string, idx: number) =>
//             name !== nameList[currentIndex] && ( //ถ้าชื่อที่ลูปมา ไม่เท่ากับชื่อที่แสดง เป็นจริงเลยทำในวงเล็บ
//               <li
//                 onClick={() => {
//                   setCurrentIndex(currentIndex + 1);
//                   handleVote(name);
//                   handleVoteClick();
//                 }}
//                 key={idx}
//                 className={`bg-[#F9FAFB] p-4 border border-black/10 rounded-sm w-80 md:w-90 cursor-pointer`}
//               >
//                 <div className="flex justify-center">{name.toLowerCase()}</div>
//               </li>
//             )
//         )}
//       </ul>

//       {score && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
//           <div className="bg-white w-80 md:w-100 h-100 p-6 rounded-md border-2 flex flex-col items-center gap-3">
//             {isAllEqual ? (
//               <h1 className="text-xl font-bold text-center">
//                 {/* ให้จับเวลาใหม่ */}
//                 All votes are equal!
//               </h1>
//             ) : (
//               <div className="flex flex-col items-center gap-3">
//                 <h1 className="text-2xl font-bold text-center">Score Vote</h1>
//                 <p>"{maxName}" was voted out!!</p>
//                 <p>Vote Score: {vote[maxName]}</p>

//                 {vote[maxName] > vote[voteData.whoDiff] ? (
//                   <p className="text-green-500">Spy wins!</p>
//                 ) : (
//                   <p className="text-red-500">Spy loses!</p>
//                 )}

//                 <p>Spy is "{voteData.whoDiff}"</p>
//                 <p>Word difference is "{voteData.wordDiff}"</p>
//                 <p>Word normal is "{voteData.wordNormal}"</p>

//                 <Link
//                   href={{
//                     pathname: "/player",
//                     query: { names: JSON.stringify(nameList) }, // ส่งข้อมูลชื่อผู้เล่นผ่าน query
//                   }}
//                   passHref
//                 >
//                   <ButtonPlayAgain />
//                 </Link>
//                 <ButtonHome />
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//     </div>
//   );

// }
