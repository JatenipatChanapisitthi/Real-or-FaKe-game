import { useVote } from '@/components/VotePage/contexts/VoteContext';

const ButtonShowResult = () => { 
  const {
    setIsShowResultPopup
  } = useVote();
  
  return (
      <button
        onClick={() => setIsShowResultPopup(true)}
        className="cursor-pointer w-30 h-10  rounded-sm text-white bg-green-500 hover:bg-green-600"
      >
        <div className="flex items-center justify-center gap-1">
          <p>Show Result</p>
        </div>
      </button>
  );
}

export default ButtonShowResult       