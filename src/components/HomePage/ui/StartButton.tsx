"use client"
import { useHome } from "@/components/HomePage/contexts/HomeContext";
import { useRouter } from "next/navigation";

const StartButton = () => {
    const { nameList, isEditing, editName, editNameIndex, setNameList, setIsEditing, setEditName, setEditNameIndex, setIsSameName} = useHome();
    const router = useRouter();


    const handleStartGame = () => {
        if (nameList.length > 0) {
        const namesEncoded = encodeURIComponent(JSON.stringify(nameList))
        router.push(`/player?names=${namesEncoded}`)
        }
      }
    return (
        <button
          className={`${
            nameList.length >= 3 && !isEditing
              ? "bg-green-500  text-white cursor-pointer hover:bg-green-400"
              : "pointer-events-none opacity-50 border border-gray-300"
          } p-2  font-bold`}
          onClick={handleStartGame}
        >
          Start Game
        </button>
    )
}

export default StartButton
