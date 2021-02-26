import { useParams } from "react-router-dom";
import AskPoll from "../features/polls/AskPoll";

function AskPage() {
  const { id } = useParams<{ id: string }>();
  return <AskPoll questionId={id} />;
}

export default AskPage;
