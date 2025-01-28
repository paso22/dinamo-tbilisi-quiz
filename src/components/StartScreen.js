function StartScreen({dispatch, numOfQuestions}) {
    return (<div className="start">
        <h2>Welcome to the Dinamo Tbilisi Quiz</h2>
        <h3>{numOfQuestions} questions to test how much you know about Dinamo Tbilisi</h3>
        <button className="btn btn-ui" onClick={() => dispatch({type: "started"})}>Let's start</button>
    </div>);
}

export default StartScreen;