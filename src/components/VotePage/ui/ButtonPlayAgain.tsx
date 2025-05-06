import Link from 'next/link'
import { useVote } from '@/components/VotePage/contexts/VoteContext'
import { MdRestartAlt } from 'react-icons/md'

const ButtonPlay = () => {

  const { nameList, voteData } = useVote();
  return (
    <button
    className="cursor-pointer w-30 h-10 rounded-sm text-white bg-green-500 hover:bg-green-600"
    >
      <Link href={{
        pathname: "/player",
        query: { names: JSON.stringify(nameList), inputMinute: JSON.stringify(voteData?.inputMinute), inputSecond: JSON.stringify(voteData?.inputSecond)},
      }}
      passHref
      >
      <div className="flex items-center justify-center gap-1">
        <MdRestartAlt className="text-xl" />
        <p>play again</p>
      </div>
      </Link>
    </button>
  )
}

export default ButtonPlay

