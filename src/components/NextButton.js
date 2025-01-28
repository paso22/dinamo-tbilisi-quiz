function NextButton({dispatch, answer, index, numOfQuestions}) {
    if (answer === null) return null;

    const isLastQuestion = index === numOfQuestions - 1;
    if (!isLastQuestion)
        return (<button className="btn btn-ui" onClick={() => dispatch({type: "nextQuestion"})}>
            Next
        </button>);
    else
        return (
            <button className="btn btn-ui" onClick={() => dispatch({type: "finished"})}>
                Finish
            </button>
        );


}

export default NextButton;