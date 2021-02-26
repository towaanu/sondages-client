import { useQuery } from "urql";
import { Question } from "../questions/types";
import PollResults from "./PollResults";

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

  if (questionResult.data && questionResult.data.question) {
    const { question } = questionResult.data;
    return (
      <>
        <h1 className="title is-1"> {question.label} </h1>
        <h4 className="title is-4"> Results </h4>
        <PollResults question={question} />
      </>
    );
  }

  return <span> Question not found </span>;
}

export default Poll;
