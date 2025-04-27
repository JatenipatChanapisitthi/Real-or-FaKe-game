'use client'
import { PlayerProvider } from './contexts/PlayerContext'
import  Timer   from '@/components/PlayerPage/PlayerComponent/Timer'
import PlayerCard from '@/components/PlayerPage/PlayerComponent/PlayerCard'

const PlayerPage = () => {
  return (
    <PlayerProvider>
      <div className="flex flex-col items-center justify-center p-4 gap-3">
        <Timer />
        <PlayerCard />
      </div>
    </PlayerProvider>
  );
}

export default PlayerPage