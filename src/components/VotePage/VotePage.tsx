// src/app/vote/VotePage.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'




export default function VotePage() {
  const [score, setScore] = useState(false);
  const [vote, setVote] = useState<{ [name: string]: number }>({})
  const [maxName, setMaxName] = useState<string>("")
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countToVote, setCountToVote] = useState(1); 
  const searchParams = useSearchParams();
  const rawNames = searchParams.get('names');



  
  const nameList = useMemo(() => {
    return rawNames ? JSON.parse(decodeURIComponent(rawNames)) : [];
  }, [rawNames]);

  const handleVote = (name: string) => {
    setVote(prev => {
      const updated = { ...prev, [name]: (prev[name] || 0) + 1 }

      const max = Object.entries(updated).reduce((a, b) =>
        b[1] > a[1] ? b : a
      )
      setMaxName(max[0])
      return updated

    })
    setCountToVote((prev) => prev + 1); //เพิ่มค่าที่ละ 1 ว่ากดไปที่ครั้ง(ถ้า vote เท่า จำนวนคนก็ แสดง popup code อยู่ใน if onClick)
  }
  console.log(maxName)
  console.log(vote)
  console.log(countToVote)
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className="text-2xl font-bold">Vote Page</h1>
      <h2>{nameList.length} Players</h2>
      <h1>turn "{nameList[currentIndex]}" vote</h1>
      <ul className="m-4 flex flex-col gap-2 ">
        {nameList.map((name: string, idx: number) => (
          name !== nameList[currentIndex] && ( //ถ้าชื่อที่ลูปมา ไม่เท่ากับชื่อที่แสดง เป็นจริงเลยทำในวงเล็บ
            <li
              onClick={() => {
                setCurrentIndex(currentIndex + 1);
                handleVote(name)
                if (countToVote === nameList.length) {
                  setScore(true)
                }
              }}

              key={idx}
              className={`bg-[#F9FAFB] p-4 border border-black/10 rounded-sm w-80 md:w-90 cursor-pointer`}
            >
              <div className="flex justify-center">{name.toLowerCase()}
              </div>
            </li>
          )))}

      </ul>


      {score && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="bg-white w-80 md:w-100 h-100 p-6 rounded-md border-2 flex flex-col items-center  gap-3">
            <h1 className="text-2xl font-bold text-center">score Vote</h1>
            <p>"{maxName}" was vote out!!</p>
            <p>Vote Score: {vote[maxName]}</p>


          </div>
        </div>
      )}
    </div>

  )

}
