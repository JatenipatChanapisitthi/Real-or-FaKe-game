import React from 'react'
import { IoIosHome } from "react-icons/io";

const ButtonHome = () => { 
  return (
    <a href='/'>
      <button
        className="cursor-pointer w-30 h-10  rounded-sm text-white bg-red-500 hover:bg-red-600"
      >
        <div className="flex items-center justify-center gap-1">
          <IoIosHome className="text-xl" />
          <p>Home</p>
        </div>
      </button>
    </a>
  );
}

export default ButtonHome       