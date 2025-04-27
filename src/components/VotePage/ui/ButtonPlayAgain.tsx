import React from 'react'
import { MdRestartAlt } from 'react-icons/md'

const ButtonPlay = () => {

  return (
    <button
      className="cursor-pointer w-30 h-10 rounded-sm text-white bg-green-500 hover:bg-green-600"
    >
      <div className="flex items-center justify-center gap-1">
        <MdRestartAlt className="text-xl" />
        <p>play again</p>
      </div>
    </button>
  )
}

export default ButtonPlay

