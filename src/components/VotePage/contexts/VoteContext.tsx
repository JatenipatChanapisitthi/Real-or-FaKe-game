'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
type VoteData = {
  nameList: string[];
  whoDiff: string;
  wordDiff: string;
  wordNormal: string;
  inputMinute: number;
  inputSecond: number;
};

type VoteContextType = {
  score: boolean;
  vote: { [name: string]: number };
  maxName: string;
  currentIndex: number;
  isAllEqual: boolean;
  playerVoteDone: boolean;
  voteData: VoteData | null;
  textColor: string;
  nameList: string[];
  isShowResultPopup: boolean;
  setIsShowResultPopup: (val: boolean) => void;
  handleVote: (name: string) => void;
  handlePlayerClick: (name: string) => void;
  setIsPlayerVoteDone: (val: boolean) => void;
  handleTimeUp: () => void;
};

const VoteContext = createContext<VoteContextType | undefined>(undefined);

export const VoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [score, setScore] = useState(false);
  const [vote, setVote] = useState<{ [name: string]: number }>({});
  const [maxName, setMaxName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAllEqual, setIsAllEqual] = useState(false);
  const [playerVoteDone, setIsPlayerVoteDone] = useState(false);
  const [voteData, setVoteData] = useState<VoteData | null>(null);
  const [textColor, setTextColor] = useState('#DA3E44');
  const [isShowResultPopup, setIsShowResultPopup] = useState(false);

  useEffect(() => {
    if (playerVoteDone) {
      setTextColor('#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
    }
  }, [playerVoteDone]);

useEffect(() => {
  const storedData = localStorage.getItem('voteData');
  if (storedData) {
    const parsedData = JSON.parse(storedData);

    // ✅ ถ้าไม่มี whoDiff ให้เตือนและไม่โหลด
    if (!parsedData.whoDiff) {
      console.warn("⚠️ voteData.whoDiff is missing or null!");
      return;
    }

    setVoteData(parsedData);

    const initialVotes = parsedData.nameList.reduce((acc: { [key: string]: number }, name: string) => {
      acc[name] = 0;
      return acc;
    }, {});
    setVote(initialVotes);
  }
}, []);


  const nameList = voteData?.nameList ?? [];

  const handleVote = (name: string) => {
    setVote((prev) => {
      const updated = { ...prev, [name]: (prev[name] || 0) + 1 };

      if (currentIndex >= nameList.length - 1) {
        processVoteResults(updated);
      }

      return updated;
    });
  };

  const processVoteResults = (voteResults: { [name: string]: number }) => {
    const voteValues = Object.values(voteResults);
    const maxVoteCount = Math.max(...voteValues);
    const maxVoters = Object.keys(voteResults).filter((name) => voteResults[name] === maxVoteCount);

    if (maxVoters.length === 1) {
      setMaxName(maxVoters[0]);
      setScore(true);
    } else {
      setIsAllEqual(true);
    }
  };

  const handlePlayerClick = (name: string) => {
    handleVote(name);
    toast.success(`You vote ${name} success`)
    if (currentIndex < nameList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsPlayerVoteDone(true);
    }
  };

  const handleTimeUp = () => {
    setIsAllEqual(false);
    setVote({});
    setCurrentIndex(0);
  };

  return (
    <VoteContext.Provider
      value={{
        score,
        vote,
        maxName,
        currentIndex,
        isAllEqual,
        playerVoteDone,
        voteData,
        textColor,
        nameList,
        isShowResultPopup,
        setIsShowResultPopup,
        handleVote,
        handlePlayerClick,
        setIsPlayerVoteDone,
        handleTimeUp,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
};

export const useVote = () => {
  const context = useContext(VoteContext);
  if (!context) throw new Error('useVoteContext must be used within a VoteProvider');
  return context;
};
