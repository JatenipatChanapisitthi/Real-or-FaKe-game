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
        <ul className='flex gap-4 border-2'>
            <li><a>1</a></li>
            <li><a>c</a></li>
            <li><a>k</a></li>
        </ul>

    </div>
  )
}
