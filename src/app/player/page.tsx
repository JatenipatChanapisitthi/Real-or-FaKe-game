'use client'

import Timer from '@/components/player/Timer'
import CardPlayerWord from '@/components/player/CardPlayerWord'

export default function GamePage() {
    
    return (
      <div className="flex flex-col min-h-screen items-center justify-center p-4 gap-3">
        <Timer />
        <CardPlayerWord />
      </div>
    );
}
