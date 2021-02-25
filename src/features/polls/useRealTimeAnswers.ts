import { useSubscription } from "urql";
import { Question } from "../questions/types";

const NEW_VOTE_SUBSCRIPTION = `
    subscription NewVote($questionId: ID!) {
      newVote(questionId: $questionId)
    }
`;

export type AnswersResults = { [id: number]: number };
export type NewVoteSubscriptionResult = { newVote: number };

function useRealTimeAnswers(question: Question): AnswersResults {
  const initialState = question.predefinedAnswers.reduce(
    (res, a) => ({
      ...res,
      [a.id.toString()]: a.votesCount,
    }),
    {}
  );

  function handleNewVote(
    answers: AnswersResults = initialState,
    { newVote: answerId }: NewVoteSubscriptionResult
  ) {
    return {
      ...answers,
      [answerId]: answers[answerId] + 1,
    };
  }

  const [answersRes] = useSubscription<
    NewVoteSubscriptionResult,
    AnswersResults
  >(
    {
      query: NEW_VOTE_SUBSCRIPTION,
      variables: { questionId: question.id },
    },
    handleNewVote
  );

  return answersRes.data ? answersRes.data : initialState;
}

export default useRealTimeAnswers;
