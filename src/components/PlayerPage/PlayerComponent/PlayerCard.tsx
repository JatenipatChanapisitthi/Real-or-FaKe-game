import React from 'react'
type PlayerCardProps = {
    nameList: string[];
    viewedWord: string[];
    handleViewWordClick: (name: string) => void;
    countToStart: number;
    setGoStart: (value: boolean) => void;
    inputMinute: number;
    inputSeconds: number;



}

const PlayerCard: React.FC<PlayerCardProps> = ({nameList, viewedWord, handleViewWordClick, countToStart, setGoStart, inputMinute, inputSeconds}) =>{
  return (
    <div className='flex flex-col items-center justify-center'>
      <a href="/" className="absolute bottom-2 text-sm text-black/80">
        Back To Home
      </a>
      <h1 className="text-2xl font-bold">Players Words:</h1>
      <h2>{nameList.length} Players</h2>
      <ul className="m-4 flex flex-col gap-2 ">
        {nameList.map((name: string, idx: number) => (
          <li
            onClick={() => {
              if (!viewedWord.includes(name)) {
                handleViewWordClick(name);
              }
              if (countToStart === nameList.length ) {
                setGoStart(true)
              }
            }}
            key={idx}
            className={`bg-[#F9FAFB] p-4 border border-black/10 rounded-sm w-80 md:w-90 cursor-pointer${
              viewedWord.includes(name)
                ? "pointer-events-none opacity-50 border-0"
                : ""
            }`}
          >
            <div className="flex justify-center">{name.toLowerCase()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerCard
