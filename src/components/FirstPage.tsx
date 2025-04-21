'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [inputName, setInputName] = useState('')
  const [nameList, setNameList] = useState<string[]>([])
  const router = useRouter()

  const addName = () => {
    if (inputName.trim() !== '') {
      setNameList([...nameList, inputName.trim()])
      setInputName('')
    }
  }

  console.log(nameList)
  console.log(nameList.length)

  const goToGame = () => {
    if (nameList.length > 0) {
      const namesEncoded = encodeURIComponent(JSON.stringify(nameList))
      router.push(`/game?names=${namesEncoded}`)
    }
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className='text-4xl pb-10'>the chameleon game</h1>
      <h1 className="text-2xl mb-4">Enter Player Names</h1>
      <p>{nameList.length}</p>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <button className="border border-green-500 p-2" onClick={addName}>
          Add
        </button>
      </div>
      <div className='flex gap-1 mb-1'>
      <ul className="mb-4 border border-fuchsia-600 p-2 pt-0.5 pb-0.5">
        {nameList.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
        <button className='border border-b-red-700 pr-2'>x</button>
      </div>
      <button className="border border-blue-500 p-2" onClick={goToGame}>
        Start Game
      </button>
    </div>
  )
}
