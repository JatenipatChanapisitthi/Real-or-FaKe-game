// src/app/vote/page.tsx
import { Suspense } from 'react';
import VotePage from '@/components/VotePage/VotePage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VotePage />
    </Suspense>
  );
}
