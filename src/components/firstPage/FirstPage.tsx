'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [inputName, setInputName] = useState('')
  const [nameList, setNameList] = useState<string[]>([])
  const router = useRouter()

  const addNameKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputName.trim() !== '' && !nameList.includes(inputName)) {
        setNameList([...nameList, inputName.trim()])
        setInputName('')
      }
    }
  }
  const addNameClick = () => {
      if (inputName.trim() !== '' && !nameList.includes(inputName)) {
        setNameList([...nameList, inputName.trim()])
        setInputName('')
      }

  }
 


  console.log(nameList)
  console.log(nameList.length)

  const goToGame = () => {
    if (nameList.length > 0) {
      const namesEncoded = encodeURIComponent(JSON.stringify(nameList))
      router.push(`/player?names=${namesEncoded}`)
    }
  }

  return (
    <div className="flex flex-col items-center mt-10 ">
      <h1 className="text-2xl mb-4">Enter Player Names</h1>
      <p>{nameList.length}</p>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          onKeyDown={addNameKeyboard}
        />
        <button className="border border-green-500 p-2" onClick={addNameClick}>
          Add
        </button>
      </div>
      <ul className="mb-4">
        {nameList.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <button className="border border-blue-500 p-2" onClick={goToGame}>
        Start Game
      </button>
    </div>
  )
}
