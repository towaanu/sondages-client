interface Question {
  id: string;
  label: string;
  predefinedAnswers: Array<PredefinedAnswer>;

  createdAt: Date;
  updatedAt: Date;
}

interface PredefinedAnswer {
  id: string;
  label: string;

  createdAt: Date;
  updatedAt: Date;
}

export type { Question, PredefinedAnswer };
