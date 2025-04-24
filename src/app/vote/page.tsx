'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const searchParams = useSearchParams();
  const rawNames = searchParams.get('names');
  const nameList = useMemo(() => {
    return rawNames ? JSON.parse(decodeURIComponent(rawNames)) : [];
  }, [rawNames]);


  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className="text-2xl font-bold">Vote Page</h1>
      <h2>{nameList.length} Players</h2>
      <ul className="m-4 flex flex-col gap-2 ">
        {nameList.map((name: string, idx: number) => (
          <li
            key={idx}
          >
            <div className="flex justify-center">{name.toLowerCase()}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
