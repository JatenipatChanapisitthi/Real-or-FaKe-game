import React from 'react'
import { RxCross2 } from "react-icons/rx";

type ButtonProps = {
  handleViewWordClick: () => void;
};
const ButtonClose : React.FC<ButtonProps> = ({ handleViewWordClick }) => { 
  return (
    <div>
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
  );
}

export default ButtonClose