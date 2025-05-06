'use client'
import PlayerInput from "@/components/AddPlayerPage/AddPlayerPageComponents/PlayerInput";
import PlayerList from '@/components/AddPlayerPage/AddPlayerPageComponents/PlayerList';
import { AddPlayerProvider } from './contexts/AddPlayerContext';

export default function AddPlayerPage() {


  return (
    <AddPlayerProvider>
      <div className="flex flex-col items-center gap-4">
        <PlayerInput />
        <PlayerList />
      </div>
    </AddPlayerProvider>
  );
}
