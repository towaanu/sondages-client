import { useParams } from "react-router-dom";
import Poll from "../features/polls/Poll";

function PollPage() {
  const { id } = useParams<{ id: string }>();
  return <Poll questionId={id} />;
}

export default PollPage;
