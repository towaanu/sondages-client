import { useMutation } from "urql";
import NewQuestionForm, { NewQuestion } from "./NewQuestionForm";
import { Question } from "./types";
import { Redirect } from "react-router-dom";

interface CreateQuestionResult {
  createQuestion: Question;
}

const CREATE_QUESTION = `
    mutation CreateQuestion($label: String!, $predefinedAnswers: [String]) {
	createQuestion(label: $label, predefinedAnswers: $predefinedAnswers) {
	    id
	    label
	    createdAt
	}
    }
`;

function CreateQuestion() {
  const [
    createQuestionResult,
    createQuestion,
  ] = useMutation<CreateQuestionResult>(CREATE_QUESTION);

  function handleOnSubmit(newQuestion: NewQuestion) {
    createQuestion({
      label: newQuestion.label,
      predefinedAnswers: newQuestion.predefinedAnswers
        .map((pa) => pa.label)
        .filter((pa) => !!pa),
    });
  }

  if (!createQuestionResult.data && createQuestionResult.fetching) {
    return <div> Loading...</div>;
  }

  if (!createQuestionResult.data && createQuestionResult.error) {
    return <div> Error: Unable to create new question </div>;
  }

  if (createQuestionResult.data) {
    const { createQuestion: newQuestion } = createQuestionResult.data;
    return <Redirect to={`/question/${newQuestion.id}`} />;
  }

  return (
    <>
      <h1 className="title"> Create a new question !</h1>
      <div className="columns is-centered">
        <div className="column is-half">
          <NewQuestionForm onSubmit={handleOnSubmit} />
        </div>
      </div>
    </>
  );
}

export default CreateQuestion;
