'use client'
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { useSearchParams } from 'next/navigation'; // ✨ import ตัวนี้เพิ่ม
import chameleon from '@/data/thai_chameleon_game_pairs_10000.json'

interface PlayerContextType {
    isTimeUp: boolean;
    nameList: string[];
    isShowWord: boolean;
    selectedName: string | null;
    viewedWord: string[];
    whoDiff: string | null;
    wordDiff: string;
    wordNormal: string;
    wordMap: Record<string, string>;
    isConfirmReset: boolean;
    countToStart: number;
    isGoToStart: boolean;
    inputSecond: number;
    inputMinute: number;
    isTimeStart: boolean;
    setViewedWord: (value: React.SetStateAction<string[]>) => void;
    setWhoDiff: (value: string | null) => void;
    setWordDiff: (value: string) => void;
    setWordNormal: (value: string) => void;
    setWordMap: (value: Record<string, string>) => void;
    setIsConfirmReset: (value: boolean) => void;
    setCountToStart: (value: React.SetStateAction<number>) => void;
    setIsGoToStart: (value: boolean) => void;
    setInputMinute: (value: number) => void;
    setInputSecond: (value: number) => void;
    setIsTimeStart: (value: boolean) => void;
    setStartAndRandomWord: () => void;
    setIsTimeUp: (value: boolean) => void;
    setIsShowWord: (value: boolean) => void;
    setSelectedName: (value: string | null) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function usePlayer() {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error("usePlayer must be used within a PlayerProvider");
    }
    return context;
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isShowWord, setIsShowWord] = useState(false);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [viewedWord, setViewedWord] = useState<string[]>([]);
  const [whoDiff, setWhoDiff] = useState<string | null>(null);
  const [wordDiff, setWordDiff] = useState("");
  const [wordNormal, setWordNormal] = useState("");
  const [wordMap, setWordMap] = useState<Record<string, string>>({});
  const [isConfirmReset, setIsConfirmReset] = useState(false);
  const [countToStart, setCountToStart] = useState(1);
  const [isGoToStart, setIsGoToStart] = useState(false);
  const [inputMinute, setInputMinute] = useState(1);
  const [inputSecond, setInputSecond] = useState(30);
  const [isTimeStart, setIsTimeStart] = useState(false);

  const searchParams = useSearchParams();
  const rawNames = searchParams.get('names');
  const nameList = useMemo(() => {
    return rawNames ? JSON.parse(decodeURIComponent(rawNames)) : [];
  }, [rawNames]);
  const setStartAndRandomWord = () => {
    if (nameList.length === 0) return;

    // Random words 
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
    
  return (
    <PlayerContext.Provider
      value={{
        isTimeUp,
        nameList,
        isShowWord,
        selectedName,
        viewedWord,
        whoDiff,
        wordDiff,
        wordNormal,
        wordMap,
        isConfirmReset,
        countToStart,
        isGoToStart,
        inputMinute,
        inputSecond,
        isTimeStart,
        setStartAndRandomWord,
        setIsTimeUp,
        setIsShowWord,
        setSelectedName,
        setViewedWord,
        setWhoDiff,
        setWordDiff,
        setWordNormal,
        setWordMap,
        setIsConfirmReset,
        setCountToStart,
        setIsGoToStart,
        setInputMinute,
        setInputSecond,
        setIsTimeStart,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
