"use client"
import { useHome } from "@/components/HomePage/contexts/HomeContext";
import { IoPersonAdd } from "react-icons/io5";
const PlayerInput = () => {
    const { inputName, setInputName, nameList, setNameList, setIsSameName, isSameName } = useHome();
    

    const handleAddNameWithKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (inputName.trim() !== '' && !nameList.includes(inputName)) {
                setNameList([...nameList, inputName.trim()])
                setInputName('')
                setIsSameName(false)
            }
            else{
                setIsSameName(true)
            }
        }
    }
    const handleAddNameClick = () => {
        if (inputName.trim() !== '' && !nameList.includes(inputName)) {
            setNameList([...nameList, inputName.trim()])
            setInputName('')
            setIsSameName(false)
        }
        else{
            setIsSameName(true)
        }
    }

    return (
      <div className="flex flex-col bg-white gap-2 border border-gray-200 rounded-sm p-5 w-90 md:w-120">
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
            onKeyDown={handleAddNameWithKeyboard}
          />
          <button
            className={`bg-green-500 hover:bg-green-400 w-20 rounded-sm text-white cursor-pointer`}
            onClick={handleAddNameClick}
          >
            ADD
          </button>
        </div>
          {isSameName && (
            <p className='text-red-500 text-center pt-2'>SAME NAME!!</p>
          )}
      </div>
)}

export default PlayerInput
