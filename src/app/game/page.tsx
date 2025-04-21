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
      router.push(`/player?names=${namesEncoded}`)
    }
  }

  return (
    <div className="flex flex-col items-center mt-10">
        <h1>hi</h1>
    </div>
  )
}
