import React from 'react'
import { FaPlay } from "react-icons/fa";

type ButtonProps = {
  goStart: boolean;
  goToStart: () => void;
};

const Button: React.FC<ButtonProps> = ({ goStart, goToStart }) => {

  return (
    <div>
        <button
            className={`justify-center items-center gap-2 cursor-pointer ${
            goStart
            ? "pointer-events-none opacity-50 border border-gray-300 "
            : "text-white bg-green-500 hover:bg-green-300"
            }  p-3 w-30 rounded-sm flex `}
            onClick={goToStart}
        >
            <FaPlay />
            <p className="text-sm">START</p>
        </button>
    </div>
  )
}

export default Button
