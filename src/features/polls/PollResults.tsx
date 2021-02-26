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
    <div className="columns is-vcentered">
      <div className="column is-one-third">
        {question.predefinedAnswers.map((answer) => (
          <div className="columns is-mobile" key={answer.id}>
            <div className="column has-text-weight-bold">{answer.label}</div>
            <div className="column is-one-quarter">
              {answersResults[parseInt(answer.id)]}
            </div>
            <div className="column is-one-quarter">
              <span className="tag is-info is-light">
                {percentageForAnswer(parseInt(answer.id)).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="column">
        <PollChart
          answers={question.predefinedAnswers}
          answersResults={answersResults}
        />
      </div>
    </div>
  );
}

export default PollResults;
