import { useQuery, useMutation } from "urql";
import { Question } from "../questions/types";
import { Redirect } from "react-router-dom";

interface Props {
  questionId: string;
}

const QUESTION = `
    query Question($id: ID!) {
      question(id: $id) {
	id
	label
	predefinedAnswers {
	  id
	  label
	}
      }
    }
`;

const VOTE_FOR_ANSWER = `
mutation VoteForAnswer($id: ID!) {
  voteForAnswer(predefinedAnswerId: $id) {
    id
  }
}
`;

interface VoteForAnswerResult {
  id: number;
}

function AskPoll({ questionId }: Props) {
  const [questionResult] = useQuery<{ question: Question }, { id: string }>({
    query: QUESTION,
    variables: { id: questionId },
  });

  const [voteForAnswerResult, voteForAnswer] = useMutation<VoteForAnswerResult>(
    VOTE_FOR_ANSWER
  );

  function handleVote(id: string) {
    voteForAnswer({ id });
  }

  if (questionResult.fetching && !questionResult.data)
    return <div>Loading...</div>;

  if (!questionResult.data && questionResult.error) {
    return <div> Error: Unable to find question </div>;
  }

  if (voteForAnswerResult.fetching) {
    return <div>Loading...</div>;
  }

  if (questionResult.data && questionResult.data.question) {
    const { question } = questionResult.data;
    if (voteForAnswerResult.data) {
      return <Redirect to={`/poll/${question.id}`} />;
    }
    return (
      <>
        <h1 className="title is-1"> {question.label} </h1>
        <div className="columns is-centered">
          {question.predefinedAnswers.map((answer) => (
            <div key={answer.id} className="column">
              <div className="has-text-centered">
                <button
                  className="button is-link is-fullwidth"
                  onClick={(_e) => handleVote(answer.id)}
                >
                  {answer.label}
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
  return <span> Question not found </span>;
}

export default AskPoll;
