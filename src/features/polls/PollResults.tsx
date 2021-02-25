import { Question } from "../questions/types";
import useRealTimeAnswers from "./useRealTimeAnswers";

interface Props {
  question: Question;
}

function PollResults({ question }: Props) {
  const answersResults = useRealTimeAnswers(question);

  return (
    <ul>
      {question.predefinedAnswers.map((answer) => (
        <li key={answer.id}>
          {answer.label} ({answersResults[parseInt(answer.id)]})
        </li>
      ))}
    </ul>
  );
}

export default PollResults;
