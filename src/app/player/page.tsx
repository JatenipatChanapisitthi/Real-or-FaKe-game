'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { FaPlay } from "react-icons/fa";

import chameleon from '../../data/thai_chameleon_game_pairs_10000.json'

export default function GamePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawNames = searchParams.get('names');
  const nameList = useMemo(() => {
    return rawNames ? JSON.parse(decodeURIComponent(rawNames)) : [];
  }, [rawNames]);

  const [randomIndex, setRandomIndex] = useState<number | null>(null)
  const [showWord, setShowWord] = useState(false);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [viewedWord, setViewedWord] = useState<string[]>([]);
  const [whoDiff, setWhoDiff] = useState<string | null>(null);
  const [wordMap, setWordMap] = useState<Record<string, string>>({});
  const [goStart, setGoStart] = useState(true);
  const [count, setCount] = useState(1);


  useEffect(() => {
    if (nameList.length === 0) return;
    console.log(nameList)
    // Random words 
    const rand = Math.floor(Math.random() * chameleon.pairs.length);
    setRandomIndex(rand);
    const [word1, word2] = chameleon.pairs[rand];

    // Random player diff
    const diffIdx = Math.floor(Math.random() * nameList.length);
    const playerDiff = nameList[diffIdx];
    setWhoDiff(playerDiff);

    const assignedWords: Record<string, string> = {};
    nameList.forEach((name: any) => {
      assignedWords[name] = name === playerDiff ? word2 : word1;
    });

    setWordMap(assignedWords);
  }, []);

  const handleViewWordClick = (name?: string) => {
    if (name) {
      setSelectedName(name);
      setShowWord(true);
      setViewedWord((prev) => (prev.includes(name) ? prev : [...prev, name]));
      setCount((prev) => prev + 1);

    } else {
      setShowWord(false);
      setSelectedName(null);
    }
  }
    const goToStart = () => {
    if (nameList.length > 0) {
      const namesEncoded = encodeURIComponent(JSON.stringify(nameList))
      router.push(`/game?names=${namesEncoded}`)
    }
}
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-[#FBFBFB]">
      <div className="bg-white  border border-gray-200  flex flex-col w-90 md:w-120 items-center justify-center p-10 rounded-sm">
        <h1 className="text-2xl font-bold">Players Words:</h1>
        <h2>{nameList.length} Players</h2>
        <ul className="m-4 flex flex-col gap-2 ">
          {nameList.map((name: string, idx: number) => (
            <li key={idx} className="bg-[#F9FAFB] p-4 rounded-sm w-80 md:w-90">
              <div className="flex justify-between">
                {name}
                <span
                  onClick={() => {
                    if (!viewedWord.includes(name)) {
                      handleViewWordClick(name);
                    }
                    if (count === nameList.length) {
                      setGoStart(false);
                    }
                  }}
                  className={`cursor-pointer ${
                    viewedWord.includes(name)
                      ? "pointer-events-none opacity-50"
                      : ""
                  }`}
                >
                  show
                </span>
              </div>
            </li>
          ))}
        </ul>

        {showWord && selectedName && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div className="bg-white w-80 h-100 p-6 rounded-md border-2 flex flex-col items-center justify-around ">
              <p className='text-xl'>
                Player: <strong>{selectedName}</strong>
              </p>
              <p className="mt-2 text-2xl">
                Your Word: <strong>{wordMap[selectedName]}</strong>
              </p>
              <button
                onClick={() => handleViewWordClick()}
                className="cursor-pointer w-30 h-10  rounded-sm text-white bg-red-500 "
              >
                Close
              </button>
            </div>
          </div>
        )}

        <button
          className={`justify-center items-center gap-2 cursor-pointer ${
            goStart ? "pointer-events-none opacity-50 border border-gray-300 " : "text-white bg-green-500 hover:bg-green-300"
          }  p-3 w-30 rounded-sm flex `}
          onClick={goToStart}
        >
          <FaPlay />          
          <p className='text-sm'>START</p>
        </button>
      </div>
    </div>
  );
}
