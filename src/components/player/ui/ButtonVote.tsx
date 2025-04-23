import React from 'react'
import { FaVoteYea } from "react-icons/fa";

type ButtonProps = {
  goToVote: () => void;

};
const ButtonVote: React.FC<ButtonProps> = ({goToVote}) => { 
  return (
    <div>
      <button
        className={`cursor-pointer w-30 h-10  rounded-sm text-white bg-black hover:bg-gray-600`}
        onClick={goToVote}
      >
        
        <div className="flex items-center justify-center gap-1">
          <FaVoteYea />
          <p>Vote</p>
        </div>
      </button>
    </div>
  );
}

export default ButtonVote
