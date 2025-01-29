import Options from "./Options";
import {useQuiz} from "../contexts/QuizContext";

function Question() {
    const {questions, index, answer} = useQuiz();

    const question = questions[index];

    return <div>
        <h4>{question.question}</h4>
        <Options question={question} answer={answer}/>
    </div>
}

export default Question;