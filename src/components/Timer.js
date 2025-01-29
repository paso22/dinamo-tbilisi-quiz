import {useEffect} from "react";
import {useQuiz} from "../contexts/QuizContext";

function Timer() {
    const {remainingSeconds, handleTick} = useQuiz();

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    useEffect(() => {
        const id = setInterval(function () {
            handleTick();
        }, 1000);

        return () => clearInterval(id);
    }, [handleTick])

    return (
        <div className="timer">
            {minutes < 10 && "0"}{minutes}:{seconds < 10 && "0"}{seconds}
        </div>
    );
}

export default Timer;