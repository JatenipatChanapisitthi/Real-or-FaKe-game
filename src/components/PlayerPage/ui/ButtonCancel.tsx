import React from 'react'
import { RxCross2 } from "react-icons/rx";

type ButtonProps = {
  handleConfirmReset: () => void;
};
const ButtonCancel : React.FC<ButtonProps> = ({ handleConfirmReset }) => { 
  return (
    <div>
      <button
        onClick={handleConfirmReset}
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

export default ButtonCancel