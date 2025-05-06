import VoteCard from "./VoteComponent/VoteCard"
import { VoteProvider } from "./contexts/VoteContext"

const VotePage = () => {

  return (
    <VoteProvider>
      <div className="flex flex-col items-center">
        <VoteCard />
      </div>
    </VoteProvider>
  );
}

export default VotePage
