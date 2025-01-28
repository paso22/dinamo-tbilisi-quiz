function Options({question, answer, dispatch}) {
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
                            onClick={() => dispatch({type: "answered", payload: index})}
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