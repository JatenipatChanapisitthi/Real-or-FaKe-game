'use client'
import { Suspense } from 'react';

import PlayerPage from '@/components/PlayerPage/PlayerPage'
export default function GamePage() {
    
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className='min-h-screen'>
          <PlayerPage />
        </div>
      </Suspense>
    );
}
