'use client'
import { Suspense } from 'react';

import PlayerPage from '@/components/PlayerPage/PlayerPage'
export default function GamePage() {
    
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <PlayerPage />
      </Suspense>
    );
}
