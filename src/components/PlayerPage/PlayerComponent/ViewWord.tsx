import React from 'react'
import ButtonClose from '@/components/PlayerPage/ui/ButtonClose';


type ButtonProps = {
  showWord: boolean;
  selectedName: string | null;
  wordMap: Record<string, string>; 
  handleViewWordClick: () => void;
}

const ViewWord: React.FC<ButtonProps> = ({showWord, selectedName, wordMap, handleViewWordClick}) => {
  return (
    <div>
      {showWord && selectedName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="bg-white w-80 md:w-100 h-100 p-6 rounded-md border-2 flex flex-col items-center justify-around ">
            <p className="text-xl">
              Player: <strong>{selectedName}</strong>
            </p>
            <p className="mt-2 text-2xl">
              Your Word: <strong>{wordMap[selectedName]}</strong>
            </p>
            <ButtonClose  />
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewWord
