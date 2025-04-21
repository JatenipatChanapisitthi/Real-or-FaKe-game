'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import chameleon from '../../data/thai_chameleon_game_pairs.json'

export default function GamePage() {
  const searchParams = useSearchParams()
  const namesParam = searchParams.get('names')
  const nameList = namesParam ? JSON.parse(decodeURIComponent(namesParam)) : []

  const [randomIndex, setRandomIndex] = useState<number | null>(null)

  const handleClick = () => {
    const rand = Math.floor(Math.random() * chameleon.pairs.length)
    setRandomIndex(rand)
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl mb-4">Players:</h1>
      <ul className="mb-4">
        {nameList.map((name: string, idx: number) => (
          <li key={idx}>{name}</li>
        ))}
      </ul>

      <button className="border border-red-500 p-2 mb-4" onClick={handleClick}>
        Click to Get a Word Pair
      </button>

      {randomIndex !== null && (
        <div className="text-xl font-semibold">
          <h1>test branch papagkorn</h1>
          {chameleon.pairs[randomIndex][0]} - {chameleon.pairs[randomIndex][1]}
        </div>
      )}
    </div>
  )
}
