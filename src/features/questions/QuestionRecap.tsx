import { Question } from "./types";
import { useQuery } from "urql";
import QuestionRecapItem from "./QuestionRecapItem";

const QUESTION = `
    query Question($id: ID!) {
      question(id: $id) {
	id
	label
      }
    }
`;

type QuestionQueryResult = Pick<Question, "id" | "label">;

interface Props {
  questionId: string;
}

function QuestionRecap({ questionId }: Props) {
  const [questionResult] = useQuery<
    { question: QuestionQueryResult },
    { id: string }
  >({
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
        <h1 className="title is-1">{question.label}</h1>
        <div className="columns is-centered">
          <div className="column is-half">
            <QuestionRecapItem
              linkButtonText={"copy question link"}
              description={"See question"}
              linkToShare={`/ask/${questionId}`}
            />
          </div>
        </div>
        <div className="columns is-centered">
          <div className="column is-half">
            <QuestionRecapItem
              linkButtonText={"copy result link"}
              description={"See resut"}
              linkToShare={`/poll/${questionId}`}
            />
          </div>
        </div>
        <div className="columns is-centered">
          <div className="column is-half content">
            <p>You can copy and share question using the copy link buttons</p>
          </div>
        </div>
      </>
    );
  }

  return <span> Question not found </span>;
}

export default QuestionRecap;
