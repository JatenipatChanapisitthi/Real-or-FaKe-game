'use client'
import PlayerInput from "@/components/HomePage/HomePageComponents/PlayerInput";
import PlayerList from '@/components/HomePage/HomePageComponents/PlayerList';
import { HomeProvider } from './contexts/HomeContext';

export default function HomePage() {


  return (
    <HomeProvider>
      <div className="flex flex-col items-center gap-4">
        <PlayerInput />
        <PlayerList />
      </div>
    </HomeProvider>
  );
}
