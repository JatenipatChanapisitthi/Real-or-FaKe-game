import React from 'react'
import { IoPersonAdd } from "react-icons/io5";
import Link from 'next/link';

const ButtonAddPlayer = () => { 
  return (
    <Link href='AddPlayer'>
      <button
        className="cursor-pointer w-30 h-10  rounded-sm text-white bg-blue-500 hover:bg-blue-600"
      >
        <div className="flex items-center justify-center gap-1">
        <IoPersonAdd  className="text-xl" />
          <p>Add Player</p>
        </div>
      </button>
    </Link>
  );
}

export default ButtonAddPlayer       