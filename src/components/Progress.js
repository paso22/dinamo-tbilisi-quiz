import {useQuiz} from "../contexts/QuizContext";

function Progress({maxPoints}) {
    const {questions, index, points, answer} = useQuiz();

    return (
        <div className="progress">
            <progress max={questions.length} value={index + Number(answer !== null)}/>
            <strong>{index + 1} / {questions.length}</strong>
            <strong>{points} / {maxPoints}</strong>
        </div>
    );
}

export default Progress;