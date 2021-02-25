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
      <input
        name="label"
        type="text"
        placeholder="Type your question"
        ref={register({ required: true })}
      />
      {errors["label"] && <span>This field is required</span>}
      {fields.map((pa, index) => (
        <input
          key={pa.id}
          type="text"
          placeholder="Type an answer"
          name={`predefinedAnswers[${index}].label`}
          ref={register()}
          onChange={() => handleAnswerChange(index)}
          onBlur={() => handleAnswerBlur(index)}
          defaultValue={pa.label} // make sure to set up defaultValue
        />
      ))}
      <button type="submit">Create new question</button>
    </form>
  );
}

export default NewQuestionForm;
