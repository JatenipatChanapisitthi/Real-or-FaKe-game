"use client"; 
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

export default function Countdown() {
    const [timeUp, setTimeUp] = useState(false);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [inputMinute, setInputMinute] = useState(0);
    const [inputSeconds, setInputSeconds] = useState(0);
    const [target, setTarget] = useState<Date | null>(null);
    const [showInputTime,setShowInputTIme] = useState(true);
    
    const router = useRouter();

    useEffect(() => {

        const interval = setInterval(() =>{
        if (!target) return;
        const now = new Date()
        const difference = target.getTime() - now.getTime()
        if (difference <= 0) {
            clearInterval(interval);
            setTimeUp(true);
            router.push('/game'); 
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {   
    e.preventDefault();

    setShowInputTIme(false);
    const now = new Date()
    const safeMinutes = isNaN(minutes) ? 0 : inputMinute;
    const safeSeconds = isNaN(seconds) ? 0 : inputSeconds+2;

    const totalMilliseconds = (safeMinutes * 60 + safeSeconds) * 1000;
    const newTarget = new Date(now.getTime() + totalMilliseconds);
    setTarget(newTarget);
  };

    return (
      <div className="bg-white  border border-gray-200 gap-2 flex flex-col w-90 md:w-120 items-center justify-center p-20 rounded-sm">

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="number"
            min="0"
            value={inputMinute}
            onChange={(e) => setInputMinute(parseInt(e.target.value, 10))}
            className="border p-2  w-15"
            placeholder="M"
          />
          <input
            type="number"
            min="0"
            value={inputSeconds}
            onChange={(e) => setInputSeconds(parseInt(e.target.value, 10))}
            className="border p-2 w-15  text-center  appearance-none"
            placeholder="S"
          />
        </form>

        {showInputTime ? (
          <h2 className="text-2xl font-bold text-center">
            {inputMinute}m {inputSeconds}s
          </h2>
        ) : !timeUp ? (
          <h2 className="text-2xl font-bold text-center">
            {minutes}m {seconds}s
          </h2>
        ) : (
          <h2 className="text-2xl font-bold text-center text-red-500">
            Time's up!
          </h2>
        )}
      </div>
    );

     
}
