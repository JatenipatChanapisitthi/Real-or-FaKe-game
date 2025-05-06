'use client'
import { IoNewspaper } from "react-icons/io5";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'

const ButtonRule = () => {
  const router = useRouter();
  const handleRule = async () => {
    const myUrl = `${window.location.origin}/rule`;

    try {
      const res = await fetch(myUrl);
      if (res.ok) {
        router.push("/rule");
      } else {
        throw new Error("Rule page is not available");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to navigate to rule page");
    }
  };

  return (
    <button onClick={handleRule} className="cursor-pointer w-full h-10  rounded-sm text-white bg-blue-400 hover:bg-blue-500">
      <div className="flex items-center justify-center gap-2">
      <IoNewspaper />
        <p>Rule</p>
      </div>
    </button>
  );
}

export default ButtonRule
