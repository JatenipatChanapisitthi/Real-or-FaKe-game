"use client"
import { useAddPlayer } from "@/components/AddPlayerPage/contexts/AddPlayerContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const StartButton = () => {
  const {
    nameList,
    isEditing,
  } = useAddPlayer();

  const router = useRouter();

  const handleStartGame = () => {
    if (isEditing) {
      toast.error("Finish editing names first.");
      return;
    }

    if (nameList.length < 3) {
      toast.error("At least 3 players required to start the game.");
      return;
    }

    const namesEncoded = encodeURIComponent(JSON.stringify(nameList));
    router.push(`/player?names=${namesEncoded}`);
  };

  const isDisabled = nameList.length < 3 || isEditing;

  return (
    <button
      className={`p-2 font-bold rounded transition-all duration-200
        ${isDisabled
          ? "opacity-50 border border-gray-300 cursor-not-allowed"
          : "bg-green-500 text-white hover:bg-green-400 cursor-pointer"
        }`}
      onClick={handleStartGame}
    >
      Start Game
    </button>
  );
};

export default StartButton;
