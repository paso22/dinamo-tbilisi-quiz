import {useQuiz} from "../contexts/QuizContext";

function NextButton() {
    const {answer, index, questions, handleNextQuestion, handleFinish} = useQuiz();

    if (answer === null) return null;

    const isLastQuestion = index === questions.length - 1;
    if (!isLastQuestion)
        return (<button className="btn btn-ui" onClick={handleNextQuestion}>
            Next
        </button>);
    else
        return (
            <button className="btn btn-ui" onClick={handleFinish}>
                Finish
            </button>
        );


}

export default NextButton;