"use client"
import { useHome } from "@/components/HomePage/contexts/HomeContext";
import { MdEdit, MdCancel } from "react-icons/md";
import { FaTrash, FaSave } from "react-icons/fa";
import StartButton from "../ui/StartButton";

const PlayerList = () => {
    const { nameList, isEditing, editName, editNameIndex, setNameList, setIsEditing, setEditName, setEditNameIndex, setIsSameName} = useHome();

    const saveEdited = (index: number) =>{
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
        setIsEditing(false);
        setEditName("");
        setEditNameIndex(null);
    }
    const handleDeleteClick = (index: number) =>{
        const updateName = nameList.filter((_, i) => i !== index);
        setNameList(updateName);
    }
    const handleEditClick = (index: number) =>{
        setIsEditing(true);
        setEditName(nameList[index]); 
        setEditNameIndex(index); 
    }

  return (
    <div className="flex flex-col bg-white gap-2 border border-gray-200 rounded-sm p-5 w-90 md:w-120 ">
      {nameList.length > 1 ? (
        <h1 className="font-bold">{nameList.length} Players</h1>
      ) : (
        <h1 className="font-bold">{nameList.length} Player</h1>
      )}

      <ul className="mb-4 flex flex-col gap-2">
        {nameList.map((name, index) => (
          <div key={index} className="flex items-center gap-2">
            <li
              className={`bg-[#F9FAFB] border border-black/10 rounded-sm p-2 w-full flex items-center justify-center`}
            >
              {isEditing && editNameIndex === index ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdited(index);
                  }}
                  className="bg- border border-black/10 rounded-sm w-full h-full  p-2"
                />
              ) : (
                <p className={`p-2`}>{name}</p>
              )}
            </li>
            {isEditing && editNameIndex === index ? (
              <div className="flex gap-2 ">
                <button
                  className="bg-green-500 hover:bg-green-400 w-14 h-14 rounded-[2px] text-white text-xl flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    saveEdited(index);
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
      <StartButton />
    </div>
  );
}

export default PlayerList
