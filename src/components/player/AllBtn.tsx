import React from 'react'
import ButtonReset from './ui/ButtonReset';
import ButtonStart from './ui/ButtonStart';
import ConfirmReset from './ConfirmReset';

type AllBtnProps = {    
  handleConfirmReset: () => void;
  goStart: boolean;
  goToStart: () => void;
  confirmReset: boolean;
  wordDiff: string;
  wordNormal: string;
  handleResetClick: () => void;
  onStart: () => void;
};


const AllBtn: React.FC<AllBtnProps> = ({handleConfirmReset, goStart, goToStart, confirmReset, wordDiff, wordNormal, handleResetClick, onStart}) => {
  return (
    <div className="flex gap-4">
      <ButtonReset handleConfirmReset={handleConfirmReset} />
      <ButtonStart goStart={goStart} goToStart={goToStart}      onStart={onStart} />
      <ConfirmReset
        confirmReset={confirmReset}
        wordDiff={wordDiff}
        wordNormal={wordNormal}
        handleConfirmReset={handleConfirmReset}
        handleResetClick={handleResetClick}
      />
    </div>
      
  )
}

export default AllBtn
