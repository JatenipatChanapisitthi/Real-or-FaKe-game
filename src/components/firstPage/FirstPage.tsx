'use client'

import { use, useDebugValue, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IoPersonAdd } from "react-icons/io5";
import { MdEdit } from "react-icons/md";;
import { FaTrash } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

export default function Home() {
  const [inputName, setInputName] = useState('');
  const [nameList, setNameList] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editNameIndex, setEditNameIndex] =  useState<number | null>(null);
  const [isSameName, setIsSameName] = useState(false);

  const router = useRouter()

  const addNameKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputName.trim() !== '' && !nameList.includes(inputName)) {
        setNameList([...nameList, inputName.trim()])
        setInputName('')
      }
    }
  }
  const addNameClick = () => {
      if (inputName.trim() !== '' && !nameList.includes(inputName)) {
        setNameList([...nameList, inputName.trim()])
        setInputName('')
        setIsSameName(false)
      }
      else{
        setIsSameName(true)
      }

  }
  const handleDeleteClick = (index: number) =>{
    const updateName = nameList.filter((_, i) => i !== index);
    setNameList(updateName);
  }

const handleEditClick = (index: number) => {
  setIsEditing(true);
  setEditName(nameList[index]); 
  setEditNameIndex(index); 
}
const saveEditedWord = (index: number) => {
  if (editName.trim() !== '' && !nameList.includes(editName.trim()) || nameList[index] === editName.trim()) {
    const updatedNameList = [...nameList];
    updatedNameList[index] = editName.trim(); 
    setNameList(updatedNameList);
    setIsEditing(false); 
    setEditName(''); 
    setIsSameName(false)
  }
  else{
    setIsSameName(true)
  }
}

const handleCancelClick = () => {
  setIsEditing(false)
  setEditName('')
  setEditNameIndex(null)
}




  console.log(nameList)
  console.log(nameList.length)
  console.log(isEditing)

  const goToGame = () => {
    if (nameList.length > 0) {
      const namesEncoded = encodeURIComponent(JSON.stringify(nameList))
      router.push(`/player?names=${namesEncoded}`)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col  gap-2 border border-black/40 rounded-sm p-5 w-90 md:w-120">
        <div className="flex gap-4 items-center">
          <IoPersonAdd className="text-xl h-auto w-auto" />
          <h1 className="font-bold">Add Player</h1>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            className="border border-black/20 rounded-sm w-full h-12 p-2 text-2xl"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            onKeyDown={addNameKeyboard}
          />
          <button
            className={`bg-green-500 hover:bg-green-400 w-20 rounded-sm text-white cursor-pointer`}
            onClick={addNameClick}
          >
            ADD
          </button>
        </div>
          {isSameName && (
            <p className='text-red-500 text-center pt-2'>SAME NAME!!</p>
          )}
      </div>

      <div className="flex flex-col  gap-2 border border-black/40 rounded-sm p-5 w-90 md:w-120 ">
        {nameList.length > 1 ? (
          <h1 className="font-bold">{nameList.length} Players</h1>
        ) : (
          <h1 className="font-bold">{nameList.length} Player</h1>
        )}
        <ul className="mb-4 flex flex-col gap-2">
          {nameList.map((name, index) => (
            <div key={index} className="flex items-center gap-2">
              <li className={` bg-black/10 rounded-sm p-2 w-full flex items-center justify-center text-xl font-bold`}>
                {isEditing && editNameIndex === index ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEditedWord(index);
                    }}
                    className="border border-black/50 rounded-sm w-full h-full  text-xl p-2"
                  />
                ) : (
                  <p className={`text-xl p-2`}>{name}</p>
                )}
              </li>
              {isEditing && editNameIndex === index ?( 
              <div className="flex gap-2 ">
                <button
                  className="bg-green-500 hover:bg-green-400 w-14 h-14 rounded-[2px] text-white text-xl flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    saveEditedWord(index);
                  }}
                >
                  <FaSave />
                </button>
                <button
                  className="bg-red-400 w-14 h-14 rounded-[2px] text-white text-lg flex items-center justify-center cursor-pointer hover:bg-red-300"
                  onClick={() => {
                    handleCancelClick();
                  }}
                >
                  <MdCancel />
                </button>
              </div>
               ) : (
                <div className="flex gap-2 ">
                <button
                  className="bg-blue-400 w-14 h-14 rounded-[2px] text-white text-xl flex items-center justify-center cursor-pointer hover:bg-blue-300"
                  onClick={() => {
                    handleEditClick(index);
                  }}
                >
                  <MdEdit />
                </button>
                <button
                  className="bg-red-400 w-14 h-14 rounded-[2px] text-white text-lg flex items-center justify-center cursor-pointer hover:bg-red-300"
                  onClick={() => {
                    handleDeleteClick(index);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
               )}
            </div>
          ))}
        </ul>

        <button
          // className="bg-green-500 p-2 text-white font-bold"
          className={`${
            nameList.length >= 3
              ? "bg-green-500  text-white cursor-pointer hover:bg-green-400"
              : "pointer-events-none opacity-50 border border-gray-300"
          } p-2  font-bold`}
          onClick={goToGame}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
