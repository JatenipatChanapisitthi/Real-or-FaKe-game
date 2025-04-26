// src/app/vote/VotePage.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'

export default function VotePage() {
  const [score , setscore ] = useState(false);
  const [vote , setVote] = useState<{[name : string] : number}> ({})
  const [maxName , setMaxName ] = useState<string | null> (null)
  const [currentIndex , setCurrentIndex] = useState(0);
  const searchParams = useSearchParams();
  const rawNames = searchParams.get('names');

  const nameList = useMemo(() => {
    return rawNames ? JSON.parse(decodeURIComponent(rawNames)) : [];
  }, [rawNames]);

  const handleVote = (name : string) => {
    setVote(prev => {
      const updated = {...prev , [name]: (prev[name] || 0) +1}

      const max = Object.entries(updated).reduce((a,b) =>
        b[1] > a[1] ? b : a
      )

      setMaxName(max[0])
      return updated

    })
  }
console.log(maxName)
console.log(vote)
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className="text-2xl font-bold">Vote Page</h1>
      <h2>{nameList.length} Players</h2>
      <h1>{nameList[currentIndex]}</h1>
      <ul className="m-4 flex flex-col gap-2 ">
        {nameList.map((name: string, idx: number) => (
          <li
            onClick={() => {
              setCurrentIndex(currentIndex + 1);
              handleVote(name)
            }}
            key={idx}
            className={`bg-[#F9FAFB] p-4 border border-black/10 rounded-sm w-80 md:w-90 cursor-pointer`}
          >
            <div className="flex justify-center">{name.toLowerCase()}</div>
          </li>
        ))}
      </ul>

      {score && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="bg-white w-80 md:w-100 h-100 p-6 rounded-md border-2 flex flex-col items-center justify-between gap-3">
            <h1 className="text-2xl font-bold text-center">score Vote</h1>

          </div>
        </div>
      )}
    </div>

  )

}
