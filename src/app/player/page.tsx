'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { FaPlay } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";

import chameleon from '../../data/thai_chameleon_game_pairs_10000.json'

export default function GamePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawNames = searchParams.get('names');
  const nameList = useMemo(() => {
    return rawNames ? JSON.parse(decodeURIComponent(rawNames)) : [];
  }, [rawNames]);

  // show player word card
  const [showWord, setShowWord] = useState(false);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [viewedWord, setViewedWord] = useState<string[]>([]);
  // set player word and show who difference
  const [whoDiff, setWhoDiff] = useState<string | null>(null);
  const [wordDiff, setWordDiff] = useState("");
  const [wordNormal, setWordNormal] = useState("");
  const [wordMap, setWordMap] = useState<Record<string, string>>({});
  // confirm reset btn
  const [confirmReset, setConfirmReset] = useState(false);
  // set count to start
  const [countToStart, setCountToStart] = useState(1);
  const [goStart, setGoStart] = useState(true);


  const setStartAndRandomWord = () => {
    if (nameList.length === 0) return;
    // Random words 
    console.log(chameleon.pairs.length)
    const rand = Math.floor(Math.random() * chameleon.pairs.length);
    const [word1, word2] = chameleon.pairs[rand];
    
    // Random player diff
    const diffIdx = Math.floor(Math.random() * nameList.length);
    const playerDiff = nameList[diffIdx];
    setWhoDiff(playerDiff);
    
    const assignedWords: Record<string, string> = {};
    // Random to swap word
    const randSwapWord = Math.floor(Math.random()*2)
    nameList.forEach((name: any) => {
        if (randSwapWord === 0){
          assignedWords[name] = name === playerDiff ? word2 : word1;      
          setWordDiff(word2)
          setWordNormal(word1)
        }
        else{
          assignedWords[name] = name === playerDiff ? word1 : word2;      
          setWordDiff(word1)
          setWordNormal(word2)
        }
      });
      
      setWordMap(assignedWords);
      
    }
    
    useEffect(() => {
      setStartAndRandomWord();
    }, []);

    useEffect(() => {
      if (confirmReset || showWord) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
  
      return () => {
        document.body.style.overflow = "";
      };
    }, [confirmReset, showWord]);
    
    const handleViewWordClick = (name?: string) => {
      if (name) {
        setSelectedName(name);
        setShowWord(true);
        setViewedWord((prev) => (prev.includes(name) ? prev : [...prev, name]));
        setCountToStart((prev) => prev + 1);
        
      } else {
        setShowWord(false);
        setSelectedName(null);
      }
    }
    
    const handleConfirmRest = () =>{
      setConfirmReset(!confirmReset);
    }
    
    
    const handleResetClick = () => {
      setStartAndRandomWord();            
      setShowWord(false);   
      setSelectedName(null);
      setViewedWord([]);    
      setWhoDiff(null);     
      setCountToStart(1);          
      setGoStart(true);
      setConfirmReset(!confirmReset)
    };
    
    const goToStart = () => {
      if (nameList.length > 0) {
        const namesEncoded = encodeURIComponent(JSON.stringify(nameList))
        router.push(`/game?names=${namesEncoded}`)
      }
    }

    const logData = () =>{
      console.log("\n") 
      console.log(`confirm reset = ${confirmReset}`)
      console.log(`who diff = ${whoDiff}`)
      console.log(`name list = ${nameList}`)
  
      console.log("word map",wordMap)
  
      console.log(`show word = ${showWord}`)
      console.log(`who viewed word = ${viewedWord}`)
      console.log(`selected name = ${selectedName}`)
    }

    logData();
    
    return (
      <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-[#FBFBFB]">
        <div className="relative bg-white  border border-gray-200 gap-2 flex flex-col w-90 md:w-120 items-center justify-center p-20 rounded-sm">
        <a href='/' className='absolute bottom-2 text-sm text-black/80'>Back To Home</a>
          <h1 className="text-2xl font-bold">Players Words:</h1>
          <h2>{nameList.length} Players</h2>
          <ul className="m-4 flex flex-col gap-2 ">
            {nameList.map((name: string, idx: number) => (
              <li
              onClick={() => {
                if (!viewedWord.includes(name)) {
                  handleViewWordClick(name);
                }
                if (countToStart === nameList.length) {
                  setGoStart(false);
                }
              }}
              key={idx}
              className={`bg-[#F9FAFB] p-4 border border-black/10 rounded-sm w-80 md:w-90 cursor-pointer${
                viewedWord.includes(name)
                ? "pointer-events-none opacity-50 border-0"
                : ""
              }`}
              >
                <div className="flex justify-center">{name.toLowerCase()}</div>
              </li>
            ))}
          </ul>

          {showWord && selectedName && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
              <div className="bg-white w-80 md:w-100 h-100 p-6 rounded-md border-2 flex flex-col items-center justify-around ">
                <p className="text-xl">
                  Player: <strong>{selectedName}</strong>
                </p>
                <p className="mt-2 text-2xl">
                  Your Word: <strong>{wordMap[selectedName]}</strong>
                </p>
                <button
                  onClick={() => handleViewWordClick()}
                  className="cursor-pointer w-30 h-10  rounded-sm text-white bg-red-500 "
                >
                  <div className="flex items-center justify-center gap-1">
                    <RxCross2 className="text-xl" />
                    <p>Close</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              className={`justify-center items-center gap-2 cursor-pointer text-white bg-red-500 hover:bg-red-300 p-3 w-30 rounded-sm flex `}
              onClick={handleConfirmRest}
            >
              <GrPowerReset />
              <p className="text-sm">RESET</p>
            </button>

            {confirmReset && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
                <div className="bg-white w-80 md:w-100 h-100 p-6 rounded-md border-2 flex flex-col items-center justify-between gap-3">
                  <h1 className="text-2xl font-bold">Do You Want To Reset</h1>
                  <div className="flex flex-col gap-4 text-xl">
                    <p>
                      Difference Word: <strong>{wordDiff}</strong>
                    </p>
                    <p>
                      Normal Word: <strong>{wordNormal}</strong>
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleConfirmRest}
                      className="cursor-pointer w-30 h-10  rounded-sm text-white bg-black hover:bg-gray-600"
                    >
                      <div className="flex items-center justify-center gap-1">
                        <RxCross2 className="text-xl" />
                        <p>Cancel</p>
                      </div>
                    </button>

                    <button
                      onClick={handleResetClick}
                      className="cursor-pointer w-30 h-10  rounded-sm text-white bg-red-500 hover:bg-red-300"
                    >
                      <div className="flex items-center justify-center gap-1">
                        <GrPowerReset />
                        <p>Confirm</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              className={`justify-center items-center gap-2 cursor-pointer ${
                goStart
                ? "pointer-events-none opacity-50 border border-gray-300 "
                : "text-white bg-green-500 hover:bg-green-300"
              }  p-3 w-30 rounded-sm flex `}
              onClick={goToStart}
            >
              <FaPlay />
              <p className="text-sm">START</p>
            </button>
      
          </div>
        </div>
      </div>
    );
}
