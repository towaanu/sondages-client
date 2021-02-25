import { useQuery } from "urql";
import { Question } from "../questions/types";
import PollResult from "./PollResult";

const QUESTION = `
    query Question($id: ID!) {
      question(id: $id) {
	id
	label
	predefinedAnswers {
	  id
	  label
	  votesCount
	}
      }
    }
`;

interface Props {
  questionId: string;
}

function Poll({ questionId }: Props) {
  const [questionResult] = useQuery<{ question: Question }, { id: string }>({
    query: QUESTION,
    variables: { id: questionId },
  });

  if (questionResult.fetching && !questionResult.data)
    return <div>Loading...</div>;

  if (!questionResult.data && questionResult.error) {
    return <div> Error: Unable to find question </div>;
  }

  if (questionResult.data) {
    const { question } = questionResult.data;
    return (
      <>
        <h1> {question.label} </h1>
        <ul>
          {question.predefinedAnswers.map((answer) => (
            <li key={answer.id}>
              {answer.label} ({answer.votesCount})
            </li>
          ))}
        </ul>
        <h1> Result </h1>
        <PollResult question={question} />
      </>
    );
  }

  return <span> Question not found </span>;
}

export default Poll;
