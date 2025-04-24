"use client"; 
import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/navigation'
import ButtonCancelTime from "@/components/PlayerPage/ui/ButtonCancelTime";
import ButtonVote from "@/components/PlayerPage/ui/ButtonVote";


type TimerProps = {
  inputMinute: number;
  setInputMinute: React.Dispatch<React.SetStateAction<number>>;
  inputSeconds: number;
  setInputSeconds: React.Dispatch<React.SetStateAction<number>>;
  timeStart: boolean;
  handleCloseTime: () => void;
  nameList: string[];
  setGoStart: (value: boolean) => void;
};
const Timer: React.FC<TimerProps> = ({ inputMinute, setInputMinute, inputSeconds , setInputSeconds, timeStart, handleCloseTime, nameList, setGoStart}) => {
    const [timeUp, setTimeUp] = useState(false);
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
            setTimeUp(true)
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
            setTimeUp(true)
          }
        }, 1000)
        return () => clearInterval(interval)
      }, [target])
      
      
      useEffect(() => {
        if (timeStart){
          const now = new Date()
          const safeMinutes = isNaN(minutes) ? 0 : inputMinute;
          const safeSeconds = isNaN(seconds) ? 0 : inputSeconds+2;
          
          const totalMilliseconds = (safeMinutes * 60 + safeSeconds) * 1000;
          const newTarget = new Date(now.getTime() + totalMilliseconds);
          setTarget(newTarget);
          setShowInputTime(false);
          
        }
      }, [timeStart])
      
    useEffect(() => {
      if (timeStart) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
  
      return () => {
        document.body.style.overflow = "";
      };
    }, [timeStart]);
      
    const goToVote = () => {  
      if (nameList.length > 0) {
        const namesEncoded = encodeURIComponent(JSON.stringify(nameList));
        router.push(`/vote?names=${namesEncoded}`);
      }
    };
    
    useEffect(() => {
      if (timeUp) {
        const audio = new Audio("/alarm1.mp3");
        audio.play();
        audio.onended = () => {
          const namesEncoded = encodeURIComponent(JSON.stringify(nameList));
          router.push(`/vote?names=${namesEncoded}`);
        };
      }
    }, [timeUp]);

      

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
            {[...Array(61)].map((_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>

          <select
            value={inputSeconds === 0 ? inputSeconds : inputSeconds}
            onChange={(e) => {
              setInputSeconds(Number(e.target.value));
            }}
            // className="border p-2 w-15 text-center appearance-none rounded-sm"
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
          {inputMinute}m {inputSeconds}s
        </h2>

        {timeStart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div className="bg-white w-80 md:w-100 h-100 p-6 rounded-md border-2 flex flex-col items-center justify-between gap-3">
              <h1 className="text-2xl font-bold text-center">Time Start</h1>
              <div className="relative w-50 h-50  flex justify-center items-center my-4">
                <div
                  style={{ animation: "spin 1.5s linear infinite" }}
                  className={`absolute w-full h-full rounded-full border-4 ${!timeUp ? "border-blue-500" : "border-red-500"} border-t-transparent animate-spin`}>
                </div>

                {!timeUp ? (
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
                <ButtonCancelTime handleCloseTime={handleCloseTime} timeUp={timeUp} />
                <ButtonVote goToVote={goToVote} timeUp={timeUp}/>
              </div>
            </div>
          </div>
        )}
      </div>
    );

     
}

export default Timer
