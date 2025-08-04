import React from 'react'
import { useVote } from '@/components/VotePage/contexts/VoteContext'
import ButtonVote from '@/components/VotePage/ui/ButtonVote'
import ShowScorePopUp from './PopUp/ShowScorePopUp'
import ShowEqualPopup from './PopUp/ShowEqualPopup'
import ShowNextPlayerPopUp from './PopUp/ShowNextPlayerPopUp'
import ShowResultPopUp from './PopUp/ShowResultPopUp'

const VoteCard = () => {
  const {
    nameList,
    currentIndex,
    textColor,
    isShowResultPopup
  } = useVote()

  return (
    <div className="flex flex-col bg-white gap-6 border border-gray-200 rounded-sm shadow-md  p-6 md:p-10 justify-center items-center w-[95%] max-w-xl mx-20">
      <h1 className="text-3xl font-bold text-gray-800">Vote Page</h1>
      <h2 className="text-gray-500">{nameList.length} Players</h2>
      <h1 className="text-xl md:text-2xl text-gray-700">
        Turn{" "}
        <strong style={{ color: textColor }}>{nameList[currentIndex]}</strong>{" "}
        to vote
      </h1>

      <ul className="w-full flex flex-col gap-3">
        {nameList.map(
          (name: string, idx: number) =>
            name !== nameList[currentIndex] && (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-50 p-4 border border-gray-200 rounded-sm hover:shadow-sm transition-shadow"
              >
                <div className="text-gray-700 capitalize">{name}</div>
                <ButtonVote name={name} />
              </li>
            )
        )}
      </ul>

      <div className="w-full flex flex-col items-center gap-2">
        <ShowResultPopUp /> 
        <ShowScorePopUp />
        <ShowEqualPopup />
        <ShowNextPlayerPopUp />
      </div>
    </div>
  )
}

export default VoteCard

