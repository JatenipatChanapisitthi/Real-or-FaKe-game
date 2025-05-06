import { useVote } from '@/components/VotePage/contexts/VoteContext';

const ButtonVote = ({ name }: {name: string}) => { 
  const {
    handlePlayerClick,
  } = useVote();
  
  return (
      <button
        onClick={() => handlePlayerClick(name)}
        className="cursor-pointer w-30 h-10  rounded-sm text-white bg-green-500 hover:bg-green-600"
      >
        <div className="flex items-center justify-center gap-1">
          <p>Vote</p>
        </div>
      </button>
  );
}

export default ButtonVote       