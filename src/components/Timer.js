import {useEffect} from "react";

function Timer({remainingSeconds, dispatch}) {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    useEffect(() => {
        const id = setInterval(function () {
            dispatch({type: "tick"});
        }, 1000);

        return () => clearInterval(id);
    }, [dispatch])

    return (
        <div className="timer">
            {minutes < 10 && "0"}{minutes}:{seconds < 10 && "0"}{seconds}
        </div>
    );
}

export default Timer;