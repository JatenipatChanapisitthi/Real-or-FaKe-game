import React from 'react'
import { RxCross2 } from "react-icons/rx";

type ButtonProps = {
  handleCloseTime: () => void;
};
const ButtonCancelTime : React.FC<ButtonProps> = ({ handleCloseTime }) => { 
  return (
    <div>
      <button
        onClick={handleCloseTime}
        className="cursor-pointer w-30 h-10  rounded-sm text-white bg-black hover:bg-gray-600"
      >
        <div className="flex items-center justify-center gap-1">
          <RxCross2 className="text-xl" />
          <p>Cancel</p>
        </div>
      </button>
    </div>
  );
}

export default ButtonCancelTime