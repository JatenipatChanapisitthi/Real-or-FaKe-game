import React from 'react'
import { GrPowerReset } from "react-icons/gr";

type ButtonProps = {
  handleResetClick: () => void;
};
const ButtonConfirm : React.FC<ButtonProps> = ({ handleResetClick }) => { 
  return (
    <div>
      <button
        onClick={handleResetClick}
        className="cursor-pointer w-30 h-10  rounded-sm text-white bg-red-500 hover:bg-red-300"
      >
        <div className="flex items-center justify-center gap-1">
          <GrPowerReset />
          <p>Confirm</p>
        </div>
      </button>
    </div>
  );
}

export default ButtonConfirm