'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import chameleon from '../../data/thai_chameleon_game_pairs.json'

export default function GamePage() {
  const searchParams = useSearchParams()
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
  
  useEffect(() => {
    if (nameList.length === 0) return;

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
    } else {
      setShowWord(false);
      setSelectedName(null);
    }
  }
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl mb-4">Players Words:</h1>
      <ul className="flex flex-col gap-4 mb-4">
        {nameList.map((name: string, idx: number) => (
          <li key={idx} className="border-2 p-4 w-90">
            <div className="flex justify-between">
              {name}
              <span
                onClick={() => {
                  if (!viewedWord.includes(name)) {
                    handleViewWordClick(name);
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
          <div className="bg-white w-80 h-100 p-6 rounded-xl border-2 flex flex-col items-center justify-center">
            <p>Player: {selectedName}</p>
            <p className='mt-2'>Your Word: <strong>{wordMap[selectedName]}</strong></p>
            <button
              onClick={() => handleViewWordClick()}
              className="cursor-pointer w-20 h-10 rounded-xl text-white bg-red-500 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
