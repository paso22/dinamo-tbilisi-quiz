import {useQuiz} from "../contexts/QuizContext";

function FinishScreen({maxPoints}) {
    const {points, highscore, handleRestart} = useQuiz();

    const percentage = Math.ceil(points / maxPoints * 100);
    return (
        <>
            <div className="result">
                <p>You scored {points} out of {maxPoints} ({percentage}%)</p>
            </div>
            <p className="highscore">Highscore: {highscore}</p>
            <button className="btn btn-restart" onClick={handleRestart}>Restart</button>
        </>
    )
}

export default FinishScreen;