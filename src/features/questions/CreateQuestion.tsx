import NewQuestionForm, {NewQuestion} from './NewQuestionForm';

function CreateQuestion() {

    function handleOnSubmit(newQuestion: NewQuestion) {
	console.log("Create a new question ", newQuestion);
    }

    return (
	<>
	    <h1> Create a new question !</h1>
	    <NewQuestionForm onSubmit={handleOnSubmit} /> 
	</>
    )
}

export default CreateQuestion
