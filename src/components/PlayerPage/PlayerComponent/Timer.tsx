"use client"; 
import { useEffect, useState} from "react";
import { useRouter } from 'next/navigation'
import { usePlayer } from "@/components/PlayerPage/contexts/PlayerContext";
import ButtonVote from "@/components/PlayerPage/ui/ButtonVote";
import ButtonCancelTime from "@/components/PlayerPage/ui/ButtonCancelTime";

const Timer = () => { 
    const { isTimeUp, nameList, isShowWord, selectedName, viewedWord, whoDiff, wordDiff, wordNormal, wordMap, isConfirmReset, countToStart, isGoToStart, inputMinute, inputSecond, isTimeStart ,setInputMinute, setInputSecond, setIsTimeUp } = usePlayer();
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [target, setTarget] = useState<Date | null>(null);
    const [showInputTime,setShowInputTime] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() =>{
        if (!target) return;
        const now = new Date()
        const difference = target.getTime() - now.getTime()
        if (difference <= 0) {
            clearInterval(interval);
            setIsTimeUp(true)
            return;
          }
          const d = Math.floor(difference / (1000*60*60*24))
          setDays(d)
          
          
          const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) 
          setHours(h)
          
          const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
          setMinutes(m)
          
          const s = Math.floor((difference % (1000 * 60)) / (1000))
          setSeconds(s)
          
          if(d<=0 && h<=0 && m<=0 && s<=0){
            setIsTimeUp(true)
          }
        }, 1000)
        return () => clearInterval(interval)
      }, [target])
      
      
      useEffect(() => {
        if (isTimeStart){
          const now = new Date()
          const safeMinutes = isNaN(minutes) ? 0 : inputMinute;
          const safeSeconds = isNaN(seconds) ? 0 : inputSecond+2;
          
          const totalMilliseconds = (safeMinutes * 60 + safeSeconds) * 1000;
          const newTarget = new Date(now.getTime() + totalMilliseconds);
          setTarget(newTarget);
          setShowInputTime(false);
          
        }
      }, [isTimeStart])
      
    useEffect(() => {
      if (isTimeStart) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
  
      return () => {
        document.body.style.overflow = "";
      };
    }, [isTimeStart]);
      
     const alarm = new Audio("/alarm1.mp3");

    
    useEffect(() => {
      if (isTimeUp) {
        const voteData = {
          nameList,
          whoDiff,
          wordDiff,
          wordNormal,
          inputMinute,
          inputSecond,
        };

        // ลองเล่นเสียง ถ้าเล่นไม่ได้ก็ไปหน้า vote ทันที
        alarm
          .play()
          .then(() => {
            // ไปหน้าถัดไปหลังเสียงจบ
            alarm.onended = () => {
              localStorage.setItem("voteData", JSON.stringify(voteData));
              router.push("/vote");
            };
          })
          .catch(() => {
            // ถ้าเสียงไม่เล่น (เช่นบนมือถือ) ไปหน้า vote ทันที
            localStorage.setItem("voteData", JSON.stringify(voteData));
            router.push("/vote");
          });
      }
    }, [isTimeUp]);
      
  return (
      <div className="bg-white  border border-gray-200 gap-2 p-6 flex flex-col w-90 md:w-120 items-center justify-center rounded-sm">
        <h1 className="text-2xl font-bold">Time Setup</h1>
        <form className="flex gap-2 mb-4">
          <select
            value={inputMinute === 0 || isNaN(inputMinute) ? "" : inputMinute}
            onChange={(e) => {
              setInputMinute(Number(e.target.value));
            }}
            className="border border-gray-300 rounded-sm px-4 py-2 text-center text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none relative"
          >
            <option value="" disabled>
              Minute
            </option>
            {[...Array(60)].map((_, i) => (
              <option key={i+1} value={i+1}>
                {i+1}
              </option>
            ))}
          </select>

          <select
            value={inputSecond === 0 ? inputSecond : inputSecond}
            onChange={(e) => {
              setInputSecond(Number(e.target.value));
            }}
            className="border border-gray-300 rounded-sm px-4 py-2 text-center text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none relative"
          >
            <option value="" disabled>
              Second
            </option>
            {[...Array(61)].map((_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </form>

        <h2 className="text-2xl font-bold text-center">
          {inputMinute}m {inputSecond}s
        </h2>

        {isTimeStart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div className="bg-white w-80 md:w-100 h-100 p-6 rounded-md border-2 flex flex-col items-center justify-between gap-3">
              <h1 className="text-2xl font-bold text-center">Time Start</h1>
              <div className="relative w-50 h-50  flex justify-center items-center my-4">
                <div
                  style={{ animation: "spin 1.5s linear infinite" }}
                  className={`absolute w-full h-full rounded-full border-4 ${!isTimeUp ? "border-blue-500" : "border-red-500"} border-t-transparent animate-spin`}>
                </div>

                {!isTimeUp ? (
                  inputMinute != 60 ? (
                    <h2 className="text-2xl font-bold text-center z-10 animate-pulse">
                      {minutes}m {seconds}s
                    </h2>
                  ) : (
                    <h2 className="text-2xl font-bold text-center z-10 animate-pulse">
                      {hours}h {minutes}m {seconds}s
                    </h2>
                  )
                ) : (
                  <h2 className="text-2xl font-bold text-center z-10 text-red-500">
                    Time Up!
                  </h2>
                )}
              </div>

              <div className="flex gap-4">
                <ButtonCancelTime />
                <ButtonVote />
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default Timer
