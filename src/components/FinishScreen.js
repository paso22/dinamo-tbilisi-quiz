function FinishScreen({points, maxPoints, highscore, dispatch}) {
    const percentage = Math.ceil(points / maxPoints * 100);
    return (
        <>
            <div className="result">
                <p>You scored {points} out of {maxPoints} ({percentage}%)</p>
            </div>
            <p className="highscore">Highscore: {highscore}</p>
            <button className="btn btn-restart" onClick={() => dispatch({type: "restart"})}>Restart</button>
        </>
    )
}

export default FinishScreen;