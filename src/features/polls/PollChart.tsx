import { useState, useEffect } from "react";
import { PredefinedAnswer } from "../questions/types";
import { Doughnut } from "react-chartjs-2";
import randomColor from "randomcolor";
import { AnswersResults } from "./useRealTimeAnswers";

interface Props {
  answers: Array<PredefinedAnswer>;
  answersResults: AnswersResults;
}

function PollChart({ answers, answersResults }: Props) {
  const [chartColors, setChartColors] = useState<Array<string>>([]);

  const answerIds = Object.keys(answersResults).map((id) => parseInt(id));

  useEffect(() => {
    setChartColors(
      randomColor({
        count: answerIds.length,
      })
    );
  }, [answerIds.length]);

  const answerDict: { [id: number]: PredefinedAnswer } = answers.reduce(
    (res, a) => ({
      ...res,
      [a.id]: a,
    }),
    {}
  );
  const data = {
    datasets: [
      {
        data: answerIds.map((id) => answersResults[id]),
        backgroundColor: chartColors,
      },
    ],
    labels: answerIds.map((id) => answerDict[id].label),
  };

  return <Doughnut data={data} />;
}

export default PollChart;
