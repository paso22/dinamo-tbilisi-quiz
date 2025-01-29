import {useQuiz} from "../contexts/QuizContext";

function StartScreen() {
    const {questions, handleStart} = useQuiz();

    return (<div className="start">
        <h2>Welcome to the Dinamo Tbilisi Quiz</h2>
        <h3>{questions.length} questions to test how much you know about Dinamo Tbilisi</h3>
        <button className="btn btn-ui" onClick={handleStart}>Let's start</button>
    </div>);
}

export default StartScreen;