import { Question } from "../questions/types";

interface Props {
  question: Question;
}

function PollResult({ question }: Props) {
  return <h1>{question.id}</h1>;
}

export default PollResult;
