import PollChart from "./PollChart";
import useRealTimeAnswers from "./useRealTimeAnswers";
import { Question } from "../questions/types";

interface Props {
  question: Question;
}

function PollResults({ question }: Props) {
  const answersResults = useRealTimeAnswers(question);
  const totalVotes = Object.values(answersResults).reduce((a, b) => a + b);

  function percentageForAnswer(answerId: number): number {
    return (answersResults[answerId] / totalVotes) * 100;
  }

  return (
    <>
      <ul>
        {question.predefinedAnswers.map((answer) => (
          <li>
            {answer.label}:{answersResults[parseInt(answer.id)]} (
            {percentageForAnswer(parseInt(answer.id)).toFixed(0)}%)
          </li>
        ))}
      </ul>
      <PollChart
        answers={question.predefinedAnswers}
        answersResults={answersResults}
      />
    </>
  );
}

export default PollResults;
