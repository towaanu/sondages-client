import {useForm} from 'react-hook-form';

export type NewQuestion = {
   label: string 
}

interface Props {
    onSubmit?: (newQuestion: NewQuestion) => void
}

function NewQuestionForm({onSubmit}: Props) {
    
    const {register, handleSubmit, reset, errors} = useForm<NewQuestion>({
	mode: "onBlur",
	defaultValues: {label: ""}
    });

    function handleOnSubmit(newQuestion: NewQuestion) {
	if(onSubmit) {
	    onSubmit(newQuestion)
	}
	reset();
    }

    return (
	<form onSubmit={handleSubmit(handleOnSubmit)}> 
	    <input name="label" type="text" placeholder="Type your question" ref={register({required: true})}  />
	    {errors["label"] && <span>This field is required</span>}
	    <button type="submit">Create new question</button>
	</form>
    )
}

export default NewQuestionForm
