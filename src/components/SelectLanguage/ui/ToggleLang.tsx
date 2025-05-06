"use client"
import { useSelectLang } from "../contexts/SelectLanguageContext";
import { toast } from "sonner";
const ToggleLang = () => {
    const { isTH, setIsTH } = useSelectLang();
    

    const handelChangeLanguage = (e: any) =>{
        e.target.checked !== true ? setIsTH(true): setIsTH(false);
        localStorage.setItem("languageDataIsThai", JSON.stringify(!isTH))
    }

    const handelShowChangeLanguage = () =>{
      if (isTH){
        toast.success("success to change to english")
      }
      else{
        toast.success("success to change to Thai")
      }
    }

  return (
    <label
      htmlFor="lang-toggle"
      className="relative inline-flex items-center cursor-pointer"
    >
      <input
        onChange={handelChangeLanguage}
        onClick={handelShowChangeLanguage}
        type="checkbox"
        id="lang-toggle"
        className="sr-only peer"
      />

      <div className="w-32 h-12 bg-blue-500 border border-gray-300  rounded-full peer-checked:bg-gray-300 transition-colors duration-500 shadow-inner"></div>

      <span className="absolute left-3 text-white peer-checked:text-white text-sm font-semibold transition-colors duration-300">
        EN
      </span>
      <span className="absolute right-3 text-white peer-checked:text-white text-sm font-semibold transition-colors duration-300">
        TH
      </span>

      <div className="absolute left-1 top-1 w-10 h-10 bg-white rounded-full shadow-md transform peer-checked:translate-x-20 transition-transform duration-500" />
    </label>
  );
}

export default ToggleLang
