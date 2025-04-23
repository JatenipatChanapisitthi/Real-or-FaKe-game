"use client"; 
import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/navigation'
import ButtonCancelTime from "./ui/ButtonCancelTime";
import ButtonVote from "./ui/ButtonVote";
type TimerProps = {
  inputMinute: number;
  setInputMinute: React.Dispatch<React.SetStateAction<number>>;
  inputSeconds: number;
  setInputSeconds: React.Dispatch<React.SetStateAction<number>>;
  timeStart: boolean;
  handleCloseTime: () => void;
  nameList: string[];
};
const Timer: React.FC<TimerProps> = ({ inputMinute, setInputMinute, inputSeconds , setInputSeconds, timeStart, handleCloseTime, nameList }) => {
    const [timeUp, setTimeUp] = useState(false);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [target, setTarget] = useState<Date | null>(null);
    const [showInputTime,setShowInputTime] = useState(true);
    
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const prevValueRefMin = useRef<number | string>(inputMinute);
    const prevValueRefSec = useRef<number | string>(inputSeconds);

    useEffect(() => {

        const interval = setInterval(() =>{
        if (!target) return;
        const now = new Date()
        const difference = target.getTime() - now.getTime()
        if (difference <= 0) {
            clearInterval(interval);
            goToVote();
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
      
      const goToVote = () =>{
        
        if (nameList.length>0){
          setTimeUp(true);
          const namesEncoded = encodeURIComponent(JSON.stringify(nameList))
          router.push(`/vote?names=${namesEncoded}`)
        }
      }
      
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


 

    return (
      <div className="bg-white  border border-gray-200 gap-2 p-6 flex flex-col w-90 md:w-120 items-center justify-center rounded-sm">
        <h1 className="text-2xl font-bold">Time Setup</h1>
        <form className="flex gap-2 mb-4">
          <input
            ref={inputRef}
            type="number"
            min="0"
            value={isNaN(inputMinute) || inputMinute === 0 ? "" : inputMinute}
            onChange={(e) => setInputMinute(parseInt(e.target.value, 10))}
            className="border p-2 w-15 text-center appearance-none rounded-sm"
            onFocus={(e) => {
              e.target.value = "";
              // setInputMinute("");
            }}
            // onBlur={() => {
            //   if (inputMinute === "") {
            //     setInputMinute(prevValueRefMin.current);
            //   }
            // }}
            placeholder="M"
          />

          <input
            type="number"
            min="0"
            value={isNaN(inputSeconds) ? "" : inputSeconds}
            onChange={(e) => setInputSeconds(parseInt(e.target.value, 10))}
            className="border p-2 w-15  text-center  appearance-none rounded-sm"
            onFocus={(e) => {
              e.target.value = "";
              // setInputSeconds("");
            }}
            // onBlur={() => {
            //   if (inputSeconds === "") {
            //     setInputSeconds(prevValueRefSec.current);
            //   }
            // }}
            placeholder="S"
          />
        </form>

        <h2 className="text-2xl font-bold text-center">
          {inputMinute}m {inputSeconds}s
        </h2>

        {timeStart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div className="bg-white w-80 md:w-100 h-100 p-6 rounded-md border-2 flex flex-col items-center justify-between gap-3">
              <h1>Time Start</h1>
              {!timeUp && (
                <h2 className="text-2xl font-bold text-center">
                  {minutes}m {seconds}s
                </h2>
              )}

              <div className="flex gap-4">
                <ButtonCancelTime handleCloseTime={handleCloseTime} />
                <ButtonVote goToVote={goToVote} />
              </div>
            </div>
          </div>
        )}
      </div>
    );

     
}

export default Timer
