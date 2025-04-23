import React from 'react'
import { GrPowerReset } from "react-icons/gr";

type ButtonProps = {
  handleConfirmReset: () => void;
};
const ButtonReset : React.FC<ButtonProps> = ({ handleConfirmReset }) => { 
  return (
    <div>
      <button
        className={`justify-center items-center gap-2 cursor-pointer text-white bg-red-500 hover:bg-red-300 p-3 w-30 rounded-sm flex `}
        onClick={handleConfirmReset}
      >
        <GrPowerReset />
        <p className="text-sm">RESET</p>
      </button>
    </div>
  );
}

export default ButtonReset
