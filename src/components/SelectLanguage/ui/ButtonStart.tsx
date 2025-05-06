"use client"
import Link from 'next/link';
import { FaPlay } from "react-icons/fa";
import { useSelectLang } from '../contexts/SelectLanguageContext';
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ButtonStart = () => {
  const { isTH } = useSelectLang();
  
  const router = useRouter();
  const handlePlay = () =>{
    if (isTH){
      router.push("/AddPlayer");
    }
    else{
      toast.error("English not available")
    }
  }

  return (
    <button
      onClick={handlePlay}
      className={` w-full h-10  rounded-sm ${
        !isTH
          ? "opacity-50 border border-gray-300 cursor-not-allowed"
          : "bg-green-500 text-white hover:bg-green-400 cursor-pointer"
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        <FaPlay />
        <p>Play</p>
      </div>
    </button>
  );
}

export default ButtonStart
