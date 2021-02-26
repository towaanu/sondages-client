import { useForm, useFieldArray } from "react-hook-form";

type NewPredefinedAnswer = {
  label: string;
};

export type NewQuestion = {
  label: string;
  predefinedAnswers: Array<NewPredefinedAnswer>;
};

interface Props {
  onSubmit?: (newQuestion: NewQuestion) => void;
}

function NewQuestionForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    errors,
    control,
    getValues,
  } = useForm<NewQuestion>({
    mode: "onBlur",
    defaultValues: { label: "", predefinedAnswers: [{ label: "" }] },
  });

  const { fields, append, remove } = useFieldArray<NewPredefinedAnswer>({
    control,
    name: "predefinedAnswers",
  });

  function handleOnSubmit(newQuestion: NewQuestion) {
    if (onSubmit) {
      onSubmit(newQuestion);
    }
    reset();
  }

  function handleAnswerChange(answerIndex: number) {
    if (answerIndex === fields.length - 1) {
      if (getValues(`predefinedAnswers[${answerIndex}].label`)) {
        append({ label: "" }, false);
      }
    }
  }

  function handleAnswerBlur(answerIndex: number) {
    if (
      answerIndex !== fields.length - 1 &&
      fields.length > 1 &&
      !getValues(`predefinedAnswers[${answerIndex}].label`)
    ) {
      remove(answerIndex);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="field">
        <label className="label">Question</label>
        <div className="control">
          <input
            className={`input ${errors["label"] ? "is-danger" : ""}`}
            name="label"
            type="text"
            placeholder="Type your question"
            ref={register({ required: true })}
          />
        </div>
        {errors["label"] && (
          <p className="help is-danger">The question is required</p>
        )}
      </div>
      {fields.map((pa, index) => (
        <div className="field">
          <input
            className="input"
            key={pa.id}
            type="text"
            placeholder="Type an answer"
            name={`predefinedAnswers[${index}].label`}
            ref={register()}
            onChange={() => handleAnswerChange(index)}
            onBlur={() => handleAnswerBlur(index)}
            defaultValue={pa.label}
          />
        </div>
      ))}

      <div className="field">
        <div className="control">
          <button className="button is-link" type="submit">
            Create a new question
          </button>
        </div>
      </div>
    </form>
  );
}

export default NewQuestionForm;
