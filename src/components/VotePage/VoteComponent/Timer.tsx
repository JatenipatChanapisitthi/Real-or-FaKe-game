"use client"; 
import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/navigation'
import ButtonCancelTime from "@/components/PlayerPage/ui/ButtonCancelTime";
import ButtonVote from "@/components/PlayerPage/ui/ButtonVote";


type TimerProps = {
  inputMinute: number;
  inputSeconds: number;
  onTimeUp: () => void; // <<< เพิ่มตรงนี้
};

const Timer: React.FC<TimerProps> = ({ inputMinute, inputSeconds, onTimeUp }) => {
    const [timeUp, setTimeUp] = useState(false);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [target, setTarget] = useState<Date | null>(null);
    const [showInputTime,setShowInputTime] = useState(true);
    const router = useRouter();
    const [timeStart, setTimeStart] = useState(true);

    useEffect(() => {
        const interval = setInterval(() =>{
        const audio = new Audio("/alarm1.mp3");
        if (!target) return;

        const now = new Date()
        const difference = target.getTime() - now.getTime()
        if (difference <= 0) {
            clearInterval(interval);
            setTimeUp(true)
            audio.play();
            audio.onended = () => {
              onTimeUp(); // เรียกปิด popup หลังเสียงจบ
            };
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
      }, [target, onTimeUp])
      
      
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
    

    return (
        <div className="relative w-50 h-50  flex justify-center items-center my-4">
          <div
            style={{ animation: "spin 1.5s linear infinite" }}
            className={`absolute w-full h-full rounded-full border-4 ${
              !timeUp ? "border-blue-500" : "border-red-500"
            } border-t-transparent animate-spin`}
          ></div>

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
    );

     
}

export default Timer
