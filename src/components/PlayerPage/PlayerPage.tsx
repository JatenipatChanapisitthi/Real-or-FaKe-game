'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'


import  Timer   from '@/components/PlayerPage/PlayerComponent/Timer'
import chameleon from '@/data/thai_chameleon_game_pairs_10000.json'
import ViewWord from '@/components/PlayerPage/PlayerComponent/ViewWord'
import PlayerCard from '@/components/PlayerPage/PlayerComponent/PlayerCard'
import GameControlBtn from '@/components/PlayerPage/PlayerComponent/GameControlButtons'

const PlayerPage = () => {
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
  const [goStart, setGoStart] = useState(false);

  const [inputMinute, setInputMinute] = useState(1);
  const [inputSeconds, setInputSeconds] = useState(30);
  const [timeStart, setTimeStart] = useState(false);

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
    
    const handleConfirmReset = () =>{
      setConfirmReset(!confirmReset);
    }
    
    const handleCloseTime = () =>{
      setTimeStart(false) 
    }
    
    
    const handleResetClick = () => {
      setStartAndRandomWord();            
      setShowWord(false);   
      setSelectedName(null);
      setViewedWord([]);    
      setWhoDiff(null);     
      setCountToStart(1);          
      setGoStart(false);
      setInputMinute(1)
      setInputSeconds(30)
      setConfirmReset(!confirmReset)
    };
    
    const onStart = () =>{
      setTimeStart(true)
    }

    const logData = () =>{
      console.log("\n") 
      console.log("count to start",countToStart)
      console.log(`name list len = ${nameList.length}`)
      console.log(`confirm reset = ${confirmReset}`)
      console.log(`who diff = ${whoDiff}`)
      console.log(`name list = ${nameList}`)
  
      console.log("word map",wordMap)
  
      console.log(`show word = ${showWord}`)
      console.log(`who viewed word = ${viewedWord}`)
      console.log(`selected name = ${selectedName}`)
      console.log(`input minute = ${inputMinute}`)
      console.log(`timeStart = ${timeStart}`)
      console.log(`goStart = ${goStart}`)

    }

    logData();
    
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 gap-3">
      <Timer
        inputMinute={inputMinute}
        setInputMinute={setInputMinute}
        inputSeconds={inputSeconds}
        setInputSeconds={setInputSeconds}
        timeStart={timeStart}
        handleCloseTime={handleCloseTime}
        nameList={nameList}
        setGoStart={setGoStart}
      />

      <div className="relative bg-white  border border-gray-200 gap-2 flex flex-col w-90 md:w-120 items-center justify-center p-20 rounded-sm">
        <PlayerCard
          nameList={nameList}
          viewedWord={viewedWord}
          handleViewWordClick={handleViewWordClick}
          countToStart={countToStart}
          setGoStart={setGoStart}
          inputMinute={inputMinute}
          inputSeconds={inputSeconds}
        />

        <ViewWord
          showWord={showWord}
          selectedName={selectedName}
          wordMap={wordMap}
          handleViewWordClick={handleViewWordClick}
        />
        <GameControlBtn
          handleConfirmReset={handleConfirmReset}
          goStart={goStart}
          confirmReset={confirmReset}
          wordDiff={wordDiff}
          wordNormal={wordNormal}
          handleResetClick={handleResetClick}
          onStart={onStart}
        />
      </div>
    </div>
  );
}

export default PlayerPage
