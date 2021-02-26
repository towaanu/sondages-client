import { useParams } from "react-router-dom";
import QuestionRecap from "../features/questions/QuestionRecap";

function QuestionRecapPage() {
  const { id } = useParams<{ id: string }>();
  return <QuestionRecap questionId={id} />;
}

export default QuestionRecapPage;
