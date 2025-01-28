function Progress({index, numOfQuestions, point, maxPoints, answer}) {
    return (
        <div className="progress">
            <progress max={numOfQuestions} value={index + Number(answer !== null)}/>
            <strong>{index + 1} / {numOfQuestions}</strong>
            <strong>{point} / {maxPoints}</strong>
        </div>
    );
}

export default Progress;