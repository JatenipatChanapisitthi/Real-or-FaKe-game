import { useVote } from '@/components/VotePage/contexts/VoteContext'
import ButtonShowResult from '@/components/VotePage/ui/ButtonShowResult'
import Loading from '@/components/VotePage/VoteComponent/LoadingScreen'
import { useEffect } from 'react'


const ShowResultPopUp = () => {
    const {score, maxName, voteData, vote, nameList, setIsShowResultPopup} = useVote();
    useEffect(() => {
      if (score) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
  
      return () => {
        document.body.style.overflow = "";
      };
    }, [score]);

    if (!voteData) {
      return <Loading /> 
    }
  
  return (
    <div>
      {score && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="bg-white w-80 md:w-100 h-110 p-6 rounded-md border-2 flex flex-col items-center justify-center gap-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">Everyone vote success</h1>
            <div className="w-full flex justify-center mt-4">
              <ButtonShowResult />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowResultPopUp