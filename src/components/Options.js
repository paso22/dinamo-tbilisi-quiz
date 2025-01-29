import {useQuiz} from "../contexts/QuizContext";

function Options() {
    const {questions, index, answer, handleAnswer} = useQuiz();

    const question = questions[index];
    const hasAnswered = answer !== null;
    const isCorrectAnswer = question.correctOption === answer;

    return (<div className="options">
        {question.options.map((option, index) => {
                let className = "btn btn-option"
                if (index === answer) className += " answer";
                if (index === answer && isCorrectAnswer) className += " correct";
                if (index === answer && hasAnswered && !isCorrectAnswer) className += " wrong";

                return (
                    <button className={className}
                            key={option}
                            onClick={() => handleAnswer(index)}
                            disabled={hasAnswered}
                    >
                        {option}
                    </button>
                )
            }
        )}
    </div>);
}

export default Options;