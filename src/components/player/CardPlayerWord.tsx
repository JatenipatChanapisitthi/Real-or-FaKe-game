'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'

import  ButtonStart  from "@/components/player/ui/ButtonStart"
import  ButtonReset  from "@/components/player/ui/ButtonReset"

import ConfirmReset from '@/components/player/ConfirmReset'
import chameleon from '../../data/thai_chameleon_game_pairs_10000.json'
import ViewWord from '@/components/player/ViewWord'
import PlayerCard from '@/components/player/PlayerCard'

const CardPlayerWord = () => {
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
    
    const handleConfirmReset = () =>{
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
    <div>
        <div className="relative bg-white  border border-gray-200 gap-2 flex flex-col w-90 md:w-120 items-center justify-center p-20 rounded-sm">
          <PlayerCard 
            nameList={nameList} 
            viewedWord={viewedWord}
            handleViewWordClick={handleViewWordClick}
            countToStart={countToStart}
            setGoStart={setGoStart}
            />

          <ViewWord
            showWord={showWord}
            selectedName={selectedName}
            wordMap={wordMap}
            handleViewWordClick={handleViewWordClick}
          />

          <div className="flex gap-4">
            <ButtonReset handleConfirmReset={handleConfirmReset} />
            <ButtonStart goStart={goStart} goToStart={goToStart} />
            <ConfirmReset
              confirmReset={confirmReset}
              wordDiff={wordDiff}
              wordNormal={wordNormal}
              handleConfirmReset={handleConfirmReset}
              handleResetClick={handleResetClick}
            />
          </div>
        </div>
      
    </div>
  )
}

export default CardPlayerWord
