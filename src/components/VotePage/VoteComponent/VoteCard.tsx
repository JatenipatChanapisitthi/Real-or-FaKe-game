import React from 'react'
import { useVote } from '@/components/VotePage/contexts/VoteContext'
import ButtonVote from '@/components/VotePage/ui/ButtonVote'
import ShowScorePopUp from './PopUp/ShowScorePopUp'
import ShowEqualPopup from './PopUp/ShowEqualPopup'
import ShowNextPlayerPopUp from './PopUp/ShowNextPlayerPopUp'

const VoteCard = () => {
  const {
    nameList,
    currentIndex,
    textColor,
  } = useVote()



  return (
    <div className="flex flex-col bg-white gap-2 border border-gray-200 rounded-sm p-5 justify-center items-center w-90 md:w-120">
      <h1 className="text-2xl font-bold">Vote Page</h1>
      <h2>{nameList.length} Players</h2>
      <h1 className="text-xl">
        Turn{" "}
        <strong style={{ color: textColor }}>"{nameList[currentIndex]}"</strong>{" "}
        vote
      </h1>

      <ul className="m-4 flex flex-col gap-2">
        {nameList.map(
          (name: string, idx: number) =>
            name !== nameList[currentIndex] && (
              <li
                key={idx}
                className="flex justify-between items-center bg-[#F9FAFB] p-4 border border-black/10 rounded-sm w-80 md:w-90 cursor-pointer"
              >
                <div className="flex justify-center">{name.toLowerCase()}</div>
                <ButtonVote name={name} />
              </li>
            )
        )}
      </ul>

      <ShowScorePopUp />
      <ShowEqualPopup />
      <ShowNextPlayerPopUp />
    </div>
  );
}

export default VoteCard
